'use client';

import { useState } from 'react';
import { Lock, BookOpen, Crown, FileText, Video, X, PlayCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

// Mock Data for Content
const COURSES = [
    {
        id: 'django-security',
        title: 'Mastering Django Security',
        description: 'A deep dive into securing your SaaS application against OWASP Top 10 vulnerabilities.',
        fullContent: `
            ### Course Overview
            Security isn't an afterthought; it's a feature. In this comprehensive course, we cover:
            
            1. **SQL Injection Prevention**: Leveraging Django's ORM.
            2. **XSS Protection**: Template auto-escaping and CSP headers.
            3. **CSRF Middleware**: Proper configuration for APIs.
            4. **Authentication**: JWTs vs Sessions in 2024.
            
            **Duration**: 4 hours | **Level**: Advanced
        `,
        type: 'guide',
        locked: false,
        modules: ['Intro to OWASP', 'Secure Headers', 'Auth Patterns', 'Pen-Testing 101']
    },
    {
        id: 'kubernetes-scaling',
        title: 'Scaling with Kubernetes',
        description: 'Learn the best practices for production-ready deployments and auto-scaling.',
        fullContent: `
            ### Scaling Strategies
            From zero to hero with K8s. We explore:
            - **Pod Autoscaling (HPA)**: Metric-based scaling.
            - **Ingress Controllers**: Nginx vs Traefik.
            - **StatefulSets**: Running databases on K8s (and why you shouldn't).
        `,
        type: 'guide',
        locked: true,
        modules: ['K8s Architecture', 'Deploying Helm Charts', 'Monitoring with Prometheus']
    },
    {
        id: 'docker-nextjs',
        title: 'Dockerizing Next.js',
        description: 'Containerize your full-stack React applications for consistent builds.',
        fullContent: `
            ### Containerization Basics
            Stop "it works on my machine".
            - Writing a multi-stage **Dockerfile**.
            - Optimizing build cache.
            - Managing environment variables safely.
        `,
        type: 'video',
        locked: false,
        modules: ['Dockerfile Basics', 'Multi-stage Builds', 'Docker Compose for Dev']
    },
    {
        id: 'payment-integration',
        title: 'Payment Integration Patterns',
        description: 'Robust patterns for handling Stripe webhooks and subscription states.',
        fullContent: `
            ### Handling Money Securely
            - Idempotency keys.
            - Webhook signature verification.
            - Reconciling failed payments.
        `,
        type: 'guide',
        locked: true,
        modules: ['Stripe API Intro', 'Webhook Handlers', 'Testing Payments']
    }
];

export default function ResourcesPage() {
    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    return (
        <div className="bg-slate-50 text-slate-900 font-sans h-full relative">
            <main className="p-8 h-full overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Exclusive Resources</h1>
                    <p className="text-slate-500">Premium guides, tutorials, and tools to help you scale.</p>
                </header>

                {/* Featured Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-4 backdrop-blur-md">
                            <Crown size={14} className="mr-1" /> Premium Only
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Mastering Django Security</h2>
                        <p className="text-blue-100 mb-6 max-w-lg">A deep dive into securing your SaaS application against OWASP Top 10 vulnerabilities.</p>
                        <button
                            onClick={() => setSelectedCourse(COURSES[0])}
                            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg"
                        >
                            Access Course
                        </button>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 -mr-16 transition-transform group-hover:skew-x-6"></div>
                </div>

                {/* Resource Grid */}
                <h3 className="font-bold text-xl mb-4 text-slate-900">Latest Guides</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {COURSES.slice(1).map((course) => (
                        <ResourceCard
                            key={course.id}
                            course={course}
                            onClick={() => setSelectedCourse(course)}
                        />
                    ))}
                </div>
            </main>

            {/* Course Content Modal */}
            {selectedCourse && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">{selectedCourse.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${selectedCourse.type === 'video' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                        {selectedCourse.type}
                                    </span>
                                    {selectedCourse.locked && <span className="text-xs text-amber-600 font-bold flex items-center"><Lock size={12} className="mr-1" /> Locked</span>}
                                </div>
                            </div>
                            <button onClick={() => setSelectedCourse(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                                <X size={24} className="text-slate-500" />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto">
                            {selectedCourse.locked ? (
                                <div className="text-center py-12">
                                    <Lock size={48} className="mx-auto text-slate-300 mb-4" />
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">This content is locked</h3>
                                    <p className="text-slate-500 mb-6 max-w-md mx-auto">Upgrade to the Pro plan to access this exclusive guide and all other premium resources.</p>
                                    <Link href="/pricing" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                                        <Crown size={18} className="mr-2" /> Upgrade Now
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <div className="prose prose-slate max-w-none mb-8">
                                        <div dangerouslySetInnerHTML={{
                                            __html: selectedCourse.fullContent.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/### (.*)/g, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
                                        }} />
                                    </div>

                                    <h4 className="font-bold text-slate-900 mb-4 flex items-center"><BookOpen size={18} className="mr-2" /> Course Modules</h4>
                                    <div className="space-y-3">
                                        {selectedCourse.modules.map((mod: string, idx: number) => (
                                            <div key={idx} className="flex items-center p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                                                <div className="mr-3 bg-white p-2 rounded-full border border-slate-100 text-slate-400">
                                                    {selectedCourse.type === 'video' ? <PlayCircle size={20} /> : <FileText size={20} />}
                                                </div>
                                                <span className="font-medium text-slate-700">{mod}</span>
                                                <CheckCircle size={16} className="ml-auto text-green-500 opacity-0" />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {!selectedCourse.locked && (
                            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                                <button onClick={() => alert("Starting course...")} className="bg-slate-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors">
                                    Start Learning
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function ResourceCard({ course, onClick }: any) {
    const { title, type, locked, description } = course;
    return (
        <div onClick={onClick} className={`bg-white p-6 rounded-xl border ${locked ? 'border-slate-100 bg-slate-50' : 'border-slate-100'} shadow-sm relative group cursor-pointer hover:shadow-md transition-all`}>
            {locked && (
                <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[1px] flex items-center justify-center rounded-xl z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold flex items-center shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Lock size={16} className="mr-2" /> Upgrade to Unlock
                    </div>
                </div>
            )}
            <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${type === 'video' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                    {type === 'video' ? <Video size={20} /> : <FileText size={20} />}
                </div>
                {locked && <Lock size={16} className="text-slate-400" />}
            </div>
            <h4 className="font-bold text-lg text-slate-800 mb-2">{title}</h4>
            <p className="text-sm text-slate-500 line-clamp-2">{description}</p>
        </div>
    )
}
