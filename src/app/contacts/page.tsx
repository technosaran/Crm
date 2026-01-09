"use client";

import React, { useState } from 'react';
import {
    User,
    Search,
    Plus,
    Mail,
    Phone,
    MapPin,
    MoreVertical,
    Filter,
    Download,
    ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const initialContacts = [
    { id: 1, name: 'Sarah Miller', title: 'CTO', company: 'Apex Systems', email: 'smiller@apex.io', phone: '+1 555-0123', location: 'San Francisco, CA' },
    { id: 2, name: 'James Wilson', title: 'VP Sales', company: 'Stark Industries', email: 'j.wilson@stark.com', phone: '+1 555-0987', location: 'New York, NY' },
    { id: 3, name: 'Elena Rodriguez', title: 'Product Manager', company: 'Skyline VC', email: 'elena@sky.vc', phone: '+1 555-0234', location: 'Austin, TX' },
    { id: 4, name: 'Marcus Wong', title: 'Managing Director', company: 'Hooli', email: 'marcus@hooli.com', phone: '+1 555-0345', location: 'Palo Alto, CA' },
    { id: 5, name: 'David Chen', title: 'Lead Architect', company: 'Wayne Ent.', email: 'd.chen@wayne.com', phone: '+1 555-0456', location: 'Gotham City' },
];

export default function ContactsPage() {
    const [contacts, setContacts] = useState(initialContacts);

    return (
        <div className="space-y-6 pb-12">
            <div className="bg-white border border-sf-border rounded-[4px] p-4 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#a094ed] h-10 w-10 shadow-lg rounded-full flex items-center justify-center text-white">
                            <User size={20} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Contacts</p>
                            <h2 className="text-[20px] font-bold text-slate-900 leading-tight flex items-center gap-2">
                                Recently Viewed <ChevronDown size={14} className="text-slate-400" />
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="sf-btn-neutral" onClick={() => toast.info("Filter sidebar coming soon")}>
                            <Filter size={14} className="mr-2" />
                            Filter
                        </button>
                        <button className="sf-btn-primary">
                            <Plus size={14} className="mr-2" />
                            New Contact
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-sf-border rounded-[4px] shadow-sm overflow-hidden">
                <div className="p-4 border-b border-sf-border bg-sf-gray/20 flex items-center justify-between">
                    <div className="text-[13px] text-slate-500 font-medium">
                        <span className="font-bold text-slate-800">5+</span> items • Sorted by Name
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 focus-within:text-sf-blue transition-colors" />
                        <input placeholder="Search contacts..." className="bg-white border border-sf-border rounded h-8 pl-10 pr-4 text-sm focus:border-sf-blue outline-none w-64 transition-all" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-[13px] border-collapse">
                        <thead className="bg-sf-gray/40 border-b border-sf-border">
                            <tr>
                                <th className="p-3 w-12 text-center"><input type="checkbox" className="rounded" /></th>
                                {['Name', 'Title', 'Account Name', 'Email', 'Phone', 'Location'].map(h => (
                                    <th key={h} className="p-3 font-bold text-slate-600 uppercase text-[11px] tracking-wider">{h}</th>
                                ))}
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sf-border/50">
                            {contacts.map((contact, idx) => (
                                <motion.tr
                                    key={contact.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="hover:bg-sf-gray/40 group transition-all"
                                >
                                    <td className="p-3 text-center"><input type="checkbox" className="rounded" /></td>
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-sf-blue/10 flex items-center justify-center text-sf-blue font-bold text-[10px]">
                                                {contact.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-bold text-sf-blue hover:underline cursor-pointer">{contact.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-slate-700 font-medium">{contact.title}</td>
                                    <td className="p-3 font-semibold text-slate-600 hover:text-sf-blue cursor-pointer">{contact.company}</td>
                                    <td className="p-3 text-sf-blue hover:underline cursor-pointer">{contact.email}</td>
                                    <td className="p-3 text-slate-500">{contact.phone}</td>
                                    <td className="p-3 text-slate-500">{contact.location}</td>
                                    <td className="p-3 text-right">
                                        <button className="p-1 px-2 hover:bg-white rounded transition-all text-slate-400"><MoreVertical size={16} /></button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
