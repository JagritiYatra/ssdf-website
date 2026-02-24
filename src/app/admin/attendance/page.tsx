"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Search,
  CheckCircle,
  XCircle,
  Users,
  Building,
  MapPin,
  Calendar,
  Hash,
  Loader2,
  ClipboardCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMember {
  name: string;
  role: string;
}

interface RegistrationWithAttendance {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  photoUrl: string | null;
  teamName: string;
  institution: string;
  state: string;
  category: string;
  teamMembers: TeamMember[];
  createdAt: string;
  present: boolean;
}

interface AttendanceRecord {
  id: string;
  registrationId: string;
  date: string;
  markedAt: string;
  registration: RegistrationWithAttendance | null;
}

export default function AttendancePage() {
  const [query, setQuery] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [results, setResults] = useState<RegistrationWithAttendance[]>([]);
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord[]>([]);
  const [searching, setSearching] = useState(false);
  const [marking, setMarking] = useState<string | null>(null);
  const [selectedReg, setSelectedReg] = useState<RegistrationWithAttendance | null>(null);
  const [attendanceCount, setAttendanceCount] = useState(0);

  // Load today's attendance on mount
  const loadAttendance = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/attendance?date=${date}`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setTodayAttendance(data);
        setAttendanceCount(data.length);
      }
    } catch {
      // ignore
    }
  }, [date]);

  useEffect(() => {
    loadAttendance();
  }, [loadAttendance]);

  const handleSearch = async () => {
    if (query.length < 1) return;
    setSearching(true);
    setSelectedReg(null);

    try {
      const res = await fetch(
        `/api/admin/attendance?q=${encodeURIComponent(query)}&date=${date}`,
        { credentials: "include" }
      );
      if (res.ok) {
        const data = await res.json();
        setResults(data);
        // Auto-select if exactly one result
        if (data.length === 1) {
          setSelectedReg(data[0]);
        }
      }
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const toggleAttendance = async (reg: RegistrationWithAttendance) => {
    setMarking(reg.id);
    const newPresent = !reg.present;

    try {
      const res = await fetch("/api/admin/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: reg.id,
          date,
          present: newPresent,
        }),
        credentials: "include",
      });

      if (res.ok) {
        // Update local state
        setResults((prev) =>
          prev.map((r) => (r.id === reg.id ? { ...r, present: newPresent } : r))
        );
        if (selectedReg?.id === reg.id) {
          setSelectedReg({ ...selectedReg, present: newPresent });
        }
        loadAttendance();
      }
    } catch {
      // ignore
    } finally {
      setMarking(null);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-800 flex items-center gap-2">
            <ClipboardCheck size={24} className="text-golden-500" />
            Attendance
          </h1>
          <p className="text-navy-500 text-sm mt-1">
            Search by last 4 digits of registration ID
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-forest-50 text-forest-600 border border-forest-200 px-3 py-1.5 rounded-lg text-sm font-medium">
            {attendanceCount} present today
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-navy-200 text-sm text-navy-700 focus:outline-none focus:ring-2 focus:ring-golden-400"
          />
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm border border-navy-100 p-4 mb-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Hash
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400"
            />
            <input
              type="text"
              placeholder="Enter last 4 digits (e.g. 0001)"
              value={query}
              onChange={(e) => {
                const v = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
                setQuery(v);
              }}
              onKeyDown={handleKeyDown}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-navy-200 bg-navy-50 text-navy-800 placeholder-navy-400 text-lg font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-golden-400 focus:bg-white transition-all"
              maxLength={4}
              autoFocus
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={searching || query.length < 1}
            className="px-6 py-3 bg-golden-400 text-navy-900 font-semibold rounded-xl hover:bg-golden-500 transition-colors shadow-lg cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            {searching ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Search size={18} />
            )}
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Search Results */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-navy-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-navy-100 flex items-center justify-between">
              <h2 className="font-semibold text-navy-800 text-sm">
                Search Results
              </h2>
              {results.length > 0 && (
                <span className="text-xs text-navy-400">
                  {results.length} found
                </span>
              )}
            </div>

            {results.length === 0 ? (
              <div className="p-8 text-center">
                <Search size={32} className="mx-auto mb-2 text-navy-200" />
                <p className="text-navy-400 text-sm">
                  {query
                    ? "No registrations found"
                    : "Enter last 4 digits to search"}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-navy-100">
                {results.map((reg) => (
                  <div
                    key={reg.id}
                    onClick={() => setSelectedReg(reg)}
                    className={cn(
                      "px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors",
                      selectedReg?.id === reg.id
                        ? "bg-golden-50"
                        : "hover:bg-navy-50"
                    )}
                  >
                    {/* Photo */}
                    {reg.photoUrl ? (
                      <img
                        src={reg.photoUrl}
                        alt={reg.fullName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-navy-200 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 font-bold text-sm shrink-0">
                        {reg.fullName.charAt(0)}
                      </div>
                    )}

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-navy-800 text-sm truncate">
                          {reg.fullName}
                        </span>
                        <span className="font-mono text-xs text-golden-500 shrink-0">
                          {reg.id}
                        </span>
                      </div>
                      <p className="text-xs text-navy-400 truncate">
                        {reg.teamName} &middot; {reg.institution}
                      </p>
                    </div>

                    {/* Attendance toggle */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAttendance(reg);
                      }}
                      disabled={marking === reg.id}
                      className={cn(
                        "shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50",
                        reg.present
                          ? "bg-forest-50 text-forest-600 border border-forest-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                          : "bg-navy-50 text-navy-500 border border-navy-200 hover:bg-forest-50 hover:text-forest-600 hover:border-forest-200"
                      )}
                    >
                      {marking === reg.id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : reg.present ? (
                        <CheckCircle size={14} />
                      ) : (
                        <XCircle size={14} />
                      )}
                      {reg.present ? "Present" : "Absent"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-navy-100 overflow-hidden sticky top-20">
            <div className="px-4 py-3 border-b border-navy-100">
              <h2 className="font-semibold text-navy-800 text-sm">
                Registration Details
              </h2>
            </div>

            {!selectedReg ? (
              <div className="p-6 text-center">
                <Users size={32} className="mx-auto mb-2 text-navy-200" />
                <p className="text-navy-400 text-sm">
                  Click a result to view details
                </p>
              </div>
            ) : (
              <div className="p-4">
                {/* Photo + Name */}
                <div className="flex items-center gap-3 mb-4">
                  {selectedReg.photoUrl ? (
                    <img
                      src={selectedReg.photoUrl}
                      alt={selectedReg.fullName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-navy-200"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-navy-100 flex items-center justify-center text-navy-600 font-bold text-xl">
                      {selectedReg.fullName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-navy-800">
                      {selectedReg.fullName}
                    </h3>
                    <p className="font-mono text-xs text-golden-500">
                      {selectedReg.id}
                    </p>
                  </div>
                </div>

                {/* Status badge */}
                <div
                  className={cn(
                    "flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold mb-4",
                    selectedReg.present
                      ? "bg-forest-50 text-forest-600 border border-forest-200"
                      : "bg-red-50 text-red-500 border border-red-200"
                  )}
                >
                  {selectedReg.present ? (
                    <CheckCircle size={16} />
                  ) : (
                    <XCircle size={16} />
                  )}
                  {selectedReg.present
                    ? "Marked Present"
                    : "Not Present"}
                </div>

                {/* Details */}
                <div className="space-y-2.5 text-sm">
                  <DetailItem icon={Users} label="Team" value={selectedReg.teamName} />
                  <DetailItem icon={Building} label="Institution" value={selectedReg.institution} />
                  <DetailItem icon={MapPin} label="State" value={selectedReg.state} />
                  <DetailItem
                    icon={Calendar}
                    label="Registered"
                    value={new Date(selectedReg.createdAt).toLocaleDateString("en-IN")}
                  />
                </div>

                {/* Team Members */}
                {(selectedReg.teamMembers as TeamMember[]).length > 0 && (
                  <div className="mt-4 pt-3 border-t border-navy-100">
                    <p className="text-xs text-navy-500 font-medium mb-2">
                      Team Members
                    </p>
                    <div className="space-y-1.5">
                      {(selectedReg.teamMembers as TeamMember[]).map((m, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between text-sm bg-navy-50 px-3 py-1.5 rounded-lg"
                        >
                          <span className="text-navy-700">{m.name}</span>
                          <span className="text-navy-400 text-xs">
                            {m.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mark/Unmark button */}
                <button
                  onClick={() => toggleAttendance(selectedReg)}
                  disabled={marking === selectedReg.id}
                  className={cn(
                    "w-full mt-4 py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50",
                    selectedReg.present
                      ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                      : "bg-forest-400 text-white hover:bg-forest-500 shadow-lg"
                  )}
                >
                  {marking === selectedReg.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : selectedReg.present ? (
                    <>
                      <XCircle size={16} /> Remove Attendance
                    </>
                  ) : (
                    <>
                      <CheckCircle size={16} /> Mark Present
                    </>
                  )}
                </button>

                {/* Contact */}
                <div className="mt-3 pt-3 border-t border-navy-100 text-xs text-navy-400 space-y-1">
                  <p>Email: {selectedReg.email}</p>
                  <p>Phone: {selectedReg.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Today's Attendance List */}
      {todayAttendance.length > 0 && (
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-navy-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-navy-100 flex items-center justify-between">
            <h2 className="font-semibold text-navy-800 text-sm flex items-center gap-2">
              <CheckCircle size={16} className="text-forest-400" />
              Present Today — {date}
            </h2>
            <span className="text-xs text-navy-400">
              {todayAttendance.length} present
            </span>
          </div>
          <div className="divide-y divide-navy-100 max-h-64 overflow-y-auto">
            {todayAttendance.map((a) => (
              <div key={a.id} className="px-4 py-2.5 flex items-center gap-3">
                <CheckCircle size={14} className="text-forest-400 shrink-0" />
                <span className="font-mono text-xs text-golden-500 shrink-0">
                  {a.registrationId}
                </span>
                <span className="text-sm text-navy-700 truncate">
                  {a.registration?.fullName || "—"}
                </span>
                <span className="text-xs text-navy-400 ml-auto shrink-0">
                  {new Date(a.markedAt).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={14} className="text-navy-400 shrink-0" />
      <span className="text-navy-500 w-20 shrink-0">{label}</span>
      <span className="text-navy-800 font-medium truncate">{value}</span>
    </div>
  );
}
