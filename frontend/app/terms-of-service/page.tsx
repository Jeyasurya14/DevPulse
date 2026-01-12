
import Navbar from '@/components/Navbar';

export default function TermsAndConditions() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-slate-900">Terms and Conditions</h1>
                <div className="prose prose-slate max-w-none">
                    <p className="mb-4 text-sm text-slate-500">Last updated: January 12, 2026</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. Agreement to Terms</h2>
                    <p>By accessing or using Learnmade, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. Subscription & Payments</h2>
                    <p>Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis (monthly or annually) via Razorpay. Subscriptions automatically renew unless canceled at least 24 hours before the end of the billing cycle.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. User Responsibilities</h2>
                    <p>You differ to use the platform only for lawful purposes. You are responsible for maintaining the security of your account credentials. Learnmade is not liable for any loss or damage arising from your failure to protect your password.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Intellectual Property</h2>
                    <p>The Service and its original content (excluding Content provided by you or other users), features, and functionality are and will remain the exclusive property of Learnmade and its licensors.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">5. Limitation of Liability</h2>
                    <p>In no event shall Learnmade, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes</h2>
                    <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.</p>
                </div>
            </main>
        </div>
    );
}
