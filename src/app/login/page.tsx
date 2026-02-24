"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_SHORT_NAME } from "@/lib/constants";

type Tab = "password" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("password");

  // Password tab state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP tab state
  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail }),
      });

      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: otpEmail, code: otpCode }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/dashboard");
      } else {
        setError(data.error || "Invalid OTP");
      }
    } catch {
      setError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-golden-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-river-400/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md mx-4 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-navy-800 px-8 py-6 text-center">
            <Link href="/" className="inline-flex items-center justify-center gap-2 mb-3">
              <div className="bg-white rounded-lg p-0.5">
                <Image
                  src="/images/logo-transparent.png"
                  alt={SITE_SHORT_NAME}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-md"
                />
              </div>
            </Link>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-navy-300 text-sm mt-1">Sign in to your account</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-navy-100">
            <button
              onClick={() => { setTab("password"); setError(""); }}
              className={cn(
                "flex-1 py-3 text-sm font-medium transition-colors cursor-pointer",
                tab === "password"
                  ? "text-golden-500 border-b-2 border-golden-400"
                  : "text-navy-400 hover:text-navy-600"
              )}
            >
              Email & Password
            </button>
            <button
              onClick={() => { setTab("otp"); setError(""); setOtpSent(false); }}
              className={cn(
                "flex-1 py-3 text-sm font-medium transition-colors cursor-pointer",
                tab === "otp"
                  ? "text-golden-500 border-b-2 border-golden-400"
                  : "text-navy-400 hover:text-navy-600"
              )}
            >
              Email OTP
            </button>
          </div>

          {/* Forms */}
          <div className="p-8">
            {tab === "password" ? (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-navy-200 bg-navy-50 text-navy-800 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-golden-400 focus:bg-white transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      className="w-full pl-11 pr-12 py-3 rounded-xl border border-navy-200 bg-navy-50 text-navy-800 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-golden-400 focus:bg-white transition-all"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <Link href="/forgot-password" className="text-sm text-river-500 hover:text-river-600">
                    Forgot password?
                  </Link>
                </div>

                {error && (
                  <p className="text-sm text-red-500 flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-red-500 rounded-full" />
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-golden-400 text-navy-900 font-semibold py-3 rounded-xl hover:bg-golden-500 transition-colors shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            ) : (
              <>
                {!otpSent ? (
                  <form onSubmit={handleRequestOtp} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-navy-700 mb-1.5">Email</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={otpEmail}
                          onChange={(e) => { setOtpEmail(e.target.value); setError(""); }}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-navy-200 bg-navy-50 text-navy-800 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-golden-400 focus:bg-white transition-all"
                          required
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-red-500 rounded-full" />
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-golden-400 text-navy-900 font-semibold py-3 rounded-xl hover:bg-golden-500 transition-colors shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <p className="text-sm text-navy-500 text-center mb-2">
                      We sent a 6-digit code to <span className="font-medium text-navy-700">{otpEmail}</span>
                    </p>

                    <div>
                      <label className="block text-sm font-medium text-navy-700 mb-1.5">Enter OTP</label>
                      <input
                        type="text"
                        placeholder="000000"
                        value={otpCode}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                          setOtpCode(v);
                          setError("");
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-navy-200 bg-navy-50 text-navy-800 text-center text-2xl font-mono tracking-[0.5em] placeholder-navy-300 focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-golden-400 focus:bg-white transition-all"
                        maxLength={6}
                        autoFocus
                        required
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-red-500 flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-red-500 rounded-full" />
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading || otpCode.length !== 6}
                      className="w-full bg-golden-400 text-navy-900 font-semibold py-3 rounded-xl hover:bg-golden-500 transition-colors shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "Verifying..." : "Verify & Sign In"}
                    </button>

                    <button
                      type="button"
                      onClick={() => { setOtpSent(false); setOtpCode(""); setError(""); }}
                      className="w-full text-sm text-navy-400 hover:text-navy-600 py-2 cursor-pointer flex items-center justify-center gap-1"
                    >
                      <ArrowLeft size={14} /> Change email
                    </button>
                  </form>
                )}
              </>
            )}

            <div className="mt-6 pt-5 border-t border-navy-100 text-center space-y-3">
              <p className="text-sm text-navy-500">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-river-500 hover:text-river-600 font-medium">
                  Sign up
                </Link>
              </p>
              <Link
                href="/"
                className="inline-block text-sm text-navy-400 hover:text-navy-600 transition-colors"
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
