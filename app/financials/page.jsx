"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Financials() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Wallet State
  const [balance, setBalance] = useState(18500);
  
  // Modal states: 'none', 'release', 'tip', 'recharge'
  const [activeModal, setActiveModal] = useState("none");
  const [selectedHelperId, setSelectedHelperId] = useState("");
  const [tipAmount, setTipAmount] = useState("");
  const [processing, setProcessing] = useState(false);

  // Mock Helpers Data
  const helpers = [
    { id: "h1", name: "Rahima Begum", salary: 12000, role: "Cleaning & Cooking", avatar: "RB" },
    { id: "h2", name: "Sumona Akter", salary: 8500, role: "Laundry", avatar: "SA" },
    { id: "h3", name: "Abdul Khalil", salary: 15000, role: "Full-time Care", avatar: "AK" }
  ];

  // Mock logged in user details
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("mock_logged_in") === "true";
      setIsLoggedIn(loggedIn);
      
      if (loggedIn) {
        // Load persist balance
        const savedBalance = localStorage.getItem("wallet_balance");
        if (savedBalance !== null) {
          setBalance(parseFloat(savedBalance));
        } else {
          localStorage.setItem("wallet_balance", "18500");
        }

        setUser({
          name: "Raofun Azad",
          baseSalary: "15,000.00",
          bonus: "4,200.00",
          deduction: "700.00"
        });
      }
      setIsLoading(false);
    }
  }, []);

  // Update localStorage when balance changes
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("wallet_balance", balance.toString());
    }
  }, [balance, isLoggedIn]);

  const handleRelease = () => {
    if (!selectedHelperId) {
      alert("Please select a helper first.");
      return;
    }

    const helper = helpers.find(h => h.id === selectedHelperId);
    if (!helper) return;

    if (balance < helper.salary) {
      alert("Insufficient balance in your wallet. Please recharge first.");
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setBalance(prev => prev - helper.salary);
      setProcessing(false);
      setActiveModal("none");
      setSelectedHelperId("");
      alert(`Funds of ৳${helper.salary.toLocaleString()} released to ${helper.name} successfully!`);
    }, 1500);
  };

  const handleTip = () => {
    const amount = parseFloat(tipAmount);
    if (!selectedHelperId || !amount) {
      alert("Please select a helper and enter a valid tip amount.");
      return;
    }

    if (balance < amount) {
      alert("Insufficient balance for this tip.");
      return;
    }

    setProcessing(true);
    const helper = helpers.find(h => h.id === selectedHelperId);

    setTimeout(() => {
      setBalance(prev => prev - amount);
      setProcessing(false);
      setActiveModal("none");
      setTipAmount("");
      setSelectedHelperId("");
      alert(`Tip of ৳${amount} sent to ${helper?.name} successfully!`);
    }, 1200);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-surface flex justify-center items-center">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-surface flex flex-col justify-center items-center p-6 text-center">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl max-w-md w-full border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 text-on-surface">
          <span className="material-symbols-outlined text-[64px] text-primary/40 mb-6">lock</span>
          <h1 className="font-headline text-3xl font-extrabold mb-2 text-primary">Access Denied</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Please log in to view your secure financial dashboard and escrow balances.
            <span className="block text-[11px] mt-1 opacity-80 font-bold">আর্থিক তথ্য দেখতে অনুগ্রহ করে লগইন করুন।</span>
          </p>
          <Link href="/login">
            <button className="w-full bg-primary text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest text-xs">
              Login to Continue
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 md:py-12 pb-24 md:pb-12 bg-surface min-h-screen text-on-surface">
      <div className="mb-8">
        <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white">
          Financial Overview
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Personal wallet and escrow management for {user?.name}.
        </p>
      </div>

      <div className="space-y-8">
        {/* Hero Section: Main Wallet Balance */}
        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#006D77] to-[#004f56] p-8 md:p-12 text-white shadow-2xl shadow-primary/20">
          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#9ff0fb]" style={{fontVariationSettings: "'FILL' 1"}}>account_balance_wallet</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9ff0fb]">Total Wallet Balance / সর্বমোট ব্যালেন্স</span>
              </div>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="font-headline text-6xl font-black">৳{balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setActiveModal("release")}
                  className="bg-white text-[#006D77] px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:scale-[0.98] transition-all shadow-xl"
                >
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                  Release Salary
                </button>
                <button 
                  onClick={() => setActiveModal("tip")}
                  className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-white/20 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">stars</span>
                  Add Tip
                </button>
                <button 
                  onClick={() => setActiveModal("recharge")}
                  className="bg-[#9ff0fb] text-[#004f56] px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:brightness-110 transition-all shadow-xl"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  Recharge
                </button>
              </div>
            </div>

            <div className="hidden md:block">
               <div className="bg-white/5 backdrop-blur-sm rounded-[24px] p-8 border border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#9ff0fb] mb-6">Escrow Security Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-300">
                        <span className="material-symbols-outlined text-[20px]">verified</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold">100% Fund Protection</p>
                        <p className="text-[10px] opacity-60">তহবিল সম্পূর্ণ সুরক্ষিত</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#9ff0fb]/20 rounded-full flex items-center justify-center text-[#9ff0fb]">
                        <span className="material-symbols-outlined text-[20px]">history_edu</span>
                      </div>
                      <div>
                        <p className="text-xs font-bold">Digital Contract Active</p>
                        <p className="text-[10px] opacity-60">ডিজিটাল চুক্তি সক্রিয়</p>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
          
          {/* Decorative Background Elements */}
          <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-[#a9ece5]/20 rounded-full blur-[120px] mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </section>

        {/* Financial Breakdown Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 group hover:border-primary/20 transition-all">
            <div className="flex justify-between items-start mb-4">
               <span className="material-symbols-outlined text-primary bg-primary/5 p-3 rounded-2xl">receipt_long</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Committed</span>
            </div>
            <p className="text-slate-500 font-bold text-xs mb-1">Estimated Salaries / আনুমানিক বেতন</p>
            <h3 className="font-headline text-3xl font-black text-slate-800 dark:text-white">৳ 35,500.00</h3>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 border-l-4 border-l-green-500 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
               <span className="material-symbols-outlined text-green-600 bg-green-500/10 p-3 rounded-2xl">trending_up</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-green-600">This Month</span>
            </div>
            <p className="text-slate-500 font-bold text-xs mb-1">Performance Bonus / পারফরম্যান্স বোনাস</p>
            <h3 className="font-headline text-3xl font-black text-green-600">+ ৳ 4,200.00</h3>
          </div>
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 border-l-4 border-l-red-500 hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
               <span className="material-symbols-outlined text-red-600 bg-red-500/10 p-3 rounded-2xl">event_busy</span>
               <span className="text-[10px] font-black uppercase tracking-widest text-red-600">Adjustments</span>
            </div>
            <p className="text-slate-500 font-bold text-xs mb-1">Salary Deductions / বেতন কর্তন</p>
            <h3 className="font-headline text-3xl font-black text-red-600">- ৳ 700.00</h3>
          </div>
        </section>

        {/* Transaction History Mock */}
        <div className="bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-headline text-2xl font-black text-slate-800 dark:text-white">Recent Transactions</h2>
            <button className="text-xs font-black uppercase tracking-[0.15em] text-primary hover:underline">View All History</button>
          </div>
          <div className="space-y-4">
            {[
              { id: "T1", type: "Release", name: "Rahima Begum", amt: "-৳12,000", date: "July 01", icon: "outbound" },
              { id: "T2", type: "Recharge", name: "Bkash Top-up", amt: "+৳15,000", date: "June 28", icon: "account_balance" },
              { id: "T3", type: "Tip", name: "Sumona Akter", amt: "-৳500", date: "June 25", icon: "stars" }
            ].map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/40 rounded-[20px] transition-all hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${txn.amt.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-slate-200 text-slate-600'}`}>
                    <span className="material-symbols-outlined text-[20px]">{txn.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">{txn.name}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{txn.type} • {txn.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-headline text-lg font-black ${txn.amt.startsWith('+') ? 'text-green-600' : 'text-slate-800 dark:text-slate-200'}`}>{txn.amt}</p>
                  <p className="text-[10px] text-slate-400 font-bold">Successful</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODALS LAYER */}
      {(activeModal !== "none") && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => !processing && setActiveModal("none")}
          ></div>
          
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[32px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 fade-in duration-300 border border-white/20">
            
            {/* 1. RELEASE SALARY MODAL */}
            {activeModal === "release" && (
              <div className="p-10">
                <div className="w-16 h-16 bg-primary/10 rounded-[20px] flex items-center justify-center mb-8 text-primary shadow-inner">
                  <span className="material-symbols-outlined text-[32px]">payments</span>
                </div>
                <h3 className="font-headline text-2xl font-extrabold mb-4 text-slate-900 dark:text-white">Release Monthly Salary</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium">
                  Select a helper to release their monthly payment directly to their wallet.
                </p>

                <div className="space-y-3 mb-8">
                  {helpers.map(helper => (
                    <button 
                      key={helper.id}
                      onClick={() => setSelectedHelperId(helper.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all block ${selectedHelperId === helper.id ? 'border-primary bg-primary/5 ring-4 ring-primary/10' : 'border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100'}`}
                    >
                      <div className="flex items-center gap-4 text-left">
                         <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center font-black text-primary border border-slate-200 dark:border-slate-700">
                          {helper.avatar}
                         </div>
                         <div>
                            <p className="font-black text-xs text-slate-800 dark:text-white uppercase tracking-tight">{helper.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold">{helper.role}</p>
                         </div>
                      </div>
                      <p className="font-headline font-black text-primary text-sm">৳{helper.salary.toLocaleString()}</p>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button 
                    disabled={processing}
                    onClick={() => setActiveModal("none")}
                    className="flex-1 py-4 font-black uppercase tracking-widest text-xs text-slate-400 bg-slate-50 dark:bg-slate-800 rounded-2xl"
                  >
                    Cancel
                  </button>
                  <button 
                    disabled={processing || !selectedHelperId}
                    onClick={handleRelease}
                    className="flex-1 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {processing ? <span className="material-symbols-outlined animate-spin text-[18px]">refresh</span> : "Confirm Release"}
                  </button>
                </div>
              </div>
            )}

            {/* 2. ADD TIP MODAL */}
            {activeModal === "tip" && (
              <div className="p-10">
                <div className="flex justify-between items-center mb-8">
                   <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-2.5 rounded-xl">star_rate</span>
                    <h3 className="font-headline text-2xl font-extrabold text-slate-900 dark:text-white">Give an Extra Tip</h3>
                   </div>
                   <button onClick={() => !processing && setActiveModal("none")} className="text-slate-400 hover:text-slate-600">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                {/* Step 1: Select Helper */}
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">1. Choose Helper</p>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {helpers.map(helper => (
                    <button 
                      key={helper.id}
                      onClick={() => setSelectedHelperId(helper.id)}
                      className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${selectedHelperId === helper.id ? 'border-primary bg-primary/5' : 'border-slate-50 dark:border-slate-800'}`}
                    >
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-black text-[10px] text-primary">
                        {helper.avatar}
                      </div>
                      <span className="text-[9px] font-black text-center leading-tight uppercase tracking-tight">{helper.name.split(' ')[0]}</span>
                    </button>
                  ))}
                </div>

                {/* Step 2: Select Amount */}
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 ml-1">2. Tip Amount</p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {["100", "200", "500"].map(amt => (
                    <button 
                      key={amt}
                      onClick={() => setTipAmount(amt)}
                      className={`py-3 rounded-xl font-black text-xs border-2 transition-all ${tipAmount === amt ? 'border-primary bg-primary/5 text-primary' : 'border-slate-50 dark:border-slate-800 text-slate-400'}`}
                    >
                      ৳{amt}
                    </button>
                  ))}
                </div>
                
                <input 
                  type="number"
                  placeholder="Custom Amount"
                  value={tipAmount}
                  onChange={(e) => setTipAmount(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-50 dark:border-slate-800 rounded-2xl px-6 py-4 mb-8 outline-none focus:border-primary transition-all text-xl font-black"
                />

                <button 
                  disabled={processing || !tipAmount || !selectedHelperId}
                  onClick={handleTip}
                  className="w-full py-5 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {processing ? <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span> : `Send ৳${tipAmount || '0'} Tip Now`}
                </button>
              </div>
            )}

            {/* 3. RECHARGE MODAL (Setup Placeholder) */}
            {activeModal === "recharge" && (
              <div className="p-10 text-center">
                <div className="relative w-24 h-24 mx-auto mb-8">
                   <div className="absolute inset-0 bg-[#9ff0fb]/20 rounded-full animate-ping opacity-50"></div>
                   <div className="relative w-full h-full bg-white dark:bg-slate-900 border-4 border-primary/10 rounded-[28px] flex items-center justify-center text-primary shadow-xl">
                    <span className="material-symbols-outlined text-[48px]" style={{fontVariationSettings: "'FILL' 1"}}>account_balance</span>
                   </div>
                </div>
                <h3 className="font-headline text-3xl font-black mb-4 text-slate-900 dark:text-white">Payment Setup</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed font-medium px-4">
                  We are finalizing the <strong className="text-primary font-black uppercase tracking-widest text-[10px]">SSLCommerz</strong> integration to enable credit card, BKash, and Nagad recharges.
                </p>
                <div className="bg-[#f0f9fa] dark:bg-slate-800/80 border border-primary/20 p-6 rounded-[24px] mb-8 flex items-start gap-4 text-left">
                  <span className="material-symbols-outlined text-primary text-[24px]">contact_support</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal font-bold">
                    Need instant top-up? Email <span className="text-primary hover:underline">ops@bualagbe.com</span> or call our helpline for manual balance credit.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveModal("none")}
                  className="w-full py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-black uppercase tracking-[0.2em] text-xs rounded-[20px] hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  Got it, thanks!
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </main>
  );
}
