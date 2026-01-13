'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '@/lib/api';
import { User, Lock, Save, Loader2, CheckCircle, AlertCircle, Camera } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [profile, setProfile] = useState({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        avatar_url: '',
        bio: ''
    });

    const [passwords, setPasswords] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await fetchAPI('/api/auth/profile/');
            setProfile(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage(null);
        try {
            const updated = await fetchAPI('/api/auth/profile/', {
                method: 'PATCH',
                body: JSON.stringify(profile)
            });
            setProfile(updated);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err: any) {
            setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.new_password !== passwords.confirm_password) {
            setMessage({ type: 'error', text: 'New passwords do not match' });
            return;
        }
        setSaving(true);
        setMessage(null);
        try {
            await fetchAPI('/api/auth/change-password/', {
                method: 'PUT',
                body: JSON.stringify({
                    old_password: passwords.old_password,
                    new_password: passwords.new_password
                })
            });
            setMessage({ type: 'success', text: 'Password changed successfully!' });
            setPasswords({ old_password: '', new_password: '', confirm_password: '' });
        } catch (err: any) {
            const msg = err.message || 'Failed to change password';
            // Handle specific field errors if API returns object
            // But simple error message is enough for MVP
            setMessage({ type: 'error', text: msg });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
                    <p className="text-slate-500">Manage your profile and security preferences.</p>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="flex border-b border-slate-100">
                        <button
                            onClick={() => setActiveTab('general')}
                            className={`px-6 py-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'general' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                        >
                            <User size={18} /> General
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`px-6 py-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'security' ? 'border-blue-600 text-blue-600 bg-blue-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                        >
                            <Lock size={18} /> Security
                        </button>
                    </div>

                    <div className="p-8">
                        {message && (
                            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                {message.text}
                            </div>
                        )}

                        {loading ? (
                            <div className="flex justify-center p-12">
                                <Loader2 className="animate-spin text-blue-600" size={32} />
                            </div>
                        ) : activeTab === 'general' ? (
                            <form onSubmit={handleProfileUpdate} className="max-w-2xl space-y-6">
                                <div className="flex items-start gap-6">
                                    <div className="relative group">
                                        <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
                                            {profile.avatar_url ? (
                                                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                <User size={40} className="text-slate-300" />
                                            )}
                                        </div>
                                        {/* Avatar upload placeholder */}
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Avatar URL</label>
                                            <div className="flex gap-2">
                                                <input
                                                    type="url"
                                                    className="flex-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                    placeholder="https://example.com/avatar.jpg"
                                                    value={profile.avatar_url || ''}
                                                    onChange={e => setProfile({ ...profile, avatar_url: e.target.value })}
                                                />
                                            </div>
                                            <p className="text-xs text-slate-400 mt-1">Paste a URL for your profile picture.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            value={profile.first_name || ''}
                                            onChange={e => setProfile({ ...profile, first_name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                            value={profile.last_name || ''}
                                            onChange={e => setProfile({ ...profile, last_name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                                    <textarea
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32"
                                        placeholder="Tell us about yourself..."
                                        value={profile.bio || ''}
                                        onChange={e => setProfile({ ...profile, bio: e.target.value })}
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handlePasswordChange} className="max-w-md space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        value={passwords.old_password}
                                        onChange={e => setPasswords({ ...passwords, old_password: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        value={passwords.new_password}
                                        onChange={e => setPasswords({ ...passwords, new_password: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                                    <input
                                        type="password"
                                        required
                                        className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                        value={passwords.confirm_password}
                                        onChange={e => setPasswords({ ...passwords, confirm_password: e.target.value })}
                                    />
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
                                        Change Password
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
