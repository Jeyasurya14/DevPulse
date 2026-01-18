import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // DevPulse Brand Colors
                devpulse: {
                    // Primary Blue Scale
                    blue: {
                        50: '#E8F0FA',
                        100: '#C5D9F2',
                        200: '#9EBFE8',
                        300: '#77A5DE',
                        400: '#5A91D6',
                        500: '#4A90E2', // Secondary Blue
                        600: '#0052CC', // Primary Blue
                        700: '#003D99',
                        800: '#002966',
                        900: '#001433',
                    },
                    // Primary Yellow Scale
                    yellow: {
                        50: '#FFF9E6',
                        100: '#FFF3CC',
                        200: '#FFE699',
                        300: '#FFD966',
                        400: '#FFCC33',
                        500: '#FFB300', // Primary Yellow (CTA)
                        600: '#E6A200',
                        700: '#CC9000',
                        800: '#997300',
                        900: '#664D00',
                    },
                    // Accent Yellow for backgrounds
                    accent: '#FFF9C4',
                },
                // Neutral Scale
                neutral: {
                    50: '#FFFFFF',
                    100: '#F5F7FA',
                    200: '#E4E7EC',
                    300: '#D0D5DD',
                    400: '#98A2B3',
                    500: '#64748B',
                    600: '#475467',
                    700: '#344054',
                    800: '#2C3E50',
                    900: '#1D2939',
                },
                // Semantic Colors
                success: {
                    50: '#ECFDF5',
                    100: '#D1FAE5',
                    500: '#10B981',
                    600: '#059669',
                    700: '#047857',
                },
                warning: {
                    50: '#FFFBEB',
                    100: '#FEF3C7',
                    500: '#F59E0B',
                    600: '#D97706',
                    700: '#B45309',
                },
                error: {
                    50: '#FEF2F2',
                    100: '#FEE2E2',
                    500: '#EF4444',
                    600: '#DC2626',
                    700: '#B91C1C',
                },
                info: {
                    50: '#EFF6FF',
                    100: '#DBEAFE',
                    500: '#3B82F6',
                    600: '#2563EB',
                    700: '#1D4ED8',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
                display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
            },
            boxShadow: {
                'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
                'glow-blue': '0 0 20px rgba(0, 82, 204, 0.4)',
                'glow-yellow': '0 0 20px rgba(255, 179, 0, 0.4)',
                'premium': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
                'premium-hover': '0 20px 50px -12px rgba(0, 0, 0, 0.15)',
                'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
                'card-hover': '0 10px 40px -10px rgba(0, 82, 204, 0.15)',
                'button': '0 4px 14px rgba(0, 82, 204, 0.25)',
                'button-yellow': '0 4px 14px rgba(255, 179, 0, 0.35)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
                'fade-in-down': 'fadeInDown 0.5s ease-out forwards',
                'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
                'slide-in-right': 'slideInRight 0.5s ease-out forwards',
                'scale-in': 'scaleIn 0.3s ease-out forwards',
                'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(0, 82, 204, 0.4)' },
                    '50%': { boxShadow: '0 0 40px rgba(0, 82, 204, 0.6)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                bounceSubtle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-devpulse": "linear-gradient(135deg, #0052CC 0%, #4A90E2 100%)",
                "gradient-devpulse-dark": "linear-gradient(135deg, #003D99 0%, #0052CC 100%)",
                "gradient-cta": "linear-gradient(135deg, #FFB300 0%, #FFCC33 100%)",
                "gradient-hero": "linear-gradient(180deg, #F5F7FA 0%, #FFFFFF 100%)",
                "gradient-mesh": "radial-gradient(at 40% 20%, rgba(0, 82, 204, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(255, 179, 0, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(74, 144, 226, 0.1) 0px, transparent 50%)",
            },
            borderRadius: {
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            spacing: {
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
            },
            transitionDuration: {
                '400': '400ms',
            },
            transitionTimingFunction: {
                'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            },
        },
    },
    plugins: [],
};

export default config;
