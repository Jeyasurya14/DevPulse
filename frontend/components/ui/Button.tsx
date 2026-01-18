'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'cta' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        const baseStyles = `
            relative inline-flex items-center justify-center font-semibold rounded-xl
            transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            hover:z-50
        `;

        const variantStyles = {
            primary: `
                bg-[var(--color-primary)] text-white
                hover:!bg-[var(--color-primary-dark)] hover:-translate-y-0.5
                focus:ring-[var(--color-primary)]
                shadow-button hover:shadow-lg
            `,
            cta: `
                bg-[var(--color-cta)] text-neutral-900
                hover:!bg-[var(--color-cta-light)] hover:-translate-y-0.5
                focus:ring-[var(--color-cta)]
                shadow-button-yellow hover:shadow-lg
            `,
            outline: `
                bg-transparent text-[var(--color-primary)]
                border-2 border-[var(--color-primary)]
                hover:!bg-[var(--color-primary)] hover:!text-white hover:-translate-y-0.5
                focus:ring-[var(--color-primary)]
            `,
            ghost: `
                bg-transparent text-neutral-600
                hover:bg-neutral-100 hover:text-neutral-900
                focus:ring-neutral-400
            `,
            danger: `
                bg-error-500 text-white
                hover:bg-error-600 hover:-translate-y-0.5
                focus:ring-error-500
                shadow-md hover:shadow-lg
            `,
        };

        const sizeStyles = {
            sm: 'px-4 py-2 text-sm gap-1.5',
            md: 'px-6 py-3 text-sm gap-2',
            lg: 'px-8 py-4 text-base gap-2.5',
        };

        return (
            <button
                ref={ref}
                className={clsx(
                    baseStyles,
                    variantStyles[variant],
                    sizeStyles[size],
                    fullWidth && 'w-full',
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
                        <span>Loading...</span>
                    </>
                ) : (
                    <>
                        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                        {children}
                        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
