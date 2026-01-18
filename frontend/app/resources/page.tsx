'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui';
import { Book, FileText, Code, Users, ArrowRight, Play, Zap, Search } from 'lucide-react';

export default function ResourcesPage() {
    const resources = [
        {
            icon: Book,
            title: 'Documentation',
            description: 'Comprehensive guides and tutorials to help you get the most out of DevPulse.',
            link: '/docs',
            color: 'text-blue-600',
            bg: 'bg-blue-50',
        },
        {
            icon: FileText,
            title: 'Blog',
            description: 'Latest engineering insights, industry trends, and product updates from our team.',
            link: '/blog',
            color: 'text-purple-600',
            bg: 'bg-purple-50',
        },
        {
            icon: Code,
            title: 'API Reference',
            description: 'Detailed API documentation for integrating DevPulse into your custom workflow.',
            link: '/api-docs',
            color: 'text-green-600',
            bg: 'bg-green-50',
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Join our community of engineering leaders to share best practices and tips.',
            link: '/community',
            color: 'text-orange-600',
            bg: 'bg-orange-50',
        }
    ];

    const popularArticles = [
        { title: 'How to improve DORA metrics in 30 days', category: 'Guide', readTime: '5 min' },
        { title: 'The state of Engineering Productivity 2026', category: 'Report', readTime: '12 min' },
        { title: 'Automating code reviews with AI', category: 'Tutorial', readTime: '8 min' },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-neutral-900">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-neutral-50 border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-devpulse-blue-50 text-devpulse-blue-700 text-sm font-semibold mb-6">
                            <Zap size={14} />
                            Knowledge Base
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                            Resources to help you <br />
                            <span className="text-devpulse-blue-600">build better</span>
                        </h1>
                        <p className="text-xl text-neutral-500 mb-10 leading-relaxed">
                            Everything you need to master DevPulse and transform your engineering organization.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="text-neutral-400" size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search guides, tutorials, and docs..."
                                className="w-full pr-4 py-4 rounded-xl border border-neutral-200 shadow-sm focus:ring-2 focus:ring-devpulse-blue-500 focus:border-transparent outline-none transition-all"
                                style={{ paddingLeft: '3.5rem' }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Resource Grid */}
            <section className="py-20 lg:py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                        {resources.map((resource, idx) => (
                            <Link
                                key={idx}
                                href={resource.link}
                                className="group p-8 rounded-2xl border border-neutral-100 bg-white hover:border-devpulse-blue-200 hover:shadow-lg transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-xl ${resource.bg} ${resource.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <resource.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-devpulse-blue-600 transition-colors">
                                    {resource.title}
                                </h3>
                                <p className="text-neutral-500 leading-relaxed mb-4">
                                    {resource.description}
                                </p>
                                <div className="flex items-center text-sm font-semibold text-neutral-900 group-hover:text-devpulse-blue-600">
                                    Explore <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Popular Content */}
                    <div className="bg-devpulse-blue-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                        {/* Background Patterns */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-devpulse-blue-500/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-devpulse-yellow-400/10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Popular Articles</h2>
                                <p className="text-devpulse-blue-100 text-lg mb-8 max-w-md">
                                    Read what's trending in the engineering leadership community this week.
                                </p>
                                <Button variant="primary" className="bg-white text-devpulse-blue-900 hover:bg-neutral-100 border-none">
                                    View all articles
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {popularArticles.map((article, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-devpulse-yellow-400">
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-lg group-hover:text-devpulse-yellow-400 transition-colors">{article.title}</h4>
                                                <div className="flex items-center gap-3 text-sm text-devpulse-blue-200">
                                                    <span>{article.category}</span>
                                                    <span className="w-1 h-1 rounded-full bg-devpulse-blue-400" />
                                                    <span>{article.readTime} read</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold mb-6">Can't find what you're looking for?</h2>
                    <p className="text-lg text-neutral-500 mb-8">
                        Our support team is available 24/7 to help you with any questions.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link href="/contact">
                            <Button variant="outline" size="lg">Contact Support</Button>
                        </Link>
                        <Link href="/docs">
                            <Button variant="primary" size="lg">Visit Help Center</Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
