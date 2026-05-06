import type { HighlightItem, ScheduleItem, WishlistItem } from "./types";
import { Cake, Camera, Gift, Music4 } from "./components/icons.tsx";

export const theme = "dark" as const;

export const colors = {
  bg: "#09070f",
  text: "#ffffff",
} as const;

export const EVENT_DATE = new Date("2026-06-20T19:00:00");

export const drinkOptions = ["пиво", "шампанское", "ягермейстер", "водка"] as const;

export const wishlistItems: WishlistItem[] = [
  { id: "g1", title: "Ароматическая свеча в стекле", note: "Для уюта дома после праздника" },
  { id: "g2", title: "Большой букет с доставкой", note: "Нежная флористика в светлой палитре" },
  { id: "g3", title: "Сертификат в SPA", note: "Чтобы продлить праздничное настроение" },
  { id: "g4", title: "Дизайнерская ваза", note: "Сильный интерьерный акцент" },
  { id: "g5", title: "Подарочный набор для кофе", note: "Для утренних ритуалов" },
  { id: "g6", title: "Сумка / аксессуар из wish-list", note: "Точный вариант можно уточнить отдельно" },
];

export const schedule: ScheduleItem[] = [
  { time: "18:30", title: "Сбор гостей", text: "Welcome drinks, фото-зона и музыка." },
  { time: "19:15", title: "Торжественный вход", text: "Небольшой момент, чтобы открыть вечер красиво." },
  { time: "20:00", title: "Ужин и тосты", text: "Тёплая атмосфера, общение и сюрпризы." },
  { time: "22:00", title: "Танцы и after party", text: "Плейлист, свет и настроение до позднего вечера." },
];

export const highlights: HighlightItem[] = [
  { icon: Camera, title: "Фото-spot", text: "Эстетичная зона для кадров без лишнего шума." },
  { icon: Music4, title: "Музыка вечера", text: "Современный саунд и мягкий лайв-вайб." },
  { icon: Cake, title: "Торт-сюрприз", text: "Красивый момент, который не захочется пропустить." },
  { icon: Gift, title: "Подарки", text: "Можно заранее забронировать подарок из вишлиста." },
];