import { Case } from '@/hooks/useCases';

export type CaseSortField = 'case_number' | 'subject' | 'priority' | 'status' | 'created_at';
export type CaseStatusFilter = 'all' | Case['status'];
export type CasePriorityFilter = 'all' | Case['priority'];

const PRIORITY_ORDER: Record<Case['priority'], number> = {
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

const STATUS_ORDER: Record<Case['status'], number> = {
  NEW: 1,
  OPEN: 2,
  IN_PROGRESS: 3,
  ESCALATED: 4,
  ON_HOLD: 5,
  RESOLVED: 6,
  CLOSED: 7,
};

/**
 * Sort cases by the specified field and direction.
 */
export function sortCases(
  cases: Case[],
  field: CaseSortField,
  direction: 'asc' | 'desc'
): Case[] {
  const sorted = [...cases].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case 'case_number': {
        comparison = a.case_number.localeCompare(b.case_number);
        break;
      }
      case 'subject': {
        comparison = a.subject.localeCompare(b.subject);
        break;
      }
      case 'priority': {
        comparison = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        break;
      }
      case 'status': {
        comparison = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
        break;
      }
      case 'created_at': {
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
      }
    }

    return direction === 'asc' ? comparison : -comparison;
  });

  return sorted;
}

/**
 * Filter cases by status and priority.
 */
export function filterCases(
  cases: Case[],
  statusFilter: CaseStatusFilter,
  priorityFilter: CasePriorityFilter
): Case[] {
  return cases.filter(caseItem => {
    const statusMatch = statusFilter === 'all' || caseItem.status === statusFilter;
    const priorityMatch = priorityFilter === 'all' || caseItem.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });
}

/**
 * Validate that resolution is provided when closing a case.
 * Returns true if valid, false if resolution is required but missing.
 */
export function validateResolution(
  status: Case['status'],
  resolution: string | null | undefined
): boolean {
  const closingStatuses: Case['status'][] = ['CLOSED', 'RESOLVED'];
  
  if (closingStatuses.includes(status)) {
    return resolution !== null && resolution !== undefined && resolution.trim().length > 0;
  }
  
  return true;
}

/**
 * Check if a case is in a closed state.
 */
export function isCaseClosed(status: Case['status']): boolean {
  return status === 'CLOSED' || status === 'RESOLVED';
}

/**
 * Check if a case is escalated.
 */
export function isCaseEscalated(status: Case['status']): boolean {
  return status === 'ESCALATED';
}
