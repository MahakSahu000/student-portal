import React from "react";

const Placeholder = ({ title, descr }) => (
  <div className="p-6">
    <h2 className="section-title">{title}</h2>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card p-6">
        <h3 className="font-semibold mb-2">Coming soon</h3>
        <p className="muted">{descr}</p>
      </div>
      <div className="card p-6">
        <h3 className="font-semibold mb-2">Tips</h3>
        <ul className="list-disc pl-5 muted">
          <li>This section is a placeholder to keep navigation working.</li>
          <li>Hook to real API endpoints when ready.</li>
        </ul>
      </div>
    </div>
  </div>
);

export default Placeholder;
