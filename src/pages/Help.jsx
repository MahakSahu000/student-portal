import React, { useState } from "react";
import api from "../lib/api";
import { useToast } from "../components/ui/ToastProvider.jsx";

const Help = () => {
  const [status, setStatus] = useState(null);
  const [checking, setChecking] = useState(false);
  const toast = useToast();

  const checkAPI = async () => {
    setChecking(true); setStatus(null);
    try {
      const { data } = await api.get('/health');
      const ok = !!data?.ok;
      setStatus(ok ? 'Online' : 'Unreachable');
      toast?.show?.(ok ? 'API is online' : 'API unreachable');
    } catch (_) {
      setStatus('Unreachable');
      toast?.show?.('API unreachable');
    } finally { setChecking(false); }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="section-title">Help & Support</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="font-semibold mb-2">Quick links</h3>
          <ul className="list-disc pl-5">
            <li><a className="text-blue-400 underline" href="/" rel="noreferrer">Home</a></li>
            <li><button className="btn btn-primary mt-2" onClick={checkAPI} disabled={checking}>{checking ? 'Checking…' : 'Check API status'}</button></li>
            {status && <div className="mt-2 text-sm">API status: <span className={status==='Online' ? 'text-emerald-400' : 'text-red-400'}>{status}</span></div>}
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="font-semibold mb-2">FAQ</h3>
          <ul className="space-y-2">
            <li><span className="font-medium">How do I log in?</span> Use your email and password on the Auth page. New users can register there.</li>
            <li><span className="font-medium">Why don’t I see courses?</span> Click Login, then we auto-enroll you into starter courses. Or ask admin to assign courses.</li>
            <li><span className="font-medium">Where are my grades?</span> Check the Grades page; they’re loaded from the server.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Help;
