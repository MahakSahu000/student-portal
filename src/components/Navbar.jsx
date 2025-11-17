import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = ({ onMenu }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <nav className="bg-gray-950 text-gray-100 border-b border-gray-800/80">
      <div className="container-prose">
        <div className="h-14 flex items-center justify-between">
<div className="flex items-center gap-2">
            <div className="md:hidden">
              <button aria-label="Open menu" className="btn btn-ghost px-2 py-1 rounded-md" onClick={onMenu}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
            </div>
            <Link to={user ? "/dashboard" : "/"} className="text-lg sm:text-xl font-semibold tracking-tight">
              Student Portal{user ? ` — ${user.name}` : ''}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {user ? (
              <button onClick={logout} className="btn btn-primary">Logout</button>
            ) : (
              <button onClick={() => navigate('/auth')} className="btn btn-primary">Login / Register</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
