"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Grid,
    Search,
    Settings,
    Bell,
    HelpCircle,
    Plus,
    ChevronDown,
    Star,
    History
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { GlobalSwitcher } from './GlobalSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (pathname === '/login') return null;

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Leads', href: '/leads' },
        { label: 'Accounts', href: '/accounts' },
        { label: 'Contacts', href: '/contacts' },
        { label: 'Opportunities', href: '/opportunities' },
        { label: 'Tasks', href: '/tasks' },
        { label: 'Files', href: '/files' },
        { label: 'Analytics', href: '/analytics' },
    ];

    return (
        <div className={cn(
            "fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300",
            scrolled ? "shadow-lg" : ""
        )}>
            {/* Salesforce Global Header */}
            <header className="h-[50px] bg-[#001639] border-b border-white/10 flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <button className="p-1 hover:bg-white/10 rounded transition-colors text-white/70">
                        <Grid size={20} />
                    </button>
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-gradient-to-br from-[#00A1E0] to-[#0176D3] h-8 w-8 rounded flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
                            <span className="font-bold text-lg leading-none">Z</span>
                        </div>
                        <span className="font-bold text-white text-[18px] tracking-tight hidden sm:inline">Zenith CRM</span>
                    </Link>

                    <div className="relative ml-8 hidden lg:block group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-sf-blue transition-colors" />
                        <input
                            type="text"
                            placeholder="Global Search records... (⌘K)"
                            className="w-[450px] bg-white/10 border border-white/5 focus:bg-white focus:text-slate-900 h-8 rounded-md pl-10 pr-4 text-[13px] transition-all outline-none text-white placeholder:text-slate-500"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                    <GlobalSwitcher />
                    <div className="flex items-center gap-0.5 border-l border-white/10 ml-2 pl-4">
                        {[Plus, History, Star, HelpCircle, Settings, Bell].map((Icon, i) => (
                            <button key={i} className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-md transition-all relative">
                                <Icon size={18} />
                                {i === 5 && <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full border-2 border-[#001639]" />}
                            </button>
                        ))}
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#54698d] to-[#2f3d53] flex items-center justify-center text-white text-xs font-bold border-2 border-white/20 ml-2 shadow-inner cursor-pointer hover:ring-2 hover:ring-sf-blue transition-all">
                        AR
                    </div>
                </div>
            </header>

            {/* Salesforce Navigation Bar (Tabs) */}
            <nav className="h-[40px] bg-white border-b border-sf-border flex items-center px-4 overflow-x-auto gap-1 shadow-sm">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "relative h-full flex items-center px-4 text-[13px] font-bold transition-all whitespace-nowrap group",
                                isActive ? "text-sf-blue bg-sf-blue/5" : "text-slate-600 hover:text-sf-blue hover:bg-slate-50"
                            )}
                        >
                            <span>{item.label}</span>
                            {item.label !== 'Home' && <ChevronDown size={12} className="ml-1 opacity-40 group-hover:opacity-100 transition-opacity" />}

                            {isActive && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-sf-blue"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
