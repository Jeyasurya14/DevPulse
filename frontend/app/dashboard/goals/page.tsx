
'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Target, Plus, TrendingUp, Calendar } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

interface Goal {
    title: string;
    target_date: string;
    metric: string;
    target_value: number;
    current_value: number;
    status: string;
}

export default function GoalsPage() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newGoal, setNewGoal] = useState({ title: '', target_value: 10, metric: 'Commits', target_date: '' });

    useEffect(() => {
        loadGoals();
    }, []);

    const loadGoals = async () => {
        try {
            const data = await fetchAPI('/api/dashboard/goals/');
            setGoals(data);
        } catch (error) {
            console.error('Failed to load goals');
        } finally {
            setLoading(false);
        }
    };

    const createGoal = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetchAPI('/api/dashboard/goals/', {
                method: 'POST',
                body: JSON.stringify(newGoal),
            });
            setShowModal(false);
            loadGoals();
        } catch (error) {
            alert('Error creating goal');
        }
    };

    const updateProgress = async (goal: Goal, delta: number) => {
        const newValue = Math.min(goal.target_value, goal.current_value + delta);
        try {
            await fetchAPI(`/api/dashboard/goals/${goal.title}/`, {
                method: 'PATCH',
                body: JSON.stringify({ current_value: newValue }),
            });
            // Optimistic update
            setGoals(goals.map(g => g.title === goal.title ? { ...g, current_value: newValue } : g));
        } catch (error) {
            console.error('Error updating goal');
        }
    }

    return (
        <div className="flex h-screen bg-gray-950 text-white font-sans">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Goal Tracking</h1>
                        <p className="text-gray-400">Set ambitious targets and track your growth.</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                    >
                        <Plus size={20} /> New Goal
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {goals.map((goal, idx) => (
                        <div key={idx} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Target size={100} />
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">{goal.title}</h3>
                                        <div className="flex items-center text-sm text-gray-400 gap-2">
                                            <Calendar size={14} /> <span>Target: {goal.target_date || 'No Date'}</span>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${goal.current_value >= goal.target_value ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                                        }`}>
                                        {goal.current_value >= goal.target_value ? 'Completed' : 'In Progress'}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-400">Progress</span>
                                        <span className="font-mono text-white">{goal.current_value} / {goal.target_value} {goal.metric}</span>
                                    </div>
                                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                                            style={{ width: `${Math.min(100, (goal.current_value / goal.target_value) * 100)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 mt-4">
                                    <button onClick={() => updateProgress(goal, 1)} className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors">
                                        +1 Progress
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                        <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md p-6">
                            <h2 className="text-2xl font-bold mb-4">Create New Goal</h2>
                            <form onSubmit={createGoal} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Goal Title</label>
                                    <input
                                        type="text"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                        placeholder="e.g. Learn Rust"
                                        value={newGoal.title}
                                        onChange={e => setNewGoal({ ...newGoal, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Target Value</label>
                                        <input
                                            type="number"
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                            value={newGoal.target_value}
                                            onChange={e => setNewGoal({ ...newGoal, target_value: parseInt(e.target.value) })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Metric</label>
                                        <input
                                            type="text"
                                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                            placeholder="Commits"
                                            value={newGoal.metric}
                                            onChange={e => setNewGoal({ ...newGoal, metric: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Target Date</label>
                                    <input
                                        type="date"
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-blue-500"
                                        value={newGoal.target_date}
                                        onChange={e => setNewGoal({ ...newGoal, target_date: e.target.value })}
                                    />
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded-lg font-medium transition-colors">Cancel</button>
                                    <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-medium transition-colors">Create Goal</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
