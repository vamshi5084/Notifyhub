import { sql } from "@/lib/db";

export default async function Announcements() {
  const announcements = await sql`
    SELECT
      id,
      title,
      description,
      category,
      department,
      date,
      urgent
    FROM announcements
    ORDER BY date DESC
  `;

  return (
    <main>

      {/* Header */}
      <section className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-slate-500">
          Campus Updates
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900 md:text-5xl">
          Announcements
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          View the latest announcements, academic updates,
          placement information, and important notices from
          the campus.
        </p>
      </section>

      {/* Announcements */}
      {announcements.length === 0 ? (
        <section className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            No announcements available
          </h2>

          <p className="mt-3 text-slate-600">
            There are currently no campus announcements.
          </p>
        </section>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">

          {announcements.map((announcement) => (
            <article
              key={announcement.id}
              className={`m-0 rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                announcement.urgent
                  ? "border-red-200"
                  : "border-slate-200"
              }`}
            >

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {announcement.category}
                </span>

                {announcement.urgent && (
                  <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                    URGENT
                  </span>
                )}

              </div>

              {/* Title */}
              <h2 className="mt-5 text-2xl font-bold leading-tight text-slate-900">
                {announcement.title}
              </h2>

              {/* Description */}
              <p className="mt-4 leading-7 text-slate-600">
                {announcement.description}
              </p>

              {/* Details */}
              <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">

                <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    Department:
                  </span>

                  <span className="text-sm text-slate-600">
                    {announcement.department}
                  </span>
                </div>

                <div className="flex flex-col gap-1 sm:flex-row sm:gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    Date:
                  </span>

                  <span className="text-sm text-slate-600">
                    {announcement.date}
                  </span>
                </div>

              </div>

            </article>
          ))}

        </div>
      )}

    </main>
  );
}