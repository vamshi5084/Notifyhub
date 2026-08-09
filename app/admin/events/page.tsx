"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Event = {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  date: string;
  time: string;
  venue: string;
  registration_link: string | null;
  created_at: number;
};

export default function AdminEvents() {
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn");

    if (loggedIn !== "true") {
      router.push("/admin");
      return;
    }

    fetchEvents();
  }, [router]);

  async function fetchEvents() {
    try {
      const response = await fetch("/api/admin/events");
      const data = await response.json();

      if (data.success) {
        setEvents(data.events);
      } else {
        setStatus(data.message || "Failed to load events.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Failed to load events.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("");

    const eventData = {
      id,
      title,
      description,
      category,
      department,
      date,
      time,
      venue,
      registration_link: registrationLink || null,
    };

    try {
      const response = await fetch("/api/admin/events", {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus(data.message);
        clearForm();
        await fetchEvents();
      } else {
        setStatus(data.message || "Operation failed.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong.");
    }
  }

  function editEvent(event: Event) {
    setEditingId(event.id);

    setId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setCategory(event.category);
    setDepartment(event.department);
    setDate(event.date);
    setTime(event.time);
    setVenue(event.venue);
    setRegistrationLink(event.registration_link || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function deleteEvent(eventId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch("/api/admin/events", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: eventId,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus(data.message);
        await fetchEvents();
      } else {
        setStatus(data.message || "Failed to delete event.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Failed to delete event.");
    }
  }

  function clearForm() {
    setEditingId(null);
    setId("");
    setTitle("");
    setDescription("");
    setCategory("");
    setDepartment("");
    setDate("");
    setTime("");
    setVenue("");
    setRegistrationLink("");
  }

  function handleLogout() {
    sessionStorage.removeItem("adminLoggedIn");
    router.push("/admin");
  }

  if (loading) {
    return (
      <main>
        <h1>Manage Events</h1>
        <p>Loading events...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      {/* Header */}
      <section className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Administration
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Manage Events
        </h1>

        <p className="mt-3 text-slate-600">
          Add, edit, and delete upcoming campus events.
        </p>
      </section>

      {/* Navigation */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="rounded-lg bg-slate-200 px-5 py-3 font-semibold text-slate-900 hover:bg-slate-300"
        >
          Back to Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <section className="mb-12 rounded-2xl border bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold">
          {editingId ? "Edit Event" : "Add Event"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          {/* Event ID */}
          <div>
            <label
              htmlFor="id"
              className="mb-2 block font-semibold"
            >
              Event ID
            </label>

            <input
              type="text"
              id="id"
              value={id}
              onChange={(event) => setId(event.target.value)}
              placeholder="Example: EVENT002"
              disabled={editingId !== null}
              required
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block font-semibold"
            >
              Title
            </label>

            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter event title"
              required
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block font-semibold"
            >
              Description
            </label>

            <textarea
              id="description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              rows={5}
              placeholder="Enter event description"
              required
              className="w-full resize-none rounded-lg border px-4 py-3"
            />
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="mb-2 block font-semibold"
            >
              Category
            </label>

            <input
              type="text"
              id="category"
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
              placeholder="Example: Academic"
              required
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          {/* Department */}
          <div>
            <label
              htmlFor="department"
              className="mb-2 block font-semibold"
            >
              Department
            </label>

            <input
              type="text"
              id="department"
              value={department}
              onChange={(event) =>
                setDepartment(event.target.value)
              }
              placeholder="Example: Computer Science"
              required
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="date"
              className="mb-2 block font-semibold"
            >
              Date
            </label>

            <input
              type="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
              className="rounded-lg border px-4 py-3"
            />
          </div>

          {/* Time */}
          <div>
            <label
              htmlFor="time"
              className="mb-2 block font-semibold"
            >
              Time
            </label>

            <input
              type="text"
              id="time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              placeholder="Example: 10:00 AM"
              required
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          {/* Venue */}
          <div>
            <label
              htmlFor="venue"
              className="mb-2 block font-semibold"
            >
              Venue
            </label>

            <input
              type="text"
              id="venue"
              value={venue}
              onChange={(event) =>
                setVenue(event.target.value)
              }
              placeholder="Example: Seminar Hall"
              required
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          {/* Registration Link */}
          <div>
            <label
              htmlFor="registrationLink"
              className="mb-2 block font-semibold"
            >
              Registration Link (Optional)
            </label>

            <input
              type="url"
              id="registrationLink"
              value={registrationLink}
              onChange={(event) =>
                setRegistrationLink(event.target.value)
              }
              placeholder="https://example.com/register"
              className="w-full rounded-lg border px-4 py-3"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
            >
              {editingId ? "Update Event" : "Add Event"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={clearForm}
                className="rounded-lg bg-slate-200 px-6 py-3 font-semibold text-slate-900 hover:bg-slate-300"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {status && (
          <div className="mt-5 rounded-lg bg-slate-100 p-4">
            <p className="font-medium">{status}</p>
          </div>
        )}
      </section>

      {/* Existing Events */}
      <section>
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Campus Activities
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Existing Events
          </h2>
        </div>

        {events.length === 0 ? (
          <div className="rounded-xl border bg-slate-50 p-8 text-center">
            <h3 className="text-xl font-semibold">
              No events available
            </h3>

            <p className="mt-2 text-slate-600">
              Add your first event using the form above.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <article
                key={event.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                  {event.category}
                </span>

                <h3 className="mt-4 text-xl font-bold">
                  {event.title}
                </h3>

                <p className="mt-3 text-slate-600">
                  {event.description}
                </p>

                <div className="mt-5 space-y-2 border-t pt-4 text-sm">
                  <p>
                    <strong>Event ID:</strong> {event.id}
                  </p>

                  <p>
                    <strong>Department:</strong>{" "}
                    {event.department}
                  </p>

                  <p>
                    <strong>Date:</strong> {event.date}
                  </p>

                  <p>
                    <strong>Time:</strong> {event.time}
                  </p>

                  <p>
                    <strong>Venue:</strong> {event.venue}
                  </p>

                  {event.registration_link && (
                    <p>
                      <strong>Registration:</strong>{" "}
                      <a
                        href={event.registration_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold underline"
                      >
                        Register
                      </a>
                    </p>
                  )}
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => editEvent(event)}
                    className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}