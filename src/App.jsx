import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import MobileItem from "./components/MobileItem.jsx";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Courses from "./pages/Courses.jsx";
import Profile from "./pages/Profile.jsx";
import Assignments from "./pages/Assignments.jsx";
import Grades from "./pages/Grades.jsx";
import Calendar from "./pages/Calendar.jsx";
import Settings from "./pages/Settings.jsx";
import Help from "./pages/Help.jsx";
import AuthPage from "./pages/Auth.jsx";

const AppShell = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const hideSidebarOn = new Set(["/", "/auth"]);
  const showSidebar = Boolean(user) && !hideSidebarOn.has(location.pathname);
  return (
    <div className="app-shell">
      <Navbar onMenu={() => setMobileOpen(true)} />

      {/* Mobile drawer */}
      {showSidebar && (
        <div className={`${mobileOpen ? '' : 'hidden'} md:hidden fixed inset-0 z-40`}>
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-gray-900 border-r border-white/10 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold">Menu</div>
              <button className="btn btn-ghost px-2 py-1" onClick={() => setMobileOpen(false)} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <div className="px-2 pb-2 text-xs uppercase tracking-wider text-gray-400">Overview</div>
                <div className="space-y-1">
                  <MobileItem to="/dashboard" label="Dashboard" />
                  <MobileItem to="/courses" label="Courses" />
                  <MobileItem to="/assignments" label="Assignments" />
                  <MobileItem to="/grades" label="Grades" />
                  <MobileItem to="/calendar" label="Calendar" />
                </div>
              </div>
              <div className="pt-2 border-t border-white/10">
                <div className="px-2 pb-2 text-xs uppercase tracking-wider text-gray-400">Account</div>
                <div className="space-y-1">
                  <MobileItem to="/profile" label="Profile" />
                  <MobileItem to="/settings" label="Settings" />
                  <MobileItem to="/help" label="Help" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container-prose py-6 flex gap-6">
        {showSidebar && <Sidebar />}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              }
            />
            <Route
              path="/assignments"
              element={
                <ProtectedRoute>
                  <Assignments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/grades"
              element={
                <ProtectedRoute>
                  <Grades />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/help"
              element={
                <ProtectedRoute>
                  <Help />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </Router>
  );
};

export default App;
