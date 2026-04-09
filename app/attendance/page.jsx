"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LoginPromptModal from "../components/LoginPromptModal";

export default function Attendance() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedChores, setSelectedChores] = useState([]);
  const [days, setDays] = useState(1);
  const [preferredTime, setPreferredTime] = useState("Morning");
  const [bookingStep, setBookingStep] = useState("selection"); // selection, matching, confirmed
  const [selectedHelper, setSelectedHelper] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Chore Definitions
  const chores = [
    { id: "cook", name: "Cooking", bn: "রান্না করা", rate: 250, icon: "restaurant" },
    { id: "clean", name: "Cleaning", bn: "ঘর পরিষ্কার", rate: 150, icon: "mop" },
    { id: "laundry", name: "Laundry", bn: "কাপড় ধোয়া", rate: 200, icon: "local_laundry_service" },
    { id: "grocery", name: "Grocery", bn: "বাজার করা", rate: 100, icon: "shopping_basket" },
    { id: "baby", name: "Baby Care", bn: "শিশু যত্ন", rate: 400, icon: "child_care" },
  ];

  // Mock Available Helpers
  const helpers = [
    { id: "h1", name: "Mst. Salma Begum", rating: 4.9, shift: "Morning", hours: "8 AM - 12 PM", phone: "+880 1711-223344", exp: "5 years", jobs: 124 },
    { id: "h2", name: "Fatema Khatun", rating: 4.7, shift: "Afternoon", hours: "1 PM - 5 PM", phone: "+880 1822-334455", exp: "3 years", jobs: 89 },
    { id: "h3", name: "Kulsum Bibi", rating: 4.8, shift: "Evening", hours: "6 PM - 10 PM", phone: "+880 1933-445566", exp: "4 years", jobs: 112 },
    { id: "h4", name: "Rahima Aktar", rating: 4.6, shift: "Morning", hours: "7 AM - 11 AM", phone: "+880 1744-556677", exp: "2 years", jobs: 45 },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("mock_logged_in") === "true");
    }
  }, []);

  const toggleChore = (id) => {
    setSelectedChores((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const dailyTotal = chores
      .filter((c) => selectedChores.includes(c.id))
      .reduce((sum, c) => sum + c.rate, 0);
    return dailyTotal * days;
  };

  const handleInitialConfirm = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    if (selectedChores.length === 0) {
      alert("Please select at least one chore!");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingStep("matching");
    }, 1200);
  };

  const handleHelperSelection = (helper) => {
    setSelectedHelper(helper);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setBookingStep("confirmed");
      // Optionally deduct from wallet here if we want to integrate
      const total = calculateTotal();
      const currentBalance = localStorage.getItem("wallet_balance");
      if (currentBalance) {
        localStorage.setItem("wallet_balance", (parseFloat(currentBalance) - total).toString());
      }
    }, 1500);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 md:py-16 pb-32 bg-surface min-h-screen text-on-surface">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-2">
          Short Hiring / স্বল্পমেয়াদী নিয়োগ
        </h1>
        <p className="text-slate-500 font-medium">
          Hire verified helpers for specific chores and hours.
          <span className="block text-[11px] opacity-80 mt-1 uppercase font-bold tracking-widest text-primary">Short-term Hire / স্বল্পমেয়াদী নিয়োগ</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Input Selection */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* STEP 1: Chores */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-black text-xs">1</div>
              <h2 className="font-headline text-xl font-extrabold">Select Chores / কাজ নির্বাচন করুন</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {chores.map((chore) => (
                <button
                  key={chore.id}
                  onClick={() => toggleChore(chore.id)}
                  className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                    selectedChores.includes(chore.id)
                      ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
                      : "border-slate-100 dark:border-slate-800 hover:border-slate-200"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    selectedChores.includes(chore.id) ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                  }`}>
                    <span className="material-symbols-outlined text-[24px]">{chore.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{chore.name}</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">৳{chore.rate}/day</p>
                  </div>
                  {selectedChores.includes(chore.id) && (
                    <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* STEP 2: Duration & Time */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-black text-xs">2</div>
                <h2 className="font-headline text-lg font-extrabold">Duration / দিন</h2>
              </div>
              <div className="flex justify-between items-end mb-4">
                <span className="text-4xl font-black text-primary">{days}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Days</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-black text-xs">3</div>
                <h2 className="font-headline text-lg font-extrabold">Time Slot / সময়</h2>
              </div>
              <div className="flex flex-col gap-2">
                {["Morning", "Afternoon", "Evening"].map(slot => (
                  <button
                    key={slot}
                    onClick={() => setPreferredTime(slot)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all font-bold text-xs ${
                      preferredTime === slot ? 'border-primary bg-primary/5 text-primary' : 'border-slate-50 dark:border-slate-800 text-slate-400'
                    }`}
                  >
                    <span>{slot}</span>
                    {preferredTime === slot && <span className="material-symbols-outlined text-[16px]">radio_button_checked</span>}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right: Booking Summary CARD */}
        <div className="lg:col-span-5">
           <div className="sticky top-28">
              <div className="bg-slate-900 dark:bg-slate-800 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-10">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-fixed mb-1">Booking Estimate</p>
                          <h3 className="font-headline text-2xl font-black italic">Bua Lagbe Gig</h3>
                       </div>
                       <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                          <span className="material-symbols-outlined text-primary-fixed">bolt</span>
                       </div>
                    </div>

                    <div className="space-y-4 mb-10 pb-10 border-b border-white/10">
                       <div className="flex justify-between items-center text-sm">
                          <span className="opacity-50">Tasks Level</span>
                          <span className="font-black uppercase tracking-tighter">{selectedChores.length} Selected</span>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                          <span className="opacity-50">Daily Window</span>
                          <span className="font-black uppercase tracking-tighter">{preferredTime}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                          <span className="opacity-50">Hire Duration</span>
                          <span className="font-black uppercase tracking-tighter">{days} Days</span>
                       </div>
                    </div>

                    <div className="flex justify-between items-end mb-10">
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Total Payable</p>
                          <p className="text-xl font-headline font-black text-cyan-400">৳{calculateTotal().toLocaleString()}</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-bold opacity-30 leading-tight">Escrow Protected<br/>নিরাপদ সেবা</p>
                       </div>
                    </div>

                    <button 
                      onClick={handleInitialConfirm}
                      disabled={isProcessing || selectedChores.length === 0}
                      className="w-full py-5 bg-primary text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-30"
                    >
                       {isProcessing ? (
                         <span className="material-symbols-outlined animate-spin">refresh</span>
                       ) : (
                         <>
                           Confirm & Pay
                           <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                         </>
                       )}
                    </button>
                 </div>
                 {/* Decorative background glass */}
                 <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px]"></div>
                 <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-[60px]"></div>
              </div>
           </div>
        </div>
      </div>

      {/* MODALS LAYER */}
      {bookingStep !== "selection" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md animate-in fade-in"
            onClick={() => bookingStep === "matching" && !isProcessing && setBookingStep("selection")}
          ></div>

          {/* STEP 2 MODAL: HELPER MATCHING */}
          {bookingStep === "matching" && (
            <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[32px] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 border border-white/20">
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="font-headline text-3xl font-black text-slate-900 dark:text-white">Matching Helpers</h3>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest mt-1">Available for {preferredTime} shift</p>
                  </div>
                  <button 
                    onClick={() => setBookingStep("selection")}
                    className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                   {helpers.filter(h => h.shift === preferredTime).map(helper => (
                     <div key={helper.id} className="p-6 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-3xl hover:border-primary transition-all group">
                        <div className="flex items-start gap-4 mb-6">
                           <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center font-black text-xl text-primary border border-slate-200 dark:border-slate-700 shadow-sm">
                              {helper.name.split(' ').map(n => n[0]).join('')}
                           </div>
                           <div className="flex-1">
                              <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{helper.name}</h4>
                              <div className="flex items-center gap-1 mt-1">
                                 <span className="material-symbols-outlined text-[14px] text-yellow-500" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                                 <span className="text-xs font-black">{helper.rating}</span>
                                 <span className="text-[10px] text-slate-400 font-bold uppercase ml-1">({helper.jobs} Jobs)</span>
                              </div>
                           </div>
                        </div>
                        
                        <div className="space-y-2 mb-8">
                           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                              <span className="material-symbols-outlined text-[16px]">schedule</span>
                              {helper.hours}
                           </div>
                           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                              <span className="material-symbols-outlined text-[16px]">military_tech</span>
                              {helper.exp} Experience
                           </div>
                        </div>

                        <button 
                          onClick={() => handleHelperSelection(helper)}
                          className="w-full py-3 bg-white dark:bg-slate-900 border-2 border-primary text-primary font-black uppercase tracking-widest text-[10px] rounded-xl group-hover:bg-primary group-hover:text-white transition-all shadow-sm"
                        >
                          Select Helper
                        </button>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 MODAL: CONFIRMATION & CONTACT */}
          {bookingStep === "confirmed" && (
            <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] shadow-2xl relative z-10 overflow-hidden animate-in slide-in-from-bottom-12 border-4 border-primary/20">
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/20 text-white relative">
                   <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
                   <span className="material-symbols-outlined text-[40px] relative z-10">verified</span>
                </div>
                
                <h3 className="font-headline text-3xl font-black text-slate-900 dark:text-white mb-2">Hiring Confirmed!</h3>
                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-10">Payment successfully held in escrow</p>

                <div className="bg-slate-50 dark:bg-slate-800/80 rounded-[32px] p-8 mb-8 border border-slate-100 dark:border-slate-800">
                   <div className="flex flex-col items-center gap-3 mb-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Your Professional</p>
                      <h4 className="text-xl font-headline font-black text-slate-900 dark:text-white">{selectedHelper?.name}</h4>
                   </div>
                   
                   <div className="pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
                      <div className="flex items-center justify-between text-xs">
                         <span className="font-bold text-slate-400">Phone Number</span>
                         <span className="font-black text-primary text-base">{selectedHelper?.phone}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                         <span className="font-bold text-slate-400">Shift Time</span>
                         <span className="font-black text-slate-800 dark:text-white">{selectedHelper?.hours}</span>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <a href={`tel:${selectedHelper?.phone}`} className="flex items-center justify-center gap-2 py-4 bg-primary text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-[18px]">call</span>
                      Call Now
                   </a>
                   <button 
                    onClick={() => setBookingStep("selection")}
                    className="py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-200 transition-all"
                   >
                      Back to Home
                   </button>
                </div>

                <p className="mt-8 text-[9px] font-black uppercase tracking-widest text-slate-400 leading-relaxed">
                   Please contact your helper within 30 minutes to confirm key details and entry access.
                </p>
              </div>
            </div>
          )}

        </div>
      )}

      <LoginPromptModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
        title="Login to Book Helper"
        message="To proceed with booking verified professionals, you need to be signed in to your account. This ensures secure booking and escrow protection."
        bnMessage="বুকিং সম্পন্ন করতে লগইন করুন"
      />
    </main>
  );
}
