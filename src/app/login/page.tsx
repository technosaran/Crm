"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Shield, Zap, Globe, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createClient } from '@/lib/supabase';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const supabase = createClient();

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                toast.error(error.message);
                return;
            }

            toast.success("Welcome back to Zenith CRM!");
            router.push('/');
        } catch (err) {
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[1000] bg-slate-50/50 flex items-center justify-center p-4 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex w-full max-w-[1100px] h-[650px] bg-white rounded-3xl shadow-2xl shadow-indigo-500/10 overflow-hidden border border-white/60 ring-1 ring-slate-100"
            >
                {/* Left Side: Branding */}
                <div className="hidden lg:flex flex-col flex-1 bg-slate-900 p-16 text-white justify-between relative overflow-hidden group">
                    {/* Dynamic Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-900 opacity-90 transition-all duration-1000" />
                    <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-400 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-400 rounded-full blur-[100px] opacity-60" />
                    </div>

                    {/* Glass Pattern */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                    <div className="relative z-10">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-3 mb-12"
                        >
                            <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white h-12 w-12 rounded-xl flex items-center justify-center font-bold text-2xl shadow-xl">
                                Z
                            </div>
                            <span className="text-2xl font-bold tracking-tight font-outfit">Zenith CRM</span>
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h1 className="text-5xl font-bold leading-tight mb-8 font-outfit tracking-tight">
                                Intelligence <br />
                                meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white">Intuition.</span>
                            </h1>
                            <p className="text-indigo-100/80 text-lg max-w-md font-medium leading-relaxed">
                                Experience the next evolution of customer relationship management. Predictive insights, seamless automation.
                            </p>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative z-10 grid grid-cols-2 gap-8"
                    >
                        <div className="flex items-center gap-3 group/item">
                            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm group-hover/item:bg-white/20 transition-colors">
                                <Shield size={20} className="text-indigo-200" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Enterprise Security</h4>
                                <p className="text-indigo-200/60 text-xs">SOC2 Type II Compliant</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 group/item">
                            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm group-hover/item:bg-white/20 transition-colors">
                                <Zap size={20} className="text-indigo-200" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Real-time Sync</h4>
                                <p className="text-indigo-200/60 text-xs">Global Edge Network</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full lg:w-[480px] p-12 lg:p-16 flex flex-col justify-center bg-white relative">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-slate-900 font-outfit mb-2">Welcome Back</h2>
                        <p className="text-slate-500 font-medium">Please enter your credentials to access the workspace.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Workspace Connection</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Globe size={16} className="text-indigo-500" />
                                </div>
                                <input
                                    defaultValue="zenith_global_hq"
                                    disabled
                                    className="w-full bg-indigo-50/50 border border-indigo-100 rounded-xl h-12 pl-10 pr-4 text-sm font-medium text-indigo-700 cursor-not-allowed"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full bg-white border border-slate-200 rounded-xl h-12 px-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Password</label>
                                    <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline">Forgot password?</a>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white border border-slate-200 rounded-xl h-12 px-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium placeholder:text-slate-400"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 py-1">
                            <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" id="remember" />
                            <label htmlFor="remember" className="text-sm text-slate-600 cursor-pointer font-medium select-none">Keep me logged in for 30 days</label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white h-12 rounded-xl font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                            ) : (
                                <>
                                    Sign In to Workspace
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center border-t border-slate-100 pt-6">
                        <p className="text-sm text-slate-500 font-medium">
                            Don't have an account? <a href="#" className="text-indigo-600 font-bold hover:underline">Contact Sales</a>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
