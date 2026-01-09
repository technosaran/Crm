"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";
import { Sidebar } from "./Sidebar"; // Import Sidebar
import { CommandMenu } from "./CommandMenu";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

import { AIAssistant } from "@/components/shared/AIAssistant";

export function Shell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";

    if (isLoginPage) {
        return (
            <>
                <Toaster position="top-right" richColors />
                <main className="min-h-screen">
                    {children}
                </main>
            </>
        );
    }

    return (
        <div className="flex min-h-screen bg-zenith-bg">
            {/* Sidebar (Fixed/Sticky behavior handled by its own styles or flex) */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <Navigation />
                <CommandMenu />
                <AIAssistant />
                <Toaster position="top-right" richColors />
                <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
