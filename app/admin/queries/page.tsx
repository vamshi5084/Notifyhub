"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Query = {
  id: string;
  name: string;
  email: string;
  department: string;
  message: string;
  answer: string | null;
  answered: boolean;
  created_at: number;
};

export default function AdminQueries() {
  const router = useRouter();

  const [queries, setQueries] = useState<Query[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("adminLoggedIn");

    if (loggedIn !== "true") {
      router.push("/admin");
      return;
    }

    loadQueries();
  }, [router]);

  async function loadQueries() {
    try {
      const response = await fetch("/api/admin/queries");
      const data = await response.json();

      if (data.success) {
        setQueries(data.queries);

        const existingAnswers: Record<string, string> = {};

        data.queries.forEach((query: Query) => {
          existingAnswers[query.id] = query.answer || "";
        });

        setAnswers(existingAnswers);
      } else {
        setMessage(data.message || "Failed to load queries.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to load student queries.");
    } finally {
      setLoading(false);
    }
  }

  function handleAnswerChange(id: string, value: string) {
    setAnswers((previous) => ({
      ...previous,
      [id]: value,
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
    queryId: string
  ) {
    event.preventDefault();

    const answer = answers[queryId]?.trim();

    if (!answer) {
      setMessage("Please enter an answer.");
      return;
    }

    setSaving(queryId);
    setMessage("");

    try {
      const response = await fetch("/api/admin/queries", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: queryId,
          answer: answer,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Answer saved successfully.");
        await loadQueries();
      } else {
        setMessage(data.message || "Failed to save answer.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while saving the answer.");
    } finally {
      setSaving(null);
    }
  }

  function formatDate(timestamp: number) {
    if (!timestamp) {
      return "Unknown";
    }

    return new Date(timestamp).toLocaleString();
  }

  function logout() {
    sessionStorage.removeItem("adminLoggedIn");
    router.push("/admin");
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-4xl font-bold">
          Student Queries
        </h1>

        <p className="mt-4 text-slate-600">
          Loading student queries...
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">

      {/* Header */}

      <section className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Student Queries
          </h1>

          <p className="mt-3 text-slate-600">
            View student queries and provide administrative answers.
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
        >
          Logout
        </button>
      </section>

      {/* Back to dashboard */}

      <button
        onClick={() => router.push("/admin/dashboard")}
        className="mb-8 rounded-lg border bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-50"
      >
        Back to Dashboard
      </button>

      {/* Message */}

      {message && (
        <div className="mb-8 rounded-lg bg-slate-100 p-4">
          <p className="font-medium text-slate-700">
            {message}
          </p>
        </div>
      )}

      {/* No queries */}

      {queries.length === 0 ? (
        <section className="rounded-xl border bg-slate-50 p-8 text-center">
          <h2 className="text-xl font-semibold">
            No student queries
          </h2>

          <p className="mt-2 text-slate-600">
            There are currently no queries submitted by students.
          </p>
        </section>
      ) : (
        <section className="space-y-6">

          {queries.map((query) => (
            <article
              key={query.id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >

              {/* Query header */}

              <div className="flex flex-col justify-between gap-4 border-b pb-5 md:flex-row">

                <div>
                  <p className="text-sm text-slate-500">
                    Query ID
                  </p>

                  <p className="font-semibold">
                    {query.id}
                  </p>
                </div>

                <div>
                  {query.answered ? (
                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                      Answered
                    </span>
                  ) : (
                    <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-700">
                      Pending
                    </span>
                  )}
                </div>

              </div>

              {/* Student information */}

              <div className="mt-5 grid gap-4 md:grid-cols-2">

                <div>
                  <p className="text-sm text-slate-500">
                    Student Name
                  </p>

                  <p className="font-semibold">
                    {query.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Email
                  </p>

                  <p className="font-semibold">
                    {query.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Department
                  </p>

                  <p className="font-semibold">
                    {query.department}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Submitted
                  </p>

                  <p className="font-semibold">
                    {formatDate(query.created_at)}
                  </p>
                </div>

              </div>

              {/* Student Query */}

              <div className="mt-6 rounded-lg bg-slate-50 p-5">

                <p className="font-semibold text-slate-700">
                  Student Query
                </p>

                <p className="mt-2 leading-7 text-slate-700">
                  {query.message}
                </p>

              </div>

              {/* Answer */}

              <form
                onSubmit={(event) =>
                  handleSubmit(event, query.id)
                }
                className="mt-6"
              >

                <label
                  htmlFor={`answer-${query.id}`}
                  className="mb-2 block font-semibold"
                >
                  Admin Answer
                </label>

                <textarea
                  id={`answer-${query.id}`}
                  value={answers[query.id] || ""}
                  onChange={(event) =>
                    handleAnswerChange(
                      query.id,
                      event.target.value
                    )
                  }
                  rows={5}
                  placeholder="Enter your answer to the student..."
                  className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
                  required
                />

                <button
                  type="submit"
                  disabled={saving === query.id}
                  className="mt-4 rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
                >
                  {saving === query.id
                    ? "Saving..."
                    : query.answered
                    ? "Update Answer"
                    : "Submit Answer"}
                </button>

              </form>

              {/* Existing answer */}

              {query.answered && query.answer && (
                <div className="mt-6 rounded-lg bg-green-50 p-5">

                  <p className="font-bold text-green-800">
                    Current Answer
                  </p>

                  <p className="mt-2 leading-7 text-green-900">
                    {query.answer}
                  </p>

                </div>
              )}

            </article>
          ))}

        </section>
      )}

    </main>
  );
}