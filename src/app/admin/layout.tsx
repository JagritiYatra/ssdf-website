"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Lock,
  LogOut,
  Eye,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_SHORT_NAME } from "@/lib/constants";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/registrations", label: "Registrations", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if we have a valid session by hitting an authed endpoint
    fetch("/api/admin/stats", { credentials: "include" })
      .then((res) => {
        if (res.ok) setAuthenticated(true);
      })
      .finally(() => setChecking(false));
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });

      if (res.ok) {
        setAuthenticated(true);
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    setAuthenticated(false);
    setPassword("");
  };

  // Loading state
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-navy-50">
        <div className="w-8 h-8 border-4 border-navy-200 border-t-golden-400 rounded-full animate-spin" />
      </div>
    );
  }

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-golden-400/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-river-400/5 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-md mx-4 relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-navy-800 px-8 py-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-golden-400/10 border border-golden-400/20 rounded-2xl mb-4">
                <ShieldCheck size={32} className="text-golden-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
              <p className="text-navy-300 text-sm mt-1">
                {SITE_SHORT_NAME} Management Console
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="admin-password"
                    className="block text-sm font-medium text-navy-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400"
                    />
                    <input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      className={cn(
                        "w-full pl-11 pr-12 py-3 rounded-xl border bg-navy-50 text-navy-800 placeholder-navy-400 transition-all focus:outline-none focus:ring-2 focus:bg-white",
                        error
                          ? "border-red-300 focus:ring-red-400"
                          : "border-navy-200 focus:ring-golden-400 focus:border-golden-400"
                      )}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 cursor-pointer"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                  {error && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                      {error}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full bg-golden-400 text-navy-900 font-semibold py-3 rounded-xl hover:bg-golden-500 transition-colors shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50"
                >
                  {loginLoading ? "Signing in..." : "Sign In"}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-navy-100 text-center">
                <Link
                  href="/"
                  className="text-sm text-navy-400 hover:text-river-500 transition-colors"
                >
                  &larr; Back to website
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard layout
  return (
    <div className="min-h-screen bg-navy-50">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-navy-800 h-16 flex items-center px-4 lg:px-6 shadow-lg">
        <div className="flex items-center gap-3 flex-1">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-navy-300 hover:text-white p-2 rounded-lg hover:bg-navy-700 transition-colors cursor-pointer"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2.5">
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
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        {/* Right side */}
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
      </header>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 bottom-0 w-60 bg-navy-800 border-r border-navy-700 z-30 transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <nav className="p-4 space-y-1">
          <p className="text-[10px] text-navy-500 uppercase tracking-widest font-semibold px-3 mb-3">
            Navigation
          </p>
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-golden-400/10 text-golden-400 border border-golden-400/20"
                    : "text-navy-300 hover:text-white hover:bg-navy-700/60"
                )}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <main className="pt-16 lg:pl-60 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
