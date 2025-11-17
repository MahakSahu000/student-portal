import React, { useEffect, useState } from "react";

const Settings = () => {
  const [accent, setAccent] = useState('accent-blue');
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('ui:accent');
    if (stored) setAccent(stored);
    const compactStored = localStorage.getItem('ui:compact');
    if (compactStored) setCompact(compactStored === '1');
  }, []);

  const applyAccent = (value) => {
    setAccent(value);
    localStorage.setItem('ui:accent', value);
    const root = document.documentElement;
    root.classList.remove('accent-blue', 'accent-violet', 'accent-emerald');
    root.classList.add(value);
  };

  const applyCompact = (value) => {
    setCompact(value);
    localStorage.setItem('ui:compact', value ? '1' : '0');
    document.body.classList.toggle('compact', value);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="section-title">Settings</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="font-semibold mb-2">Accent color</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="accent" checked={accent==='accent-blue'} onChange={() => applyAccent('accent-blue')} />
              <span>Blue</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="accent" checked={accent==='accent-violet'} onChange={() => applyAccent('accent-violet')} />
              <span>Violet</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="accent" checked={accent==='accent-emerald'} onChange={() => applyAccent('accent-emerald')} />
              <span>Emerald</span>
            </label>
          </div>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold mb-2">Layout</h3>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={compact} onChange={(e) => applyCompact(e.target.checked)} />
            <span>Compact spacing</span>
          </label>
          <p className="muted text-sm mt-2">Compact mode reduces paddings and gaps. Stored locally in your browser.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
