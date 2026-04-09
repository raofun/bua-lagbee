"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("mock_logged_in") === "true";
      const userRole = localStorage.getItem("mock_user_role");
      
      if (loggedIn && userRole === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface flex justify-center items-center">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-surface flex flex-col justify-center items-center p-6 text-center">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl max-w-md w-full border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4">
          <span className="material-symbols-outlined text-[64px] text-red-500/40 mb-6">admin_panel_settings</span>
          <h1 className="font-headline text-3xl font-extrabold text-slate-900 dark:text-white mb-2">Admin Only</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            This area is restricted to system administrators. Please login with an admin account to proceed.
            <span className="block text-[11px] mt-1 opacity-80">এই এলাকাটি শুধুমাত্র অ্যাডমিনদের জন্য।</span>
          </p>
          <Link href="/login">
            <button className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all">
              Login as Admin
            </button>
          </Link>
          <Link href="/" className="block mt-4 text-xs font-bold text-slate-400 hover:text-primary transition-colors">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 md:py-12 pb-24 md:pb-12 bg-surface min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-primary">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">System-wide performance and management metrics.</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl border border-primary/20 flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span className="text-xs font-bold uppercase tracking-widest">Master Admin Mode</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Stats Cards */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
           <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-blue-600 bg-blue-100 p-2.5 rounded-xl">group</span>
              <span className="text-xs font-bold text-green-500">+12%</span>
           </div>
           <p className="text-slate-500 font-bold text-xs uppercase tracking-tight">Total Users</p>
           <h3 className="font-headline text-2xl font-black text-slate-900 dark:text-white">1,284</h3>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
           <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-cyan-600 bg-cyan-100 p-2.5 rounded-xl">person_search</span>
              <span className="text-xs font-bold text-green-500">+5%</span>
           </div>
           <p className="text-slate-500 font-bold text-xs uppercase tracking-tight">Verified Helpers</p>
           <h3 className="font-headline text-2xl font-black text-slate-900 dark:text-white">452</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
           <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-green-600 bg-green-100 p-2.5 rounded-xl">payments</span>
              <span className="text-xs font-bold text-green-500">+22%</span>
           </div>
           <p className="text-slate-500 font-bold text-xs uppercase tracking-tight">System Revenue</p>
           <h3 className="font-headline text-2xl font-black text-slate-900 dark:text-white">৳ 124,500</h3>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
           <div className="flex justify-between items-start mb-4">
              <span className="material-symbols-outlined text-red-600 bg-red-100 p-2.5 rounded-xl">report_problem</span>
              <span className="text-xs font-bold text-red-500">8 High</span>
           </div>
           <p className="text-slate-500 font-bold text-xs uppercase tracking-tight">Open Disputes</p>
           <h3 className="font-headline text-2xl font-black text-slate-900 dark:text-white">24</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Verification Queue */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-xl font-extrabold text-slate-900 dark:text-white">Verification Queue</h2>
            <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { id: 1, name: "Sumona Begum", type: "Helper", date: "20m ago", status: "Pending" },
              { id: 2, name: "Abdul Khalil", type: "Helper", date: "1h ago", status: "Pending" },
              { id: 3, name: "Fatima Akter", type: "Employer", date: "3h ago", status: "In-Review" }
            ].map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-primary/20 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center font-bold text-primary shadow-sm border border-slate-100 dark:border-slate-700">
                    {item.name.split(' ')[0][0]}{item.name.split(' ')[1][0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{item.type} • {item.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>
                    {item.status}
                  </span>
                  <button className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Security Activity */}
        <div className="lg:col-span-4 bg-[#f1f5f9] dark:bg-slate-800/20 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 flex flex-col">
          <h2 className="font-headline text-lg font-extrabold text-[#0f172a] dark:text-white mb-6">Security Logs</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0 animate-pulse"></div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Suspicious Login Detected</p>
                <p className="text-xs text-slate-500 mt-0.5">IP: 103.45.12.XXX • Banani, Dhaka</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">System Backup Complete</p>
                <p className="text-xs text-slate-500 mt-0.5">Successful nightly sync to cloud storage</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">KYC Policy Updated</p>
                <p className="text-xs text-slate-500 mt-0.5">By Admin @raofunazad • 4h ago</p>
              </div>
            </div>
          </div>
          <button className="mt-8 w-full py-3 bg-white dark:bg-slate-900 rounded-xl text-xs font-black uppercase tracking-widest text-[#0f172a] dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm">
            View Full Audit Trail
          </button>
        </div>
      </div>
    </main>
  );
}
