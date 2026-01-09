"use client";

import React, { useState } from 'react';
import {
    BarChart4,
    Search,
    Plus,
    Folder,
    Star,
    Clock,
    MoreVertical,
    ChevronDown,
    FileText,
    Share2,
    Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const initialReports = [
    { id: 1, name: 'Sales Pipeline by Region', folder: 'Public Reports', createdBy: 'Alex Rivera', lastRun: '2 mins ago', pinned: true },
    { id: 2, name: 'Leads Created This Month', folder: 'Marketing Reports', createdBy: 'Michael Chen', lastRun: '1 hour ago', pinned: false },
    { id: 3, name: 'Case Resolution SLA Performance', folder: 'Service Reports', createdBy: 'Sarah Miller', lastRun: 'Yesterday', pinned: true },
    { id: 4, name: 'Revenue Forecast Q1 2026', folder: 'Executive Reports', createdBy: 'Alex Rivera', lastRun: 'Jan 02, 2026', pinned: false },
    { id: 5, name: 'Active Account Exposure', folder: 'Public Reports', createdBy: 'System Admin', lastRun: 'Last Week', pinned: false },
];

export default function ReportsPage() {
    const [reports] = useState(initialReports);

    return (
        <div className="space-y-6 pb-12">
            {/* Salesforce Reports Header */}
            <div className="bg-white border border-sf-border rounded-[4px] p-4 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#54698d] h-10 w-10 shadow-lg rounded-full flex items-center justify-center text-white">
                            <BarChart4 size={20} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Analytics</p>
                            <h2 className="text-[20px] font-bold text-slate-900 leading-tight flex items-center gap-2">
                                Reports <ChevronDown size={14} className="text-slate-400" />
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="sf-btn-neutral flex items-center gap-2"><Folder size={14} /> Folders</button>
                        <button className="sf-btn-primary flex items-center gap-2">
                            <Plus size={14} /> New Report
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Sidebar: Folders */}
                <div className="w-full lg:w-64 shrink-0 space-y-2">
                    <div className="bg-white border border-sf-border rounded-[4px] shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-sf-border bg-sf-gray/20 font-bold text-[13px]">Report Navigation</div>
                        <div className="p-2 space-y-1">
                            {[
                                { label: 'Recent', icon: Clock, active: true },
                                { label: 'Pinned', icon: Star, active: false },
                                { label: 'Created by Me', icon: FileText, active: false },
                                { label: 'Public Reports', icon: Folder, active: false },
                                { label: 'Private Reports', icon: Folder, active: false },
                            ].map((nav, i) => (
                                <button
                                    key={i}
                                    className={cn(
                                        "w-full flex items-center gap-3 px-3 py-2 text-[13px] font-medium rounded transition-all",
                                        nav.active ? "bg-sf-blue/10 text-sf-blue font-bold" : "text-slate-600 hover:bg-sf-gray"
                                    )}
                                >
                                    <nav.icon size={16} />
                                    {nav.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Reports List */}
                <div className="flex-1 bg-white border border-sf-border rounded-[4px] shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-sf-border bg-sf-gray/20 flex items-center justify-between">
                        <div className="text-[13px] text-slate-500 font-medium">
                            <span className="font-bold text-slate-800">120+</span> reports • Sorted by Last Run
                        </div>
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 focus-within:text-sf-blue transition-colors" />
                            <input placeholder="Search reports..." className="bg-white border border-sf-border rounded h-8 pl-10 pr-4 text-sm focus:border-sf-blue outline-none w-64 transition-all" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[13px] border-collapse">
                            <thead className="bg-[#f2f4f7] border-b border-sf-border">
                                <tr>
                                    <th className="p-3 w-12 text-center"></th>
                                    <th className="p-3 font-bold text-slate-600 uppercase text-[10px] tracking-wider">Report Name</th>
                                    <th className="p-3 font-bold text-slate-600 uppercase text-[10px] tracking-wider">Folder</th>
                                    <th className="p-3 font-bold text-slate-600 uppercase text-[10px] tracking-wider">Created By</th>
                                    <th className="p-3 font-bold text-slate-600 uppercase text-[10px] tracking-wider">Last Run</th>
                                    <th className="p-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sf-border/50">
                                {reports.map((report, idx) => (
                                    <tr key={report.id} className="hover:bg-sf-gray/30 group transition-colors">
                                        <td className="p-3 text-center">
                                            <Star size={14} className={cn(report.pinned ? "text-amber-400 fill-amber-400" : "text-slate-200 group-hover:text-slate-300")} />
                                        </td>
                                        <td className="p-3">
                                            <div className="font-bold text-sf-blue hover:underline cursor-pointer">{report.name}</div>
                                            <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-tighter">Summary Report</div>
                                        </td>
                                        <td className="p-3 text-slate-500 font-medium">{report.folder}</td>
                                        <td className="p-3 font-semibold text-slate-700">{report.createdBy}</td>
                                        <td className="p-3 text-slate-500">{report.lastRun}</td>
                                        <td className="p-3 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 hover:bg-sf-gray rounded text-slate-400" title="Run Report"><Download size={14} /></button>
                                                <button className="p-1.5 hover:bg-sf-gray rounded text-slate-400" title="Share"><Share2 size={14} /></button>
                                                <button className="p-1.5 hover:bg-sf-gray rounded text-slate-400"><MoreVertical size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 border-t border-sf-border">
                        <div className="h-16 w-16 bg-sf-gray rounded-full flex items-center justify-center text-slate-300">
                            <BarChart4 size={32} />
                        </div>
                        <div>
                            <p className="text-[14px] font-bold text-slate-800">Scale your insights</p>
                            <p className="text-[12px] text-slate-500">Create custom reports and dashboards to visualize your revenue velocity.</p>
                        </div>
                        <button className="sf-btn-neutral">Build New Report</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
