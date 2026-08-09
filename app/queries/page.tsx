"use client";

import { FormEvent, useState } from "react";
import {
  HelpCircle,
  Send,
  Search,
  User,
  Mail,
  FileText,
  MessageSquare,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  Building2,
} from "lucide-react";

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
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

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
        setMessage("Your query has been submitted successfully! Check status below.");
        const userEmail = String(data.email);
        setEmail(userEmail);
        form.reset();

        if (userEmail) {
          await loadQueries(userEmail);
        }
      } else {
        setMessage(result.message || "Failed to submit query.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function loadQueries(emailToLoad?: string) {
    const currentEmail = emailToLoad || email;

    if (!currentEmail.trim()) {
      setMessage("Please enter your email to view query history.");
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
        setMessage(data.message || "No queries found for this email.");
        setQueries([]);
      }
    } catch (error) {
      console.error(error);
      setMessage("Failed to load your queries. Please check network connection.");
      setQueries([]);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(timestamp: number) {
    if (!timestamp) return "Unknown date";
    return new Date(timestamp).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-10 rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <HelpCircle className="h-4 w-4" /> Campus Support Portal
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Student & Staff Query Desk
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
            Have questions regarding academics, fees, hall tickets, or campus facilities? Submit your query to administration and track real-time responses.
          </p>
        </section>

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Left: Query Submission Form */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Contact Administration
                  </h2>
                  <p className="text-xs text-slate-500">
                    Fill in the form below to submit a direct ticket
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="student@college.edu"
                      required
                      className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Query Subject
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="e.g. Examination Hall Ticket Issue"
                      required
                      className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                {/* Query Message */}
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Detailed Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Describe your issue or query clearly..."
                    required
                    className="w-full rounded-xl border border-slate-200 p-3.5 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-600 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  {submitting ? "Submitting Query..." : "Submit Query Ticket"}
                </button>
              </form>

              {message && (
                <div className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-xs font-medium text-indigo-900">
                  {message}
                </div>
              )}
            </div>
          </div>

          {/* Right: Personal Query Status Lookup */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Track My Submitted Queries
                  </h2>
                  <p className="text-xs text-slate-500">
                    Enter your email address to check response status
                  </p>
                </div>
              </div>

              {/* Email Lookup Input */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address..."
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => loadQueries()}
                  disabled={loading}
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
                >
                  {loading ? "Searching..." : "View History"}
                </button>
              </div>

              {/* Queries List */}
              <div className="mt-6">
                {loading ? (
                  <div className="space-y-3">
                    {[1, 2].map((n) => (
                      <div
                        key={n}
                        className="h-32 animate-pulse rounded-2xl border border-slate-100 bg-slate-50"
                      ></div>
                    ))}
                  </div>
                ) : queries.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
                    <HelpCircle className="mx-auto h-8 w-8 text-slate-300" />
                    <h4 className="mt-2 text-sm font-bold text-slate-700">
                      No query record selected
                    </h4>
                    <p className="mt-1 text-xs text-slate-500">
                      Enter your email above and click "View History" to inspect admin answers.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                    {queries.map((q) => (
                      <div
                        key={q.id}
                        className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition hover:bg-white hover:shadow-xs"
                      >
                        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                          <span className="font-mono text-xs font-bold text-slate-500">
                            Ticket #{q.id}
                          </span>
                          {q.answered ? (
                            <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                              <CheckCircle2 className="h-3 w-3" /> Answered
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                              <Clock className="h-3 w-3 animate-spin" /> Pending Review
                            </span>
                          )}
                        </div>

                        <div className="mt-3">
                          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                            <Building2 className="h-3.5 w-3.5 text-indigo-500" />
                            <span>{q.department || "General Administration"}</span>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-slate-700">
                            "{q.message}"
                          </p>
                          <p className="mt-2 text-[11px] text-slate-400">
                            Submitted: {formatDate(q.created_at)}
                          </p>
                        </div>

                        {/* Admin Answer Box */}
                        {q.answered && q.answer ? (
                          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                              Official Admin Answer:
                            </span>
                            <p className="mt-1 text-xs leading-relaxed text-emerald-900 font-medium">
                              {q.answer}
                            </p>
                          </div>
                        ) : (
                          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-800">
                            Our administration team is currently reviewing your query. You will receive updates here once answered.
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}