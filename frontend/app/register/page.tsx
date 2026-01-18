'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Github, Mail, CheckCircle, ArrowRight, BarChart3, Shield, Globe, Star } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { Button } from '@/components/ui';

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!acceptedTerms) {
            setError('Please accept the terms and conditions');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await fetchAPI('/api/auth/register/', {
                method: 'POST',
                body: JSON.stringify(formData),
            });
            router.push('/login');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const benefits = [
        { icon: BarChart3, text: 'Real-time DORA metrics tracking' },
        { icon: Shield, text: 'AI-powered security scanning' },
        { icon: Globe, text: '20+ integration connectors' },
    ];

    const socialProof = [
        '10,000+ engineers trust DevPulse',
        '500+ companies worldwide',
        '99.9% uptime SLA',
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
                <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-devpulse-blue-500/50 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-devpulse-yellow-400/20 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10 max-w-lg text-white flex flex-col h-full justify-between py-12">
                    <div>
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                                <Zap className="text-devpulse-yellow-400 fill-devpulse-yellow-400" size={24} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">DevPulse</span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold leading-[1.15] mb-6 tracking-tight">
                            Start your journey. <br />
                            <span className="text-devpulse-yellow-400">Scale without limits.</span>
                        </h2>
                        <p className="text-lg text-devpulse-blue-100 font-medium leading-relaxed max-w-md opacity-90">
                            Join over 10,000 engineers using DevPulse to ship cleaner code, faster. Get full visibility into your DORA metrics today.
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
                                "The insights we gained from DevPulse helped us identify bottlenecks we didn't know existed. It's an essential tool for any scaling team."
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white text-lg shadow-lg">
                                    MR
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-neutral-900">Michael Ross</p>
                                    <p className="text-neutral-600 text-sm">CTO at ScaleUp Inc.</p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="pt-4 border-t border-white/10">
                            <p className="text-sm font-semibold text-devpulse-blue-200 mb-4 uppercase tracking-wider">Trusted by innovative teams at</p>
                            <div className="flex items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                                <span className="text-xl font-bold font-display">MetaLab</span>
                                <span className="text-xl font-bold font-display">Vercel</span>
                                <span className="text-xl font-bold font-display">Stripe</span>
                                <span className="text-xl font-bold font-display">Shopify</span>
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
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-900">Create your account</h2>
                        <p className="mt-2 text-neutral-500">
                            Already have an account?{' '}
                            <Link href="/login" className="font-semibold text-devpulse-blue-600 hover:text-devpulse-blue-700 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    {error && (
                        <div className="p-4 bg-error-50 border border-error-100 rounded-xl text-error-700 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleRegister}>
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Username</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-devpulse-blue-500 focus:border-transparent transition-all shadow-sm"
                                placeholder="johndoe"
                                value={formData.username}
                                onChange={e => setFormData({ ...formData, username: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Work Email</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-devpulse-blue-500 focus:border-transparent transition-all shadow-sm"
                                placeholder="name@company.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-2">Password</label>
                            <input
                                type="password"
                                required
                                minLength={8}
                                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3.5 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-devpulse-blue-500 focus:border-transparent transition-all shadow-sm"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />
                            <p className="mt-1.5 text-xs text-neutral-400">Minimum 8 characters</p>
                        </div>

                        <div className="flex items-start gap-3">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-devpulse-blue-600 focus:ring-devpulse-blue-500"
                            />
                            <label htmlFor="terms" className="text-sm text-neutral-600">
                                I agree to the{' '}
                                <Link href="/terms-of-service" className="text-devpulse-blue-600 hover:underline">Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="/privacy-policy" className="text-devpulse-blue-600 hover:underline">Privacy Policy</Link>
                            </label>
                        </div>

                        <Button
                            type="submit"
                            variant="cta"
                            fullWidth
                            isLoading={loading}
                            size="lg"
                            rightIcon={!loading ? <ArrowRight size={18} /> : undefined}
                        >
                            Start Free Trial
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-neutral-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-neutral-50 text-neutral-500">Or sign up with</span>
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
