import { Lead, Account, Opportunity, Activity, User } from '@/types/crm';

// Local storage simulated DB keys
const DB_KEYS = {
    LEADS: 'zenith_leads',
    ACCOUNTS: 'zenith_accounts',
    OPPORTUNITIES: 'zenith_opportunities',
    ACTIVITIES: 'zenith_activities',
    USERS: 'zenith_users',
};

class CRMDataService {
    private get<T>(key: string): T[] {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    private save<T>(key: string, data: T[]) {
        if (typeof window === 'undefined') return;
        localStorage.setItem(key, JSON.stringify(data));
    }

    // --- Leads ---
    async getLeads(): Promise<Lead[]> {
        return this.get<Lead>(DB_KEYS.LEADS);
    }

    async createLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
        const leads = this.get<Lead>(DB_KEYS.LEADS);
        const newLead: Lead = {
            ...lead,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.save(DB_KEYS.LEADS, [...leads, newLead]);
        return newLead;
    }

    // --- Opportunities ---
    async getOpportunities(): Promise<Opportunity[]> {
        return this.get<Opportunity>(DB_KEYS.OPPORTUNITIES);
    }

    async updateOpportunityStage(id: string, stage: Opportunity['stage']): Promise<void> {
        const opps = this.get<Opportunity>(DB_KEYS.OPPORTUNITIES);
        const updated = opps.map(o => o.id === id ? { ...o, stage } : o);
        this.save(DB_KEYS.OPPORTUNITIES, updated);
    }

    // --- Audit & Activity ---
    async logActivity(activity: Omit<Activity, 'id' | 'occurredAt'>): Promise<void> {
        const activities = this.get<Activity>(DB_KEYS.ACTIVITIES);
        const newActivity: Activity = {
            ...activity,
            id: Math.random().toString(36).substr(2, 9),
            occurredAt: new Date(),
        };
        this.save(DB_KEYS.ACTIVITIES, [...activities, newActivity]);
    }

    async getActivities(entityId: string): Promise<Activity[]> {
        return this.get<Activity>(DB_KEYS.ACTIVITIES).filter(a => a.entityId === entityId);
    }
}

export const crmService = new CRMDataService();
