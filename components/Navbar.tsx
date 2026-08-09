"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  Megaphone,
  Calendar,
  HelpCircle,
  Info,
  Shield,
  Menu,
  X,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin";

  if (isAdminPage) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/", icon: Sparkles },
    { name: "Announcements", href: "/announcements", icon: Megaphone },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Queries", href: "/queries", icon: HelpCircle },
    { name: "About", href: "/about", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      {/* Top Banner Alert Ticker */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-4 py-1.5 text-xs text-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-2.5 py-0.5 font-semibold text-indigo-300 ring-1 ring-indigo-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              Live Campus Updates
            </span>
            <span className="hidden truncate sm:inline-block text-slate-300">
              Stay connected with academic notices, exam dates, and campus events in real-time.
            </span>
          </div>
          <Link
            href="/announcements"
            className="flex items-center gap-1 font-medium text-indigo-300 transition hover:text-white shrink-0 ml-2"
          >
            Latest News <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5 transition">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20 transition group-hover:scale-105">
            <Bell className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Notify<span className="text-indigo-600">Hub</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
              Smart Campus Portal
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-slate-100 text-indigo-600 shadow-xs"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    isActive ? "text-indigo-600" : "text-slate-400"
                  }`}
                />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/admin"
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600 hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Shield className="h-4 w-4 text-indigo-400" />
            Admin Portal
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white/95 px-4 pt-3 pb-6 backdrop-blur-lg lg:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-base font-semibold transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${
                      isActive ? "text-indigo-600" : "text-slate-500"
                    }`}
                  />
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-indigo-600"
            >
              <Shield className="h-4 w-4 text-indigo-400" />
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}