"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Phone, 
    Mail, 
    Calendar, 
    CheckSquare, 
    FileText, 
    Plus,
    Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Activity, ActivityType, EntityType, useActivities } from '@/hooks/useActivities';
import { Modal } from './Modal';

interface ActivityTimelineProps {
    entityType: EntityType;
    entityId: string;
    compact?: boolean;
}

const activityIcons: Record<ActivityType, React.ReactNode> = {
    CALL: <Phone size={14} />,
    EMAIL: <Mail size={14} />,
    MEETING: <Calendar size={14} />,
    TASK: <CheckSquare size={14} />,
    NOTE: <FileText size={14} />,
};

const activityColors: Record<ActivityType, string> = {
    CALL: 'bg-emerald-100 text-emerald-600 border-emerald-200',
    EMAIL: 'bg-blue-100 text-blue-600 border-blue-200',
    MEETING: 'bg-purple-100 text-purple-600 border-purple-200',
    TASK: 'bg-amber-100 text-amber-600 border-amber-200',
    NOTE: 'bg-slate-100 text-slate-600 border-slate-200',
};

export function ActivityTimeline({ entityType, entityId, compact = false }: ActivityTimelineProps) {
    const { activities, loading, logActivity } = useActivities(entityType, entityId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newActivity, setNewActivity] = useState({
        type: 'NOTE' as ActivityType,
        subject: '',
        description: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newActivity.subject.trim()) return;

        const success = await logActivity({
            type: newActivity.type,
            subject: newActivity.subject,
            description: newActivity.description || null,
            entity_type: entityType,
            entity_id: entityId
        });

        if (success) {
            setNewActivity({ type: 'NOTE', subject: '', description: '' });
            setIsModalOpen(false);
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    if (loading) {
        return (
            <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-16 bg-sf-gray/50 rounded animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-[13px] font-bold text-slate-700">Activity Timeline</h4>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-[11px] font-bold text-sf-blue hover:underline flex items-center gap-1"
                >
                    <Plus size={12} /> Log Activity
                </button>
            </div>

            {activities.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                    <Clock size={24} className="mx-auto mb-2 opacity-50" />
                    <p className="text-[12px]">No activities logged yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {activities.slice(0, compact ? 5 : 20).map((activity, idx) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex gap-3 group"
                        >
                            <div className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center border shrink-0",
                                activityColors[activity.type]
                            )}>
                                {activityIcons[activity.type]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <p className="text-[13px] font-medium text-slate-700 truncate">
                                        {activity.subject}
                                    </p>
                                    <span className="text-[10px] text-slate-400 shrink-0">
                                        {formatDate(activity.occurred_at)}
                                    </span>
                                </div>
                                {activity.description && (
                                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                                        {activity.description}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Log Activity"
                size="sm"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                            Activity Type
                        </label>
                        <div className="flex gap-2 flex-wrap">
                            {(['CALL', 'EMAIL', 'MEETING', 'TASK', 'NOTE'] as ActivityType[]).map(type => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setNewActivity({ ...newActivity, type })}
                                    className={cn(
                                        "px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all flex items-center gap-1.5",
                                        newActivity.type === type
                                            ? activityColors[type]
                                            : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                                    )}
                                >
                                    {activityIcons[type]} {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                            Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={newActivity.subject}
                            onChange={(e) => setNewActivity({ ...newActivity, subject: e.target.value })}
                            className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue"
                            placeholder="Brief description of the activity"
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                            Notes
                        </label>
                        <textarea
                            value={newActivity.description}
                            onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                            className="w-full bg-white border border-sf-border rounded px-3 py-2 text-[13px] outline-none focus:border-sf-blue resize-none"
                            rows={3}
                            placeholder="Additional details..."
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="sf-btn-neutral">
                            Cancel
                        </button>
                        <button type="submit" className="sf-btn-primary">
                            Log Activity
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
