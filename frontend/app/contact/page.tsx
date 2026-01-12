
import Navbar from '@/components/Navbar';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactUs() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
            <Navbar />
            <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center text-slate-900">Contact Us</h1>
                <p className="text-center text-slate-500 text-lg mb-16 max-w-2xl mx-auto">
                    We'd love to hear from you. Whether you have a question about features, pricing, or need support, our team is ready to answer all your questions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                        <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                            <Mail size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Email Us</h3>
                        <p className="text-slate-500 text-sm">contact@learn-made.in</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                        <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                            <Phone size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Call Us</h3>
                        <p className="text-slate-500 text-sm">Mon-Fri from 9am to 6pm</p>
                        <p className="text-slate-500 text-sm">+1 (555) 123-4567</p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
                        <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                            <MapPin size={24} />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                        <p className="text-slate-500 text-sm">123 Innovation Drive</p>
                        <p className="text-slate-500 text-sm">Tech City, CA 94043</p>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">First Name</label>
                                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Last Name</label>
                                <input type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                            <input type="email" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
                            <textarea rows={4} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                        </div>
                        <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">Send Message</button>
                    </form>
                </div>
            </main>
        </div>
    );
}
