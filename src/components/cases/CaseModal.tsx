"use client";

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/shared/Modal';
import { Case } from '@/hooks/useCases';
import { validateResolution } from '@/lib/caseUtils';

interface CaseFormData {
  subject: string;
  description: string;
  priority: Case['priority'];
  status: Case['status'];
  type: Case['type'];
  origin: Case['origin'];
  resolution: string;
}

interface CaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseItem?: Case | null;
  onSubmit: (data: Partial<Case>) => Promise<boolean>;
}

const initialFormData: CaseFormData = {
  subject: '',
  description: '',
  priority: 'MEDIUM',
  status: 'NEW',
  type: null,
  origin: null,
  resolution: '',
};

export function CaseModal({ isOpen, onClose, caseItem, onSubmit }: CaseModalProps) {
  const [formData, setFormData] = useState<CaseFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!caseItem;

  useEffect(() => {
    if (caseItem) {
      setFormData({
        subject: caseItem.subject || '',
        description: caseItem.description || '',
        priority: caseItem.priority,
        status: caseItem.status,
        type: caseItem.type,
        origin: caseItem.origin,
        resolution: caseItem.resolution || '',
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [caseItem, isOpen]);

  const validateSubject = (subject: string): boolean => {
    return subject.trim().length > 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const newErrors: Record<string, string> = {};

    if (!validateSubject(formData.subject)) {
      newErrors.subject = 'Subject is required';
    }

    // Validate resolution when closing
    if (!validateResolution(formData.status, formData.resolution)) {
      newErrors.resolution = 'Resolution description is required to close this case';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const caseData: Partial<Case> = {
        subject: formData.subject.trim(),
        description: formData.description.trim() || null,
        priority: formData.priority,
        status: formData.status,
        type: formData.type,
        origin: formData.origin,
        resolution: formData.resolution.trim() || null,
      };

      if (caseItem?.id) {
        caseData.id = caseItem.id;
      }

      const success = await onSubmit(caseData);
      if (success) {
        onClose();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isClosingStatus = formData.status === 'CLOSED' || formData.status === 'RESOLVED';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Case' : 'New Case'}
      size="lg"
      footer={
        <>
          <button
            type="submit"
            form="case-form"
            className="sf-btn-primary px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Case' : 'Create Case'}
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
      <form id="case-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-slate-900 border-b border-sf-border pb-2">
              Case Information
            </h4>

            <div className="space-y-1.5">
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
                placeholder="Enter case subject"
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
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Case['priority'] })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Case['status'] })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
              >
                <option value="NEW">New</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="ESCALATED">Escalated</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Type
              </label>
              <select
                value={formData.type || ''}
                onChange={(e) => setFormData({ ...formData, type: (e.target.value || null) as Case['type'] })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
              >
                <option value="">-- None --</option>
                <option value="QUESTION">Question</option>
                <option value="PROBLEM">Problem</option>
                <option value="FEATURE_REQUEST">Feature Request</option>
                <option value="BUG">Bug</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-slate-900 border-b border-sf-border pb-2">
              Additional Details
            </h4>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Origin
              </label>
              <select
                value={formData.origin || ''}
                onChange={(e) => setFormData({ ...formData, origin: (e.target.value || null) as Case['origin'] })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
              >
                <option value="">-- None --</option>
                <option value="PHONE">Phone</option>
                <option value="EMAIL">Email</option>
                <option value="WEB">Web</option>
                <option value="CHAT">Chat</option>
                <option value="SOCIAL_MEDIA">Social Media</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full bg-white border border-sf-border rounded px-3 py-2 text-[13px] outline-none focus:border-sf-blue transition-all resize-none"
                placeholder="Describe the issue..."
              />
            </div>

            {isClosingStatus && (
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                  Resolution <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.resolution}
                  onChange={(e) => setFormData({ ...formData, resolution: e.target.value })}
                  rows={3}
                  className={`w-full bg-white border rounded px-3 py-2 text-[13px] outline-none focus:border-sf-blue transition-all resize-none ${
                    errors.resolution ? 'border-red-500' : 'border-sf-border'
                  }`}
                  placeholder="Describe how the case was resolved..."
                />
                {errors.resolution && (
                  <p className="text-xs text-red-600">{errors.resolution}</p>
                )}
              </div>
            )}
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
export function validateCaseSubject(subject: string): boolean {
  return subject.trim().length > 0;
}
