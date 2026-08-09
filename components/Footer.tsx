import Link from "next/link";
import { Bell, Shield, Heart, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Bell className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Notify<span className="text-indigo-400">Hub</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              The central digital notice board for instant campus updates, urgent alerts, event registrations, and direct administration queries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/announcements" className="transition hover:text-white">
                  Campus Announcements
                </Link>
              </li>
              <li>
                <Link href="/events" className="transition hover:text-white">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/queries" className="transition hover:text-white">
                  Submit Support Query
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-white">
                  About Platform
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Admin */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Portal Services
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/admin" className="flex items-center gap-1.5 transition hover:text-indigo-400">
                  <Shield className="h-3.5 w-3.5 text-indigo-400" />
                  Admin Dashboard Login
                </Link>
              </li>
              <li>
                <Link href="/queries" className="transition hover:text-white">
                  Check Query Status
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 mt-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Database Systems Operational
                </span>
              </li>
            </ul>
          </div>

          {/* Emergency / Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Campus Helpline
            </h4>
            <p className="text-xs text-slate-400">
              For urgent administrative matters or emergency campus alerts, submit a direct query.
            </p>
            <Link
              href="/queries"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-700"
            >
              Contact Admin Office <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row text-xs text-slate-500">
          <p>© {new Date().getFullYear()} NotifyHub Campus System. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" /> for Smart Campus Communication
          </p>
        </div>
      </div>
    </footer>
  );
}
