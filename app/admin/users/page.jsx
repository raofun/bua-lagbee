"use client";

import { useState, useEffect } from "react";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rechargeModal, setRechargeModal] = useState({ open: false, userId: null, amount: "", name: "" });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const adminId = localStorage.getItem("userId");
        try {

            const leanRes = await fetch(`/api/admin/users?adminId=${adminId}&excludeImage=true`);
            const leanData = await leanRes.json();
            if (leanData.success) {
                setUsers(leanData.users);
                setIsLoading(false);


                const fullRes = await fetch(`/api/admin/users?adminId=${adminId}`);
                const fullData = await fullRes.json();
                if (fullData.success) {
                    setUsers(prev => {
                        const imageMap = new Map(fullData.users.map(u => [u._id, u.image]));
                        return prev.map(u => ({
                            ...u,
                            image: imageMap.get(u._id) || u.image
                        }));
                    });
                }
            }
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setIsLoading(false);
        }
    };

    const handleRoleToggle = async (userId, currentRole) => {
        const adminId = localStorage.getItem("userId");
        const newRole = currentRole === "admin" ? "user" : "admin";

        if (!confirm(`Are you sure you want to change this user to ${newRole}?`)) return;

        try {
            const res = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adminId, targetUserId: userId, newRole })
            });
            const data = await res.json();
            if (data.success) {
                fetchUsers();
            } else {
                alert(data.message || "Failed to update role");
            }
        } catch (error) {
            alert("Error connecting to server");
        }
    };

    const handleRecharge = async (e) => {
        e.preventDefault();
        if (!rechargeModal.amount || isNaN(rechargeModal.amount) || Number(rechargeModal.amount) <= 0) {
            alert("Please enter a valid positive amount");
            return;
        }
        const adminId = localStorage.getItem("userId");
        try {
            const res = await fetch("/api/admin/recharge", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    adminId,
                    targetUserId: rechargeModal.userId,
                    amount: Number(rechargeModal.amount)
                })
            });
            const data = await res.json();
            if (data.success) {
                setRechargeModal({ open: false, userId: null, amount: "", name: "" });
                fetchUsers();
            } else {
                alert(data.message || "Failed to add balance");
            }
        } catch (error) {
            alert("Error connecting to server");
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-headline text-2xl font-black text-slate-900">User Directory</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Manage stakeholder access and roles</p>
                </div>
            </div>

            <div className="space-y-10">
                {[
                    { title: "Administrators", subtitle: "Full platform access controls", data: users.filter(u => u.role === 'admin') },
                    { title: "Standard Users", subtitle: "General registrants and consumers", data: users.filter(u => u.role !== 'admin') }
                ].map((section, index) => (
                    <div key={index} className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                            <h4 className="font-headline font-black text-xl text-slate-900">{section.title}</h4>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">{section.subtitle}</p>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-slate-100">
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">User Identity</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Role</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Wallet Balance</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Joined Date</th>
                                    <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Access Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {section.data.map((u) => (
                                    <tr key={u._id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 overflow-hidden border border-slate-200">
                                                    {u.image ? (
                                                        <img src={u.image} alt={u.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        u.name?.charAt(0) || "U"
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900">{u.name}</p>
                                                    <p className="text-xs text-slate-400 font-medium">{u.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${u.role === 'admin'
                                                ? 'bg-purple-100 text-purple-600'
                                                : 'bg-blue-100 text-blue-600'
                                                }`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-black text-slate-900">৳{u.balance?.toLocaleString()}</p>
                                        </td>
                                        <td className="px-8 py-6 text-xs font-bold text-slate-400">
                                            {new Date(u.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setRechargeModal({ open: true, userId: u._id, amount: "", name: u.name })}
                                                    className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 border-emerald-100 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-500 transition-all flex items-center gap-1"
                                                >
                                                    <span className="material-symbols-outlined text-[14px]">account_balance_wallet</span> Add Balance
                                                </button>
                                                <button
                                                    onClick={() => handleRoleToggle(u._id, u.role)}
                                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${u.role === 'admin'
                                                        ? 'border-slate-100 text-slate-400 hover:border-red-500 hover:text-red-500'
                                                        : 'border-primary/20 text-primary hover:bg-primary hover:text-white'
                                                        }`}
                                                >
                                                    {u.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {section.data.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-8 py-10 text-center text-sm font-bold text-slate-400 uppercase tracking-widest">
                                            No {section.title.toLowerCase()} found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>

            {rechargeModal.open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setRechargeModal({ ...rechargeModal, open: false })}></div>
                    <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl relative z-10 overflow-hidden flex flex-col p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h4 className="font-headline text-2xl font-black text-slate-900 tracking-tight">Recharge Wallet</h4>
                                <p className="text-xs text-slate-400 font-bold mt-1">Adding balance for <span className="text-primary">{rechargeModal.name}</span></p>
                            </div>
                            <button onClick={() => setRechargeModal({ ...rechargeModal, open: false })} className="material-symbols-outlined text-slate-400 hover:text-slate-900 transition-all cursor-pointer">close</button>
                        </div>

                        <form onSubmit={handleRecharge} className="space-y-6">
                            <div className="space-y-2 relative">
                                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Amount (BDT)</label>
                                <input
                                    required
                                    type="number"
                                    min="1"
                                    className="w-full pl-10 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xl font-black focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all text-emerald-600"
                                    value={rechargeModal.amount}
                                    onChange={e => setRechargeModal({ ...rechargeModal, amount: e.target.value })}
                                    placeholder="500"
                                />
                                <span className="absolute left-4 top-[38px] text-lg font-black opacity-40 text-emerald-600">৳</span>
                            </div>
                            <button type="submit" className="w-full py-5 bg-emerald-500 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all">
                                Confirm Transfer
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
