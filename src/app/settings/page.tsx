"use client";

import React, { useState } from 'react';
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
    ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Settings() {
    const [activeSection, setActiveSection] = useState('profile');

    const menuItems = [
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'roles', label: 'Roles & Permissions', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'i18n', label: 'Region & Currency', icon: Globe },
        { id: 'security', label: 'Security & SSO', icon: Key },
        { id: 'integrations', label: 'API & Webhooks', icon: Webhook },
        { id: 'data', label: 'Data Management', icon: Database },
    ];

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
                        <button className="sf-btn-primary" onClick={() => toast.success('Settings updated successfully')}>Save Changes</button>
                    </div>

                    <div className="p-8 flex-1">
                        {activeSection === 'roles' && (
                            <div className="space-y-8">
                                <div className="p-4 bg-sf-blue/5 border border-sf-blue/20 rounded-lg flex items-start gap-4">
                                    <Shield className="text-sf-blue shrink-0" size={24} />
                                    <div>
                                        <h4 className="text-[14px] font-bold text-slate-900">Enterprise Access Control</h4>
                                        <p className="text-[12px] text-slate-600 mt-1">
                                            Assign permissions based on job functions. Changes are logged in the System Audit Trail.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {['Admin', 'Manager', 'Sales Representative', 'Support Specialist'].map((role) => (
                                        <div key={role} className="flex items-center justify-between p-4 border border-sf-border rounded hover:bg-sf-gray/20 transition-all cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="h-2 w-2 rounded-full bg-sf-blue" />
                                                <span className="text-[14px] font-bold text-slate-700">{role}</span>
                                            </div>
                                            <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <span className="text-[11px] text-slate-400">12 users assigned</span>
                                                <ArrowRight size={16} className="text-sf-blue" />
                                            </div>
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
                                                <span className="text-[13px] font-bold">Gmail Context Service</span>
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
                                    <h4 className="text-[14px] font-bold text-slate-900">API Documentation</h4>
                                    <div className="p-4 bg-slate-900 rounded-lg font-mono text-[12px] text-emerald-400">
                                        POST /api/v1/leads <br />
                                        <span className="text-slate-500"># Authenticate with Bearer token</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'profile' && (
                            <div className="max-w-md space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                                    <input className="w-full h-10 px-4 border border-sf-border rounded focus:border-sf-blue outline-none" defaultValue="Alex Rivera" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                                    <input className="w-full h-10 px-4 border border-sf-border rounded focus:border-sf-blue outline-none" defaultValue="alex@zenith.ai" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Workstation ID</label>
                                    <div className="flex items-center gap-2 p-3 bg-sf-gray text-[13px] font-mono text-slate-600 rounded">
                                        ZEN-98234-AX <Clock size={14} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6 bg-red-50 border-t border-red-100 mt-auto">
                        <div className="flex items-center justify-between">
                            <div>
                                <h5 className="text-[13px] font-bold text-red-700">Enterprise Data Purge</h5>
                                <p className="text-[11px] text-red-600">Wipe all CRM records. This action cannot be undone.</p>
                            </div>
                            <button className="px-4 py-2 bg-red-600 text-white text-[12px] font-bold rounded hover:bg-red-700 transition-all flex items-center gap-2">
                                <Trash2 size={14} /> Delete Environment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
