"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const role = localStorage.getItem("userRole");
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/profile");
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-4">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">refresh</span>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Redirecting to Secure Dashboard...</p>
      </div>
    </div>
  );
}
