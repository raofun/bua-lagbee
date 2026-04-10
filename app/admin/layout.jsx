"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib/auth";

export default function AdminLayout({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem("userRole");
        const loggedIn = localStorage.getItem("mock_logged_in") === "true";

        if (!loggedIn || role !== "admin") {
            router.push("/login?callback=/admin");
        } else {
            setIsAdmin(true);
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="material-symbols-outlined animate-spin text-4xl text-primary">refresh</div>
            </div>
        );
    }

    const menuItems = [
        { name: "Overview", icon: "dashboard", href: "/admin" },
        { name: "Helpers", icon: "groups", href: "/admin/helpers" },
        { name: "Users", icon: "person", href: "/admin/users" },
        { name: "Platform", icon: "settings_suggest", href: "/" },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {}
            <aside className="w-72 bg-white border-r border-slate-100 flex flex-col sticky top-0 h-screen">
                <div className="p-8">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                            <span className="material-symbols-outlined">shield_person</span>
                        </div>
                        <div>
                            <h1 className="font-headline font-black text-xl text-slate-900 tracking-tighter">Admin<span className="text-primary">Hub</span></h1>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Bualagbe Management</p>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${isActive
                                    ? "bg-primary text-white shadow-xl shadow-primary/20"
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                <span className={`material-symbols-outlined text-[22px] ${isActive ? "text-white" : "text-slate-400 group-hover:text-primary"}`}>
                                    {item.icon}
                                </span>
                                <span className="font-bold text-sm tracking-tight">{item.name}</span>
                                {isActive && (
                                    <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-slate-50">
                    <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black">
                            A
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-slate-900 truncate">Admin Account</p>
                            <p className="text-[10px] text-slate-400 truncate">admin@bualagbe.com</p>
                        </div>
                        <button
                            onClick={() => {
                                logout(router);
                            }}
                            className="material-symbols-outlined text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                        >
                            logout
                        </button>
                    </div>
                </div>
            </aside>

            {}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-50">
                    <h2 className="font-headline text-lg font-black text-slate-900">
                        {menuItems.find(i => i.href === pathname)?.name || "Dashboard"}
                    </h2>
                    <div className="flex items-center gap-6">
                        <button className="relative w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="w-px h-6 bg-slate-100"></div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                            System Status: <span className="text-green-500">Operational</span>
                        </p>
                    </div>
                </header>

                <div className="p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
