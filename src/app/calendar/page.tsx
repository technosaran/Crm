"use client";

import React, { useState } from 'react';
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Plus,
    Clock,
    Video,
    MapPin,
    MoreVertical,
    Filter,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const hours = ['8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'];

const initialEvents = [
    { id: 1, title: 'Discovery: Stark Industries', time: '9:00 AM', duration: '60 min', type: 'Video', participants: 3, day: 'Tue' },
    { id: 2, title: 'Contract Review', time: '11:30 AM', duration: '45 min', type: 'Internal', participants: 2, day: 'Tue' },
    { id: 3, title: 'Pied Piper Pitch', time: '2:00 PM', duration: '90 min', type: 'On-site', participants: 5, day: 'Tue' },
    { id: 4, title: 'Sync w/ Engineering', time: '10:00 AM', duration: '30 min', type: 'Video', participants: 4, day: 'Wed' },
];

export default function CalendarPage() {
    const [activeView, setActiveView] = useState('Week');

    return (
        <div className="space-y-6 pb-12">
            {/* Salesforce Calendar Header */}
            <div className="bg-white border border-sf-border rounded-[4px] p-4 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#4BC076] h-10 w-10 shadow-lg rounded-full flex items-center justify-center text-white">
                                <CalendarIcon size={20} />
                            </div>
                            <h2 className="text-[20px] font-bold text-slate-900 leading-tight">My Calendar</h2>
                        </div>

                        <div className="flex items-center gap-1 bg-sf-gray p-1 rounded-md border border-sf-border">
                            {['Day', 'Week', 'Month'].map(v => (
                                <button
                                    key={v}
                                    onClick={() => setActiveView(v)}
                                    className={cn(
                                        "px-4 py-1.5 text-[12px] font-bold rounded transition-all",
                                        activeView === v ? "bg-white text-sf-blue shadow-sm" : "text-slate-500 hover:text-slate-700"
                                    )}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 ml-4">
                            <div className="flex items-center gap-2">
                                <button className="p-1.5 hover:bg-sf-gray rounded border border-sf-border transition-all"><ChevronLeft size={16} /></button>
                                <span className="text-[14px] font-bold text-slate-800">Jan 5 – 11, 2026</span>
                                <button className="p-1.5 hover:bg-sf-gray rounded border border-sf-border transition-all"><ChevronRight size={16} /></button>
                            </div>
                            <button className="text-[13px] font-bold text-sf-blue hover:underline">Today</button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="sf-btn-neutral flex items-center gap-2"><Filter size={14} /> My Events</button>
                        <button className="sf-btn-primary flex items-center gap-2">
                            <Plus size={14} /> New Event
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[75vh]">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="sf-card p-5">
                        <h3 className="text-[14px] font-bold text-slate-800 mb-4">January 2026</h3>
                        <div className="grid grid-cols-7 gap-y-2 text-center">
                            {daysOfWeek.map(d => <div key={d} className="text-[10px] font-bold text-slate-400 uppercase">{d[0]}</div>)}
                            {Array.from({ length: 31 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-8 flex items-center justify-center text-[12px] font-medium rounded-full cursor-pointer transition-all",
                                        i + 1 === 9 ? "bg-sf-blue text-white font-bold" : "hover:bg-sf-gray text-slate-600"
                                    )}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sf-card p-5">
                        <h3 className="text-[14px] font-bold text-slate-800 mb-4 flex items-center justify-between">
                            My Calendars
                            <Plus size={14} className="text-sf-blue cursor-pointer" />
                        </h3>
                        <div className="space-y-3">
                            {[
                                { label: 'My Events', checked: true, color: 'bg-[#4BC076]' },
                                { label: 'Resource: Large Meeting Room', checked: false, color: 'bg-sf-blue' },
                                { label: 'Holidays', checked: true, color: 'bg-red-400' },
                            ].map((cal, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" checked={cal.checked} className="rounded" onChange={() => { }} />
                                    <div className={cn("h-3 w-3 rounded-full", cal.color)} />
                                    <span className="text-[13px] text-slate-600 font-medium group-hover:text-sf-blue">{cal.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Weekly View Grid */}
                <div className="lg:col-span-9 bg-white border border-sf-border rounded-[4px] shadow-sm flex flex-col overflow-hidden">
                    <div className="grid grid-cols-8 border-b border-sf-border bg-sf-gray/20">
                        <div className="p-3 border-r border-sf-border" />
                        {daysOfWeek.map((day, i) => (
                            <div key={i} className={cn(
                                "p-3 text-center border-r border-sf-border font-bold",
                                day === 'Tue' && "bg-sf-blue/5 text-sf-blue"
                            )}>
                                <div className="text-[10px] uppercase text-slate-400">{day}</div>
                                <div className="text-[16px]">{i + 5}</div>
                            </div>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto scrollbar-hide relative bg-[linear-gradient(to_bottom,#DDDBDA_1px,transparent_1px)] bg-[size:100%_64px]">
                        <div className="grid grid-cols-8 h-full min-h-[700px]">
                            {/* Time slots column */}
                            <div className="flex flex-col border-r border-sf-border">
                                {hours.map(h => (
                                    <div key={h} className="h-16 flex items-start justify-center pt-2 text-[10px] font-bold text-slate-400 border-b border-transparent">
                                        {h}
                                    </div>
                                ))}
                            </div>

                            {/* Day columns */}
                            {daysOfWeek.map((day, dIdx) => (
                                <div key={dIdx} className={cn(
                                    "flex flex-col border-r border-sf-border last:border-r-0 relative",
                                    day === 'Tue' && "bg-sf-blue/[0.02]"
                                )}>
                                    {day === 'Tue' && initialEvents.filter(e => e.day === 'Tue').map((event, eIdx) => (
                                        <motion.div
                                            key={event.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={cn(
                                                "absolute left-1 right-1 bg-white border-l-4 border-l-[#4BC076] border border-sf-border rounded-md p-2 shadow-sm z-10 cursor-pointer hover:shadow-md transition-all group",
                                                event.id === 1 ? "top-16 h-16" : event.id === 2 ? "top-56 h-12" : "top-96 h-24"
                                            )}
                                        >
                                            <div className="flex items-start justify-between">
                                                <h4 className="text-[11px] font-bold text-slate-800 leading-tight group-hover:text-sf-blue truncate">{event.title}</h4>
                                                <Clock size={10} className="text-slate-300" />
                                            </div>
                                            <div className="text-[9px] text-slate-400 mt-1 flex items-center gap-1">
                                                <Video size={10} /> {event.time} • {event.duration}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
