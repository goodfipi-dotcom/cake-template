"use client";

import Link from "next/link";
import { shopConfig } from "@/lib/config";
import AnimatedSection from "@/components/AnimatedSection";

const CORAL = shopConfig.colors.primary;

export default function ContactsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Кнопка назад */}
      <AnimatedSection>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-400 hover:text-stone-600 transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          На главную
        </Link>
      </AnimatedSection>

      <AnimatedSection>
        <h1
          className="text-4xl font-bold text-center mb-10"
          style={{ color: shopConfig.colors.dark }}
        >
          Контакты
        </h1>
      </AnimatedSection>

      <div className="space-y-6">
        <AnimatedSection delay={0.1}>
          <div className="glass rounded-3xl p-8">
            <h2 className="font-semibold text-lg mb-5" style={{ color: CORAL }}>
              Свяжитесь с нами
            </h2>
            <div className="space-y-4 text-stone-600">
              {[
                { icon: "📞", label: shopConfig.phone,                        href: `tel:${shopConfig.phone}` },
                { icon: "💬", label: "WhatsApp",                               href: `https://wa.me/${shopConfig.whatsapp}` },
                { icon: "✈️", label: `Telegram: @${shopConfig.telegram}`,      href: `https://t.me/${shopConfig.telegram}` },
                { icon: "📸", label: `@${shopConfig.instagram}`,               href: `https://instagram.com/${shopConfig.instagram}` },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-rose-50 transition-colors group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="group-hover:transition-colors" style={{ color: "inherit" }}>
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="glass rounded-3xl p-8">
            <h2 className="font-semibold text-lg mb-5" style={{ color: CORAL }}>
              Адрес и режим работы
            </h2>
            <div className="space-y-3 text-stone-600">
              <p className="flex items-center gap-3">📍 {shopConfig.city}, {shopConfig.address}</p>
              <p className="flex items-center gap-3">🕐 {shopConfig.workingHours}</p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
