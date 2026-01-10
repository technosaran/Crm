"use client";

import { useMemo } from 'react';
import { useOpportunities } from './useOpportunities';
import { useLeads } from './useLeads';
import { useCases } from './useCases';
import { useTasks } from './useTasks';

export function useAnalytics() {
    const { opportunities, loading: oppsLoading } = useOpportunities();
    const { leads, loading: leadsLoading } = useLeads();
    const { cases, loading: casesLoading } = useCases();
    const { tasks, loading: tasksLoading } = useTasks();

    const loading = oppsLoading || leadsLoading || casesLoading || tasksLoading;

    const stats = useMemo(() => {
        if (loading) return null;

        // Opportunity Stats
        const wonOpps = opportunities.filter(o => o.stage === 'CLOSED_WON');
        const lostOpps = opportunities.filter(o => o.stage === 'CLOSED_LOST');
        const openOpps = opportunities.filter(o => !['CLOSED_WON', 'CLOSED_LOST'].includes(o.stage));

        const pipelineValue = openOpps.reduce((sum, o) => sum + (o.amount || 0), 0);
        const totalWon = wonOpps.reduce((sum, o) => sum + (o.amount || 0), 0);

        const winRate = opportunities.length > 0
            ? (wonOpps.length / (wonOpps.length + lostOpps.length || 1)) * 100
            : 0;

        // Sales Cycle calculation (average days from creation to close)
        const closedOpps = [...wonOpps, ...lostOpps];
        const avgSalesCycle = closedOpps.length > 0
            ? closedOpps.reduce((sum, o) => {
                const created = new Date(o.created_at);
                const closed = o.closed_at ? new Date(o.closed_at) : new Date();
                return sum + (closed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
            }, 0) / closedOpps.length
            : 0;

        // Lead Stats
        const qualifiedLeads = leads.filter(l => l.status === 'Qualified');
        const conversionRate = leads.length > 0
            ? (qualifiedLeads.length / leads.length) * 100
            : 0;

        // Case Stats
        const resolvedCases = cases.filter(c => ['CLOSED', 'RESOLVED'].includes(c.status));
        const resolutionRate = cases.length > 0
            ? (resolvedCases.length / cases.length) * 100
            : 0;

        // Task Stats
        const completedTasks = tasks.filter(t => t.status === 'COMPLETED');
        const taskEfficiency = tasks.length > 0
            ? (completedTasks.length / tasks.length) * 100
            : 0;

        // Pipeline Stages
        const stageDistribution = opportunities.reduce((acc, opp) => {
            acc[opp.stage] = (acc[opp.stage] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        // Stalling deals (Open for > 15 days without update)
        const stallingDeals = openOpps.filter(o => {
            const lastUpdate = new Date(o.updated_at || o.created_at);
            const daysSinceUpdate = (new Date().getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
            return daysSinceUpdate > 15;
        }).length;

        return {
            pipelineValue,
            totalWon,
            winRate,
            avgSalesCycle,
            conversionRate,
            resolutionRate,
            taskEfficiency,
            stageDistribution,
            stallingDeals,
            dataCounts: {
                opportunities: opportunities.length,
                leads: leads.length,
                cases: cases.length,
                tasks: tasks.length
            }
        };
    }, [opportunities, leads, cases, tasks, loading]);

    return { stats, loading };
}
