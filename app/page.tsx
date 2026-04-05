"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { shopConfig } from "@/lib/config";
import AnimatedSection from "@/components/AnimatedSection";
import { useRef } from "react";

export default function Home() {
  const [calcStep, setCalcStep] = useState(0);
  const [occasion, setOccasion] = useState("");
  const [size, setSize] = useState("");
  const [flavor, setFlavor] = useState("");

  const { primary: CORAL, dark: DARK } = shopConfig.colors;

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const sliderRef = useRef<HTMLDivElement>(null);

  const calcOptions = [
    { title: "Повод",  items: shopConfig.calculator.occasions, value: occasion, set: setOccasion },
    { title: "Размер", items: shopConfig.calculator.sizes,     value: size,     set: setSize },
    { title: "Вкус",   items: shopConfig.calculator.flavors,   value: flavor,   set: setFlavor },
  ];

  const currentCalc = calcOptions[calcStep];

  return (
    <div className="overflow-hidden bg-white">
      {/* ===================== HERO ===================== */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fff9f7 0%, #fff 60%)" }}
      >
        {/* Decorative blob */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: CORAL }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-24 md:py-0">
          {/* Left — text */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="flex flex-col gap-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-sm uppercase tracking-[0.3em] font-medium"
              style={{ color: CORAL }}
            >
              {shopConfig.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.92] tracking-tight"
              style={{ color: DARK }}
            >
              {shopConfig.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl max-w-md leading-relaxed text-stone-500"
            >
              {shopConfig.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap gap-4 mt-2"
            >
              <Link
                href="/catalog"
                className="px-9 py-4 rounded-full text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-xl"
                style={{ background: CORAL }}
              >
                {shopConfig.hero.ctaCatalog}
              </Link>
              <Link
                href="/order"
                className="px-9 py-4 rounded-full text-base font-semibold border-2 transition-all hover:scale-105"
                style={{ borderColor: CORAL, color: CORAL }}
              >
                {shopConfig.hero.ctaOrder}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — hero cake image */}
          <motion.div
            style={{ y: heroY }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 80 }}
              className="relative w-[320px] h-[320px] md:w-[480px] md:h-[480px] lg:w-[540px] lg:h-[540px]"
              style={{
                filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.18))",
              }}
            >
              <Image
                src={shopConfig.images.hero}
                alt="Торт"
                fill
                className="object-cover rounded-[2rem]"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-stone-300">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </section>

      {/* ===================== CALCULATOR ===================== */}
      <section className="py-20 px-4" style={{ background: "#faf6f4" }}>
        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div
                className="text-xs uppercase tracking-[0.25em] mb-4 font-medium"
                style={{ color: CORAL }}
              >
                Калькулятор
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ color: DARK }}
              >
                Узнайте стоимость
              </h2>
              <p className="text-stone-400 mt-3">3 простых шага</p>
            </div>
          </AnimatedSection>

          {/* Steps indicator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {calcOptions.map((opt, i) => (
              <div key={opt.title} className="flex items-center gap-2">
                <button
                  onClick={() => setCalcStep(i)}
                  className="w-10 h-10 rounded-full text-sm font-bold transition-all flex items-center justify-center"
                  style={{
                    background: i <= calcStep ? CORAL : "#e8e0dc",
                    color: i <= calcStep ? "#fff" : "#999",
                  }}
                >
                  {i + 1}
                </button>
                {i < calcOptions.length - 1 && (
                  <div
                    className="w-12 h-0.5 rounded-full"
                    style={{ background: i < calcStep ? CORAL : "#e8e0dc" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Current step */}
          <motion.div
            key={calcStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="text-center"
          >
            <h3
              className="text-xl font-semibold mb-6"
              style={{ color: DARK }}
            >
              {currentCalc.title}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {currentCalc.items.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    currentCalc.set(item);
                    if (calcStep < 2) setCalcStep(calcStep + 1);
                  }}
                  className="px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: currentCalc.value === item ? CORAL : "#fff",
                    color: currentCalc.value === item ? "#fff" : DARK,
                    border: `2px solid ${currentCalc.value === item ? CORAL : "#e8e0dc"}`,
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Summary + CTA */}
          {occasion && size && flavor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 text-center"
            >
              <p className="text-stone-400 text-sm mb-4">
                {occasion} / {size} / {flavor}
              </p>
              <Link
                href={`/order?occasion=${encodeURIComponent(occasion)}&size=${encodeURIComponent(size)}&flavor=${encodeURIComponent(flavor)}`}
                className="inline-block px-10 py-4 rounded-full text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-xl"
                style={{ background: CORAL }}
              >
                Узнать стоимость
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* ===================== POPULAR CAKES — DRAG SLIDER ===================== */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div
                className="text-xs uppercase tracking-[0.25em] mb-4 font-medium"
                style={{ color: CORAL }}
              >
                Каталог
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ color: DARK }}
              >
                Популярные торты
              </h2>
            </div>
          </AnimatedSection>

          <div ref={sliderRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
            <motion.div
              drag="x"
              dragConstraints={sliderRef}
              className="flex gap-6"
              style={{ width: "max-content" }}
            >
              {shopConfig.catalog.map((cake) => (
                <motion.div
                  key={cake.id}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex-shrink-0 w-[280px] md:w-[320px] group"
                >
                  <Link href={`/order?cake=${encodeURIComponent(cake.name)}`}>
                    <div className="relative h-[360px] md:h-[420px] rounded-3xl overflow-hidden">
                      <Image
                        src={cake.image}
                        alt={cake.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <h3 className="text-lg font-bold">{cake.name}</h3>
                        <span className="text-base font-semibold" style={{ color: CORAL }}>
                          {cake.price.toLocaleString()} &#8381;
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <AnimatedSection delay={0.2}>
            <div className="text-center mt-12">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wider transition-colors group"
                style={{ color: DARK }}
              >
                Смотреть весь каталог
                <span className="group-hover:translate-x-2 transition-transform" style={{ color: CORAL }}>
                  &rarr;
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ===================== ABOUT ===================== */}
      <section className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
          {/* Photo */}
          <div className="relative h-80 md:h-auto">
            <Image
              src={shopConfig.images.about}
              alt="О нас"
              fill
              className="object-cover"
            />
          </div>
          {/* Text */}
          <div className="flex items-center px-8 md:px-16 py-16">
            <AnimatedSection>
              <div className="max-w-md">
                <div
                  className="text-xs uppercase tracking-[0.25em] mb-4 font-medium"
                  style={{ color: CORAL }}
                >
                  О нас
                </div>
                <h2
                  className="text-3xl md:text-4xl font-bold mb-6 leading-tight"
                  style={{ color: DARK }}
                >
                  {shopConfig.about.title}
                </h2>
                <p className="text-stone-500 leading-relaxed mb-8">
                  {shopConfig.about.description}
                </p>
                <div className="grid grid-cols-3 gap-6 mb-8">
                  {shopConfig.about.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-bold" style={{ color: CORAL }}>{stat.number}</div>
                      <div className="text-xs text-stone-400 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-stone-100">
                  <div className="text-xs uppercase tracking-[0.25em] mb-3 font-medium text-stone-400">
                    Режим работы
                  </div>
                  <p className="text-stone-600 font-medium">{shopConfig.workingHours}</p>
                  <p className="text-stone-400 text-sm mt-1">{shopConfig.city}, {shopConfig.address}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===================== HOW TO ORDER ===================== */}
      <section className="py-24 px-4" style={{ background: "#faf6f4" }}>
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div
                className="text-xs uppercase tracking-[0.25em] mb-4 font-medium"
                style={{ color: CORAL }}
              >
                Процесс
              </div>
              <h2
                className="text-3xl md:text-5xl font-bold"
                style={{ color: DARK }}
              >
                Как заказать
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {shopConfig.orderSteps.map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.1}>
                <div className="text-center">
                  <div
                    className="w-12 h-12 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-4"
                    style={{ background: CORAL }}
                  >
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-1" style={{ color: DARK }}>{item.title}</h3>
                  <p className="text-xs text-stone-400">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA ===================== */}
      <section className="relative py-32 px-4 overflow-hidden">
        <Image
          src={shopConfig.images.cta}
          alt="Торты"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />

        <AnimatedSection>
          <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Закажите торт<br />вашей мечты
            </h2>
            <p className="text-white/70 mb-10 text-lg">
              Оставьте заявку — мы свяжемся с вами и обсудим все детали
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/order"
                className="px-10 py-4 rounded-full text-base font-semibold text-white transition-all hover:scale-105 hover:shadow-2xl"
                style={{ background: CORAL }}
              >
                Оставить заявку
              </Link>
              <a
                href={`https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent("Здравствуйте! Хочу заказать торт.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white/40 text-white hover:bg-white/10 px-10 py-4 rounded-full text-base font-semibold transition-all hover:scale-105 backdrop-blur-sm"
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
