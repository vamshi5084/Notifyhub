import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-slate-900"
        >
          NotifyHub
        </Link>

        {/* Navigation */}
        <div className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-600">

          <Link
            href="/"
            className="transition hover:text-slate-900"
          >
            Home
          </Link>

          <Link
            href="/announcements"
            className="transition hover:text-slate-900"
          >
            Announcements
          </Link>

          <Link
            href="/events"
            className="transition hover:text-slate-900"
          >
            Events
          </Link>

          <Link
            href="/queries"
            className="transition hover:text-slate-900"
          >
            Queries
          </Link>

          <Link
            href="/about"
            className="transition hover:text-slate-900"
          >
            About
          </Link>

          <Link
            href="/admin"
            className="rounded-lg bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
          >
            Admin
          </Link>

        </div>
      </div>
    </nav>
  );
}