'use client';

import React from 'react';
import { UserPlus, Users, Mail, Check, X, Shield, MoreVertical, AlertCircle, Loader2 } from 'lucide-react';
import useSWR from 'swr';
import { fetchAPI } from '@/lib/api';

const fetcher = (url: string) => fetchAPI(url);

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    status: 'active' | 'pending';
    avatar?: string; // URL or initials handled in UI
}

export default function CollaborationPage() {
    const { data: members, error, mutate, isLoading } = useSWR<TeamMember[]>('/api/team/', fetcher);

    // Mock data for display if API returns 404 (optional, but good for demo continuity if backend is missing)
    // For production hardening, we usually accept the error. 
    // However, since we just removed mock data from api.ts, this page will likely error if the endpoint doesn't exist.
    // I will stick to the "Senior Dev" pattern: Show Error if API fails.

    return (
        <div className="bg-slate-50/50 text-slate-900 font-sans h-full">
            <main className="p-6 md:p-10 h-full overflow-y-auto scrollbar-none">
                {/* Premium Header */}
                <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-1 tracking-tight">Collaboration</h1>
                        <p className="text-slate-500 font-medium">Manage your team and invite members to collaborate.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5">
                        <UserPlus size={20} className="stroke-[3]" /> Invite Member
                    </button>
                </header>

                {error ? (
                    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-100 shadow-sm text-center animate-in fade-in zoom-in-95 duration-300">
                        <div className="bg-red-50 p-4 rounded-full mb-4">
                            <AlertCircle className="text-red-500" size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Service Unavailable</h3>
                        <p className="text-slate-500 max-w-md mb-8">
                            We couldn't retrieve your team members. This might be due to a network interruption or maintenance.
                        </p>
                        <button
                            onClick={() => mutate()}
                            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Retry Connection
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-premium border border-slate-100 overflow-hidden">
                        <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                                    <Users size={24} />
                                </div>
                                <h3 className="font-bold text-lg text-slate-900">Team Members</h3>
                            </div>
                            <span className="text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                {isLoading ? '...' : `${members?.length || 0} Active`}
                            </span>
                        </div>

                        <div className="divide-y divide-slate-100">
                            {isLoading ? (
                                // Premium Skeleton
                                [1, 2, 3].map(i => (
                                    <div key={i} className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-slate-100 animate-pulse" />
                                            <div className="space-y-2">
                                                <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
                                                <div className="h-3 w-48 bg-slate-50 rounded animate-pulse" />
                                            </div>
                                        </div>
                                        <div className="h-8 w-20 bg-slate-100 rounded-full animate-pulse" />
                                    </div>
                                ))
                            ) : members && members.length > 0 ? (
                                members.map((member) => (
                                    <MemberRow key={member.id} member={member} />
                                ))
                            ) : (
                                // Empty State
                                <div className="p-12 text-center flex flex-col items-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                        <Users className="text-slate-300" size={32} />
                                    </div>
                                    <h3 className="text-slate-900 font-bold mb-1">No team members yet</h3>
                                    <p className="text-slate-500 text-sm">Invite your first colleague to get started.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function MemberRow({ member }: { member: TeamMember }) {
    const isPending = member.status === 'pending';
    const initials = member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    return (
        <div className={`p-6 flex items-center justify-between transition-colors hover:bg-slate-50/80 group ${isPending ? 'opacity-75' : ''}`}>
            <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md ${isPending
                        ? 'bg-slate-200 text-slate-400'
                        : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                    }`}>
                    {isPending ? <Mail size={20} /> : initials}
                </div>
                <div>
                    <p className="font-bold text-slate-900 flex items-center gap-2">
                        {member.name}
                        {member.role === 'admin' && (
                            <Shield size={14} className="text-indigo-500 fill-indigo-500/10" />
                        )}
                    </p>
                    <p className="text-sm text-slate-500 font-medium">{member.email}</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${member.role === 'admin'
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-100'
                        : isPending
                            ? 'bg-amber-50 text-amber-700 border-amber-100'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                    {isPending ? 'Pending Invite' : member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </span>

                <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    <MoreVertical size={18} />
                </button>
            </div>
        </div>
    )
}
