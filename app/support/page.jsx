export default function Support() {
  return (
    <>

      <main className="pt-28 pb-32 px-6 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-14">
          <h1 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight text-on-surface mb-3">
            Safety &amp; Support Center
          </h1>
          <h2 className="text-xl font-bold text-primary mb-4">নিরাপত্তা এবং সহায়তা কেন্দ্র</h2>
          <p className="text-[#3e494a] max-w-3xl leading-relaxed">
            We are here to ensure your safety and provide immediate assistance for your service needs. <br />
            আপনার নিরাপত্তা নিশ্চিত করতে এবং তাৎক্ষণিক সহায়তা প্রদানের জন্য আমরা সবসময় আপনার পাশে আছি।
          </p>
        </section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main SOS Column */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-10 md:p-14 rounded-[40px] shadow-2xl border-4 border-red-500/20 relative overflow-hidden group">
              {/* Emergency Pulse Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-pulse"></div>

              <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/20">
                      <span className="material-symbols-outlined text-white text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        emergency_home
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline font-black text-3xl md:text-4xl leading-tight text-slate-900 dark:text-white">Emergency SOS</h3>
                      <p className="text-lg font-bold text-red-600 uppercase tracking-widest">জরুরি এসওএস</p>
                    </div>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-xl">
                    One-tap activation for critical situations. Our rapid response team is on standby 24/7 to intervene and ensure your safety. <br />
                    <span className="text-sm block mt-2 opacity-80 italic">যেকোনো জরুরি পরিস্থিতিতে আমাদের টিম সরাসরি সহায়তা প্রদান করবে।</span>
                  </p>
                  
                  {/* Enhanced SOS Slider */}
                  <div className="relative w-full max-w-lg h-24 bg-slate-100 dark:bg-slate-800 rounded-[30px] p-2 overflow-hidden border-2 border-slate-200 dark:border-slate-700 select-none">
                    <div className="absolute inset-0 flex items-center justify-center select-none">
                      <span className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] pointer-events-none animate-pulse select-none">
                        Slide to Alert / সোয়াইপ করুন
                      </span>
                    </div>
                    <div className="h-20 w-20 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center text-white cursor-pointer shadow-xl active:translate-x-[calc(100%*3.8)] md:active:translate-x-[calc(100%*4.4)] transition-transform duration-500 ease-in-out relative z-10 select-none">
                      <span className="material-symbols-outlined text-[32px] select-none">chevron_right</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Quick Dials */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="tel:999"
                  className="flex items-center justify-between p-6 bg-red-50 dark:bg-red-950/20 rounded-2xl border-2 border-red-100 dark:border-red-900/30 hover:scale-[1.02] transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined">local_police</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-red-900 dark:text-red-400">Call Police / পুলিশ</p>
                      <p className="text-lg font-headline font-black text-red-700 dark:text-red-500">999</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-red-300 group-hover:text-red-600 transition-colors text-[32px]">
                    call
                  </span>
                </a>
                <a 
                  href="tel:106"
                  className="flex items-center justify-between p-6 bg-cyan-50 dark:bg-cyan-950/20 rounded-2xl border-2 border-cyan-100 dark:border-cyan-900/30 hover:scale-[1.02] transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined">medical_services</span>
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-cyan-900 dark:text-cyan-400">Ambulance / অ্যাম্বুলেন্স</p>
                      <p className="text-lg font-headline font-black text-cyan-700 dark:text-cyan-500">106</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-cyan-300 group-hover:text-cyan-600 transition-colors text-[32px]">
                    call
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Side Info Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-primary/10 dark:bg-primary/5 p-8 rounded-[32px] border-2 border-primary/20 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-primary/20">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  verified_user
                </span>
              </div>
              <h4 className="font-headline font-black text-xl text-slate-900 dark:text-white mb-2">You are Protected</h4>
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">আপনার নিরাপত্তা আমাদের অগ্রাধিকার</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Your current location and session are encrypted and monitored for your safety during any active service engagement.
              </p>
              <div className="mt-8 pt-8 border-t border-primary/10 w-full grid grid-cols-2 gap-4">
                 <div className="flex flex-col items-center">
                    <span className="text-lg font-black text-primary font-headline tracking-tighter">100%</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Secured</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-lg font-black text-primary font-headline tracking-tighter">24/7</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Active</span>
                 </div>
              </div>
            </div>

            <div className="bg-slate-900 dark:bg-slate-800 p-8 rounded-[32px] text-white overflow-hidden relative">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-[100px]">shield</span>
               </div>
               <h4 className="font-bold text-lg mb-2 relative z-10">Insurance Coverage</h4>
               <p className="text-xs text-slate-400 leading-relaxed mb-6 relative z-10">
                  Every booking is insured up to ৳20,000 for unexpected damages or incidents.
               </p>
               <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-cyan-400 transition-colors flex items-center gap-2">
                  Learn More <span className="material-symbols-outlined text-[14px]">open_in_new</span>
               </button>
            </div>
          </div>
        </div>
        {/* Contact Support Cards */}
        <section className="mt-16">
          <h2 className="font-headline font-extrabold text-2xl mb-8 text-[#191c1d]">Direct Assistance (সরাসরি সহায়তা)</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chat Support */}
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 group hover:-translate-y-2 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  chat_bubble
                </span>
              </div>
              <h3 className="font-headline font-black text-xl mb-2 text-slate-900 dark:text-white">Live Chat</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">লাইভ চ্যাট</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">Dedicated support in Bengali and English for immediate resolution.</p>
              <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                <span>Start Chat</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
            {/* Call Support */}
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 group hover:-translate-y-2 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-cyan-500/10 text-cyan-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  call
                </span>
              </div>
              <h3 className="font-headline font-black text-xl mb-2 text-slate-900 dark:text-white">Call Center</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-cyan-600 mb-4">কল সেন্টার</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">24/7 priority helpline for verified household owners and members.</p>
              <div className="flex items-center gap-2 text-cyan-600 font-black text-xs uppercase tracking-widest">
                <span>+880 1234-567890</span>
                <span className="material-symbols-outlined text-[18px]">content_copy</span>
              </div>
            </div>
            {/* Dispute Center */}
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 group hover:-translate-y-2 transition-all cursor-pointer">
              <div className="w-16 h-16 bg-orange-500/10 text-orange-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  gavel
                </span>
              </div>
              <h3 className="font-headline font-black text-xl mb-2 text-slate-900 dark:text-white">Dispute Center</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-4">বিরোধ নিষ্পত্তি</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">Formal mediation service for conflict resolution and issue tracking.</p>
              <div className="flex items-center gap-2 text-orange-600 font-black text-xs uppercase tracking-widest">
                <span>Open Ticket</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Help */}
      <div className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-40">
        <button className="w-14 h-14 rounded-full bg-primary text-white shadow-xl flex items-center justify-center active:scale-90 transition-all">
          <span className="material-symbols-outlined">help</span>
        </button>
      </div>
    </>
  );
}
