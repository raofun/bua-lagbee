"use client";

import Link from "next/link";
import { useState } from "react";

export default function HelperProfile() {
  const [activeTab, setActiveTab] = useState("about"); // about, reviews
  const [isHiringModalOpen, setIsHiringModalOpen] = useState(false);
  const [selectedChores, setSelectedChores] = useState([]);
  const [proposedSalary, setProposedSalary] = useState("8500");

  const toggleChore = (chore) => {
    setSelectedChores(prev => 
      prev.includes(chore) ? prev.filter(c => c !== chore) : [...prev, chore]
    );
  };

  const handleSendProposal = () => {
    alert(`Proposal sent for ${selectedChores.length} chores at ৳${proposedSalary}`);
    setIsHiringModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-surface pb-24">
      {/* Header Image & Back Button */}
      <div className="relative h-64 md:h-80 w-full bg-slate-200">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDce2iccjxH57EwkdVn-QtCNllmmkzGGQ7IdkIoOXk9r_jsJRoBTwnl84myxtz6-xW2hnM7raau8j0Jggc0F8FX00XbiEXzYXGUcIa0s8syX2Be_mIul-SERRCoZyfG5rxSDh2tKEl7zYsgifVGonww5io9BnywH5K4HBR9HQF3L5vTjDnYVo2o-6npPstAprJLdhhAcamficiS3cVyDdIqVdMEEX5dOTzvSt6yR4mF7iq7UPQYuLkDLS282Zqj3lBgLzNBEcx7jtNM"
          alt="Rahima Khatun"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        <Link href="/" className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-headline text-3xl font-extrabold text-slate-900 dark:text-white">Rahima Khatun</h1>
                <div className="bg-[#e0f7fa] dark:bg-cyan-900/40 text-primary px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Verified</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> Banani, Dhaka</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">work_history</span> 5 Years Exp.</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-surface-container-high dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-primary uppercase tracking-tight shadow-sm">Chef / বাবুর্চি</span>
                <span className="bg-surface-container-high dark:bg-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold text-primary uppercase tracking-tight shadow-sm">Housekeeping</span>
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end w-full md:w-auto">
              <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-xl mb-4">
                <span className="material-symbols-outlined text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <div className="flex flex-col">
                  <span className="font-extrabold text-yellow-700 dark:text-yellow-500 text-lg leading-none">4.9</span>
                  <span className="text-[9px] text-yellow-600/70 font-bold uppercase tracking-widest">24 Reviews</span>
                </div>
              </div>
              <div className="text-left md:text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Monthly Rate <span className="font-normal">/ মাসিক বেতন</span></p>
                <p className="text-3xl font-black text-primary font-headline">৳ 8,500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mt-8 flex gap-6 border-b border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => setActiveTab("about")}
            className={`pb-3 font-bold text-sm transition-colors border-b-2 ${activeTab === "about" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            About & Skills <span className="block text-[10px] font-normal mt-0.5">বিস্তারিত ও দক্ষতা</span>
          </button>
          <button 
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 font-bold text-sm transition-colors border-b-2 ${activeTab === "reviews" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Client Reviews <span className="block text-[10px] font-normal mt-0.5">গ্রাহকের মতামত</span>
          </button>
        </div>

        {/* Tab Panels */}
        <div className="mt-8">
          {activeTab === "about" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-3">About Rahima</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  Rahima is a highly skilled and punctual professional with over 5 years of experience in managing households. She specializes in Bengali cuisine and thorough home cleaning. Her previous employers commend her honesty and dedication.
                </p>
                <p className="text-slate-500 leading-relaxed text-sm mt-3 opacity-90 border-l-2 border-primary/30 pl-4 py-1 italic">
                  "আমি গত ৫ বছর ধরে বিশ্বস্ততার সাথে কাজ করছি। বাংলা খাবার রান্না এবং নিখুঁতভাবে ঘর পরিষ্কার করার কাজে আমি অভিজ্ঞ।"
                </p>
              </section>

              <section>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Verification Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                    <span className="material-symbols-outlined text-green-600">how_to_reg</span>
                    <div>
                      <p className="font-bold text-sm text-green-900 dark:text-green-400">NID Verified</p>
                      <p className="text-[10px] text-green-700 dark:text-green-500 mt-0.5">Government ID confirmed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                    <span className="material-symbols-outlined text-green-600">health_and_safety</span>
                    <div>
                      <p className="font-bold text-sm text-green-900 dark:text-green-400">Background Checked</p>
                      <p className="text-[10px] text-green-700 dark:text-green-500 mt-0.5">No criminal records found</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-4">Availability</h3>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Days</span>
                    <span className="text-sm font-bold text-primary">Sat - Thu</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Hours</span>
                    <span className="text-sm font-bold text-primary">08:00 AM - 05:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Preferred Location</span>
                    <span className="text-sm font-bold text-primary">Banani, Gulshan</span>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">SM</div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white">Sadia Mahmud</p>
                      <p className="text-[10px] text-slate-400">2 weeks ago</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500">
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Rahima is amazing. She maintains the kitchen flawlessly and completely solved our meal-prep worries. Highly recommended!</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">AK</div>
                    <div>
                      <p className="font-bold text-sm text-slate-900 dark:text-white">Ali Kamal</p>
                      <p className="text-[10px] text-slate-400">1 month ago</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500">
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    <span className="material-symbols-outlined text-[16px] text-slate-300" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Very honest and hardworking. Sometimes she is a bit late in the morning due to traffic, but her work quality is excellent.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 py-4 px-6 z-40 transform translate-y-0 transition-transform duration-300">
        <div className="max-w-4xl mx-auto flex gap-4 md:gap-6">
          <button className="flex-1 md:flex-grow-0 md:w-48 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white px-6 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700">
            <span className="material-symbols-outlined text-[20px]">chat</span>
            <span>Message</span>
          </button>
          <button 
            onClick={() => setIsHiringModalOpen(true)}
            className="flex-[2] md:flex-1 bg-primary text-white px-6 py-3.5 rounded-xl font-bold font-headline tracking-wide flex justify-center items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            <span>Hire Rahima</span>
            <span className="block text-[10px] font-normal opacity-90 ml-1">। নিয়োগ করুন</span>
          </button>
        </div>
      </div>

      {/* Hiring / Proposal Modal */}
      {isHiringModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsHiringModalOpen(false)}></div>
          
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="font-bold text-lg font-headline text-slate-900 dark:text-white">Propose an Offer</h2>
                <p className="text-[10px] text-slate-500 font-medium">অফার প্রস্তাব করুন</p>
              </div>
              <button onClick={() => setIsHiringModalOpen(false)} className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-700 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* Task Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
                  Select Tasks <span className="text-[10px] font-normal text-slate-500 ml-1">কাজ নির্বাচন করুন</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'cooking', label: 'Cooking', bangla: 'রান্না' },
                    { id: 'cleaning', label: 'Home Cleaning', bangla: 'ঘর পরিষ্কার' },
                    { id: 'laundry', label: 'Laundry', bangla: 'কাপড় ধোয়া' },
                    { id: 'dishwashing', label: 'Dishwashing', bangla: 'থালাবাসন ধোয়া' },
                    { id: 'nanny', label: 'Childcare', bangla: 'বাচ্চা রাখা' },
                  ].map(chore => (
                    <button
                      key={chore.id}
                      onClick={() => toggleChore(chore.id)}
                      className={`text-left p-3 rounded-xl border-2 transition-all ${
                        selectedChores.includes(chore.id) 
                          ? "border-primary bg-[#f2fbfe] dark:bg-cyan-900/20" 
                          : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`text-xs font-bold ${selectedChores.includes(chore.id) ? "text-primary" : "text-slate-700 dark:text-slate-300"}`}>
                            {chore.label}
                          </p>
                          <p className={`text-[10px] mt-0.5 ${selectedChores.includes(chore.id) ? "text-primary/70" : "text-slate-400"}`}>
                            {chore.bangla}
                          </p>
                        </div>
                        {selectedChores.includes(chore.id) && (
                          <span className="material-symbols-outlined text-primary text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary Offering */}
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-200 mb-3">
                  Proposed Monthly Salary <span className="text-[10px] font-normal text-slate-500 ml-1">প্রস্তাবিত বেতন</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-headline font-bold text-slate-500">৳</span>
                  <input 
                    type="number" 
                    value={proposedSalary}
                    onChange={(e) => setProposedSalary(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-xl px-10 py-3 text-lg font-bold text-slate-900 dark:text-white transition-all outline-none"
                    placeholder="Enter amount"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2 flex items-start gap-1">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Her standard rate normally starts at ৳8,500. Lower offers might get rejected.
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <button 
                onClick={handleSendProposal}
                disabled={selectedChores.length === 0}
                className={`w-full py-3.5 rounded-xl font-bold transition-all flex flex-col items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${
                  selectedChores.length > 0 ? "bg-primary text-white shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95" : "bg-slate-200 text-slate-400"
                }`}
              >
                <span>Send Proposal</span>
                <span className="text-[10px] font-normal opacity-90 mt-0.5">প্রস্তাব পাঠান</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
