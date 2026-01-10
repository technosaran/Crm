"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

export interface CalendarEvent {
    id: number;
    title: string;
    description: string | null;
    start_time: string;
    end_time: string;
    all_day: boolean;
    location: string | null;
    event_type: 'MEETING' | 'CALL' | 'TASK' | 'REMINDER' | 'OTHER';
    entity_type: string | null;
    entity_id: string | null;
    attendees: string[] | null;
    owner_id: string;
    created_at: string;
}

export function useCalendarEvents(startDate?: Date, endDate?: Date) {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    const fetchEvents = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('calendar_events')
                .select('*')
                .order('start_time', { ascending: true });

            if (startDate) {
                query = query.gte('start_time', startDate.toISOString());
            }
            if (endDate) {
                query = query.lte('start_time', endDate.toISOString());
            }

            const { data, error } = await query;
            if (error && error.code !== 'PGRST116') throw error;
            setEvents(data || []);
        } catch (error: any) {
            console.error('Error fetching calendar events:', error);
        } finally {
            setLoading(false);
        }
    };

    const createEvent = async (event: Omit<CalendarEvent, 'id' | 'owner_id' | 'created_at'>) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            
            const { data, error } = await supabase
                .from('calendar_events')
                .insert([{
                    ...event,
                    owner_id: user?.id
                }])
                .select()
                .single();

            if (error) throw error;
            setEvents(prev => [...prev, data].sort((a, b) => 
                new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
            ));
            toast.success("Event created");
            return true;
        } catch (error: any) {
            console.error('Error creating event:', error);
            toast.error("Failed to create event");
            return false;
        }
    };

    const updateEvent = async (id: number, updates: Partial<CalendarEvent>) => {
        try {
            const { error } = await supabase
                .from('calendar_events')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
            setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
            toast.success("Event updated");
            return true;
        } catch (error: any) {
            console.error('Error updating event:', error);
            toast.error("Failed to update event");
            return false;
        }
    };

    const deleteEvent = async (id: number) => {
        try {
            const { error } = await supabase
                .from('calendar_events')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setEvents(prev => prev.filter(e => e.id !== id));
            toast.success("Event deleted");
        } catch (error: any) {
            console.error('Error deleting event:', error);
            toast.error("Failed to delete event");
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [startDate?.toISOString(), endDate?.toISOString()]);

    return { events, loading, createEvent, updateEvent, deleteEvent, refresh: fetchEvents };
}
