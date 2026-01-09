"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

export interface Lead {
    id: number;
    first_name: string;
    last_name: string;
    company: string;
    email: string;
    phone?: string;
    status: 'New' | 'Working' | 'Nurturing' | 'Qualified' | 'Unqualified';
    source: string;
    owner_id?: string;
    created_at: string;
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
            // Don't toast on initial load 404/missing table to keep clean UI
        } finally {
            setLoading(false);
        }
    };

    const createLead = async (lead: Partial<Lead>) => {
        try {
            const { data, error } = await supabase
                .from('leads')
                .insert([{ ...lead, status: 'New', created_at: new Date().toISOString() }])
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

    const deleteLeads = async (ids: number[]) => {
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
    }

    useEffect(() => {
        fetchLeads();
    }, []);

    return { leads, loading, createLead, deleteLeads, refresh: fetchLeads };
}
