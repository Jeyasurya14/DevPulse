'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Code2, CreditCard, Settings, LogOut, BarChart2, Zap, Home, Sparkles, Target, MessageSquare, Globe, BookOpen, Shield } from 'lucide-react';
import UsageCard from './UsageCard';
import RecommendationWidget from './RecommendationWidget';


import Image from 'next/image';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    isAdmin?: boolean;
}

const Sidebar = ({ isOpen = true, onClose, isAdmin = false }: SidebarProps) => {
    return (
        <>
            <aside className={`
            fixed md:relative 
            top-0 left-0 
            h-screen w-64 
            bg-slate-900 text-white 
            p-4 flex flex-col shadow-xl z-40 
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
                <div className="mb-8 px-2 mt-2 flex justify-between items-center">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="relative h-10 w-32">
                            <Image
                                src="/logo.png"
                                alt="Learnmade"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>
                    {/* Close button for mobile inside sidebar */}
                    <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                <nav className="space-y-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
                    <Link
                        href="/dashboard"
                        onClick={onClose}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-brand-600/20 hover:text-brand-400 text-slate-400 transition-all font-medium group"
                    >
                        <Home size={20} className="group-hover:text-brand-400 transition-colors" />
                        <span>Overview</span>
                    </Link>
                    <Link
                        href="/dashboard/analysis"
                        onClick={onClose}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-brand-600/20 hover:text-brand-400 text-slate-400 transition-all font-medium group"
                    >
                        <Sparkles size={20} className="group-hover:text-brand-400 transition-colors" />
                        <span>Code Analysis</span>
                    </Link>
                    <Link
                        href="/dashboard/goals"
                        onClick={onClose}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-brand-600/20 hover:text-brand-400 text-slate-400 transition-all font-medium group"
                    >
                        <Target size={20} className="group-hover:text-brand-400 transition-colors" />
                        <span>Goal Tracker</span>
                    </Link>
                    <Link
                        href="/dashboard/collaboration"
                        onClick={onClose}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-brand-600/20 hover:text-brand-400 text-slate-400 transition-all font-medium group"
                    >
                        <MessageSquare size={20} className="group-hover:text-brand-400 transition-colors" />
                        <span>Collaboration</span>
                    </Link>
                    <Link
                        href="/dashboard/integrations"
                        onClick={onClose}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-brand-600/20 hover:text-brand-400 text-slate-400 transition-all font-medium group"
                    >
                        <Globe size={20} className="group-hover:text-brand-400 transition-colors" />
                        <span>Integrations</span>
                    </Link>
                    <Link
                        href="/dashboard/resources"
                        onClick={onClose}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-brand-600/20 hover:text-brand-400 text-slate-400 transition-all font-medium group"
                    >
                        <BookOpen size={20} className="group-hover:text-brand-400 transition-colors" />
                        <span>Resources</span>
                    </Link>
                    {/* Admin Link (Access controlled by page) */}
                    {isAdmin && (
                        <Link
                            href="/dashboard/admin"
                            onClick={onClose}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-600/20 hover:text-purple-400 text-slate-400 transition-all font-medium group"
                        >
                            <Shield size={20} className="group-hover:text-purple-400 transition-colors" />
                            <span>Admin Panel</span>
                        </Link>
                    )}
                </nav>

                <div className="p-4 border-t border-slate-800 space-y-4">
                    <RecommendationWidget />
                    <UsageCard />

                    <button className="flex items-center space-x-3 text-slate-400 hover:text-white transition-colors w-full px-4 py-2 rounded-lg hover:bg-slate-800">
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                    <Link
                        href="/dashboard/settings"
                        onClick={onClose}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-brand-600/20 hover:text-brand-400 text-slate-400 transition-all font-medium mt-2"
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
