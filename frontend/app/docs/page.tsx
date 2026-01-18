'use client';

import React from 'react';
import { Button } from '@/components/ui';
import { Book, ChevronRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function DocsPage() {
    return (
        <div>
            <div className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-4">
                    <Book size={14} />
                    Documentation
                </div>
                <h1 className="text-4xl font-bold mb-6">Introduction to DevPulse</h1>
                <p className="text-xl text-neutral-500 leading-relaxed mb-8">
                    Welcome to the DevPulse documentation. Learn how to transform your engineering organization with data-driven insights and AI-powered governance.
                </p>
                <div className="p-6 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-start gap-4">
                    <Zap className="text-devpulse-yellow-500 shrink-0 mt-1" />
                    <div>
                        <h4 className="font-bold mb-1">New to DevPulse?</h4>
                        <p className="text-neutral-600 mb-4">Follow our step-by-step Quick Start guide to connect your first repository in under 5 minutes.</p>
                        <Link href="/docs/quick-start">
                            <Button variant="outline" size="sm">View Quick Start</Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {[
                    { title: 'Installation', link: '/docs/installation' },
                    { title: 'Architecture Overview', link: '/docs/architecture' }, // Note: architecture content not added yet, but links work
                    { title: 'Connecting Integrations', link: '/docs/integrations' },
                    { title: 'Managing Users', link: '/docs/user-management' }
                ].map((card, i) => (
                    <Link key={i} href={card.link} className="p-6 rounded-xl border border-neutral-200 hover:border-devpulse-blue-400 hover:shadow-md transition-all group">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-devpulse-blue-600">{card.title}</h3>
                        <p className="text-neutral-500 text-sm mb-4">Learn the fundamentals of setting up and configuring this feature.</p>
                        <div className="flex items-center text-sm font-semibold text-devpulse-blue-600">
                            Read Guide <ChevronRight size={16} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
