"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { shopConfig, CORAL, DARK } from "@/lib/config";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";

// ── Декоративные плавающие элементы (только CSS, GPU-анимации) ───
function FloatingDeco() {
  const particles = [
    { size: 7,  top: "18%", left: "7%",   delay: "0s",   dur: "7s",  color: CORAL },
    { size: 4,  top: "55%", left: "4%",   delay: "1.8s", dur: "9s",  color: "#d4a853" },
    { size: 5,  top: "78%", left: "18%",  delay: "3.2s", dur: "6s",  color: CORAL },
    { size: 3,  top: "25%", right: "6%",  delay: "2.1s", dur: "8s",  color: "#d4a853" },
    { size: 6,  top: "62%", right: "10%", delay: "0.7s", dur: "7s",  color: CORAL },
    { size: 4,  top: "12%", right: "22%", delay: "4.0s", dur: "10s", color: "#d4a853" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Большие цветовые блобы */}
      <div
        className="absolute -top-40 -right-32 w-[520px] h-[520px] rounded-full animate-float-slow"
        style={{ background: `radial-gradient(circle, ${CORAL}55 0%, transparent 70%)`, filter: "blur(70px)" }}
      />
      <div
        className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full animate-float-delay"
        style={{ background: "radial-gradient(circle, rgba(255,214,208,0.5) 0%, transparent 70%)", filter: "blur(55px)" }}
      />
      <div
        className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full animate-drift"
        style={{ background: "radial-gradient(circle, rgba(212,168,83,0.18) 0%, transparent 70%)", filter: "blur(40px)" }}
      />

      {/* Тонкие кольца */}
      <div
        className="absolute top-24 right-36 w-28 h-28 rounded-full animate-float"
        style={{ border: `1.5px solid ${CORAL}45` }}
      />
      <div
        className="absolute bottom-40 left-28 w-52 h-52 rounded-full animate-float-delay"
        style={{ border: "1px solid rgba(212,168,83,0.22)" }}
      />
      <div
        className="absolute top-1/2 right-20 w-14 h-14 rounded-full animate-float-slow"
        style={{ border: `2px solid ${CORAL}35` }}
      />

      {/* Сахарные частицы */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-60"
          style={{
            width: p.size,
            height: p.size,
            top: p.top,
            left: "left" in p ? (p as { left: string }).left : undefined,
            right: "right" in p ? (p as { right: string }).right : undefined,
            background: p.color,
            animation: `float ${p.dur} ${p.delay} ease-in-out infinite`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

// ── Бегущая строка ───────────────────────────────────────────────
function Marquee() {
  const items = ["Торты ручной работы", "Авторские рецептуры", "Натуральные ингредиенты", "Доставка по Москве", "Индивидуальный заказ", "Каждый торт уникален"];
  const text = items.map((t) => `✦ ${t}`).join("   ") + "   ";

  return (
    <div className="py-4 overflow-hidden grain" style={{ background: DARK }}>
      <div className="flex whitespace-nowrap marquee-track select-none">
        {[text, text].map((t, i) => (
          <span key={i} className="text-sm font-medium tracking-widest uppercase pr-4" style={{ color: "#faf6f4", opacity: 0.85 }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [calcStep, setCalcStep] = useState(0);
  const [occasion, setOccasion] = useState("");
  const [size, setSize] = useState("");
  const [flavor, setFlavor] = useState("");

  const heroRef = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const calcOptions = [
    { title: "Повод",  items: shopConfig.calculator.occasions, value: occasion, set: setOccasion },
    { title: "Размер", items: shopConfig.calculator.sizes,     value: size,     set: setSize },
    { title: "Вкус",   items: shopConfig.calculator.flavors,   value: flavor,   set: setFlavor },
  ];
  const currentCalc = calcOptions[calcStep];

  return (
    <div className="overflow-hidden">

      {/* ══════════════════════════════ HERO ══════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden grain"
        style={{
          background: `
            radial-gradient(ellipse 90% 80% at 5% 5%,  rgba(255,214,208,0.45) 0%, transparent 55%),
            radial-gradient(ellipse 60% 60% at 95% 90%, ${CORAL}28         0%, transparent 55%),
            radial-gradient(ellipse 80% 80% at 50% 50%, #fffbf5             0%, #fff 100%)
          `,
        }}
      >
        <FloatingDeco />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-28 md:py-0">

          {/* Левая колонка */}
          <motion.div style={{ opacity: heroOpacity }} className="flex flex-col gap-7">
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 self-start"
            >
              <span className="w-5 h-[1.5px] rounded-full" style={{ background: CORAL }} />
              <span className="text-xs uppercase tracking-[0.35em] font-semibold" style={{ color: CORAL }}>
                {shopConfig.hero.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-7xl lg:text-[88px] font-extrabold leading-[0.88] tracking-tighter text-gradient-coral"
            >
              {shopConfig.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="text-lg md:text-xl max-w-sm leading-relaxed"
              style={{ color: "#78716c" }}
            >
              {shopConfig.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="flex flex-wrap gap-3 pt-1"
            >
              <Link
                href="/catalog"
                className="group px-8 py-4 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                style={{ background: `linear-gradient(135deg, #ff6b5a, ${CORAL})`, boxShadow: `0 8px 32px ${CORAL}50` }}
              >
                {shopConfig.hero.ctaCatalog}
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link
                href="/order"
                className="px-8 py-4 rounded-full text-sm font-bold border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ borderColor: CORAL, color: CORAL, background: `${CORAL}0d` }}
              >
                {shopConfig.hero.ctaOrder}
              </Link>
            </motion.div>

            {/* Быстрые цифры */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="flex gap-8 pt-4 border-t border-stone-100"
            >
              {shopConfig.about.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-extrabold" style={{ color: DARK }}>{s.number}</div>
                  <div className="text-xs text-stone-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Правая колонка — изображение */}
          <motion.div style={{ y: heroY }} className="relative flex items-center justify-center">
            {/* Декоративный фон за фото */}
            <div
              className="absolute inset-8 rounded-[2.5rem] rotate-3"
              style={{ background: `linear-gradient(135deg, ${CORAL}20, rgba(212,168,83,0.12))`, filter: "blur(2px)" }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 4 }}
              transition={{ duration: 1.1, delay: 0.2, type: "spring", stiffness: 70 }}
              className="relative w-[300px] h-[300px] md:w-[460px] md:h-[460px] lg:w-[520px] lg:h-[520px]"
              style={{ filter: "drop-shadow(0 40px 70px rgba(0,0,0,0.2))" }}
            >
              <Image
                src={shopConfig.images.hero} alt="Торт" fill
                className="object-cover rounded-[2rem]" priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] uppercase tracking-widest" style={{ color: DARK }}>scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <svg className="w-4 h-4" fill="none" stroke={DARK} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════ MARQUEE ═══════════════════════════ */}
      <Marquee />

      {/* ══════════════════════════════ CALCULATOR ════════════════════════ */}
      <section className="py-24 px-4 grain" style={{ background: "#faf6f4" }}>
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="mb-14">
              <SectionHeader badge="Калькулятор" title="Узнайте стоимость" subtitle="Выберите параметры — получите примерную цену" />
            </div>
          </AnimatedSection>

          {/* Шаги */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {calcOptions.map((opt, i) => (
              <div key={opt.title} className="flex items-center gap-2">
                <button
                  onClick={() => setCalcStep(i)}
                  className="w-10 h-10 rounded-full text-sm font-bold transition-all"
                  style={{ background: i <= calcStep ? CORAL : "#e8e0dc", color: i <= calcStep ? "#fff" : "#999" }}
                >
                  {i + 1}
                </button>
                {i < calcOptions.length - 1 && (
                  <div className="w-12 h-0.5 rounded-full" style={{ background: i < calcStep ? CORAL : "#e8e0dc" }} />
                )}
              </div>
            ))}
          </div>

          <motion.div
            key={calcStep}
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h3 className="text-xl font-semibold mb-6" style={{ color: DARK }}>{currentCalc.title}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {currentCalc.items.map((item) => (
                <button
                  key={item}
                  onClick={() => { currentCalc.set(item); if (calcStep < 2) setCalcStep(calcStep + 1); }}
                  className="px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: currentCalc.value === item ? CORAL : "#fff",
                    color:      currentCalc.value === item ? "#fff" : DARK,
                    border:     `2px solid ${currentCalc.value === item ? CORAL : "#e8e0dc"}`,
                    boxShadow:  currentCalc.value === item ? `0 4px 16px ${CORAL}40` : "none",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>

          {occasion && size && flavor && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-10 text-center">
              <p className="text-stone-400 text-sm mb-5">{occasion} · {size} · {flavor}</p>
              <Link
                href={`/order?occasion=${encodeURIComponent(occasion)}&size=${encodeURIComponent(size)}&flavor=${encodeURIComponent(flavor)}`}
                className="inline-block px-10 py-4 rounded-full text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-xl"
                style={{ background: `linear-gradient(135deg, #ff6b5a, ${CORAL})`, boxShadow: `0 8px 32px ${CORAL}40` }}
              >
                Узнать стоимость →
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════ CATALOG ═══════════════════════════ */}
      <section className="py-28 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <SectionHeader badge="Каталог" title="Популярные торты" align="left" />
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:gap-3"
                style={{ color: CORAL }}
              >
                Весь каталог <span>→</span>
              </Link>
            </div>
          </AnimatedSection>

          <div ref={sliderRef} className="overflow-hidden cursor-grab active:cursor-grabbing -mx-2">
            <motion.div drag="x" dragConstraints={sliderRef} className="flex gap-5 px-2" style={{ width: "max-content" }}>
              {shopConfig.catalog.map((cake, i) => (
                <motion.div
                  key={cake.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="flex-shrink-0 w-[260px] md:w-[300px] group"
                >
                  <Link href={`/order?cake=${encodeURIComponent(cake.name)}`}>
                    {/* Фото */}
                    <div className="relative h-[340px] md:h-[380px] rounded-3xl overflow-hidden mb-4">
                      <Image
                        src={cake.image} alt={cake.name} fill
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                      {/* Категория — бейдж */}
                      <div
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold text-white backdrop-blur-sm"
                        style={{ background: "rgba(0,0,0,0.35)" }}
                      >
                        {cake.category}
                      </div>

                      {/* Кнопка заказа появляется при hover */}
                      <div className="absolute bottom-5 left-5 right-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                        <div
                          className="w-full text-center py-2.5 rounded-2xl text-sm font-bold text-white"
                          style={{ background: `linear-gradient(135deg, #ff6b5a, ${CORAL})` }}
                        >
                          Заказать этот торт
                        </div>
                      </div>
                    </div>

                    {/* Инфо под фото */}
                    <div className="px-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-stone-800 text-base leading-tight">{cake.name}</h3>
                        <span className="font-extrabold text-lg shrink-0" style={{ color: CORAL }}>
                          {cake.price.toLocaleString()} ₽
                        </span>
                      </div>
                      <p className="text-stone-400 text-xs mt-1 line-clamp-1">{cake.description}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ ABOUT ════════════════════════════ */}
      <section className="grain" style={{ background: "#faf6f4" }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[75vh]">
          {/* Фото */}
          <div className="relative h-80 md:h-auto overflow-hidden">
            <Image src={shopConfig.images.about} alt="О нас" fill className="object-cover" />
            {/* Декоративный оверлей */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 60%, rgba(250,246,244,0.3))" }} />
          </div>

          {/* Текст */}
          <div className="flex items-center px-8 md:px-16 lg:px-20 py-20">
            <AnimatedSection>
              <div className="max-w-md">
                <SectionHeader badge="О нас" title={shopConfig.about.title} align="left" titleSize="md" />

                <p className="text-stone-500 leading-relaxed mt-6 mb-10 text-[15px]">
                  {shopConfig.about.description}
                </p>

                {/* Статы */}
                <div className="grid grid-cols-3 gap-6 pb-10 border-b border-stone-200">
                  {shopConfig.about.stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-3xl font-extrabold text-gradient-coral">{s.number}</div>
                      <div className="text-xs text-stone-400 mt-1 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Режим работы */}
                <div className="pt-8 flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-sm text-stone-500">
                    <span style={{ color: CORAL }}>🕐</span>
                    <span className="font-medium text-stone-700">{shopConfig.workingHours}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-stone-500">
                    <span style={{ color: CORAL }}>📍</span>
                    <span>{shopConfig.city}, {shopConfig.address}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ HOW TO ORDER ══════════════════════ */}
      <section className="py-28 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="mb-20">
              <SectionHeader badge="Процесс" title="Как сделать заказ" subtitle="Просто и быстро — от идеи до торта" />
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {shopConfig.orderSteps.map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.12}>
                <div className="relative text-center group">
                  {/* Соединяющая линия */}
                  {i < shopConfig.orderSteps.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-[60%] w-full h-px" style={{ background: `linear-gradient(to right, ${CORAL}40, transparent)` }} />
                  )}
                  <div
                    className="w-12 h-12 text-white rounded-2xl flex items-center justify-center text-sm font-bold mx-auto mb-5 rotate-3 group-hover:rotate-0 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, #ff6b5a, ${CORAL})`, boxShadow: `0 6px 20px ${CORAL}35` }}
                  >
                    {item.step}
                  </div>
                  <h3 className="font-bold mb-2 text-sm" style={{ color: DARK }}>{item.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ CTA ═══════════════════════════════ */}
      <section className="relative py-36 px-4 overflow-hidden grain">
        <Image src={shopConfig.images.cta} alt="Торты" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(28,16,10,0.78) 0%, rgba(28,16,10,0.55) 100%)" }} />

        <AnimatedSection>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="text-xs uppercase tracking-[0.35em] mb-6 font-semibold" style={{ color: `${CORAL}cc` }}>
              Готовы сделать заказ?
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-white mb-6 tracking-tight">
              Закажите торт<br />
              <span className="text-gradient-coral">вашей мечты</span>
            </h2>
            <p className="text-white/60 mb-12 text-lg max-w-md mx-auto leading-relaxed">
              Оставьте заявку — обсудим детали и создадим именно ваш торт
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/order"
                className="px-10 py-4 rounded-full text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-2xl"
                style={{ background: `linear-gradient(135deg, #ff6b5a, ${CORAL})`, boxShadow: `0 8px 40px ${CORAL}50` }}
              >
                Оставить заявку →
              </Link>
              <a
                href={`https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Хочу заказать торт.")}`}
                target="_blank" rel="noopener noreferrer"
                className="px-10 py-4 rounded-full text-sm font-bold text-white border-2 transition-all hover:scale-105 hover:bg-white/10 backdrop-blur-sm"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
}
