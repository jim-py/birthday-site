import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type IconProps = React.SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  );
}

function Calendar(props: IconProps) {
  return <Icon {...props}><rect x="3.5" y="5" width="17" height="15.5" rx="3" /><path d="M8 3.5v3M16 3.5v3M3.5 9.5h17" /></Icon>;
}
function Clock3(props: IconProps) {
  return <Icon {...props}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.8V12l2.8 1.7" /></Icon>;
}
function MapPin(props: IconProps) {
  return <Icon {...props}><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" /><circle cx="12" cy="10" r="2.2" /></Icon>;
}
function Sparkles(props: IconProps) {
  return <Icon {...props}><path d="M12 3.5l1.3 4.2L17.5 9l-4.2 1.3L12 14.5l-1.3-4.2L6.5 9l4.2-1.3L12 3.5Z" /><path d="M18.5 13.5l.8 2.6 2.6.8-2.6.8-.8 2.6-.8-2.6-2.6-.8 2.6-.8.8-2.6Z" /></Icon>;
}
function Cake(props: IconProps) {
  return <Icon {...props}><path d="M4 18.5h16" /><path d="M6 18.5v-5h12v5" /><path d="M8 13.5V9.8c0-1.1.9-2 2-2h0" /><path d="M16 13.5V9.8c0-1.1-.9-2-2-2h0" /><path d="M12 7.8V5.2" /><path d="M12 5.2c0 .9.8 1.2.8 2s-.8 1.1-.8 2" /></Icon>;
}
function Camera(props: IconProps) {
  return <Icon {...props}><rect x="3.5" y="7" width="17" height="12.5" rx="2.5" /><path d="M8 7l1.4-2.2h5.2L16 7" /><circle cx="12" cy="13.5" r="3.2" /></Icon>;
}
function PartyPopper(props: IconProps) {
  return <Icon {...props}><path d="M5 19l6.5-6.5" /><path d="M8 4l2 4" /><path d="M4 8l4 2" /><path d="M10 14l5.5 5.5" /><path d="M13 4l1.3 2.8L17 8l-2.7 1.2L13 12l-1.1-2.8L9 8l2.9-1.2L13 4Z" /></Icon>;
}
function ChevronRight(props: IconProps) {
  return <Icon {...props}><path d="M9 6l6 6-6 6" /></Icon>;
}
function Music4(props: IconProps) {
  return <Icon {...props}><path d="M10 18V6l9-2v12" /><circle cx="8" cy="18" r="2.2" /><circle cx="17" cy="16" r="2.2" /></Icon>;
}
function GlassWater(props: IconProps) {
  return <Icon {...props}><path d="M7 4h10l-1 10a4 4 0 0 1-4 3.5H12A4 4 0 0 1 8 14L7 4Z" /><path d="M8 8.5h8" /><path d="M10 17.5V20" /></Icon>;
}
function Heart(props: IconProps) {
  return <Icon {...props}><path d="M12 20s-7-4.5-7-10a4.2 4.2 0 0 1 7-3 4.2 4.2 0 0 1 7 3c0 5.5-7 10-7 10Z" /></Icon>;
}
function Gift(props: IconProps) {
  return <Icon {...props}><rect x="4" y="9" width="16" height="4" rx="1.5" /><path d="M12 9v11" /><path d="M12 9c-2.5 0-4.5-1.2-4.5-3a2 2 0 0 1 4.1-.5L12 9Z" /><path d="M12 9c2.5 0 4.5-1.2 4.5-3a2 2 0 0 0-4.1-.5L12 9Z" /><path d="M5.5 13v5.5A1.5 1.5 0 0 0 7 20h10a1.5 1.5 0 0 0 1.5-1.5V13" /></Icon>;
}
function MessageCircle(props: IconProps) {
  return <Icon {...props}><path d="M20 12a7.5 7.5 0 0 1-7.5 7.5H8L4 22l1.2-4.5A7.5 7.5 0 1 1 20 12Z" /></Icon>;
}
function Check(props: IconProps) {
  return <Icon {...props}><path d="M20 6 9 17l-5-5" /></Icon>;
}

const EVENT_DATE = new Date("2026-08-15T19:00:00");
const drinkOptions = ["пиво", "шампанское", "ягермейстер", "водка"] as const;
const wishlistItems = [
  { id: "g1", title: "Ароматическая свеча в стекле", note: "Для уюта дома после праздника" },
  { id: "g2", title: "Большой букет с доставкой", note: "Нежная флористика в светлой палитре" },
  { id: "g3", title: "Сертификат в SPA", note: "Чтобы продлить праздничное настроение" },
  { id: "g4", title: "Дизайнерская ваза", note: "Сильный интерьерный акцент" },
  { id: "g5", title: "Подарочный набор для кофе", note: "Для утренних ритуалов" },
  { id: "g6", title: "Сумка / аксессуар из wish-list", note: "Точный вариант можно уточнить отдельно" },
];
const schedule = [
  { time: "18:30", title: "Сбор гостей", text: "Welcome drinks, фото-зона и музыка." },
  { time: "19:15", title: "Торжественный вход", text: "Небольшой момент, чтобы открыть вечер красиво." },
  { time: "20:00", title: "Ужин и тосты", text: "Тёплая атмосфера, общение и сюрпризы." },
  { time: "22:00", title: "Танцы и after party", text: "Плейлист, свет и настроение до позднего вечера." },
];
const highlights = [
  { icon: Camera, title: "Фото-spot", text: "Эстетичная зона для кадров без лишнего шума." },
  { icon: Music4, title: "Музыка вечера", text: "Современный саунд и мягкий лайв-вайб." },
  { icon: Cake, title: "Торт-сюрприз", text: "Красивый момент, который не захочется пропустить." },
  { icon: Gift, title: "Подарки", text: "Можно заранее забронировать подарок из вишлиста." },
];

function pad(n: number) { return String(n).padStart(2, "0"); }
function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = window.setInterval(() => setNow(new Date()), 1000); return () => window.clearInterval(id); }, []);
  return useMemo(() => {
    const diff = Math.max(0, target.getTime() - now.getTime());
    const totalSeconds = Math.floor(diff / 1000);
    return { days: Math.floor(totalSeconds / 86400), hours: Math.floor((totalSeconds % 86400) / 3600), minutes: Math.floor((totalSeconds % 3600) / 60), seconds: totalSeconds % 60 };
  }, [now, target]);
}

export default function BirthdayInvitePage() {
  const c = useCountdown(EVENT_DATE);
  const reduceMotion = useReducedMotion();
  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [customDrinkEnabled, setCustomDrinkEnabled] = useState(false);
  const [customDrink, setCustomDrink] = useState("");
  const [drinkSent, setDrinkSent] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [wishlistNotice, setWishlistNotice] = useState<string>("");

  useEffect(() => { if (!drinkSent) return; const t = window.setTimeout(() => setDrinkSent(false), 2500); return () => window.clearTimeout(t); }, [drinkSent]);
  useEffect(() => { if (!wishlistNotice) return; const t = window.setTimeout(() => setWishlistNotice(""), 2400); return () => window.clearTimeout(t); }, [wishlistNotice]);

  const toggleDrink = (drink: string) => {
    setDrinkSent(false);
    setSelectedDrinks((prev) => prev.includes(drink) ? prev.filter((i) => i !== drink) : [...prev, drink]);
  };
  const toggleWishlistItem = (id: string, title: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      setWishlistNotice(exists ? `Бронь снята: ${title}` : `Подарок забронирован: ${title}`);
      return exists ? prev.filter((i) => i !== id) : [...prev, id];
    });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#09070f] text-white">
      <div className="relative isolate h-screen w-screen overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_35%),radial-gradient(circle_at_20%_20%,_rgba(255,74,170,0.20),_transparent_28%),radial-gradient(circle_at_80%_10%,_rgba(126,87,255,0.18),_transparent_24%),radial-gradient(circle_at_80%_80%,_rgba(255,183,77,0.12),_transparent_22%),linear-gradient(180deg,#09070f_0%,#120f1f_45%,#09070f_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:48px_48px]" />

        {!reduceMotion && <FireworksOverlay />}

        <div className="relative flex h-full min-w-max items-stretch">
          <Panel className="w-screen lg:w-[100vw]">
            <Hero countdown={c} />
          </Panel>

          <Panel className="w-screen lg:w-[100vw]">
            <AtmospherePanel />
          </Panel>

          <Panel className="w-screen lg:w-[100vw]">
            <ProgramPanel />
          </Panel>

          <Panel className="w-screen lg:w-[100vw]">
            <DrinksPanel
              selectedDrinks={selectedDrinks}
              customDrinkEnabled={customDrinkEnabled}
              customDrink={customDrink}
              drinkSent={drinkSent}
              onToggleDrink={toggleDrink}
              onToggleCustom={() => setCustomDrinkEnabled((v) => !v)}
              onCustomChange={setCustomDrink}
              onSubmit={() => setDrinkSent(true)}
            />
          </Panel>

          <Panel className="w-screen lg:w-[100vw]">
            <WishlistPanel wishlist={wishlist} notice={wishlistNotice} onToggle={toggleWishlistItem} />
          </Panel>

          <Panel className="w-screen lg:w-[100vw]">
            <RsvpPanel />
          </Panel>

          <Panel className="w-screen lg:w-[100vw]">
            <ClosingPanel />
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Hero({ countdown }: { countdown: { days: number; hours: number; minutes: number; seconds: number } }) {
  return (
    <section className="flex h-full w-full items-center px-5 py-8 sm:px-8 lg:px-10">
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/82 backdrop-blur-xl shadow-lg shadow-pink-500/10">
            <Sparkles className="h-4 w-4 text-pink-300" />
            <span>Приглашение на день рождения</span>
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Вечер, который хочется <span className="bg-gradient-to-r from-pink-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">прожить красиво</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74 sm:text-xl">
            Премиальное приглашение для гостей: всё главное — в красивой горизонтальной подаче, с праздничным настроением и быстрыми действиями.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#next" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-[#100d1b] shadow-lg shadow-pink-500/20 transition-transform hover:-translate-y-0.5">Дальше <ChevronRight className="h-4 w-4" /></a>
            <a href="#rsvp" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 font-medium text-white/92 backdrop-blur-xl transition hover:bg-white/12">RSVP</a>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[[countdown.days, "дней"], [countdown.hours, "часов"], [countdown.minutes, "минут"], [countdown.seconds, "секунд"]].map(([value, label], idx) => (
              <motion.div key={label as string} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * idx + 0.2 }} className="rounded-3xl border border-white/12 bg-white/10 p-4 text-center shadow-2xl shadow-black/15 backdrop-blur-xl">
                <div className="text-3xl font-semibold tabular-nums text-white sm:text-4xl">{pad(value as number)}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.24em] text-white/50">{label as string}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.85, ease: "easeOut", delay: 0.12 }} className="relative">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-pink-500/24 via-violet-500/14 to-amber-400/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/60"><PartyPopper className="h-3.5 w-3.5 text-pink-300" />Birthday Night</div>
                <h2 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">A. Birthday Dinner & Afterparty</h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/74 sm:text-base">Ужин, тосты, музыка, фото и танцы. Акцент на атмосфере и красивом вечере для каждого гостя.</p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/10 p-3 shadow-lg shadow-pink-500/10"><Heart className="h-5 w-5 text-pink-300" /></div>
            </div>
            <div className="relative mt-6 grid gap-3">
              <InfoRow icon={Calendar} label="Дата" value="Суббота, 15 августа 2026" />
              <InfoRow icon={Clock3} label="Время" value="18:30 — 02:00" />
              <InfoRow icon={MapPin} label="Локация" value="ROSE LOFT, Москва, ул. Примерная 12" />
            </div>
            <div className="mt-6 rounded-3xl border border-white/12 bg-gradient-to-br from-white/12 to-white/6 p-5 shadow-lg shadow-black/10">
              <div className="flex items-center gap-2 text-sm text-white/78"><GlassWater className="h-4 w-4 text-violet-200" />Дресс-код</div>
              <div className="mt-2 text-lg font-medium">Elegant party / black, silver, deep wine</div>
              <p className="mt-2 text-sm leading-6 text-white/62">Добавьте блеск, сатин, вечерние аксессуары и немного смелости.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function AtmospherePanel() {
  return (
    <section className="flex h-full w-full items-center px-5 py-8 sm:px-8 lg:px-10">
      <SectionCard className="h-[calc(100vh-4rem)] w-full">
        <div className="flex h-full flex-col justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/55"><Cake className="h-3.5 w-3.5 text-pink-300" />Атмосфера</div>
            <h3 className="mt-4 text-4xl font-semibold">Праздничный тон с первого экрана</h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">Мягкое свечение, блёстки, насыщенные градиенты и эффект дорогого вечернего события делают сайт визуально живым и заметным.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-black/10 p-4">
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/10 p-2 shadow-lg shadow-pink-500/10"><Icon className="h-4 w-4 text-pink-200" /></div>
                <div className="mt-3 text-lg font-medium">{title}</div>
                <div className="mt-1 text-sm leading-6 text-white/62">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </section>
  );
}

function ProgramPanel() {
  return (
    <section className="flex h-full w-full items-center px-5 py-8 sm:px-8 lg:px-10">
      <SectionCard className="h-[calc(100vh-4rem)] w-full">
        <div className="flex h-full flex-col justify-between gap-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-white/50">Program</div>
              <h3 className="mt-2 text-4xl font-semibold">План вечера</h3>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/10 p-3 shadow-lg shadow-black/15"><Sparkles className="h-5 w-5 text-violet-200" /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {schedule.map((item) => (
              <div key={item.time} className="rounded-3xl border border-white/10 bg-black/10 p-4">
                <div className="text-lg font-semibold text-pink-200">{item.time}</div>
                <div className="mt-2 text-lg font-medium">{item.title}</div>
                <div className="mt-1 text-sm leading-6 text-white/62">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>
    </section>
  );
}

function DrinksPanel({ selectedDrinks, customDrinkEnabled, customDrink, drinkSent, onToggleDrink, onToggleCustom, onCustomChange, onSubmit }: { selectedDrinks: string[]; customDrinkEnabled: boolean; customDrink: string; drinkSent: boolean; onToggleDrink: (d: string) => void; onToggleCustom: () => void; onCustomChange: (v: string) => void; onSubmit: () => void; }) {
  return (
    <section className="flex h-full w-full items-center px-5 py-8 sm:px-8 lg:px-10">
      <SectionCard className="h-[calc(100vh-4rem)] w-full">
        <div className="flex h-full flex-col justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/55"><GlassWater className="h-3.5 w-3.5 text-pink-300" />Опросник по напиткам</div>
            <h3 className="mt-4 text-4xl font-semibold">Что подать на стол?</h3>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/68">Выберите несколько позиций или добавьте свой вариант.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {drinkOptions.map((drink) => {
              const active = selectedDrinks.includes(drink);
              return (
                <button key={drink} onClick={() => onToggleDrink(drink)} className={`flex items-center justify-between rounded-3xl border px-4 py-4 text-left transition ${active ? "border-pink-300/50 bg-pink-500/18 shadow-lg shadow-pink-500/10" : "border-white/10 bg-black/10 hover:bg-white/8"}`}>
                  <span className="text-base font-medium capitalize">{drink}</span>
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${active ? "border-pink-300 bg-pink-300 text-[#100d1b]" : "border-white/20 text-white/45"}`}>{active ? <Check className="h-3.5 w-3.5" /> : null}</span>
                </button>
              );
            })}
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/10 p-4">
            <button onClick={onToggleCustom} className="flex w-full items-center justify-between text-left">
              <span className="text-base font-medium">Что-то своё</span>
              <span className="text-sm text-white/55">{customDrinkEnabled ? "Скрыть" : "Добавить"}</span>
            </button>
            {customDrinkEnabled && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 overflow-hidden">
                <input value={customDrink} onChange={(e) => onCustomChange(e.target.value)} placeholder="Например: вино, текила, сидр..." className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-pink-300/50" />
              </motion.div>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={onSubmit} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-[#100d1b] shadow-lg shadow-pink-500/20 transition-transform hover:-translate-y-0.5">Сохранить выбор <ChevronRight className="h-4 w-4" /></button>
            {drinkSent && <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">Выбор отмечен.</div>}
          </div>
          <div className="rounded-3xl border border-white/10 bg-black/10 p-4 text-sm leading-6 text-white/65">Выбрано: {selectedDrinks.length > 0 ? selectedDrinks.join(" · ") : "пока ничего"}{customDrinkEnabled && customDrink.trim() ? ` · ${customDrink.trim()}` : ""}</div>
        </div>
      </SectionCard>
    </section>
  );
}

function WishlistPanel({ wishlist, notice, onToggle }: { wishlist: string[]; notice: string; onToggle: (id: string, title: string) => void; }) {
  return (
    <section className="flex h-full w-full items-center px-5 py-8 sm:px-8 lg:px-10">
      <SectionCard className="h-[calc(100vh-4rem)] w-full">
        <div className="flex h-full flex-col justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/55"><Gift className="h-3.5 w-3.5 text-pink-300" />Вишлист</div>
            <h3 className="mt-4 text-4xl font-semibold">Подарки, которые можно забронировать</h3>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/68">Нажмите на подарок, чтобы отметить его за собой.</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {wishlistItems.map((item) => {
              const reserved = wishlist.includes(item.id);
              return (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-black/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-medium">{item.title}</div>
                      <div className="mt-1 text-sm leading-6 text-white/58">{item.note}</div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs ${reserved ? "bg-emerald-400/15 text-emerald-200" : "bg-white/8 text-white/55"}`}>{reserved ? "занято" : "свободно"}</span>
                  </div>
                  <button onClick={() => onToggle(item.id, item.title)} className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${reserved ? "border border-white/12 bg-white/7 text-white/90 hover:bg-white/10" : "bg-white text-[#100d1b] hover:-translate-y-0.5"}`}>{reserved ? "Снять" : "Забронировать"}</button>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-black/10 p-4 text-sm text-white/65"><span>Забронировано позиций</span><span className="text-base font-semibold text-white">{wishlist.length}</span></div>
          {notice && <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">{notice}</div>}
        </div>
      </SectionCard>
    </section>
  );
}

function RsvpPanel() {
  return (
    <section id="rsvp" className="flex h-full w-full items-center px-5 py-8 sm:px-8 lg:px-10">
      <SectionCard className="h-[calc(100vh-4rem)] w-full">
        <div className="flex h-full flex-col justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/55"><MessageCircle className="h-3.5 w-3.5 text-pink-300" />RSVP</div>
            <h3 className="mt-4 text-4xl font-semibold">Подтвердите присутствие</h3>
            <p className="mt-3 max-w-2xl text-base leading-7 text-white/68">Выбор статуса можно оставить прямо здесь.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-[#100d1b] shadow-lg shadow-pink-500/20 transition-transform hover:-translate-y-0.5">Я буду <ChevronRight className="h-4 w-4" /></button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 font-medium text-white/92 backdrop-blur-xl transition hover:bg-white/12">Скорее всего да</button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 font-medium text-white/92 backdrop-blur-xl transition hover:bg-white/12">Не смогу прийти</button>
          </div>
        </div>
      </SectionCard>
    </section>
  );
}

function ClosingPanel() {
  return (
    <section className="flex h-full w-full items-center px-5 py-8 sm:px-8 lg:px-10">
      <SectionCard className="h-[calc(100vh-4rem)] w-full">
        <div className="flex h-full flex-col justify-between gap-8">
          <div>
            <div className="text-sm uppercase tracking-[0.26em] text-white/50">Финал</div>
            <h3 className="mt-2 text-4xl font-semibold">До встречи на вечере</h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">Эта версия уже выглядит как полноценный гостевой сайт: горизонтальное путешествие по блокам, живая атмосфера, фейерверки и интерактивные действия без базы данных.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <FeatureLine title="Приходите вовремя" text="Лучший момент вечера начинается с первых гостей." />
            <FeatureLine title="Формат вечера" text="Ужин, общение, музыка и танцы без официоза." />
            <FeatureLine title="Подарки" text="Вишлист помогает избежать дублей и выбрать конкретное." />
            <FeatureLine title="Напитки" text="Опросник помогает подготовить бар к вашему вкусу." />
          </div>
        </div>
      </SectionCard>
    </section>
  );
}

function Panel({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`relative flex-shrink-0 ${className}`}>{children}</div>;
}

function SectionCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/10 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8 ${className}`}>{children}</div>;
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-black/10 p-4 shadow-lg shadow-black/10">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-3"><Icon className="h-4 w-4 text-pink-200" /></div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</div>
        <div className="mt-1 truncate text-base font-medium text-white/92">{value}</div>
      </div>
    </div>
  );
}

function FeatureLine({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex gap-3 rounded-3xl border border-white/10 bg-white/8 p-4 shadow-lg shadow-black/10">
      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-pink-300" />
      <div>
        <div className="font-medium text-white">{title}</div>
        <div className="mt-1 text-sm leading-6 text-white/65">{text}</div>
      </div>
    </div>
  );
}

function FireworksOverlay() {
  const fireworks = [
    { left: "8%", top: "16%", delay: 0 },
    { left: "78%", top: "10%", delay: 0.7 },
    { left: "18%", top: "72%", delay: 1.1 },
    { left: "88%", top: "68%", delay: 1.6 },
    { left: "48%", top: "7%", delay: 2.1 },
  ];
  return (
    <>
      {fireworks.map((fw, idx) => <Firework key={idx} left={fw.left} top={fw.top} delay={fw.delay} />)}
    </>
  );
}

function Firework({ left, top, delay }: { left: string; top: string; delay: number }) {
  const particles = [
    { dx: -54, dy: -18 }, { dx: -28, dy: -44 }, { dx: 0, dy: -58 }, { dx: 28, dy: -44 }, { dx: 54, dy: -18 }, { dx: 46, dy: 20 }, { dx: 20, dy: 50 }, { dx: -18, dy: 52 }, { dx: -46, dy: 22 },
  ];
  return (
    <div className="pointer-events-none absolute z-0" style={{ left, top }}>
      <motion.div className="absolute left-0 top-0 h-2 w-2 rounded-full bg-white/90 shadow-[0_0_22px_rgba(255,255,255,0.95)]" animate={{ scale: [0.8, 2.2, 0.8], opacity: [0.2, 1, 0.2] }} transition={{ duration: 2.8, repeat: Infinity, delay, ease: "easeOut" }} />
      {particles.map((p, idx) => (
        <motion.span key={idx} className="absolute left-0 top-0 block h-1.5 w-1.5 rounded-full" style={{ background: idx % 4 === 0 ? "#f472b6" : idx % 4 === 1 ? "#fbbf24" : idx % 4 === 2 ? "#c084fc" : "#fff", boxShadow: "0 0 14px rgba(255,255,255,0.9)" }} initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }} animate={{ x: p.dx, y: p.dy, opacity: [0, 1, 0], scale: [0.4, 1.2, 0.6] }} transition={{ duration: 2.8, repeat: Infinity, delay: delay + idx * 0.04, ease: "easeOut" }} />
      ))}
      <motion.div className="absolute left-0 top-0 h-20 w-20 rounded-full border border-white/15" animate={{ scale: [0.2, 1.8, 0.2], opacity: [0, 0.6, 0] }} transition={{ duration: 2.8, repeat: Infinity, delay, ease: "easeOut" }} />
    </div>
  );
}
