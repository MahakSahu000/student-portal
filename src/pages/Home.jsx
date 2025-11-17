import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import Modal from "../components/ui/Modal.jsx";
import AuthForm from "../components/auth/AuthForm.jsx";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const goToApp = () => navigate('/dashboard');

  return (
    <div>
      <section className="relative overflow-hidden hero-panel">
        <div className="relative container-prose py-20 text-center text-gray-100">
          <div className="flex items-center justify-center mb-4">
            <span className="badge">Smarter Campus</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            <span className="gradient-text">Welcome to Student Portal</span>
          </h1>
          <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
            Track your courses, assignments and profile in one place. Sign in to get started.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {user ? (
              <button onClick={goToApp} className="btn btn-primary px-6 py-2.5">
                Go to Dashboard
              </button>
            ) : (
              <>
                <button onClick={() => setOpen(true)} className="btn btn-primary px-6 py-2.5">
                  Login
                </button>
                <button onClick={() => navigate('/auth')} className="btn btn-ghost px-6 py-2.5">
                  Open Full Page
                </button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
            <div className="card flex items-center gap-3">
              <span className="icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-sky-300"><path strokeWidth="2" d="M9 12l2 2 4-4"/><path strokeWidth="2" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              </span>
              <div>
                <div className="text-sm text-gray-400">Secure</div>
                <div className="font-semibold">Protected data</div>
              </div>
            </div>
            <div className="card flex items-center gap-3">
              <span className="icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-violet-300"><path strokeWidth="2" d="M13 3l-1 6h6l-8 12 1-6H5l8-12z"/></svg>
              </span>
              <div>
                <div className="text-sm text-gray-400">Fast</div>
                <div className="font-semibold">Real-time updates</div>
              </div>
            </div>
            <div className="card flex items-center gap-3">
              <span className="icon-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-emerald-300"><path strokeWidth="2" d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"/></svg>
              </span>
              <div>
                <div className="text-sm text-gray-400">Reliable</div>
                <div className="font-semibold">Always available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-prose py-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card card-hover p-6">
          <div className="icon-badge mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-sky-300"><path strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"/></svg>
          </div>
          <h3 className="font-semibold mb-1">Stay Organized</h3>
          <p className="muted">Overview of your attendance, assignments, and GPA.</p>
        </div>
        <div className="card card-hover p-6">
          <div className="icon-badge mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-violet-300"><path strokeWidth="2" d="M8 21l8-9-8-9"/></svg>
          </div>
          <h3 className="font-semibold mb-1">Manage Courses</h3>
          <p className="muted">Browse and track your enrolled courses easily.</p>
        </div>
        <div className="card card-hover p-6">
          <div className="icon-badge mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5 text-emerald-300"><path strokeWidth="2" d="M20 7l-8 10-4-4"/></svg>
          </div>
          <h3 className="font-semibold mb-1">Your Profile</h3>
          <p className="muted">Keep your profile up-to-date at all times.</p>
        </div>
      </section>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="px-4 pb-6">
          <AuthForm onSuccess={() => setOpen(false)} />
        </div>
      </Modal>
    </div>
  );
};

export default Home;
