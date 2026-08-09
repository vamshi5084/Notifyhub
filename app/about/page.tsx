import Link from "next/link";
import {
  Bell,
  Megaphone,
  Calendar,
  HelpCircle,
  ShieldCheck,
  Zap,
  Database,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function About() {
  const features = [
    {
      title: "Real-Time Campus Announcements",
      description: "Instant access to urgent academic notices, exam timetables, fee reminders, and placement alerts published by department authorities.",
      icon: Megaphone,
      color: "text-indigo-500 bg-indigo-50 border-indigo-100",
    },
    {
      title: "Interactive Events & Fests Directory",
      description: "Discover upcoming technical hackathons, cultural festivals, sports tournaments, and placement bootcamps with venue pins and direct registrations.",
      icon: Calendar,
      color: "text-emerald-500 bg-emerald-50 border-emerald-100",
    },
    {
      title: "Direct Student Query Resolution",
      description: "Submit queries directly to campus administration and receive official, tracked responses online using your email address.",
      icon: HelpCircle,
      color: "text-amber-500 bg-amber-50 border-amber-100",
    },
    {
      title: "Centralized Admin Control Panel",
      description: "A secure executive dashboard for campus officers to manage notices, schedule events, publish urgent alerts, and answer queries.",
      icon: ShieldCheck,
      color: "text-purple-500 bg-purple-50 border-purple-100",
    },
  ];

  const techStack = [
    { name: "Next.js 16 App Router", desc: "Server components & lightning fast rendering" },
    { name: "Neon Serverless Postgres", desc: "Cloud relational database with instant connection pooling" },
    { name: "Tailwind CSS v4", desc: "Ultra-modern utility styling & responsive visual layout" },
    { name: "TypeScript & React 19", desc: "Type-safe robust interactive client modules" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-12 rounded-3xl bg-slate-900 px-6 py-12 text-white shadow-xl sm:px-10 sm:py-16">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <Sparkles className="h-4 w-4" /> About NotifyHub Platform
          </div>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Empowering Smart Campus <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
              Communication & Efficiency
            </span>
          </h1>
          <p className="mt-4 max-w-3xl text-slate-300 text-sm sm:text-base leading-relaxed">
            NotifyHub is designed to revolutionize how colleges broadcast notices, coordinate campus events, and handle student queries — replacing outdated paper notice boards with a sleek digital ecosystem.
          </p>
        </section>

        {/* Feature Cards Grid */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Core Platform Capabilities
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Built from the ground up for speed, accessibility, and clarity across all devices.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover-lift transition"
                >
                  <div>
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${feat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      {feat.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Architecture & Tech Stack */}
        <section className="mb-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            <Layers className="h-4 w-4" /> Built With Modern Tech
          </div>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            High Performance Architecture
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Engineered with modern web frameworks to guarantee instant page loads, sub-second query fetching, and reliable uptime during peak exam periods.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 transition hover:bg-white hover:shadow-xs"
              >
                <div className="flex items-center gap-2 text-indigo-600">
                  <CheckCircle2 className="h-4 w-4" />
                  <h4 className="font-bold text-slate-900 text-sm">{tech.name}</h4>
                </div>
                <p className="mt-2 text-xs text-slate-500">{tech.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Card */}
        <section className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-center text-white shadow-xl sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to explore campus updates?
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Check latest notices or submit a query to the campus office now.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/announcements"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/30 transition hover:bg-indigo-500"
            >
              <Megaphone className="h-4 w-4" /> Browse Notices
            </Link>
            <Link
              href="/queries"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              <HelpCircle className="h-4 w-4" /> Contact Administration
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}