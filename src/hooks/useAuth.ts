"use client";

import { useGlobalStore } from '@/store/useGlobalStore';
import { UserRole } from '@/types/crm';

// Define granular permissions
type Permission =
    | 'DELETE_LEAD'
    | 'VIEW_REPORTS'
    | 'MANAGE_USERS'
    | 'EDIT_SETTINGS'
    | 'EXPORT_DATA';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
    ADMIN: ['DELETE_LEAD', 'VIEW_REPORTS', 'MANAGE_USERS', 'EDIT_SETTINGS', 'EXPORT_DATA'],
    MANAGER: ['VIEW_REPORTS', 'EXPORT_DATA'],
    SALES: [],
    SUPPORT: [],
};

export function useAuth() {
    // For demo: default role is ADMIN to allow everything
    // In production, this would come from a JWT/Auth session
    const user = {
        id: 'u1',
        name: 'Alex Rivera',
        role: 'ADMIN' as UserRole,
    };

    const hasPermission = (permission: Permission) => {
        return ROLE_PERMISSIONS[user.role].includes(permission);
    };

    const isAdmin = user.role === 'ADMIN';

    return { user, hasPermission, isAdmin };
}
