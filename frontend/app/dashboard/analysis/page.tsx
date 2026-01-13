'use client';

import React, { useState } from 'react';
import { Play, Sparkles, AlertTriangle, CheckCircle, XCircle, Info, ShieldCheck } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

interface Issue {
    type: 'warning' | 'critical' | 'info' | 'security';
    message: string;
    line: number;
}

interface Result {
    score: number;
    issues: Issue[];
    summary: string;
}

export default function AnalysisPage() {
    const [code, setCode] = useState<string>(`def calculate_total(items):
    total = 0
    # TODO: Implement tax calculation
    for item in items:
        print(f"Processing {item}")
        total += item.price
    return total`);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<Result | null>(null);

    const analyzeCode = async () => {
        setLoading(true);
        try {
            const data = await fetchAPI('/api/ai/analyze/', {
                method: 'POST',
                body: JSON.stringify({ code }),
            });
            setResult(data);
        } catch (error) {
            alert('Analysis failed');
        } finally {
            setLoading(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getIssueIcon = (type: string) => {
        switch (type) {
            case 'critical': return <XCircle className="text-red-600" size={18} />;
            case 'warning': return <AlertTriangle className="text-yellow-600" size={18} />;
            case 'security': return <ShieldCheck className="text-purple-600" size={18} />;
            default: return <Info className="text-blue-600" size={18} />;
        }
    };

    return (
        <div className="bg-slate-50 text-slate-900 font-sans h-full">
            <main className="p-8 h-full overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 text-slate-900">
                            <div className="bg-blue-100 p-2 rounded-lg">
                                <Sparkles className="text-blue-600" size={24} />
                            </div>
                            Smart Code Analysis
                        </h1>
                        <p className="text-slate-500 font-medium">AI-powered deep scan for security, performance, and best practices.</p>
                    </div>
                    <button
                        onClick={analyzeCode}
                        disabled={loading}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Analyzing...' : <><Play fill="currentColor" size={18} /> Run Analysis</>}
                    </button>
                </header>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 h-full overflow-hidden pb-4">
                    {/* Editor Panel - Keeping Dark for contrast/dev preference, but updating container */}
                    <div className="bg-white rounded-2xl border border-slate-200 flex flex-col overflow-hidden shadow-sm">
                        <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <span>main.py</span>
                            <span>Editor</span>
                        </div>
                        <div className="flex-1 bg-[#1e1e1e] p-0 overflow-hidden">
                            <textarea
                                className="w-full h-full bg-[#1e1e1e] text-gray-300 font-mono p-6 resize-none focus:outline-none leading-relaxed text-sm"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                spellCheck={false}
                            />
                        </div>
                    </div>

                    {/* Results Panel */}
                    <div className="bg-white rounded-2xl border border-slate-200 flex flex-col overflow-hidden p-8 shadow-sm relative">
                        {!result && !loading && (
                            <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-400 opacity-60">
                                <div className="bg-slate-100 p-6 rounded-full mb-6">
                                    <Sparkles size={48} className="text-slate-300" />
                                </div>
                                <p className="font-medium text-lg">Ready to analyze your code.</p>
                            </div>
                        )}

                        {result && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
                                <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-100">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Quality Score</h3>
                                        <p className="text-sm font-medium text-slate-500">{result.summary}</p>
                                    </div>
                                    <div className={`text-6xl font-black tracking-tighter ${getScoreColor(result.score)}`}>
                                        {result.score}
                                    </div>
                                </div>

                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    Detected Issues
                                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">{result.issues.length}</span>
                                </h3>

                                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                                    {result.issues.length === 0 ? (
                                        <div className="p-6 bg-green-50 border border-green-100 rounded-xl text-green-700 flex items-center gap-4">
                                            <CheckCircle size={24} />
                                            <span className="font-medium">No issues found! Great job.</span>
                                        </div>
                                    ) : (
                                        result.issues.map((issue, idx) => (
                                            <div key={idx} className="p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all flex gap-4 group">
                                                <div className="mt-1 p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">{getIssueIcon(issue.type)}</div>
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{issue.type}</span>
                                                        {issue.line > 0 && <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">Line {issue.line}</span>}
                                                    </div>
                                                    <p className="text-slate-700 text-sm leading-relaxed font-medium">{issue.message}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
