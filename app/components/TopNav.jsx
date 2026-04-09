"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function TopNav() {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  
  // Example Notifications State
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Helper confirmed', desc: 'Rahima Begum has accepted your booking.', time: '2 mins ago', isRead: false },
    { id: 2, title: 'Wallet Top-up Successful', desc: '৳500 added to your balance.', time: '1 hour ago', isRead: true },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };
  
  // Mock login state for UI demonstration
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoggedIn(localStorage.getItem("mock_logged_in") === "true");
      setUserRole(localStorage.getItem("mock_user_role") || "user");
    }
  }, [pathname]);
  
  if (pathname === '/admin' || pathname === '/login') return null; // Hide on Admin and Login
  
  return (
    <nav className="bg-[#f2fbfe] dark:bg-slate-900 sticky top-0 z-50 transition-all duration-200 border-b border-surface-container-high">
      <div className="flex justify-between items-center w-full px-6 py-4">
        <div className="flex items-center gap-8">
          <Link href="/">
            <span className="text-2xl font-black text-primary dark:text-cyan-500 font-headline tracking-tighter">
              Bua Lagbe
            </span>
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "text-primary dark:text-cyan-400 border-b-2 border-primary py-1" : "text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              } font-bold font-body text-xs tracking-tight`}
            >
              Marketplace / মার্কেটপ্লেস
            </Link>

            {isLoggedIn && userRole === "admin" && (
              <Link
                href="/dashboard"
                className={`${
                  pathname === "/dashboard" ? "text-primary dark:text-cyan-400 border-b-2 border-primary py-1" : "text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
                } font-bold font-body text-xs tracking-tight`}
              >
                Dashboard / ড্যাশবোর্ড
              </Link>
            )}

            {isLoggedIn && (
              <Link
                href="/financials"
                className={`${
                  pathname === "/financials" ? "text-primary dark:text-cyan-400 border-b-2 border-primary py-1" : "text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
                } font-bold font-body text-xs tracking-tight`}
              >
                Financials / আর্থিক
              </Link>
            )}

            <Link
              href="/attendance"
              className={`${
                pathname === "/attendance" ? "text-primary dark:text-cyan-400 border-b-2 border-primary py-1" : "text-slate-500 dark:text-slate-400 hover:text-primary transition-colors"
              } font-bold font-body text-xs tracking-tight`}
            >
              Short Hiring / স্বল্পমেয়াদী নিয়োগ
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Link href="/support">
              <button className="bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest hover:scale-95 duration-200 shadow-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">emergency</span>
                SOS / জরুরি
              </button>
            </Link>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-slate-500 hover:text-primary transition-colors flex items-center relative"
              >
                <span className="material-symbols-outlined">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#f2fbfe] dark:border-slate-900"></span>
                )}
              </button>
              
              {/* Notifications Popup Menu */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 py-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 pb-2 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-sm text-slate-800 dark:text-white">Notifications {unreadCount > 0 && `(${unreadCount})`}</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-[10px] text-primary font-bold hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-50 dark:border-slate-700/30 transition-colors ${notification.isRead ? 'opacity-60' : 'bg-[#e0f7fa]/30 dark:bg-cyan-900/20'}`}
                        >
                          <div className="flex justify-between items-start">
                            <p className="text-xs font-bold text-slate-800 dark:text-white">{notification.title}</p>
                            {!notification.isRead && (
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1"></div>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-500 mt-0.5">{notification.desc}</p>
                          <p className="text-[9px] text-slate-400 mt-1">{notification.time}</p>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-6 text-center text-xs text-slate-500">No notifications</div>
                    )}
                  </div>
                  <div className="px-4 pt-2 mt-1 text-center">
                    <Link href="#" className="text-[11px] font-bold text-primary hover:underline">View all notifications</Link>
                  </div>
                </div>
              )}
            </div>

            {isLoggedIn ? (
              <Link href="/profile">
                <button className="text-slate-500 hover:text-primary transition-colors flex items-center ml-2 border-l border-slate-200 dark:border-slate-700 pl-4">
                  <span className="material-symbols-outlined text-[26px]">account_circle</span>
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <button className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white px-5 py-1.5 rounded-full text-xs font-bold transition-all ml-2 ml-4">
                  Login / Sign Up
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
