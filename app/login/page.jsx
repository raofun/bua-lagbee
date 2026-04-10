"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { Suspense } from "react";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectPath = searchParams.get("redirect") || "/";
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [dbStatus, setDbStatus] = useState("checking");

    useEffect(() => {
        const checkDB = async () => {
            try {

                const res = await fetch("/api/helpers");
                const data = await res.json();
                if (data.success) setDbStatus("connected");
                else setDbStatus("error");
            } catch (err) {
                setDbStatus("error");
            }
        };
        checkDB();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");
        const name = !isLogin ? `${formData.get("firstName")} ${formData.get("lastName")}` : "";

        const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
        const body = isLogin ? { email, password } : { name, email, password };

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("mock_logged_in", "true");
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("userName", data.user.name);
                localStorage.setItem("userRole", data.user.role || "user");
                router.push(redirectPath);
            } else {
                setError(data.message || "Something went wrong");
            }
        } catch (error) {
            setError("Failed to connect to server");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col md:flex-row items-stretch bg-surface">
            { }
            <div className="hidden md:flex md:w-5/12 lg:w-4/12 bg-primary relative p-12 flex-col justify-between overflow-hidden">
                { }
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBEeiMMJNeeC0YJ5pZ_1Pa-n5dejz35VxnSEUbzxpeTtjXZ-R2mjFxGKKJoL7FVRK85suVRiDaNdjvnsERSMeLL7UAEAwzqOmpQAUcIBZlv_yIxKAjhj_CHYPdCfsro5EcoyI7qQiDntV_QIN0H7Vab68thomir7pNFe5s9nTDxg-BNiEtYQjnMjTpEzE8GRn90kQ7GR2tdGqgjA80XbIvE6TzZuCo8NBXU3sT1OcaW1tPWDorKnCKZtKkPw4wH3srgOlPq4D_0El3n')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary via-[#005f68] to-secondary opacity-[0.85]"></div>

                <div className="relative z-10 mt-12">
                    <Link href="/">
                        <h1 className="font-headline text-5xl font-black text-white tracking-tighter mb-2 hover:opacity-90 transition-opacity">
                            Bua Lagbe
                            <span className="block text-[24px] mt-1 font-normal opacity-90">বুয়া লাগবে</span>
                        </h1>
                    </Link>
                    <p className="text-white/80 font-medium text-lg leading-relaxed mt-4">
                        Your trusted destination for quality household services.
                        <span className="block text-[13px] opacity-80 mt-1">সেবায় মর্যাদা, যত্নে গুণমান।</span>
                    </p>
                </div>

                <div className="relative z-10 pb-8">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <span className="material-symbols-outlined text-white p-2.5 bg-white/10 backdrop-blur-sm rounded-xl">verified_user</span>
                            <div>
                                <h3 className="font-bold text-white text-lg">
                                    Verified Professionals
                                    <span className="block text-[12px] font-normal opacity-80 mt-0.5">বিশ্বস্ত যাচাইকরণ</span>
                                </h3>
                                <p className="text-white/70 text-sm mt-1">100% background and NID checked staff.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="material-symbols-outlined text-white p-2.5 bg-white/10 backdrop-blur-sm rounded-xl">payments</span>
                            <div>
                                <h3 className="font-bold text-white text-lg">
                                    Secure Wallet
                                    <span className="block text-[12px] font-normal opacity-80 mt-0.5">নিরাপদ পেমেন্ট</span>
                                </h3>
                                <p className="text-white/70 text-sm mt-1">Reliable, fast, and secure payments via your wallet.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            { }
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 lg:p-24 overflow-y-auto">
                <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                    <div className="text-center md:text-left space-y-2">
                        <h2 className="font-headline text-3xl font-extrabold text-on-surface">
                            {isLogin ? "Welcome Back" : "Create an Account"}
                            <span className="block text-[14px] text-slate-500 font-medium mt-1">
                                {isLogin ? "স্বাগতম" : "আপনার অ্যাকাউন্ট তৈরি করুন"}
                            </span>
                        </h2>
                        <p className="text-slate-500 text-sm">
                            {isLogin ? "Sign in to continue to Bua Lagbe." : "Join thousands of verified households today."}
                            <span className="block text-[11px] opacity-80 mt-0.5">
                                {isLogin ? "বুয়া লাগবে-তে চালিয়ে যেতে সাইন ইন করুন।" : "আজই হাজার হাজার যাচাইকৃত পরিবারের সাথে যোগ দিন।"}
                            </span>
                        </p>

                        <div className={`mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest ${dbStatus === 'connected' ? 'bg-green-50 border-green-100 text-green-600' :
                            dbStatus === 'error' ? 'bg-red-50 border-red-100 text-red-600' :
                                'bg-slate-50 border-slate-100 text-slate-400'
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${dbStatus === 'connected' ? 'bg-green-500 animate-pulse' :
                                dbStatus === 'error' ? 'bg-red-500' : 'bg-slate-300'
                                }`}></span>
                            Database Status: {dbStatus === 'connected' ? 'Live & Connected' : dbStatus === 'error' ? 'Disconnected / No URI' : 'Checking Sync...'}
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold border border-red-100 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">error</span>
                                {error}
                            </div>
                        )}
                    </div>

                    { }
                    <div className="flex justify-center w-full">
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                try {
                                    const res = await fetch("/api/auth/google", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ credential: credentialResponse.credential }),
                                    });
                                    const data = await res.json();
                                    if (data.success) {
                                        localStorage.setItem("mock_logged_in", "true");
                                        localStorage.setItem("userId", data.user.id);
                                        localStorage.setItem("userName", data.user.name);
                                        localStorage.setItem("userRole", data.user.role || "user");
                                        router.push(redirectPath);
                                    } else {
                                        setError(data.message || "Google Login failed");
                                    }
                                } catch (err) {
                                    setError("Failed to connect to authentication server");
                                }
                            }}
                            onError={() => {
                                setError("Google Authentication cancelled");
                            }}
                            size="large"
                            shape="rectangular"
                            theme="outline"
                            width="100%"
                        />
                    </div>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <div className="flex-shrink-0 mx-4">
                            <span className="block text-xs font-bold uppercase tracking-widest text-slate-400 text-center">or sign in with email</span>
                            <span className="block text-[9px] text-slate-400 text-center mt-0.5">অথবা ইমেল দিয়ে সাইন ইন করুন</span>
                        </div>
                        <div className="flex-grow border-t border-slate-200"></div>
                    </div>

                    { }
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 ml-1">
                                        First Name <span className="text-[10px] ml-1 font-normal">প্রথম নাম</span>
                                    </label>
                                    <input
                                        name="firstName"
                                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-slate-900 transition-all outline-none"
                                        placeholder="John"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 ml-1">
                                        Last Name <span className="text-[10px] ml-1 font-normal">শেষ নাম</span>
                                    </label>
                                    <input
                                        name="lastName"
                                        className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-slate-900 transition-all outline-none"
                                        placeholder="Doe"
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 ml-1 flex flex-col">
                                <span>Email Address / Phone Number</span>
                                <span className="text-[10px] font-normal">ইমেল ঠিকানা / ফোন নম্বর</span>
                            </label>
                            <input
                                name="email"
                                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-slate-900 transition-all outline-none"
                                placeholder="john@example.com"
                                type="email"
                                required
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-end ml-1 mb-1">
                                <label className="text-xs font-bold text-slate-500 flex flex-col">
                                    <span>Password</span>
                                    <span className="text-[10px] font-normal">পাসওয়ার্ড</span>
                                </label>
                                {isLogin && (
                                    <button type="button" className="text-xs font-bold text-primary hover:text-[#005f68] transition-colors flex flex-col items-end">
                                        <span>Forgot password?</span>
                                    </button>
                                )}
                            </div>
                            <div className="relative">
                                <input
                                    name="password"
                                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl px-4 py-3 text-slate-900 transition-all outline-none"
                                    placeholder="••••••••"
                                    type="password"
                                    required
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors" type="button">
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                </button>
                            </div>
                        </div>

                        <button
                            disabled={isLoading}
                            className="w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-[0.98] transition-all mt-6 text-sm flex flex-col items-center disabled:opacity-70"
                        >
                            {isLoading ? (
                                <span className="material-symbols-outlined animate-spin">refresh</span>
                            ) : (
                                <>
                                    <span>{isLogin ? "Sign In" : "Create Account"}</span>
                                    <span className="text-[11px] font-normal opacity-90">{isLogin ? "সাইন ইন করুন" : "নিবন্ধন করুন"}</span>
                                </>
                            )}
                        </button>
                    </form>

                    { }
                    <p className="text-center text-sm text-slate-500 pt-3 flex flex-col items-center">
                        <span>
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary font-bold hover:underline transition-all ml-1"
                            >
                                {isLogin ? "Register here" : "Login here"}
                            </button>
                        </span>
                        <span className="text-[11px] mt-1">
                            {isLogin ? "অ্যাকাউন্ট নেই? " : "ইতিমধ্যে অ্যাকাউন্ট আছে? "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary hover:underline transition-all font-medium ml-1"
                            >
                                {isLogin ? "এখানে নিবন্ধন করুন" : "এখানে লগইন করুন"}
                            </button>
                        </span>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default function Login() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <LoginForm />
        </Suspense>
    );
}
