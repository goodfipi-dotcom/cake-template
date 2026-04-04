export interface CakeItem {
  id: number;
  name: string;
  price: number;
  weight: string;
  image: string;
  category: string;
  description: string;
}

export const shopConfig = {
  name: "Sweet Dreams",
  tagline: "Торты ручной работы с любовью",
  phone: "+7 999 123-45-67",
  whatsapp: "79991234567",
  telegram: "sweetdreams_msk",
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || "",
  telegramChatId: process.env.TELEGRAM_CHAT_ID || "",
  instagram: "sweetdreams_msk",
  city: "Москва",
  address: "ул. Пример, д. 1",
  workingHours: "Пн-Вс: 9:00 - 21:00",
  categories: ["Все", "Классика", "Детские", "Свадебные", "Муссовые"],

  images: {
    hero: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=3840&q=90",           // ← замени: главный экран
    about: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=1920&q=85",          // ← замени: секция "О нас"
    cta: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=3840&q=85",            // ← замени: "Закажите торт"
    catalogHeader: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=3840&q=85",  // ← замени: шапка каталога
  },

  catalog: [
    {
      id: 1,
      name: "Медовик",
      price: 2500,
      weight: "1.5 кг",
      image: "https://i.pinimg.com/1200x/3e/d7/b2/3ed7b2dfec54461b6a5adb3b711af330.jpg",  // ← замени
      category: "Классика",
      description: "Нежные медовые коржи с кремом из сметаны",
    },
    {
      id: 2,
      name: "Наполеон",
      price: 2800,
      weight: "1.5 кг",
      image: "https://i.pinimg.com/736x/61/af/f0/61aff0b349a48aecccb882f613c273b2.jpg",  // ← замени
      category: "Классика",
      description: "Хрустящие слоёные коржи с заварным кремом",
    },
    {
      id: 3,
      name: "Единорог",
      price: 3500,
      weight: "2 кг",
      image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=85",  // ← замени
      category: "Детские",
      description: "Яркий торт с единорогом для детского праздника",
    },
    {
      id: 4,
      name: "Радуга",
      price: 3200,
      weight: "2 кг",
      image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?w=800&q=85",    // ← замени
      category: "Детские",
      description: "Весёлый разноцветный торт для детского праздника",
    },
    {
      id: 5,
      name: "Свадебный классик",
      price: 5500,
      weight: "3 кг",
      image: "https://images.unsplash.com/photo-1535141192574-5d4897c12f40?w=800&q=85",  // ← замени
      category: "Свадебные",
      description: "Элегантный белый торт с цветами",
    },
    {
      id: 6,
      name: "Манго-маракуйя",
      price: 3000,
      weight: "1.5 кг",
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&q=85",  // ← замени
      category: "Муссовые",
      description: "Лёгкий муссовый торт с тропическими фруктами",
    },
  ] as CakeItem[],
};
