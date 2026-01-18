'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui';
import { Users, MessageSquare, Heart, Github, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-white font-sans text-neutral-900">
            <Navbar />
            <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 to-amber-50 border-b border-orange-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold mb-6">
                        <Users size={14} />
                        Global Community
                    </div>
                    <h1 className="text-5xl font-bold mb-6">Join the conversation</h1>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-10">
                        Connect with thousands of engineering leaders, share insights, and shape the future of DevPulse.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button variant="primary" className="bg-[#5865F2] hover:bg-[#4752C4] border-none text-white left-icon">
                            <MessageSquare className="mr-2" size={18} /> Join Discord
                        </Button>
                        <Button variant="outline" className="bg-white">
                            <Github className="mr-2" size={18} /> Star on GitHub
                        </Button>
                    </div>
                </div>
            </section>

            <section className="py-20 max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-neutral-50 rounded-3xl p-10 border border-neutral-100">
                        <h2 className="text-2xl font-bold mb-6">Community Guidelines</h2>
                        <ul className="space-y-6">
                            {[
                                { title: 'Be Respectful', desc: 'Treat everyone with respect and kindness. We are all here to learn.' },
                                { title: 'Share Knowledge', desc: 'Don’t be afraid to ask questions or share your own experiences.' },
                                { title: 'No Spam', desc: 'Keep discussions relevant to engineering and DevPulse.' }
                            ].map((item, i) => (
                                <li key={i} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-devpulse-blue-600 shadow-sm shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">{item.title}</h4>
                                        <p className="text-neutral-500 text-sm">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <div className="p-8 rounded-3xl border border-neutral-200 hover:border-devpulse-blue-300 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Twitter size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900">Follow us on Twitter</h3>
                            </div>
                            <p className="text-neutral-500 mb-4">Get real-time updates and engineering tips directly in your feed.</p>
                            <div className="text-blue-600 font-semibold text-sm group-hover:underline">@DevPulseHQ</div>
                        </div>

                        <div className="p-8 rounded-3xl border border-neutral-200 hover:border-devpulse-blue-300 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-white">
                                    <Github size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900">Contribute on GitHub</h3>
                            </div>
                            <p className="text-neutral-500 mb-4">Report bugs, request features, or contribute to our open-source adapters.</p>
                            <div className="text-neutral-900 font-semibold text-sm group-hover:underline">github.com/devpulse</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
