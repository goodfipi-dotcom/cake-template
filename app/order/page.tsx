"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { shopConfig } from "@/lib/config";
import AnimatedSection from "@/components/AnimatedSection";

function OrderFormInner() {
  const searchParams = useSearchParams();
  const preselectedCake = searchParams.get("cake") || "";

  const [form, setForm] = useState({
    name: "",
    phone: "",
    cake: preselectedCake,
    date: "",
    comment: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("sent");
        const text = `Здравствуйте! Меня зовут ${form.name}. Хочу заказать: ${form.cake}. Дата: ${form.date}. ${form.comment}`;
        window.open(
          `https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent(text)}`,
          "_blank"
        );
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto px-4 py-20 text-center"
      >
        <div className="text-6xl mb-6 animate-float">🎉</div>
        <h2 className="text-3xl font-bold text-gradient mb-4">Заявка отправлена!</h2>
        <p className="text-stone-500 text-lg">
          Мы свяжемся с вами в ближайшее время.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-gradient text-center mb-2">Заказать торт</h1>
        <p className="text-stone-400 text-center mb-10 text-lg">
          Заполните форму — мы свяжемся для уточнения деталей
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">Ваше имя</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-5 py-3.5 rounded-2xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-white"
              placeholder="Анна"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">Телефон</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-5 py-3.5 rounded-2xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-white"
              placeholder="+7 999 123-45-67"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">Какой торт?</label>
            <select
              value={form.cake}
              onChange={(e) => setForm({ ...form, cake: e.target.value })}
              className="w-full px-5 py-3.5 rounded-2xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-white"
            >
              <option value="">Выберите или опишите ниже</option>
              {shopConfig.catalog.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name} — {c.price.toLocaleString()} &#8381;
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">Дата</label>
            <input
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-5 py-3.5 rounded-2xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">Пожелания</label>
            <textarea
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              rows={3}
              className="w-full px-5 py-3.5 rounded-2xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none bg-white"
              placeholder="Надпись на торте, количество гостей, аллергии..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-amber-400 text-white py-4 rounded-2xl text-lg font-semibold transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-700/20"
          >
            {status === "sending" ? "Отправляем..." : "Отправить заявку"}
          </button>

          {status === "error" && (
            <p className="text-red-500 text-sm text-center">
              Ошибка отправки. Попробуйте снова или напишите нам в WhatsApp.
            </p>
          )}
        </form>
      </AnimatedSection>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense>
      <OrderFormInner />
    </Suspense>
  );
}
