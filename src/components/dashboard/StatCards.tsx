"use client";

import React from 'react';
import {
    TrendingUp,
    Users,
    Target,
    DollarSign,
    Zap,
    ArrowUpRight,
    MoreHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn, formatCurrency } from '@/lib/utils';
import { useGlobalStore } from '@/store/useGlobalStore';

export function StatCards() {
    const { currency, locale } = useGlobalStore();

    const stats = [
        {
            label: 'Total Revenue (YTD)',
            value: 0,
            trend: '0%',
            isPositive: true,
            icon: DollarSign,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            description: 'Awaiting data sync...'
        },
        {
            label: 'Open Opportunities',
            value: 0,
            trend: '0',
            isPositive: true,
            icon: Target,
            color: 'text-violet-600',
            bg: 'bg-violet-50',
            description: 'No active deals'
        },
        {
            label: 'Active Leads',
            value: 0,
            trend: '0%',
            isPositive: true,
            icon: Users,
            color: 'text-fuchsia-600',
            bg: 'bg-fuchsia-50',
            description: 'List views empty'
        },
        {
            label: 'SLA Performance',
            value: '0%',
            trend: '0%',
            isPositive: true,
            icon: Zap,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            description: 'No service cases'
        }
    ];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                    className="group glass-card p-6 relative overflow-hidden"
                >
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                    <div className="relative flex items-center justify-between mb-6">
                        <div className={cn("p-3 rounded-xl transition-all duration-300 group-hover:scale-110 shadow-sm", stat.bg, stat.color)}>
                            <stat.icon size={22} className="stroke-[2.5]" />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                "text-[11px] font-bold px-2 py-1 rounded-full flex items-center gap-1",
                                "bg-emerald-50 text-emerald-600"
                            )}>
                                <TrendingUp size={10} /> {stat.trend}
                            </span>
                        </div>
                    </div>

                    <div className="relative">
                        <p className="text-[12px] font-bold text-slate-400 font-outfit uppercase tracking-wider mb-2">{stat.label}</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
                                {typeof stat.value === 'number' ? formatCurrency(stat.value, currency, locale) : stat.value}
                            </h3>
                            <button className="p-1.5 rounded-full hover:bg-slate-100 text-slate-300 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                                <ArrowUpRight size={16} />
                            </button>
                        </div>
                        <p className="text-[12px] text-slate-400 mt-3 font-medium flex items-center gap-1">
                            {stat.description}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
