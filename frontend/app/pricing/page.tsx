
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Check, Star, Zap, Shield, Users, X } from 'lucide-react';
import Script from 'next/script';
import { fetchAPI } from '@/lib/api';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PricingPage() {
    const [loading, setLoading] = useState(false);

    const handleSubscription = async (planId: string) => {
        if (loading) return;
        setLoading(true);

        try {
            // 1. Create Order
            const order = await fetchAPI('/api/billing/order/', {
                method: 'POST',
                body: JSON.stringify({ plan_id: planId }),
            });

            // 2. Open Razorpay and handle payment (logic hidden for brevity, same as before)
            // ... (Keeping the script integration logic)
            const options = {
                key: 'rzp_test_1DP5mmOlF5G5ag', // Public Key
                amount: order.amount,
                currency: order.currency,
                name: "Learnmade",
                description: `${planId.toUpperCase()} Subscription`,
                order_id: order.id,
                handler: async (response: any) => {
                    // 3. Verify Payment
                    try {
                        await fetchAPI('/api/billing/verify/', {
                            method: 'POST',
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                plan_id: planId,
                                username: 'johndoe'
                            })
                        });
                        alert('Subscription Active! Welcome to Pro.');
                    } catch {
                        alert('Verification Failed');
                    }
                },
                theme: {
                    color: "#2563EB", // Blue 600
                },
            };

            if (window.Razorpay) {
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            } else {
                alert('Razorpay SDK not loaded. Please refresh.');
            }

        } catch (error) {
            console.error(error);
            alert('Failed to initiate payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
            <Navbar />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <main className="pt-32 pb-20 px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">Simple, transparent <span className="text-blue-600">pricing</span>.</h1>
                    <p className="text-xl text-slate-500">No hidden fees. Cancel anytime.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {/* Starter */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <h3 className="text-xl font-bold text-slate-900">Starter</h3>
                        <div className="text-4xl font-bold mt-4 mb-2 text-slate-900">$0</div>
                        <p className="text-slate-500 text-sm mb-8">Forever free for hobbyists.</p>
                        <button className="w-full py-3 border border-slate-200 bg-slate-50 text-slate-600 rounded-xl font-semibold hover:bg-slate-100 transition-colors">Current Plan</button>
                        <ul className="mt-8 space-y-4 text-sm text-slate-600 font-medium">
                            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> 2 Active Projects</li>
                            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> Basic Analytics</li>
                            <li className="flex gap-3"><X size={18} className="text-slate-400" /> No AI Recommendations</li>
                            <li className="flex gap-3"><X size={18} className="text-slate-400" /> Community Support</li>
                        </ul>
                    </div>

                    {/* Pro */}
                    <div className="bg-white rounded-2xl p-8 border border-blue-200 shadow-xl shadow-blue-900/5 transform scale-105 relative z-10">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">MOST POPULAR</div>
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2"><Star size={18} className="fill-blue-600 text-blue-600" /> Pro</h3>
                        <div className="text-4xl font-bold mt-4 mb-2 text-slate-900">$19<span className="text-lg text-slate-400 font-medium ml-1">/mo</span></div>
                        <p className="text-slate-500 text-sm mb-8">For serious developers.</p>
                        <button
                            onClick={() => handleSubscription('pro')}
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                        >
                            {loading ? 'Processing...' : 'Upgrade to Pro'}
                        </button>
                        <ul className="mt-8 space-y-4 text-sm text-slate-700 font-medium">
                            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> Unlimited Projects</li>
                            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> Smart Code Analysis</li>
                            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> AI Recommendations</li>
                            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> Priority Support</li>
                        </ul>
                    </div>

                    {/* Business */}
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                        <h3 className="text-xl font-bold text-slate-900">Business</h3>
                        <div className="text-4xl font-bold mt-4 mb-2 text-slate-900">$49<span className="text-lg text-slate-400 font-medium ml-1">/mo</span></div>
                        <p className="text-slate-500 text-sm mb-8">For growing teams.</p>
                        <button
                            onClick={() => handleSubscription('business')}
                            className="w-full py-3 border border-slate-200 bg-white text-slate-700 rounded-xl font-semibold hover:bg-slate-50 hover:text-slate-900 transition-colors"
                        >
                            {loading ? 'Contact Sales' : 'Contact Sales'}
                        </button>
                        <ul className="mt-8 space-y-4 text-sm text-slate-600 font-medium">
                            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> Everything in Pro</li>
                            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> Team Collaboration</li>
                            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> Exclusive Resources</li>
                            <li className="flex gap-3"><Check size={18} className="text-blue-600" /> Dedicated Manager</li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
}
