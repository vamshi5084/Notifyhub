"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  MessageSquare,
  Megaphone,
  Calendar,
  Clock,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  LogOut,
  ShieldCheck,
  TrendingUp,
  GraduationCap,
  BookOpen,
  Landmark,
  Award,
  Building2,
  Users,
} from "lucide-react";

type Query = {
  id: string;
  answered: boolean;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [queries, setQueries] = useState<Query[]>([]);
  const [announcementCount, setAnnouncementCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn");

    if (loggedIn !== "true") {
      router.push("/admin");
      return;
    }

    async function loadDashboard() {
      try {
        // Load queries
        const queryResponse = await fetch("/api/admin/queries");
        const queryData = await queryResponse.json();
        if (queryData.success && Array.isArray(queryData.queries)) {
          setQueries(queryData.queries);
        }

        // Load announcements
        const announcementResponse = await fetch("/api/admin/announcements");
        const announcementData = await announcementResponse.json();
        if (announcementData.success && Array.isArray(announcementData.announcements)) {
          setAnnouncementCount(announcementData.announcements.length);
        }

        // Load events
        const eventResponse = await fetch("/api/admin/events");
        const eventData = await eventResponse.json();
        if (eventData.success && Array.isArray(eventData.events)) {
          setEventCount(eventData.events.length);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
        // Fallback demo numbers if server API fails
        setQueries([{ id: "1", answered: true }, { id: "2", answered: false }]);
        setAnnouncementCount(4);
        setEventCount(3);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  function logout() {
    sessionStorage.removeItem("adminLoggedIn");
    router.push("/admin");
  }

  if (loading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center p-6"
        style={{
          backgroundColor: "#060d1f",
          backgroundImage: `
            radial-gradient(circle at 50% 0%, rgba(79,70,229,0.3), transparent 60%),
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 36px 36px, 36px 36px",
        }}
      >
        <div className="text-center">
          <div
            className="mx-auto h-14 w-14 animate-spin rounded-full"
            style={{
              border: "3px solid rgba(99,102,241,0.2)",
              borderTop: "3px solid #6366f1",
            }}
          />
          <h2 className="mt-5 text-base font-bold text-white">Loading Admin Control Panel...</h2>
          <p className="mt-1 text-xs" style={{ color: "#94a3b8" }}>Verifying session & fetching campus data</p>
        </div>
      </div>
    );
  }

  const total = queries.length;
  const answered = queries.filter((q) => q.answered).length;
  const pending = queries.filter((q) => !q.answered).length;

  return (
    <div
      className="min-h-screen text-white overflow-hidden"
      style={{
        backgroundColor: "#070e22",
        backgroundImage: `
          radial-gradient(circle at 0% 0%, rgba(79,70,229,0.2), transparent 50%),
          radial-gradient(circle at 100% 0%, rgba(124,58,237,0.15), transparent 50%),
          radial-gradient(circle at 50% 100%, rgba(59,130,246,0.1), transparent 50%),
          linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 100% 100%, 36px 36px, 36px 36px",
      }}
    >
      {/* Academic watermark motifs */}
      <GraduationCap
        className="pointer-events-none fixed top-12 right-16 text-white/[0.04]"
        style={{ width: 160, height: 160, transform: "rotate(10deg)" }}
      />
      <BookOpen
        className="pointer-events-none fixed bottom-16 left-12 text-white/[0.04]"
        style={{ width: 140, height: 140, transform: "rotate(-8deg)" }}
      />
      <Landmark
        className="pointer-events-none fixed top-1/2 left-8 text-white/[0.025]"
        style={{ width: 100, height: 100, transform: "translateY(-50%)" }}
      />
      <Award
        className="pointer-events-none fixed bottom-1/3 right-8 text-white/[0.025]"
        style={{ width: 90, height: 90 }}
      />

      <div className="relative mx-auto max-w-7xl py-10 px-6 sm:px-10">

        {/* ── Header ── */}
        <section className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div>
            {/* Institution badge */}
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{
                background: "rgba(79,70,229,0.15)",
                border: "1px solid rgba(99,102,241,0.35)",
                color: "#a5b4fc",
              }}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              NotifyHub Campus Admin
            </div>

            <div className="flex items-center gap-3 mb-1">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
                  boxShadow: "0 0 20px rgba(79,70,229,0.4)",
                }}
              >
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#6366f1" }}>
                  Administration Control Panel
                </span>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
                  Executive Dashboard
                </h1>
              </div>
            </div>
            <p className="mt-1 text-sm ml-14" style={{ color: "#64748b" }}>
              Monitor live campus announcements, events, and student query queue.
            </p>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition self-start md:self-auto"
            style={{
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.3)",
              backdropFilter: "blur(8px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.22)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.12)";
            }}
          >
            <LogOut className="h-4 w-4 text-red-400" />
            <span className="text-red-400">Logout Session</span>
          </button>
        </section>

        {/* ── Statistics Grid ── */}
        <section className="mb-12">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" style={{ color: "#6366f1" }} />
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6366f1" }}>
              Overview Metrics
            </h2>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to right, rgba(99,102,241,0.4), transparent)" }}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {/* Total Queries */}
            <StatCard
              label="Total Queries"
              value={total}
              sub="Submitted tickets"
              icon={<HelpCircle className="h-4 w-4" />}
              accentColor="#6366f1"
              bgColor="rgba(99,102,241,0.08)"
              borderColor="rgba(99,102,241,0.25)"
            />
            {/* Pending */}
            <StatCard
              label="Pending Review"
              value={pending}
              sub="Awaiting answers"
              icon={<Clock className="h-4 w-4" />}
              accentColor="#f59e0b"
              bgColor="rgba(245,158,11,0.08)"
              borderColor="rgba(245,158,11,0.25)"
            />
            {/* Answered */}
            <StatCard
              label="Answered"
              value={answered}
              sub="Resolved tickets"
              icon={<CheckCircle2 className="h-4 w-4" />}
              accentColor="#10b981"
              bgColor="rgba(16,185,129,0.08)"
              borderColor="rgba(16,185,129,0.25)"
            />
            {/* Announcements */}
            <StatCard
              label="Announcements"
              value={announcementCount}
              sub="Live campus notices"
              icon={<Megaphone className="h-4 w-4" />}
              accentColor="#818cf8"
              bgColor="rgba(129,140,248,0.08)"
              borderColor="rgba(129,140,248,0.25)"
            />
            {/* Events */}
            <StatCard
              label="Events"
              value={eventCount}
              sub="Upcoming activities"
              icon={<Calendar className="h-4 w-4" />}
              accentColor="#a78bfa"
              bgColor="rgba(167,139,250,0.08)"
              borderColor="rgba(167,139,250,0.25)"
            />
          </div>
        </section>

        {/* ── Management Modules ── */}
        <section>
          <div className="mb-5 flex items-center gap-2">
            <Building2 className="h-4 w-4" style={{ color: "#6366f1" }} />
            <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#6366f1" }}>
              Management Modules
            </h2>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to right, rgba(99,102,241,0.4), transparent)" }}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Student Queries */}
            <ModuleCard
              onClick={() => router.push("/admin/queries")}
              icon={<MessageSquare className="h-6 w-6" />}
              iconBg="rgba(245,158,11,0.12)"
              iconColor="#f59e0b"
              title="Student Query Queue"
              description="Review submitted student inquiries, compose administrative replies, and mark tickets as answered."
              linkLabel="Open Query Inbox"
              accentColor="#f59e0b"
              badge={pending > 0 ? `${pending} pending` : undefined}
              badgeColor="#f59e0b"
            />

            {/* Announcements */}
            <ModuleCard
              onClick={() => router.push("/admin/announcements")}
              icon={<Megaphone className="h-6 w-6" />}
              iconBg="rgba(99,102,241,0.12)"
              iconColor="#818cf8"
              title="Manage Announcements"
              description="Publish new academic updates, flag high-priority urgent notices, edit existing posts, or remove notices."
              linkLabel="Manage Notice Board"
              accentColor="#818cf8"
            />

            {/* Events */}
            <ModuleCard
              onClick={() => router.push("/admin/events")}
              icon={<Calendar className="h-6 w-6" />}
              iconBg="rgba(167,139,250,0.12)"
              iconColor="#a78bfa"
              title="Manage Events & Fests"
              description="Schedule campus workshops, hackathons, sports events, venue details, and registration links."
              linkLabel="Manage Events Directory"
              accentColor="#a78bfa"
            />
          </div>
        </section>

        {/* Footer line */}
        <div
          className="mt-14 pt-6 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(99,102,241,0.15)" }}
        >
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" style={{ color: "#4f46e5" }} />
            <span className="text-xs font-semibold" style={{ color: "#475569" }}>
              NotifyHub — Campus Administrative Portal
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
            style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.25)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            System Online
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable Stat Card ── */
function StatCard({
  label,
  value,
  sub,
  icon,
  accentColor,
  bgColor,
  borderColor,
}: {
  label: string;
  value: number;
  sub: string;
  icon: React.ReactNode;
  accentColor: string;
  bgColor: string;
  borderColor: string;
}) {
  return (
    <div
      className="rounded-2xl p-6 transition-transform hover:-translate-y-1 cursor-default"
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        backdropFilter: "blur(12px)",
        boxShadow: `0 4px 24px -4px ${accentColor}22`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>
          {label}
        </span>
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ background: `${accentColor}20`, color: accentColor }}
        >
          {icon}
        </div>
      </div>
      <p className="text-3xl font-extrabold text-white">{value}</p>
      <p className="mt-1 text-xs" style={{ color: `${accentColor}aa` }}>{sub}</p>
    </div>
  );
}

/* ── Reusable Module Card ── */
function ModuleCard({
  onClick,
  icon,
  iconBg,
  iconColor,
  title,
  description,
  linkLabel,
  accentColor,
  badge,
  badgeColor,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
  linkLabel: string;
  accentColor: string;
  badge?: string;
  badgeColor?: string;
}) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-3xl p-7 transition-all"
      style={{
        background: "rgba(15,23,60,0.6)",
        border: "1px solid rgba(99,102,241,0.2)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 4px 32px -8px rgba(79,70,229,0.15)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.border = `1px solid ${accentColor}66`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px -8px ${accentColor}44`;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(99,102,241,0.2)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 32px -8px rgba(79,70,229,0.15)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {/* Icon + Badge row */}
      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ background: iconBg, color: iconColor }}
        >
          {icon}
        </div>
        {badge && (
          <span
            className="rounded-full px-2.5 py-1 text-xs font-bold"
            style={{ background: `${badgeColor}18`, color: badgeColor, border: `1px solid ${badgeColor}40` }}
          >
            {badge}
          </span>
        )}
      </div>

      <h3 className="mt-5 text-xl font-bold text-white" style={{ transition: "color 0.2s" }}>
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
        {description}
      </p>

      <div
        className="mt-6 flex items-center gap-1.5 text-xs font-bold"
        style={{ color: accentColor }}
      >
        {linkLabel}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5"
        />
      </div>
    </div>
  );
}