"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export type TaskStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'WAITING' | 'DEFERRED';
export type CaseStatus = 'NEW' | 'OPEN' | 'IN_PROGRESS' | 'ESCALATED' | 'ON_HOLD' | 'CLOSED' | 'RESOLVED';

interface StatusBadgeProps {
  status: TaskStatus | CaseStatus;
  type: 'task' | 'case';
  size?: 'sm' | 'md';
}

const taskStatusConfig: Record<TaskStatus, { label: string; className: string }> = {
  NOT_STARTED: {
    label: 'Not Started',
    className: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    className: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  WAITING: {
    label: 'Waiting',
    className: 'bg-slate-100 text-slate-600 border-slate-200',
  },
  DEFERRED: {
    label: 'Deferred',
    className: 'bg-slate-100 text-slate-600 border-slate-200',
  },
};

const caseStatusConfig: Record<CaseStatus, { label: string; className: string }> = {
  NEW: {
    label: 'New',
    className: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  OPEN: {
    label: 'Open',
    className: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    className: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  },
  ESCALATED: {
    label: 'Escalated',
    className: 'bg-red-50 text-red-600 border-red-200',
  },
  ON_HOLD: {
    label: 'On Hold',
    className: 'bg-slate-100 text-slate-600 border-slate-200',
  },
  CLOSED: {
    label: 'Closed',
    className: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  RESOLVED: {
    label: 'Resolved',
    className: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
};

export function StatusBadge({ status, type, size = 'md' }: StatusBadgeProps) {
  const config = type === 'task'
    ? taskStatusConfig[status as TaskStatus] || taskStatusConfig.NOT_STARTED
    : caseStatusConfig[status as CaseStatus] || caseStatusConfig.NEW;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-bold',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-[9px]' : 'px-2.5 py-0.5 text-[10px]'
      )}
    >
      {config.label}
    </span>
  );
}

/**
 * Get the CSS class for a status.
 * Used for property testing and external styling.
 */
export function getStatusColor(status: string, type: 'task' | 'case'): string {
  if (type === 'task') {
    return taskStatusConfig[status as TaskStatus]?.className || taskStatusConfig.NOT_STARTED.className;
  }
  return caseStatusConfig[status as CaseStatus]?.className || caseStatusConfig.NEW.className;
}
