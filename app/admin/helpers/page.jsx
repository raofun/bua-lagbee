"use client";

import { useState, useEffect, useRef } from "react";

export default function AdminHelpers() {
  const [helpers, setHelpers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [categories, setCategories] = useState(["Chef", "Housekeeping", "Nanny", "Driver"]);
  const [editId, setEditId] = useState(null);
  const fileInputRef = useRef(null);
  const [newHelper, setNewHelper] = useState({
    name: "",
    location: "",
    nid: "",
    category: "Chef",
    image: "", 
    shift: "Morning",
    workingHours: "Morning",
    workingDays: "Sat - Thu",
    tasks: [{ name: "General Duty", bnName: "সাধারণ কাজ", price: 5000 }],
    skills: "",
    bnSkills: ""
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 500;
          const MAX_HEIGHT = 500;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("getContext" in canvas ? "2d" : "webgl");
          if (canvas.getContext("2d")) {
             canvas.getContext("2d").drawImage(img, 0, 0, width, height);
             const dataUrl = canvas.toDataURL("image/jpeg", 0.7); 
             setNewHelper({ ...newHelper, image: dataUrl });
          } else {
             setNewHelper({ ...newHelper, image: event.target.result });
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchHelpers();
  }, []);

  useEffect(() => {
    if (helpers.length > 0) {
      const existingCats = [...new Set(helpers.map(h => h.category).filter(Boolean))];
      setCategories(prev => [...new Set([...prev, ...existingCats])]);
    }
  }, [helpers]);

  const fetchHelpers = async () => {
    try {
      
      const res = await fetch("/api/helpers?excludeImage=true");
      const data = await res.json();
      if (data.success) {
        setHelpers(data.data);
        setIsLoading(false); 

        
        const fullRes = await fetch("/api/helpers");
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

  const handleAddHelper = async (e) => {
    e.preventDefault();
    const adminId = localStorage.getItem("userId");
    try {
      if (!newHelper.image) {
        alert("Please upload a photo for the helper before adding.");
        return;
      }

      const payload = { 
        ...newHelper, 
        skills: typeof newHelper.skills === 'string' ? newHelper.skills.split(",").map(s => s.trim()).filter(s => s) : newHelper.skills,
        bnSkills: typeof newHelper.bnSkills === 'string' ? newHelper.bnSkills.split(",").map(s => s.trim()).filter(s => s) : newHelper.bnSkills,
        adminId 
      };

      const url = isEditing ? `/api/helpers/${editId}` : "/api/helpers";
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setShowAddModal(false);
        setIsEditing(false);
        setEditId(null);
        
        setNewHelper({
          name: "", location: "", nid: "", category: "Chef", image: "", shift: "Morning",
          workingHours: "Morning", workingDays: "Sat - Thu", tasks: [{ name: "General Duty", bnName: "সাধারণ কাজ", price: 5000 }],
          skills: "", bnSkills: ""
        });
        fetchHelpers();
      } else {
        alert(data.message || `Failed to ${isEditing ? 'update' : 'add'} helper`);
      }
    } catch (error) {
      alert("Error connecting to server");
    }
  };

  const handleEditClick = (helper) => {
    setIsEditing(true);
    setEditId(helper._id);
    setNewHelper({
      name: helper.name,
      location: helper.location,
      nid: helper.nid || "",
      category: helper.category,
      image: helper.image,
      shift: helper.shift,
      workingHours: helper.workingHours,
      workingDays: helper.workingDays || "Sat - Thu",
      tasks: helper.tasks || [],
      skills: helper.skills.join(", "),
      bnSkills: (helper.bnSkills || []).join(", ")
    });
    setShowAddModal(true);
  };

  const handleHelperDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this helper? This action cannot be undone.")) return;
    
    const adminId = localStorage.getItem("userId");
    try {
      const res = await fetch(`/api/helpers/${id}?adminId=${adminId}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        fetchHelpers();
      } else {
        alert(data.message || "Failed to delete helper");
      }
    } catch (error) {
      alert("Error connecting to server");
    }
  };

  const addTaskField = () => {
    setNewHelper({
      ...newHelper,
      tasks: [...newHelper.tasks, { name: "", bnName: "", price: 0 }]
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-headline text-2xl font-black text-slate-900">Helper Database</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Manage platform professionals</p>
        </div>
        <button 
          onClick={() => {
            setIsEditing(false);
            setEditId(null);
            setNewHelper({
              name: "", location: "", nid: "", category: "Chef", image: "", shift: "Morning",
              workingHours: "Morning", workingDays: "Sat - Thu", tasks: [{ name: "General Duty", bnName: "সাধারণ কাজ", price: 5000 }],
              skills: "", bnSkills: ""
            });
            setShowAddModal(true);
          }}
          className="bg-primary text-white px-8 py-3.5 rounded-2xl flex items-center gap-2 text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          Add New Professional
        </button>
      </div>

      {}
      <div className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Professional</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Location</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Salary (Sum)</th>
              <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {helpers.map((h) => (
              <tr key={h._id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <img src={h.image} className="w-12 h-12 rounded-xl object-cover shadow-sm group-hover:scale-110 transition-transform" />
                    <div className="min-w-0 max-w-[200px]">
                      <p className="text-sm font-black text-slate-900 truncate">{h.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{h.shift} Shift</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                    {h.category}
                  </span>
                </td>
                <td className="px-8 py-6 text-xs font-bold text-slate-500 truncate max-w-[150px]">{h.location}</td>
                <td className="px-8 py-6">
                  <p className="text-sm font-black text-primary italic">৳{h.monthlyRate?.toLocaleString()}</p>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">{h.tasks?.length || 0} Tasks Assigned</p>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleEditClick(h)}
                      className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                    <button 
                      onClick={() => handleHelperDelete(h._id)}
                      className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
           <div className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-10 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-headline text-2xl font-black text-slate-900 tracking-tight">
                      {isEditing ? "Edit Professional Profile" : "Create Professional Profile"}
                    </h4>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                      {isEditing ? "Update existing curator information" : "Fill in the details for the new curator"}
                    </p>
                  </div>
                 <button onClick={() => setShowAddModal(false)} className="material-symbols-outlined text-slate-400 hover:text-slate-900 transition-all cursor-pointer">close</button>
              </div>

              <form onSubmit={handleAddHelper} className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                 {}
                 <div className="flex flex-col items-center mb-6">
                   <input 
                     type="file" 
                     ref={fileInputRef} 
                     onChange={handleImageChange} 
                     className="hidden" 
                     accept="image/*" 
                   />
                   <div 
                     className="relative w-28 h-28 rounded-full border-4 border-white shadow-xl cursor-pointer bg-slate-100 flex items-center justify-center overflow-hidden group"
                     onClick={() => fileInputRef.current?.click()}
                   >
                     {newHelper.image ? (
                       <img src={newHelper.image} className="w-full h-full object-cover" alt="Preview" />
                     ) : (
                       <span className="material-symbols-outlined text-4xl text-slate-300">add_a_photo</span>
                     )}
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="material-symbols-outlined text-white">edit</span>
                     </div>
                   </div>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-3">Upload Profile Photo</p>
                 </div>

                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Full Name</label>
                       <input 
                         required
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                         value={newHelper.name}
                         onChange={e => setNewHelper({...newHelper, name: e.target.value})}
                         placeholder="e.g. Rahima Begum"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Location</label>
                       <input 
                         required
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                         value={newHelper.location}
                         onChange={e => setNewHelper({...newHelper, location: e.target.value})}
                         placeholder="e.g. Uttara, Dhaka"
                       />
                    </div>
                 </div>

                 <div className="grid md:grid-cols-4 gap-6">
                      <div className="space-y-2">
                         <div className="flex justify-between items-center ml-1">
                            <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">Category</label>
                            <button 
                               type="button"
                               onClick={() => setIsCustomCategory(!isCustomCategory)}
                               className="text-[9px] font-bold text-primary uppercase tracking-wider hover:underline"
                            >
                               {isCustomCategory ? "Select List" : "Add New"}
                            </button>
                         </div>
                         {isCustomCategory ? (
                            <input 
                               className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none ring-2 ring-primary/20"
                               placeholder="Enter new category..."
                               value={newHelper.category}
                               onChange={e => setNewHelper({...newHelper, category: e.target.value})}
                            />
                         ) : (
                            <select 
                              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none"
                              value={newHelper.category}
                              onChange={e => setNewHelper({...newHelper, category: e.target.value})}
                            >
                               {categories.map(cat => (
                                  <option key={cat} value={cat}>{cat}</option>
                               ))}
                            </select>
                         )}
                      </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Shift</label>
                        <select 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none"
                          value={newHelper.shift}
                          onChange={e => setNewHelper({...newHelper, shift: e.target.value})}
                        >
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Evening</option>
                            <option>Full Day</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Working Hours</label>
                         <select 
                           className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none"
                           value={newHelper.workingHours}
                           onChange={e => setNewHelper({...newHelper, workingHours: e.target.value})}
                         >
                            <option value="">Select Hours</option>
                            <option>Morning</option>
                            <option>Afternoon</option>
                            <option>Evening</option>
                            <option>Full Day</option>
                         </select>
                     </div>
                     <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Working Days</label>
                         <select 
                           className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold outline-none"
                           value={newHelper.workingDays}
                           onChange={e => setNewHelper({...newHelper, workingDays: e.target.value})}
                         >
                            <option>Sat - Thu</option>
                            <option>Sat - Fri (7 Days)</option>
                            <option>Mon - Fri</option>
                            <option>Fri-Sat (Weekend Only)</option>
                         </select>
                     </div>
                  </div>

                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">Skills (Comma separated)</label>
                       <input 
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                         value={newHelper.skills}
                         onChange={e => setNewHelper({...newHelper, skills: e.target.value})}
                         placeholder="e.g. Cooking, Cleaning, Ironing"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">ন্যাশনাল আইডি (NID) - Optional</label>
                       <input 
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                         value={newHelper.nid}
                         onChange={e => setNewHelper({...newHelper, nid: e.target.value})}
                         placeholder="e.g. 19902345678"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">দক্ষতা (কমা দিয়ে লিখুন)</label>
                       <input 
                         className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                         value={newHelper.bnSkills}
                         onChange={e => setNewHelper({...newHelper, bnSkills: e.target.value})}
                         placeholder="যেমন: রান্না, পরিষ্কার করা"
                       />
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                       <label className="text-xs font-black uppercase tracking-widest text-slate-900 underline decoration-primary decoration-4">Tasks & Pricing Breakdown</label>
                       <button 
                         type="button" 
                         onClick={addTaskField}
                         className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-1 hover:brightness-90"
                       >
                          <span className="material-symbols-outlined text-sm">add</span> Add Task
                       </button>
                    </div>
                    <div className="space-y-4">
                       {newHelper.tasks.map((task, i) => (
                         <div key={i} className="grid grid-cols-12 gap-4 items-end">
                            <div className="col-span-4 space-y-1">
                               <input 
                                 placeholder="Task Name (English)" 
                                 className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold"
                                 value={task.name}
                                 onChange={e => {
                                    const nextTasks = [...newHelper.tasks];
                                    nextTasks[i].name = e.target.value;
                                    setNewHelper({...newHelper, tasks: nextTasks});
                                 }}
                               />
                            </div>
                            <div className="col-span-4 space-y-1">
                               <input 
                                 placeholder="কাজের নাম (Bengali)" 
                                 className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-[11px] font-bold"
                                 value={task.bnName}
                                 onChange={e => {
                                    const nextTasks = [...newHelper.tasks];
                                    nextTasks[i].bnName = e.target.value;
                                    setNewHelper({...newHelper, tasks: nextTasks});
                                 }}
                               />
                            </div>
                            <div className="col-span-3 space-y-1 relative">
                               <input 
                                 type="number"
                                 placeholder="Price ৳" 
                                 className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-black italic"
                                 value={task.price}
                                 onChange={e => {
                                    const nextTasks = [...newHelper.tasks];
                                    nextTasks[i].price = parseInt(e.target.value) || 0;
                                    setNewHelper({...newHelper, tasks: nextTasks});
                                 }}
                               />
                               <span className="absolute left-3 top-[13px] text-xs font-black opacity-30 italic">৳</span>
                            </div>
                            <div className="col-span-1 pb-1">
                               <button 
                                 type="button"
                                 onClick={() => {
                                    const nextTasks = newHelper.tasks.filter((_, idx) => idx !== i);
                                    setNewHelper({...newHelper, tasks: nextTasks});
                                 }}
                                 className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors"
                               >
                                  <span className="material-symbols-outlined text-[18px]">remove_circle</span>
                               </button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="pt-6">
                    <button type="submit" className="w-full py-5 bg-slate-900 text-white font-black uppercase tracking-[0.3em] text-xs rounded-2xl shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                       <span className="material-symbols-outlined text-[20px]">
                         {isEditing ? 'save' : 'cloud_upload'}
                       </span>
                       {isEditing ? 'Save Changes' : 'Initialize Profile'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
