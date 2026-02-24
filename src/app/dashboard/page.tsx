"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LogOut,
  User,
  ClipboardList,
  Calendar,
  Users,
  Building,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_SHORT_NAME } from "@/lib/constants";
import { Registration } from "@/types/registration";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [regLoading, setRegLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) {
          router.push("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setUser(data);
      })
      .finally(() => setLoading(false));

    fetch("/api/user/registrations", { credentials: "include" })
      .then((res) => {
        if (res.ok) return res.json();
        return [];
      })
      .then((data) => setRegistrations(data))
      .finally(() => setRegLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-50">
        <div className="w-8 h-8 border-4 border-navy-200 border-t-golden-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Header */}
      <header className="bg-navy-800 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="bg-white rounded-lg p-0.5">
                <Image
                  src="/images/logo-transparent.png"
                  alt={SITE_SHORT_NAME}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-md"
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-white font-bold text-sm leading-tight">
                  {SITE_SHORT_NAME}
                </span>
                <span className="text-golden-400 text-[10px] font-medium leading-tight">
                  Dashboard
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-xs text-navy-400 hover:text-navy-200 transition-colors hidden sm:block"
              >
                View Site &rarr;
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-navy-300 hover:text-red-400 hover:bg-navy-700 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-800">
            Welcome, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-navy-500 mt-1">
            Manage your registrations and profile
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-navy-100 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-golden-400/10 border-2 border-golden-400/20 flex items-center justify-center">
              <User size={24} className="text-golden-500" />
            </div>
            <div>
              <h2 className="font-bold text-navy-800 text-lg">{user.name}</h2>
              <p className="text-navy-500 text-sm">{user.email}</p>
              <p className="text-navy-400 text-xs mt-0.5">
                Member since {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>
        </div>

        {/* Registrations */}
        <div className="bg-white rounded-xl shadow-sm border border-navy-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-navy-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClipboardList size={20} className="text-golden-500" />
              <h2 className="font-bold text-navy-800">Your Registrations</h2>
            </div>
            <span className="text-sm text-navy-400">
              {registrations.length} registration{registrations.length !== 1 ? "s" : ""}
            </span>
          </div>

          {regLoading ? (
            <div className="p-8 text-center">
              <div className="w-6 h-6 border-3 border-navy-200 border-t-golden-400 rounded-full animate-spin mx-auto" />
            </div>
          ) : registrations.length === 0 ? (
            <div className="p-8 text-center">
              <ClipboardList size={40} className="mx-auto mb-3 text-navy-200" />
              <p className="text-navy-500 mb-4">No registrations found for your email.</p>
              <Link
                href="/register"
                className="inline-flex items-center gap-1 bg-golden-400 text-navy-900 font-semibold px-5 py-2.5 rounded-lg hover:bg-golden-500 transition-colors shadow-md text-sm"
              >
                Register for CanSat <ChevronRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-navy-100">
              {registrations.map((reg) => (
                <div key={reg.id} className="px-6 py-4 hover:bg-navy-50/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-bold text-golden-500">
                          {reg.id}
                        </span>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                            reg.category === "school"
                              ? "bg-blue-50 text-blue-600"
                              : reg.category === "college"
                                ? "bg-purple-50 text-purple-600"
                                : "bg-emerald-50 text-emerald-600"
                          )}
                        >
                          {reg.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-navy-800">{reg.teamName}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-navy-400">
                        <span className="flex items-center gap-1">
                          <Building size={12} /> {reg.institution}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {reg.state}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={12} /> {(reg.teamMembers as Array<{name: string; role: string}>).length} member{(reg.teamMembers as Array<{name: string; role: string}>).length !== 1 ? "s" : ""}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {new Date(reg.createdAt).toLocaleDateString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/register/success?id=${reg.id}`}
                      className="shrink-0 text-sm text-river-500 hover:text-river-600 font-medium flex items-center gap-1"
                    >
                      View ID <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
