"use client";

import React from 'react';
import {
    Building2,
    Users,
    MapPin,
    Globe,
    MoreHorizontal,
    ExternalLink,
    TrendingUp,
    Phone,
    Mail,
    Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const accounts = [
    { id: 1, name: 'Stark Industries', industry: 'Aerospace & Defense', size: '10,000+', location: 'Malibu, CA', website: 'stark.com', deals: 4, value: '$2.4M', owner: 'Alex Rivera' },
    { id: 2, name: 'Wayne Enterprises', industry: 'Diversified', size: '5,000+', location: 'Gotham City', website: 'wayne.com', deals: 2, value: '$1.2M', owner: 'Michael Chen' },
    { id: 3, name: 'Cyberdyne Systems', industry: 'Robotics', size: '1,000+', location: 'Sunnyvale, CA', website: 'cyberdyne.io', deals: 1, value: '$450k', owner: 'Alex Rivera' },
    { id: 4, name: 'Oscorp', industry: 'Genetics', size: '2,500+', location: 'New York, NY', website: 'oscorp.biz', deals: 6, value: '$3.8M', owner: 'Sarah Jenkins' },
    { id: 5, name: 'Hooli', industry: 'Technology', size: '25,000+', location: 'Palo Alto, CA', website: 'hooli.com', deals: 3, value: '$900k', owner: 'Alex Rivera' },
    { id: 6, name: 'Pied Piper', industry: 'Cloud Computing', size: '15+', location: 'Palo Alto, CA', website: 'piedpiper.com', deals: 1, value: '$150k', owner: 'Michael Chen' },
];

export function AccountGrid() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {accounts.map((account, idx) => (
                <motion.div
                    key={account.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white border border-sf-border rounded-[4px] p-5 shadow-sm hover:border-sf-blue transition-all"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="h-10 w-10 rounded bg-[#7F8DE1] flex items-center justify-center text-white shadow-sm">
                            <Building2 size={20} />
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1.5 text-slate-400 hover:text-sf-blue hover:bg-sf-gray rounded transition-all">
                                <Phone size={14} />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-sf-blue hover:bg-sf-gray rounded transition-all">
                                <Mail size={14} />
                            </button>
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-sf-gray rounded transition-all">
                                <MoreHorizontal size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-[16px] font-bold text-slate-900 group-hover:text-sf-blue transition-colors cursor-pointer flex items-center gap-2">
                            {account.name}
                            <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-[12px] text-slate-500 font-medium mt-0.5">
                            {account.industry} • {account.location}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-sf-border">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Account Value</p>
                            <p className="text-[13px] font-bold text-emerald-600 flex items-center gap-1">
                                <TrendingUp size={12} />
                                {account.value}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Owner</p>
                            <div className="flex items-center gap-1.5">
                                <div className="h-4 w-4 rounded-full bg-sf-blue/10 flex items-center justify-center text-[8px] font-bold text-sf-blue">
                                    {account.owner.charAt(0)}
                                </div>
                                <p className="text-[12px] font-semibold text-slate-700">{account.owner}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex items-center gap-4 text-[11px] text-slate-500">
                        <div className="flex items-center gap-1">
                            <Users size={12} className="text-slate-300" />
                            {account.size}
                        </div>
                        <div className="h-1 w-1 rounded-full bg-slate-300" />
                        <div className="flex items-center gap-1">
                            <Globe size={12} className="text-slate-300" />
                            {account.website}
                        </div>
                    </div>
                </motion.div>
            ))}

            <button className="flex flex-col items-center justify-center gap-3 rounded-[4px] border-2 border-dashed border-sf-border p-6 text-slate-400 hover:border-sf-blue hover:text-sf-blue transition-all bg-sf-gray/20 group h-full min-h-[180px]">
                <Plus size={24} />
                <div className="text-center">
                    <p className="text-[14px] font-bold">New Account</p>
                    <p className="text-[11px]">Add a corporate entity</p>
                </div>
            </button>
        </div>
    );
}
