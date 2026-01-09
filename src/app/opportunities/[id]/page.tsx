"use client";

import { SalesPipeline } from "@/components/crm/SalesPipeline";
import { ChevronLeft, Share2, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OpportunityDetail() {
    return (
        <div className="space-y-4 pb-12">
            {/* Context Breadcrumb */}
            <div className="flex items-center justify-between px-1">
                <Link
                    href="/opportunities"
                    className="flex items-center gap-1 text-[13px] font-bold text-sf-blue hover:underline"
                >
                    <ChevronLeft size={16} /> Back to Pipeline
                </Link>
                <div className="flex items-center gap-2">
                    <button className="sf-btn-neutral flex items-center gap-2"><Share2 size={14} /> Share</button>
                    <button className="sf-btn-neutral"><MoreHorizontal size={14} /></button>
                </div>
            </div>

            <SalesPipeline />
        </div>
    );
}
