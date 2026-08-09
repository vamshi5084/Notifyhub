"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  LayoutDashboard,
  MessageSquare,
  Megaphone,
  Calendar,
  Globe,
  LogOut,
  Shield,
} from "lucide-react";

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    sessionStorage.removeItem("adminLoggedIn");
    router.push("/admin");
  }

  const links = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Student Queries",
      path: "/admin/queries",
      icon: MessageSquare,
    },
    {
      name: "Announcements",
      path: "/admin/announcements",
      icon: Megaphone,
    },
    {
      name: "Events",
      path: "/admin/events",
      icon: Calendar,
    },
  ];

  return (
    <aside className="sticky top-0 z-40 flex h-screen w-64 flex-col justify-between border-r border-slate-800 bg-slate-950 text-white shrink-0">
      <div>
        {/* Brand Banner */}
        <div className="flex items-center gap-3 border-b border-slate-800/80 px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white leading-none">
              Notify<span className="text-indigo-400">Hub</span>
            </h1>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Management Tools
          </div>
          {links.map((link) => {
            const Icon = link.icon;
            const active = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    active ? "text-white" : "text-slate-500"
                  }`}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-slate-800/80 p-4 space-y-2">
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <Globe className="h-3.5 w-3.5 text-indigo-400" />
          View Public Website
        </Link>

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600/10 border border-rose-500/20 py-2.5 text-xs font-semibold text-rose-400 transition hover:bg-rose-600 hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" />
          Logout Session
        </button>
      </div>
    </aside>
  );
}