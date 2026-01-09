"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    LineChart,
    BarChart,
    PieChart,
    Activity,
    ArrowUpRight,
    Users,
    CreditCard,
    Clock,
    Download,
    Calendar,
    Filter,
    TrendingUp,
    MoreVertical
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { useGlobalStore } from '@/store/useGlobalStore';

export default function AnalyticsPage() {
    const { currency, locale } = useGlobalStore();

    return (
        <div className="space-y-6 pb-12">
            {/* Header */}
            <div className="bg-white border border-sf-border rounded-[4px] p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#4BC076] h-12 w-12 rounded flex items-center justify-center text-white shadow-md">
                            <Activity size={28} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-1">Analytics</p>
                            <h1 className="text-[24px] font-bold tracking-tight text-slate-900 leading-none">
                                Performance Insights
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="sf-btn-neutral flex items-center gap-2">
                            <Calendar size={14} />
                            Last 12 Months
                        </button>
                        <button className="sf-btn-neutral">
                            <Filter size={14} />
                        </button>
                        <button className="sf-btn-primary flex items-center gap-2">
                            <Download size={14} />
                            Export PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: 'Customer LTV', value: 4200, change: '+12%', trend: 'up', icon: Users, color: 'text-sf-blue', bg: 'bg-sf-blue/10' },
                    { label: 'Avg. CAC', value: 840, change: '-5%', trend: 'down', icon: CreditCard, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
                    { label: 'Retention Rate', value: '98.2%', change: '+0.4%', trend: 'up', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { label: 'Sales Cycle', value: '42 Days', change: '-2 Days', trend: 'up', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white border border-sf-border rounded-[4px] p-5 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={cn("p-2 rounded", stat.bg, stat.color)}>
                                <stat.icon size={18} />
                            </div>
                            <span className={cn(
                                "text-[11px] font-bold px-2 py-0.5 rounded-full",
                                stat.trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                            )}>
                                {stat.change}
                            </span>
                        </div>
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                        <h3 className="text-[20px] font-bold mt-1 text-slate-900">
                            {typeof stat.value === 'number' ? formatCurrency(stat.value, currency, locale) : stat.value}
                        </h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Chart 1: Revenue Velocity */}
                <div className="bg-white border border-sf-border rounded-[4px] p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-sf-border">
                        <div className="flex items-center gap-2">
                            <LineChart size={18} className="text-sf-blue" />
                            <h3 className="text-[15px] font-bold text-slate-800">Revenue Growth Velocity</h3>
                        </div>
                        <button className="text-slate-400 hover:text-slate-600"><MoreVertical size={16} /></button>
                    </div>
                    <div className="flex h-56 items-end justify-between gap-1.5 px-2">
                        {[30, 45, 25, 60, 40, 75, 55, 90, 65, 80, 70, 95].map((val, i) => (
                            <div key={i} className="flex-1 group relative">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${val}%` }}
                                    transition={{ delay: i * 0.03, duration: 0.8 }}
                                    className="w-full bg-sf-blue/20 hover:bg-sf-blue rounded-t-[2px] transition-all cursor-pointer relative"
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-[10px] py-1 px-2 rounded pointer-events-none transition-opacity">
                                        {val}%
                                    </div>
                                </motion.div>
                                <div className="mt-2 text-[9px] text-center text-slate-400 font-bold uppercase">M{i + 1}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chart 2: Lead Gen Quality */}
                <div className="bg-white border border-sf-border rounded-[4px] p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-sf-border">
                        <div className="flex items-center gap-2">
                            <BarChart size={18} className="text-[#4BC076]" />
                            <h3 className="text-[15px] font-bold text-slate-800">Pipeline Quality by Source</h3>
                        </div>
                        <div className="flex gap-1">
                            <div className="h-3 w-3 bg-[#4BC076] rounded-[2px]" />
                            <div className="h-3 w-3 bg-[#7F8DE1] rounded-[2px]" />
                        </div>
                    </div>
                    <div className="space-y-6">
                        {[
                            { label: 'Direct Sales', value: '$850k', width: '85%', color: 'bg-sf-blue' },
                            { label: 'Partnerships', value: '$640k', width: '65%', color: 'bg-indigo-500' },
                            { label: 'Outbound', value: '$420k', width: '45%', color: 'bg-emerald-500' },
                            { label: 'Marketing', value: '$310k', width: '35%', color: 'bg-amber-500' },
                        ].map((source, i) => (
                            <div key={i}>
                                <div className="flex items-center justify-between text-[11px] mb-2 font-bold uppercase tracking-tight">
                                    <span className="text-slate-600">{source.label}</span>
                                    <span className="text-slate-400">{source.value}</span>
                                </div>
                                <div className="h-2 w-full bg-sf-gray rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: source.width }}
                                        transition={{ delay: i * 0.1, duration: 1.2 }}
                                        className={cn("h-full", source.color)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row Insights */}
            <div className="bg-white border border-sf-border rounded-[4px] p-6 shadow-sm border-l-4 border-l-sf-blue">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-sf-blue/5 rounded-full text-sf-blue">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <h4 className="text-[16px] font-bold text-slate-800">Intelligence Insight: Pipeline Velocity Increased</h4>
                        <p className="text-[13px] text-slate-600 mt-1 max-w-3xl">
                            We've detected a <span className="text-emerald-600 font-bold">14.2% acceleration</span> in deal movement within the 'Proposal' stage compared to last quarter. This is primarily driven by the new EMEA expansion strategy. Automated reminders are recommended for the 'Negotiation' stage to maintain this momentum.
                        </p>
                    </div>
                    <button className="ml-auto sf-btn-neutral whitespace-nowrap">View Full Report</button>
                </div>
            </div>
        </div>
    );
}
