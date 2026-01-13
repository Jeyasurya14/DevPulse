'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, Check, X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import Link from 'next/link';

interface Notification {
    id: number;
    title: string;
    message: string;
    notification_type: 'info' | 'success' | 'warning' | 'error';
    is_read: boolean;
    created_at: string;
    action_link?: string;
}

export default function NotificationBell() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchNotifications = async () => {
        try {
            const data = await fetchAPI('/api/notifications/');
            if (Array.isArray(data)) {
                setNotifications(data);
                setUnreadCount(data.filter((n: Notification) => !n.is_read).length);
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    };

    const markAsRead = async (id: number) => {
        try {
            await fetchAPI(`/api/notifications/${id}/mark_read/`, { method: 'POST' });
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
        } catch (error) {
            console.error('Failed to mark read:', error);
        }
    };

    const markAllRead = async () => {
        try {
            setIsLoading(true);
            await fetchAPI('/api/notifications/mark_all_read/', { method: 'POST' });
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            setUnreadCount(0);
        } catch (error) {
            console.error('Failed to mark all read:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // Poll every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle size={16} className="text-green-500" />;
            case 'warning': return <AlertTriangle size={16} className="text-yellow-500" />;
            case 'error': return <AlertCircle size={16} className="text-red-500" />;
            default: return <Info size={16} className="text-blue-500" />;
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 bg-white rounded-full text-slate-400 hover:text-blue-600 shadow-sm border border-slate-100 transition-colors relative"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
                    <div className="p-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                        <h3 className="font-bold text-sm text-slate-700">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllRead}
                                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                                disabled={isLoading}
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-slate-400">
                                <Bell size={32} className="mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No notifications yet</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 hover:bg-slate-50 transition-colors flex gap-3 ${!notification.is_read ? 'bg-blue-50/50' : ''}`}
                                    >
                                        <div className="mt-1 shrink-0">
                                            {getIcon(notification.notification_type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm ${!notification.is_read ? 'font-bold text-slate-800' : 'text-slate-600'}`}>
                                                {notification.title}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                                                {notification.message}
                                            </p>
                                            <p className="text-[10px] text-slate-400 mt-1">
                                                {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                            {notification.action_link && (
                                                <Link
                                                    href={notification.action_link}
                                                    className="mt-2 text-xs text-blue-600 font-bold block hover:underline"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    View Details
                                                </Link>
                                            )}
                                        </div>
                                        {!notification.is_read && (
                                            <button
                                                onClick={() => markAsRead(notification.id)}
                                                className="text-slate-300 hover:text-blue-600 shrink-0"
                                                title="Mark as read"
                                            >
                                                <Check size={14} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
