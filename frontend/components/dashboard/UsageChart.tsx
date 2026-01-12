
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Mon', usage: 120 },
    { name: 'Tue', usage: 200 },
    { name: 'Wed', usage: 150 },
    { name: 'Thu', usage: 300 },
    { name: 'Fri', usage: 250 },
    { name: 'Sat', usage: 380 },
    { name: 'Sun', usage: 400 },
];

export default function UsageChart() {
    return (
        <div className="h-[300px] w-full bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">API Usage (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="usage"
                        stroke="#2563eb"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
