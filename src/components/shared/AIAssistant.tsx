"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    X,
    Zap,
    Search,
    Send,
    Bot,
    MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'chat' | 'insights'>('insights');

    return (
        <>
            {/* Floating Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-[100] h-16 w-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl shadow-2xl shadow-indigo-500/30 flex items-center justify-center text-white border border-white/20 hover:shadow-indigo-500/50 transition-all group"
            >
                <div className="absolute inset-0 bg-white/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <Sparkles size={28} className="relative z-10" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
            </motion.button>

            {/* AI Sidebar Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[105]"
                        />

                        <motion.div
                            initial={{ x: 400, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 400, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-4 right-4 bottom-4 w-[400px] bg-white/90 backdrop-blur-2xl z-[110] shadow-2xl rounded-3xl border border-white/40 flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-white flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
                                        <Bot size={22} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base text-slate-800 leading-tight font-outfit">Zenith Intelligence</h3>
                                        <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">Online • ZI-1 Model</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-indigo-600">
                                        <MoreHorizontal size={20} />
                                    </button>
                                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white rounded-xl transition-colors text-slate-400 hover:text-red-500">
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="flex p-2 gap-2 bg-slate-50/50">
                                <button
                                    onClick={() => setActiveTab('insights')}
                                    className={cn(
                                        "flex-1 py-2.5 text-xs font-bold transition-all rounded-lg",
                                        activeTab === 'insights' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:bg-white/50"
                                    )}
                                >
                                    Smarter Insights
                                </button>
                                <button
                                    onClick={() => setActiveTab('chat')}
                                    className={cn(
                                        "flex-1 py-2.5 text-xs font-bold transition-all rounded-lg",
                                        activeTab === 'chat' ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:bg-white/50"
                                    )}
                                >
                                    Ask ZI
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
                                {activeTab === 'insights' ? (
                                    <>
                                        <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-10 rounded-full" />
                                                <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center text-indigo-500 shadow-xl border border-white/50 relative z-10">
                                                    <Zap size={32} />
                                                </div>
                                            </div>
                                            <div className="max-w-[240px]">
                                                <h4 className="text-sm font-bold text-slate-800 font-outfit">Analyzing Patterns</h4>
                                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                                    ZI is currently processing your data stream. Real-time predictive insights will appear here shortly.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-6 border-t border-indigo-50">
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Suggested Actions</h4>
                                            <div className="space-y-2">
                                                {['Review Q3 Pipeline Anomalies', 'Optimize Lead Scoring Model', 'Generate Sales Forecast'].map((action, i) => (
                                                    <button key={i} className="w-full text-left p-3 bg-white border border-slate-100 rounded-xl text-xs font-medium text-slate-600 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md transition-all flex items-center justify-between group">
                                                        {action}
                                                        <Sparkles size={12} className="opacity-0 group-hover:opacity-100 text-indigo-500 transition-opacity" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="h-full flex flex-col justify-end gap-6">
                                        <div className="space-y-6 overflow-y-auto pr-1">
                                            <div className="flex gap-4">
                                                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 mt-1">
                                                    <Bot size={16} />
                                                </div>
                                                <div className="bg-white p-4 rounded-2xl rounded-tl-sm text-sm text-slate-700 shadow-sm border border-slate-100 leading-relaxed">
                                                    <p>Hello Alex! I'm ZI, your intelligent CRM assistant.</p>
                                                    <p className="mt-2 text-slate-500 text-xs">I can help you create records, analyze trends, or draft emails. Try asking me to "Show high-value leads".</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <input
                                                placeholder="Ask ZI anything..."
                                                className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 pr-14 text-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all shadow-sm placeholder:text-slate-400"
                                            />
                                            <button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 hover:scale-105 transition-all">
                                                <Send size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

