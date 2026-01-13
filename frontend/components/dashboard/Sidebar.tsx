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
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/dashboard' && pathname === '/dashboard') return true;
        if (path !== '/dashboard' && pathname?.startsWith(path)) return true;
        return false;
    };

    const NavItem = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => {
        const active = isActive(href);
        return (
            <Link
                href={href}
                onClick={onClose}
                className={`
                    flex items-center space-x-3 p-3 mx-2 rounded-xl transition-all duration-300 font-medium group relative overflow-hidden
                    ${active
                        ? 'bg-indigo-600/20 text-indigo-300 shadow-glow border border-indigo-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }
                `}
            >
                {active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent pointer-events-none" />
                )}
                <Icon size={20} className={`transition-colors relative z-10 ${active ? 'text-indigo-400' : 'group-hover:text-white'}`} />
                <span className="relative z-10">{label}</span>
            </Link>
        );
    };

    return (
        <>
            <aside className={`
            fixed md:relative 
            top-0 left-0 
            h-screen w-72 
            bg-[#0B1120] text-white 
            border-r border-white/5
            flex flex-col shadow-2xl z-50 
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 ml-0 md:ml-0'}
            md:flex-shrink-0
        `}>
                <div className="mb-6 px-6 mt-6 flex justify-between items-center flex-shrink-0">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="relative h-10 w-32 filter drop-shadow-lg">
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
                    <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </button>
                </div>

                <nav className="space-y-1 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent px-2">
                    <NavItem href="/dashboard" icon={Home} label="Overview" />
                    <NavItem href="/dashboard/analysis" icon={Sparkles} label="Code Analysis" />
                    <NavItem href="/dashboard/goals" icon={Target} label="Goal Tracker" />
                    <NavItem href="/dashboard/collaboration" icon={MessageSquare} label="Collaboration" />
                    <NavItem href="/dashboard/integrations" icon={Globe} label="Integrations" />
                    <NavItem href="/dashboard/resources" icon={BookOpen} label="Resources" />

                    {/* Admin Link (Access controlled by page) */}
                    {isAdmin && (
                        <NavItem href="/dashboard/admin" icon={Shield} label="Admin Panel" />
                    )}
                </nav>

                <div className="p-4 border-t border-white/5 space-y-4 bg-[#0B1120]/50 backdrop-blur-xl">
                    <div className="px-2">
                        <RecommendationWidget />
                    </div>
                    <div className="px-2">
                        <UsageCard />
                    </div>

                    <div className="pt-2 px-2 flex flex-col gap-2">
                        <button className="flex items-center space-x-3 text-slate-400 hover:text-red-400 transition-colors w-full px-4 py-2.5 rounded-xl hover:bg-red-500/10 font-medium group">
                            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
                            <span>Log Out</span>
                        </button>
                        <Link
                            href="/dashboard/settings"
                            onClick={onClose}
                            className="flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all font-medium"
                        >
                            <Settings size={20} />
                            <span>Settings</span>
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
