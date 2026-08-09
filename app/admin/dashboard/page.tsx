"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

        if (queryData.success) {
          setQueries(queryData.queries);
        }

        // Load announcements
        const announcementResponse = await fetch(
          "/api/admin/announcements"
        );

        const announcementData =
          await announcementResponse.json();

        if (announcementData.success) {
          setAnnouncementCount(
            announcementData.announcements.length
          );
        }

        // Load events
        const eventResponse = await fetch(
          "/api/admin/events"
        );

        const eventData = await eventResponse.json();

        if (eventData.success) {
          setEventCount(eventData.events.length);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
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
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
              NotifyHub Admin Dashboard
            </h1>

            <p className="mt-3 text-slate-600">
              Loading dashboard...
            </p>
          </div>
        </div>
      </main>
    );
  }

  const total = queries.length;

  const answered = queries.filter(
    (q) => q.answered
  ).length;

  const pending = queries.filter(
    (q) => !q.answered
  ).length;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <section className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              NotifyHub Admin Dashboard
            </h1>

            <p className="mt-3 text-slate-600">
              Manage campus announcements, events, and
              student queries.
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Logout
          </button>
        </section>

        {/* Statistics */}
        <section className="mb-10">
          <h2 className="mb-5 text-2xl font-bold text-slate-900">
            Dashboard Overview
          </h2>

          <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">

            {/* Total Queries */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Total Queries
              </p>

              <p className="mt-3 text-4xl font-bold text-slate-900">
                {total}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                All student queries
              </p>
            </div>

            {/* Pending */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-yellow-600">
                Pending
              </p>

              <p className="mt-3 text-4xl font-bold text-yellow-600">
                {pending}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Waiting for response
              </p>
            </div>

            {/* Answered */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-green-600">
                Answered
              </p>

              <p className="mt-3 text-4xl font-bold text-green-600">
                {answered}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Admin responses
              </p>
            </div>

            {/* Announcements */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Announcements
              </p>

              <p className="mt-3 text-4xl font-bold text-blue-600">
                {announcementCount}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Published announcements
              </p>
            </div>

            {/* Events */}
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-purple-600">
                Events
              </p>

              <p className="mt-3 text-4xl font-bold text-purple-600">
                {eventCount}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Upcoming events
              </p>
            </div>

          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="mb-5 text-2xl font-bold text-slate-900">
            Quick Actions
          </h2>

          <div className="grid gap-5 md:grid-cols-3">

            {/* Student Queries */}
            <button
              onClick={() =>
                router.push("/admin/queries")
              }
              className="rounded-xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-3xl">
                💬
              </p>

              <h3 className="mt-4 text-xl font-bold">
                Student Queries
              </h3>

              <p className="mt-2 text-slate-600">
                View student queries and provide answers.
              </p>

              <p className="mt-4 font-semibold text-slate-900">
                Open Queries →
              </p>
            </button>

            {/* Announcements */}
            <button
              onClick={() =>
                router.push("/admin/announcements")
              }
              className="rounded-xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-3xl">
                📢
              </p>

              <h3 className="mt-4 text-xl font-bold">
                Announcements
              </h3>

              <p className="mt-2 text-slate-600">
                Add, edit, and delete campus announcements.
              </p>

              <p className="mt-4 font-semibold text-slate-900">
                Manage Announcements →
              </p>
            </button>

            {/* Events */}
            <button
              onClick={() =>
                router.push("/admin/events")
              }
              className="rounded-xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-3xl">
                📅
              </p>

              <h3 className="mt-4 text-xl font-bold">
                Events
              </h3>

              <p className="mt-2 text-slate-600">
                Add, edit, and delete upcoming college events.
              </p>

              <p className="mt-4 font-semibold text-slate-900">
                Manage Events →
              </p>
            </button>

          </div>
        </section>

      </div>
    </main>
  );
}