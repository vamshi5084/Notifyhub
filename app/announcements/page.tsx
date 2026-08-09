"use client";

import { useEffect, useState } from "react";
import {
  Megaphone,
  Search,
  Filter,
  Building2,
  Calendar,
  AlertTriangle,
  FileText,
  Sparkles,
} from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  description: string;
  category: string;
  department: string;
  date: string;
  urgent: boolean;
};

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/api/admin/announcements");
        const data = await response.json();
        if (data.success && Array.isArray(data.announcements)) {
          setAnnouncements(data.announcements);
        } else {
          useFallbackData();
        }
      } catch (err) {
        console.error("Error fetching announcements:", err);
        useFallbackData();
      } finally {
        setLoading(false);
      }
    }

    function useFallbackData() {
      setAnnouncements([
        {
          id: "ANN001",
          title: "End Semester Examination Timetable & Rules 2026",
          description: "All students are informed that end semester exams commence from 25th August 2026. Hall tickets will be issued at department offices starting Monday.",
          category: "Academic",
          department: "Controller of Examinations",
          date: "2026-08-08",
          urgent: true,
        },
        {
          id: "ANN002",
          title: "Campus Placement Registration: Tech Mahindra & TCS",
          description: "Eligible B.Tech (CSE, ECE, IT) 7th semester students are requested to register on the placement portal before 15th August.",
          category: "Placement",
          department: "Training & Placement Cell",
          date: "2026-08-07",
          urgent: false,
        },
        {
          id: "ANN003",
          title: "Central Library Extended Reading Room Hours",
          description: "In view of upcoming mid-term examinations, the main library reading hall will remain operational till 11:00 PM on all working days.",
          category: "General",
          department: "Library Administration",
          date: "2026-08-05",
          urgent: false,
        },
        {
          id: "ANN004",
          title: "Fee Payment Deadline Extension Notice",
          description: "The last date for semester tuition fee payment without late fine has been extended up to 20th August 2026.",
          category: "Finance",
          department: "Accounts Section",
          date: "2026-08-04",
          urgent: true,
        },
      ]);
    }

    loadData();
  }, []);

  const categories = ["All", "Academic", "Placement", "Exam", "Finance", "General", "Urgent"];

  const filteredAnnouncements = announcements.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All"
        ? true
        : selectedCategory === "Urgent"
        ? item.urgent
        : item.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="mb-8 rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-12">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <Megaphone className="h-4 w-4" /> Campus Updates Notice Board
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Campus Announcements
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
            Browse official university notices, academic alerts, exam updates, and placement drives released by department authorities.
          </p>

          {/* Search & Filter Bar */}
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search announcements by title, department, or keywords..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800/90 py-3 pl-12 pr-4 text-sm text-white placeholder-slate-400 outline-none backdrop-blur-md focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            {/* Category Pills */}
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
            Showing {filteredAnnouncements.length} of {announcements.length} notices
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

        {/* Content Section */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-48 animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
              ></div>
            ))}
          </div>
        ) : filteredAnnouncements.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FileText className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No matching announcements found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try adjusting your search terms or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredAnnouncements.map((item) => (
              <article
                key={item.id}
                className={`group flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-xs hover-lift transition ${
                  item.urgent ? "border-rose-300 ring-1 ring-rose-200/50" : "border-slate-200"
                }`}
              >
                <div>
                  {/* Category & Urgency Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {item.category || "General"}
                    </span>

                    {item.urgent && (
                      <span className="flex items-center gap-1 rounded-lg bg-rose-600 px-2.5 py-1 text-xs font-bold text-white shadow-xs">
                        <AlertTriangle className="h-3 w-3" /> URGENT
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="mt-4 text-xl font-bold leading-snug text-slate-900 group-hover:text-indigo-600 transition">
                    {item.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>

                {/* Footer details */}
                <div className="mt-6 border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-500">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-medium text-slate-700">
                      <Building2 className="h-4 w-4 text-indigo-500" />
                      <span>{item.department || "Campus Administration"}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}