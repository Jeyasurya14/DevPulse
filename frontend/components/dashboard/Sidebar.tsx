'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Code2, CreditCard, Settings, LogOut, BarChart2, Zap, Home, Sparkles, Target, MessageSquare, Globe, BookOpen, Shield } from 'lucide-react';
import UsageCard from './UsageCard';
import RecommendationWidget from './RecommendationWidget';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-slate-900 text-white h-screen p-4 flex flex-col shadow-xl z-20">
            <div className="mb-8 px-2 mt-2">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <img src="/logo.png" alt="Learnmade" className="h-10 w-auto object-contain" />
                </Link>
            </div>

            <nav className="space-y-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                <Link href="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 text-slate-400 transition-all font-medium group">
                    <Home size={20} className="group-hover:text-blue-400 transition-colors" />
                    <span>Overview</span>
                </Link>
                <Link href="/dashboard/analysis" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 text-slate-400 transition-all font-medium group">
                    <Sparkles size={20} className="group-hover:text-blue-400 transition-colors" />
                    <span>Code Analysis</span>
                </Link>
                <Link href="/dashboard/goals" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 text-slate-400 transition-all font-medium group">
                    <Target size={20} className="group-hover:text-blue-400 transition-colors" />
                    <span>Goal Tracker</span>
                </Link>
                <Link href="/dashboard/collaboration" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 text-slate-400 transition-all font-medium group">
                    <MessageSquare size={20} className="group-hover:text-blue-400 transition-colors" />
                    <span>Collaboration</span>
                </Link>
                <Link href="/dashboard/integrations" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 text-slate-400 transition-all font-medium group">
                    <Globe size={20} className="group-hover:text-blue-400 transition-colors" />
                    <span>Integrations</span>
                </Link>
                <Link href="/dashboard/resources" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 text-slate-400 transition-all font-medium group">
                    <BookOpen size={20} className="group-hover:text-blue-400 transition-colors" />
                    <span>Resources</span>
                </Link>
                {/* Admin Link (Access controlled by page) */}
                <Link href="/dashboard/admin" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-600/20 hover:text-purple-400 text-slate-400 transition-all font-medium group">
                    <Shield size={20} className="group-hover:text-purple-400 transition-colors" />
                    <span>Admin Panel</span>
                </Link>
            </nav>

            <div className="p-4 border-t border-slate-800 space-y-4">
                <RecommendationWidget />
                <UsageCard />

                <button className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors w-full px-4 py-2 rounded-lg hover:bg-slate-800">
                    <LogOut size={20} />
                    <span>Log Out</span>
                </button>
                <Link href="/dashboard/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 text-slate-400 transition-all font-medium mt-2">
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
