"use client";

import React, { useState, useEffect } from 'react';
import {
    Settings as SettingsIcon,
    User,
    Shield,
    Bell,
    Globe,
    Key,
    Database,
    Webhook,
    Trash2,
    Clock,
    ArrowRight,
    RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase';

export default function Settings() {
    const { user, profile, loading: authLoading } = useAuth();
    const [activeSection, setActiveSection] = useState('profile');
    const [loading, setLoading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        department: ''
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                full_name: profile.full_name || '',
                email: profile.email || '',
                phone: profile.phone || '',
                department: profile.department || ''
            });
        }
    }, [profile]);

    const handleSaveProfile = async () => {
        setLoading(true);
        try {
            const supabase = createClient();
            const { error } = await supabase
                .from('user_profiles')
                .update({
                    full_name: formData.full_name,
                    phone: formData.phone,
                    department: formData.department,
                    updated_at: new Date().toISOString()
                })
                .eq('id', profile?.id);

            if (error) throw error;
            toast.success('Profile updated successfully');
        } catch (error: any) {
            toast.error(error.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const menuItems = [
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'roles', label: 'Roles & Permissions', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'i18n', label: 'Region & Currency', icon: Globe },
        { id: 'security', label: 'Security & SSO', icon: Key },
        { id: 'integrations', label: 'API & Webhooks', icon: Webhook },
        { id: 'data', label: 'Data Management', icon: Database },
    ];

    if (authLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-400">
                <RefreshCw size={24} className="animate-spin mb-2" />
                <p className="text-sm font-bold">Synchronizing System...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center gap-3 bg-white p-6 border border-sf-border rounded-[4px] shadow-sm">
                <div className="h-12 w-12 bg-sf-gray rounded-full flex items-center justify-center text-slate-500">
                    <SettingsIcon size={24} />
                </div>
                <div>
                    <h1 className="text-[24px] font-bold text-slate-900 leading-none">System Setup</h1>
                    <p className="text-[13px] text-slate-500 mt-1">Configure your global CRM parameters and enterprise security.</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Nav */}
                <div className="w-full md:w-64 shrink-0 space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded text-[13px] font-bold transition-all",
                                activeSection === item.id
                                    ? "bg-sf-blue text-white shadow-md shadow-sf-blue/20"
                                    : "text-slate-600 hover:bg-white hover:text-sf-blue border border-transparent hover:border-sf-border"
                            )}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white border border-sf-border rounded-[4px] shadow-sm min-h-[600px] flex flex-col">
                    <div className="p-6 border-b border-sf-border flex items-center justify-between">
                        <h2 className="text-[18px] font-bold text-slate-800">
                            {menuItems.find(m => m.id === activeSection)?.label}
                        </h2>
                        {activeSection === 'profile' && (
                            <button
                                className="sf-btn-primary"
                                onClick={handleSaveProfile}
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        )}
                    </div>

                    <div className="p-8 flex-1">
                        {activeSection === 'roles' && (
                            <div className="space-y-8">
                                <div className="p-4 bg-sf-blue/5 border border-sf-blue/20 rounded-lg flex items-start gap-4">
                                    <Shield className="text-sf-blue shrink-0" size={24} />
                                    <div>
                                        <h4 className="text-[14px] font-bold text-slate-900">Enterprise Access Control</h4>
                                        <p className="text-[12px] text-slate-600 mt-1">
                                            Current Role: <span className="font-bold text-sf-blue">{profile?.role}</span>.
                                            Contact an administrator to change permissions.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'SALES', 'SUPPORT'].map((role) => (
                                        <div key={role} className={cn(
                                            "flex items-center justify-between p-4 border rounded transition-all",
                                            profile?.role === role ? "border-sf-blue bg-sf-blue/5" : "border-sf-border hover:bg-sf-gray/20"
                                        )}>
                                            <div className="flex items-center gap-4">
                                                <div className={cn("h-2 w-2 rounded-full", profile?.role === role ? "bg-sf-blue" : "bg-slate-300")} />
                                                <span className="text-[14px] font-bold text-slate-700">{role.replace('_', ' ')}</span>
                                            </div>
                                            {profile?.role === role && (
                                                <span className="text-[10px] font-black text-sf-blue uppercase tracking-widest bg-white border border-sf-blue/20 px-2 py-0.5 rounded-full">Active Role</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeSection === 'integrations' && (
                            <div className="space-y-8">
                                <div>
                                    <h4 className="text-[14px] font-bold text-slate-900 mb-4">Connected Modules</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="p-4 border border-sf-border rounded flex items-center justify-between shadow-sm">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-sf-gray rounded flex items-center justify-center text-sf-blue font-bold">G</div>
                                                <span className="text-[13px] font-bold">Gmail Service</span>
                                            </div>
                                            <button className="text-[11px] font-bold text-emerald-600">Active</button>
                                        </div>
                                        <div className="p-4 border border-sf-border rounded flex items-center justify-between shadow-sm grayscale opacity-50">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 bg-sf-gray rounded flex items-center justify-center text-slate-500 font-bold">W</div>
                                                <span className="text-[13px] font-bold">WhatsApp Business</span>
                                            </div>
                                            <button className="text-[11px] font-bold text-sf-blue hover:underline">Connect</button>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[14px] font-bold text-slate-900">API Access</h4>
                                    <p className="text-[12px] text-slate-500">Your organization API key is used for custom integrations.</p>
                                    <div className="p-4 bg-slate-900 rounded-lg font-mono text-[12px] text-emerald-400 break-all">
                                        sk_live_51P...************************
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'security' && (
                            <div className="max-w-md space-y-8">
                                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg flex items-start gap-4">
                                    <Key className="text-emerald-600 shrink-0" size={24} />
                                    <div>
                                        <h4 className="text-[14px] font-bold text-slate-900">Security Management</h4>
                                        <p className="text-[12px] text-slate-600 mt-1">
                                            Update your security credentials. We recommend changing your password every 90 days.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
                                        <input
                                            type="password"
                                            className="w-full h-10 px-4 border border-sf-border rounded focus:border-sf-blue outline-none transition-all"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                                        <input
                                            type="password"
                                            className="w-full h-10 px-4 border border-sf-border rounded focus:border-sf-blue outline-none transition-all"
                                            placeholder="Minimum 8 characters"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="w-full h-10 px-4 border border-sf-border rounded focus:border-sf-blue outline-none transition-all"
                                        />
                                    </div>
                                    <button
                                        className="sf-btn-primary w-full"
                                        onClick={() => toast.success('Password update sequence initiated. Check your email for verification.')}
                                    >
                                        Update Password
                                    </button>
                                </div>

                                <div className="pt-6 border-t border-sf-border space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-[13px] font-bold text-slate-800">Two-Factor Authentication</h4>
                                            <p className="text-[11px] text-slate-500">Add an extra layer of security to your account.</p>
                                        </div>
                                        <button className="text-[11px] font-black text-sf-blue uppercase tracking-widest bg-sf-blue/5 border border-sf-blue/20 px-3 py-1.5 rounded hover:bg-sf-blue/10 transition-all">Enable 2FA</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'profile' && (
                            <div className="max-w-md space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                                    <input
                                        className="w-full h-10 px-4 border border-sf-border rounded focus:border-sf-blue outline-none transition-all"
                                        value={formData.full_name}
                                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                                    <input
                                        className="w-full h-10 px-4 border border-sf-border rounded bg-sf-gray/30 text-slate-500 outline-none cursor-not-allowed"
                                        value={formData.email}
                                        readOnly
                                    />
                                    <p className="text-[10px] text-slate-400">Email addresses can only be changed by an administrator.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Phone</label>
                                        <input
                                            className="w-full h-10 px-4 border border-sf-border rounded focus:border-sf-blue outline-none transition-all"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Department</label>
                                        <input
                                            className="w-full h-10 px-4 border border-sf-border rounded focus:border-sf-blue outline-none transition-all"
                                            value={formData.department}
                                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Session Token</label>
                                    <div className="flex items-center gap-2 p-3 bg-sf-gray text-[13px] font-mono text-slate-600 rounded">
                                        <span className="truncate flex-1">{profile?.id}</span>
                                        <Clock size={14} className="shrink-0" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-red-50 border-t border-red-100 mt-auto">
                        <div className="flex items-center justify-between">
                            <div>
                                <h5 className="text-[13px] font-bold text-red-700 uppercase tracking-widest">Enterprise Data Purge</h5>
                                <p className="text-[11px] text-red-600 mt-1 font-medium">Danger Zone: This will wipe all CRM records associated with your role.</p>
                            </div>
                            <button className="px-4 py-2 bg-red-600 text-white text-[12px] font-bold rounded hover:bg-red-700 transition-all flex items-center gap-2 shadow-sm">
                                <Trash2 size={14} /> Delete Environment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
