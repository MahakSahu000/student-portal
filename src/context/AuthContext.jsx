import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Try to restore session
    (async () => {
      try {
        const { data } = await api.get('/auth/me');
        setUser(data);
      } catch (_) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email, password, name) => {
    // If name provided, try register; else login
    if (name) {
      await api.post('/auth/register', { name, email, password });
    }
    const { data } = await api.post('/auth/login', { email, password });
    setUser(data);

    // Fire-and-forget auto-enroll of default courses (non-blocking)
    try {
      void api.post('/student/auto-enroll', { defaults: true });
    } catch (_) {}

    navigate('/dashboard');
  };

  const logout = async () => {
    try { await api.post('/auth/logout'); } catch (_) {}
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
