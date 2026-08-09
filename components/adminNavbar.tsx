"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
    },
    {
      name: "Student Queries",
      path: "/admin/queries",
    },
    {
      name: "Announcements",
      path: "/admin/announcements",
    },
    {
      name: "Events",
      path: "/admin/events",
    },
  ];

  return (
    <aside className="min-h-screen w-64 border-r bg-slate-900 text-white">
      <div className="border-b border-slate-700 p-6">
        <h1 className="text-2xl font-bold">NotifyHub</h1>

        <p className="mt-1 text-sm text-slate-400">
          Administration
        </p>
      </div>

      <nav className="p-4">
        <div className="space-y-2">
          {links.map((link) => {
            const active = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`block rounded-lg px-4 py-3 font-semibold transition ${
                  active
                    ? "bg-white text-slate-900"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 border-t border-slate-700 pt-6">
          <Link
            href="/"
            className="block rounded-lg px-4 py-3 font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            View Website
          </Link>

          <button
            onClick={logout}
            className="mt-2 w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}