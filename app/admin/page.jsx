"use client";

import { useState, useEffect } from "react";

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const adminId = localStorage.getItem("userId");
      try {
        const res = await fetch(`/api/admin/stats?adminId=${adminId}`);
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
          setRecentTransactions(data.recentTransactions);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { name: "Total Users", value: stats?.totalUsers + stats?.totalAdmins, icon: "person", color: "blue", change: "+12%" },
    { name: "Active Helpers", value: stats?.totalHelpers, icon: "groups", color: "emerald", change: "+4%" },
    { name: "Platform Reserve", value: `৳${stats?.platformBalance.toLocaleString()}`, icon: "account_balance_wallet", color: "amber", change: "Steady" },
    { name: "Total Admins", value: stats?.totalAdmins, icon: "shield_person", color: "purple", change: "Locked" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl bg-${card.color}-50 text-${card.color}-600 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-[24px]">{card.icon}</span>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                card.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'
              }`}>
                {card.change}
              </span>
            </div>
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.15em] mb-1">{card.name}</p>
            <h3 className="text-3xl font-headline font-black text-slate-900 tracking-tighter">{card.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {}
        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 p-10 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="font-headline text-xl font-black text-slate-900">Recent Activity</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time ledger entries</p>
            </div>
            <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">View All Records</button>
          </div>

          <div className="space-y-1">
            {recentTransactions.map((tx, i) => (
              <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-colors group">
                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                   tx.type === 'Recharge' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                 }`}>
                   <span className="material-symbols-outlined text-[20px]">
                     {tx.type === 'Recharge' ? 'add_circle' : 'payments'}
                   </span>
                 </div>
                 <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-slate-900 truncate">{tx.description}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">
                      BY {tx.userId?.name || 'System User'} • {new Date(tx.date).toLocaleDateString()}
                    </p>
                 </div>
                 <div className="text-right">
                    <p className={`font-headline font-black ${
                      tx.type === 'Recharge' ? 'text-green-600' : 'text-slate-900'
                    }`}>
                      {tx.type === 'Recharge' ? '+' : '-'}৳{tx.amount?.toLocaleString()}
                    </p>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Escrow Sync</p>
                 </div>
              </div>
            ))}
            {recentTransactions.length === 0 && (
              <div className="py-20 text-center text-slate-400">
                <span className="material-symbols-outlined text-[48px] opacity-20 block mb-4">history</span>
                <p className="text-sm font-bold uppercase tracking-widest">No recent transactions</p>
              </div>
            )}
          </div>
        </div>

        {}
        <div className="space-y-6">
           <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-sm">
              <h4 className="font-headline text-lg font-black text-slate-900 mb-6">System Health</h4>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                       <span className="text-slate-400">Server Load</span>
                       <span className="text-primary">12%</span>
                    </div>
                    <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                       <div className="h-full bg-primary w-[12%] rounded-full"></div>
                    </div>
                 </div>
                 <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                       <span className="text-slate-400">Storage</span>
                       <span className="text-amber-500">45%</span>
                    </div>
                    <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                       <div className="h-full bg-amber-500 w-[45%] rounded-full"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
