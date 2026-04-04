"use client";

import Link from "next/link";
import { shopConfig } from "@/lib/config";
import { useState, useEffect } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <Link
          href="/"
          className={`text-xl font-bold transition-colors duration-300 ${
            scrolled ? "text-stone-900" : "text-white"
          }`}
        >
          {shopConfig.name}
        </Link>

        <button
          className={`md:hidden transition-colors ${scrolled ? "text-stone-900" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav
          className={`hidden md:flex gap-8 text-sm font-medium transition-colors duration-300 ${
            scrolled ? "text-stone-500" : "text-white/80"
          }`}
        >
          <Link href="/" className="hover:text-amber-500 transition-colors">Главная</Link>
          <Link href="/catalog" className="hover:text-amber-500 transition-colors">Каталог</Link>
          <Link href="/order" className="hover:text-amber-500 transition-colors">Заказать</Link>
          <Link href="/contacts" className="hover:text-amber-500 transition-colors">Контакты</Link>
        </nav>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur-xl mt-2 mx-4 rounded-2xl p-4 flex flex-col gap-3 text-sm font-medium text-stone-600 shadow-lg">
          <Link href="/" onClick={() => setMenuOpen(false)} className="py-2 px-3 rounded-xl hover:bg-amber-50">Главная</Link>
          <Link href="/catalog" onClick={() => setMenuOpen(false)} className="py-2 px-3 rounded-xl hover:bg-amber-50">Каталог</Link>
          <Link href="/order" onClick={() => setMenuOpen(false)} className="py-2 px-3 rounded-xl hover:bg-amber-50">Заказать</Link>
          <Link href="/contacts" onClick={() => setMenuOpen(false)} className="py-2 px-3 rounded-xl hover:bg-amber-50">Контакты</Link>
        </nav>
      )}
    </header>
  );
}
