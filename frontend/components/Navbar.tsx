
import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg">
                        <Zap className="text-white fill-current" size={20} />
                    </div>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">
                        DevPulse
                    </span>
                </div>

                <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
                    <Link href="/#features" className="hover:text-blue-600 transition-colors">Features</Link>
                    <Link href="/pricing" className="hover:text-blue-600 transition-colors">Pricing</Link>
                    <Link href="/#about" className="hover:text-blue-600 transition-colors">About</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                        Log in
                    </Link>
                    <Link
                        href="/register"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-blue-600/20"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
}
