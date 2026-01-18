'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, Check, X, Info, CheckCircle, AlertTriangle, AlertCircle, Settings, Clock } from 'lucide-react';
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
        const interval = setInterval(fetchNotifications, 30000);
        return () => clearInterval(interval);
    }, []);

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
            case 'success': return <CheckCircle size={16} className="text-success-500" />;
            case 'warning': return <AlertTriangle size={16} className="text-warning-500" />;
            case 'error': return <AlertCircle size={16} className="text-error-500" />;
            default: return <Info size={16} className="text-devpulse-blue-500" />;
        }
    };

    const getTimeAgo = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-neutral-500 hover:text-devpulse-blue-600 hover:bg-devpulse-blue-50 transition-colors relative"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-error-500 text-white text-[10px] font-bold rounded-full border-2 border-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-50 animate-scale-in">
                    {/* Header */}
                    <div className="p-4 border-b border-neutral-100 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-neutral-900">Notifications</h3>
                            {unreadCount > 0 && (
                                <p className="text-xs text-neutral-500">{unreadCount} unread</p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllRead}
                                    className="text-xs text-devpulse-blue-600 hover:text-devpulse-blue-700 font-semibold px-2 py-1 rounded-lg hover:bg-devpulse-blue-50 transition-colors"
                                    disabled={isLoading}
                                >
                                    Mark all read
                                </button>
                            )}
                            <Link
                                href="/dashboard/settings/notifications"
                                className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                <Settings size={16} />
                            </Link>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-[420px] overflow-y-auto scrollbar-thin">
                        {notifications.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-50 flex items-center justify-center">
                                    <Bell size={28} className="text-neutral-300" />
                                </div>
                                <p className="font-semibold text-neutral-700 mb-1">All caught up!</p>
                                <p className="text-sm text-neutral-400">No notifications at the moment</p>
                            </div>
                        ) : (
                            <div>
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 hover:bg-neutral-50 transition-colors flex gap-3 border-b border-neutral-50 last:border-0 ${!notification.is_read ? 'bg-devpulse-blue-50/30' : ''
                                            }`}
                                    >
                                        <div className={`mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${notification.notification_type === 'success' ? 'bg-success-50' :
                                                notification.notification_type === 'warning' ? 'bg-warning-50' :
                                                    notification.notification_type === 'error' ? 'bg-error-50' :
                                                        'bg-devpulse-blue-50'
                                            }`}>
                                            {getIcon(notification.notification_type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className={`text-sm leading-snug ${!notification.is_read
                                                        ? 'font-semibold text-neutral-900'
                                                        : 'text-neutral-700'
                                                    }`}>
                                                    {notification.title}
                                                </p>
                                                {!notification.is_read && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            markAsRead(notification.id);
                                                        }}
                                                        className="shrink-0 w-5 h-5 rounded-full bg-devpulse-blue-100 text-devpulse-blue-600 hover:bg-devpulse-blue-200 flex items-center justify-center transition-colors"
                                                        title="Mark as read"
                                                    >
                                                        <Check size={12} />
                                                    </button>
                                                )}
                                            </div>
                                            <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">
                                                {notification.message}
                                            </p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                                                    <Clock size={10} />
                                                    {getTimeAgo(notification.created_at)}
                                                </span>
                                                {notification.action_link && (
                                                    <Link
                                                        href={notification.action_link}
                                                        className="text-[11px] text-devpulse-blue-600 font-semibold hover:underline"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        View Details →
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-neutral-100 bg-neutral-50">
                            <Link
                                href="/dashboard/alerts"
                                className="block w-full text-center text-sm font-semibold text-devpulse-blue-600 hover:text-devpulse-blue-700 py-2 rounded-lg hover:bg-white transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                View All Notifications
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
