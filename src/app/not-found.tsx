"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Home, ChevronLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-6 max-w-md"
            >
                <div className="bg-sf-blue/10 h-24 w-24 rounded-full flex items-center justify-center text-sf-blue mx-auto mb-8 shadow-inner">
                    <Search size={48} />
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">Record Not Found</h1>
                <p className="text-slate-500 text-lg">
                    We couldn't find the record or page you're looking for. It might have been deleted, moved, or you might not have the right permissions.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
                    <Link href="/" className="sf-btn-primary flex items-center gap-2 w-full sm:w-auto px-8">
                        <Home size={16} /> Go to Dashboard
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="sf-btn-neutral flex items-center gap-2 w-full sm:w-auto px-8"
                    >
                        <ChevronLeft size={16} /> Go Back
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
