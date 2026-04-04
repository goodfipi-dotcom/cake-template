import { shopConfig } from "@/lib/config";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="font-bold text-white mb-2">{shopConfig.name}</h3>
          <p className="text-amber-200">{shopConfig.tagline}</p>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Навигация</h3>
          <div className="flex flex-col gap-1">
            <Link href="/catalog" className="hover:text-white transition-colors">Каталог</Link>
            <Link href="/order" className="hover:text-white transition-colors">Заказать торт</Link>
            <Link href="/contacts" className="hover:text-white transition-colors">Контакты</Link>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white mb-2">Контакты</h3>
          <p>{shopConfig.phone}</p>
          <p>{shopConfig.workingHours}</p>
          <p className="mt-1">
            <a
              href={`https://instagram.com/${shopConfig.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              @{shopConfig.instagram}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-amber-800 text-center py-4 text-xs text-amber-300">
        &copy; {new Date().getFullYear()} {shopConfig.name}. Все права защищены.
      </div>
    </footer>
  );
}
