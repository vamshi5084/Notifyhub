import Link from "next/link";
import { sql } from "@/lib/db";
import {
  Megaphone,
  Calendar,
  AlertTriangle,
  ArrowRight,
  Clock,
  MapPin,
  Building2,
  Sparkles,
  ShieldCheck,
  HelpCircle,
  TrendingUp,
  CheckCircle2,
  GraduationCap,
  BookOpen,
  Landmark,
  School,
  Award,
} from "lucide-react";

export const revalidate = 0;

export default async function Home() {
  let announcements: any[] = [];
  let events: any[] = [];

  try {
    announcements = await sql`
      SELECT
        id,
        title,
        description,
        category,
        date,
        urgent,
        department
      FROM announcements
      ORDER BY date DESC
      LIMIT 3
    `;

    events = await sql`
      SELECT
        id,
        title,
        description,
        category,
        date,
        time,
        venue,
        department,
        registration_link
      FROM events
      ORDER BY date ASC
      LIMIT 3
    `;
  } catch (err) {
    console.error("Database fetch error, using fallback demo content:", err);
    // Fallback demo content if Neon DB is empty or disconnected
    announcements = [
      {
        id: "ANN-DEMO-1",
        title: "End Semester Examination Schedule & Guidelines 2026",
        description: "The official timetable for upcoming end-semester examinations is now published. All students are advised to check hall tickets.",
        category: "Academic",
        department: "Examination Cell",
        date: "2026-08-10",
        urgent: true,
      },
      {
        id: "ANN-DEMO-2",
        title: "Annual Campus Placement Drive & Resume Workshop",
        description: "Leading technology companies visiting campus next week. Register for the preparation bootcamps hosted by T&P department.",
        category: "Placement",
        department: "Training & Placement",
        date: "2026-08-12",
        urgent: false,
      },
      {
        id: "ANN-DEMO-3",
        title: "Library Extended Timings During Exam Week",
        description: "The central library will remain open until 11:00 PM starting Monday for student revision and study sessions.",
        category: "General",
        department: "Library Administration",
        date: "2026-08-14",
        urgent: false,
      },
    ];

    events = [
      {
        id: "EVT-DEMO-1",
        title: "HackCampus 2026: 24-Hour Innovation Hackathon",
        description: "Build real-world solutions, compete with top campus teams, and win exciting prizes from industry sponsors.",
        category: "Technical",
        department: "Computer Science Dept",
        date: "2026-08-20",
        time: "09:00 AM - 05:00 PM",
        venue: "Main Auditorium & Labs",
        registration_link: "https://example.com/register",
      },
      {
        id: "EVT-DEMO-2",
        title: "Annual Cultural Fest & Music Concert Night",
        description: "Join us for a day of music, dance, drama, art showcases, and celebrity band performance on main campus lawn.",
        category: "Cultural",
        department: "Student Council",
        date: "2026-08-28",
        time: "04:00 PM Onwards",
        venue: "Open Air Theatre",
        registration_link: "",
      },
    ];
  }

  const urgentAnnouncements = announcements.filter(
    (announcement) => announcement.urgent
  );

  return (
    <main className="min-h-screen pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden college-hero pt-16 pb-20 text-white sm:pt-20 sm:pb-24 border-b border-indigo-900/50">
        {/* Glow Background Elements */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl"></div>

        {/* Academic Watermark Motifs */}
        <GraduationCap className="pointer-events-none absolute top-10 left-12 h-28 w-28 text-white/[0.04] rotate-12" />
        <BookOpen className="pointer-events-none absolute bottom-12 right-16 h-32 w-32 text-white/[0.04] -rotate-12" />
        <Landmark className="pointer-events-none absolute top-20 right-1/4 h-24 w-24 text-white/[0.03]" />
        <Award className="pointer-events-none absolute bottom-16 left-1/4 h-20 w-20 text-white/[0.03] rotate-6" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            {/* Top Pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md">
              <GraduationCap className="h-4 w-4 text-indigo-400" />
              <span>Smart Campus Notice & Event Portal</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Stay Informed. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                Never Miss a Campus Update.
              </span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
              NotifyHub connects students, faculty, and administration in one unified digital portal. Get official notices, upcoming events, exam schedules, and resolution to your campus queries.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/announcements"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                <Megaphone className="h-4 w-4" />
                View Announcements
              </Link>

              <Link
                href="/events"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-700 hover:border-slate-600 sm:w-auto"
              >
                <Calendar className="h-4 w-4 text-indigo-400" />
                Explore Events
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md sm:grid-cols-4 lg:gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Megaphone className="h-5 w-5" />
              </div>
              <span className="mt-3 text-2xl font-extrabold text-white">24/7</span>
              <span className="text-xs text-slate-400 font-medium mt-0.5">Live Notice Board</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="mt-3 text-2xl font-extrabold text-white">100%</span>
              <span className="text-xs text-slate-400 font-medium mt-0.5">Departments Covered</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <span className="mt-3 text-2xl font-extrabold text-white">Instant</span>
              <span className="text-xs text-slate-400 font-medium mt-0.5">Urgent Campus Alerts</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="mt-3 text-2xl font-extrabold text-white">Direct</span>
              <span className="text-xs text-slate-400 font-medium mt-0.5">Student Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        {/* Urgent Alerts Section */}
        {urgentAnnouncements.length > 0 && (
          <section className="mb-12">
            <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-6 shadow-xs backdrop-blur-xs sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-600 text-white shadow-md shadow-rose-600/30 badge-pulse">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    High Priority Action Required
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Urgent Campus Notices ({urgentAnnouncements.length})
                  </h2>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {urgentAnnouncements.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between gap-4 rounded-xl border border-rose-200/80 bg-white p-4 shadow-2xs sm:flex-row sm:items-center"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-rose-100 px-2 py-0.5 text-[11px] font-bold text-rose-700">
                          {item.category || "URGENT"}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          {item.date}
                        </span>
                      </div>
                      <h3 className="mt-1.5 text-base font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <Link
                      href="/announcements"
                      className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 transition hover:text-rose-800 shrink-0"
                    >
                      Read Full Notice <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Latest Announcements */}
        <section className="mb-14">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
                <Megaphone className="h-4 w-4" />
                Official Updates
              </div>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Latest Announcements
              </h2>
            </div>
            <Link
              href="/announcements"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              View All Announcements{" "}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {announcements.map((item) => (
              <article
                key={item.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover-lift"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                      {item.category || "General"}
                    </span>
                    {item.urgent && (
                      <span className="rounded-lg bg-rose-100 px-2 py-0.5 text-[11px] font-bold text-rose-700">
                        URGENT
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Building2 className="h-3.5 w-3.5 text-slate-400" />
                    <span>{item.department || "Administration"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>{item.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-14">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
                <Calendar className="h-4 w-4" />
                Campus Life & Activities
              </div>
              <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                Upcoming Events
              </h2>
            </div>
            <Link
              href="/events"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              View Full Event Calendar{" "}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {events.map((evt) => (
              <article
                key={evt.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover-lift"
              >
                <div>
                  {/* Category & Date badge */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                      {evt.category || "Event"}
                    </span>
                    <div className="flex flex-col items-center rounded-xl bg-indigo-600 px-3 py-1.5 text-white shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {evt.date ? new Date(evt.date).toLocaleString('default', { month: 'short' }) : 'EVENT'}
                      </span>
                      <span className="text-base font-extrabold leading-none">
                        {evt.date ? new Date(evt.date).getDate() : '📅'}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition">
                    {evt.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {evt.description}
                  </p>
                </div>

                <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                    <span>{evt.time || "Schedule TBD"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{evt.venue || "Campus Venue"}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Quick Hub Navigation Cards */}
        <section className="mb-12">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl sm:p-12">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                <Sparkles className="h-4 w-4" /> Quick Services
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Need Help or Have Questions?
              </h2>
              <p className="mt-3 text-slate-300">
                Submit queries directly to the campus administration and receive official status tracking and answers online.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/announcements"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:bg-white/10 hover:border-white/20"
              >
                <div>
                  <Megaphone className="h-6 w-6 text-indigo-400" />
                  <h3 className="mt-3 font-bold text-white">Announcements</h3>
                  <p className="text-xs text-slate-400 mt-1">Read official notices</p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400" />
              </Link>

              <Link
                href="/events"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:bg-white/10 hover:border-white/20"
              >
                <div>
                  <Calendar className="h-6 w-6 text-emerald-400" />
                  <h3 className="mt-3 font-bold text-white">Events Calendar</h3>
                  <p className="text-xs text-slate-400 mt-1">Register for activities</p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400" />
              </Link>

              <Link
                href="/queries"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:bg-white/10 hover:border-white/20"
              >
                <div>
                  <HelpCircle className="h-6 w-6 text-amber-400" />
                  <h3 className="mt-3 font-bold text-white">Ask Administration</h3>
                  <p className="text-xs text-slate-400 mt-1">Submit support query</p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400" />
              </Link>

              <Link
                href="/about"
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition hover:bg-white/10 hover:border-white/20"
              >
                <div>
                  <CheckCircle2 className="h-6 w-6 text-purple-400" />
                  <h3 className="mt-3 font-bold text-white">About Platform</h3>
                  <p className="text-xs text-slate-400 mt-1">Features & info</p>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-400" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}