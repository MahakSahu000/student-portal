import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const ToastCtx = createContext(null);

export const ToastProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const show = useCallback((message, opts = {}) => {
    const id = Math.random().toString(36).slice(2);
    const ttl = opts.ttl ?? 2500;
    setItems((arr) => [...arr, { id, message }]);
    setTimeout(() => setItems((arr) => arr.filter((t) => t.id !== id)), ttl);
  }, []);

  return (
    <ToastCtx.Provider value={{ show }}>
      {children}
      <div className="fixed z-50 bottom-4 right-4 space-y-2">
        {items.map((t) => (
          <div key={t.id} className="rounded-md bg-gray-800 text-white px-3 py-2 shadow-lg border border-white/10">
            {t.message}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
};

export const useToast = () => useContext(ToastCtx);
