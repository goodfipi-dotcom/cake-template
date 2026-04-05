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
      {/* Шапка каталога */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center">
        <Image src={shopConfig.images.catalogHeader} alt="Каталог" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4 font-light">
              Премиум выпечка
            </p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">Каталог тортов</h1>
            <div className="mt-6 w-16 h-[2px] mx-auto" style={{ backgroundColor: CORAL }} />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <BackButton href="/" label="На главную" />

        {/* Фильтры */}
        <AnimatedSection>
          <div className="flex flex-wrap gap-3 justify-center mb-16">
            {shopConfig.categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-7 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                style={
                  activeCategory === cat
                    ? { backgroundColor: CORAL, color: "#fff", boxShadow: `0 10px 15px -3px ${CORAL}40` }
                    : { backgroundColor: "transparent", color: "#78716c", border: "1px solid #e7e5e4" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Сетка тортов */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filtered.map((cake, i) => (
              <motion.div
                key={cake.id}
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group"
              >
                <div className="relative h-80 rounded-2xl overflow-hidden mb-5">
                  <Image
                    src={cake.image} alt={cake.name} fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                    <Link
                      href={`/order?cake=${encodeURIComponent(cake.name)}`}
                      className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 text-white px-8 py-3 rounded-full text-sm font-semibold tracking-wide shadow-xl"
                      style={{ backgroundColor: CORAL }}
                    >
                      Заказать
                    </Link>
                  </div>
                </div>
                <div className="px-1">
                  <h3 className="font-semibold text-stone-800 text-lg">{cake.name}</h3>
                  <p className="text-2xl font-bold mt-1" style={{ color: CORAL }}>
                    {cake.price.toLocaleString()} &#8381;
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
