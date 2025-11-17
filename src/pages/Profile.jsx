import React, { useEffect, useState } from "react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../components/ui/ToastProvider.jsx";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/student/profile');
        setProfile(data);
      } catch (_) {
        // Ignore; we'll fall back to user data below.
      } finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;

  const primary = profile || (user ? { name: user.name, email: user.email, profile: user.profile } : null);
  if (!primary) return <div className="p-6">Profile not found</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="section-title">Student Profile</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Info card */}
        <div className="card p-6">
          <dl className="divide-y divide-gray-800">
            <div className="py-3 flex items-baseline justify-between">
              <dt className="muted">Name</dt>
              <dd className="font-medium">{primary.name || '—'}</dd>
            </div>
            <div className="py-3 flex items-baseline justify-between">
              <dt className="muted">Email</dt>
              <dd className="font-medium">{primary.email || '—'}</dd>
            </div>
            {primary.profile?.department && (
              <div className="py-3 flex items-baseline justify-between">
                <dt className="muted">Department</dt>
                <dd className="font-medium">{primary.profile.department}</dd>
              </div>
            )}
            {primary.profile?.phone && (
              <div className="py-3 flex items-baseline justify-between">
                <dt className="muted">Phone</dt>
                <dd className="font-medium">{primary.profile.phone}</dd>
              </div>
            )}
            {primary.profile?.bio && (
              <div className="py-3 flex items-baseline justify-between">
                <dt className="muted">Bio</dt>
                <dd className="font-medium">{primary.profile.bio}</dd>
              </div>
            )}
          </dl>
        </div>

        {/* Edit form */}
        <EditProfileCard initial={primary.profile} />
      </div>
    </div>
  );
};

const EditProfileCard = ({ initial = {} }) => {
  const [form, setForm] = useState({
    department: initial?.department || '',
    phone: initial?.phone || '',
    bio: initial?.bio || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setSaved(false);
    try {
      await api.put('/student/profile', { profile: form });
      setSaved(true);
      toast?.show?.('Profile saved');
    } catch (_) {}
    finally { setSaving(false); }
  };

  return (
    <form onSubmit={onSubmit} className="card p-6 space-y-4">
      <h3 className="font-semibold">Edit profile</h3>
      {saved && <div className="text-emerald-400 text-sm">Saved!</div>}
      <label className="block">
        <span className="block text-sm muted mb-1">Department</span>
        <input name="department" className="input" value={form.department} onChange={onChange} placeholder="Computer Science" />
      </label>
      <label className="block">
        <span className="block text-sm muted mb-1">Phone</span>
        <input name="phone" className="input" value={form.phone} onChange={onChange} placeholder="999-999-9999" />
      </label>
      <label className="block">
        <span className="block text-sm muted mb-1">Bio</span>
        <textarea name="bio" className="input min-h-[100px]" value={form.bio} onChange={onChange} placeholder="A short intro" />
      </label>
      <button className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</button>
    </form>
  );
};

export default Profile;
