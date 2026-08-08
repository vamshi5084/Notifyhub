const announcements = [
  {
    id: 1,
    title: "College Reopening",
    description: "The college will reopen as per the academic schedule.",
    date: "08 August 2026",
    category: "General",
  },
  {
    id: 2,
    title: "Internal Examinations",
    description: "Internal examination schedules will be announced soon.",
    date: "10 August 2026",
    category: "Academic",
  },
  {
    id: 3,
    title: "Campus Placement Drive",
    description: "A placement drive will be conducted on campus.",
    date: "15 August 2026",
    category: "Placement",
  },
];

export default function Announcements() {
  return (
    <main>
      <h1>Announcements</h1>

      <p>
        View the latest announcements from the campus.
      </p>

      {announcements.map((announcement) => (
        <article key={announcement.id}>
          <h2>{announcement.title}</h2>

          <p>{announcement.description}</p>

          <p>
            <strong>Category:</strong> {announcement.category}
          </p>

          <p>
            <strong>Date:</strong> {announcement.date}
          </p>
        </article>
      ))}
    </main>
  );
}