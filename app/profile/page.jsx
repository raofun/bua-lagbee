"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const router = useRouter();
  
  // File Upload State and Refs
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuBCBOZ91jjAiMGJFiPPe2-hz0yqydE4T0nfQl3rlSaDtwcw-N5XlXXIx6ZL04ylI9ktcAiv8XJr3wDHaFUYcQZZLbHNXlJ2n-eAangaBJsNrjXRYuLxaErdBc4zMITlKW9XdagyA15Im3oftLnkf4urQiVw2s2r6BPaC6MMred6h640BNs_MWs0hu1n1m4l6ZnahDK3PWBoze8GQEFQeZ5wYvUYAZoP5X0_advJCbwpruMf_XSdncTmxIwi4Gvz_U_pMAMtZiN3AnbC");
  const [coverUrl, setCoverUrl] = useState("");
  
  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverUrl(URL.createObjectURL(e.target.files[0]));
    }
  };
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: "Raofun",
    lastName: "Azad",
    email: "raofunazad851@gmail.com",
    phone: "017XXXXXXXX",
    address: "House 12, Road 5, Block C, Banani, Dhaka",
    nid: "1234567890"
  });

  const [isLoading, setIsLoading] = useState(false);

  // If you try to view the profile but aren't logged in, it will still show for demo purposes
  // but normally you would protect this route.

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Mimic API delay
    setTimeout(() => {
      setIsLoading(false);
      alert("Profile updated successfully! / প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
    }, 800);
  };

  const handleLogout = () => {
    localStorage.removeItem("mock_logged_in");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-surface py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-headline text-3xl font-extrabold text-primary">Your Profile</h1>
            <p className="text-slate-500 mt-1">Manage your personal information and contact details. <span className="text-[11px] block mt-0.5">আপনার ব্যক্তিগত তথ্য এবং যোগাযোগের বিবরণ পরিচালনা করুন।</span></p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-bold text-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Logout
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          {/* Cover Photo Area */}
          <div 
            className={`h-32 relative ${!coverUrl ? 'bg-gradient-to-r from-primary to-secondary' : ''}`}
            style={coverUrl ? { backgroundImage: `url(${coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
          >
            <input 
              type="file" 
              ref={coverInputRef} 
              onChange={handleCoverChange} 
              className="hidden" 
              accept="image/*" 
            />
            <button 
              onClick={() => coverInputRef.current.click()}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-full text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">edit</span>
            </button>
          </div>

          <form onSubmit={handleSave} className="p-6 md:p-10 relative">
            {/* Avatar Upload */}
            <div className="absolute -top-16 left-6 md:left-10">
              <input 
                type="file" 
                ref={avatarInputRef} 
                onChange={handleAvatarChange} 
                className="hidden" 
                accept="image/*" 
              />
              <div 
                className="relative group cursor-pointer"
                onClick={() => avatarInputRef.current.click()}
              >
                <div className="w-28 h-28 rounded-full border-4 border-white dark:border-slate-900 overflow-hidden bg-slate-200">
                  <img 
                    src={avatarUrl} 
                    alt="Profile Avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-white">photo_camera</span>
                </div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Fields */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">First Name <span className="text-[10px] font-normal">প্রথম নাম</span></label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all outline-none"
                  type="text"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">Last Name <span className="text-[10px] font-normal">শেষ নাম</span></label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all outline-none"
                  type="text"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">Email <span className="text-[10px] font-normal">ইমেইল</span></label>
                <input
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed outline-none"
                  type="email"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 ml-1">Phone Number <span className="text-[10px] font-normal">ফোন নম্বর</span></label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all outline-none"
                  type="tel"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 ml-1">Full Address <span className="text-[10px] font-normal">পূর্ণ ঠিকানা</span></label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all outline-none"
                  type="text"
                  placeholder="Street, City, Postal Code"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 ml-1">National ID (NID) <span className="text-[10px] font-normal">জাতীয় পরিচয়পত্র নম্বর</span></label>
                <input
                  name="nid"
                  value={formData.nid}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-800 border focus:bg-white dark:focus:bg-slate-900 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-slate-900 dark:text-white transition-all outline-none"
                  type="text"
                />
                <p className="text-[10px] text-slate-400 mt-1 ml-1">Your NID is kept secure and is only used for background verification.</p>
              </div>
            </div>

            <div className="mt-10 flex border-t border-slate-100 dark:border-slate-800 pt-6 justify-end">
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white font-bold py-3.5 px-8 rounded-xl hover:brightness-110 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group w-full md:w-auto"
              >
                {isLoading ? (
                  <span className="material-symbols-outlined animate-spin" style={{fontVariationSettings: "'wght' 300"}}>refresh</span>
                ) : (
                  <>
                    <span>Save Changes</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-8 px-6 py-8 rounded-3xl bg-primary/5 border border-primary/10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="material-symbols-outlined text-primary mb-2 text-[32px] opacity-80">construction</span>
          <h3 className="font-headline text-lg font-bold text-slate-800 dark:text-slate-200">More Features Coming Soon</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            We're constantly working on bringing you new ways to manage your household easily. Stay tuned for exciting updates!
            <span className="block text-[11px] mt-1 opacity-80">আরো নতুন ফিচার খুব শীঘ্রই আসছে...</span>
          </p>
        </div>
      </div>
    </main>
  );
}
