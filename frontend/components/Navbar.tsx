'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Zap } from 'lucide-react';
import { Button } from '@/components/ui';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Resources', href: '/resources' },
        { label: 'About', href: '/#about' },
    ];

    return (
        <>
            <nav
                className={`
                    fixed top-0 w-full z-50 transition-all duration-300
                    ${isScrolled
                        ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-neutral-100'
                        : 'bg-transparent'
                    }
                `}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2.5 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-devpulse-yellow-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                            <div className="relative bg-devpulse-blue-600 p-2 rounded-xl shadow-lg group-hover:shadow-glow-blue transition-shadow">
                                <Zap className="text-white fill-devpulse-yellow-400" size={22} />
                            </div>
                        </div>
                        <span className="text-2xl font-bold text-neutral-800 tracking-tight">
                            Dev<span className="text-devpulse-blue-600">Pulse</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm font-semibold text-neutral-600 hover:text-devpulse-blue-600 transition-colors rounded-lg hover:bg-devpulse-blue-50"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center space-x-3">
                        <Link
                            href="/login"
                            className="px-4 py-2 text-sm font-semibold text-neutral-600 hover:text-devpulse-blue-600 transition-colors"
                        >
                            Log in
                        </Link>
                        <Link href="/register">
                            <Button variant="cta" size="sm" rightIcon={<ChevronDown size={14} className="rotate-[-90deg]" />}>
                                Start Free Trial
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 -mr-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`
                    fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden
                    transition-opacity duration-300
                    ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <div
                className={`
                    fixed top-0 right-0 z-50 h-full w-80 max-w-full bg-white shadow-2xl md:hidden
                    transform transition-transform duration-300 ease-out
                    ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <div className="bg-devpulse-blue-600 p-1.5 rounded-lg">
                                <Zap className="text-white fill-devpulse-yellow-400" size={18} />
                            </div>
                            <span className="text-xl font-bold text-neutral-800">
                                Dev<span className="text-devpulse-blue-600">Pulse</span>
                            </span>
                        </Link>
                        <button
                            className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Mobile Menu Links */}
                    <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block px-4 py-3 text-base font-semibold text-neutral-700 hover:text-devpulse-blue-600 hover:bg-devpulse-blue-50 rounded-xl transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Footer */}
                    <div className="p-6 border-t border-neutral-100 space-y-3">
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="outline" fullWidth>
                                Log in
                            </Button>
                        </Link>
                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                            <Button variant="cta" fullWidth>
                                Start Free Trial
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
