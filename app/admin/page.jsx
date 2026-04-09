export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#f2fbfe] text-[#141d1f] selection:bg-[#006D77] selection:text-[#9becf7]">
      {/* SideNavBar (The Anchor) */}
      <aside className="flex flex-col h-screen w-64 left-0 sticky bg-[#ecf5f8] dark:bg-slate-950 py-6 transition-all duration-300 shadow-sm dark:shadow-none z-40">
        <div className="px-8 mb-10">
          <h1 className="text-xl font-bold text-primary tracking-tight font-headline">
            Admin Console <span className="block text-sm font-normal text-slate-500">অ্যাডমিন কনসোল</span>
          </h1>
          <p className="text-[10px] text-slate-500 font-medium uppercase mt-1">Platform Control | প্ল্যাটফর্ম নিয়ন্ত্রণ</p>
        </div>
        <nav className="flex-1 space-y-1">
          <a
            className="flex items-center gap-3 bg-white dark:bg-slate-800 text-primary font-semibold rounded-r-lg px-8 py-3 transition-all duration-300 border-l-4 border-primary"
            href="#"
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label">
              Dashboard <span className="block text-[10px] font-normal">ড্যাশবোর্ড</span>
            </span>
          </a>
          <a
            className="flex items-center gap-3 text-slate-600 dark:text-slate-400 px-8 py-3 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined">group</span>
            <span className="font-label">
              User Management <span className="block text-[10px] font-normal">ব্যবহারকারী ব্যবস্থাপনা</span>
            </span>
          </a>
          <a
            className="flex items-center gap-3 text-slate-600 dark:text-slate-400 px-8 py-3 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined">account_balance</span>
            <span className="font-label">
              Financials <span className="block text-[10px] font-normal">আর্থিক বিবরণী</span>
            </span>
          </a>
          <a
            className="flex items-center gap-3 text-slate-600 dark:text-slate-400 px-8 py-3 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined">verified_user</span>
            <span className="font-label">
              Verification <span className="block text-[10px] font-normal">যাচাইকরণ</span>
            </span>
          </a>
          <a
            className="flex items-center gap-3 text-slate-600 dark:text-slate-400 px-8 py-3 hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300"
            href="#"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label">
              Settings <span className="block text-[10px] font-normal">সেটিংস</span>
            </span>
          </a>
        </nav>
        <div className="px-8 pt-6 mt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img
              alt="Imran Hossain"
              className="w-10 h-10 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDebmhJUmD2TDt-Lx4VqZCUExhRQ-cHwWV997KwmlLKG5FF6CfW8L37XDQizxT-QXHbWzHBNPS8EBc4WYhsEo_sVFZm7vSR3kpR0MhFzIlfyl-jbaFlkmXTuIwhAFP4grTXEYovMJV69_1vyDj8zbYoofw7ZWZS0c6jjK-k5CRVlUcJuBCvV9fAdrpLNhkpmor7rdcdpTvYGwHr0TsTsN5uWPQzyawwMcY1zmJMoESOtDco-BvBSB8kMgWeZOUBFkwz9i4x5ypD93kM"
            />
            <div>
              <p className="text-sm font-bold text-on-background leading-tight">Imran Hossain</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">
                System Admin <span className="block text-[8px] mt-0.5">সিস্টেম অ্যাডমিন</span>
              </p>
            </div>
          </div>
        </div>
      </aside>
      {/* Main Canvas */}
      <main className="flex-1 min-w-0 overflow-auto bg-surface relative">
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-8 py-6 bg-[#f2fbfe]/80 backdrop-blur-md sticky top-0 z-30 border-b border-outline-variant/30">
          <div>
            <h2 className="text-2xl font-black text-primary dark:text-cyan-500 tracking-tighter">
              Bua Lagbe <span className="text-sm font-medium ml-2 text-slate-400">বুয়া লাগবে</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group hidden lg:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">
                search
              </span>
              <input
                className="bg-[#e1eaed] border-none rounded-lg pl-10 pr-4 py-2 w-64 focus:ring-2 focus:ring-primary transition-all text-sm"
                placeholder="Search records... (রেকর্ড খুঁজুন)"
                type="text"
              />
            </div>
            <div className="flex items-center gap-4 text-primary">
              <button className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="bg-tertiary text-on-tertiary px-5 py-2 rounded-lg font-bold flex items-center gap-2 hover:scale-95 transition-transform duration-200 shadow-sm shadow-tertiary/20">
                <span className="material-symbols-outlined text-sm">emergency</span>
                <span>
                  SOS <span className="text-[10px] ml-1">জরুরী</span>
                </span>
              </button>
            </div>
          </div>
        </header>
        <div className="px-8 pb-12 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <section className="mb-10 mt-6">
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-2">
              Command Center Overview <span className="block mt-1 font-medium lowercase">কমান্ড সেন্টার ওভারভিউ</span>
            </p>
            <h3 className="text-4xl md:text-5xl font-black text-on-background tracking-tighter mb-4 font-headline">
              Operational Pulse. <span className="block text-2xl md:text-3xl text-slate-400 font-bold mt-1">অপারেশনাল পালস</span>
            </h3>
            <div className="h-1.5 w-24 bg-[#006D77] rounded-full"></div>
          </section>
          {/* High-Level Metric Cards (Bento Style) */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Total Active Contracts */}
            <div className="bg-[#ffffff] p-8 rounded-lg shadow-[0_8px_24px_rgba(0,109,119,0.06)] border border-[#bec8ca]/20 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-[#a9ece5] rounded-lg text-[#286d67]">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                      history_edu
                    </span>
                  </div>
                  <span className="text-secondary font-bold text-xs bg-secondary-container/30 px-2 py-1 rounded-full">
                    +12.5%
                  </span>
                </div>
                <h4 className="text-slate-500 font-label text-sm mb-1 font-headline">
                  Total Active Contracts <span className="block text-[10px]">মোট সক্রিয় চুক্তি</span>
                </h4>
                <p className="text-4xl font-black text-on-background">1,842</p>
                {/* Mini Chart Visualization */}
                <div className="mt-6 flex items-end gap-1.5 h-12">
                  <div className="bg-secondary/10 w-full h-[40%] rounded-t-[2px]"></div>
                  <div className="bg-secondary/10 w-full h-[60%] rounded-t-[2px]"></div>
                  <div className="bg-secondary/10 w-full h-[55%] rounded-t-[2px]"></div>
                  <div className="bg-secondary/10 w-full h-[80%] rounded-t-[2px]"></div>
                  <div className="bg-secondary/10 w-full h-[70%] rounded-t-[2px]"></div>
                  <div className="bg-secondary/10 w-full h-[90%] rounded-t-[2px]"></div>
                  <div className="bg-[#236863] w-full h-[100%] rounded-t-[2px]"></div>
                </div>
              </div>
            </div>
            {/* Pending NID Verifications */}
            <div className="bg-surface-container-lowest p-8 rounded-lg shadow-[0_8px_24px_rgba(0,109,119,0.06)] border border-outline-variant/20 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary-container/10 text-primary rounded-lg">
                    <span className="material-symbols-outlined">fingerprint</span>
                  </div>
                  <span className="text-primary font-bold text-xs bg-primary-container/10 px-2 py-1 rounded-full">
                    High Priority <span className="block text-[8px] font-normal">উচ্চ অগ্রাধিকার</span>
                  </span>
                </div>
                <h4 className="text-slate-500 font-label text-sm mb-1 font-headline">
                  Pending Verifications <span className="block text-[10px]">অপেক্ষমান যাচাইকরণ</span>
                </h4>
                <p className="text-4xl font-black text-on-background">158</p>
                {/* Mini Pulse Visualization */}
                <div className="mt-6">
                  <div className="flex justify-between items-center mb-1 text-[10px] font-bold text-slate-500 uppercase">
                    <span>65% Processed</span>
                    <span>৬৫% সম্পন্ন</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[65%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Flagged Disputes */}
            <div className="bg-surface-container-lowest p-8 rounded-lg shadow-[0_8px_24px_rgba(0,109,119,0.06)] border border-outline-variant/20 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-[#ffdad6] text-[#ba1a1a] rounded-lg">
                    <span className="material-symbols-outlined">report_problem</span>
                  </div>
                  <span className="text-error font-bold text-xs bg-error-container/50 px-2 py-1 rounded-full">
                    Requires Action <span className="block text-[8px] font-normal">পদক্ষেপ প্রয়োজন</span>
                  </span>
                </div>
                <h4 className="text-slate-500 font-label text-sm mb-1 font-headline">
                  Flagged Disputes <span className="block text-[10px]">চিহ্নিত বিরোধ</span>
                </h4>
                <p className="text-4xl font-black text-on-background">24</p>
                <p className="text-xs text-slate-400 mt-2">
                  6 new flags in the last 24 hours <span className="block mt-0.5 font-medium">গত ২৪ ঘন্টায় ৬টি নতুন বিরোধ</span>
                </p>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Platform Growth Data Viz */}
            <div className="lg:col-span-8 bg-surface-container-low p-8 rounded-lg border border-outline-variant/10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h4 className="text-xl font-bold text-on-background font-headline">
                    Platform Revenue Growth <span className="block text-sm font-medium text-slate-500">প্ল্যাটফর্ম আয় বৃদ্ধি</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 uppercase font-bold tracking-wider">
                    Monthly transactional volume and fees | মাসিক লেনদেনের পরিমাণ ও ফি
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-1.5 text-xs font-bold bg-white text-primary rounded-lg shadow-sm border border-outline-variant/30">
                    Monthly <span className="text-[8px] opacity-60">মাসিক</span>
                  </button>
                  <button className="px-4 py-1.5 text-xs font-bold text-slate-500 rounded-lg hover:bg-slate-100">
                    Quarterly <span className="text-[8px] opacity-60">ত্রৈমাসিক</span>
                  </button>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-4 px-4 relative">
                {/* Chart Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10 py-2">
                  <div className="border-t border-slate-600 w-full"></div>
                  <div className="border-t border-slate-600 w-full"></div>
                  <div className="border-t border-slate-600 w-full"></div>
                  <div className="border-t border-slate-600 w-full"></div>
                </div>
                {/* Large Data Bars */}
                <div className="relative w-full h-full flex items-end justify-between gap-4">
                  <div className="group relative flex-1 h-[40%] bg-primary/10 rounded-t-lg hover:bg-primary/30 transition-all">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-background text-white text-[10px] px-3 py-1.5 rounded-lg hidden group-hover:block whitespace-nowrap shadow-xl">
                      ৳420k (৪২০ হাজার)
                    </div>
                  </div>
                  <div className="group relative flex-1 h-[55%] bg-primary/10 rounded-t-lg hover:bg-primary/30 transition-all">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-background text-white text-[10px] px-3 py-1.5 rounded-lg hidden group-hover:block whitespace-nowrap shadow-xl">
                      ৳580k (৫৮০ হাজার)
                    </div>
                  </div>
                  <div className="group relative flex-1 h-[45%] bg-primary/10 rounded-t-lg hover:bg-primary/30 transition-all"></div>
                  <div className="group relative flex-1 h-[70%] bg-primary/10 rounded-t-lg hover:bg-primary/30 transition-all"></div>
                  <div className="group relative flex-1 h-[85%] bg-primary rounded-t-lg shadow-lg shadow-primary/20">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                      ৳890k (৮৯০ হাজার)
                    </div>
                  </div>
                  <div className="group relative flex-1 h-[65%] bg-primary/10 rounded-t-lg hover:bg-primary/30 transition-all"></div>
                  <div className="group relative flex-1 h-[95%] bg-secondary rounded-t-lg shadow-lg shadow-secondary/20"></div>
                </div>
              </div>
              <div className="flex justify-between mt-6 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="text-center">JAN<br /><span className="font-medium lowercase">জানু</span></div>
                <div className="text-center">FEB<br /><span className="font-medium lowercase">ফেব্রু</span></div>
                <div className="text-center">MAR<br /><span className="font-medium lowercase">মার্চ</span></div>
                <div className="text-center">APR<br /><span className="font-medium lowercase">এপ্রিল</span></div>
                <div className="text-center">MAY<br /><span className="font-medium lowercase">মে</span></div>
                <div className="text-center">JUN<br /><span className="font-medium lowercase">জুন</span></div>
                <div className="text-center">JUL<br /><span className="font-medium lowercase">জুলাই</span></div>
              </div>
            </div>
            {/* Recent Activity Feed */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-on-background font-headline">
                  Live Feed <span className="block text-xs font-medium text-slate-500">লাইভ ফিড</span>
                </h4>
                <span className="inline-block w-2.5 h-2.5 bg-[#ba1a1a] rounded-full animate-pulse"></span>
              </div>
              <div className="space-y-4">
                {/* Activity Item 1 */}
                <div className="bg-surface-container-lowest p-4 rounded-lg flex gap-4 transition-all hover:-translate-y-1 border border-outline-variant/10 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#a9ece5]/50 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">verified</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-background leading-tight">NID Verified: Rahat Khan</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">জাতীয় পরিচয়পত্র যাচাই করা হয়েছে: রাহাত খান</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">3 minutes ago • ৩ মিনিট আগে</p>
                  </div>
                </div>
                {/* Activity Item 2 */}
                <div className="bg-surface-container-lowest p-4 rounded-lg flex gap-4 transition-all hover:-translate-y-1 border border-outline-variant/10 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#006D77]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl">payments</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-background leading-tight">Payout Released: ৳12,400</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">অর্থ প্রদান সম্পন্ন: ৳১২,৪০০</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">12 minutes ago • ১২ মিনিট আগে</p>
                  </div>
                </div>
                {/* Activity Item 3 */}
                <div className="bg-surface-container-lowest p-4 rounded-lg flex gap-4 transition-all hover:-translate-y-1 border border-outline-variant/10 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#8e5500]/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#6d4000] text-xl">flag</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-background leading-tight">Dispute Raised: S. Ahmed</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">বিরোধ উত্থাপন করা হয়েছে: এস. আহমেদ</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">45 minutes ago • ৪৫ মিনিট আগে</p>
                  </div>
                </div>
                {/* Activity Item 4 */}
                <div className="bg-surface-container-lowest p-4 rounded-lg flex gap-4 transition-all hover:-translate-y-1 border border-outline-variant/10 shadow-sm">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-500 text-xl">person_add</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-background leading-tight">New Registration: Banani</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold mt-1">নতুন নিবন্ধন: বনানী জেলা</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">1 hour ago • ১ ঘণ্টা আগে</p>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 text-xs font-bold text-primary border-2 border-[#006D77]/20 rounded-lg hover:bg-[#006D77]/5 transition-colors uppercase tracking-widest">
                View Historical Logs <span className="block mt-0.5 font-medium lowercase">পুরানো লগ দেখুন</span>
              </button>
            </div>
          </div>
          {/* Featured Admin Tools Section */}
          <section className="mt-12">
            <h4 className="text-2xl font-black text-on-background mb-6 font-headline">
              Quick Actions{" "}
              <span className="text-sm font-bold ml-2 text-slate-400 uppercase tracking-tighter">তাত্ক্ষণিক পদক্ষেপ</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-primary text-on-primary p-6 rounded-lg hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                  add_moderator
                </span>
                <p className="font-bold leading-tight">Audit Helper Profiles</p>
                <p className="text-[10px] opacity-80 mt-1 uppercase">হেল্পার প্রোফাইল অডিট করুন</p>
              </div>
              <div className="bg-secondary text-on-secondary p-6 rounded-lg hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-lg shadow-secondary/20">
                <span className="material-symbols-outlined mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>
                  account_balance_wallet
                </span>
                <p className="font-bold leading-tight">Release Bulk Payouts</p>
                <p className="text-[10px] opacity-80 mt-1 uppercase">একসাথে পেমেন্ট রিলিজ করুন</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/30 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-sm">
                <span className="material-symbols-outlined mb-4 block text-primary">analytics</span>
                <p className="font-bold leading-tight text-on-background">Generate Reports</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">রিপোর্ট তৈরি করুন</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-lg border border-outline-variant/30 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer shadow-sm">
                <span className="material-symbols-outlined mb-4 block text-primary">support_agent</span>
                <p className="font-bold leading-tight text-on-background">Internal Support</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">অভ্যন্তরীণ সহায়তা</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* Background Decoration */}
      <div className="fixed top-0 right-0 -z-10 opacity-30 pointer-events-none">
        <svg fill="none" height="800" viewBox="0 0 600 600" width="800" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="200" fill="url(#paint0_linear)" r="250"></circle>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="400" x2="400" y1="0" y2="400">
              <stop stopColor="#83C5BE"></stop>
              <stop offset="1" stopColor="#f2fbfe" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
