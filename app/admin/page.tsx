"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  User,
  KeyRound,
  ShieldCheck,
  ArrowLeft,
  GraduationCap,
  BookOpen,
  Landmark,
  Award,
  School,
} from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        sessionStorage.setItem("adminLoggedIn", "true");
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setMessage(result.message || "Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="relative flex min-h-screen items-center justify-center px-4 py-12 text-white overflow-hidden"
      style={{
        backgroundColor: "#060d1f",
        backgroundImage: `
          radial-gradient(circle at 50% -10%, rgba(79, 70, 229, 0.4), transparent 65%),
          radial-gradient(circle at 90% 80%, rgba(124, 58, 237, 0.2), transparent 50%),
          radial-gradient(circle at 5% 80%, rgba(59, 130, 246, 0.15), transparent 45%),
          linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 36px 36px, 36px 36px",
      }}
    >
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute -top-48 -left-48 h-[500px] w-[500px] rounded-full blur-3xl"
        style={{ background: "rgba(79,70,229,0.18)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full blur-3xl"
        style={{ background: "rgba(139,92,246,0.16)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-3xl"
        style={{ background: "rgba(99,102,241,0.06)" }}
      />

      {/* Academic watermark motifs */}
      <GraduationCap
        className="pointer-events-none absolute top-8 left-10 text-white/[0.05]"
        style={{ width: 140, height: 140, transform: "rotate(15deg)" }}
      />
      <BookOpen
        className="pointer-events-none absolute bottom-10 right-12 text-white/[0.05]"
        style={{ width: 130, height: 130, transform: "rotate(-10deg)" }}
      />
      <Landmark
        className="pointer-events-none absolute top-1/3 right-8 text-white/[0.035]"
        style={{ width: 100, height: 100 }}
      />
      <Award
        className="pointer-events-none absolute bottom-1/4 left-8 text-white/[0.035]"
        style={{ width: 90, height: 90, transform: "rotate(8deg)" }}
      />
      <School
        className="pointer-events-none absolute top-10 right-1/3 text-white/[0.03]"
        style={{ width: 80, height: 80 }}
      />

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* College crest / institution badge */}
        <div className="mb-8 text-center">
          {/* Outer ring badge */}
          <div className="mx-auto mb-4 relative inline-block">
            <div
              className="flex h-20 w-20 items-center justify-center rounded-full"
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                boxShadow: "0 0 0 4px rgba(79,70,229,0.2), 0 0 40px rgba(79,70,229,0.4)",
              }}
            >
              <ShieldCheck className="h-9 w-9 text-white" />
            </div>
            {/* Orbital ring */}
            <div
              className="absolute inset-0 rounded-full border border-indigo-500/30 animate-spin"
              style={{ animationDuration: "8s", margin: "-6px" }}
            />
          </div>

          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-3"
            style={{
              background: "rgba(79,70,229,0.15)",
              border: "1px solid rgba(99,102,241,0.4)",
              color: "#a5b4fc",
            }}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            NotifyHub — Academic Administration
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Admin Portal
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#94a3b8" }}>
            Authorized faculty &amp; staff access only. Sign in to manage campus notices.
          </p>
        </div>

        {/* Glassmorphic Form Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background: "rgba(15, 23, 60, 0.7)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(99,102,241,0.25)",
            boxShadow: "0 8px 60px -10px rgba(79,70,229,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Top accent bar */}
          <div
            className="mb-6 h-0.5 w-full rounded-full"
            style={{ background: "linear-gradient(to right, transparent, #6366f1, transparent)" }}
          />

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider"
                style={{ color: "#94a3b8" }}
              >
                Admin Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3.5 top-3.5 h-4 w-4"
                  style={{ color: "#6366f1" }}
                />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  className="w-full rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition"
                  style={{
                    background: "rgba(15,23,42,0.8)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4)",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(99,102,241,0.8)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15), inset 0 1px 3px rgba(0,0,0,0.4)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid rgba(99,102,241,0.3)";
                    e.target.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.4)";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider"
                style={{ color: "#94a3b8" }}
              >
                Password
              </label>
              <div className="relative">
                <KeyRound
                  className="absolute left-3.5 top-3.5 h-4 w-4"
                  style={{ color: "#6366f1" }}
                />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-slate-600 outline-none transition"
                  style={{
                    background: "rgba(15,23,42,0.8)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4)",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid rgba(99,102,241,0.8)";
                    e.target.style.boxShadow = "0 0 0 3px rgba(99,102,241,0.15), inset 0 1px 3px rgba(0,0,0,0.4)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid rgba(99,102,241,0.3)";
                    e.target.style.boxShadow = "inset 0 1px 3px rgba(0,0,0,0.4)";
                  }}
                />
              </div>
            </div>

            {/* Error Message */}
            {message && (
              <div
                className="rounded-xl p-3.5 text-xs font-medium"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#fca5a5",
                }}
              >
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                boxShadow: "0 4px 20px rgba(79,70,229,0.4)",
              }}
              onMouseEnter={(e) => {
                if (!loading) (e.target as HTMLButtonElement).style.boxShadow = "0 6px 28px rgba(79,70,229,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(79,70,229,0.4)";
              }}
            >
              <Lock className="h-4 w-4" />
              {loading ? "Authenticating..." : "Sign In to Control Panel"}
            </button>
          </form>

          {/* Bottom accent bar */}
          <div
            className="mt-6 h-0.5 w-full rounded-full"
            style={{ background: "linear-gradient(to right, transparent, #6366f1, transparent)" }}
          />
        </div>

        {/* Security notice */}
        <div className="mt-4 text-center">
          <p className="text-xs" style={{ color: "rgba(148,163,184,0.6)" }}>
            🔒 Secured connection · Unauthorized access is prohibited
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-5 text-center">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-1.5 text-xs font-medium transition hover:text-white"
            style={{ color: "#6366f1" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Return to Public Website
          </button>
        </div>
      </div>
    </main>
  );
}