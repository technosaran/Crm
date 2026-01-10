"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

export type ActivityType = 'CALL' | 'EMAIL' | 'MEETING' | 'TASK' | 'NOTE';
export type EntityType = 'LEAD' | 'ACCOUNT' | 'OPPORTUNITY' | 'CONTACT' | 'CASE';

export interface Activity {
    id: string;
    type: ActivityType;
    subject: string;
    description: string | null;
    entity_type: EntityType;
    entity_id: string;
    performed_by_id: string;
    occurred_at: string;
}

export function useActivities(entityType?: EntityType, entityId?: string) {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchActivities = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('activities')
                .select('*')
                .order('occurred_at', { ascending: false })
                .limit(50);

            if (entityType && entityId) {
                query = query.eq('entity_type', entityType).eq('entity_id', entityId);
            }

            const { data, error } = await query;
            if (error) throw error;
            setActivities(data || []);
        } catch (error: any) {
            console.error('Error fetching activities:', error);
        } finally {
            setLoading(false);
        }
    };

    const logActivity = async (activity: Omit<Activity, 'id' | 'performed_by_id' | 'occurred_at'>) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            const { data, error } = await supabase
                .from('activities')
                .insert([{
                    ...activity,
                    performed_by_id: user?.id,
                    occurred_at: new Date().toISOString()
                }])
                .select()
                .single();

            if (error) throw error;
            setActivities(prev => [data, ...prev]);
            return true;
        } catch (error: any) {
            console.error('Error logging activity:', error);
            toast.error("Failed to log activity");
            return false;
        }
    };

    useEffect(() => {
        fetchActivities();
    }, [entityType, entityId]);

    return { activities, loading, logActivity, refresh: fetchActivities };
}
