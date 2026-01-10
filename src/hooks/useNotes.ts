"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

export interface Note {
    id: number;
    title: string;
    body: string;
    entity_type: string;
    entity_id: string;
    is_pinned: boolean;
    created_by_id: string;
    created_at: string;
    updated_at: string;
}

export function useNotes(entityType?: string, entityId?: string) {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchNotes = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('notes')
                .select('*')
                .order('is_pinned', { ascending: false })
                .order('created_at', { ascending: false });

            if (entityType && entityId) {
                query = query.eq('entity_type', entityType).eq('entity_id', entityId);
            }

            const { data, error } = await query;
            if (error && error.code !== 'PGRST116') throw error;
            setNotes(data || []);
        } catch (error: any) {
            console.error('Error fetching notes:', error);
        } finally {
            setLoading(false);
        }
    };

    const createNote = async (note: { title: string; body: string; entity_type: string; entity_id: string }) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            const { data, error } = await supabase
                .from('notes')
                .insert([{
                    ...note,
                    created_by_id: user?.id,
                    is_pinned: false
                }])
                .select()
                .single();

            if (error) throw error;
            setNotes(prev => [data, ...prev]);
            toast.success("Note added");
            return true;
        } catch (error: any) {
            console.error('Error creating note:', error);
            toast.error("Failed to add note");
            return false;
        }
    };

    const updateNote = async (id: number, updates: Partial<Note>) => {
        try {
            const { error } = await supabase
                .from('notes')
                .update({ ...updates, updated_at: new Date().toISOString() })
                .eq('id', id);

            if (error) throw error;
            setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
            toast.success("Note updated");
            return true;
        } catch (error: any) {
            console.error('Error updating note:', error);
            toast.error("Failed to update note");
            return false;
        }
    };

    const deleteNote = async (id: number) => {
        try {
            const { error } = await supabase
                .from('notes')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setNotes(prev => prev.filter(n => n.id !== id));
            toast.success("Note deleted");
        } catch (error: any) {
            console.error('Error deleting note:', error);
            toast.error("Failed to delete note");
        }
    };

    const togglePin = async (id: number) => {
        const note = notes.find(n => n.id === id);
        if (note) {
            await updateNote(id, { is_pinned: !note.is_pinned });
        }
    };

    useEffect(() => {
        fetchNotes();
    }, [entityType, entityId]);

    return { notes, loading, createNote, updateNote, deleteNote, togglePin, refresh: fetchNotes };
}
