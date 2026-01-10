"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, Plus, Clock, GripVertical } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { Opportunity, OpportunityStage } from '@/hooks/useOpportunities';
import { useGlobalStore } from '@/store/useGlobalStore';
import Link from 'next/link';

const STAGES: { id: OpportunityStage; label: string; color: string }[] = [
    { id: 'NEW', label: 'Discovery', color: 'bg-indigo-500' },
    { id: 'QUALIFICATION', label: 'Qualification', color: 'bg-violet-500' },
    { id: 'NEEDS_ANALYSIS', label: 'Needs Analysis', color: 'bg-blue-500' },
    { id: 'VALUE_PROPOSITION', label: 'Value Proposition', color: 'bg-cyan-500' },
    { id: 'PROPOSAL', label: 'Proposal', color: 'bg-amber-500' },
    { id: 'NEGOTIATION', label: 'Negotiation', color: 'bg-fuchsia-500' },
    { id: 'CLOSED_WON', label: 'Won', color: 'bg-emerald-500' },
];

interface KanbanViewProps {
    opportunities: Opportunity[];
    loading: boolean;
    onStageChange: (id: string, stage: OpportunityStage) => void;
    onOpportunityClick: (opportunity: Opportunity) => void;
    onAddClick: (stage: OpportunityStage) => void;
}

export function KanbanView({ 
    opportunities, 
    loading, 
    onStageChange, 
    onOpportunityClick,
    onAddClick 
}: KanbanViewProps) {
    const { currency, locale } = useGlobalStore();

    const handleDragStart = (e: React.DragEvent, oppId: string) => {
        e.dataTransfer.setData('oppId', oppId);
    };

    const onDrop = (e: React.DragEvent, targetStage: OpportunityStage) => {
        const oppId = e.dataTransfer.getData('oppId');
        if (oppId) {
            onStageChange(oppId, targetStage);
        }
    };

    const allowDrop = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const getDaysInStage = (createdAt: string) => {
        const created = new Date(createdAt);
        const now = new Date();
        return Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
    };

    if (loading) {
        return (
            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 -mx-4 px-4">
                {STAGES.map((stage) => (
                    <div key={stage.id} className="min-w-[280px] w-[280px] sm:min-w-[300px] sm:w-[300px]">
                        <div className="h-8 bg-sf-gray/50 rounded mb-4 animate-pulse" />
                        <div className="space-y-3 min-h-[500px] bg-slate-50/50 rounded-xl p-3">
                            {[...Array(2)].map((_, i) => (
                                <div key={i} className="h-32 bg-white rounded-lg animate-pulse" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
            {STAGES.map((stage) => {
                const stageOpps = opportunities.filter(o => o.stage === stage.id);
                const totalValue = stageOpps.reduce((sum, o) => sum + (o.amount || 0), 0);

                return (
                    <div
                        key={stage.id}
                        onDragOver={allowDrop}
                        onDrop={(e) => onDrop(e, stage.id)}
                        className="min-w-[280px] w-[280px] sm:min-w-[300px] sm:w-[300px] flex flex-col gap-4"
                    >
                        <div className="flex flex-col gap-1 px-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className={cn("h-2.5 w-2.5 rounded-full ring-2 ring-white shadow-sm", stage.color)} />
                                    <h3 className="text-sm font-bold text-slate-800 font-outfit">{stage.label}</h3>
                                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500">
                                        {stageOpps.length}
                                    </span>
                                </div>
                                <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>
                            <div className="text-xs font-bold text-slate-400 pl-4.5">
                                {formatCurrency(totalValue, currency, locale)}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 min-h-[500px] bg-slate-50/50 rounded-xl p-3 border border-dashed border-slate-200">
                            {stageOpps.map((opp) => (
                                <motion.div
                                    key={opp.id}
                                    layoutId={opp.id.toString()}
                                    draggable
                                    onDragStart={(e: any) => handleDragStart(e, opp.id)}
                                    onClick={() => onOpportunityClick(opp)}
                                    className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-indigo-300 cursor-grab active:cursor-grabbing group transition-all"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate max-w-[150px] bg-slate-50 px-1.5 py-0.5 rounded">
                                            {opp.account_name || 'No Account'}
                                        </span>
                                        <GripVertical size={14} className="text-slate-200 group-hover:text-indigo-300" />
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-800 leading-snug mb-3 hover:text-indigo-600 cursor-pointer transition-colors font-outfit">
                                        {opp.name}
                                    </h4>
                                    <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                                        <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                                            {formatCurrency(opp.amount || 0, currency, locale)}
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                                            <Clock size={12} />
                                            {getDaysInStage(opp.created_at)}d
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <button 
                                onClick={() => onAddClick(stage.id)}
                                className="flex items-center justify-center gap-2 py-3 text-xs font-bold text-slate-400 hover:text-indigo-600 hover:bg-white transition-all border border-dashed border-slate-200 hover:border-indigo-200 rounded-lg group"
                            >
                                <Plus size={14} className="group-hover:scale-110 transition-transform" /> Add Deal
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
