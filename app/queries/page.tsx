"use client";

import { FormEvent, useState } from "react";

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

export default function Queries() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/queries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Query submitted successfully!");
        setEmail(String(data.email));

        form.reset();

        if (data.email) {
          await loadQueries(String(data.email));
        }
      } else {
        setMessage(result.message || "Failed to submit query.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    }
  }

  async function loadQueries(emailToLoad?: string) {
    const currentEmail = emailToLoad || email;

    if (!currentEmail.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/my-queries?email=${encodeURIComponent(currentEmail)}`
      );

      const data = await response.json();

      if (data.success) {
        setQueries(data.queries);
      } else {
        setMessage(data.message || "No queries found.");
        setQueries([]);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to load your queries.");
      setQueries([]);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(timestamp: number) {
    if (!timestamp) {
      return "Unknown";
    }

    return new Date(timestamp).toLocaleString();
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      {/* Header */}
      <section className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Campus Support
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Submit a Query
        </h1>

        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Have a question or concern? Submit your query to the
          campus administration and check the response here.
        </p>
      </section>

      {/* Query Form */}
      <section className="mb-14 rounded-2xl border bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold">
          Contact Administration
        </h2>

        <p className="mt-2 text-slate-600">
          Fill in the details below to submit your query.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-5"
        >
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block font-semibold"
            >
              Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-semibold"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
            />
          </div>

          {/* Subject */}
          <div>
            <label
              htmlFor="subject"
              className="mb-2 block font-semibold"
            >
              Subject
            </label>

            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter query subject"
              required
              className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
            />
          </div>

          {/* Query */}
          <div>
            <label
              htmlFor="message"
              className="mb-2 block font-semibold"
            >
              Query
            </label>

            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Enter your query"
              required
              className="w-full resize-none rounded-lg border px-4 py-3 outline-none focus:ring-2"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
          >
            Submit Query
          </button>
        </form>

        {message && (
          <div className="mt-5 rounded-lg bg-slate-100 p-4">
            <p className="font-medium text-slate-700">
              {message}
            </p>
          </div>
        )}
      </section>

      {/* My Queries */}
      <section>
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Query History
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            My Queries
          </h2>

          <p className="mt-2 text-slate-600">
            Enter your email to view your submitted queries and
            admin responses.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="flex-1 rounded-lg border px-4 py-3 outline-none focus:ring-2"
          />

          <button
            type="button"
            onClick={() => loadQueries()}
            disabled={loading}
            className="rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "View My Queries"}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-xl border bg-slate-50 p-6 text-center">
            <p className="text-slate-600">
              Loading your queries...
            </p>
          </div>
        )}

        {/* No queries */}
        {!loading && queries.length === 0 && (
          <div className="rounded-xl border bg-slate-50 p-8 text-center">
            <h3 className="text-xl font-semibold">
              No queries found
            </h3>

            <p className="mt-2 text-slate-600">
              Enter your email and click "View My Queries" to
              check your query history.
            </p>
          </div>
        )}

        {/* Query Cards */}
        {!loading && queries.length > 0 && (
          <div className="space-y-6">
            {queries.map((query) => (
              <article
                key={query.id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                {/* Query Header */}
                <div className="flex flex-col justify-between gap-3 border-b pb-4 sm:flex-row">
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
                      <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-bold text-green-700">
                        Answered
                      </span>
                    ) : (
                      <span className="inline-block rounded-full bg-yellow-100 px-4 py-1.5 text-sm font-bold text-yellow-700">
                        Pending
                      </span>
                    )}
                  </div>
                </div>

                {/* Department */}
                <p className="mt-5 text-sm text-slate-500">
                  Department
                </p>

                <h3 className="mt-1 text-xl font-bold">
                  {query.department}
                </h3>

                {/* Query */}
                <div className="mt-5">
                  <p className="text-sm font-semibold text-slate-500">
                    Your Query
                  </p>

                  <p className="mt-2 leading-7 text-slate-700">
                    {query.message}
                  </p>
                </div>

                {/* Submitted */}
                <p className="mt-5 text-sm text-slate-500">
                  Submitted: {formatDate(query.created_at)}
                </p>

                {/* Admin Answer */}
                {query.answered && query.answer ? (
                  <div className="mt-6 rounded-lg bg-green-50 p-5">
                    <p className="font-bold text-green-800">
                      Admin Answer
                    </p>

                    <p className="mt-2 leading-7 text-green-900">
                      {query.answer}
                    </p>
                  </div>
                ) : (
                  <div className="mt-6 rounded-lg bg-yellow-50 p-5">
                    <p className="font-semibold text-yellow-800">
                      Waiting for admin response
                    </p>

                    <p className="mt-1 text-sm text-yellow-700">
                      Your query has been received and is waiting
                      for a response from the administration.
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}