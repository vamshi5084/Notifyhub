"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Store admin login status
        sessionStorage.setItem("adminLoggedIn", "true");

        // Go to dashboard
        router.push("/admin/dashboard");

        // Refresh the route
        router.refresh();
      } else {
        setMessage(result.message || "Invalid username or password");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            NotifyHub
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            Admin Login
          </h1>

          <p className="mt-3 text-slate-600">
            Login to manage campus announcements, events, and queries.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border bg-white p-8 shadow-sm">
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block font-semibold text-slate-900"
              >
                Username
              </label>

              <input
                type="text"
                id="username"
                value={username}
                onChange={(event) =>
                  setUsername(event.target.value)
                }
                placeholder="Enter admin username"
                required
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block font-semibold text-slate-900"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="Enter admin password"
                required
                className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2"
              />
            </div>

            {/* Error / Message */}
            {message && (
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm font-medium text-red-700">
                  {message}
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-sm font-medium text-slate-600 hover:underline"
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </main>
  );
}