"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { shopConfig, CORAL } from "@/lib/config";
import AnimatedSection from "@/components/AnimatedSection";
import BackButton from "@/components/BackButton";

function OrderFormInner() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    cake: searchParams.get("cake") || "",
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
        window.open(`https://wa.me/${shopConfig.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
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
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto px-4 py-20 text-center"
      >
        <div className="text-6xl mb-6 animate-float">🎉</div>
        <h2 className="text-3xl font-bold mb-4" style={{ color: CORAL }}>Заявка отправлена!</h2>
        <p className="text-stone-500 text-lg mb-8">Мы свяжемся с вами в ближайшее время.</p>
        <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-75" style={{ color: CORAL }}>
          ← Вернуться к каталогу
        </Link>
      </motion.div>
    );
  }

  const inputClass = "w-full px-5 py-3.5 rounded-2xl border border-stone-200 outline-none transition-all bg-white focus:border-[#ff8576] focus:ring-2 focus:ring-[#ff8576]/20";

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <AnimatedSection>
        <BackButton href="/catalog" label="Назад к каталогу" />
        <h1 className="text-4xl font-bold text-center mb-2" style={{ color: CORAL }}>Заказать торт</h1>
        <p className="text-stone-400 text-center mb-10 text-lg">
          Заполните форму — мы свяжемся для уточнения деталей
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.15}>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Ваше имя",  key: "name",  type: "text",  placeholder: "Анна",              required: true },
            { label: "Телефон",   key: "phone", type: "tel",   placeholder: "+7 999 123-45-67",  required: true },
          ].map(({ label, key, type, placeholder, required }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-stone-600 mb-1.5">{label}</label>
              <input
                type={type}
                required={required}
                value={form[key as keyof typeof form]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className={inputClass}
                placeholder={placeholder}
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">Какой торт?</label>
            <select
              value={form.cake}
              onChange={(e) => setForm({ ...form, cake: e.target.value })}
              className={inputClass}
            >
              <option value="">Выберите или опишите ниже</option>
              {shopConfig.catalog.map((c) => (
                <option key={c.id} value={c.name}>{c.name} — {c.price.toLocaleString()} ₽</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">Дата</label>
            <input
              type="date" required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1.5">Пожелания</label>
            <textarea
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Надпись на торте, количество гостей, аллергии..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full text-white py-4 rounded-2xl text-lg font-semibold transition-all hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
            style={{ background: CORAL, boxShadow: `0 4px 20px ${CORAL}40` }}
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
  return <Suspense><OrderFormInner /></Suspense>;
}
