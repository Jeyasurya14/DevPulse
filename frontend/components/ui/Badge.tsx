'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'cta';
    size?: 'sm' | 'md' | 'lg';
    dot?: boolean;
    pulse?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            className,
            variant = 'default',
            size = 'md',
            dot = false,
            pulse = false,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'inline-flex items-center font-semibold rounded-full';

        const variantStyles = {
            default: 'bg-neutral-100 text-neutral-700',
            primary: 'bg-devpulse-blue-50 text-devpulse-blue-600 border border-devpulse-blue-100',
            success: 'bg-success-50 text-success-700 border border-success-100',
            warning: 'bg-warning-50 text-warning-700 border border-warning-100',
            error: 'bg-error-50 text-error-700 border border-error-100',
            info: 'bg-info-50 text-info-700 border border-info-100',
            cta: 'bg-devpulse-yellow-50 text-devpulse-yellow-700 border border-devpulse-yellow-200',
        };

        const sizeStyles = {
            sm: 'px-2 py-0.5 text-xs gap-1',
            md: 'px-2.5 py-1 text-xs gap-1.5',
            lg: 'px-3 py-1.5 text-sm gap-2',
        };

        const dotColors = {
            default: 'bg-neutral-500',
            primary: 'bg-devpulse-blue-500',
            success: 'bg-success-500',
            warning: 'bg-warning-500',
            error: 'bg-error-500',
            info: 'bg-info-500',
            cta: 'bg-devpulse-yellow-500',
        };

        return (
            <span
                ref={ref}
                className={clsx(
                    baseStyles,
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                {...props}
            >
                {dot && (
                    <span className="relative flex h-2 w-2">
                        {pulse && (
                            <span
                                className={clsx(
                                    'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                                    dotColors[variant]
                                )}
                            />
                        )}
                        <span
                            className={clsx(
                                'relative inline-flex rounded-full h-2 w-2',
                                dotColors[variant]
                            )}
                        />
                    </span>
                )}
                {children}
            </span>
        );
    }
);

Badge.displayName = 'Badge';

// Status Badge - Convenience component for connection status
export interface StatusBadgeProps {
    status: 'connected' | 'disconnected' | 'pending' | 'syncing';
    showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, showDot = true }) => {
    const statusConfig = {
        connected: { variant: 'success' as const, label: 'Connected', pulse: false },
        disconnected: { variant: 'error' as const, label: 'Disconnected', pulse: false },
        pending: { variant: 'warning' as const, label: 'Pending', pulse: true },
        syncing: { variant: 'info' as const, label: 'Syncing', pulse: true },
    };

    const config = statusConfig[status];

    return (
        <Badge variant={config.variant} size="sm" dot={showDot} pulse={config.pulse}>
            {config.label}
        </Badge>
    );
};

export default Badge;
