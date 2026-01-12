
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Loader2 } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await fetchAPI('/api/auth/register/', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            router.push('/login');
        } catch (error: any) {
            alert(error.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Form Side - Left */}
            <div className="flex-1 flex items-center justify-center p-8 bg-white order-last lg:order-first">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create your account</h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Work Email</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                    placeholder="name@company.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Register v3'}
                        </button>

                        <p className="text-xs text-center text-slate-500">
                            By clicking "Get Started", you agree to our Terms of Service and Privacy Policy.
                        </p>
                    </form>
                </div>
            </div>

            {/* Visual Side */}
            <div className="hidden lg:flex flex-1 relative items-center justify-center p-12 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-20" />

                <div className="relative z-10 max-w-lg text-right text-white">
                    <div className="flex items-center justify-end gap-3 mb-8">
                        <h1 className="text-3xl font-bold tracking-tight">Learnmade</h1>
                        <div className="p-2 bg-blue-600 rounded-xl shadow-lg">
                            <Zap className="text-white fill-current" size={28} />
                        </div>
                    </div>
                    <h2 className="text-5xl font-bold leading-tight mb-6">Designed for scale.</h2>
                    <p className="text-xl text-slate-300 font-medium leading-relaxed">
                        "Learnmade transformed how we calculate velocity. It's the command center every CTO dreams of."
                    </p>
                    <p className="mt-6 text-sm text-slate-400 font-bold uppercase tracking-wider">- Sarah J., VP Engineering at TechFlow</p>
                </div>
            </div>
        </div>
    );
}
