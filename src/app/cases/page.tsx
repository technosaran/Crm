"use client";

import React, { useState } from 'react';
import {
    LifeBuoy,
    Search,
    Plus,
    ChevronDown,
    MoreVertical,
    AlertCircle,
    Clock,
    CheckCircle2,
    Filter,
    MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const initialCases = [
    { id: '0001024', subject: 'API Latency in Production', priority: 'High', status: 'In Progress', contact: 'Sarah Miller', company: 'Apex Systems', created: '2h ago' },
    { id: '0001025', subject: 'Password Reset failing for SSO', priority: 'Medium', status: 'New', contact: 'John Peterson', company: 'Stark Industries', created: '5h ago' },
    { id: '0001026', subject: 'Billing discrepancy for Q4', priority: 'Low', status: 'Escalated', contact: 'David Chen', company: 'Wayne Ent.', created: '1d ago' },
    { id: '0001027', subject: 'Feature request: Bulk Export', priority: 'Low', status: 'On Hold', contact: 'Elena Rodriguez', company: 'Skyline VC', created: '2d ago' },
];

export default function CasesPage() {
    const [cases] = useState(initialCases);

    return (
        <div className="space-y-6 pb-12">
            {/* Salesforce Service Header */}
            <div className="bg-white border border-sf-border rounded-[4px] p-4 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#00a1e0] h-10 w-10 shadow-lg rounded-full flex items-center justify-center text-white">
                            <LifeBuoy size={20} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Service Cloud: Cases</p>
                            <h2 className="text-[20px] font-bold text-slate-900 leading-tight flex items-center gap-2">
                                Recently Viewed <ChevronDown size={14} className="text-slate-400" />
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="sf-btn-neutral"><MessageSquare size={14} className="mr-2" /> Chatter</button>
                        <button className="sf-btn-primary">
                            <Plus size={14} className="mr-2" />
                            New Case
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 space-y-4">
                    {/* Case List View */}
                    <div className="bg-white border border-sf-border rounded-[4px] shadow-sm overflow-hidden">
                        <div className="p-3 border-b border-sf-border bg-sf-gray/20 flex items-center justify-between">
                            <div className="text-[12px] text-slate-500 font-bold">12+ cases • Updated just now</div>
                            <div className="flex items-center gap-2">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    <input placeholder="Search cases..." className="bg-white border border-sf-border rounded h-7 pl-9 pr-4 text-[12px] w-48 focus:border-sf-blue outline-none transition-all" />
                                </div>
                                <button className="p-1 px-2 border border-sf-border rounded hover:bg-white text-slate-500"><Filter size={14} /></button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-[13px] border-collapse">
                                <thead className="bg-white border-b border-sf-border">
                                    <tr>
                                        <th className="p-3 w-12 text-center"><input type="checkbox" className="rounded" /></th>
                                        {['Case Number', 'Subject', 'Priority', 'Status', 'Contact', 'Created'].map(h => (
                                            <th key={h} className="p-3 font-bold text-slate-600 uppercase text-[10px] tracking-wider">{h}</th>
                                        ))}
                                        <th className="p-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-sf-border/50">
                                    {cases.map((c, idx) => (
                                        <tr key={c.id} className="hover:bg-sf-gray/30 group transition-colors">
                                            <td className="p-3 text-center"><input type="checkbox" className="rounded" /></td>
                                            <td className="p-3 font-bold text-sf-blue hover:underline cursor-pointer">{c.id}</td>
                                            <td className="p-3">
                                                <div className="max-w-[200px] truncate font-bold text-slate-800">{c.subject}</div>
                                                <div className="text-[11px] text-slate-400">{c.company}</div>
                                            </td>
                                            <td className="p-3">
                                                <div className={cn(
                                                    "flex items-center gap-1.5 text-[11px] font-bold",
                                                    c.priority === 'High' ? "text-red-600" : c.priority === 'Medium' ? "text-amber-500" : "text-blue-500"
                                                )}>
                                                    <AlertCircle size={10} /> {c.priority}
                                                </div>
                                            </td>
                                            <td className="p-3">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded text-[10px] font-bold border",
                                                    c.status === 'New' ? "bg-blue-50 text-blue-600 border-blue-200" :
                                                        c.status === 'In Progress' ? "bg-amber-50 text-amber-600 border-amber-200" :
                                                            c.status === 'Escalated' ? "bg-red-50 text-red-600 border-red-200" :
                                                                "bg-slate-50 text-slate-600 border-slate-200"
                                                )}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td className="p-3 text-slate-600 font-medium">{c.contact}</td>
                                            <td className="p-3 text-slate-400 font-medium">{c.created}</td>
                                            <td className="p-3 text-right">
                                                <button className="p-1 px-2 hover:bg-white rounded transition-all text-slate-400">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Service Metrics Card */}
                    <div className="sf-card p-5 border-t-4 border-t-[#00a1e0]">
                        <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Clock size={16} className="text-[#00a1e0]" /> SLA Health
                        </h3>
                        <div className="space-y-4">
                            {[
                                { label: 'First Response', value: '1.4h', target: '2.0h', status: 'Good' },
                                { label: 'Resolution Time', value: '12.8h', target: '24.0h', status: 'Good' },
                            ].map((metric, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex items-center justify-between text-[11px] font-bold">
                                        <span className="text-slate-500 uppercase tracking-tighter">{metric.label}</span>
                                        <span className="text-emerald-600">{metric.status}</span>
                                    </div>
                                    <div className="text-[18px] font-bold text-slate-800">{metric.value}</div>
                                    <div className="text-[10px] text-slate-400">Target: {metric.target}</div>
                                </div>
                            ))}
                            <div className="pt-4 border-t border-sf-border mt-4">
                                <p className="text-[11px] text-slate-500">Service quality is up <span className="text-emerald-600 font-bold">8.2%</span> compared to last week.</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Resolution Widget */}
                    <div className="bg-[#001639] text-white p-5 rounded-[4px] shadow-lg relative overflow-hidden group">
                        <div className="absolute -top-12 -right-12 h-32 w-32 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                        <h3 className="text-[14px] font-bold mb-4 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-emerald-400" /> Resolution Assistant
                        </h3>
                        <p className="text-[11px] text-white/60 mb-6">AI-Powered case suggestions are active for your region.</p>
                        <button className="w-full bg-white/10 border border-white/20 py-2 rounded text-[11px] font-bold hover:bg-white/20 transition-all">
                            Configure Suggestions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
