"use client";

import { AccountGrid } from "@/components/accounts/AccountGrid";
import { AccountModal } from "@/components/accounts/AccountModal";
import { useAccounts } from "@/hooks/useAccounts";
import { motion } from "framer-motion";
import { Search, Plus, Filter, Download, Settings, ChevronDown, List, Grid, RefreshCw, Trash2 } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function AccountsPage() {
    const { accounts, loading, createAccount, updateAccount, deleteAccounts, refresh } = useAccounts();
    
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState<typeof accounts[0] | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>('all');

    // Filter accounts
    const filteredAccounts = useMemo(() => {
        let result = accounts;
        
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(a => 
                a.name.toLowerCase().includes(query) ||
                a.industry?.toLowerCase().includes(query) ||
                a.billing_city?.toLowerCase().includes(query)
            );
        }
        
        if (typeFilter !== 'all') {
            result = result.filter(a => a.type === typeFilter);
        }
        
        return result;
    }, [accounts, searchQuery, typeFilter]);

    const handleExport = () => {
        toast.success("Accounts data export started...");
    };

    const handleAccountClick = (account: typeof accounts[0]) => {
        setEditingAccount(account);
        setIsModalOpen(true);
    };

    const handleNewAccount = () => {
        setEditingAccount(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (data: Partial<typeof accounts[0]>) => {
        if (editingAccount) {
            return await updateAccount(editingAccount.id, data);
        } else {
            return await createAccount(data);
        }
    };

    const handleDelete = async (ids: string[]) => {
        await deleteAccounts(ids);
        setSelectedIds([]);
    };

    return (
        <div className="space-y-6 pb-12">
            <div className="bg-white border border-sf-border rounded-[4px] p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#7F8DE1] h-12 w-12 rounded flex items-center justify-center text-white shadow-md flex-shrink-0">
                            <Grid size={28} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-1">Accounts</p>
                            <h1 className="text-xl sm:text-[24px] font-bold tracking-tight text-slate-900 leading-none">
                                All Accounts
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={refresh}
                            className="sf-btn-neutral"
                            disabled={loading}
                        >
                            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                        </button>
                        <div className="flex border border-sf-border rounded-[4px] overflow-hidden bg-white">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={cn(
                                    "p-2 transition-all",
                                    viewMode === 'grid' ? "bg-sf-blue text-white" : "text-slate-500 hover:bg-sf-gray"
                                )}
                            >
                                <Grid size={16} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={cn(
                                    "p-2 border-l border-sf-border transition-all",
                                    viewMode === 'list' ? "bg-sf-blue text-white" : "text-slate-500 hover:bg-sf-gray"
                                )}
                            >
                                <List size={16} />
                            </button>
                        </div>
                        <button className="sf-btn-neutral" onClick={handleExport}>
                            <Download size={14} />
                        </button>
                        <button onClick={handleNewAccount} className="sf-btn-primary flex items-center gap-2">
                            <Plus size={14} />
                            New Account
                        </button>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 pt-6 border-t border-sf-border text-[13px] text-slate-500 gap-4">
                    <div className="flex items-center gap-4 flex-wrap">
                        <span><span className="font-bold text-slate-800">{filteredAccounts.length}</span> items</span>
                        <div className="h-4 w-px bg-sf-border hidden sm:block" />
                        <select
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            className="bg-white border border-sf-border rounded h-8 px-3 text-[12px] outline-none focus:border-sf-blue"
                        >
                            <option value="all">All Types</option>
                            <option value="CUSTOMER">Customer</option>
                            <option value="PROSPECT">Prospect</option>
                            <option value="PARTNER">Partner</option>
                            <option value="VENDOR">Vendor</option>
                            <option value="COMPETITOR">Competitor</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <div className="relative group w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-sf-blue transition-colors" />
                        <input
                            placeholder="Search accounts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-sf-gray border border-sf-border pl-10 pr-4 py-1.5 rounded h-8 text-sm focus:bg-white focus:border-sf-blue outline-none w-full sm:w-64 transition-all"
                        />
                    </div>
                </div>
            </div>

            <AccountGrid
                accounts={filteredAccounts}
                loading={loading}
                onAccountClick={handleAccountClick}
                onDelete={handleDelete}
                selectedIds={selectedIds}
                onSelectionChange={setSelectedIds}
                viewMode={viewMode}
            />

            <AccountModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingAccount(null);
                }}
                account={editingAccount}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
