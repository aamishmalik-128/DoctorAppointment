import { useState } from "react";
import { Users, Search, UserCheck, Phone, Mail, Calendar, FileText } from "lucide-react";

const mockPatients = [
    {
        id: 1,
        name: "Alexander Wright",
        email: "alexander@example.com",
        phone: "+1 555-0192",
        gender: "Male",
        age: 34,
        lastVisit: "2026-07-20",
        condition: "Hypertension Routine Check",
    },
    {
        id: 2,
        name: "Sophia Martinez",
        email: "sophia@example.com",
        phone: "+1 555-0148",
        gender: "Female",
        age: 28,
        lastVisit: "2026-07-22",
        condition: "Post-op Follow Up",
    },
    {
        id: 3,
        name: "David Chen",
        email: "david.c@example.com",
        phone: "+1 555-0177",
        gender: "Male",
        age: 45,
        lastVisit: "2026-07-25",
        condition: "Type 2 Diabetes Review",
    },
];

const Patients = () => {
    const [search, setSearch] = useState("");

    const filteredPatients = mockPatients.filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.condition.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 text-left">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-teal-100 bg-white/95 p-6 shadow-sm backdrop-blur-xl">
                <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-100/80 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-200">
                        <Users size={14} className="text-teal-600" /> Patient Records
                    </div>
                    <h1 className="mt-2 text-2xl font-extrabold text-slate-900">
                        My Patients
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                        Manage patient history, consult logs, and health records.
                    </p>
                </div>

                {/* Search input */}
                <div className="relative w-full sm:w-64">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600/70" />
                    <input
                        type="text"
                        placeholder="Search patient name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-teal-100 bg-teal-50/30 pl-10 pr-4 py-2 text-xs text-slate-800 outline-none focus:border-teal-500 focus:bg-white transition"
                    />
                </div>
            </div>

            {/* Patients List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPatients.map((patient) => (
                    <div
                        key={patient.id}
                        className="rounded-3xl border border-teal-100/80 bg-white/95 p-5 shadow-sm hover:border-teal-300 hover:shadow-md transition-all space-y-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-lg font-extrabold text-white shadow-md shadow-teal-600/20">
                                {patient.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-sm">{patient.name}</h3>
                                <p className="text-[11px] text-slate-500 font-medium">
                                    {patient.gender}, {patient.age} yrs
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2 text-xs text-slate-600 border-t border-teal-100/60 pt-3">
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-teal-600" />
                                <span className="truncate">{patient.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="text-teal-600" />
                                <span>{patient.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={14} className="text-teal-600" />
                                <span>Last Visit: {patient.lastVisit}</span>
                            </div>
                        </div>

                        <div className="rounded-xl bg-teal-50/50 p-2.5 border border-teal-100/80 flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-teal-800 truncate">
                                {patient.condition}
                            </span>
                            <button className="p-1 text-teal-700 hover:text-teal-900 transition cursor-pointer">
                                <FileText size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Patients;