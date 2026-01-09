"use client";

import React from 'react';
import { useGlobalStore } from '@/store/useGlobalStore';
import { Globe, DollarSign, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const locales = [
    { label: 'English (US)', value: 'en-US' },
    { label: 'English (UK)', value: 'en-GB' },
    { label: 'Deutsch', value: 'de-DE' },
    { label: 'Français', value: 'fr-FR' },
    { label: '日本語', value: 'ja-JP' },
    { label: 'हिन्दी', value: 'hi-IN' },
];

const currencies = [
    { label: 'USD ($)', value: 'USD' },
    { label: 'EUR (€)', value: 'EUR' },
    { label: 'GBP (£)', value: 'GBP' },
    { label: 'JPY (¥)', value: 'JPY' },
    { label: 'INR (₹)', value: 'INR' },
];

export function GlobalSwitcher() {
    const { locale, setLocale, currency, setCurrency } = useGlobalStore();

    return (
        <div className="flex items-center gap-3 border-r border-slate-200 pr-4 mr-2">
            <div className="relative group">
                <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 py-1.5 px-3 rounded-lg hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 group-hover:border-slate-200">
                    <Globe size={14} className="text-slate-400 group-hover:text-indigo-500" />
                    {locales.find(l => l.value === locale)?.label}
                </button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl shadow-indigo-500/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] p-1.5 transform group-hover:translate-y-0 translate-y-2">
                    {locales.map((l) => (
                        <button
                            key={l.value}
                            onClick={() => setLocale(l.value)}
                            className={cn(
                                "w-full text-left px-3 py-2 text-xs rounded-lg transition-colors font-medium",
                                locale === l.value ? "text-indigo-600 bg-indigo-50" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-500"
                            )}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative group">
                <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 py-1.5 px-3 rounded-lg hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 group-hover:border-slate-200">
                    <DollarSign size={14} className="text-slate-400 group-hover:text-emerald-500" />
                    {currency}
                </button>
                <div className="absolute top-full right-0 mt-2 w-40 bg-white/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-xl shadow-indigo-500/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] p-1.5 transform group-hover:translate-y-0 translate-y-2">
                    {currencies.map((c) => (
                        <button
                            key={c.value}
                            onClick={() => setCurrency(c.value)}
                            className={cn(
                                "w-full text-left px-3 py-2 text-xs rounded-lg transition-colors font-medium",
                                currency === c.value ? "text-indigo-600 bg-indigo-50" : "text-slate-600 hover:bg-slate-50 hover:text-indigo-500"
                            )}
                        >
                            {c.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
