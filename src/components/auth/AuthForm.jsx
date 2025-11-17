import React, { useMemo, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const AuthForm = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();

  const title = useMemo(() => (mode === "login" ? "Welcome back" : "Create your account"), [mode]);
  const submitText = useMemo(() => (mode === "login" ? "Login" : "Create Account"), [mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password, mode === 'register' ? name : undefined);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Authentication failed. Please check your details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="text-center mb-6">
        <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-blue-600 text-white grid place-items-center font-bold">
          SP
        </div>
        <h2 className="text-2xl font-semibold text-gray-100">{title}</h2>
        <p className="muted text-sm">{mode === 'login' ? 'Sign in to access your dashboard' : 'Register to get started'}</p>
      </div>
      {error && (
        <div className="mb-4 rounded border border-red-900/40 bg-red-950 text-red-300 px-3 py-2 text-sm">
          {error}
        </div>
      )}
      <div className="space-y-4">
        {mode === 'register' && (
          <label className="block">
            <span className="block text-sm text-gray-300 mb-1">Name</span>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={mode === 'register'}
            />
          </label>
        )}
        <label className="block">
          <span className="block text-sm text-gray-300 mb-1">Email</span>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className="block text-sm text-gray-300 mb-1">Password</span>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="input pr-16"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-400 hover:underline">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>
      </div>
      <button disabled={submitting} className="btn btn-primary mt-6 w-full disabled:opacity-60">
        {submitting ? 'Please wait…' : submitText}
      </button>
      <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="mt-3 w-full text-sm text-blue-400 hover:underline">
        {mode === 'login' ? "Don't have an account? Register" : 'Have an account? Login'}
      </button>
    </form>
  );
};

export default AuthForm;
