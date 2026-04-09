"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function BottomNav() {
  const pathname = usePathname();
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
    <div className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-50 rounded-t-xl shadow-[0_-4px_20px_rgba(20,29,31,0.06)] border-t border-surface-container-high">
      <Link
        href="/"
        className={`flex flex-col items-center justify-center ${
          pathname === "/" ? "bg-primary text-white rounded-lg px-6 py-2 scale-90" : "text-slate-500 hover:bg-slate-100 p-2 rounded-lg"
        } transition-all duration-150`}
      >
        <span className="material-symbols-outlined">home</span>
        <span className="text-[9px] font-body font-bold">Home</span>
      </Link>
      
      <Link
        href="/attendance"
        className={`flex flex-col items-center justify-center ${
          pathname === "/attendance" ? "bg-primary text-white rounded-lg px-6 py-2 scale-90" : "text-slate-500 hover:bg-slate-100 p-2 rounded-lg"
        } transition-all duration-150`}
      >
        <span className="material-symbols-outlined">assignment</span>
        <span className="text-[9px] font-body font-bold text-center leading-tight">Short Hiring</span>
      </Link>

      {isLoggedIn && userRole === "admin" && (
        <Link
          href="/dashboard"
          className={`flex flex-col items-center justify-center ${
            pathname === "/dashboard" ? "bg-primary text-white rounded-lg px-6 py-2 scale-90" : "text-slate-500 hover:bg-slate-100 p-2 rounded-lg"
          } transition-all duration-150`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[9px] font-body font-bold">Dashboard</span>
        </Link>
      )}

      {isLoggedIn && (
        <Link
          href="/financials"
          className={`flex flex-col items-center justify-center ${
            pathname === "/financials" ? "bg-primary text-white rounded-lg px-6 py-2 scale-90" : "text-slate-500 hover:bg-slate-100 p-2 rounded-lg"
          } transition-all duration-150`}
        >
          <span className="material-symbols-outlined">account_balance</span>
          <span className="text-[9px] font-body font-bold">Financials</span>
        </Link>
      )}

      <Link
         href="/profile"
         className={`flex flex-col items-center justify-center ${
           pathname === "/profile" ? "bg-primary text-white rounded-lg px-6 py-2 scale-90" : "text-slate-500 hover:bg-slate-100 p-2 rounded-lg"
         } transition-all duration-150`}
       >
         <span className="material-symbols-outlined">person</span>
         <span className="text-[9px] font-body font-bold">Profile</span>
       </Link>
    </div>
  );
}
