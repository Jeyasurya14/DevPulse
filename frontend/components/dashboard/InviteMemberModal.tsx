'use client';

import React, { useState } from 'react';
import { X, Mail, User, Shield, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui';
import { fetchAPI } from '@/lib/api';
import { mutate } from 'swr';

interface InviteMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function InviteMemberModal({ isOpen, onClose }: InviteMemberModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'Viewer'
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await fetchAPI('/api/dashboard/team/members/', {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            mutate('/api/dashboard/team/members/'); // Refresh list
            onClose();
            setFormData({ name: '', email: '', role: 'Viewer' }); // Reset
        } catch (error) {
            alert('Failed to invite member');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                    <X size={18} />
                </button>

                <div className="p-6 border-b border-neutral-100 bg-neutral-50/50">
                    <h2 className="text-xl font-bold text-neutral-900">Invite Team Member</h2>
                    <p className="text-sm text-neutral-500 mt-1">Add a new user to your organization.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-devpulse-blue-500 transition-all font-medium"
                                placeholder="e.g. Sarah Connor"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-devpulse-blue-500 transition-all font-medium"
                                placeholder="name@company.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wide mb-1.5">
                            Role
                        </label>
                        <div className="relative">
                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                            <select
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:outline-none focus:ring-2 focus:ring-devpulse-blue-500 transition-all font-medium appearance-none"
                            >
                                <option value="Admin">Admin</option>
                                <option value="Developer">Developer</option>
                                <option value="Viewer">Viewer</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            className="flex-1"
                            disabled={isLoading}
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Send Invite'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
