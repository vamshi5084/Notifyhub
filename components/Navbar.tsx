import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold">
          NotifyHub
        </Link>

        <div className="flex gap-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>

          <Link href="/announcements" className="hover:underline">
            Announcements
          </Link>

          <Link href="/events" className="hover:underline">
            Events
          </Link>

          <Link href="/queries" className="hover:underline">
            Queries
          </Link>

          <Link href="/about" className="hover:underline">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}