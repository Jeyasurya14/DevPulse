'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Button } from '@/components/ui';
import {
    BarChart3,
    Globe,
    Cpu,
    Bell,
    Users,
    Shield,
    ArrowRight,
    CheckCircle,
    Zap,
    GitBranch,
    Clock,
    Gauge,
    AlertTriangle,
    FileCode,
    Slack,
    MessageSquare,
    Lock,
    Database
} from 'lucide-react';

export default function FeaturesPage() {
    const featureCategories = [
        {
            id: 'analytics',
            title: 'Analytics & Metrics',
            icon: BarChart3,
            description: 'Comprehensive engineering intelligence to drive data-informed decisions.',
            features: [
                {
                    title: 'DORA Metrics Dashboard',
                    description: 'Track Deployment Frequency, Lead Time, Change Failure Rate, and MTTR in real-time.',
                    icon: Gauge,
                },
                {
                    title: 'Team Velocity Tracking',
                    description: 'Monitor sprint velocity, throughput, and predictive delivery estimates.',
                    icon: Clock,
                },
                {
                    title: 'Custom Reports',
                    description: 'Build and schedule custom reports with drag-and-drop visualization tools.',
                    icon: BarChart3,
                },
                {
                    title: 'Trend Analysis',
                    description: 'AI-powered trend forecasting to anticipate bottlenecks before they occur.',
                    icon: GitBranch,
                },
            ],
        },
        {
            id: 'integrations',
            title: 'Integration Management',
            icon: Globe,
            description: 'Connect your entire development ecosystem in minutes.',
            features: [
                {
                    title: 'One-Click OAuth Setup',
                    description: 'Connect GitHub, GitLab, Bitbucket, Jira, and 20+ tools with a single click.',
                    icon: Globe,
                },
                {
                    title: 'Webhook Management',
                    description: 'Configure custom webhooks for real-time data synchronization.',
                    icon: Database,
                },
                {
                    title: 'Health Monitoring',
                    description: 'Real-time integration health status with automatic failure recovery.',
                    icon: CheckCircle,
                },
                {
                    title: 'Data Sync Control',
                    description: 'Fine-grained control over what data is synced and how often.',
                    icon: Clock,
                },
            ],
        },
        {
            id: 'ai',
            title: 'AI Code Governance',
            icon: Cpu,
            description: 'Intelligent automation for code quality and security.',
            features: [
                {
                    title: 'Automated Code Reviews',
                    description: 'AI-powered code analysis with actionable recommendations for improvement.',
                    icon: FileCode,
                },
                {
                    title: 'Security Scanning',
                    description: 'Continuous vulnerability detection with severity-based prioritization.',
                    icon: Shield,
                },
                {
                    title: 'Technical Debt Tracking',
                    description: 'Identify, quantify, and prioritize technical debt reduction efforts.',
                    icon: AlertTriangle,
                },
                {
                    title: 'Best Practice Enforcement',
                    description: 'Custom rule engines for coding standards and compliance requirements.',
                    icon: CheckCircle,
                },
            ],
        },
        {
            id: 'collaboration',
            title: 'Team Collaboration',
            icon: Users,
            description: 'Bring your team together with shared insights and visibility.',
            features: [
                {
                    title: 'Shared Dashboards',
                    description: 'Create and share custom dashboards with team members and stakeholders.',
                    icon: Users,
                },
                {
                    title: '@Mentions & Comments',
                    description: 'Collaborate directly on metrics and reports with inline discussions.',
                    icon: MessageSquare,
                },
                {
                    title: 'Team Activity Feed',
                    description: 'Real-time updates on team activity, deployments, and milestones.',
                    icon: Clock,
                },
                {
                    title: 'Goal Tracking',
                    description: 'Set, track, and celebrate team goals with visual progress indicators.',
                    icon: Gauge,
                },
            ],
        },
        {
            id: 'alerts',
            title: 'Alerts & Automation',
            icon: Bell,
            description: 'Stay informed with intelligent notifications.',
            features: [
                {
                    title: 'Custom Alert Rules',
                    description: 'Create threshold-based alerts for any metric with flexible conditions.',
                    icon: Bell,
                },
                {
                    title: 'Anomaly Detection',
                    description: 'AI-powered anomaly detection that learns your team\'s patterns.',
                    icon: AlertTriangle,
                },
                {
                    title: 'Slack Integration',
                    description: 'Get instant notifications in your preferred Slack channels.',
                    icon: Slack,
                },
                {
                    title: 'Digest Reports',
                    description: 'Automated daily or weekly email summaries for stakeholders.',
                    icon: MessageSquare,
                },
            ],
        },
        {
            id: 'security',
            title: 'Security & Compliance',
            icon: Shield,
            description: 'Enterprise-grade security you can trust.',
            features: [
                {
                    title: 'SSO & SAML',
                    description: 'Enterprise single sign-on with support for Okta, Auth0, and Azure AD.',
                    icon: Lock,
                },
                {
                    title: 'Role-Based Access',
                    description: 'Granular permissions with custom roles for different team members.',
                    icon: Users,
                },
                {
                    title: 'Audit Logs',
                    description: 'Complete audit trail of all actions for compliance requirements.',
                    icon: Database,
                },
                {
                    title: 'Data Encryption',
                    description: 'End-to-end encryption at rest and in transit with SOC2 compliance.',
                    icon: Shield,
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh-gradient" />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-devpulse-blue-50 text-devpulse-blue-700 text-sm font-semibold mb-4">
                            <Zap size={14} />
                            Platform Features
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            Everything you need to{' '}
                            <span className="text-gradient">optimize engineering</span>
                        </h1>
                        <p className="text-xl text-neutral-500 mb-8">
                            Powerful tools designed for modern engineering teams. From analytics to automation, we've got you covered.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/register">
                                <Button variant="cta" rightIcon={<ArrowRight size={16} />}>
                                    Start Free Trial
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline">
                                    Request Demo
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Nav */}
            <section className="sticky top-20 z-30 bg-white border-b border-neutral-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex overflow-x-auto scrollbar-none py-4 gap-2">
                        {featureCategories.map((cat) => (
                            <a
                                key={cat.id}
                                href={`#${cat.id}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-neutral-600 hover:text-devpulse-blue-600 hover:bg-devpulse-blue-50 transition-colors whitespace-nowrap"
                            >
                                <cat.icon size={16} />
                                {cat.title}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Sections */}
            {featureCategories.map((category, catIdx) => (
                <section
                    key={category.id}
                    id={category.id}
                    className={`py-24 ${catIdx % 2 === 1 ? 'bg-neutral-50' : 'bg-white'}`}
                >
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Category Header */}
                            <div className="lg:sticky lg:top-40">
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-devpulse-blue-50 text-devpulse-blue-600 mb-6">
                                    <category.icon size={28} />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">{category.title}</h2>
                                <p className="text-lg text-neutral-500 mb-6">
                                    {category.description}
                                </p>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-2 text-devpulse-blue-600 font-semibold hover:gap-3 transition-all"
                                >
                                    Try it free <ArrowRight size={16} />
                                </Link>
                            </div>

                            {/* Feature Cards */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                {category.features.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="p-6 rounded-xl bg-white border border-neutral-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-devpulse-yellow-50 flex items-center justify-center text-devpulse-yellow-600 mb-4">
                                            <feature.icon size={20} />
                                        </div>
                                        <h3 className="font-bold text-neutral-900 mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-sm text-neutral-500 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* CTA Section */}
            <section className="py-24 bg-devpulse-blue-600 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to see it in action?
                    </h2>
                    <p className="text-xl text-devpulse-blue-100 mb-8">
                        Start your free trial today or schedule a personalized demo with our team.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/register">
                            <Button variant="cta" size="lg" rightIcon={<ArrowRight size={18} />}>
                                Start Free Trial
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <button className="px-8 py-4 rounded-xl font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-colors">
                                Book a Demo
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="py-8 bg-neutral-900 text-neutral-400 text-center text-sm">
                <p>© 2026 DevPulse Inc. All rights reserved.</p>
            </footer>
        </div>
    );
}
