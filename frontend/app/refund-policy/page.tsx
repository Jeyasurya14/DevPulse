
import Navbar from '@/components/Navbar';

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-slate-900">Cancellation and Refund Policy</h1>
                <div className="prose prose-slate max-w-none">

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. Subscription Cancellation</h2>
                    <p>You may cancel your subscription at any time by visiting your Account Settings page or contacting us at contact@learn-made.in. Your cancellation will take effect at the end of the current paid term.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. Refunds</h2>
                    <p>We offer a <strong>14-day money-back guarantee</strong> for new subscribers on the Pro plan. If you are not satisfied with our service, you may request a full refund within 14 days of your initial purchase.</p>
                    <ul className="list-disc pl-6 mb-4 space-y-2">
                        <li>Refund requests made after 14 days will not be approved.</li>
                        <li>Refunds are processed to the original method of payment within 5-10 business days.</li>
                        <li>We do not offer refunds for partial months of service if you decide to cancel mid-term.</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. Business Plan Refunds</h2>
                    <p>Business or Enterprise plans are subject to the terms agreed upon in your specific contract or Service Level Agreement (SLA). Please refer to your contract for specific refund clauses.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">4. Contacting Us</h2>
                    <p>If you have any questions concerning our return policy, please contact us at contact@learn-made.in.</p>
                </div>
            </main>
        </div>
    );
}
