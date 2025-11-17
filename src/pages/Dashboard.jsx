import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../lib/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState({ assignmentsDue: 0, gradesCount: 0 });
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      try { const { data } = await api.get('/student/counts'); setCounts(data || {}); } catch (_) {}
      try { const { data } = await api.get('/student/courses'); setCourses(Array.isArray(data) ? data : []); } catch (_) {}
    })();
  }, []);

  const courseCount = courses.length;
  const gpaApprox = useMemo(() => 8.7, []);

  return (
    <div className="p-6">
      <h2 className="section-title">Welcome{user ? `, ${user.name}` : ''}!</h2>
      <p className="muted">Overview at a glance.</p>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card p-6">
          <h3 className="font-medium mb-1">Courses</h3>
          <p className="text-3xl font-bold text-emerald-400">{courseCount}</p>
        </div>
        <div className="card p-6">
          <h3 className="font-medium mb-1">Assignments due</h3>
          <p className="text-3xl font-bold text-sky-300">{counts.assignmentsDue || 0}</p>
        </div>
        <div className="card p-6">
          <h3 className="font-medium mb-1">Grades</h3>
          <p className="text-3xl font-bold text-violet-300">{counts.gradesCount || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
