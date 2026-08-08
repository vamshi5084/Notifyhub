const events = [
  {
    id: 1,
    title: "Technical Workshop",
    description: "A technical workshop will be conducted for students.",
    date: "12 August 2026",
    time: "10:00 AM",
    venue: "Seminar Hall",
  },
  {
    id: 2,
    title: "Cultural Fest",
    description: "Annual cultural celebrations will be held on campus.",
    date: "20 August 2026",
    time: "10:00 AM",
    venue: "College Auditorium",
  },
  {
    id: 3,
    title: "Placement Drive",
    description: "A company will conduct a campus recruitment drive.",
    date: "25 August 2026",
    time: "9:00 AM",
    venue: "Placement Cell",
  },
];

export default function Events() {
  return (
    <main>
      <h1>Upcoming Events</h1>

      <p>
        View upcoming events and activities happening on campus.
      </p>

      {events.map((event) => (
        <article key={event.id}>
          <h2>{event.title}</h2>

          <p>{event.description}</p>

          <p>
            <strong>Date:</strong> {event.date}
          </p>

          <p>
            <strong>Time:</strong> {event.time}
          </p>

          <p>
            <strong>Venue:</strong> {event.venue}
          </p>
        </article>
      ))}
    </main>
  );
}