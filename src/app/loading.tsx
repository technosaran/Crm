"use client";

import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed top-[90px] left-0 right-0 z-[100]">
            <div className="h-1 w-full bg-sf-gray overflow-hidden">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear",
                    }}
                    className="h-full w-1/3 bg-sf-blue shadow-[0_0_10px_#0176D3]"
                />
            </div>
            <div className="p-8 space-y-8 animate-pulse">
                <div className="h-12 w-1/4 bg-slate-200 rounded-md" />
                <div className="grid grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-32 bg-slate-100 rounded-lg" />
                    ))}
                </div>
                <div className="h-64 bg-slate-50 rounded-xl" />
            </div>
        </div>
    );
}
