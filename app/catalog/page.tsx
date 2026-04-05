"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { shopConfig, CORAL } from "@/lib/config";
import AnimatedSection from "@/components/AnimatedSection";
import BackButton from "@/components/BackButton";

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered =
    activeCategory === "Все"
      ? shopConfig.catalog
      : shopConfig.catalog.filter((c) => c.category === activeCategory);

  return (
    <div className="bg-white min-h-screen">

      {/* ── Шапка ─────────────────────────────────────────────────── */}
      <section className="relative h-[55vh] md:h-[65vh] overflow-hidden flex items-end pb-14 justify-center">
        <Image src={shopConfig.images.catalogHeader} alt="Каталог" fill className="object-cover" priority />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 100%)" }}
        />
        <div className="relative z-10 text-center text-white px-4 w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-white/50" />
              <p className="text-xs uppercase tracking-[0.35em] text-white/70 font-medium">Премиум выпечка</p>
              <span className="w-8 h-px bg-white/50" />
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">Каталог тортов</h1>
            <div className="mt-5 w-12 h-[2px] mx-auto rounded-full" style={{ backgroundColor: CORAL }} />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pt-10 pb-20">
        <BackButton href="/" label="На главную" />

        {/* ── Фильтры ─────────────────────────────────────────────── */}
        <AnimatedSection>
          <div className="flex flex-wrap gap-2.5 justify-center mb-14">
            {shopConfig.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={
                  activeCategory === cat
                    ? {
                        background: `linear-gradient(135deg, #ff6b5a, ${CORAL})`,
                        color: "#fff",
                        boxShadow: `0 6px 20px ${CORAL}40`,
                      }
                    : {
                        background: "transparent",
                        color: "#78716c",
                        border: "1.5px solid #e7e5e4",
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* ── Сетка ───────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filtered.map((cake, i) => (
              <motion.div
                key={cake.id}
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                {/* Фото */}
                <div className="relative h-80 rounded-3xl overflow-hidden mb-5">
                  <Image
                    src={cake.image} alt={cake.name} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Бейдж категории */}
                  <span
                    className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold text-white backdrop-blur-md"
                    style={{ background: "rgba(0,0,0,0.3)" }}
                  >
                    {cake.category}
                  </span>

                  {/* Вес */}
                  <span className="absolute top-4 right-4 text-xs text-white/70">{cake.weight}</span>

                  {/* CTA при hover */}
                  <div className="absolute bottom-5 left-5 right-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350">
                    <Link
                      href={`/order?cake=${encodeURIComponent(cake.name)}`}
                      className="block text-center py-3 rounded-2xl text-sm font-bold text-white"
                      style={{ background: `linear-gradient(135deg, #ff6b5a, ${CORAL})` }}
                    >
                      Заказать этот торт →
                    </Link>
                  </div>
                </div>

                {/* Инфо */}
                <div className="px-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-stone-800 text-base">{cake.name}</h3>
                    <span className="font-extrabold text-lg shrink-0" style={{ color: CORAL }}>
                      {cake.price.toLocaleString()} ₽
                    </span>
                  </div>
                  <p className="text-stone-400 text-xs mt-1.5 leading-relaxed line-clamp-2">{cake.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Пусто */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-stone-300 text-sm">Нет тортов в этой категории</div>
        )}
      </div>
    </div>
  );
}
