"use client";

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/shared/Modal';
import { Task } from '@/hooks/useTasks';

interface TaskFormData {
  subject: string;
  description: string;
  priority: Task['priority'];
  status: Task['status'];
  due_date: string;
}

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task | null;
  onSubmit: (data: Partial<Task>) => Promise<boolean>;
}

const initialFormData: TaskFormData = {
  subject: '',
  description: '',
  priority: 'NORMAL',
  status: 'NOT_STARTED',
  due_date: '',
};

export function TaskModal({ isOpen, onClose, task, onSubmit }: TaskModalProps) {
  const [formData, setFormData] = useState<TaskFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!task;

  useEffect(() => {
    if (task) {
      setFormData({
        subject: task.subject || '',
        description: task.description || '',
        priority: task.priority,
        status: task.status,
        due_date: task.due_date ? task.due_date.split('T')[0] : '',
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [task, isOpen]);

  const validateSubject = (subject: string): boolean => {
    return subject.trim().length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateSubject(formData.subject)) {
      setErrors({ subject: 'Subject is required' });
      return;
    }

    setIsSubmitting(true);
    try {
      const taskData: Partial<Task> = {
        subject: formData.subject.trim(),
        description: formData.description.trim() || null,
        priority: formData.priority,
        status: formData.status,
        due_date: formData.due_date || null,
      };

      if (task?.id) {
        taskData.id = task.id;
      }

      const success = await onSubmit(taskData);
      if (success) {
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Task' : 'New Task'}
      size="md"
      footer={
        <>
          <button
            type="submit"
            form="task-form"
            className="sf-btn-primary px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Task' : 'Create Task'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="sf-btn-neutral px-8"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </>
      }
    >
      <form id="task-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="col-span-2 space-y-1.5">
            <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
              Subject <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className={`w-full bg-white border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all ${
                errors.subject ? 'border-red-500' : 'border-sf-border'
              }`}
              placeholder="Enter task subject"
            />
            {errors.subject && (
              <p className="text-xs text-red-600">{errors.subject}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
              Priority
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
              className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
            >
              <option value="LOW">Low</option>
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
              className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
            >
              <option value="NOT_STARTED">Not Started</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="WAITING">Waiting</option>
              <option value="DEFERRED">Deferred</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
              Due Date
            </label>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
            />
          </div>

          <div className="col-span-2 space-y-1.5">
            <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full bg-white border border-sf-border rounded px-3 py-2 text-[13px] outline-none focus:border-sf-blue transition-all resize-none"
              placeholder="Add task details..."
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

/**
 * Validate that subject is non-empty.
 * Exported for testing purposes.
 */
export function validateTaskSubject(subject: string): boolean {
  return subject.trim().length > 0;
}
