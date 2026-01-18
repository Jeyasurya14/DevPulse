'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'elevated' | 'glass' | 'outline' | 'dark';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            variant = 'default',
            padding = 'md',
            hoverable = false,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = 'rounded-2xl transition-all duration-300';

        const variantStyles = {
            default: 'bg-white border border-neutral-200 shadow-card',
            elevated: 'bg-white shadow-premium',
            glass: `
                bg-white/70 backdrop-blur-xl
                border border-white/50
                shadow-glass
            `,
            outline: 'bg-transparent border-2 border-neutral-200',
            dark: `
                bg-neutral-900 text-white
                border border-neutral-800
                shadow-xl
            `,
        };

        const paddingStyles = {
            none: '',
            sm: 'p-4',
            md: 'p-6',
            lg: 'p-8',
        };

        const hoverStyles = hoverable
            ? 'relative hover:shadow-card-hover hover:-translate-y-1 hover:z-10 cursor-pointer'
            : '';

        return (
            <div
                ref={ref}
                className={clsx(
                    baseStyles,
                    variantStyles[variant],
                    paddingStyles[padding],
                    hoverStyles,
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

// Card Header Component
export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
    ...props
}) => (
    <div className={clsx('mb-4', className)} {...props}>
        {children}
    </div>
);

// Card Title Component
export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
    className,
    children,
    ...props
}) => (
    <h3 className={clsx('text-lg font-bold text-neutral-900', className)} {...props}>
        {children}
    </h3>
);

// Card Description Component
export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
    className,
    children,
    ...props
}) => (
    <p className={clsx('text-sm text-neutral-500 mt-1', className)} {...props}>
        {children}
    </p>
);

// Card Content Component
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
    ...props
}) => (
    <div className={clsx('', className)} {...props}>
        {children}
    </div>
);

// Card Footer Component
export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
    ...props
}) => (
    <div className={clsx('mt-4 pt-4 border-t border-neutral-100', className)} {...props}>
        {children}
    </div>
);

export default Card;
