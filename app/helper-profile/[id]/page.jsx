"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function HelperProfile({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [helper, setHelper] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("about"); 
  const [isHiringModalOpen, setIsHiringModalOpen] = useState(false);
  const [selectedChores, setSelectedChores] = useState([]);
  const [proposedSalary, setProposedSalary] = useState("");

  useEffect(() => {
    const fetchHelper = async () => {
      try {
        const res = await fetch(`/api/helpers/${id}`);
        const data = await res.json();
        if (data.success) {
          setHelper(data.data);
          setProposedSalary(data.data.monthlyRate.toString());
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to fetch helper:", error);
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHelper();
  }, [id, router]);

  const toggleChore = (choreName) => {
    setSelectedChores(prev => 
      prev.includes(choreName) ? prev.filter(c => c !== choreName) : [...prev, choreName]
    );
  };

  const handleSendProposal = () => {
    alert(`Proposal sent for ${selectedChores.length} chores at ৳${proposedSalary}`);
    setIsHiringModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="material-symbols-outlined animate-spin text-4xl text-primary">refresh</div>
      </div>
    );
  }

  if (!helper) return null;

  return (
    <main className="min-h-screen bg-surface pb-24">
      {}
      <div className="relative h-64 md:h-80 w-full bg-slate-200">
        <img
          src={helper.image}
          alt={helper.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        <Link href="/" className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        {}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 md:p-8 border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="font-headline text-3xl font-extrabold text-slate-900 dark:text-white uppercase tracking-tight">{helper.name}</h1>
                {helper.nid && (
                  <div className="bg-[#e0f7fa] dark:bg-cyan-900/40 text-primary px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">NID Verified</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-slate-500 text-sm mb-4">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> {helper.location}</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">work_history</span> {helper.experience || "Verified"} Prof.</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-tight shadow-lg shadow-primary/20">{helper.category}</span>
                <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-tight">{helper.shift} Shift</span>
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end w-full md:w-auto">
              <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-xl mb-4">
                <span className="material-symbols-outlined text-yellow-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <div className="flex flex-col">
                  <span className="font-extrabold text-yellow-700 dark:text-yellow-500 text-lg leading-none">{helper.rating || "5.0"}</span>
                  <span className="text-[9px] text-yellow-600/70 font-bold uppercase tracking-widest">{helper.reviews || "0"} Reviews</span>
                </div>
              </div>
              <div className="text-left md:text-right">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Monthly Salary</p>
                <p className="text-3xl font-black text-primary font-headline italic">৳ {helper.monthlyRate.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="mt-8 flex gap-6 border-b border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => setActiveTab("about")}
            className={`pb-3 font-bold text-sm transition-colors border-b-2 ${activeTab === "about" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Capabilities & Schedule
          </button>
          <button 
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 font-bold text-sm transition-colors border-b-2 ${activeTab === "reviews" ? "border-primary text-primary" : "border-transparent text-slate-500 hover:text-slate-700"}`}
          >
            Recommendations
          </button>
        </div>

        {}
        <div className="mt-8">
          {activeTab === "about" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <section>
                <h3 className="font-headline font-black text-lg text-slate-900 dark:text-white mb-3 uppercase tracking-wider">Professional Bio</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {helper.name} is a highly rated {helper.category} in {helper.location}. With {helper.experience || "extensive"} experience, they are known for their punctuality and high-quality service.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {helper.skills && helper.skills.map((skill, i) => (
                    <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="font-headline font-black text-lg text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Schedule & Reach</h3>
                <div className="bg-slate-900 text-white p-8 rounded-[32px] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Operating Days</p>
                      <p className="text-lg font-black italic">{helper.workingDays || "Sat - Thu"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Shift Window</p>
                      <p className="text-lg font-black italic">{helper.workingHours || helper.shift}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Primary Hub</p>
                      <p className="text-lg font-black italic">{helper.location}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-headline font-black text-lg text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Breakdown of Tasks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {helper.tasks && helper.tasks.map((task, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all">
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white">{task.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{task.bnName}</p>
                      </div>
                      <p className="text-sm font-black text-primary italic">৳{task.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="py-20 text-center text-slate-400 animate-in fade-in duration-500">
               <span className="material-symbols-outlined text-6xl opacity-10">reviews</span>
               <p className="mt-4 font-black uppercase tracking-[0.2em] text-xs">No Public Reviews Yet</p>
               <p className="text-[10px] font-medium mt-1">Be the first to hire and review {helper.name}</p>
            </div>
          )}
        </div>
      </div>

      {}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 py-4 px-6 z-40">
        <div className="max-w-4xl mx-auto flex gap-4 md:gap-6">
          <button className="flex-1 md:flex-grow-0 md:w-48 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white px-6 py-3.5 rounded-xl font-black uppercase tracking-widest text-[10px] flex justify-center items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700">
            <span className="material-symbols-outlined text-[18px]">chat</span>
            Direct Message
          </button>
          <button 
            onClick={() => setIsHiringModalOpen(true)}
            className="flex-[2] md:flex-1 bg-primary text-white px-6 py-3.5 rounded-xl font-black font-headline tracking-[0.2em] text-[10px] uppercase flex justify-center items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/20"
          >
            Recruit {helper.name.split(' ')[0]}
          </button>
        </div>
      </div>

      {}
      {isHiringModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center sm:p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsHiringModalOpen(false)}></div>
          
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-[40px] md:rounded-[40px] shadow-2xl overflow-hidden relative z-10 animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="px-10 py-8 flex justify-between items-center border-b border-slate-50 dark:border-slate-800 bg-slate-50/50">
              <div>
                <h2 className="font-black text-xl font-headline text-slate-900 dark:text-white uppercase tracking-tight">Contract Proposal</h2>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Drafting offer for {helper.name}</p>
              </div>
              <button onClick={() => setIsHiringModalOpen(false)} className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Select Engagement Items</label>
                <div className="grid grid-cols-1 gap-3">
                  {helper.tasks && helper.tasks.map(task => (
                    <button
                      key={task._id}
                      onClick={() => toggleChore(task.name)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all ${
                        selectedChores.includes(task.name) 
                          ? "border-primary bg-primary/5" 
                          : "border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-100"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className={`text-xs font-black ${selectedChores.includes(task.name) ? "text-primary" : "text-slate-900 dark:text-white"}`}>
                            {task.name}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{task.bnName}</p>
                        </div>
                        <p className={`text-xs font-black italic ${selectedChores.includes(task.name) ? "text-primary" : "text-slate-400"}`}>৳{task.price}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Proposed Monthly Budget (৳)</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-headline font-black text-slate-400 italic text-xl">৳</span>
                  <input 
                    type="number" 
                    value={proposedSalary}
                    onChange={(e) => setProposedSalary(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl pl-12 pr-8 py-5 text-2xl font-black text-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-primary/10 transition-all italic"
                  />
                </div>
              </div>
            </div>

            <div className="p-10 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-50 dark:border-slate-800">
              <button 
                onClick={handleSendProposal}
                disabled={selectedChores.length === 0}
                className="w-full py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-2xl transition-all disabled:opacity-30 bg-slate-900 text-white hover:bg-slate-800"
              >
                Dispatch Proposal
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
