import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api from "../lib/api";

const Item = ({ to, icon, label, suffix }) => {
  const base =
    "flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/5";
  const active = "bg-white/10 text-white font-medium";
  return (
    <NavLink to={to} className={({ isActive }) => `${base} ${isActive ? active : ""}`}>
      <span className="flex items-center gap-2"><span className="h-5 w-5 text-gray-400">{icon}</span>{label}</span>
      {suffix}
    </NavLink>
  );
};

const Sidebar = () => {
  const [counts, setCounts] = useState({ assignmentsDue: 0, gradesCount: 0 });
  useEffect(() => {
    (async () => {
      try { const { data } = await api.get('/student/counts'); setCounts(data || {}); } catch (_) {}
    })();
  }, []);
  const badge = (n) => (
    <span className="ml-auto inline-flex items-center justify-center rounded-full bg-white/10 text-white text-xs px-2 py-0.5">{n}</span>
  );
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r border-white/10 bg-gray-900 text-gray-100 sticky top-14 h-[calc(100vh-56px)]">
      <nav className="p-4 space-y-3">
        <div>
          <div className="px-2 pb-2 text-xs uppercase tracking-wider text-gray-400">Overview</div>
          <div className="space-y-1">
            <Item to="/dashboard" label="Dashboard" icon={(
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M3 12h7V3H3v9zm0 9h7v-7H3v7zm11 0h7v-9h-7v9zm0-18v7h7V3h-7z"/></svg>
            )} />
            <Item to="/courses" label="Courses" icon={(
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M4 6h16M4 10h16M4 14h10"/></svg>
            )} />
            <Item to="/assignments" label="Assignments" icon={(
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M9 7h8M9 11h8M9 15h8M7 7h.01M7 11h.01M7 15h.01"/></svg>
            )} />
            <Item to="/grades" label="Grades" icon={(
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M3 12l6 6L21 6"/></svg>
            )} />
            <Item to="/calendar" label="Calendar" icon={(
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="4" width="18" height="18" rx="2"/><path strokeWidth="2" d="M16 2v4M8 2v4M3 10h18"/></svg>
            )} />
          </div>
        </div>
        <div className="pt-2 border-t border-white/10">
          <div className="px-2 pb-2 text-xs uppercase tracking-wider text-gray-400">Account</div>
          <div className="space-y-1">
            <Item to="/profile" label="Profile" icon={(
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M12 12a5 5 0 100-10 5 5 0 000 10zm7 9a7 7 0 10-14 0"/></svg>
            )} />
            <Item to="/settings" label="Settings" icon={(
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"/><path strokeWidth="2" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06A1.65 1.65 0 0015 19.4a1.65 1.65 0 00-1.5 1.6V22a2 2 0 01-4 0v-.01A1.65 1.65 0 008 19.4a1.65 1.65 0 00-1.82-.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15 1.65 1.65 0 004 13.5H4a2 2 0 010-4h.01A1.65 1.65 0 004.6 8a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 008 4.6 1.65 1.65 0 009.5 4V4a2 2 0 014 0v.01A1.65 1.65 0 0015 4.6a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.37 0 .72.1 1.03.28.35.2.57.57.57.97s-.22.77-.57.97c-.31.18-.66.28-1.03.28z"/></svg>
            )} />
            <Item to="/help" label="Help" icon={(
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path strokeWidth="2" d="M9.09 9a3 3 0 115.82 1c0 2-3 2-3 4"/><path strokeWidth="2" d="M12 17h.01"/></svg>
            )} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
