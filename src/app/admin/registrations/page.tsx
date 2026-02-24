"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  Download,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  UserCircle,
} from "lucide-react";
import Modal from "@/components/ui/Modal";
import { Registration, Category } from "@/types/registration";

const PAGE_SIZE = 20;

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category | "all">("all");
  const [selected, setSelected] = useState<Registration | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const fetchRegistrations = useCallback(
    async (p: number, s: string, cat: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(p),
          limit: String(PAGE_SIZE),
        });
        if (s) params.set("search", s);
        if (cat !== "all") params.set("category", cat);

        const res = await fetch(`/api/registrations?${params}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setRegistrations(data.data);
        setTotal(data.total);
        setTotalPages(data.totalPages);
        setPage(data.page);
      } catch {
        setRegistrations([]);
        setTotal(0);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Initial load
  useEffect(() => {
    fetchRegistrations(1, "", "all");
  }, [fetchRegistrations]);

  // Debounced search
  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchRegistrations(1, value, categoryFilter);
    }, 300);
  };

  const handleCategoryChange = (cat: Category | "all") => {
    setCategoryFilter(cat);
    fetchRegistrations(1, search, cat);
  };

  const handlePageChange = (p: number) => {
    fetchRegistrations(p, search, categoryFilter);
  };

  const handleExport = async () => {
    try {
      const res = await fetch("/api/admin/export", { credentials: "include" });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ssdf-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      alert("Export failed. Please try again.");
    }
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Registrations</h1>
          <p className="text-navy-500 text-sm mt-0.5">
            Manage all CanSat India 2026 registrations
          </p>
        </div>
        <button
          onClick={handleExport}
          disabled={total === 0}
          className="inline-flex items-center gap-2 bg-navy-800 text-white font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-navy-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-navy-100 shadow-sm p-4 mb-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400"
            />
            <input
              type="text"
              placeholder="Search by name, team, ID, or email..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-navy-200 bg-navy-50 text-sm text-navy-800 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-golden-400 focus:bg-white transition-all"
            />
            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  fetchRegistrations(1, "", categoryFilter);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) =>
                handleCategoryChange(e.target.value as Category | "all")
              }
              className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-navy-200 bg-navy-50 text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-golden-400 focus:bg-white transition-all cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="school">School</option>
              <option value="college">College</option>
              <option value="professional">Professional</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none"
            />
          </div>
        </div>
        <p className="text-[11px] text-navy-400 mt-2.5">
          Showing{" "}
          <span className="font-semibold text-navy-600">
            {registrations.length}
          </span>{" "}
          of {total} registrations
          {totalPages > 1 && (
            <span>
              {" "}
              &middot; Page {page} of {totalPages}
            </span>
          )}
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-navy-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-navy-200 border-t-golden-400 rounded-full animate-spin" />
          </div>
        ) : registrations.length === 0 ? (
          <div className="text-center py-16">
            <Users size={40} className="mx-auto text-navy-200 mb-3" />
            <p className="text-navy-400 text-sm">
              {total === 0 && !search
                ? "No registrations yet."
                : "No results match your search."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-50/60 border-b border-navy-100">
                  <th className="text-left py-3 px-4 font-semibold text-navy-500 text-[11px] uppercase tracking-wider">
                    ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-500 text-[11px] uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-500 text-[11px] uppercase tracking-wider">
                    Team
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-500 text-[11px] uppercase tracking-wider">
                    Institution
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-500 text-[11px] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-500 text-[11px] uppercase tracking-wider">
                    State
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-500 text-[11px] uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {registrations.map((reg) => (
                  <tr
                    key={reg.id}
                    onClick={() => setSelected(reg)}
                    className="hover:bg-golden-50/30 cursor-pointer transition-colors"
                  >
                    <td className="py-3 px-4 font-mono text-[11px] text-river-600 font-medium">
                      {reg.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        {reg.photoUrl ? (
                          <img
                            src={reg.photoUrl}
                            alt=""
                            className="w-8 h-8 rounded-full object-cover border-2 border-navy-100"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-400 text-[10px] font-bold">
                            {reg.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-navy-800 leading-tight">
                            {reg.fullName}
                          </p>
                          <p className="text-[11px] text-navy-400">
                            {reg.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-navy-600">{reg.teamName}</td>
                    <td className="py-3 px-4 text-navy-500 text-xs">
                      {reg.institution}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          reg.category === "school"
                            ? "bg-river-50 text-river-700"
                            : reg.category === "college"
                            ? "bg-forest-50 text-forest-700"
                            : "bg-golden-50 text-golden-700"
                        }`}
                      >
                        {reg.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-navy-500 text-xs">
                      {reg.state}
                    </td>
                    <td className="py-3 px-4 text-navy-400 text-xs">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && !loading && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-navy-100 bg-navy-50/30">
            <p className="text-xs text-navy-500">
              Page {page} of {totalPages} ({total} total)
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="p-2 rounded-lg text-navy-500 hover:bg-navy-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let p: number;
                if (totalPages <= 5) {
                  p = i + 1;
                } else if (page <= 3) {
                  p = i + 1;
                } else if (page >= totalPages - 2) {
                  p = totalPages - 4 + i;
                } else {
                  p = page - 2 + i;
                }
                return (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      p === page
                        ? "bg-golden-400 text-navy-900"
                        : "text-navy-500 hover:bg-navy-100"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="p-2 rounded-lg text-navy-500 hover:bg-navy-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        className="max-w-lg w-full bg-white rounded-2xl"
      >
        {selected && (
          <div>
            {/* Modal header */}
            <div className="bg-navy-800 px-6 py-5 rounded-t-2xl text-center">
              {selected.photoUrl ? (
                <img
                  src={selected.photoUrl}
                  alt={selected.fullName}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-golden-400/30"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-navy-700 flex items-center justify-center mx-auto mb-3 border-4 border-golden-400/30">
                  <UserCircle size={40} className="text-navy-400" />
                </div>
              )}
              <h2 className="text-xl font-bold text-white">
                {selected.fullName}
              </h2>
              <p className="text-golden-400 font-mono text-xs mt-1">
                {selected.id}
              </p>
              <span
                className={`inline-block mt-2 px-3 py-0.5 rounded-full text-[11px] font-semibold ${
                  selected.category === "school"
                    ? "bg-river-400/20 text-river-300"
                    : selected.category === "college"
                    ? "bg-forest-400/20 text-forest-300"
                    : "bg-golden-400/20 text-golden-300"
                }`}
              >
                {selected.category}
              </span>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem
                  icon={Mail}
                  label="Email"
                  value={selected.email}
                />
                <DetailItem
                  icon={Phone}
                  label="Phone"
                  value={selected.phone}
                />
                <DetailItem
                  icon={Users}
                  label="Team"
                  value={selected.teamName}
                />
                <DetailItem
                  icon={Building2}
                  label="Institution"
                  value={selected.institution}
                />
                <DetailItem
                  icon={MapPin}
                  label="State"
                  value={selected.state}
                />
                <DetailItem
                  icon={Calendar}
                  label="Registered"
                  value={new Date(selected.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                />
              </div>

              {/* Team Members */}
              {selected.teamMembers.length > 0 && (
                <div className="pt-4 border-t border-navy-100">
                  <p className="text-xs font-semibold text-navy-500 uppercase tracking-wider mb-3">
                    Team Members ({selected.teamMembers.length})
                  </p>
                  <div className="space-y-2">
                    {selected.teamMembers.map((m, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-navy-50 rounded-lg px-4 py-2.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-navy-200 flex items-center justify-center text-navy-500 text-[10px] font-bold">
                            {i + 1}
                          </div>
                          <span className="text-sm font-medium text-navy-800">
                            {m.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-navy-400 bg-white px-2 py-0.5 rounded-full border border-navy-100">
                          {m.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 bg-navy-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={14} className="text-navy-400" />
      </div>
      <div>
        <p className="text-[10px] text-navy-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm text-navy-800 font-medium">{value}</p>
      </div>
    </div>
  );
}
