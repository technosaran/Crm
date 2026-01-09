"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        // Get initial session
        const getSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);
            } catch (error) {
                console.error("Auth session error:", error);
            } finally {
                setLoading(false);
            }
        };

        getSession();

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return {
        user: user ? { ...user, name: user.user_metadata?.full_name || user.email, role: 'ADMIN' } : { name: 'Guest', role: 'GUEST' }, // Temp fallback for UI compatibility
        loading,
        isAuthenticated: !!user,
        signOut,
        isAdmin: true, // simplified for now
        hasPermission: () => true // simplified for now
    };
}
