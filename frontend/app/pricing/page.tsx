'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui';
import { Check, X, Star, Zap, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Script from 'next/script';
import { fetchAPI } from '@/lib/api';
import Link from 'next/link';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function PricingPage() {
    const [loading, setLoading] = useState(false);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleSubscription = async (planId: string) => {
        if (loading) return;
        setLoading(true);

        try {
            const order = await fetchAPI('/api/billing/order/', {
                method: 'POST',
                body: JSON.stringify({ plan_id: planId }),
            });

            const options = {
                key: 'rzp_test_1DP5mmOlF5G5ag',
                amount: order.amount,
                currency: order.currency,
                name: "DevPulse",
                description: `${planId.toUpperCase()} Subscription`,
                order_id: order.id,
                handler: async (response: any) => {
                    try {
                        await fetchAPI('/api/billing/verify/', {
                            method: 'POST',
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                plan_id: planId,
                            })
                        });
                        alert('Subscription Active! Welcome to DevPulse Pro.');
                    } catch {
                        alert('Verification Failed');
                    }
                },
                theme: {
                    color: "#0052CC",
                },
            };

            if (window.Razorpay) {
                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            } else {
                alert('Payment SDK not loaded. Please refresh.');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to initiate payment');
        } finally {
            setLoading(false);
        }
    };

    const plans = [
        {
            name: 'Starter',
            description: 'For small teams getting started',
            price: { monthly: 0, annually: 0 },
            popular: false,
            cta: 'Get Started Free',
            ctaVariant: 'outline' as const,
            features: [
                { text: 'Up to 5 users', included: true },
                { text: 'Basic integrations (GitHub, Jira)', included: true },
                { text: 'Essential metrics dashboard', included: true },
                { text: '30-day data retention', included: true },
                { text: 'Community support', included: true },
                { text: 'DORA metrics', included: false },
                { text: 'AI code reviews', included: false },
                { text: 'Custom dashboards', included: false },
                { text: 'Priority support', included: false },
            ],
        },
        {
            name: 'Team',
            description: 'For growing engineering teams',
            price: { monthly: 99, annually: 79 },
            popular: true,
            cta: 'Start Free Trial',
            ctaVariant: 'cta' as const,
            planId: 'team',
            features: [
                { text: 'Up to 25 users', included: true },
                { text: 'All integrations', included: true },
                { text: 'Advanced analytics + DORA', included: true },
                { text: '90-day data retention', included: true },
                { text: 'Email support', included: true },
                { text: 'AI code reviews (500/mo)', included: true },
                { text: 'Custom dashboards', included: true },
                { text: 'Team collaboration', included: true },
                { text: 'Webhooks & API access', included: false },
            ],
        },
        {
            name: 'Enterprise',
            description: 'For large organizations',
            price: { monthly: null, annually: null },
            popular: false,
            cta: 'Contact Sales',
            ctaVariant: 'primary' as const,
            features: [
                { text: 'Unlimited users', included: true },
                { text: 'All integrations + custom', included: true },
                { text: 'Advanced analytics + custom', included: true },
                { text: 'Unlimited data retention', included: true },
                { text: 'Dedicated support + SLA', included: true },
                { text: 'Unlimited AI code reviews', included: true },
                { text: 'White-label options', included: true },
                { text: 'SSO, SAML, SCIM', included: true },
                { text: 'Custom API + Webhooks', included: true },
            ],
        },
    ];

    const faqs = [
        {
            question: 'Is there a free trial?',
            answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start.',
        },
        {
            question: 'Can I change plans later?',
            answer: 'Absolutely. You can upgrade, downgrade, or cancel your plan at any time from your account settings.',
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, debit cards, and UPI payments through our secure payment partner.',
        },
        {
            question: 'Is my data secure?',
            answer: 'Yes, we are SOC2 Type II certified and ISO 27001 compliant. All data is encrypted at rest and in transit.',
        },
        {
            question: 'Do you offer discounts for startups?',
            answer: 'Yes! Contact our sales team to learn about our startup program with special pricing.',
        },
    ];

    const comparisonFeatures = [
        { name: 'Users', starter: '5', team: '25', enterprise: 'Unlimited' },
        { name: 'Data retention', starter: '30 days', team: '90 days', enterprise: 'Unlimited' },
        { name: 'Integrations', starter: 'Basic (3)', team: 'All (20+)', enterprise: 'All + Custom' },
        { name: 'DORA Metrics', starter: false, team: true, enterprise: true },
        { name: 'AI Code Reviews', starter: false, team: '500/mo', enterprise: 'Unlimited' },
        { name: 'Custom Dashboards', starter: false, team: true, enterprise: true },
        { name: 'SSO/SAML', starter: false, team: false, enterprise: true },
        { name: 'API Access', starter: false, team: 'Limited', enterprise: 'Full' },
        { name: 'Support', starter: 'Community', team: 'Email', enterprise: 'Dedicated + SLA' },
    ];

    return (
        <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-devpulse-blue-100">
            <Navbar />
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            {/* Hero */}
            <section className="pt-32 pb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-mesh-gradient" />
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-devpulse-yellow-50 text-devpulse-yellow-700 text-sm font-semibold mb-4">
                        <Star size={14} className="fill-current" />
                        Simple, transparent pricing
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Choose the plan that's right for you
                    </h1>
                    <p className="text-xl text-neutral-500 mb-8">
                        Start free, then scale as your team grows. No hidden fees.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-4 p-1 bg-neutral-100 rounded-xl">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${billingCycle === 'monthly'
                                ? 'bg-white text-neutral-900 shadow-sm'
                                : 'text-neutral-500 hover:text-neutral-700'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('annually')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${billingCycle === 'annually'
                                ? 'bg-white text-neutral-900 shadow-sm'
                                : 'text-neutral-500 hover:text-neutral-700'
                                }`}
                        >
                            Annually
                            <span className="px-2 py-0.5 bg-success-100 text-success-700 text-xs rounded-full font-bold">
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`relative rounded-2xl p-8 transition-all ${plan.popular
                                    ? 'bg-white border-2 border-devpulse-blue-600 shadow-xl shadow-devpulse-blue-500/10 scale-105 z-10'
                                    : 'bg-white border border-neutral-200 shadow-card hover:shadow-card-hover hover:z-20'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-devpulse-blue-600 text-white text-xs font-bold rounded-full shadow-lg">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="mb-6">
                                    <h3 className="text-xl font-bold text-neutral-900 mb-1">{plan.name}</h3>
                                    <p className="text-sm text-neutral-500">{plan.description}</p>
                                </div>

                                <div className="mb-6">
                                    {plan.price[billingCycle] !== null ? (
                                        <>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-extrabold text-neutral-900">
                                                    ${plan.price[billingCycle]}
                                                </span>
                                                <span className="text-neutral-500">/month</span>
                                            </div>
                                            {billingCycle === 'annually' && plan.price.monthly !== null && plan.price.monthly > 0 && plan.price.annually !== null && (
                                                <p className="text-sm text-success-600 mt-1">
                                                    Save ${(plan.price.monthly - plan.price.annually) * 12}/year
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-4xl font-extrabold text-neutral-900">Custom</div>
                                    )}
                                </div>

                                {plan.planId ? (
                                    <Button
                                        variant={plan.ctaVariant}
                                        fullWidth
                                        onClick={() => handleSubscription(plan.planId!)}
                                        isLoading={loading}
                                    >
                                        {plan.cta}
                                    </Button>
                                ) : plan.name === 'Enterprise' ? (
                                    <Link href="/contact">
                                        <Button variant={plan.ctaVariant} fullWidth>
                                            {plan.cta}
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href="/register">
                                        <Button variant={plan.ctaVariant} fullWidth>
                                            {plan.cta}
                                        </Button>
                                    </Link>
                                )}

                                <ul className="mt-8 space-y-4">
                                    {plan.features.map((feature, fidx) => (
                                        <li key={fidx} className="flex items-start gap-3">
                                            {feature.included ? (
                                                <Check size={18} className="text-devpulse-blue-600 mt-0.5 flex-shrink-0" />
                                            ) : (
                                                <X size={18} className="text-neutral-300 mt-0.5 flex-shrink-0" />
                                            )}
                                            <span className={feature.included ? 'text-neutral-700' : 'text-neutral-400'}>
                                                {feature.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-24 bg-neutral-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Compare all features</h2>
                        <p className="text-neutral-500">See what's included in each plan</p>
                    </div>

                    <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-card">
                        <div className="grid grid-cols-4 gap-4 p-6 bg-neutral-50 border-b border-neutral-200 font-semibold text-sm">
                            <div className="text-neutral-600">Feature</div>
                            <div className="text-center">Starter</div>
                            <div className="text-center text-devpulse-blue-600">Team</div>
                            <div className="text-center">Enterprise</div>
                        </div>
                        {comparisonFeatures.map((feature, idx) => (
                            <div
                                key={idx}
                                className={`grid grid-cols-4 gap-4 p-4 text-sm ${idx !== comparisonFeatures.length - 1 ? 'border-b border-neutral-100' : ''
                                    }`}
                            >
                                <div className="font-medium text-neutral-700">{feature.name}</div>
                                <div className="text-center text-neutral-500">
                                    {typeof feature.starter === 'boolean' ? (
                                        feature.starter ? (
                                            <Check size={18} className="inline text-success-500" />
                                        ) : (
                                            <X size={18} className="inline text-neutral-300" />
                                        )
                                    ) : (
                                        feature.starter
                                    )}
                                </div>
                                <div className="text-center text-devpulse-blue-600 font-medium">
                                    {typeof feature.team === 'boolean' ? (
                                        feature.team ? (
                                            <Check size={18} className="inline text-success-500" />
                                        ) : (
                                            <X size={18} className="inline text-neutral-300" />
                                        )
                                    ) : (
                                        feature.team
                                    )}
                                </div>
                                <div className="text-center text-neutral-700">
                                    {typeof feature.enterprise === 'boolean' ? (
                                        feature.enterprise ? (
                                            <Check size={18} className="inline text-success-500" />
                                        ) : (
                                            <X size={18} className="inline text-neutral-300" />
                                        )
                                    ) : (
                                        feature.enterprise
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-white">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Frequently asked questions</h2>
                        <p className="text-neutral-500">
                            Can't find what you're looking for?{' '}
                            <Link href="/contact" className="text-devpulse-blue-600 font-semibold hover:underline">
                                Contact us
                            </Link>
                        </p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="border border-neutral-200 rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
                                >
                                    <span className="font-semibold text-neutral-900">{faq.question}</span>
                                    {openFaq === idx ? (
                                        <ChevronUp size={20} className="text-neutral-400" />
                                    ) : (
                                        <ChevronDown size={20} className="text-neutral-400" />
                                    )}
                                </button>
                                {openFaq === idx && (
                                    <div className="px-5 pb-5 text-neutral-600">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-devpulse-blue-600 text-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-4">Not sure which plan is right for you?</h2>
                    <p className="text-devpulse-blue-100 mb-8">
                        Book a demo with our team to get personalized recommendations.
                    </p>
                    <Link href="/contact">
                        <Button variant="cta" size="lg" rightIcon={<ArrowRight size={18} />}>
                            Book a Demo
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-neutral-900 text-neutral-400 text-center text-sm">
                <p>© 2026 DevPulse Inc. All rights reserved.</p>
            </footer>
        </div>
    );
}
