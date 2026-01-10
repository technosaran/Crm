"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

export interface AuditLog {
    id: string;
    user_id: string;
    user_profiles?: {
        full_name: string;
        email: string;
    };
    action: string;
    entity_type: string;
    entity_id: string;
    details: string;
    created_at: string;
}

export function useAuditLogs() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('audit_logs')
                .select(`
                    *,
                    user_profiles (
                        full_name,
                        email
                    )
                `)
                .order('created_at', { ascending: false })
                .limit(50);

            if (error) throw error;
            setLogs(data || []);
        } catch (error: any) {
            console.error('Error fetching audit logs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();

        // Subscribe to real-time changes
        const channel = supabase
            .channel('audit_logs_changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'audit_logs'
                },
                (payload) => {
                    // Refresh logs when a new one is added
                    fetchLogs();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const logAction = async (action: string, entityType: string, entityId: string, details: string) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { error } = await supabase
                .from('audit_logs')
                .insert([{
                    user_id: user.id,
                    action,
                    entity_type: entityType,
                    entity_id: entityId,
                    details
                }]);

            if (error) throw error;
        } catch (error: any) {
            console.error('Error logging action:', error);
        }
    };

    return { logs, loading, logAction, refresh: fetchLogs };
}
