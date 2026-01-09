"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    Target,
    Briefcase,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: Users, label: 'Leads', href: '/leads' },
    { icon: Target, label: 'Opportunities', href: '/opportunities' },
    { icon: Briefcase, label: 'Accounts', href: '/accounts' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "relative h-screen border-r border-border bg-card transition-all duration-300 ease-in-out z-20",
                collapsed ? "w-20" : "w-64"
            )}
        >
            <div className="flex h-16 items-center px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <ShieldCheck className="h-8 w-8" />
                    {!collapsed && <span className="tracking-tight">Zenith CRM</span>}
                </Link>
            </div>

            <nav className="space-y-1 px-3 py-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
                                isActive ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground",
                                collapsed && "justify-center px-0"
                            )}
                        >
                            <item.icon className="h-5 w-5 shrink-0" />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:text-foreground"
            >
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            <div className="absolute bottom-4 left-0 w-full px-4">
                {!collapsed && (
                    <div className="rounded-xl bg-gradient-to-br from-primary/10 to-transparent p-4 border border-primary/10">
                        <p className="text-xs font-semibold text-primary uppercase mb-1">Trial Version</p>
                        <p className="text-xs text-muted-foreground mb-3">Upgrade for unlimited leads.</p>
                        <button className="w-full rounded-md bg-primary py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                            Go Pro
                        </button>
                    </div>
                )}
            </div>
        </aside>
    );
}
