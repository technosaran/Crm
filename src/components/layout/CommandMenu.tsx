"use client";

import React, { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import {
    Search,
    User,
    Building2,
    Target,
    Settings,
    Plus,
    History,
    FileText,
    MessageSquare,
    LifeBuoy,
    Calendar,
    BarChart4
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export function CommandMenu() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // Toggle the menu when ⌘K is pressed
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Search"
            className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] bg-slate-900/60 backdrop-blur-sm"
        >
            <div className="w-full max-w-[640px] bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5">
                <div className="flex items-center border-b border-slate-100 px-6 h-14 bg-gradient-to-r from-indigo-50/50 to-transparent">
                    <Search className="mr-3 h-5 w-5 shrink-0 text-indigo-500" />
                    <Command.Input
                        placeholder="Search records, apps, or commands..."
                        className="flex-1 bg-transparent py-4 text-base outline-none placeholder:text-slate-400 text-slate-700 font-medium"
                    />
                    <kbd className="hidden sm:inline-flex h-6 select-none items-center gap-1 rounded-md border border-slate-200 bg-white px-2 font-mono text-[11px] font-bold text-slate-500 shadow-sm">
                        ESC
                    </kbd>
                </div>

                <Command.List className="max-h-[420px] overflow-y-auto p-3 scroll-smooth">
                    <Command.Empty className="py-8 text-center text-sm text-slate-500 font-medium">
                        No results found.
                    </Command.Empty>

                    <Command.Group heading="Recent Records" className="px-2 py-2 text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                        <CommandItem icon={User} onSelect={() => runCommand(() => router.push('/leads'))}>
                            John Peterson <span className="ml-2 font-normal text-slate-400">— Lead</span>
                        </CommandItem>
                        <CommandItem icon={Building2} onSelect={() => runCommand(() => router.push('/accounts'))}>
                            Stark Industries <span className="ml-2 font-normal text-slate-400">— Account</span>
                        </CommandItem>
                        <CommandItem icon={Target} onSelect={() => runCommand(() => router.push('/opportunities'))}>
                            Cloud Expansion Phase 2 <span className="ml-2 font-normal text-slate-400">— Opportunity</span>
                        </CommandItem>
                    </Command.Group>

                    <div className="h-px bg-slate-100 mx-2 my-2" />

                    <Command.Group heading="Navigation" className="px-2 py-2 text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                        <CommandItem icon={History} onSelect={() => runCommand(() => router.push('/'))}>
                            Go to Home Page
                        </CommandItem>
                        <CommandItem icon={User} onSelect={() => runCommand(() => router.push('/contacts'))}>
                            Manage Contacts
                        </CommandItem>
                        <CommandItem icon={LifeBuoy} onSelect={() => runCommand(() => router.push('/cases'))}>
                            Manage Cases
                        </CommandItem>
                        <CommandItem icon={Calendar} onSelect={() => runCommand(() => router.push('/calendar'))}>
                            View Calendar
                        </CommandItem>
                        <CommandItem icon={BarChart4} onSelect={() => runCommand(() => router.push('/reports'))}>
                            View Reports
                        </CommandItem>
                        <CommandItem icon={FileText} onSelect={() => runCommand(() => router.push('/tasks'))}>
                            View My Tasks
                        </CommandItem>
                        <CommandItem icon={Settings} onSelect={() => runCommand(() => router.push('/settings'))}>
                            Open Settings
                        </CommandItem>
                    </Command.Group>

                    <div className="h-px bg-slate-100 mx-2 my-2" />

                    <Command.Group heading="Quick Actions" className="px-2 py-2 text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                        <CommandItem icon={Plus} className="text-indigo-600 font-semibold bg-indigo-50/50">
                            Create New Lead...
                        </CommandItem>
                        <CommandItem icon={FileText}>
                            Generate Monthly Report...
                        </CommandItem>
                        <CommandItem icon={MessageSquare}>
                            Post to Chatter...
                        </CommandItem>
                    </Command.Group>
                </Command.List>

                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-[11px] text-slate-500 font-medium">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1"><kbd className="bg-white border border-slate-200 rounded px-1.5 shadow-sm">Enter</kbd> to select</span>
                        <span className="flex items-center gap-1"><kbd className="bg-white border border-slate-200 rounded px-1.5 shadow-sm">↑↓</kbd> to navigate</span>
                    </div>
                    <span className="font-bold text-indigo-500 font-outfit tracking-wide">Zenith Command v2.0</span>
                </div>
            </div>
        </Command.Dialog>
    );
}

function CommandItem({
    children,
    icon: Icon,
    onSelect,
    className
}: {
    children: React.ReactNode;
    icon: any;
    onSelect?: () => void;
    className?: string;
}) {
    return (
        <Command.Item
            onSelect={onSelect}
            className={cn(
                "flex cursor-default select-none items-center rounded-lg px-3 py-3 text-sm outline-none aria-selected:bg-gradient-to-r aria-selected:from-indigo-500 aria-selected:to-violet-500 aria-selected:text-white aria-selected:shadow-md transition-all gap-3 group mb-1",
                className
            )}
        >
            <Icon className="h-4 w-4 shrink-0 group-aria-selected:text-white text-slate-400 transition-colors" />
            {children}
        </Command.Item>
    );
}
