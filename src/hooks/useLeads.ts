"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

export interface Lead {
    id: string;
    first_name: string;
    last_name: string;
    company: string | null;
    company_name: string;
    email: string;
    phone: string | null;
    status: 'New' | 'Working' | 'Nurturing' | 'Qualified' | 'Unqualified';
    source: string;
    tags: string[] | null;
    owner_id: string;
    created_at: string;
    updated_at: string;
}

export function useLeads() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads(data || []);
        } catch (error: any) {
            console.error('Error fetching leads:', error);
        } finally {
            setLoading(false);
        }
    };

    const createLead = async (lead: Partial<Lead>) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            const insertData = {
                ...lead,
                company_name: lead.company_name || lead.company || 'Unknown Company',
                owner_id: user?.id,
                status: 'New',
                created_at: new Date().toISOString()
            };
            
            const { data, error } = await supabase
                .from('leads')
                .insert([insertData])
                .select()
                .single();

            if (error) throw error;
            setLeads(prev => [data, ...prev]);
            toast.success("Lead created successfully");
            return true;
        } catch (error: any) {
            console.error('Error creating lead:', error);
            toast.error(error.message || "Failed to create lead");
            return false;
        }
    };

    const updateLead = async (id: string, updates: Partial<Lead>) => {
        try {
            const { error } = await supabase
                .from('leads')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id);

            if (error) throw error;
            setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
            toast.success("Lead updated");
            return true;
        } catch (error: any) {
            console.error('Error updating lead:', error);
            toast.error("Failed to update lead");
            return false;
        }
    };

    const deleteLeads = async (ids: string[]) => {
        try {
            const { error } = await supabase
                .from('leads')
                .delete()
                .in('id', ids);

            if (error) throw error;
            setLeads(prev => prev.filter(l => !ids.includes(l.id)));
            toast.success("Leads deleted");
        } catch (error: any) {
            console.error('Error deleting leads:', error);
            toast.error("Failed to delete leads");
        }
    };

    // Convert lead to account, contact, and optionally opportunity
    const convertLead = async (leadId: string, options: {
        createAccount?: boolean;
        createContact?: boolean;
        createOpportunity?: boolean;
        opportunityName?: string;
        opportunityAmount?: number;
    } = { createAccount: true, createContact: true }) => {
        try {
            const lead = leads.find(l => l.id === leadId);
            if (!lead) throw new Error('Lead not found');

            const { data: { user } } = await supabase.auth.getUser();
            let accountId: string | null = null;

            // Create Account
            if (options.createAccount) {
                const { data: account, error: accountError } = await supabase
                    .from('accounts')
                    .insert([{
                        name: lead.company_name || lead.company || `${lead.first_name} ${lead.last_name}`,
                        type: 'CUSTOMER',
                        industry: 'Other',
                        location: '',
                        size: 'Small',
                        owner_id: user?.id
                    }])
                    .select()
                    .single();

                if (accountError) throw accountError;
                accountId = account.id;
            }

            // Create Contact
            if (options.createContact) {
                const { error: contactError } = await supabase
                    .from('contacts')
                    .insert([{
                        first_name: lead.first_name,
                        last_name: lead.last_name,
                        email: lead.email,
                        phone: lead.phone,
                        owner_id: user?.id
                    }]);

                if (contactError) throw contactError;
            }

            // Create Opportunity
            if (options.createOpportunity && accountId) {
                const { error: oppError } = await supabase
                    .from('opportunities')
                    .insert([{
                        title: options.opportunityName || `${lead.company_name} - New Opportunity`,
                        name: options.opportunityName || `${lead.company_name} - New Opportunity`,
                        account_id: accountId,
                        account_name: lead.company_name,
                        amount: options.opportunityAmount || 0,
                        stage: 'NEW',
                        probability: 10,
                        expected_close_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        owner_id: user?.id
                    }]);

                if (oppError) throw oppError;
            }

            // Update lead status to Qualified
            await updateLead(leadId, { status: 'Qualified' });

            toast.success("Lead converted successfully!");
            return true;
        } catch (error: any) {
            console.error('Error converting lead:', error);
            toast.error(error.message || "Failed to convert lead");
            return false;
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return { leads, loading, createLead, updateLead, deleteLeads, convertLead, refresh: fetchLeads };
}
