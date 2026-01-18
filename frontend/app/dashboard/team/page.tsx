'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import {
    Users,
    UserPlus,
    Search,
    Mail,
    Shield,
    MoreVertical,
    CheckCircle,
    Clock,
    Zap,
    Settings2,
    Trash2,
    Edit3
} from 'lucide-react';

export default function TeamPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState<string>('all');

    const filteredMembers: any[] = []; // No real members data yet

    const stats = {
        total: 0,
        active: 0,
        pending: 0,
        avgActivity: 0
    };

    const getRoleBadgeColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin': return 'bg-devpulse-blue-50 text-devpulse-blue-600 border-devpulse-blue-100';
            case 'developer': return 'bg-devpulse-yellow-50 text-devpulse-yellow-700 border-devpulse-yellow-200';
            default: return 'bg-neutral-50 text-neutral-600 border-neutral-200';
        }
    };

    const getActivityIndicator = (activity: string) => {
        switch (activity) {
            case 'high': return { color: 'bg-success-500', width: '90%' };
            case 'medium': return { color: 'bg-devpulse-yellow-500', width: '60%' };
            default: return { color: 'bg-neutral-300', width: '30%' };
        }
    };

    return (
        <div className="h-full bg-neutral-50 font-sans">
            <main className="p-6 md:p-8 lg:p-10 h-full overflow-y-auto scrollbar-thin">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-1">Team Management</h1>
                        <p className="text-neutral-500">Manage members, roles, and permissions</p>
                    </div>
                    <Button variant="cta" leftIcon={<UserPlus size={18} />}>
                        Invite Members
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-xl border border-neutral-100 shadow-card">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-devpulse-blue-50 rounded-lg">
                                <Users size={18} className="text-devpulse-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-neutral-500">Total Members</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900">{stats.total}</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-neutral-100 shadow-card">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-success-50 rounded-lg">
                                <CheckCircle size={18} className="text-success-600" />
                            </div>
                            <span className="text-sm font-medium text-neutral-500">Active Now</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900">{stats.active}</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-neutral-100 shadow-card">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-devpulse-yellow-50 rounded-lg">
                                <Mail size={18} className="text-devpulse-yellow-600" />
                            </div>
                            <span className="text-sm font-medium text-neutral-500">Pending Invites</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900">{stats.pending}</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-neutral-100 shadow-card">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-purple-50 rounded-lg">
                                <Zap size={18} className="text-purple-600" />
                            </div>
                            <span className="text-sm font-medium text-neutral-500">Avg. Activity</span>
                        </div>
                        <p className="text-2xl font-bold text-neutral-900">{stats.avgActivity}/10</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search members..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm focus:ring-2 focus:ring-devpulse-blue-500 focus:border-transparent outline-none shadow-sm"
                        />
                    </div>
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 focus:ring-2 focus:ring-devpulse-blue-500 outline-none shadow-sm"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admins</option>
                        <option value="developer">Developers</option>
                        <option value="viewer">Viewers</option>
                    </select>
                </div>

                {/* Members Table */}
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-neutral-100 bg-neutral-50">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Member</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Role</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Activity</th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMembers.map((member) => (
                                    <tr key={member.id} className="border-b border-neutral-50 hover:bg-neutral-25 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                                />
                                                <div>
                                                    <p className="font-semibold text-neutral-900">{member.name}</p>
                                                    <p className="text-sm text-neutral-500">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getRoleBadgeColor(member.role)}`}>
                                                {member.role === 'Admin' && <Shield size={12} />}
                                                {member.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${member.status === 'active' ? 'text-success-600' : 'text-warning-600'}`}>
                                                <span className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-success-500' : 'bg-warning-500'}`} />
                                                {member.status === 'active' ? 'Active' : 'Away'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-24">
                                                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${getActivityIndicator(member.activity).color}`}
                                                        style={{ width: getActivityIndicator(member.activity).width }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-600 transition-colors">
                                                    <Edit3 size={16} />
                                                </button>
                                                <button className="p-2 hover:bg-error-50 rounded-lg text-neutral-400 hover:text-error-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
