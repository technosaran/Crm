export type UserRole = 'ADMIN' | 'MANAGER' | 'SALES' | 'SUPPORT';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

export type LeadStatus = 'NEW' | 'WORKING' | 'NURTURING' | 'QUALIFIED' | 'UNQUALIFIED';

export interface Lead {
    id: string;
    firstName: string;
    lastName: string;
    companyId?: string;
    companyName: string;
    email: string;
    phone?: string;
    status: LeadStatus;
    source: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
    tags: string[];
}

export interface Account {
    id: string;
    name: string;
    industry: string;
    website?: string;
    ownerId: string;
    location: string;
    size: string;
    createdAt: Date;
}

export type OpportunityStage = 'NEW' | 'QUALIFICATION' | 'PROPOSAL' | 'NEGOTIATION' | 'CONTRACT' | 'CLOSED_WON' | 'CLOSED_LOST';

export interface Opportunity {
    id: string;
    title: string;
    accountId: string;
    amount: number;
    stage: OpportunityStage;
    probability: number; // 0-100
    expectedCloseDate: Date;
    ownerId: string;
    createdAt: Date;
}

export type ActivityType = 'CALL' | 'EMAIL' | 'MEETING' | 'TASK' | 'NOTE';

export interface Activity {
    id: string;
    type: ActivityType;
    subject: string;
    description?: string;
    entityId: string; // ID of Lead, Account, or Opportunity
    entityType: 'LEAD' | 'ACCOUNT' | 'OPPORTUNITY';
    performedById: string;
    occurredAt: Date;
}

export interface AuditLog {
    id: string;
    userId: string;
    action: string;
    entityId: string;
    entityType: string;
    details: string;
    timestamp: Date;
}
