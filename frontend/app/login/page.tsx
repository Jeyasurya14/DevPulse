'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Loader2, ArrowRight, Github, Mail, Shield, TrendingUp, Users, Star } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await fetchAPI('/api/auth/login/', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            router.push('/dashboard');
        } catch (err: any) {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const features = [
        { icon: TrendingUp, text: 'Real-time DORA metrics' },
        { icon: Shield, text: 'AI-powered code governance' },
        { icon: Users, text: 'Team collaboration tools' },
    ];

    return (
        <div className="flex min-h-screen bg-white text-neutral-900 font-sans">
            {/* Visual Side */}
            <div
                className="hidden lg:flex flex-1 relative items-center justify-center p-12 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0052CC 0%, #003380 100%)' }}
            >
                {/* Background patterns */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-devpulse-blue-500/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-devpulse-yellow-400/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 max-w-lg text-white flex flex-col h-full justify-between py-12">
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                                <Zap className="text-devpulse-yellow-400 fill-devpulse-yellow-400" size={24} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">DevPulse</span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold leading-[1.15] mb-6 tracking-tight">
                            Build with confidence. <br />
                            <span className="text-devpulse-yellow-400">Ship with speed.</span>
                        </h2>
                        <p className="text-lg text-devpulse-blue-100 font-medium leading-relaxed max-w-md opacity-90">
                            The complete engineering intelligence platform. Measure visibility, automate code reviews, and accelerate delivery velocity.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Testimonial Card */}
                        <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl text-neutral-900">
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((_, i) => (
                                    <Star key={i} size={16} className="text-devpulse-yellow-500 fill-devpulse-yellow-500" />
                                ))}
                            </div>
                            <p className="text-xl font-medium leading-relaxed mb-6 font-display text-neutral-900">
                                "DevPulse gave us the visibility we needed to scale. We reduced our lead time by 40% in just two months. It's an absolute game-changer for engineering leaders."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-devpulse-yellow-400 to-orange-500 flex items-center justify-center font-bold text-neutral-900 text-lg shadow-lg">
                                    SC
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-neutral-900">Sarah Chen</p>
                                    <p className="text-neutral-600 text-sm">VP of Engineering at TechFlow</p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="pt-4 border-t border-white/10">
                            <p className="text-sm font-semibold text-devpulse-blue-200 mb-4 uppercase tracking-wider">Trusted by innovative teams at</p>
                            <div className="flex items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                                <span className="text-xl font-bold font-display">ACME Corp</span>
                                <span className="text-xl font-bold font-display">StarkInd</span>
                                <span className="text-xl font-bold font-display">Globex</span>
                                <span className="text-xl font-bold font-display">Umbrella</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex-1 flex items-center justify-center p-6 md:p-8 bg-neutral-50">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                        <div className="bg-devpulse-blue-600 p-2 rounded-lg">
                            <Zap className="text-white fill-devpulse-yellow-400" size={20} />
                        </div>
                        <span className="text-2xl font-bold text-neutral-900">DevPulse</span>
                    </div>

                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Welcome back</h2>
                        <p className="mt-2 text-neutral-500">
                            New to DevPulse?{' '}
                            <Link href="/register" className="font-semibold text-devpulse-blue-600 hover:text-devpulse-blue-700 transition-colors">
                                Start your free trial
                            </Link>
                        </p>
                    </div>

                    {error && (
                        <div className="p-4 bg-error-50 border border-error-100 rounded-xl text-error-700 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Username</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-devpulse-blue-500 focus:border-transparent transition-all shadow-sm"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={e => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-semibold text-neutral-700">Password</label>
                                <a href="#" className="text-sm font-semibold text-devpulse-blue-600 hover:text-devpulse-blue-700">
                                    Forgot password?
                                </a>
                            </div>
                            <input
                                type="password"
                                required
                                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-devpulse-blue-500 focus:border-transparent transition-all shadow-sm"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded border-neutral-300 text-devpulse-blue-600 focus:ring-devpulse-blue-500"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-600">
                                Remember me for 30 days
                            </label>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            isLoading={loading}
                            size="lg"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-neutral-50 text-neutral-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 rounded-xl bg-white text-sm font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors">
                            <Github size={18} />
                            GitHub
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 border border-neutral-200 rounded-xl bg-white text-sm font-semibold text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors">
                            <Mail size={18} />
                            Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
