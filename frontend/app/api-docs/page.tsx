'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui';
import { Code, Copy, Check } from 'lucide-react';

export default function ApiDocsPage() {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-white font-sans text-neutral-900">
            <Navbar />
            <div className="flex pt-20 h-screen overflow-hidden">
                {/* Sidebar */}
                <div className="w-64 border-r border-neutral-200 bg-neutral-50 overflow-y-auto hidden md:block pt-8 pb-20">
                    <div className="px-6 mb-6">
                        <h3 className="font-bold text-sm uppercase text-neutral-500 mb-2">Introduction</h3>
                        <ul className="space-y-1 text-sm">
                            <li><a href="#" className="block py-1.5 px-3 rounded-lg bg-devpulse-blue-50 text-devpulse-blue-700 font-medium">Overview</a></li>
                            <li><a href="#" className="block py-1.5 px-3 rounded-lg text-neutral-600 hover:bg-neutral-100">Authentication</a></li>
                            <li><a href="#" className="block py-1.5 px-3 rounded-lg text-neutral-600 hover:bg-neutral-100">Rate Limits</a></li>
                        </ul>
                    </div>
                    <div className="px-6">
                        <h3 className="font-bold text-sm uppercase text-neutral-500 mb-2">Endpoints</h3>
                        <ul className="space-y-1 text-sm">
                            <li><a href="#" className="block py-1.5 px-3 rounded-lg text-neutral-600 hover:bg-neutral-100">Metrics</a></li>
                            <li><a href="#" className="block py-1.5 px-3 rounded-lg text-neutral-600 hover:bg-neutral-100">Deployments</a></li>
                            <li><a href="#" className="block py-1.5 px-3 rounded-lg text-neutral-600 hover:bg-neutral-100">Teams</a></li>
                        </ul>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto pt-12 pb-20 px-8 lg:px-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-semibold mb-6">
                                <Code size={14} />
                                API v1.0
                            </div>
                            <h1 className="text-4xl font-bold mb-6">API Reference</h1>
                            <p className="text-xl text-neutral-500 mb-8">
                                DevPulse provides a RESTful API for interacting with your engineering data programmatically.
                            </p>
                        </div>

                        <div className="space-y-12">
                            {/* Authentication Section */}
                            <section>
                                <h2 className="text-2xl font-bold mb-4">Authentication</h2>
                                <p className="text-neutral-600 mb-6">
                                    Authenticate your requests by including your API key in the `Authorization` header.
                                </p>
                                <div className="bg-neutral-900 rounded-xl p-6 text-sm font-mono text-neutral-300 relative group">
                                    <button
                                        onClick={handleCopy}
                                        className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                    <div className="mb-2 text-neutral-500"># Example Request</div>
                                    <div>
                                        <span className="text-purple-400">curl</span> https://api.devpulse.io/v1/metrics \<br />
                                        &nbsp;&nbsp;-H <span className="text-green-400">"Authorization: Bearer YOUR_API_KEY"</span>
                                    </div>
                                </div>
                            </section>

                            <hr className="border-neutral-100" />

                            {/* Endpoint Example */}
                            <section>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase">GET</span>
                                    <h3 className="text-xl font-bold">List Metrics</h3>
                                </div>
                                <p className="text-neutral-600 mb-6">
                                    Retrieves a list of DORA metrics for a specific time range.
                                </p>
                                <h4 className="font-bold text-sm mb-3">Parameters</h4>
                                <div className="border border-neutral-200 rounded-lg overflow-hidden mb-6">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-neutral-50 text-neutral-500">
                                            <tr>
                                                <th className="px-4 py-3 font-semibold">Name</th>
                                                <th className="px-4 py-3 font-semibold">Type</th>
                                                <th className="px-4 py-3 font-semibold">Description</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-neutral-200">
                                            <tr>
                                                <td className="px-4 py-3 font-mono text-devpulse-blue-600">start_date</td>
                                                <td className="px-4 py-3 text-neutral-500">string</td>
                                                <td className="px-4 py-3 text-neutral-600">Start date in ISO 8601 format (YYYY-MM-DD)</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-3 font-mono text-devpulse-blue-600">end_date</td>
                                                <td className="px-4 py-3 text-neutral-500">string</td>
                                                <td className="px-4 py-3 text-neutral-600">End date in ISO 8601 format (YYYY-MM-DD)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
