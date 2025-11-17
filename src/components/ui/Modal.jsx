import React from "react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-xl ring-1 ring-white/10 shadow-2xl bg-gradient-to-b from-gray-900 to-gray-950">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="px-6 pt-8 pb-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
