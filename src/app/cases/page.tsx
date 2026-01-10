"use client";

import React, { useState, useMemo } from 'react';
import {
    LifeBuoy,
    Search,
    Plus,
    ChevronDown,
    MessageSquare,
    Clock,
    CheckCircle2,
    RefreshCw,
    AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCases } from '@/hooks/useCases';
import { CaseTable } from '@/components/cases/CaseTable';
import { CaseModal } from '@/components/cases/CaseModal';
import { sortCases, filterCases, CaseSortField, CaseStatusFilter, CasePriorityFilter } from '@/lib/caseUtils';

export default function CasesPage() {
    const { cases, loading, createCase, updateCase, deleteCases, closeCase, refresh } = useCases();
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCase, setEditingCase] = useState<typeof cases[0] | null>(null);
    
    // Selection state
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    
    // Sort and filter state
    const [sortField, setSortField] = useState<CaseSortField>('created_at');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [statusFilter, setStatusFilter] = useState<CaseStatusFilter>('all');
    const [priorityFilter, setPriorityFilter] = useState<CasePriorityFilter>('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Process cases with filtering, searching, and sorting
    const processedCases = useMemo(() => {
        let result = filterCases(cases, statusFilter, priorityFilter);
        
        // Apply search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(c => 
                c.subject.toLowerCase().includes(query) ||
                c.case_number.toLowerCase().includes(query) ||
                (c.description?.toLowerCase().includes(query))
            );
        }
        
        // Apply sorting
        result = sortCases(result, sortField, sortDirection);
        
        return result;
    }, [cases, statusFilter, priorityFilter, searchQuery, sortField, sortDirection]);

    // Stats
    const stats = useMemo(() => {
        const open = cases.filter(c => !['CLOSED', 'RESOLVED'].includes(c.status)).length;
        const critical = cases.filter(c => c.priority === 'CRITICAL' && !['CLOSED', 'RESOLVED'].includes(c.status)).length;
        const escalated = cases.filter(c => c.status === 'ESCALATED').length;
        const resolved = cases.filter(c => ['CLOSED', 'RESOLVED'].includes(c.status)).length;
        return { open, critical, escalated, resolved, total: cases.length };
    }, [cases]);

    const handleSort = (field: CaseSortField) => {
        if (sortField === field) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleCaseClick = (caseItem: typeof cases[0]) => {
        setEditingCase(caseItem);
        setIsModalOpen(true);
    };

    const handleNewCase = () => {
        setEditingCase(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (data: Partial<typeof cases[0]>) => {
        if (editingCase) {
            return await updateCase(editingCase.id, data);
        } else {
            return await createCase(data);
        }
    };

    const handleDelete = async (ids: number[]) => {
        await deleteCases(ids);
        setSelectedIds([]);
    };

    return (
        <div className="space-y-6 pb-12">
            {/* Header */}
            <div className="bg-white border border-sf-border rounded-[4px] p-4 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#00a1e0] h-10 w-10 shadow-lg rounded-full flex items-center justify-center text-white">
                            <LifeBuoy size={20} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">
                                Service Cloud: Cases
                            </p>
                            <h2 className="text-[20px] font-bold text-slate-900 leading-tight flex items-center gap-2">
                                All Cases <ChevronDown size={14} className="text-slate-400" />
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={refresh}
                            className="sf-btn-neutral"
                            disabled={loading}
                        >
                            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                        </button>
                        <button className="sf-btn-neutral">
                            <MessageSquare size={14} className="mr-2" /> Chatter
                        </button>
                        <button 
                            onClick={handleNewCase}
                            className="sf-btn-primary"
                        >
                            <Plus size={14} className="mr-2" />
                            New Case
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Table */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white border border-sf-border rounded-[4px] shadow-sm overflow-hidden min-h-[400px] flex flex-col">
                        {/* Search Bar */}
                        <div className="p-3 border-b border-sf-border bg-white flex items-center justify-between">
                            <div className="text-[12px] text-slate-500 font-bold">
                                {processedCases.length} case{processedCases.length !== 1 ? 's' : ''} • Sync Status: Active
                            </div>
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                <input 
                                    placeholder="Search cases..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-white border border-sf-border rounded h-7 pl-9 pr-4 text-[12px] w-48 focus:border-sf-blue outline-none transition-all" 
                                />
                            </div>
                        </div>

                        {/* Case Table */}
                        <CaseTable
                            cases={processedCases}
                            loading={loading}
                            onCaseClick={handleCaseClick}
                            onDelete={handleDelete}
                            selectedIds={selectedIds}
                            onSelectionChange={setSelectedIds}
                            sortField={sortField}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                            statusFilter={statusFilter}
                            priorityFilter={priorityFilter}
                            onStatusFilterChange={setStatusFilter}
                            onPriorityFilterChange={setPriorityFilter}
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* SLA Metrics */}
                    <div className="sf-card p-5 border-t-4 border-t-[#00a1e0]">
                        <h3 className="text-[14px] font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Clock size={16} className="text-[#00a1e0]" /> Case Metrics
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-[13px] text-slate-600">Open Cases</span>
                                <span className="text-[16px] font-bold text-sf-blue">{stats.open}</span>
                            </div>
                            {stats.critical > 0 && (
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-slate-600 flex items-center gap-1">
                                        <AlertTriangle size={12} className="text-red-500" /> Critical
                                    </span>
                                    <span className="text-[16px] font-bold text-red-600">{stats.critical}</span>
                                </div>
                            )}
                            {stats.escalated > 0 && (
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] text-slate-600">Escalated</span>
                                    <span className="text-[16px] font-bold text-orange-600">{stats.escalated}</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between">
                                <span className="text-[13px] text-slate-600">Resolved</span>
                                <span className="text-[16px] font-bold text-emerald-600">{stats.resolved}</span>
                            </div>
                            <div className="pt-3 border-t border-sf-border flex items-center justify-between">
                                <span className="text-[13px] font-bold text-slate-800">Total Cases</span>
                                <span className="text-[16px] font-bold text-slate-800">{stats.total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Resolution Assistant */}
                    <div className="bg-[#001639] text-white p-5 rounded-[4px] shadow-lg">
                        <h3 className="text-[14px] font-bold mb-4 flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-emerald-400" /> Resolution Assistant
                        </h3>
                        <p className="text-[11px] text-white/60 mb-6 font-medium">
                            Connect customer data to enable AI-powered ticket resolution suggestions.
                        </p>
                        {stats.total > 0 && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-[12px]">
                                    <span className="text-white/70">Resolution Rate</span>
                                    <span className="font-bold text-emerald-400">
                                        {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                                    </span>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-2">
                                    <div 
                                        className="bg-emerald-400 h-2 rounded-full transition-all"
                                        style={{ width: `${stats.total > 0 ? (stats.resolved / stats.total) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Case Modal */}
            <CaseModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingCase(null);
                }}
                caseItem={editingCase}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
