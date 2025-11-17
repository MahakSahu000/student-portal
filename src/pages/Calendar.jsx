import React, { useEffect, useMemo, useState } from "react";
import api from "../lib/api";

const groupByDate = (items) => {
  const fmt = (d) => new Date(d).toDateString();
  return items.reduce((acc, a) => {
    const k = fmt(a.dueDate);
    (acc[k] ||= []).push(a);
    return acc;
  }, {});
};

const Calendar = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { const { data } = await api.get('/student/assignments'); setItems(Array.isArray(data) ? data : []); }
      catch (_) { setItems([]); }
      finally { setLoading(false); }
    })();
  }, []);

  const grouped = useMemo(() => groupByDate(items), [items]);
  const dates = Object.keys(grouped).sort((a,b)=> new Date(a)-new Date(b));

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="section-title">Calendar</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {dates.length === 0 && <div className="card p-6">No upcoming items.</div>}
        {dates.map(date => (
          <div key={date} className="card p-6">
            <div className="font-semibold mb-2">{date}</div>
            <ul className="space-y-2">
              {grouped[date].map(a => (
                <li key={a._id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.title}</div>
                    <div className="muted text-sm">{a.course?.code || '—'}</div>
                  </div>
                  <span className={a.status==='due' ? 'text-sky-300 text-sm' : 'text-emerald-400 text-sm'}>{a.status}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
