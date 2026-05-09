"use client";

import { useState } from "react";
import Link from "next/link";

interface AdminSidebarProps {
  children?: React.ReactNode;
}

export default function AdminSidebar({ children }: AdminSidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-rose-50">
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between bg-rose-100 text-rose-900 p-4 z-50 shadow-sm">
        <span className="font-bold">Admin Panel</span>
        <button onClick={() => setOpen(!open)}>☰</button>
      </div>

      {/* Overlay mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-64 min-h-screen bg-rose-100 border-r border-rose-200
          md:block
          ${open ? "block fixed top-0 left-0 z-50" : "hidden"}
        `}
      >
        <div className="p-5 text-xl font-bold text-rose-900 border-b border-rose-200">
          Admin Panel
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/admin/home"
            className="block p-3 rounded-lg text-rose-800 hover:bg-rose-200 transition"
          >
            Home
          </Link>

          <Link
            href="/admin/product"
            className="block p-3 rounded-lg text-rose-800 hover:bg-rose-200 transition"
          >
            Product
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 pt-20 md:pt-6">
        {children}
      </main>
    </div>
  );
}