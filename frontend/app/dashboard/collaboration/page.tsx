
import Sidebar from '@/components/dashboard/Sidebar';
import { UserPlus, Users, Mail, Check, X } from 'lucide-react';

export default function CollaborationPage() {
    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Collaboration</h1>
                        <p className="text-slate-500">Manage your team and invite members to collaborate.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center">
                        <UserPlus size={20} className="mr-2" />
                        Invite Member
                    </button>
                </header>

                {/* Team List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center">
                        <Users size={20} className="text-blue-600 mr-2" />
                        <h3 className="font-bold text-lg">Team Members</h3>
                    </div>

                    <div className="divide-y divide-slate-100">
                        {/* Member 1 (You) */}
                        <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">You</div>
                                <div>
                                    <p className="font-bold text-slate-900">John Doe (You)</p>
                                    <p className="text-sm text-slate-500">john@example.com</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Admin</span>
                        </div>

                        {/* Member 2 */}
                        <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">SS</div>
                                <div>
                                    <p className="font-bold text-slate-900">Sarah Smith</p>
                                    <p className="text-sm text-slate-500">sarah@example.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">Editor</span>
                                <button className="text-slate-400 hover:text-red-500"><X size={18} /></button>
                            </div>
                        </div>

                        {/* Invite Pending */}
                        <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors opacity-75">
                            <div className="flex items-center space-x-4">
                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold"><Mail size={16} /></div>
                                <div>
                                    <p className="font-bold text-slate-900 italic">Pending Invite...</p>
                                    <p className="text-sm text-slate-500">mike@example.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">Pending</span>
                                <button className="text-slate-400 hover:text-red-500"><X size={18} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
