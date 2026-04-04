import { NextResponse } from "next/server";
import { shopConfig } from "@/lib/config";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, cake, date, comment } = body;

  const message =
    `🎂 Новая заявка!\n\n` +
    `👤 Имя: ${name}\n` +
    `📞 Телефон: ${phone}\n` +
    `🍰 Торт: ${cake || "Не выбран"}\n` +
    `📅 Дата: ${date}\n` +
    `💬 Комментарий: ${comment || "—"}`;

  // Отправка в Telegram (если настроен бот)
  if (shopConfig.telegramBotToken && shopConfig.telegramChatId) {
    try {
      await fetch(
        `https://api.telegram.org/bot${shopConfig.telegramBotToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: shopConfig.telegramChatId,
            text: message,
            parse_mode: "HTML",
          }),
        }
      );
    } catch (err) {
      console.error("Telegram send error:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
