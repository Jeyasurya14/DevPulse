'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { docCategories } from './doc-data';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-white font-sans text-neutral-900">
            <Navbar />
            <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
                {/* Sidebar */}
                <div className="hidden md:block col-span-1 space-y-8 sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto pr-4">
                    {docCategories.map((cat, idx) => (
                        <div key={idx}>
                            <h3 className="font-bold text-sm uppercase tracking-wider text-neutral-500 mb-4">{cat.title}</h3>
                            <ul className="space-y-3">
                                {cat.items.map((item, i) => {
                                    const href = `/docs/${item.slug}`;
                                    const isActive = pathname === href;
                                    return (
                                        <li key={i}>
                                            <Link
                                                href={href}
                                                className={`text-sm font-medium transition-colors block py-1 ${isActive ? 'text-devpulse-blue-600' : 'text-neutral-600 hover:text-devpulse-blue-600'}`}
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className="md:col-span-3">
                    {children}
                </div>
            </div>
        </div>
    );
}
