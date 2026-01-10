"use client";

import React, { useState } from 'react';
import { Modal } from '@/components/shared/Modal';
import { Lead } from '@/hooks/useLeads';
import { TrendingUp, Building2, User } from 'lucide-react';

interface ConvertLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    lead: Lead | null;
    onConvert: (options: {
        createAccount: boolean;
        createContact: boolean;
        createOpportunity: boolean;
        opportunityName: string;
        opportunityAmount: number;
    }) => Promise<void>;
}

export function ConvertLeadModal({ isOpen, onClose, lead, onConvert }: ConvertLeadModalProps) {
    const [createOpportunity, setCreateOpportunity] = useState(true);
    const [opportunityName, setOpportunityName] = useState('');
    const [opportunityAmount, setOpportunityAmount] = useState(0);
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (lead) {
            setOpportunityName(`${lead.company_name || lead.company || lead.last_name} - Potential Deal`);
        }
    }, [lead]);

    const handleConvert = async () => {
        setLoading(true);
        try {
            await onConvert({
                createAccount: true,
                createContact: true,
                createOpportunity,
                opportunityName,
                opportunityAmount
            });
            onClose();
        } finally {
            setLoading(false);
        }
    };

    if (!lead) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Convert Lead">
            <div className="space-y-6">
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-start gap-4">
                    <TrendingUp className="text-emerald-600 shrink-0" size={24} />
                    <div>
                        <h4 className="text-[14px] font-bold text-slate-800">Convert {lead.first_name} {lead.last_name}</h4>
                        <p className="text-[12px] text-slate-600 mt-1">
                            Converting this lead will create a new Account and Contact.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 border border-sf-border rounded bg-sf-gray/20">
                        <Building2 size={18} className="text-slate-400" />
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Account</p>
                            <p className="text-[13px] font-semibold text-slate-800">{lead.company_name || lead.company}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 border border-sf-border rounded bg-sf-gray/20">
                        <User size={18} className="text-slate-400" />
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Contact</p>
                            <p className="text-[13px] font-semibold text-slate-800">{lead.first_name} {lead.last_name}</p>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-sf-border space-y-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="rounded text-sf-blue h-4 w-4"
                            checked={createOpportunity}
                            onChange={(e) => setCreateOpportunity(e.target.checked)}
                        />
                        <span className="text-[13px] font-bold text-slate-700">Create a new opportunity upon conversion</span>
                    </label>

                    {createOpportunity && (
                        <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Opportunity Name</label>
                                <input
                                    className="w-full h-10 px-4 border border-sf-border rounded focus:border-sf-blue outline-none text-[13px]"
                                    value={opportunityName}
                                    onChange={(e) => setOpportunityName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Expected Amount</label>
                                <input
                                    type="number"
                                    className="w-full h-10 px-4 border border-sf-border rounded focus:border-sf-blue outline-none text-[13px]"
                                    value={opportunityAmount}
                                    onChange={(e) => setOpportunityAmount(Number(e.target.value))}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-sf-border">
                    <button onClick={onClose} className="sf-btn-neutral">Cancel</button>
                    <button
                        onClick={handleConvert}
                        className="sf-btn-primary px-8"
                        disabled={loading}
                    >
                        {loading ? 'Converting...' : 'Convert Lead'}
                    </button>
                </div>
            </div>
        </Modal>
    );
}
