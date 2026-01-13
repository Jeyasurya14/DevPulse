'use client';

import { useState } from 'react';
import { X, Save, Layers, Loader2 } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { useSWRConfig } from 'swr';

interface CreateProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
    const { mutate } = useSWRConfig();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        setLoading(true);
        setError('');

        // 1. Optimistic Update (Zero Lag)
        // Immediately update the local cache for stats to show +1 project
        const statsKey = '/api/dashboard/stats/';
        await mutate(statsKey, (currentData: any) => {
            if (!currentData) return currentData;
            return {
                ...currentData,
                projects: (currentData.projects || 0) + 1,
                recent_activity: [
                    {
                        title: `Created project "${title}"`,
                        time: "Just now",
                        type: "success"
                    },
                    ...(currentData.recent_activity || [])
                ]
            };
        }, false); // false = don't revalidate immediately

        try {
            // 2. Real API Call
            await fetchAPI('/api/dashboard/goals/', {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    target_date: new Date().toISOString().split('T')[0], // Default to today
                    metric: 'Tasks Completed',
                    target_value: 10
                })
            });

            // 3. Success
            onClose();
            setTitle('');
            // Trigger actual revalidation to get server truth (eventually)
            mutate(statsKey);

        } catch (err: any) {
            setError(err.message || 'Failed to create project');
            // Rollback optimistic update
            mutate(statsKey);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Layers size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">New Project</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Project Name</label>
                        <input
                            type="text"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-slate-400 font-medium"
                            placeholder="e.g., Website Redesign"
                            value={title}
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <p className="text-xs text-slate-500 mt-2">
                            This will create a new workspace for your tasks and metrics.
                        </p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center">
                            {error}
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !title.trim()}
                            className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 flex items-center"
                        >
                            {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save size={18} className="mr-2" />}
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
