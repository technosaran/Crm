"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

export interface Account {
    id: string;
    name: string;
    type: 'CUSTOMER' | 'PROSPECT' | 'PARTNER' | 'VENDOR' | 'COMPETITOR' | 'OTHER';
    industry: string;
    location: string;
    size: string;
    website: string | null;
    phone: string | null;
    email: string | null;
    annual_revenue: number | null;
    number_of_employees: number | null;
    description: string | null;
    billing_street: string | null;
    billing_city: string | null;
    billing_state: string | null;
    billing_postal_code: string | null;
    billing_country: string | null;
    owner_id: string;
    created_at: string;
    updated_at: string;
}

export function useAccounts() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchAccounts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('accounts')
                .select('*')
                .order('name', { ascending: true });

            if (error) throw error;
            setAccounts(data || []);
        } catch (error: any) {
            console.error('Error fetching accounts:', error);
        } finally {
            setLoading(false);
        }
    };

    const createAccount = async (account: Partial<Account>) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            const { data, error } = await supabase
                .from('accounts')
                .insert([{
                    ...account,
                    owner_id: user?.id,
                    type: account.type || 'PROSPECT',
                    created_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) throw error;
            setAccounts(prev => [data, ...prev]);
            toast.success("Account created successfully");
            return true;
        } catch (error: any) {
            console.error('Error creating account:', error);
            toast.error(error.message || "Failed to create account");
            return false;
        }
    };

    const updateAccount = async (id: string, updates: Partial<Account>) => {
        try {
            const { error } = await supabase
                .from('accounts')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
            setAccounts(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
            toast.success("Account updated successfully");
            return true;
        } catch (error: any) {
            console.error('Error updating account:', error);
            toast.error("Failed to update account");
            return false;
        }
    };

    const deleteAccounts = async (ids: string[]) => {
        try {
            const { error } = await supabase
                .from('accounts')
                .delete()
                .in('id', ids);

            if (error) throw error;
            setAccounts(prev => prev.filter(a => !ids.includes(a.id)));
            toast.success("Accounts deleted");
        } catch (error: any) {
            console.error('Error deleting accounts:', error);
            toast.error("Failed to delete accounts");
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, []);

    return { accounts, loading, createAccount, updateAccount, deleteAccounts, refresh: fetchAccounts };
}
