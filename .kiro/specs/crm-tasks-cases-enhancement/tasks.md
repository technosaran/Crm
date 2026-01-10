# Implementation Plan: CRM Tasks & Cases Enhancement

## Overview

This implementation plan transforms the placeholder Tasks and Cases pages into fully functional management interfaces. The existing hooks provide CRUD operations; this plan focuses on building the UI components and utility functions.

## Tasks

- [x] 1. Create shared utility functions and badge components
  - [x] 1.1 Create task utility functions in `src/lib/taskUtils.ts`
    - Implement `getDaysOverdue(dueDate, status)` function
    - Implement `sortTasks(tasks, field, direction)` function
    - Implement `filterTasks(tasks, filter)` function
    - _Requirements: 1.3, 1.4, 1.5, 7.3_

  - [x] 1.2 Create case utility functions in `src/lib/caseUtils.ts`
    - Implement `sortCases(cases, field, direction)` function
    - Implement `filterCases(cases, statusFilter, priorityFilter)` function
    - Implement `validateResolution(status, resolution)` function
    - _Requirements: 4.4, 4.5, 6.3_

  - [x] 1.3 Create PriorityBadge component in `src/components/shared/PriorityBadge.tsx`
    - Implement color mapping for LOW, NORMAL, MEDIUM, HIGH, URGENT, CRITICAL
    - _Requirements: 7.1_

  - [x] 1.4 Create StatusBadge component in `src/components/shared/StatusBadge.tsx`
    - Implement color mapping for task and case statuses
    - _Requirements: 7.2_

- [x] 2. Implement Task Management UI
  - [x] 2.1 Create TaskModal component in `src/components/tasks/TaskModal.tsx`
    - Implement form with subject, description, priority, status, due date, assignee fields
    - Implement subject validation (non-empty)
    - Support create and edit modes
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 3.1, 3.2_

  - [x] 2.2 Create TaskList component in `src/components/tasks/TaskList.tsx`
    - Display tasks with subject, priority badge, status badge, due date, assignee
    - Show overdue indicator for past-due incomplete tasks
    - Implement sorting controls
    - Implement filter tabs (All, Open, Completed)
    - Support row selection for bulk operations
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 3.5_

  - [x] 2.3 Update Tasks page to use new components
    - Integrate TaskList and TaskModal with useTasks hook
    - Implement create, edit, complete, and delete flows
    - Add loading skeleton and empty state
    - _Requirements: 2.4, 3.3, 3.4, 3.5, 8.1, 8.3_

- [x] 3. Implement Case Management UI
  - [x] 3.1 Create CaseModal component in `src/components/cases/CaseModal.tsx`
    - Implement form with subject, description, priority, status, type, origin fields
    - Implement subject validation (non-empty)
    - Implement resolution field (required when closing)
    - Support create and edit modes
    - _Requirements: 5.1, 5.2, 5.3, 5.5, 6.1, 6.2, 6.3_

  - [x] 3.2 Create CaseTable component in `src/components/cases/CaseTable.tsx`
    - Display cases with case number, subject, priority badge, status badge, contact, created date
    - Highlight CRITICAL priority cases
    - Implement sorting controls
    - Implement status and priority filters
    - Support row selection for bulk operations
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 6.5, 7.4_

  - [x] 3.3 Update Cases page to use new components
    - Integrate CaseTable and CaseModal with useCases hook
    - Implement create, edit, resolve, and delete flows
    - Add loading skeleton and empty state
    - _Requirements: 5.4, 6.4, 8.2, 8.4_

- [x] 4. Additional CRM Enhancements
  - [x] 4.1 Create useAccounts hook for account management
  - [x] 4.2 Create AccountModal component for creating/editing accounts
  - [x] 4.3 Update AccountGrid component with full CRUD functionality
  - [x] 4.4 Update Accounts page with filtering and search
  - [x] 4.5 Create useOpportunities hook for opportunity management
  - [x] 4.6 Create OpportunityModal component for creating/editing opportunities
  - [x] 4.7 Update KanbanView with drag-and-drop stage changes
  - [x] 4.8 Update Opportunities page with pipeline stats
  - [x] 4.9 Update Dashboard with real data from all modules

## Completed Features

### Tasks Module
- Full CRUD operations (create, read, update, delete)
- Task completion with timestamp
- Sorting by due date, priority, status, created date
- Filtering by status (All, Open, Completed)
- Overdue task indicators
- Bulk selection and deletion
- Loading skeletons and empty states
- Task summary statistics

### Cases Module
- Full CRUD operations (create, read, update, delete)
- Case resolution with required description
- Sorting by case number, subject, priority, status, created date
- Filtering by status and priority
- Critical case highlighting
- Escalation indicators
- Bulk selection and deletion
- Loading skeletons and empty states
- Case metrics display

### Accounts Module
- Full CRUD operations (create, read, update, delete)
- Grid and list view modes
- Filtering by account type
- Search functionality
- Account type badges
- Revenue and employee display

### Opportunities Module
- Full CRUD operations (create, read, update, delete)
- Kanban board with drag-and-drop stage changes
- Pipeline value calculations
- Weighted pipeline calculations
- Win rate statistics
- Stage-based probability updates

### Dashboard
- Real-time statistics from all modules
- Pipeline value display
- Open tasks with overdue count
- Open cases with critical count
- Recent opportunities list
- Upcoming tasks list
- AI Intelligence panel with dynamic data

## Notes

- All components follow existing Tailwind/Salesforce styling patterns
- Modal components use the shared Modal component
- Badge components provide consistent priority and status visualization
- Hooks integrate with Supabase for data persistence
- TypeScript compilation passes with no errors
