"use client";

import Link from "next/link";
import { shopConfig } from "@/lib/config";
import { useState, useEffect } from "react";

const CORAL = shopConfig.colors.primary;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/",         label: "Главная" },
    { href: "/catalog",  label: "Каталог" },
    { href: "/order",    label: "Заказать" },
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm py-3"
          : "bg-white/80 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">

        {/* Логотип с мультяшной обводкой */}
        <Link href="/" className="relative inline-flex items-center select-none">
          {/* Blob-обводка «растёкшийся крем» */}
          <span
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              inset: "-6px -10px",
              background: "rgba(255, 182, 172, 0.45)",
              borderRadius: "62% 38% 55% 45% / 48% 52% 38% 62%",
              transform: "rotate(-2deg)",
              filter: "blur(1px)",
            }}
          />
          {/* Второй слой — чуть больше, ещё мягче */}
          <span
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              inset: "-3px -7px",
              background: "rgba(255, 200, 192, 0.3)",
              borderRadius: "45% 55% 62% 38% / 55% 38% 62% 45%",
              transform: "rotate(1deg)",
            }}
          />
          <span
            className="relative font-extrabold text-xl tracking-tight"
            style={{ color: "#3d2c1e", letterSpacing: "-0.02em" }}
          >
            {shopConfig.name}
          </span>
        </Link>

        {/* Бургер (мобильный) */}
        <button
          className="md:hidden transition-colors"
          style={{ color: "#3d2c1e" }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Десктоп-навигация */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full transition-all duration-200 font-semibold hover:bg-rose-50"
              style={{ color: CORAL }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Мобильное меню */}
      {menuOpen && (
        <nav className="md:hidden bg-white/97 backdrop-blur-xl mt-2 mx-4 rounded-2xl p-3 flex flex-col gap-1 text-sm font-semibold shadow-lg border border-rose-100">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-4 rounded-xl hover:bg-rose-50 transition-colors"
              style={{ color: CORAL }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
