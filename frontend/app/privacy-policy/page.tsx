
import Navbar from '@/components/Navbar';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-slate-900">Privacy Policy</h1>
                <div className="prose prose-slate max-w-none">
                    <p className="mb-4 text-sm text-slate-500">Last updated: January 12, 2026</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
                    <p>Welcome to DevPulse ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our SaaS platform.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
                    <p>We collect information that you provide strictly for the purpose of delivering our services:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>Personal Data:</strong> Name, email address, and billing information when you register.</li>
                        <li><strong>Usage Data:</strong> Information about how you use our dashboard, such as feature usage and session duration.</li>
                        <li><strong>Code Snippets:</strong> Code you explicitly submit for analysis. We do not store this code permanently; it is processed in-memory for analysis only.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Provide, operate, and maintain our services.</li>
                        <li>Process your subscription payments via Razorpay.</li>
                        <li>Improve, personalize, and expand our platform.</li>
                        <li>Send you emails regarding your account or order.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Sharing Your Information</h2>
                    <p>We only share information with the following third parties:</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li><strong>Payment Processors:</strong> We use Razorpay for secure payments. Your financial data is handled directly by them.</li>
                        <li><strong>Service Providers:</strong> Hosting and infrastructure providers (e.g., Vercel, Render, MongoDB) necessary to run the service.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">5. Data Security</h2>
                    <p>We implement industry-standard security measures, including encryption and secure socket layer (SSL) technology, to protect your data. However, no method of transmission over the Internet is 100% secure.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">6. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us at contact@learn-made.in.</p>
                </div>
            </main>
        </div>
    );
}
