"use client";

import { StatCards } from "@/components/dashboard/StatCards";
import { KanbanView } from "@/components/crm/KanbanView";
import { AuditTrail } from "@/components/shared/AuditTrail";
import { motion } from "framer-motion";
import {
  Calendar,
  Download,
  Globe,
  TrendingUp,
  PieChart,
  Target,
  Plus,
  ChevronRight,
  MoreVertical,
  Briefcase
} from "lucide-react";
import { useGlobalStore } from "@/store/useGlobalStore";
import { formatDate, cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export default function Dashboard() {
  const { locale, timeZone } = useGlobalStore();
  const { user, hasPermission } = useAuth();

  const handleExport = () => {
    if (!hasPermission('EXPORT_DATA')) {
      toast.error("You don't have permission to export data.");
      return;
    }
    toast.success("Preparing executive report... Check your notifications.");
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Executive Command Header */}
      <div className="bg-slate-900 text-white rounded-[4px] shadow-2xl relative overflow-hidden group">
        {/* Abstract background pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sf-blue/20 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sf-blue/10 rounded-full blur-3xl" />

        <div className="relative p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-sf-blue to-indigo-600 flex items-center justify-center text-3xl font-bold shadow-[0_0_30px_rgba(1,118,211,0.5)] ring-4 ring-white/10">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1 uppercase tracking-tighter">
                  <TrendingUp size={10} /> Active Session
                </span>
                <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest">• {timeZone}</span>
              </div>
              <h1 className="text-[32px] font-bold tracking-tight text-white leading-none">
                Good Afternoon, {user.name.split(' ')[0]}
              </h1>
              <p className="text-white/60 text-[14px] mt-2 font-medium max-w-md">
                Sales production is up <span className="text-emerald-400 font-bold">14.2%</span> this month. You have <span className="text-sf-blue font-bold">3 VIP opportunities</span> closing this week.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-8 mr-8">
              <div className="text-center">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Quota Attainment</p>
                <p className="text-[20px] font-bold">84%</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="text-center">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-1">Open Pipe</p>
                <p className="text-[20px] font-bold text-sf-blue">$4.2M</p>
              </div>
            </div>
            <button className="sf-btn-primary px-6 h-11 flex items-center gap-2" onClick={handleExport}>
              <Download size={16} /> Export View
            </button>
          </div>
        </div>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Pipeline Section */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white border border-sf-border rounded-[4px] p-6 shadow-sm overflow-hidden relative group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm transition-transform group-hover:scale-110">
                  <Target size={20} />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-slate-900">High-Velocity Pipeline</h3>
                  <p className="text-[12px] text-slate-500">Live opportunity distribution across stages.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-sf-gray rounded text-slate-400"><Calendar size={16} /></button>
                <button className="p-2 hover:bg-sf-gray rounded text-slate-400"><MoreVertical size={16} /></button>
              </div>
            </div>
            <KanbanView />
          </div>

          {/* Recent Activity / Strategy Widget */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="sf-card p-6">
              <h3 className="text-[15px] font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Plus className="text-sf-blue" size={18} /> Recent Records
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Global Expansion', account: 'Stark Industries', value: '$120k', type: 'Opportunity' },
                  { title: 'Sarah Miller', account: 'Apex Systems', value: 'Working', type: 'Lead' },
                  { title: 'Hooli Cloud', account: 'Hooli', value: '$250k', type: 'Opportunity' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border border-sf-border/50 rounded hover:border-sf-blue hover:bg-sf-blue/5 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-8 w-8 rounded flex items-center justify-center text-xs font-bold",
                        item.type === 'Lead' ? "bg-orange-100 text-orange-600" : "bg-indigo-100 text-indigo-600"
                      )}>
                        {item.type[0]}
                      </div>
                      <div>
                        <p className="text-[13px] font-bold text-slate-800">{item.title}</p>
                        <p className="text-[11px] text-slate-500">{item.account}</p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-sf-blue" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[4px] p-6 shadow-xl relative overflow-hidden group text-white">
              <div className="absolute top-0 right-0 p-4 opacity-10 transition-transform group-hover:scale-125">
                <Briefcase size={80} />
              </div>
              <div className="relative">
                <h3 className="text-[17px] font-bold mb-2">Strategy Hub</h3>
                <p className="text-indigo-200 text-[12px] mb-6 max-w-[200px]">New insights generated by Zenith Core specifically for your regional node.</p>
                <button className="w-full bg-white/10 hover:bg-white/20 h-10 rounded text-[12px] font-bold uppercase tracking-widest border border-white/20 transition-all">
                  View Insights
                </button>
                <div className="mt-8 flex items-end gap-1">
                  {[30, 60, 45, 90, 65, 80, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-white/20 rounded-t-[1px] hover:bg-white transition-colors cursor-help" style={{ height: `${h}px` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <AuditTrail />

          <div className="sf-card p-6 border-t-4 border-t-sf-blue">
            <h3 className="text-[15px] font-bold text-slate-900 mb-6 flex items-center gap-2">
              <PieChart className="text-sf-blue" size={18} /> Regional Pipeline
            </h3>
            <div className="space-y-6">
              {[
                { region: 'Northern Europe', achieved: '85%', color: 'bg-sf-blue' },
                { region: 'North America', achieved: '62%', color: 'bg-indigo-500' },
                { region: 'Asia-Pacific', achieved: '94%', color: 'bg-emerald-500' },
              ].map((reg, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-[11px] mb-2 font-bold uppercase tracking-tight">
                    <span className="text-slate-600">{reg.region}</span>
                    <span className="text-slate-400">{reg.achieved}</span>
                  </div>
                  <div className="h-1.5 w-full bg-sf-gray rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: reg.achieved }}
                      transition={{ delay: 0.5 + (idx * 0.1), duration: 1 }}
                      className={cn("h-full", reg.color)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-sf-gray/50 hover:bg-sf-gray text-[12px] font-bold text-sf-blue rounded transition-all">
              Configure Regional Nodes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
