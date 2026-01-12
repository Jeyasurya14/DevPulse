
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ArrowRight, Code2, Cpu, Globe, LayoutDashboard, ShieldCheck, Zap, BarChart, Users, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden bg-white">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-100 bg-blue-50 text-blue-700 text-sm font-semibold mb-8 shadow-sm">
            <span className="flex w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            Version 2.0 is now live for Enterprise
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-slate-900">
            Orchestrate your <br />
            <span className="text-blue-600">
              Engineering Excellence
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            The all-in-one platform for high-velocity engineering teams.
            Track, analyze, and automate your workflow with enterprise-grade security.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
            >
              Get Started for Free <ArrowRight size={18} />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Enterprise-Grade Capabilities</h2>
            <p className="text-slate-500 text-lg">Everything you need to ship software with confidence and speed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Unified Integration Hub</h3>
              <p className="text-slate-500 leading-relaxed">Connect GitHub, Jira, and Slack. Break down silos and view your entire development lifecycle in one pane of glass.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <BarChart size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Advanced Analytics</h3>
              <p className="text-slate-500 leading-relaxed">Gain deep visibility into engineering velocity, DORA metrics, and resource allocation with real-time dashboards.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Cpu size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">AI Code Governance</h3>
              <p className="text-slate-500 leading-relaxed">Automated code reviews and security scanning powered by our proprietary AI engine. Catch bugs before production.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl font-extrabold text-slate-900 mb-2">10k+</div>
              <div className="text-blue-600 font-semibold uppercase tracking-wider text-sm">Developers</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-slate-900 mb-2">5M+</div>
              <div className="text-blue-600 font-semibold uppercase tracking-wider text-sm">Commits Tracked</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-slate-900 mb-2">99.9%</div>
              <div className="text-blue-600 font-semibold uppercase tracking-wider text-sm">SLA Uptime</div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-slate-900 mb-2">SOC2</div>
              <div className="text-blue-600 font-semibold uppercase tracking-wider text-sm">Certified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to scale your engineering?</h2>
          <p className="text-blue-100 text-xl mb-10">Join the world's most innovative teams using DevPulse today.</p>
          <Link
            href="/register"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-colors shadow-2xl shadow-slate-900/20"
          >
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-1 rounded-md">
                <Zap className="text-white fill-current" size={16} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                DevPulse
              </span>
            </div>
            <p>Empowering developers to build the future.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/#features" className="hover:text-blue-400">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-blue-400">Pricing</Link></li>
              <li><a href="#" className="hover:text-blue-400">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/#about" className="hover:text-blue-400">About</Link></li>
              <li><a href="#" className="hover:text-blue-400">Careers</a></li>
              <li><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-blue-400">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="hover:text-blue-400">Refund Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-blue-400">Shipping Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-slate-800">
          <p>© 2026 DevPulse Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
