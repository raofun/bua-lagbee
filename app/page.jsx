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
    const [helpers, setHelpers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("All Locations");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
    const [categories, setCategories] = useState(["Chef", "Housekeeping", "Nanny", "Driver"]);

    const dhakaAreas = [
        "All Locations", "Gulshan", "Banani", "Baridhara", "Dhanmondi", "Uttara", 
        "Bashundhara RA", "Mirpur", "Mohammadpur", "Banasree", "Niketan", 
        "Mohakhali", "Tejgaon", "Farmgate", "Shahbagh", "Motijheel", "Wari", 
        "Lalbagh", "Rampura", "Khilgaon", "Badda", "Shyamoli", "Malibagh"
    ];

    const fetchHelpers = async (filters = {}) => {
        setIsLoading(true);
        console.log("Fetching with filters:", filters);
        try {
            const params = new URLSearchParams();
            if (filters.search) params.append("search", filters.search);
            if (filters.location && filters.location !== "All Locations") params.append("location", filters.location);
            if (filters.category && !filters.category.includes("All Categories")) params.append("category", filters.category);
            if (filters.verified) params.append("verified", "true");

            
            const leanParams = new URLSearchParams(params);
            leanParams.append("excludeImage", "true");
            const leanUrl = `/api/helpers?${leanParams.toString()}`;
            
            const res = await fetch(leanUrl);
            const leanData = await res.json();
            
            if (leanData.success) {
                setHelpers(leanData.data);
                setIsLoading(false); 
                
                if (Object.keys(filters).length === 0) {
                    const uniqueCats = [...new Set(leanData.data.map(h => h.category).filter(Boolean))];
                    setCategories(prev => [...new Set([...prev, ...uniqueCats])]);
                }

                
                const fullUrl = `/api/helpers?${params.toString()}`;
                const fullRes = await fetch(fullUrl);
                const fullData = await fullRes.json();
                
                if (fullData.success) {
                    setHelpers(prev => {
                        const imageMap = new Map(fullData.data.map(h => [h._id, h.image]));
                        return prev.map(h => ({
                            ...h,
                            image: imageMap.get(h._id) || h.image
                        }));
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch helpers:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHelpers();
    }, []);

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
        fetchHelpers({
            search: searchQuery,
            location: selectedLocation,
            category: selectedCategory,
            verified: isVerifiedOnly
        });
    };

    return (
        <>

            <main className="max-w-7xl mx-auto px-6 pb-24">
                {}
                <section className="py-12 md:py-20 relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-primary tracking-tight leading-tight mb-6">
                            Find the perfect <br />
                            <span className="text-secondary">household curator.</span>
                            <br />
                            <span className="text-3xl md:text-5xl font-bold opacity-80 block mt-2">সেরা গৃহকর্মী খুঁজুন।</span>
                        </h1>
                        {}
                        <div className="mt-12 max-w-5xl">
                            <div className="glass-panel p-2 rounded-xl shadow-[0_12px_32px_rgba(20,29,31,0.04)] flex flex-col md:flex-row items-center gap-2 border border-surface-container-highest">
                                <div className="flex-1 w-full flex items-center px-4 gap-3 bg-surface-container-low rounded-lg py-3">
                                    <span className="material-symbols-outlined text-primary/60">search</span>
                                    <input
                                        className="bg-transparent border-none focus:ring-0 w-full text-sm font-body outline-none"
                                        placeholder="Search by category or name... / ক্যাটাগরি বা নাম দিয়ে খুঁজুন..."
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    />
                                </div>
                                <div className="flex flex-wrap md:flex-nowrap items-center gap-2 w-full md:w-auto">
                                    <div className="relative flex-1 md:w-48 px-4 py-3 bg-surface-container-low rounded-lg flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xs text-primary/60">location_on</span>
                                        <select 
                                            className="bg-transparent border-none focus:ring-0 text-xs font-semibold w-full appearance-none outline-none"
                                            value={selectedLocation}
                                            onChange={(e) => setSelectedLocation(e.target.value)}
                                        >
                                            {dhakaAreas.map(area => (
                                                <option key={area} value={area}>{area}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="relative flex-1 md:w-48 px-4 py-3 bg-surface-container-low rounded-lg flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xs text-primary/60">category</span>
                                        <select 
                                            className="bg-transparent border-none focus:ring-0 text-xs font-semibold w-full appearance-none outline-none"
                                            value={selectedCategory}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        >
                                            <option value="All Categories">All Categories / সকল ক্যাটাগরি</option>
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-3 bg-surface-container-low rounded-lg flex-1 md:w-auto whitespace-nowrap">
                                        <input
                                            className="rounded text-primary focus:ring-primary h-4 w-4 border-outline-variant/30"
                                            id="verified"
                                            type="checkbox"
                                            checked={isVerifiedOnly}
                                            onChange={(e) => setIsVerifiedOnly(e.target.checked)}
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
                    {}
                    <div className="absolute top-0 right-0 -z-0 opacity-10 transform translate-x-1/4 -translate-y-1/4 pointer-events-none">
                        <div className="w-96 h-96 rounded-full bg-gradient-to-br from-primary to-secondary-container blur-3xl"></div>
                    </div>
                </section>

                {}
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
                        {isLoading ? (
                            Array(3).fill(0).map((_, i) => (
                                <div key={i} className="animate-pulse bg-surface-container-high h-96 rounded-lg"></div>
                            ))
                        ) : helpers.length > 0 ? (
                            helpers.map((helper) => (
                                <Link
                                    key={helper._id}
                                    href={`/helper-profile/${helper._id}`}
                                    onClick={(e) => handleCardClick(e, helper.name)}
                                    className="block bg-surface-container-lowest rounded-lg p-5 shadow-[0_4px_20px_rgba(20,29,31,0.03)] border border-surface-container-highest group hover:translate-y-[-4px] transition-all duration-300"
                                >
                                    <div className="relative rounded-lg overflow-hidden h-64 mb-5">
                                        <img
                                            alt={helper.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            src={helper.image}
                                        />
                                        {helper.nid && helper.nid.trim().length > 0 && (
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
                                        )}
                                    </div>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-headline text-xl font-bold text-on-surface">{helper.name}</h3>
                                            <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                                                <span className="material-symbols-outlined text-sm">location_on</span>
                                                {helper.location} / {helper.bnLocation}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 bg-secondary-container/20 px-2 py-1 rounded-lg">
                                            <span
                                                className="material-symbols-outlined text-secondary text-sm"
                                                style={{ fontVariationSettings: "'FILL' 1" }}
                                            >
                                                star
                                            </span>
                                            <span className="text-secondary font-bold text-xs">{helper.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 my-4">
                                        {helper.tasks && helper.tasks.length > 0 ? (
                                            helper.tasks.map((task, idx) => (
                                                <span key={idx} className="bg-surface-container-high px-3 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-tight">
                                                    {task.name} / {task.bnName}
                                                </span>
                                            ))
                                        ) : (
                                            helper.skills.map((skill, idx) => (
                                                <span key={idx} className="bg-surface-container-high px-3 py-1 rounded-lg text-[10px] font-bold text-primary uppercase tracking-tight">
                                                    {skill} / {helper.bnSkills[idx]}
                                                </span>
                                            ))
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-surface-container-high">
                                        <div>
                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                                                Monthly Rate / মাসিক বেতন
                                            </p>
                                            <p className="text-lg font-black text-primary font-headline">৳ {helper.monthlyRate.toLocaleString()}</p>
                                        </div>
                                        <button className="bg-primary text-white p-3 rounded-lg hover:brightness-110 transition-all shadow-sm">
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </button>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 bg-surface-container-low rounded-2xl">
                                <p className="text-slate-500">No curators found in this area. / এই এলাকায় কোনো কর্মী পাওয়া যায়নি।</p>
                            </div>
                        )}
                    </div>
                </section>

                {}
                <section className="mt-20 p-12 bg-primary/5 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-8 border border-primary/10 relative overflow-hidden">
                    {}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                    
                    <div className="text-center md:text-left relative z-10">
                        <h4 className="font-headline text-2xl md:text-3xl font-bold text-primary">Need assistance? / সহায়তা প্রয়োজন?</h4>
                        <p className="text-slate-600 max-w-lg mt-3 text-base">
                            Our dedicated support team is here to help you find the perfect curator and answer any questions about our services. / আমাদের সাপোর্ট টিম আপনার জন্য সেরা কর্মী খুঁজে দিতে এবং যেকোনো প্রশ্নের উত্তর দিতে প্রস্তুত।
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
                        <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold text-sm shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all border border-surface-container-highest flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">chat_bubble</span>
                            Live Chat / লাইভ চ্যাট
                        </button>
                        <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_20px_rgba(var(--primary-rgb),0.3)] flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">call</span>
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
