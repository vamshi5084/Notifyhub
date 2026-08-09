"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Building2,
  ExternalLink,
  Search,
  Sparkles,
} from "lucide-react";

type EventItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  date: string;
  time: string;
  venue: string;
  registration_link?: string;
};

export default function Events() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch("/api/admin/events");
        const data = await response.json();
        if (data.success && Array.isArray(data.events)) {
          setEvents(data.events);
        } else {
          useFallbackEvents();
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        useFallbackEvents();
      } finally {
        setLoading(false);
      }
    }

    function useFallbackEvents() {
      setEvents([
        {
          id: "EVT001",
          title: "HackCampus 2026: 24-Hour Innovation Hackathon",
          description: "Build groundbreaking software and hardware prototypes, compete with top teams across all engineering streams, and win prizes worth ₹50,000.",
          category: "Technical",
          department: "Computer Science Dept",
          date: "2026-08-20",
          time: "09:00 AM - 05:00 PM",
          venue: "Main Campus Auditorium & Labs",
          registration_link: "https://example.com/register-hackathon",
        },
        {
          id: "EVT002",
          title: "Annual Campus Cultural Fest & Music Night",
          description: "Experience a vibrant day of dance, music concerts, drama performances, food stalls, and live DJ night on the central lawn.",
          category: "Cultural",
          department: "Student Cultural Committee",
          date: "2026-08-28",
          time: "04:00 PM Onwards",
          venue: "Open Air Amphitheatre",
          registration_link: "https://example.com/register-fest",
        },
        {
          id: "EVT003",
          title: "Pre-Placement Soft Skills & Resume Building Bootcamp",
          description: "Interactive session by industry HR leads covering resume reviews, group discussions, technical interview strategies, and mock aptitude tests.",
          category: "Placement",
          department: "Training & Placement Cell",
          date: "2026-09-02",
          time: "10:00 AM - 01:00 PM",
          venue: "Seminar Hall B, Admin Block",
          registration_link: "",
        },
        {
          id: "EVT004",
          title: "Inter-College Championship Tournament 2026",
          description: "Annual sports tournament featuring Cricket, Football, Basketball, Badminton, and Table Tennis competitions.",
          category: "Sports",
          department: "Physical Education Dept",
          date: "2026-09-10",
          time: "08:30 AM Onwards",
          venue: "Sports Complex & Grounds",
          registration_link: "https://example.com/sports-register",
        },
      ]);
    }

    loadEvents();
  }, []);

  const categories = ["All", "Technical", "Cultural", "Placement", "Sports", "Workshop"];

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All"
        ? true
        : evt.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-8 rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Calendar className="h-4 w-4" /> Campus Activities & Events
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Upcoming Events & Fests
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
            Discover technical hackathons, cultural festivals, sports tournaments, placement workshops, and student club activities.
          </p>

          {/* Search & Category Filter */}
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events by title, venue, or department..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-3 pl-12 pr-4 text-sm text-white placeholder-slate-400 outline-none backdrop-blur-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results Metadata */}
        <div className="mb-6 flex items-center justify-between px-1 text-xs font-semibold text-slate-500">
          <span>
            Showing {filteredEvents.length} of {events.length} campus events
          </span>
          {selectedCategory !== "All" && (
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-indigo-600 hover:underline"
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Event Cards Grid */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
              ></div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <Calendar className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No matching events scheduled
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try searching with another keyword or pick a different event category.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredEvents.map((evt) => (
              <article
                key={evt.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover-lift transition"
              >
                <div>
                  {/* Category & Calendar Block */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {evt.category || "Event"}
                    </span>

                    <div className="flex flex-col items-center rounded-xl bg-indigo-600 px-3 py-1.5 text-white shadow-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {evt.date ? new Date(evt.date).toLocaleString('default', { month: 'short' }) : 'DATE'}
                      </span>
                      <span className="text-lg font-extrabold leading-none">
                        {evt.date ? new Date(evt.date).getDate() : '📅'}
                      </span>
                    </div>
                  </div>

                  {/* Event Title */}
                  <h2 className="mt-4 text-xl font-bold leading-snug text-slate-900 group-hover:text-indigo-600 transition">
                    {evt.title}
                  </h2>

                  {/* Event Description */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {evt.description}
                  </p>
                </div>

                {/* Event Info Details */}
                <div className="mt-6 border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Building2 className="h-4 w-4 text-indigo-500" />
                      <span>{evt.department || "Organizing Department"}</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Clock className="h-4 w-4 text-emerald-500" />
                      <span>{evt.time || "Schedule TBD"}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-medium text-slate-700 pt-1">
                    <MapPin className="h-4 w-4 text-rose-500 shrink-0" />
                    <span>Venue: {evt.venue || "Campus Venue"}</span>
                  </div>

                  {/* Registration CTA */}
                  {evt.registration_link && (
                    <div className="pt-3">
                      <a
                        href={evt.registration_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-600 hover:shadow-indigo-500/25"
                      >
                        Register for Event <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}