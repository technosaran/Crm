"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    Search,
    Plus,
    Download,
    Trash2,
    MoreVertical,
    Upload,
    FolderOpen,
    Image as ImageIcon,
    FileCode,
    File as FileIcon,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const initialFiles = [
    { id: 1, name: 'Q1_Proposal_V2.pdf', type: 'PDF', size: '2.4 MB', modified: '2 hours ago', owner: 'Alex Rivera', entity: 'Stark Industries' },
    { id: 2, name: 'Enterprise_Contract.docx', type: 'DOC', size: '1.1 MB', modified: 'Yesterday', owner: 'Alex Rivera', entity: 'Pied Piper' },
    { id: 3, name: 'Product_Demo_Video.mp4', type: 'VIDEO', size: '42.8 MB', modified: 'Jan 05, 2026', owner: 'Michael Chen', entity: 'Internal' },
    { id: 4, name: 'Brand_Logo_Pack.zip', type: 'ARCHIVE', size: '12.5 MB', modified: 'Jan 02, 2026', owner: 'Sarah Jenkins', entity: 'Global Tech' },
];

export default function FilesPage() {
    const [files, setFiles] = useState(initialFiles);

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'PDF': return <FileText className="text-red-500" />;
            case 'IMAGE': return <ImageIcon className="text-blue-500" />;
            case 'VIDEO': return <FileCode className="text-purple-500" />;
            default: return <FileIcon className="text-slate-400" />;
        }
    };

    const handleUpload = () => {
        toast.info("Cloud storage provider not connected. Please check Settings.");
    };

    return (
        <div className="space-y-6 pb-12">
            <div className="bg-white border border-sf-border rounded-[4px] p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#54698d] h-12 w-12 rounded flex items-center justify-center text-white shadow-md">
                            <FolderOpen size={28} />
                        </div>
                        <div>
                            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-1">Assets</p>
                            <h1 className="text-[24px] font-bold tracking-tight text-slate-900 leading-none">Shared Drive</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="sf-btn-neutral flex items-center gap-2" onClick={handleUpload}>
                            <Upload size={14} /> Upload Local
                        </button>
                        <button className="sf-btn-primary flex items-center gap-2">
                            <Plus size={14} /> New Folder
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 bg-white border border-sf-border rounded-[4px] shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-sf-border flex items-center justify-between bg-sf-gray/20">
                        <div className="flex items-center gap-4 text-[13px] text-slate-500 font-bold uppercase tracking-tighter">
                            <span className="cursor-pointer hover:text-sf-blue">Zenith Drive</span>
                            <ChevronRight size={14} className="text-slate-300" />
                            <span className="text-slate-800">Root Directory</span>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input placeholder="Search files..." className="bg-white border border-sf-border rounded h-8 pl-9 pr-4 text-[12px] w-64 focus:border-sf-blue outline-none transition-all" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-[13px] border-collapse">
                            <thead className="bg-sf-gray/40 border-b border-sf-border">
                                <tr>
                                    <th className="p-3 w-12 text-center"><input type="checkbox" className="rounded" /></th>
                                    {['Name', 'Type', 'Size', 'Entity', 'Modified By', 'Last Modified'].map(h => (
                                        <th key={h} className="p-3 font-bold text-slate-600">{h}</th>
                                    ))}
                                    <th className="p-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-sf-border">
                                {files.map((file) => (
                                    <tr key={file.id} className="hover:bg-sf-gray/10 group transition-colors">
                                        <td className="p-3 text-center"><input type="checkbox" className="rounded" /></td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-sf-gray p-1.5 rounded">{getFileIcon(file.type)}</div>
                                                <span className="font-bold text-sf-blue hover:underline cursor-pointer">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-slate-600 font-medium">{file.type}</td>
                                        <td className="p-3 text-slate-500">{file.size}</td>
                                        <td className="p-3 font-semibold text-slate-700">{file.entity}</td>
                                        <td className="p-3 text-[12px] font-medium">@{file.owner.split(' ')[0].toLowerCase()}</td>
                                        <td className="p-3 text-slate-500">{file.modified}</td>
                                        <td className="p-3 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 hover:bg-sf-gray rounded text-slate-400 hover:text-sf-blue"><Download size={16} /></button>
                                                <button className="p-1.5 hover:bg-sf-gray rounded text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                                                <button className="p-1.5 hover:bg-sf-gray rounded text-slate-400"><MoreVertical size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="h-16 w-16 bg-sf-gray rounded-full flex items-center justify-center text-slate-300">
                            <Upload size={32} />
                        </div>
                        <div>
                            <p className="text-[14px] font-bold text-slate-800">Drag & Drop files to upload</p>
                            <p className="text-[12px] text-slate-500">Supports PDF, DOC, CSV, Image, and Archive files up to 50MB.</p>
                        </div>
                        <button className="sf-btn-neutral" onClick={handleUpload}>Select Files</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
