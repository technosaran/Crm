"use client";

import React from 'react';
import { History, User, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface AuditLogEntry {
    id: string;
    user: string;
    action: string;
    details: string;
    timestamp: Date;
}

const mockLogs: AuditLogEntry[] = [];

export function AuditTrail() {
    return (
        <div className="flex flex-col h-full">
            <div className="divide-y divide-slate-100 min-h-[150px] flex flex-col justify-center">
                {mockLogs.length > 0 ? (
                    mockLogs.map((log) => (
                        <div key={log.id} className="p-3 hover:bg-slate-50 transition-colors rounded-lg">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                        <User size={12} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800">{log.user}</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium font-mono">
                                    {format(log.timestamp, 'HH:mm:ss')}
                                </span>
                            </div>
                            <div className="pl-8">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-1.5 py-0.5 rounded">
                                        {log.action}
                                    </span>
                                    <p className="text-[11px] text-slate-600 line-clamp-1">{log.details}</p>
                                </div>
                                <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-400">
                                    <Clock size={10} />
                                    {format(log.timestamp, 'MMM dd, yyyy')}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center text-center p-8 text-slate-400">
                        <History size={24} className="mb-2 opacity-20" />
                        <p className="text-xs font-medium">No recent system activity</p>
                    </div>
                )}
            </div>
            {mockLogs.length > 0 && (
                <button className="w-full mt-4 py-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-all rounded-lg">
                    Export Audit Logs (CSV)
                </button>
            )}
        </div>
    );
}
