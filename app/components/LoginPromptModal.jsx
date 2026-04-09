"use client";

import { useRouter } from "next/navigation";

export default function LoginPromptModal({ 
  isOpen, 
  onClose, 
  title = "Login Required", 
  message = "Please login to proceed with this action.",
  bnMessage = "চালিয়ে যেতে লগইন করুন",
  buttonText = "Login / Sign Up",
  redirectUrl = "/login"
}) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = () => {
    router.push(`${redirectUrl}?redirect=${window.location.pathname}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 fade-in duration-300 border border-white/20">
        <div className="p-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <span className="material-symbols-outlined text-primary text-[32px]">lock</span>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="font-headline text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              {title}
            </h2>
            <p className="text-[12px] text-slate-500 font-bold uppercase tracking-widest mb-4">
              {bnMessage}
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {message}
            </p>
          </div>

          <div className="space-y-3">
            <button 
              onClick={handleLogin}
              className="w-full bg-primary text-white py-4 rounded-xl font-bold font-headline tracking-wide flex justify-center items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              <span>{buttonText}</span>
              <span className="material-symbols-outlined text-[18px]">login</span>
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 py-4 rounded-xl font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 font-medium">
            It only takes a minute to create an account and start hiring!
          </p>
        </div>
      </div>
    </div>
  );
}
