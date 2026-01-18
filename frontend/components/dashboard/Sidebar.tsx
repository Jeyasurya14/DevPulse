'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Code2,
    Settings,
    LogOut,
    BarChart3,
    Zap,
    Home,
    Sparkles,
    Target,
    MessageSquare,
    Globe,
    BookOpen,
    Shield,
    Bell,
    TrendingUp,
    Users,
    X
} from 'lucide-react';
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
    const router = useRouter();

    const isActive = (path: string) => {
        if (path === '/dashboard' && pathname === '/dashboard') return true;
        if (path !== '/dashboard' && pathname?.startsWith(path)) return true;
        return false;
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        router.push('/login');
    };

    const NavItem = ({ href, icon: Icon, label, badge }: { href: string; icon: any; label: string; badge?: string }) => {
        const active = isActive(href);
        return (
            <Link
                href={href}
                onClick={onClose}
                className={`
                    flex items-center justify-between px-4 py-3 mx-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                    ${active
                        ? 'bg-devpulse-blue-600 text-white shadow-lg shadow-devpulse-blue-600/30'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }
                `}
            >
                <div className="flex items-center gap-3">
                    <Icon
                        size={20}
                        className={`transition-colors ${active ? 'text-devpulse-yellow-400' : 'group-hover:text-devpulse-blue-400'
                            }`}
                    />
                    <span className="font-medium">{label}</span>
                </div>
                {badge && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${active
                        ? 'bg-devpulse-yellow-400 text-neutral-900'
                        : 'bg-devpulse-blue-600/20 text-devpulse-blue-400'
                        }`}>
                        {badge}
                    </span>
                )}
            </Link>
        );
    };

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <div className="px-6 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            {children}
        </div>
    );

    return (
        <aside className={`
            fixed md:relative 
            top-0 left-0 
            h-screen w-72 
            bg-gradient-to-b from-[#0a1628] to-[#0d1c30] text-white 
            border-r border-white/5
            flex flex-col shadow-2xl z-50 
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            md:flex-shrink-0
        `}>
            {/* Header */}
            <div className="p-6 flex justify-between items-center flex-shrink-0 border-b border-white/5">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-devpulse-yellow-500 rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                        <div className="relative bg-devpulse-blue-600 p-2 rounded-lg shadow-lg">
                            <Zap className="text-white fill-devpulse-yellow-400" size={20} />
                        </div>
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        Dev<span className="text-devpulse-blue-400">Pulse</span>
                    </span>
                </Link>
                {/* Close button for mobile */}
                <button
                    onClick={onClose}
                    className="md:hidden text-neutral-400 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 space-y-1">
                <SectionTitle>Main</SectionTitle>
                <NavItem href="/dashboard" icon={Home} label="Overview" />
                <NavItem href="/dashboard/analytics" icon={BarChart3} label="Analytics" badge="New" />
                <NavItem href="/dashboard/analysis" icon={Sparkles} label="Code Analysis" />
                <NavItem href="/dashboard/code-governance" icon={Shield} label="Code Governance" />

                <div className="py-3" />
                <SectionTitle>Workspace</SectionTitle>
                <NavItem href="/dashboard/team" icon={Users} label="Team" />
                <NavItem href="/dashboard/goals" icon={Target} label="Goal Tracker" />
                <NavItem href="/dashboard/collaboration" icon={MessageSquare} label="Collaboration" />
                <NavItem href="/dashboard/integrations" icon={Globe} label="Integrations" />

                <div className="py-3" />
                <SectionTitle>Discover</SectionTitle>
                <NavItem href="/dashboard/benchmarks" icon={TrendingUp} label="Benchmarks" />
                <NavItem href="/dashboard/resources" icon={BookOpen} label="Resources" />
                <NavItem href="/dashboard/alerts" icon={Bell} label="Alerts" />

                {/* Admin Link */}
                {isAdmin && (
                    <>
                        <div className="py-3" />
                        <SectionTitle>Admin</SectionTitle>
                        <NavItem href="/dashboard/admin" icon={Shield} label="Admin Panel" />
                    </>
                )}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-white/5 space-y-4 bg-[#0a1628]/50 backdrop-blur-xl">
                <div className="px-2">
                    <RecommendationWidget />
                </div>
                <div className="px-2">
                    <UsageCard />
                </div>

                <div className="pt-2 px-2 flex flex-col gap-1">
                    <Link
                        href="/dashboard/settings"
                        onClick={onClose}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 text-neutral-400 hover:text-white transition-all font-medium"
                    >
                        <Settings size={18} />
                        <span>Settings</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 text-neutral-400 hover:text-error-400 transition-colors w-full px-4 py-2.5 rounded-xl hover:bg-error-500/10 font-medium group text-left"
                    >
                        <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
                        <span>Log Out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
