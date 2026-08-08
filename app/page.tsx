const announcements = [
  {
    id: 1,
    title: "College Reopening",
    description:
      "The college will reopen as per the academic schedule.",
    category: "General",
    date: "08 August 2026",
  },
  {
    id: 2,
    title: "Internal Examinations",
    description:
      "Internal examination schedules will be announced soon.",
    category: "Academic",
    date: "10 August 2026",
  },
  {
    id: 3,
    title: "Campus Placement Drive",
    description:
      "A placement drive will be conducted on campus.",
    category: "Placement",
    date: "15 August 2026",
  },
];

const events = [
  {
    id: 1,
    title: "Technical Workshop",
    date: "12 August 2026",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Cultural Fest",
    date: "20 August 2026",
    time: "10:00 AM",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero Section */}

      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold">
          Smart Campus Updates
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Stay informed about campus announcements, upcoming
          events, important alerts, and other college information.
        </p>
      </section>

      {/* Announcements */}

      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="m-0">Latest Announcements</h2>

          <a
            href="/announcements"
            className="font-medium underline"
          >
            View All
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {announcements.map((announcement) => (
            <article key={announcement.id} className="m-0">
              <p className="text-sm font-medium">
                {announcement.category}
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                {announcement.title}
              </h3>

              <p className="mt-2 text-slate-600">
                {announcement.description}
              </p>

              <p className="mt-4 text-sm text-slate-500">
                {announcement.date}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Events */}

      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="m-0">Upcoming Events</h2>

          <a
            href="/events"
            className="font-medium underline"
          >
            View All
          </a>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <article
              key={event.id}
              className="m-0 flex flex-col justify-between gap-4 md:flex-row"
            >
              <div>
                <h3 className="text-xl font-semibold">
                  {event.title}
                </h3>

                <p className="text-slate-600">
                  Campus Event
                </p>
              </div>

              <div>
                <p className="font-medium">
                  {event.date}
                </p>

                <p className="text-slate-500">
                  {event.time}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Alerts */}

      <section>
        <h2>Important Alerts</h2>

        <article className="m-0">
          <h3 className="text-xl font-semibold">
            No urgent alerts
          </h3>

          <p className="text-slate-600">
            There are currently no urgent campus alerts.
          </p>
        </article>
      </section>
    </main>
  );
}