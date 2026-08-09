"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Announcement = {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  date: string;
  urgent: boolean;
};

export default function AdminAnnouncements() {
  const router = useRouter();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [urgent, setUrgent] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn");

    if (loggedIn !== "true") {
      router.push("/admin");
      return;
    }

    fetchAnnouncements();
  }, [router]);

  async function fetchAnnouncements() {
    try {
      const response = await fetch("/api/admin/announcements");
      const data = await response.json();

      if (data.success) {
        setAnnouncements(data.announcements);
      } else {
        setStatus(data.message || "Failed to load announcements.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Failed to load announcements.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("");

    const announcement = {
      id,
      title,
      description,
      category,
      department,
      date,
      urgent,
    };

    try {
      const response = await fetch("/api/admin/announcements", {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(announcement),
      });

      const data = await response.json();

      if (data.success) {
        setStatus(data.message);
        clearForm();
        await fetchAnnouncements();
      } else {
        setStatus(data.message || "Operation failed.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Something went wrong.");
    }
  }

  function editAnnouncement(announcement: Announcement) {
    setEditingId(announcement.id);

    setId(announcement.id);
    setTitle(announcement.title);
    setDescription(announcement.description);
    setCategory(announcement.category);
    setDepartment(announcement.department);
    setDate(announcement.date);
    setUrgent(announcement.urgent);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function deleteAnnouncement(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch("/api/admin/announcements", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus(data.message);
        await fetchAnnouncements();
      } else {
        setStatus(data.message || "Failed to delete announcement.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Failed to delete announcement.");
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
    setUrgent(false);
  }

  function handleLogout() {
    sessionStorage.removeItem("adminLoggedIn");
    router.push("/admin");
  }

  if (loading) {
    return (
      <main>
        <h1>Admin Announcements</h1>
        <p>Loading announcements...</p>
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
          Manage Announcements
        </h1>

        <p className="mt-3 text-slate-600">
          Add, edit, and delete campus announcements.
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
          {editingId ? "Edit Announcement" : "Add Announcement"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          {/* ID */}
          <div>
            <label
              htmlFor="id"
              className="mb-2 block font-semibold"
            >
              Announcement ID
            </label>

            <input
              type="text"
              id="id"
              value={id}
              onChange={(event) => setId(event.target.value)}
              placeholder="Example: ANN002"
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
              placeholder="Enter announcement title"
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
              placeholder="Enter announcement description"
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
              placeholder="Example: Administration"
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

          {/* Urgent */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="urgent"
              checked={urgent}
              onChange={(event) =>
                setUrgent(event.target.checked)
              }
            />

            <label
              htmlFor="urgent"
              className="font-semibold"
            >
              Mark as urgent announcement
            </label>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
            >
              {editingId
                ? "Update Announcement"
                : "Add Announcement"}
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

      {/* Existing Announcements */}
      <section>
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Campus Content
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Existing Announcements
          </h2>
        </div>

        {announcements.length === 0 ? (
          <div className="rounded-xl border bg-slate-50 p-8 text-center">
            <h3 className="text-xl font-semibold">
              No announcements available
            </h3>

            <p className="mt-2 text-slate-600">
              Add your first announcement using the form above.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {announcements.map((announcement) => (
              <article
                key={announcement.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold">
                    {announcement.category}
                  </span>

                  {announcement.urgent && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                      URGENT
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-xl font-bold">
                  {announcement.title}
                </h3>

                <p className="mt-3 text-slate-600">
                  {announcement.description}
                </p>

                <div className="mt-5 space-y-2 border-t pt-4 text-sm">
                  <p>
                    <strong>ID:</strong> {announcement.id}
                  </p>

                  <p>
                    <strong>Department:</strong>{" "}
                    {announcement.department}
                  </p>

                  <p>
                    <strong>Date:</strong>{" "}
                    {announcement.date}
                  </p>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() =>
                      editAnnouncement(announcement)
                    }
                    className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteAnnouncement(announcement.id)
                    }
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