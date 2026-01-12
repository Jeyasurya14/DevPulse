
import Navbar from '@/components/Navbar';

export default function ShippingPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-slate-900">Shipping and Delivery Policy</h1>
                <div className="prose prose-slate max-w-none">

                    <h2 className="text-2xl font-bold mt-8 mb-4">1. Digital Nature of Goods</h2>
                    <p>Learnmade is a Software-as-a-Service (SaaS) platform. We do not sell or ship physical goods. All services are delivered digitally via the internet.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">2. Immediate Delivery</h2>
                    <p>Upon successful payment and registration, access to your paid features (e.g., Pro or Business tier features) is granted immediately. You will receive a confirmation email with your invoice and account details.</p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">3. Access Issues</h2>
                    <p>If you experience any delay in accessing your account features after payment, please try logging out and logging back in. If the issue persists, contact our support team immediately at contact@learn-made.in.</p>
                </div>
            </main>
        </div>
    );
}
