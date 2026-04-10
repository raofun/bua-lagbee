export default function Wallet() {
  return (
    <>

      <main className="max-w-7xl mx-auto px-6 py-8 md:py-12 flex-grow overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {}
          <aside className="hidden lg:flex lg:col-span-3 flex-col gap-2 h-fit">
            <div className="mb-8 px-4">
              <h2 className="font-headline text-xl font-bold text-primary">Admin Console / অ্যাডমিন কনসোল</h2>
              <p className="text-xs text-slate-500">Platform Control / প্ল্যাটফর্ম নিয়ন্ত্রণ</p>
            </div>
            <nav className="flex flex-col gap-1">
              <a
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-white/50 rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">dashboard</span>
                <span className="font-medium text-sm">Dashboard / ড্যাশবোর্ড</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-white/50 rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">group</span>
                <span className="font-medium text-sm">User Management / ব্যবহারকারী ব্যবস্থাপনা</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 bg-white text-primary font-bold rounded-lg shadow-sm border border-primary/10"
                href="#"
              >
                <span className="material-symbols-outlined">account_balance</span>
                <span className="font-bold text-sm">Financials / আর্থিক হিসাব</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-white/50 rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">verified_user</span>
                <span className="font-medium text-sm">Verification / যাচাইকরণ</span>
              </a>
              <a
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-white/50 rounded-lg transition-all"
                href="#"
              >
                <span className="material-symbols-outlined">settings</span>
                <span className="font-medium text-sm">Settings / সেটিংস</span>
              </a>
            </nav>
          </aside>
          {}
          <div className="lg:col-span-9 space-y-8">
            {}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#006D77] to-[#004f56] p-8 md:p-12 text-white">
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="material-symbols-outlined text-primary-fixed"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      security
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#9ff0fb]">
                      Secured in Escrow / এসক্রোতে সংরক্ষিত
                    </span>
                  </div>
                  <h1 className="font-headline text-4xl md:text-5xl font-extrabold mb-2 leading-tight">
                    Monthly Salary in Escrow / মাসিক বেতন এসক্রোতে
                  </h1>
                  <p className="text-[#9ff0fb] opacity-90 text-sm font-medium mb-8">
                    Funds are locked and ready for distribution / অর্থ নিরাপদে সংরক্ষিত এবং বিতরণের জন্য প্রস্তুত
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-white text-[#006D77] px-6 py-3 rounded-lg font-bold font-headline text-sm flex items-center gap-2 hover:scale-95 transition-transform">
                      Release Funds / অর্থ প্রদান করুন <span className="material-symbols-outlined">payments</span>
                    </button>
                    <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg font-bold font-headline text-sm flex items-center gap-2 hover:bg-white/20 transition-all">
                      Add Tip / বকশিশ দিন <span className="material-symbols-outlined">volunteer_activism</span>
                    </button>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 flex flex-col justify-center">
                  <div className="text-xs font-medium text-[#9ff0fb] mb-1 uppercase tracking-wider">
                    Total Balance / মোট ব্যালেন্স
                  </div>
                  <div className="font-headline text-5xl font-black mb-6">৳ 18,500.00</div>
                  <div className="flex items-center gap-3 text-xs text-[#9ff0fb] font-semibold">
                    <span className="material-symbols-outlined text-green-300">lock</span>
                    Next release scheduled: Aug 1, 2024 / পরবর্তী প্রদান: ১ আগস্ট, ২০২৪
                  </div>
                </div>
              </div>
              {}
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none"></div>
            </section>
            {}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {}
              <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-surface-container-low">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-secondary bg-secondary-container/30 p-2 rounded-lg">
                    wallet
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Itemized / বিস্তারিত
                  </span>
                </div>
                <p className="text-slate-500 font-medium text-xs mb-1">Base Salary / মূল বেতন</p>
                <h3 className="font-headline text-2xl font-bold text-primary">৳ 15,000.00</h3>
              </div>
              {}
              <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-surface-container-low border-l-4 border-green-500">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-green-600 bg-green-100 p-2 rounded-lg">
                    trending_up
                  </span>
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">
                    Bonus / বোনাস
                  </span>
                </div>
                <p className="text-slate-500 font-medium text-xs mb-1">Performance Bonus / পারফরম্যান্স বোনাস</p>
                <h3 className="font-headline text-2xl font-bold text-green-600">+ ৳ 4,200.00</h3>
              </div>
              {}
              <div className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-surface-container-low border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-4">
                  <span className="material-symbols-outlined text-red-600 bg-red-100 p-2 rounded-lg">
                    event_busy
                  </span>
                  <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
                    Deduction / কর্তন
                  </span>
                </div>
                <p className="text-slate-500 font-medium text-xs mb-1">Absences (3 days) / অনুপস্থিতি (৩ দিন)</p>
                <h3 className="font-headline text-2xl font-bold text-red-600">- ৳ 700.00</h3>
              </div>
            </section>
            {}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {}
              <div className="bg-surface-container-high rounded-2xl p-8 flex flex-col justify-center border border-surface-container-highest">
                <div className="max-w-sm">
                  <h2 className="font-headline text-2xl font-extrabold text-primary mb-4">
                    Transparency &amp; Financial Security / স্বচ্ছতা এবং আর্থিক নিরাপত্তা
                  </h2>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    Our escrow system ensures that your funds are protected until the service is verified / আমাদের
                    এসক্রো সিস্টেম নিশ্চিত করে যে পরিষেবা যাচাই না হওয়া পর্যন্ত আপনার অর্থ নিরাপদ থাকবে।
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">verified_user</span>
                      <span className="font-bold text-xs uppercase tracking-wider">
                        End-to-end Encrypted Records / সম্পূর্ণ এনক্রিপ্টেড রেকর্ড
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-xl">history_edu</span>
                      <span className="font-bold text-xs uppercase tracking-wider">
                        Digital Contracts / ডিজিটাল চুক্তি
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {}
              <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-surface-container-low">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-headline text-xl font-bold text-on-surface">Recent Invoices / সাম্প্রতিক ইনভয়েস</h2>
                  <button className="text-primary font-bold text-xs hover:underline uppercase tracking-widest">
                    View All / সব দেখুন
                  </button>
                </div>
                <div className="space-y-3">
                  {}
                  <div className="flex items-center justify-between p-4 bg-[#f8fafa] rounded-lg group hover:bg-[#e6e8e9] transition-all border border-transparent hover:border-primary/10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-surface-container-highest rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">description</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">Invoice #INV-2024-07 / ইনভয়েস</p>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                          July 2024 • Paid / জুলাই ২০২৪ • পরিশোধিত
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-sm">৳ 17,800.00</p>
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary cursor-pointer transition-colors">
                        download
                      </span>
                    </div>
                  </div>
                  {}
                  <div className="flex items-center justify-between p-4 bg-[#f8fafa] rounded-lg group hover:bg-[#e6e8e9] transition-all border border-transparent hover:border-primary/10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-surface-container-highest rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">description</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">Invoice #INV-2024-06 / ইনভয়েস</p>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                          June 2024 • Paid / জুন ২০২৪ • পরিশোধিত
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-sm">৳ 16,500.00</p>
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary cursor-pointer transition-colors">
                        download
                      </span>
                    </div>
                  </div>
                  {}
                  <div className="flex items-center justify-between p-4 bg-[#f8fafa] rounded-lg group hover:bg-[#e6e8e9] transition-all border border-transparent hover:border-primary/10">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-surface-container-highest rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary">description</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm">Invoice #INV-2024-05 / ইনভয়েস</p>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">
                          May 2024 • Paid / মে ২০২৪ • পরিশোধিত
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-bold text-sm">৳ 16,500.00</p>
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-primary cursor-pointer transition-colors">
                        download
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  );
}
