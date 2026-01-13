'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAPI } from '@/lib/api';
import { Users, Trash2, Shield, Loader2, AlertCircle, Ban } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';

interface User {
    id: number;
    username: string;
    email: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    last_login: string | null;
}

export default function AdminPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<number | null>(null);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        checkAdminAndLoadUsers();
    }, []);

    const checkAdminAndLoadUsers = async () => {
        try {
            // Check profile for admin status
            const profile = await fetchAPI('/api/auth/profile/');
            if (!profile.is_staff) {
                router.push('/dashboard');
                return;
            }
            setIsAdmin(true);

            // Load users
            const usersData = await fetchAPI('/api/auth/admin/users/');
            setUsers(usersData);
        } catch (err: any) {
            console.error(err);
            if (err.message.includes('403') || err.message.includes('401')) {
                router.push('/dashboard');
            } else {
                setError('Failed to load admin data');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id: number) => {
        if (!confirm('Are you sure you want to permanently delete this user?')) return;

        setDeleting(id);
        try {
            await fetchAPI(`/api/auth/admin/users/${id}/`, { method: 'DELETE' });
            setUsers(users.filter(u => u.id !== id));
        } catch (err) {
            alert('Failed to delete user');
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

    if (!isAdmin) return null; // Logic prevents render, showing nothing while redirecting

    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                            <Shield size={12} /> Admin Area
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900">User Administration</h1>
                    <p className="text-slate-500">Manage registered users and system access.</p>
                </header>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2">
                            <Users size={18} /> Registered Users ({users.length})
                        </h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                                    <th className="p-4 font-semibold border-b border-slate-200">ID</th>
                                    <th className="p-4 font-semibold border-b border-slate-200">User</th>
                                    <th className="p-4 font-semibold border-b border-slate-200">Status</th>
                                    <th className="p-4 font-semibold border-b border-slate-200">Joined</th>
                                    <th className="p-4 font-semibold border-b border-slate-200">Last Login</th>
                                    <th className="p-4 font-semibold border-b border-slate-200 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 text-slate-400 font-mono text-xs">#{user.id}</td>
                                        <td className="p-4">
                                            <div>
                                                <p className="font-bold text-slate-900">{user.username}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                {user.is_staff && (
                                                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-bold border border-purple-200">Admin</span>
                                                )}
                                                <span className={`px-2 py-0.5 rounded text-xs font-bold border ${user.is_active ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                                    {user.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-slate-600">{user.date_joined}</td>
                                        <td className="p-4 text-sm text-slate-600">{user.last_login || 'Never'}</td>
                                        <td className="p-4 text-right">
                                            {!user.is_staff ? (
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    disabled={deleting === user.id}
                                                    className="text-slate-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-all"
                                                    title="Delete User"
                                                >
                                                    {deleting === user.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                                </button>
                                            ) : (
                                                <Shield size={18} className="text-slate-300 ml-auto mr-2" />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {users.length === 0 && !error && (
                            <div className="p-12 text-center text-slate-400">
                                <Users size={40} className="mx-auto mb-3 opacity-20" />
                                <p>No users found.</p>
                            </div>
                        )}
                        {error && (
                            <div className="p-12 text-center text-red-500 bg-red-50">
                                <AlertCircle size={40} className="mx-auto mb-3" />
                                <p>{error}</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
