import React from "react";
import { NavLink } from "react-router-dom";

const MobileItem = ({ to, label }) => (
  <NavLink to={to} className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5'}` }>
    {label}
  </NavLink>
);

export default MobileItem;
