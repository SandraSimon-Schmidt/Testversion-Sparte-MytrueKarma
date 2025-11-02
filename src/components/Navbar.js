// src/components/Navbar.js
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-5xl mx-auto flex justify-center items-center h-16">
        <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-800">
          EduGames(DE)
        </Link>
      </div>
    </nav>
  );
}
