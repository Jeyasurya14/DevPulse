'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Menu, X, Search, Zap } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const checkProfile = async () => {
            try {
                const profile = await fetchAPI('/api/auth/profile/');
                if (profile?.is_staff) {
                    setIsAdmin(true);
                }
                if (profile?.username) {
                    setUsername(profile.username);
                }
            } catch (err) {
                // Ignore, just don't show admin capabilities
            }
        };
        checkProfile();
    }, []);

    // Keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="flex h-screen bg-neutral-50 relative">
            {/* Sidebar with Responsive Props */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isAdmin={isAdmin} />

            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-neutral-100 p-4 flex items-center justify-between shrink-0 z-20 shadow-sm">
                    <button
                        className="p-2 -ml-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="bg-devpulse-blue-600 p-1.5 rounded-lg">
                            <Zap className="text-white fill-devpulse-yellow-400" size={16} />
                        </div>
                        <span className="font-bold text-lg text-neutral-800">DevPulse</span>
                    </div>
                    <button
                        className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <Search size={20} />
                    </button>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-hidden relative">
                    {children}
                </div>
            </div>

            {/* Global Search Modal */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsSearchOpen(false)}
                    />
                    <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
                        <div className="flex items-center gap-3 p-4 border-b border-neutral-100">
                            <Search size={20} className="text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search dashboards, metrics, integrations..."
                                className="flex-1 text-lg outline-none placeholder-neutral-400"
                                autoFocus
                            />
                            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-neutral-100 text-neutral-500 text-xs font-mono rounded">
                                ESC
                            </kbd>
                        </div>
                        <div className="p-4 text-sm text-neutral-500 text-center">
                            <p>Start typing to search...</p>
                            <p className="mt-2 text-xs">
                                Press <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded">↵</kbd> to select,
                                <kbd className="px-1.5 py-0.5 bg-neutral-100 rounded ml-1">ESC</kbd> to close
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
