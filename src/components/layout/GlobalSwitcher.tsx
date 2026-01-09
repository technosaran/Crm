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
        <div className="flex items-center gap-3 border-r border-sf-border pr-4 mr-2">
            <div className="relative group">
                <button className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600 hover:text-sf-blue py-1 px-2 rounded hover:bg-sf-gray transition-all">
                    <Globe size={14} className="text-slate-400" />
                    {locales.find(l => l.value === locale)?.label}
                </button>
                <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-sf-border rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] p-1">
                    {locales.map((l) => (
                        <button
                            key={l.value}
                            onClick={() => setLocale(l.value)}
                            className={cn(
                                "w-full text-left px-3 py-2 text-[12px] rounded hover:bg-sf-gray transition-colors",
                                locale === l.value ? "text-sf-blue font-bold bg-sf-blue/5" : "text-slate-700"
                            )}
                        >
                            {l.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative group">
                <button className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600 hover:text-sf-blue py-1 px-2 rounded hover:bg-sf-gray transition-all">
                    <DollarSign size={14} className="text-slate-400" />
                    {currency}
                </button>
                <div className="absolute top-full right-0 mt-1 w-40 bg-white border border-sf-border rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] p-1">
                    {currencies.map((c) => (
                        <button
                            key={c.value}
                            onClick={() => setCurrency(c.value)}
                            className={cn(
                                "w-full text-left px-3 py-2 text-[12px] rounded hover:bg-sf-gray transition-colors",
                                currency === c.value ? "text-sf-blue font-bold bg-sf-blue/5" : "text-slate-700"
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
