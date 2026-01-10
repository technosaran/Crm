"use client";

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/shared/Modal';
import { Opportunity, OpportunityStage } from '@/hooks/useOpportunities';

interface OpportunityFormData {
  name: string;
  description: string;
  account_name: string;
  amount: string;
  stage: OpportunityStage;
  probability: string;
  expected_close_date: string;
  next_step: string;
  lead_source: string;
}

interface OpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  opportunity?: Opportunity | null;
  onSubmit: (data: Partial<Opportunity>) => Promise<boolean>;
}

const initialFormData: OpportunityFormData = {
  name: '',
  description: '',
  account_name: '',
  amount: '',
  stage: 'NEW',
  probability: '10',
  expected_close_date: '',
  next_step: '',
  lead_source: '',
};

const stages: { value: OpportunityStage; label: string }[] = [
  { value: 'NEW', label: 'Discovery' },
  { value: 'QUALIFICATION', label: 'Qualification' },
  { value: 'NEEDS_ANALYSIS', label: 'Needs Analysis' },
  { value: 'VALUE_PROPOSITION', label: 'Value Proposition' },
  { value: 'PROPOSAL', label: 'Proposal' },
  { value: 'NEGOTIATION', label: 'Negotiation' },
  { value: 'CLOSED_WON', label: 'Closed Won' },
  { value: 'CLOSED_LOST', label: 'Closed Lost' },
];

const leadSources = [
  'Web',
  'Referral',
  'Partner',
  'Cold Call',
  'Trade Show',
  'Advertisement',
  'Other'
];

export function OpportunityModal({ isOpen, onClose, opportunity, onSubmit }: OpportunityModalProps) {
  const [formData, setFormData] = useState<OpportunityFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!opportunity;

  useEffect(() => {
    if (opportunity) {
      setFormData({
        name: opportunity.name || '',
        description: opportunity.description || '',
        account_name: opportunity.account_name || '',
        amount: opportunity.amount?.toString() || '',
        stage: opportunity.stage,
        probability: opportunity.probability?.toString() || '10',
        expected_close_date: opportunity.expected_close_date ? opportunity.expected_close_date.split('T')[0] : '',
        next_step: opportunity.next_step || '',
        lead_source: opportunity.lead_source || '',
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [opportunity, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.name.trim()) {
      setErrors({ name: 'Opportunity name is required' });
      return;
    }

    setIsSubmitting(true);
    try {
      const oppData: Partial<Opportunity> = {
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        account_name: formData.account_name.trim() || null,
        amount: formData.amount ? parseFloat(formData.amount) : 0,
        stage: formData.stage,
        probability: formData.probability ? parseInt(formData.probability) : 10,
        expected_close_date: formData.expected_close_date || new Date().toISOString().split('T')[0],
        next_step: formData.next_step.trim() || null,
        lead_source: formData.lead_source || null,
      };

      if (opportunity?.id) {
        oppData.id = opportunity.id;
      }

      const success = await onSubmit(oppData);
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
      title={isEditing ? 'Edit Opportunity' : 'New Opportunity'}
      size="lg"
      footer={
        <>
          <button
            type="submit"
            form="opportunity-form"
            className="sf-btn-primary px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Create'}
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
      <form id="opportunity-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-slate-900 border-b border-sf-border pb-2">
              Opportunity Information
            </h4>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Opportunity Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full bg-white border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all ${
                  errors.name ? 'border-red-500' : 'border-sf-border'
                }`}
                placeholder="Enter opportunity name"
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Account Name
              </label>
              <input
                type="text"
                value={formData.account_name}
                onChange={(e) => setFormData({ ...formData, account_name: e.target.value })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
                placeholder="Associated account"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Stage
              </label>
              <select
                value={formData.stage}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value as OpportunityStage })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
              >
                {stages.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
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
                placeholder="Describe the opportunity..."
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-slate-900 border-b border-sf-border pb-2">
              Deal Details
            </h4>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                  Amount
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
                  placeholder="$0"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                  Probability %
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.probability}
                  onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                  className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
                  placeholder="10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Expected Close Date
              </label>
              <input
                type="date"
                value={formData.expected_close_date}
                onChange={(e) => setFormData({ ...formData, expected_close_date: e.target.value })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Lead Source
              </label>
              <select
                value={formData.lead_source}
                onChange={(e) => setFormData({ ...formData, lead_source: e.target.value })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
              >
                <option value="">-- Select Source --</option>
                {leadSources.map(src => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Next Step
              </label>
              <input
                type="text"
                value={formData.next_step}
                onChange={(e) => setFormData({ ...formData, next_step: e.target.value })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
                placeholder="What's the next action?"
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
