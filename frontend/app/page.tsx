'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Button } from '@/components/ui';
import {
  ArrowRight,
  Globe,
  BarChart3,
  Cpu,
  Shield,
  Zap,
  CheckCircle,
  Star,
  Play,
  ChevronRight,
  Users,
  GitBranch,
  Clock,
  TrendingUp,
  Lock,
  Building2
} from 'lucide-react';

export default function Home() {
  const stats = [
    { value: '10k+', label: 'Developers', icon: Users },
    { value: '5M+', label: 'Commits Tracked', icon: GitBranch },
    { value: '99.9%', label: 'SLA Uptime', icon: Clock },
    { value: 'SOC2', label: 'Certified', icon: Shield },
  ];

  const features = [
    {
      icon: Globe,
      title: 'Unified Integration Hub',
      description: 'Connect GitHub, Jira, Slack, and 20+ tools. Break down silos and view your entire development lifecycle in one pane of glass.',
      link: '/features#integrations',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Gain deep visibility into engineering velocity, DORA metrics, and resource allocation with real-time customizable dashboards.',
      link: '/features#analytics',
    },
    {
      icon: Cpu,
      title: 'AI Code Governance',
      description: 'Automated code reviews, security scanning, and best practice recommendations powered by our proprietary AI engine.',
      link: '/features#ai',
    },
  ];

  const benefits = [
    { icon: TrendingUp, text: 'Reduce deployment time by 40%' },
    { icon: Users, text: 'Increase team productivity by 35%' },
    { icon: Lock, text: 'Catch security issues before production' },
    { icon: Clock, text: 'Save 10+ hours per week on reporting' },
  ];

  const testimonials = [
    {
      quote: "DevPulse transformed how we measure and improve our engineering efficiency. Our deployment frequency increased by 3x in just 6 months.",
      author: "Sarah Chen",
      role: "VP of Engineering",
      company: "TechScale Inc.",
      avatar: "SC",
    },
    {
      quote: "The AI code governance feature alone saved us countless hours and caught critical issues before they reached production.",
      author: "Michael Rodriguez",
      role: "CTO",
      company: "DataFlow Systems",
      avatar: "MR",
    },
    {
      quote: "Finally, a platform that gives engineering leaders the visibility they need without adding overhead to the team.",
      author: "Emily Thompson",
      role: "Director of Engineering",
      company: "CloudNative Labs",
      avatar: "ET",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-devpulse-blue-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-hero-pattern opacity-50" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-devpulse-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-devpulse-yellow-400/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-devpulse-blue-50 border border-devpulse-blue-100 text-devpulse-blue-700 text-sm font-semibold mb-8 shadow-sm animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-devpulse-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-devpulse-blue-600" />
              </span>
              Trusted by 500+ engineering teams worldwide
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
              Orchestrate{' '}
              <span className="text-gradient">Engineering Excellence</span>
              {' '}at Scale
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Reduce deployment time by 40%. Increase team productivity. Automate quality control.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link href="/register">
                <Button variant="cta" size="lg" rightIcon={<ArrowRight size={18} />}>
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" leftIcon={<Play size={18} />}>
                  Book a Demo
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500 font-medium animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-devpulse-blue-600" />
                <span>SOC2 Type II</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-devpulse-blue-600" />
                <span>ISO 27001</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-success-500" />
                <span>99.9% Uptime SLA</span>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 relative animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
            <div className="relative rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden bg-gradient-to-b from-neutral-50 to-white">
              <div className="h-8 bg-neutral-100 border-b border-neutral-200 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-error-400" />
                <div className="w-3 h-3 rounded-full bg-warning-400" />
                <div className="w-3 h-3 rounded-full bg-success-400" />
                <span className="ml-4 text-xs text-neutral-400">devpulse.learn-made.in/dashboard</span>
              </div>
              <div className="aspect-[16/9] bg-neutral-50 flex overflow-hidden text-left">
                {/* Fake Sidebar */}
                <div className="w-16 lg:w-20 border-r border-neutral-200 bg-white flex flex-col items-center py-6 gap-6 z-10">
                  <div className="p-2 bg-devpulse-blue-600 rounded-lg shadow-sm">
                    <Zap size={16} className="text-white fill-devpulse-yellow-400" />
                  </div>
                  <div className="w-full h-px bg-neutral-100" />
                  <div className="p-2 rounded-lg bg-devpulse-blue-50 text-devpulse-blue-600"><BarChart3 size={20} /></div>
                  <div className="p-2 rounded-lg text-neutral-400 hover:bg-neutral-50"><Users size={20} /></div>
                  <div className="p-2 rounded-lg text-neutral-400 hover:bg-neutral-50"><GitBranch size={20} /></div>
                  <div className="p-2 rounded-lg text-neutral-400 hover:bg-neutral-50"><Shield size={20} /></div>
                  <div className="mt-auto p-2 rounded-lg text-neutral-400"><Lock size={20} /></div>
                </div>

                {/* Fake Content Area */}
                <div className="flex-1 flex flex-col min-w-0 bg-neutral-50/50">
                  {/* Fake Header */}
                  <div className="h-16 border-b border-neutral-200 bg-white px-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-neutral-900">Engineering Overview</h3>
                      <p className="text-xs text-neutral-500">Updated just now</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex text-xs font-medium px-3 py-1.5 bg-success-50 text-success-700 rounded-full items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-success-500 animate-pulse" />
                        System Healthy
                      </div>
                      <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-xs font-bold text-indigo-700">SC</div>
                    </div>
                  </div>

                  {/* Fake Dashboard Grid */}
                  <div className="p-6 overflow-hidden flex-1 flex flex-col gap-6">
                    {/* Metrics Row */}
                    <div className="grid grid-cols-3 gap-4">
                      {/* Metric 1 */}
                      <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Deploys/Day</span>
                          <TrendingUp size={14} className="text-success-500" />
                        </div>
                        <div className="text-2xl font-bold text-neutral-900 mb-1">12.4</div>
                        <div className="text-xs font-medium text-success-600 flex items-center gap-1">
                          +24% <span className="text-neutral-400 font-normal">vs last week</span>
                        </div>
                      </div>
                      {/* Metric 2 */}
                      <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Lead Time</span>
                          <Clock size={14} className="text-success-500" />
                        </div>
                        <div className="text-2xl font-bold text-neutral-900 mb-1">45m</div>
                        <div className="text-xs font-medium text-success-600 flex items-center gap-1">
                          -15% <span className="text-neutral-400 font-normal">faster</span>
                        </div>
                      </div>
                      {/* Metric 3 */}
                      <div className="bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Failure Rate</span>
                          <Shield size={14} className="text-success-500" />
                        </div>
                        <div className="text-2xl font-bold text-neutral-900 mb-1">0.8%</div>
                        <div className="text-xs font-medium text-devpulse-blue-600 flex items-center gap-1">
                          Elite Status
                        </div>
                      </div>
                    </div>

                    {/* Chart & Activity Row */}
                    <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
                      {/* Fake Chart */}
                      <div className="col-span-2 bg-white rounded-xl border border-neutral-100 shadow-sm p-4 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="text-sm font-bold text-neutral-900">Deployment Trends</h4>
                          <div className="flex gap-2">
                            <div className="w-20 h-2 rounded bg-neutral-100" />
                          </div>
                        </div>
                        <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2">
                          {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                            <div key={i} className="w-full bg-devpulse-blue-50 rounded-t-sm relative group">
                              <div
                                style={{ height: `${h}%` }}
                                className="absolute bottom-0 left-0 right-0 bg-devpulse-blue-500 rounded-t-sm group-hover:bg-devpulse-blue-600 transition-all cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fake Activity Feed */}
                      <div className="col-span-1 bg-white rounded-xl border border-neutral-100 shadow-sm p-4 overflow-hidden">
                        <h4 className="text-sm font-bold text-neutral-900 mb-4">Live Activity</h4>
                        <div className="space-y-4">
                          {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-3">
                              <div className="mt-1 w-2 h-2 rounded-full bg-devpulse-yellow-400 shrink-0" />
                              <div>
                                <div className="w-24 h-2 rounded bg-neutral-200 mb-1.5" />
                                <div className="w-16 h-1.5 rounded bg-neutral-100" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-4xl md:text-5xl font-extrabold text-neutral-900 mb-2 group-hover:text-devpulse-blue-600 transition-colors">
                  {stat.value}
                </div>
                <div className="flex items-center justify-center gap-2 text-devpulse-blue-600 font-semibold text-sm uppercase tracking-wider">
                  <stat.icon size={16} />
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-devpulse-yellow-50 text-devpulse-yellow-700 text-sm font-semibold mb-4">
              <Zap size={14} />
              Enterprise-Grade Capabilities
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Everything you need to ship software with confidence
            </h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto">
              From real-time analytics to AI-powered insights, DevPulse gives engineering leaders complete visibility into their teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-white border border-neutral-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-devpulse-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-devpulse-blue-50 flex items-center justify-center text-devpulse-blue-600 mb-6 group-hover:scale-110 group-hover:bg-devpulse-blue-600 group-hover:text-white transition-all duration-300">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.link}
                    className="inline-flex items-center gap-1 text-devpulse-blue-600 font-semibold text-sm group-hover:gap-2 transition-all"
                  >
                    Learn more <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-neutral-50 text-neutral-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Measurable impact from day one
              </h2>
              <p className="text-xl text-neutral-500 mb-8">
                Join thousands of engineering teams who have transformed their development workflow with DevPulse.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-devpulse-blue-100 flex items-center justify-center">
                      <benefit.icon size={20} className="text-devpulse-blue-600" />
                    </div>
                    <span className="text-lg font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-white border border-neutral-100 shadow-2xl p-8 flex items-center justify-center relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-devpulse-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-success-50 text-success-600 mb-6 mx-auto group-hover:scale-110 transition-transform">
                    <TrendingUp size={32} />
                  </div>
                  <div className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-devpulse-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight">
                    35%
                  </div>
                  <div className="text-xl font-medium text-neutral-600 max-w-[200px] mx-auto leading-relaxed">
                    Average improvement in lead time
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Loved by engineering teams
            </h2>
            <p className="text-lg text-neutral-500">
              See what leaders from top companies are saying about DevPulse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-neutral-100 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-devpulse-yellow-400 text-devpulse-yellow-400" />
                  ))}
                </div>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-devpulse-blue-100 flex items-center justify-center text-devpulse-blue-600 font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">{testimonial.author}</div>
                    <div className="text-sm text-neutral-500">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-devpulse-yellow-50 mb-6">
            <Zap size={32} className="text-devpulse-yellow-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Ready to transform your engineering organization?
          </h2>
          <p className="text-lg text-neutral-500 mb-8 max-w-2xl mx-auto">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button variant="cta" size="lg" rightIcon={<ArrowRight size={18} />}>
                Start Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-16 bg-neutral-900 text-neutral-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Logo Column */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="bg-devpulse-blue-600 p-1.5 rounded-lg">
                  <Zap className="text-white fill-devpulse-yellow-400" size={18} />
                </div>
                <span className="text-xl font-bold text-white">
                  DevPulse
                </span>
              </Link>
              <p className="text-sm leading-relaxed">
                Empowering engineering teams to build better software, faster.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/features" className="hover:text-devpulse-blue-400 transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-devpulse-blue-400 transition-colors">Pricing</Link></li>
                <li><Link href="/integrations" className="hover:text-devpulse-blue-400 transition-colors">Integrations</Link></li>
                <li><Link href="/changelog" className="hover:text-devpulse-blue-400 transition-colors">Changelog</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/docs" className="hover:text-devpulse-blue-400 transition-colors">Documentation</Link></li>
                <li><Link href="/blog" className="hover:text-devpulse-blue-400 transition-colors">Blog</Link></li>
                <li><Link href="/guides" className="hover:text-devpulse-blue-400 transition-colors">Guides</Link></li>
                <li><Link href="/api" className="hover:text-devpulse-blue-400 transition-colors">API Reference</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="hover:text-devpulse-blue-400 transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-devpulse-blue-400 transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-devpulse-blue-400 transition-colors">Contact</Link></li>
                <li><Link href="/security" className="hover:text-devpulse-blue-400 transition-colors">Security</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy-policy" className="hover:text-devpulse-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-devpulse-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/refund-policy" className="hover:text-devpulse-blue-400 transition-colors">Refund Policy</Link></li>
                <li><Link href="/dpa" className="hover:text-devpulse-blue-400 transition-colors">DPA</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm">© 2026 DevPulse Inc. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="hover:text-devpulse-blue-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-devpulse-blue-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-devpulse-blue-400 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
