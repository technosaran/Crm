"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export type Priority = 'LOW' | 'NORMAL' | 'MEDIUM' | 'HIGH' | 'URGENT' | 'CRITICAL';

interface PriorityBadgeProps {
  priority: Priority;
  size?: 'sm' | 'md';
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  LOW: {
    label: 'Low',
    className: 'bg-slate-100 text-slate-600 border-slate-200',
  },
  NORMAL: {
    label: 'Normal',
    className: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  MEDIUM: {
    label: 'Medium',
    className: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  HIGH: {
    label: 'High',
    className: 'bg-orange-50 text-orange-600 border-orange-200',
  },
  URGENT: {
    label: 'Urgent',
    className: 'bg-red-50 text-red-600 border-red-200',
  },
  CRITICAL: {
    label: 'Critical',
    className: 'bg-red-50 text-red-600 border-red-200',
  },
};

export function PriorityBadge({ priority, size = 'md' }: PriorityBadgeProps) {
  const config = priorityConfig[priority] || priorityConfig.NORMAL;

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
 * Get the CSS class for a priority level.
 * Used for property testing and external styling.
 */
export function getPriorityColor(priority: Priority): string {
  return priorityConfig[priority]?.className || priorityConfig.NORMAL.className;
}
