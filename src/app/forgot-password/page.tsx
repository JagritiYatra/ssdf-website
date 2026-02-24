"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { SITE_SHORT_NAME } from "@/lib/constants";

type Step = "email" | "otp" | "reset";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        setStep("otp");
      } else {
        setError(data.error || "Failed to send OTP");
      }
    } catch {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (step === "otp") {
      setStep("reset");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Password reset failed");
        if (data.error?.includes("OTP")) {
          setStep("otp");
        }
      }
    } catch {
      setError("Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
        <div className="w-full max-w-md mx-4 relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <CheckCircle className="mx-auto mb-4 text-forest-400" size={56} />
            <h2 className="text-2xl font-bold text-navy-800 mb-2">Password Reset!</h2>
            <p className="text-navy-500 mb-6">Your password has been reset successfully.</p>
            <button
              onClick={() => router.push("/login")}
              className="w-full bg-golden-400 text-navy-900 font-semibold py-3 rounded-xl hover:bg-golden-500 transition-colors shadow-lg cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-white">Reset Password</h1>
            <p className="text-navy-300 text-sm mt-1">
              {step === "email" && "Enter your email to receive an OTP"}
              {step === "otp" && "Enter the 6-digit code we sent"}
              {step === "reset" && "Set your new password"}
            </p>
          </div>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 py-4 bg-navy-50">
            {(["email", "otp", "reset"] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === s
                      ? "bg-golden-400 text-navy-900"
                      : (["email", "otp", "reset"].indexOf(step) > i)
                        ? "bg-forest-400 text-white"
                        : "bg-navy-200 text-navy-500"
                  }`}
                >
                  {i + 1}
                </div>
                {i < 2 && <div className="w-8 h-0.5 bg-navy-200" />}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="p-8">
            {step === "email" && (
              <form onSubmit={handleRequestOtp} className="space-y-4">
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
                      autoFocus
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
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}

            {step === "otp" && (
              <form onSubmit={handleVerifyAndReset} className="space-y-4">
                <p className="text-sm text-navy-500 text-center mb-2">
                  Code sent to <span className="font-medium text-navy-700">{email}</span>
                </p>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Enter OTP</label>
                  <input
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setCode(v);
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
                  disabled={code.length !== 6}
                  className="w-full bg-golden-400 text-navy-900 font-semibold py-3 rounded-xl hover:bg-golden-500 transition-colors shadow-lg hover:shadow-xl cursor-pointer disabled:opacity-50"
                >
                  Continue
                </button>

                <button
                  type="button"
                  onClick={() => { setStep("email"); setCode(""); setError(""); }}
                  className="w-full text-sm text-navy-400 hover:text-navy-600 py-2 cursor-pointer flex items-center justify-center gap-1"
                >
                  <ArrowLeft size={14} /> Change email
                </button>
              </form>
            )}

            {step === "reset" && (
              <form onSubmit={handleVerifyAndReset} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">New Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
                      className="w-full pl-11 pr-12 py-3 rounded-xl border border-navy-200 bg-navy-50 text-navy-800 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-golden-400 focus:bg-white transition-all"
                      minLength={8}
                      required
                      autoFocus
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

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1.5">Confirm New Password</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter new password"
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-navy-200 bg-navy-50 text-navy-800 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-golden-400 focus:border-golden-400 focus:bg-white transition-all"
                      minLength={8}
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
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}

            <div className="mt-6 pt-5 border-t border-navy-100 text-center">
              <Link href="/login" className="text-sm text-navy-400 hover:text-navy-600 transition-colors">
                &larr; Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
