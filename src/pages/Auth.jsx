import React from "react";
import AuthForm from "../components/auth/AuthForm.jsx";

const AuthPage = () => {
  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-xl ring-1 ring-white/10 bg-gradient-to-b from-gray-900 to-gray-950 p-6 shadow-xl">
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
