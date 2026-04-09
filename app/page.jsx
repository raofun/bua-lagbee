"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginPromptModal from "./components/LoginPromptModal";

export default function MarketplaceDiscovery() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [selectedHelperName, setSelectedHelperName] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsLoggedIn(localStorage.getItem("mock_logged_in") === "true");
        }
    }, []);

    const handleCardClick = (e, helperName) => {
        if (!isLoggedIn) {
            e.preventDefault();
            setSelectedHelperName(helperName);
            setShowLoginModal(true);
        }
    };

    const handleSearch = () => {
        alert("Searching for professionals in selected area...");
    };

    return (
        <>

            <main className="max-w-7xl mx-auto px-6 pb-24">
                {/* Hero & Refined Search Section */}
                <section className="py-12 md:py-20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-primary tracking-tight leading-tight mb-6">
                            Find the perfect <br />
                            <span className="text-secondary">household curator.</span>
                            <br />
                            <span className="text-3xl md:text-5xl font-bold opacity-80 block mt-2">সেরা গৃহকর্মী খুঁজুন।</span>
                        </h1>
                        {/* Refined Search & Filter Bar */}
                        <div className="mt-12 max-w-5xl">
                            <div className="glass-panel p-2 rounded-xl shadow-[0_12px_32px_rgba(20,29,31,0.04)] flex flex-col md:flex-row items-center gap-2 border border-surface-container-highest">
                                <div className="flex-1 w-full flex items-center px-4 gap-3 bg-surface-container-low rounded-lg py-3">
                                    <span className="material-symbols-outlined text-primary/60">search</span>
                                    <input
                                        className="bg-transparent border-none focus:ring-0 w-full text-sm font-body outline-none"
                                        placeholder="Search by skills or name... / দক্ষতা বা নাম দিয়ে খুঁজুন..."
                                        type="text"
                                    />
                                </div>
                                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-48 px-4 py-3 bg-surface-container-low rounded-lg flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xs text-primary/60">location_on</span>
                                        <select className="bg-transparent border-none focus:ring-0 text-xs font-semibold w-full appearance-none outline-none">
                                            <option>Dhaka, Banani / ঢাকা, বনানী</option>
                                            <option>Dhaka, Gulshan / ঢাকা, গুলশান</option>
                                            <option>Dhaka, Uttara / ঢাকা, উত্তরা</option>
                                        </select>
                                    </div>
                                    <div className="relative flex-1 md:w-48 px-4 py-3 bg-surface-container-low rounded-lg flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xs text-primary/60">construction</span>
                                        <select className="bg-transparent border-none focus:ring-0 text-xs font-semibold w-full appearance-none outline-none">
                                            <option>All Skills / সকল দক্ষতা</option>
                                            <option>Chef / বাবুর্চি</option>
                                            <option>Housekeeping / পরিচ্ছন্নতাকর্মী</option>
                                            <option>Nanny / আয়া</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-3 bg-surface-container-low rounded-lg flex-1 md:w-auto whitespace-nowrap">
                                        <input
                                            className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant/30"
                                            id="verified"
                                            type="checkbox"
                                        />
                                        <label
                                            className="text-[10px] font-bold text-primary flex items-center gap-1 uppercase cursor-pointer"
                                            htmlFor="verified"
                                        >
                                            Verified Only / ভেরিফাইড
                                            <span
                                                className="material-symbols-outlined text-[14px]"
                                                style={{ fontVariationSettings: "'FILL' 1" }}
                                            >
                                                verified
                                            </span>
                                        </label>
                                    </div>
                                    <button
                                        onClick={handleSearch}
                                        className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-lg font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md group flex items-center justify-center gap-2"
                                    >
                                        <span>Explore / খুঁজুন</span>
                                        <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Abstract background element */}
                    <div className="absolute top-0 right-0 -z-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
                        <div className="w-96 h-96 rounded-full bg-gradient-to-br from-primary to-secondary-container blur-3xl"></div>
                    </div>
                </section>

                {/* Grid of Helper Cards */}
                <section className="mt-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="font-headline text-3xl font-bold text-primary">Top Curators / সেরা কর্মীগণ</h2>
                            <p className="text-slate-500 font-body text-sm mt-1">
                                Available professionals in your selected area. / আপনার এলাকার দক্ষ কর্মীগণ।
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-primary text-white transition-colors">
                                <span className="material-symbols-outlined">grid_view</span>
                            </button>
                            <button className="p-2 rounded-lg bg-surface-container-low text-slate-400 hover:bg-secondary-container/20 transition-colors">
                                <span className="material-symbols-outlined">list</span>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <Link
                            href="/helper-profile"
                            onClick={(e) => handleCardClick(e, "Rahima Khatun")}
                            className="block bg-surface-container-lowest rounded-lg p-5 shadow-[0_4px_20px_rgba(20,29,31,0.03)] border border-surface-container-highest group hover:translate-y-[-4px] transition-all duration-300"
                        >
                            <div className="relative rounded-lg overflow-hidden h-64 mb-5">
                                <img
                                    alt="Professional Housekeeper"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDce2iccjxH57EwkdVn-QtCNllmmkzGGQ7IdkIoOXk9r_jsJRoBTwnl84myxtz6-xW2hnM7raau8j0Jggc0F8FX00XbiEXzYXGUcIa0s8syX2Be_mIul-SERRCoZyfG5rxSDh2tKEl7zYsgifVGonww5io9BnywH5K4HBR9HQF3L5vTjDnYVo2o-6npPstAprJLdhhAcamficiS3cVyDdIqVdMEEX5dOTzvSt6yR4mF7iq7UPQYuLkDLS282Zqj3lBgLzNBEcx7jtNM"
                                />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                                    <span
                                        className="material-symbols-outlined text-primary text-[18px]"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        verified
                                    </span>
                                    <span className="text-[9px] font-extrabold text-primary tracking-widest uppercase">
                                        NID Verified / এনআইডি ভেরিফাইড
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-headline text-xl font-bold text-on-surface">Rahima Khatun</h3>
                                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        Banani, Dhaka / বনানী, ঢাকা
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 bg-secondary-container/20 px-2 py-1 rounded-lg">
                                    <span
                                        className="material-symbols-outlined text-secondary text-sm"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        star
                                    </span>
                                    <span className="text-secondary font-bold text-xs">4.9</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 my-4">
                                <span className="bg-surface-container-high px-3 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-tight">
                                    Chef / বাবুর্চি
                                </span>
                                <span className="bg-surface-container-high px-3 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-tight">
                                    Bengali / বাঙালি খাবার
                                </span>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-surface-container-high">
                                <div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                        Monthly Rate / মাসিক বেতন
                                    </p>
                                    <p className="text-lg font-black text-primary font-headline">৳ 8,500</p>
                                </div>
                                <button className="bg-primary text-white p-3 rounded-lg hover:brightness-110 transition-all shadow-sm">
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </Link>

                        {/* Card 2 */}
                        <Link
                            href="/helper-profile"
                            onClick={(e) => handleCardClick(e, "Shabana Begum")}
                            className="block bg-surface-container-lowest rounded-lg p-5 shadow-[0_4px_20px_rgba(20,29,31,0.03)] border border-surface-container-highest group hover:translate-y-[-4px] transition-all duration-300"
                        >
                            <div className="relative rounded-lg overflow-hidden h-64 mb-5">
                                <img
                                    alt="Professional Nanny"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkg-1sI1nrmh5SUnibNb3GRmqIrTvWI6l1H1ovRcTbsFQinC2V9SWt2B2EI32PisFmhRU4ww-AJCzGl_G70CN3jDlQTGlSk3b3xb0EsQC_1Cv3Ue5IRKPcGN2j8G8pI-p9qxE71G0xyxE2dZugjIItahKe7XoTi0ztdbKqOwwQ_l_GbVMKIjpgZskdFN9mjUpWiKICYtGEGcwxTW59ERuf5gkyDTI9XkPePfrmdmuuMiTLorCcMfjd8TLIT4kI1s8Ld3r_aWEpx6Qh"
                                />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                                    <span
                                        className="material-symbols-outlined text-primary text-[18px]"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        verified
                                    </span>
                                    <span className="text-[9px] font-extrabold text-primary tracking-widest uppercase">
                                        NID Verified / এনআইডি ভেরিফাইড
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-headline text-xl font-bold text-on-surface">Shabana Begum</h3>
                                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        Gulshan 2, Dhaka / গুলশান ২, ঢাকা
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 bg-secondary-container/20 px-2 py-1 rounded-lg">
                                    <span
                                        className="material-symbols-outlined text-secondary text-sm"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        star
                                    </span>
                                    <span className="text-secondary font-bold text-xs">4.8</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 my-4">
                                <span className="bg-surface-container-high px-3 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-tight">
                                    Housekeeping / গৃহকর্মী
                                </span>
                                <span className="bg-surface-container-high px-3 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-tight">
                                    Laundry / ধোয়ামোছা
                                </span>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-surface-container-high">
                                <div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                        Monthly Rate / মাসিক বেতন
                                    </p>
                                    <p className="text-lg font-black text-primary font-headline">৳ 7,200</p>
                                </div>
                                <button className="bg-primary text-white p-3 rounded-lg hover:brightness-110 transition-all shadow-sm">
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </Link>

                        {/* Card 3 */}
                        <Link
                            href="/helper-profile"
                            onClick={(e) => handleCardClick(e, "Md. Jahangir")}
                            className="block bg-surface-container-lowest rounded-lg p-5 shadow-[0_4px_20px_rgba(20,29,31,0.03)] border border-surface-container-highest group hover:translate-y-[-4px] transition-all duration-300"
                        >
                            <div className="relative rounded-lg overflow-hidden h-64 mb-5">
                                <img
                                    alt="Executive Chef"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0LMxMhO7uREFaBnuezPwOUhGGSEZv7puqMWfhNAeRFDorB5GGwCtqZ-6ceRbRT388Nt_BV7nskOSmnliZG3vUPJ7h-SchsvmhLZOSeWE7fL5o_gB5uX8W8OpyLqo1NevMamJRFigraLGTh4mfzXyMih25jiwi5jpGIkLui84kn71LqPawCZ5E4AiT2RljHimiv05Zg17tsyaNz_4HVpSztI24piuCX7qCjAPNfLBfbvguOHI5hWfhoNAD0DSXxyeoV_TGC1WeM3wI"
                                />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                                    <span
                                        className="material-symbols-outlined text-primary text-[18px]"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        verified
                                    </span>
                                    <span className="text-[9px] font-extrabold text-primary tracking-widest uppercase">
                                        NID Verified / এনআইডি ভেরিফাইড
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-headline text-xl font-bold text-on-surface">Md. Jahangir</h3>
                                    <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                                        <span className="material-symbols-outlined text-sm">location_on</span>
                                        Baridhara, Dhaka / বারিধারা, ঢাকা
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 bg-secondary-container/20 px-2 py-1 rounded-lg">
                                    <span
                                        className="material-symbols-outlined text-secondary text-sm"
                                        style={{ fontVariationSettings: "'FILL' 1" }}
                                    >
                                        star
                                    </span>
                                    <span className="text-secondary font-bold text-xs">5.0</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 my-4">
                                <span className="bg-surface-container-high px-3 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-tight">
                                    Executive Chef / প্রধান বাবুর্চি
                                </span>
                                <span className="bg-surface-container-high px-3 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-tight">
                                    Continental / কন্টিনেন্টাল
                                </span>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-surface-container-high">
                                <div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                        Monthly Rate / মাসিক বেতন
                                    </p>
                                    <p className="text-lg font-black text-primary font-headline">৳ 12,000</p>
                                </div>
                                <button className="bg-primary text-white p-3 rounded-lg hover:brightness-110 transition-all shadow-sm">
                                    <span className="material-symbols-outlined">arrow_forward</span>
                                </button>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* Bottom Stats / Tonal Shift Section */}
                <section className="mt-20 p-12 bg-secondary-container/10 rounded-lg flex flex-col md:flex-row justify-between items-center gap-8 border border-secondary-container/20">
                    <div className="text-center md:text-left">
                        <h4 className="font-headline text-2xl font-bold text-primary">Need a custom plan? / কাস্টম প্ল্যান প্রয়োজন?</h4>
                        <p className="text-slate-600 max-w-md mt-2">
                            Our subscription models are designed to give you peace of mind with 100% replacement guarantee. / আমাদের ১০০% রিপ্লেসমেন্ট গ্যারান্টি আপনার নিশ্চয়তা নিশ্চিত করে।
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-sm shadow-sm hover:shadow-md transition-shadow border border-surface-container-highest">
                            Compare Plans / প্ল্যান তুলনা করুন
                        </button>
                        <button className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-sm hover:brightness-110 transition-all shadow-md">
                            Contact Support / সহায়তা নিন
                        </button>
                    </div>
                </section>
            </main>

            <LoginPromptModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                title="Login to View Profile"
                message={`To protect the privacy of our professionals like ${selectedHelperName || "this curator"}, we require users to be logged in to view their full profiles and reviews.`}
                bnMessage="প্রোফাইল দেখতে লগইন করুন"
            />
        </>
    );
}
