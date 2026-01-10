"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Users,
    CreditCard,
    Clock,
    Download,
    Calendar,
    Filter,
    BarChart3,
    Sparkles,
    Search,
    TrendingUp,
    Target,
    Zap,
    TrendingDown,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { useGlobalStore } from '@/store/useGlobalStore';
import { useAnalytics } from '@/hooks/useAnalytics';
import Link from 'next/link';

export default function AnalyticsPage() {
    const { currency, locale } = useGlobalStore();
    const { stats, loading } = useAnalytics();

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
                <div className="h-12 w-12 border-4 border-sf-blue/20 border-t-sf-blue rounded-full animate-spin mb-4" />
                <p className="font-bold text-slate-800">Calculating Intelligence...</p>
                <p className="text-xs">Processing enterprise data streams</p>
            </div>
        );
    }

    const cards = [
        {
            label: 'Pipeline Value',
            value: formatCurrency(stats?.pipelineValue || 0, currency, locale),
            subtext: `${stats?.dataCounts.opportunities || 0} active deals`,
            icon: Target,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            trend: '+12.5%',
            isPositive: true
        },
        {
            label: 'Conversion Rate',
            value: `${Math.round(stats?.conversionRate || 0)}%`,
            subtext: 'Lead to Qualified',
            icon: Zap,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
            trend: '+4.2%',
            isPositive: true
        },
        {
            label: 'Win Rate',
            value: `${Math.round(stats?.winRate || 0)}%`,
            subtext: 'Closed Won vs Lost',
            icon: TrendingUp,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            trend: '+8.1%',
            isPositive: true
        },
        {
            label: 'Sales Cycle',
            value: `${Math.round(stats?.avgSalesCycle || 0)}d`,
            subtext: 'Avg. closure time',
            icon: Clock,
            color: 'text-sf-blue',
            bg: 'bg-slate-50',
            trend: '-2.4d',
            isPositive: true
        },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="bg-white border-b border-sf-border -mx-6 px-6 py-6 sm:-mx-8 sm:px-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-[#001639] h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-900/20 ring-4 ring-blue-50">
                            <Activity size={32} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="bg-sf-blue/10 text-sf-blue text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">System Intelligence</span>
                                <span className="text-slate-300">•</span>
                                <span className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">Real-time Data</span>
                            </div>
                            <h1 className="text-[28px] font-black tracking-tight text-slate-900 leading-none">
                                Performance Dashboard
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg transition-all">Daily</button>
                            <button className="px-4 py-2 text-xs font-bold bg-white text-sf-blue shadow-sm rounded-lg transition-all">Monthly</button>
                            <button className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-lg transition-all">Quarterly</button>
                        </div>
                        <button className="sf-btn-primary h-11 px-6 shadow-lg shadow-blue-500/20">
                            <Download size={16} className="mr-2" />
                            Export PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group bg-white border border-sf-border rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform">
                            <stat.icon size={80} />
                        </div>
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className={cn("p-2.5 rounded-xl shadow-sm border border-black/5", stat.bg, stat.color)}>
                                <stat.icon size={20} />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full",
                                stat.isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                            )}>
                                {stat.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className="relative z-10">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            <h3 className="text-[26px] font-black mt-1 text-slate-900 tracking-tight">{stat.value}</h3>
                            <p className="text-[12px] text-slate-500 mt-1 font-medium">{stat.subtext}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Intelligence */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-sf-border rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-sf-border flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Revenue Distribution</h3>
                                <p className="text-xs text-slate-500 font-medium">Monthly performance across all business units</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="h-2 w-2 rounded-full bg-sf-blue" />
                                    <span className="text-[10px] font-bold text-slate-600 uppercase">Won</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                                    <span className="text-[10px] font-bold text-slate-600 uppercase">Projected</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-10 flex flex-col items-center justify-center min-h-[300px] bg-slate-50/50">
                            <div className="flex items-end gap-4 w-full max-w-lg h-48">
                                {['NEW', 'QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON'].map((stage, i) => {
                                    const count = stats?.stageDistribution[stage] || 0;
                                    const maxCount = Math.max(...Object.values(stats?.stageDistribution || { 'NONE': 1 }));
                                    const height = maxCount > 0 ? (count / maxCount) * 100 : 0;

                                    return (
                                        <div key={stage} className="flex-1 flex flex-col items-center gap-3">
                                            <div className="w-full relative group">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${Math.max(height, 5)}%` }}
                                                    className="w-full bg-gradient-to-t from-sf-blue to-indigo-500 rounded-t-lg transition-all group-hover:brightness-110 shadow-lg shadow-blue-500/10"
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">{stage.split('_')[0]}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white border border-sf-border rounded-2xl p-6">
                            <h4 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Users size={16} className="text-sf-blue" /> Lead Quality Index
                            </h4>
                            <div className="space-y-5">
                                {[
                                    { label: 'Qualified', count: stats?.dataCounts.leads ? Math.round(stats.dataCounts.leads * (stats.conversionRate / 100)) : 0, color: 'bg-emerald-500' },
                                    { label: 'Open Leads', count: stats?.dataCounts.leads ? stats.dataCounts.leads - Math.round(stats.dataCounts.leads * (stats.conversionRate / 100)) : 0, color: 'bg-slate-200' },
                                ].map((item, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="font-bold text-slate-600">{item.label}</span>
                                            <span className="font-black text-slate-900">{item.count}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${stats?.dataCounts.leads ? (item.count / stats.dataCounts.leads) * 100 : 0}%` }}
                                                className={cn("h-full rounded-full", item.color)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white border border-sf-border rounded-2xl p-6">
                            <h4 className="text-sm font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <BarChart3 size={16} className="text-indigo-600" /> Pipeline stages
                            </h4>
                            <div className="space-y-4">
                                {Object.entries(stats?.stageDistribution || {}).slice(0, 4).map(([stage, count]) => (
                                    <div key={stage} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                                        <span className="text-xs font-medium text-slate-600 uppercase tracking-tight">{stage.replace('_', ' ')}</span>
                                        <span className="text-xs font-bold text-slate-900">{count} deal{count !== 1 ? 's' : ''}</span>
                                    </div>
                                ))}
                                {(!stats?.stageDistribution || Object.keys(stats.stageDistribution).length === 0) && (
                                    <p className="text-xs text-slate-400 text-center py-4">No deals in pipeline</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Intelligence */}
                <div className="space-y-8">
                    <div className="bg-[#001639] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute -bottom-10 -right-10 opacity-10 blur-2xl flex">
                            <Sparkles size={200} />
                        </div>
                        <div className="relative z-10">
                            <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 mb-6">
                                <Sparkles size={20} className="text-amber-400" />
                            </div>
                            <h3 className="text-xl font-black mb-3 leading-tight tracking-tight">Predictive Insights</h3>
                            <p className="text-[13px] text-blue-100/70 mb-8 leading-relaxed">
                                Zenith Intelligence analysis: {(stats?.winRate || 0) > 50 ? 'Your closing velocity is above target.' : 'Pipeline requires attention to hit Q3 targets.'}
                            </p>

                            <div className="space-y-5">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-1">Pipeline Health</p>
                                    <p className="text-sm font-bold">{formatCurrency(stats?.pipelineValue || 0, currency, locale)} Total</p>
                                    <p className="text-xs text-blue-100/50">{stats?.dataCounts?.opportunities || 0} active opportunities</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                                    <p className="text-[10px] font-black text-sf-blue uppercase tracking-widest mb-1">Alerts</p>
                                    <p className="text-sm font-bold">{stats?.stallingDeals || 0} Deals are stalling</p>
                                    <p className="text-xs text-blue-100/50">Discovery phase &gt; 15 days</p>
                                </div>
                            </div>

                            <Link href="/opportunities" className="w-full mt-8 py-3 bg-white text-blue-900 font-black rounded-xl text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                                Manage Pipeline <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white border border-sf-border rounded-2xl p-6 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-800 mb-6">Efficiency Pulse</h4>
                        <div className="flex items-center justify-center py-4 relative">
                            <svg className="h-32 w-32 -rotate-90">
                                <circle cx="64" cy="64" r="58" className="fill-none stroke-slate-100" strokeWidth="12" />
                                <motion.circle
                                    cx="64" cy="64" r="58"
                                    className="fill-none stroke-sf-blue"
                                    strokeWidth="12"
                                    strokeDasharray="364"
                                    initial={{ strokeDashoffset: 364 }}
                                    animate={{ strokeDashoffset: 364 - (364 * (stats?.taskEfficiency || 0) / 100) }}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                                <span className="text-[24px] font-black text-slate-900">{Math.round(stats?.taskEfficiency || 0)}%</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tasks Done</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
