"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

export interface EmailTemplate {
    id: number;
    name: string;
    subject: string;
    body: string;
    category: 'SALES' | 'SUPPORT' | 'MARKETING' | 'FOLLOW_UP' | 'OTHER';
    is_active: boolean;
    created_by_id: string;
    created_at: string;
}

export function useEmailTemplates() {
    const [templates, setTemplates] = useState<EmailTemplate[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchTemplates = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('email_templates')
                .select('*')
                .eq('is_active', true)
                .order('name', { ascending: true });

            if (error && error.code !== 'PGRST116') throw error;
            setTemplates(data || []);
        } catch (error: any) {
            console.error('Error fetching email templates:', error);
        } finally {
            setLoading(false);
        }
    };

    const createTemplate = async (template: Omit<EmailTemplate, 'id' | 'created_by_id' | 'created_at' | 'is_active'>) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            const { data, error } = await supabase
                .from('email_templates')
                .insert([{
                    ...template,
                    created_by_id: user?.id,
                    is_active: true
                }])
                .select()
                .single();

            if (error) throw error;
            setTemplates(prev => [...prev, data]);
            toast.success("Template created");
            return true;
        } catch (error: any) {
            console.error('Error creating template:', error);
            toast.error("Failed to create template");
            return false;
        }
    };

    const updateTemplate = async (id: number, updates: Partial<EmailTemplate>) => {
        try {
            const { error } = await supabase
                .from('email_templates')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
            setTemplates(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
            toast.success("Template updated");
            return true;
        } catch (error: any) {
            console.error('Error updating template:', error);
            toast.error("Failed to update template");
            return false;
        }
    };

    const deleteTemplate = async (id: number) => {
        try {
            const { error } = await supabase
                .from('email_templates')
                .update({ is_active: false })
                .eq('id', id);

            if (error) throw error;
            setTemplates(prev => prev.filter(t => t.id !== id));
            toast.success("Template deleted");
        } catch (error: any) {
            console.error('Error deleting template:', error);
            toast.error("Failed to delete template");
        }
    };

    // Merge template with data
    const mergeTemplate = (template: EmailTemplate, data: Record<string, string>): { subject: string; body: string } => {
        let subject = template.subject;
        let body = template.body;

        Object.entries(data).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            subject = subject.replace(regex, value);
            body = body.replace(regex, value);
        });

        return { subject, body };
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    return { templates, loading, createTemplate, updateTemplate, deleteTemplate, mergeTemplate, refresh: fetchTemplates };
}
