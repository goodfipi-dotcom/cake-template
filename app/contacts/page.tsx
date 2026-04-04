"use client";

import { shopConfig } from "@/lib/config";
import AnimatedSection from "@/components/AnimatedSection";

export default function ContactsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <AnimatedSection>
        <h1 className="text-4xl font-bold text-gradient text-center mb-10">Контакты</h1>
      </AnimatedSection>

      <div className="space-y-6">
        <AnimatedSection delay={0.1}>
          <div className="glass rounded-3xl p-8">
            <h2 className="font-semibold text-amber-900 text-lg mb-5">Свяжитесь с нами</h2>
            <div className="space-y-4 text-stone-600">
              {[
                { icon: "📞", label: shopConfig.phone, href: `tel:${shopConfig.phone}` },
                { icon: "💬", label: "WhatsApp", href: `https://wa.me/${shopConfig.whatsapp}` },
                { icon: "✈️", label: `Telegram: @${shopConfig.telegram}`, href: `https://t.me/${shopConfig.telegram}` },
                { icon: "📸", label: `@${shopConfig.instagram}`, href: `https://instagram.com/${shopConfig.instagram}` },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-amber-50 transition-colors group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="group-hover:text-amber-700 transition-colors">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="glass rounded-3xl p-8">
            <h2 className="font-semibold text-amber-900 text-lg mb-5">Адрес и режим работы</h2>
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
