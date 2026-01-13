'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Menu, X } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const profile = await fetchAPI('/api/auth/profile/');
                if (profile?.is_staff) {
                    setIsAdmin(true);
                }
            } catch (err) {
                // Ignore, just don't show admin capabilities
            }
        };
        checkAdmin();
    }, []);

    return (
        <div className="flex h-screen bg-slate-50 relative">
            {/* Sidebar with Responsive Props */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isAdmin={isAdmin} />

            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between shrink-0 z-20">
                    <button
                        className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <span className="font-bold text-lg text-slate-800">Learnmade</span>
                    <div className="w-8"></div> {/* Spacer for balance */}
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-hidden relative">
                    {children}
                </div>
            </div>
        </div>
    );
}
