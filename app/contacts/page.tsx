"use client";

import { shopConfig, CORAL, DARK } from "@/lib/config";
import AnimatedSection from "@/components/AnimatedSection";
import BackButton from "@/components/BackButton";

const contactLinks = [
  { icon: "📞", label: (c: typeof shopConfig) => c.phone,                      href: (c: typeof shopConfig) => `tel:${c.phone}` },
  { icon: "💬", label: () => "WhatsApp",                                        href: (c: typeof shopConfig) => `https://wa.me/${c.whatsapp}` },
  { icon: "✈️", label: (c: typeof shopConfig) => `Telegram: @${c.telegram}`,   href: (c: typeof shopConfig) => `https://t.me/${c.telegram}` },
  { icon: "📸", label: (c: typeof shopConfig) => `@${c.instagram}`,             href: (c: typeof shopConfig) => `https://instagram.com/${c.instagram}` },
] as const;

export default function ContactsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <AnimatedSection>
        <BackButton href="/" label="На главную" />
        <h1 className="text-4xl font-bold text-center mb-10" style={{ color: DARK }}>
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
              {contactLinks.map(({ icon, label, href }) => (
                <a
                  key={icon}
                  href={href(shopConfig)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-rose-50 transition-colors group"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
                  <span>{label(shopConfig)}</span>
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
