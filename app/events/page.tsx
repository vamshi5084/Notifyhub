import { sql } from "@/lib/db";

export default async function Events() {
  const events = await sql`
    SELECT
      id,
      title,
      description,
      category,
      department,
      date,
      time,
      venue,
      registration_link,
      created_at
    FROM events
    ORDER BY date ASC
  `;

  return (
    <main>

      {/* Header */}
      <section className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Campus Activities
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900 md:text-5xl">
          Upcoming Events
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          View upcoming events, workshops, cultural activities,
          placement drives, and other activities happening on campus.
        </p>
      </section>

      {/* Events */}
      {events.length === 0 ? (
        <section className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            No upcoming events
          </h2>

          <p className="mt-3 text-slate-600">
            There are currently no upcoming campus events.
          </p>
        </section>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">

          {events.map((event) => (
            <article
              key={event.id}
              className="m-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              {/* Category */}
              <div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {event.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="mt-5 text-2xl font-bold leading-tight text-slate-900">
                {event.title}
              </h2>

              {/* Description */}
              <p className="mt-4 leading-7 text-slate-600">
                {event.description}
              </p>

              {/* Event Information */}
              <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">

                <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    Department:
                  </span>

                  <span className="text-sm text-slate-600">
                    {event.department}
                  </span>
                </div>

                <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    Date:
                  </span>

                  <span className="text-sm text-slate-600">
                    {event.date}
                  </span>
                </div>

                <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    Time:
                  </span>

                  <span className="text-sm text-slate-600">
                    {event.time}
                  </span>
                </div>

                <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    Venue:
                  </span>

                  <span className="text-sm text-slate-600">
                    {event.venue}
                  </span>
                </div>

              </div>

              {/* Registration */}
              {event.registration_link && (
                <div className="mt-6 border-t border-slate-200 pt-5">
                  <a
                    href={event.registration_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white transition hover:bg-slate-700"
                  >
                    Register for Event →
                  </a>
                </div>
              )}

            </article>
          ))}

        </div>
      )}

    </main>
  );
}