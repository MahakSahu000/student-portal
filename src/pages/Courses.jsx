import React, { useEffect, useState } from "react";
import api from "../lib/api";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/student/courses");
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load courses", err);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  const list = Array.isArray(courses) ? courses : [];

  return (
    <div className="p-6">
      <h2 className="section-title">My Courses</h2>
      {list.length === 0 ? (
        <p className="muted">No courses enrolled yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((c) => (
            <div key={c._id} className="card card-hover p-6">
              <h3 className="font-medium text-lg mb-1">{c.title}</h3>
              <p className="muted">Code: {c.code}</p>
              {c.description && <p className="muted">{c.description}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
