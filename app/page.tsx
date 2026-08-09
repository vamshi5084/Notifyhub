import Link from "next/link";
import { sql } from "@/lib/db";

export default async function Home() {
  const announcements = await sql`
    SELECT
      id,
      title,
      description,
      category,
      date,
      urgent
    FROM announcements
    ORDER BY date DESC
    LIMIT 3
  `;

  const events = await sql`
    SELECT
      id,
      title,
      description,
      category,
      date,
      time,
      venue
    FROM events
    ORDER BY date ASC
    LIMIT 3
  `;

  const urgentAnnouncements = announcements.filter(
    (announcement) => announcement.urgent
  );

  return (
    <main>

      {/* Hero Section */}
      <section className="mb-16 overflow-hidden rounded-2xl bg-slate-900 px-6 py-16 text-center text-white shadow-lg">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-300">
          Welcome to NotifyHub
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">
          Smart Campus Updates
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Stay informed about campus announcements, upcoming events,
          important alerts, and other college information.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/announcements"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            View Announcements
          </Link>

          <Link
            href="/events"
            className="rounded-lg border border-slate-400 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            View Events
          </Link>
        </div>
      </section>

      {/* Latest Announcements */}
      <section className="mb-16">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Stay Updated
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              Latest Announcements
            </h2>
          </div>

          <Link
            href="/announcements"
            className="whitespace-nowrap font-semibold text-slate-700 hover:underline"
          >
            View All →
          </Link>
        </div>

        {announcements.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-slate-600">
              No announcements available.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className="m-0 rounded-xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {announcement.category}
                  </span>

                  {announcement.urgent && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                      URGENT
                    </span>
                  )}
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {announcement.title}
                </h3>

                <p className="mt-3 leading-6 text-slate-600">
                  {announcement.description}
                </p>

                <p className="mt-5 text-sm text-slate-500">
                  {announcement.date}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Events */}
      <section className="mb-16">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              What's Happening
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              Upcoming Events
            </h2>
          </div>

          <Link
            href="/events"
            className="whitespace-nowrap font-semibold text-slate-700 hover:underline"
          >
            View All →
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <p className="text-slate-600">
              No upcoming events available.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <article
                key={event.id}
                className="m-0 rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col justify-between gap-5 md:flex-row">
                  <div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {event.category}
                    </span>

                    <h3 className="mt-4 text-xl font-bold text-slate-900">
                      {event.title}
                    </h3>

                    <p className="mt-2 text-slate-600">
                      {event.description}
                    </p>

                    <p className="mt-3 text-sm text-slate-500">
                      Venue: {event.venue}
                    </p>
                  </div>

                  <div className="min-w-40 rounded-lg bg-slate-50 p-4 md:text-right">
                    <p className="font-semibold text-slate-900">
                      {event.date}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {event.time}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Important Alerts */}
      <section className="mb-16">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Campus Notices
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            Important Alerts
          </h2>
        </div>

        {urgentAnnouncements.length === 0 ? (
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              No urgent alerts
            </h3>

            <p className="mt-2 text-slate-600">
              There are currently no urgent campus alerts.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {urgentAnnouncements.map((announcement) => (
              <article
                key={announcement.id}
                className="m-0 rounded-xl border border-red-200 bg-red-50 p-6"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <span className="w-fit rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                    URGENT
                  </span>

                  <h3 className="text-xl font-bold text-red-900">
                    {announcement.title}
                  </h3>
                </div>

                <p className="mt-3 text-red-800">
                  {announcement.description}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Quick Access */}
      <section className="mb-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Explore
          </p>

          <h2 className="mt-1 text-3xl font-bold text-slate-900">
            Quick Access
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Link
            href="/announcements"
            className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-bold text-slate-900">
              Announcements
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              View the latest campus announcements.
            </p>
          </Link>

          <Link
            href="/events"
            className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-bold text-slate-900">
              Events
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Explore upcoming college events.
            </p>
          </Link>

          <Link
            href="/queries"
            className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-bold text-slate-900">
              Submit a Query
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Contact the campus administration.
            </p>
          </Link>

          <Link
            href="/about"
            className="rounded-xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="font-bold text-slate-900">
              About NotifyHub
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              Learn more about the platform.
            </p>
          </Link>
        </div>
      </section>

    </main>
  );
}