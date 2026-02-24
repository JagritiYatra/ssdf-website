"use client";

import { useState, useEffect } from "react";
import {
  Users,
  School,
  GraduationCap,
  Briefcase,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRegistrations } from "@/hooks/useRegistrations";

interface Stats {
  total: number;
  school: number;
  college: number;
  professional: number;
}

export default function AdminDashboard() {
  const { registrations, loading: regsLoading } = useRegistrations();
  const [stats, setStats] = useState<Stats>({ total: 0, school: 0, college: 0, professional: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: "Total Registrations",
      value: stats.total,
      icon: Users,
      color: "bg-golden-400/10 text-golden-500",
      border: "border-golden-400/20",
    },
    {
      label: "School Teams",
      value: stats.school,
      icon: School,
      color: "bg-river-400/10 text-river-500",
      border: "border-river-400/20",
    },
    {
      label: "College Teams",
      value: stats.college,
      icon: GraduationCap,
      color: "bg-forest-400/10 text-forest-500",
      border: "border-forest-400/20",
    },
    {
      label: "Professional",
      value: stats.professional,
      icon: Briefcase,
      color: "bg-navy-400/10 text-navy-500",
      border: "border-navy-300/20",
    },
  ];

  if (loading || regsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-navy-200 border-t-golden-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Dashboard</h1>
          <p className="text-navy-500 text-sm mt-0.5">
            CanSat India 2026 registration overview
          </p>
        </div>
        <Link
          href="/admin/registrations"
          className="inline-flex items-center gap-2 bg-golden-400 text-navy-900 font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-golden-500 transition-colors shadow-sm"
        >
          View All <ArrowRight size={16} />
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`bg-white rounded-xl border ${stat.border} p-5 shadow-sm`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
                >
                  <Icon size={20} />
                </div>
                <TrendingUp size={14} className="text-navy-300" />
              </div>
              <p className="text-3xl font-extrabold text-navy-800">
                {stat.value}
              </p>
              <p className="text-xs text-navy-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Registrations */}
      <div className="bg-white rounded-xl border border-navy-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-navy-100 flex items-center justify-between">
          <h2 className="text-sm font-bold text-navy-800">
            Recent Registrations
          </h2>
          <span className="text-[10px] text-navy-400 uppercase tracking-wider">
            Last 5
          </span>
        </div>
        {registrations.length === 0 ? (
          <div className="text-center py-16">
            <Users size={40} className="mx-auto text-navy-200 mb-3" />
            <p className="text-navy-400 text-sm">
              No registrations yet. They will appear here once teams register.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy-50/50">
                  <th className="text-left py-3 px-4 font-semibold text-navy-500 text-xs uppercase tracking-wider">
                    ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-500 text-xs uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-500 text-xs uppercase tracking-wider">
                    Team
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-500 text-xs uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-500 text-xs uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-50">
                {registrations
                  .slice(0, 5)
                  .map((reg) => (
                    <tr
                      key={reg.id}
                      className="hover:bg-navy-50/50 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono text-xs text-river-600">
                        {reg.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          {reg.photoUrl ? (
                            <img
                              src={reg.photoUrl}
                              alt=""
                              className="w-7 h-7 rounded-full object-cover border border-navy-100"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-navy-100 flex items-center justify-center text-navy-400 text-[10px] font-bold">
                              {reg.fullName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </div>
                          )}
                          <span className="font-medium text-navy-800">
                            {reg.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-navy-600">
                        {reg.teamName}
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
                      <td className="py-3 px-4 text-navy-400 text-xs">
                        {new Date(reg.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
