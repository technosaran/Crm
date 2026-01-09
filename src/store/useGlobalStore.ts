"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlobalState {
    locale: string;
    currency: string;
    timeZone: string;
    setLocale: (locale: string) => void;
    setCurrency: (currency: string) => void;
    setTimeZone: (tz: string) => void;
}

export const useGlobalStore = create<GlobalState>()(
    persist(
        (set) => ({
            locale: 'en-US',
            currency: 'USD',
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
            setLocale: (locale) => set({ locale }),
            setCurrency: (currency) => set({ currency }),
            setTimeZone: (timeZone) => set({ timeZone }),
        }),
        {
            name: 'zenith-global-settings',
        }
    )
);
