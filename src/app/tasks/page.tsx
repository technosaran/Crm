"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CheckCircle2,
    Clock,
    AlertCircle,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Calendar,
    User,
    Flag
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const initialTasks = [
    { id: 1, title: 'Follow up on proposal V2', priority: 'High', due: 'Today', status: 'Pending', owner: 'Alex Rivera', entity: 'Stark Industries' },
    { id: 2, title: 'Schedule discovery call', priority: 'Medium', due: 'Tomorrow', status: 'Pending', owner: 'Alex Rivera', entity: 'Pied Piper' },
    { id: 3, title: 'Internal review of Q1 goals', priority: 'Low', due: 'Jan 15', status: 'Completed', owner: 'Michael Chen', entity: 'Internal' },
    { id: 4, title: 'Prepare security documents', priority: 'High', due: 'Jan 12', status: 'Pending', owner: 'Alex Rivera', entity: 'Cyberdyne' },
];

export default function TasksPage() {
    const [tasks, setTasks] = useState(initialTasks);

    const toggleStatus = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' } : t));
        const task = tasks.find(t => t.id === id);
        if (task?.status === 'Pending') toast.success("Task marked as completed!");
    };

    return (
        <div className="space-y-6 pb-12">
            <div className="bg-white border border-sf-border rounded-[4px] p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#4BC076] h-12 w-12 rounded flex items-center justify-center text-white shadow-md">
                            <CheckCircle2 size={28} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-1">Activities</p>
                            <h1 className="text-[24px] font-bold tracking-tight text-slate-900 leading-none">Task Management</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="sf-btn-neutral flex items-center gap-2">
                            <Calendar size={14} /> View Calendar
                        </button>
                        <button className="sf-btn-primary flex items-center gap-2">
                            <Plus size={14} /> New Task
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 bg-white border border-sf-border rounded-[4px] shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-sf-border flex items-center justify-between bg-sf-gray/20">
                        <div className="flex items-center gap-4">
                            <button className="text-[13px] font-bold text-sf-blue border-b-2 border-sf-blue pb-1">All Open</button>
                            <button className="text-[13px] font-medium text-slate-500 hover:text-sf-blue">Completed</button>
                            <button className="text-[13px] font-medium text-slate-500 hover:text-sf-blue">My Tasks</button>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                <input placeholder="Search tasks..." className="bg-white border border-sf-border rounded h-8 pl-8 pr-4 text-[12px] w-48 focus:border-sf-blue outline-none transition-all" />
                            </div>
                            <button className="p-1.5 border border-sf-border rounded hover:bg-sf-gray transition-all"><Filter size={14} /></button>
                        </div>
                    </div>

                    <div className="divide-y divide-sf-border">
                        {tasks.map((task) => (
                            <motion.div
                                key={task.id}
                                layout
                                className={cn(
                                    "p-4 flex items-center justify-between group transition-colors hover:bg-sf-gray/10",
                                    task.status === 'Completed' && "opacity-60 bg-sf-gray/5"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => toggleStatus(task.id)}
                                        className={cn(
                                            "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all",
                                            task.status === 'Completed' ? "bg-emerald-500 border-emerald-500 text-white" : "border-sf-border hover:border-sf-blue"
                                        )}
                                    >
                                        {task.status === 'Completed' && <CheckCircle2 size={12} />}
                                    </button>
                                    <div>
                                        <h4 className={cn("text-[14px] font-bold", task.status === 'Completed' ? "line-through text-slate-400" : "text-slate-800 hover:text-sf-blue cursor-pointer")}>
                                            {task.title}
                                        </h4>
                                        <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 font-medium">
                                            <span className="flex items-center gap-1 font-bold text-slate-500">
                                                <User size={10} /> {task.owner}
                                            </span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Clock size={10} /> Due: {task.due}
                                            </span>
                                            <span>•</span>
                                            <span className="bg-sf-gray px-1.5 py-0.5 rounded text-[10px] uppercase font-bold text-slate-500 tracking-tighter">
                                                {task.entity}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <div className={cn(
                                        "flex items-center gap-1.5 text-[11px] font-bold",
                                        task.priority === 'High' ? "text-red-500" : task.priority === 'Medium' ? "text-amber-500" : "text-blue-500"
                                    )}>
                                        <Flag size={12} />
                                        {task.priority}
                                    </div>
                                    <button className="p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-slate-600">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <button className="w-full py-4 text-[12px] font-bold text-slate-400 hover:bg-sf-gray/20 border-t border-sf-border transition-all">
                        View All Task History
                    </button>
                </div>

                <div className="w-full lg:w-80 shrink-0 space-y-6">
                    <div className="bg-white border border-sf-border rounded-[4px] p-5 shadow-sm">
                        <h3 className="text-[14px] font-bold text-slate-800 mb-4 pb-2 border-b border-sf-border">Productivity Insights</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-[13px]">
                                <span className="text-slate-500 font-medium">Weekly Completion</span>
                                <span className="font-bold text-emerald-600">84%</span>
                            </div>
                            <div className="w-full h-1.5 bg-sf-gray rounded-full overflow-hidden">
                                <div className="h-full w-[84%] bg-emerald-500 rounded-full" />
                            </div>
                            <div className="p-3 bg-amber-50 border border-amber-100 rounded-md mt-4">
                                <div className="flex items-start gap-2 text-amber-700">
                                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-[12px] font-bold">2 High Priority tasks overdue</p>
                                        <p className="text-[11px] mt-0.5">Prioritize 'Stark Industries' follow-up to maintain deal velocity.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
