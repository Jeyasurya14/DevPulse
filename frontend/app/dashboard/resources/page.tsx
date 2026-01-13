
import { Lock, BookOpen, Crown, FileText, Video } from 'lucide-react';
import Link from 'next/link';

export default function ResourcesPage() {
    return (
        <div className="bg-slate-50 text-slate-900 font-sans h-full">
            <main className="p-8 h-full overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Exclusive Resources</h1>
                    <p className="text-slate-500">Premium guides, tutorials, and tools to help you scale.</p>
                </header>

                {/* Featured Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-4 backdrop-blur-md">
                            <Crown size={14} className="mr-1" /> Premium Only
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Mastering Django Security</h2>
                        <p className="text-blue-100 mb-6 max-w-lg">A deep dive into securing your SaaS application against OWASP Top 10 vulnerabilities.</p>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
                            Access Course
                        </button>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 -mr-16"></div>
                </div>

                {/* Resource Grid */}
                <h3 className="font-bold text-xl mb-4 text-slate-900">Latest Guides</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Locked Content */}
                    <ResourceCard
                        title="Scaling with Kubernetes"
                        type="guide"
                        locked={true}
                    />

                    {/* Unlocked Content */}
                    <ResourceCard
                        title="Dockerizing Next.js"
                        type="video"
                        locked={false}
                    />

                    <ResourceCard
                        title="Payment Integration Patterns"
                        type="guide"
                        locked={true}
                    />
                </div>
            </main>
        </div>
    );
}

function ResourceCard({ title, type, locked }: any) {
    return (
        <div className={`bg-white p-6 rounded-xl border ${locked ? 'border-slate-100 bg-slate-50' : 'border-slate-100'} shadow-sm relative group cursor-pointer hover:shadow-md transition-all`}>
            {locked && (
                <div className="absolute inset-0 bg-slate-50/50 backdrop-blur-[1px] flex items-center justify-center rounded-xl z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link href="/pricing" className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold flex items-center shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                        <Lock size={16} className="mr-2" /> Upgrade to Unlock
                    </Link>
                </div>
            )}
            <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${type === 'video' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                    {type === 'video' ? <Video size={20} /> : <FileText size={20} />}
                </div>
                {locked && <Lock size={16} className="text-slate-400" />}
            </div>
            <h4 className="font-bold text-lg text-slate-800 mb-2">{title}</h4>
            <p className="text-sm text-slate-500">Learn the best practices for production-ready deployments.</p>
        </div>
    )
}
