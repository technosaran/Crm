"use client";

import React from 'react';
import { History, User, Clock, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { useAuditLogs } from '@/hooks/useAuditLogs';

export function AuditTrail() {
    const { logs, loading, refresh } = useAuditLogs();

    if (loading && logs.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <RefreshCw size={24} className="mb-2 animate-spin opacity-20" />
                <p className="text-xs font-medium">Loading activity...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="divide-y divide-slate-100">
                {logs.length > 0 ? (
                    logs.map((log) => (
                        <div key={log.id} className="p-3 hover:bg-slate-50 transition-colors rounded-lg group">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 border border-indigo-100">
                                        <User size={12} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-800">
                                        {log.user_profiles?.full_name || 'System User'}
                                    </span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium font-mono">
                                    {format(new Date(log.created_at), 'HH:mm:ss')}
                                </span>
                            </div>
                            <div className="pl-8">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                                        {log.action}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                                        {log.entity_type}
                                    </span>
                                    <p className="text-[11px] text-slate-600 line-clamp-1">{log.details}</p>
                                </div>
                                <div className="flex items-center gap-1 mt-2 text-[10px] text-slate-400">
                                    <Clock size={10} />
                                    {format(new Date(log.created_at), 'MMM dd, yyyy')}
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
            {logs.length > 5 && (
                <button
                    onClick={refresh}
                    className="w-full mt-4 py-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 transition-all rounded-lg border border-indigo-100"
                >
                    Refresh Activity Feed
                </button>
            )}
        </div>
    );
}
