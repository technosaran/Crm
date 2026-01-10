import { Task } from '@/hooks/useTasks';

export type TaskSortField = 'due_date' | 'priority' | 'status' | 'created_at';
export type TaskFilter = 'all' | 'open' | 'completed';

const PRIORITY_ORDER: Record<Task['priority'], number> = {
  URGENT: 4,
  HIGH: 3,
  NORMAL: 2,
  LOW: 1,
};

const STATUS_ORDER: Record<Task['status'], number> = {
  NOT_STARTED: 1,
  IN_PROGRESS: 2,
  WAITING: 3,
  DEFERRED: 4,
  COMPLETED: 5,
};

/**
 * Calculate the number of days a task is overdue.
 * Returns null if the task has no due date, is completed, or is not overdue.
 * Returns a positive integer for overdue tasks.
 */
export function getDaysOverdue(dueDate: string | null, status: Task['status']): number | null {
  if (!dueDate || status === 'COMPLETED') {
    return null;
  }

  const due = new Date(dueDate);
  const today = new Date();
  
  // Reset time to start of day for accurate day comparison
  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - due.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : null;
}

/**
 * Sort tasks by the specified field and direction.
 */
export function sortTasks(
  tasks: Task[],
  field: TaskSortField,
  direction: 'asc' | 'desc'
): Task[] {
  const sorted = [...tasks].sort((a, b) => {
    let comparison = 0;

    switch (field) {
      case 'due_date': {
        // Null dates go to the end
        if (!a.due_date && !b.due_date) comparison = 0;
        else if (!a.due_date) comparison = 1;
        else if (!b.due_date) comparison = -1;
        else comparison = new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
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
 * Filter tasks by status.
 * 'all' returns all tasks.
 * 'open' returns tasks that are not completed.
 * 'completed' returns only completed tasks.
 */
export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  switch (filter) {
    case 'all':
      return tasks;
    case 'open':
      return tasks.filter(task => task.status !== 'COMPLETED');
    case 'completed':
      return tasks.filter(task => task.status === 'COMPLETED');
    default:
      return tasks;
  }
}
