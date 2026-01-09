"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Shield, Zap, Globe } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Welcome back to Zenith CRM!");
        router.push('/');
    };

    return (
        <div className="fixed inset-0 z-[1000] bg-sf-gray flex items-center justify-center p-4">
            <div className="flex w-full max-w-5xl h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-sf-border">
                {/* Left Side: Branding */}
                <div className="hidden md:flex flex-col flex-1 bg-gradient-to-br from-[#001639] via-[#003B8D] to-[#0176D3] p-12 text-white justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
                        <div className="absolute bottom-12 left-12 w-64 h-64 border border-white/20 rounded-full" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-12">
                            <div className="bg-white text-sf-blue h-10 w-10 rounded-lg flex items-center justify-center font-bold text-2xl shadow-xl">Z</div>
                            <span className="text-2xl font-bold tracking-tight">Zenith CRM</span>
                        </div>
                        <h1 className="text-4xl font-bold leading-tight mb-6">
                            The World's Most <br />
                            <span className="text-sf-blue shadow-white drop-shadow-sm">Recognizable</span> CRM <br />
                            Experience.
                        </h1>
                        <p className="text-blue-100 text-lg max-w-sm">
                            Enterprise-grade relationships at startup velocity. Scale your revenue nodes globally with Zenith.
                        </p>
                    </div>

                    <div className="relative z-10 grid grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                            <Shield size={20} className="text-blue-300" />
                            <span className="text-sm font-semibold">Bank-Level Security</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Globe size={20} className="text-blue-300" />
                            <span className="text-sm font-semibold">Multi-Regional Nodes</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Zap size={20} className="text-blue-300" />
                            <span className="text-sm font-semibold">Instant Data Sync</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Target size={20} className="text-blue-300" />
                            <span className="text-sm font-semibold">AI Lead Scoring</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full md:w-[450px] p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
                        <p className="text-slate-500 text-sm mt-1">Please enter your enterprise credentials.</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleLogin}>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Workspace ID</label>
                            <input
                                defaultValue="zenith_global_hq"
                                disabled
                                className="w-full bg-sf-gray border border-sf-border rounded h-11 px-4 text-sm font-mono text-slate-500 cursor-not-allowed"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                            <input
                                type="email"
                                placeholder="alex@zenith.ai"
                                className="w-full bg-white border border-sf-border rounded h-11 px-4 text-sm outline-none focus:border-sf-blue focus:ring-4 focus:ring-sf-blue/5 transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Password</label>
                                <a href="#" className="text-[11px] font-bold text-sf-blue hover:underline">Forgot?</a>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white border border-sf-border rounded h-11 px-4 text-sm outline-none focus:border-sf-blue focus:ring-4 focus:ring-sf-blue/5 transition-all"
                                required
                            />
                        </div>
                        <div className="flex items-center gap-2 py-2">
                            <input type="checkbox" className="rounded" id="remember" />
                            <label htmlFor="remember" className="text-xs text-slate-600 cursor-pointer">Remember my workstation for 30 days</label>
                        </div>
                        <button type="submit" className="w-full bg-sf-blue text-white h-11 rounded font-bold shadow-lg shadow-sf-blue/20 hover:bg-blue-700 transition-all active:scale-[0.98]">
                            Sign In to Zenith
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-[12px] text-slate-500">
                            New to Zenith? <a href="#" className="text-sf-blue font-bold hover:underline">Request an Invite</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
