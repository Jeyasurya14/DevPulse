'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Code2, CreditCard, Settings, LogOut, BarChart2, Zap, Home, Sparkles, Target, MessageSquare, Globe, BookOpen } from 'lucide-react';
import UsageCard from './UsageCard';
import RecommendationWidget from './RecommendationWidget';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-slate-900 text-white h-screen p-4 flex flex-col shadow-xl z-20">
            <div className="mb-10 px-2 mt-2">
                <h1 className="text-2xl font-bold flex items-center gap-3 tracking-tight">
                    {/* <div className="bg-blue-500 p-1.5 rounded-lg">
                        <Zap size={20} className="text-white fill-current" />
                    </div> */}
                    <img src="/logo.png" alt="Learnmade Logo" className="h-8 w-auto object-contain" />
                    {/* Learnmade */}
                </h1>
            </div>

            <nav className="space-y-1 flex-1">
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
            </nav>

            <div className="p-4 border-t border-slate-800 space-y-4">
                <RecommendationWidget />
                <UsageCard />

                <button className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors w-full px-4 py-2 rounded-lg hover:bg-slate-800">
                    <LogOut size={20} />
                    <span>Log Out</span>
                </button>
                <Link href="/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-600/20 hover:text-blue-400 text-slate-400 transition-all font-medium mt-2">
                    <Settings size={20} />
                    <span>Settings</span>
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
