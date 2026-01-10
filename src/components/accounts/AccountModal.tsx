"use client";

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/shared/Modal';
import { Account } from '@/hooks/useAccounts';

interface AccountFormData {
  name: string;
  type: Account['type'];
  industry: string;
  website: string;
  phone: string;
  email: string;
  annual_revenue: string;
  number_of_employees: string;
  description: string;
  billing_city: string;
  billing_country: string;
}

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  account?: Account | null;
  onSubmit: (data: Partial<Account>) => Promise<boolean>;
}

const initialFormData: AccountFormData = {
  name: '',
  type: 'PROSPECT',
  industry: '',
  website: '',
  phone: '',
  email: '',
  annual_revenue: '',
  number_of_employees: '',
  description: '',
  billing_city: '',
  billing_country: '',
};

const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Manufacturing',
  'Retail',
  'Education',
  'Real Estate',
  'Consulting',
  'Media',
  'Other'
];

export function AccountModal({ isOpen, onClose, account, onSubmit }: AccountModalProps) {
  const [formData, setFormData] = useState<AccountFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditing = !!account;

  useEffect(() => {
    if (account) {
      setFormData({
        name: account.name || '',
        type: account.type,
        industry: account.industry || '',
        website: account.website || '',
        phone: account.phone || '',
        email: account.email || '',
        annual_revenue: account.annual_revenue?.toString() || '',
        number_of_employees: account.number_of_employees?.toString() || '',
        description: account.description || '',
        billing_city: account.billing_city || '',
        billing_country: account.billing_country || '',
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [account, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.name.trim()) {
      setErrors({ name: 'Account name is required' });
      return;
    }

    setIsSubmitting(true);
    try {
      const accountData: Partial<Account> = {
        name: formData.name.trim(),
        type: formData.type,
        industry: formData.industry || '',
        website: formData.website || null,
        phone: formData.phone || null,
        email: formData.email || null,
        annual_revenue: formData.annual_revenue ? parseInt(formData.annual_revenue) : null,
        number_of_employees: formData.number_of_employees ? parseInt(formData.number_of_employees) : null,
        description: formData.description || null,
        billing_city: formData.billing_city || null,
        billing_country: formData.billing_country || null,
      };

      if (account?.id) {
        accountData.id = account.id;
      }

      const success = await onSubmit(accountData);
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
      title={isEditing ? 'Edit Account' : 'New Account'}
      size="lg"
      footer={
        <>
          <button
            type="submit"
            form="account-form"
            className="sf-btn-primary px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isEditing ? 'Update Account' : 'Create Account'}
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
      <form id="account-form" onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          {/* Left Column */}
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-slate-900 border-b border-sf-border pb-2">
              Account Information
            </h4>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Account Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full bg-white border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all ${
                  errors.name ? 'border-red-500' : 'border-sf-border'
                }`}
                placeholder="Enter account name"
              />
              {errors.name && (
                <p className="text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Account['type'] })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
              >
                <option value="PROSPECT">Prospect</option>
                <option value="CUSTOMER">Customer</option>
                <option value="PARTNER">Partner</option>
                <option value="VENDOR">Vendor</option>
                <option value="COMPETITOR">Competitor</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Industry
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
              >
                <option value="">-- Select Industry --</option>
                {industries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
                placeholder="https://example.com"
              />
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
                placeholder="Brief description of the account..."
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h4 className="text-[14px] font-bold text-slate-900 border-b border-sf-border pb-2">
              Contact & Details
            </h4>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
                placeholder="contact@company.com"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                  Annual Revenue
                </label>
                <input
                  type="number"
                  value={formData.annual_revenue}
                  onChange={(e) => setFormData({ ...formData, annual_revenue: e.target.value })}
                  className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
                  placeholder="$0"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                  Employees
                </label>
                <input
                  type="number"
                  value={formData.number_of_employees}
                  onChange={(e) => setFormData({ ...formData, number_of_employees: e.target.value })}
                  className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                City
              </label>
              <input
                type="text"
                value={formData.billing_city}
                onChange={(e) => setFormData({ ...formData, billing_city: e.target.value })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
                placeholder="City"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                Country
              </label>
              <input
                type="text"
                value={formData.billing_country}
                onChange={(e) => setFormData({ ...formData, billing_country: e.target.value })}
                className="w-full bg-white border border-sf-border rounded h-9 px-3 text-[13px] outline-none focus:border-sf-blue transition-all"
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
}
