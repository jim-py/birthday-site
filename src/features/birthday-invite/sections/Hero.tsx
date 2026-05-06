import { motion } from "framer-motion";
import type { Countdown } from "../types";
import {
  Calendar,
  ChevronRight,
  Clock3,
  GlassWater,
  Heart,
  MapPin,
  PartyPopper,
  Sparkles,
} from "../components/icons";
import { InfoRow } from "../components/layout";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function Hero({ countdown }: { countdown: Countdown }) {
  return (
    <section className="flex w-full items-start px-4 py-4 sm:px-6 sm:py-6 lg:items-center lg:px-10 lg:py-8">
      <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/82 backdrop-blur-xl shadow-lg shadow-pink-500/10">
            <Sparkles className="h-4 w-4 text-pink-300" />
            <span>Приглашение на день рождения</span>
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-7xl">
            Вечер, который хочется{" "}
            <span className="bg-gradient-to-r from-pink-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
              прожить красиво
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-white/74 sm:text-lg sm:leading-8 lg:text-xl">
            Премиальное приглашение для гостей: всё главное — в красивой горизонтальной подаче, с праздничным настроением и быстрыми действиями.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#next"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-[#100d1b] shadow-lg shadow-pink-500/20 transition-transform hover:-translate-y-0.5"
            >
              Дальше <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href="#rsvp"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 font-medium text-white/92 backdrop-blur-xl transition hover:bg-white/12"
            >
              RSVP
            </a>
          </div>

          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-4">
            {[
              [countdown.days, "дней"],
              [countdown.hours, "часов"],
              [countdown.minutes, "минут"],
              [countdown.seconds, "секунд"],
            ].map(([value, label], idx) => (
              <motion.div
                key={label as string}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx + 0.2 }}
                className="rounded-3xl border border-white/12 bg-white/10 p-3 text-center shadow-2xl shadow-black/15 backdrop-blur-xl sm:p-4"
              >
                <div className="text-2xl font-semibold tabular-nums text-white sm:text-4xl">
                  {pad(value as number)}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/50 sm:text-xs">
                  {label as string}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.12 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-pink-500/24 via-violet-500/14 to-amber-400/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-white/10 p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/10 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/60 sm:text-xs">
                  <PartyPopper className="h-3.5 w-3.5 text-pink-300" />
                  Birthday Night
                </div>
                <h2 className="mt-4 text-2xl font-semibold leading-tight sm:mt-5 sm:text-4xl">
                  A. Birthday Dinner & Afterparty
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/74 sm:text-base">
                  Ужин, тосты, музыка, фото и танцы. Акцент на атмосфере и красивом вечере для каждого гостя.
                </p>
              </div>
              <div className="rounded-2xl border border-white/12 bg-white/10 p-3 shadow-lg shadow-pink-500/10">
                <Heart className="h-5 w-5 text-pink-300" />
              </div>
            </div>

            <div className="relative mt-5 grid gap-3 sm:mt-6">
              <InfoRow icon={Calendar} label="Дата" value="Суббота, 15 августа 2026" />
              <InfoRow icon={Clock3} label="Время" value="18:30 — 02:00" />
              <InfoRow icon={MapPin} label="Локация" value="ROSE LOFT, Москва, ул. Примерная 12" />
            </div>

            <div className="mt-5 rounded-3xl border border-white/12 bg-gradient-to-br from-white/12 to-white/6 p-4 shadow-lg shadow-black/10 sm:mt-6 sm:p-5">
              <div className="flex items-center gap-2 text-sm text-white/78">
                <GlassWater className="h-4 w-4 text-violet-200" />
                Дресс-код
              </div>
              <div className="mt-2 text-base font-medium sm:text-lg">
                Elegant party / black, silver, deep wine
              </div>
              <p className="mt-2 text-sm leading-6 text-white/62">
                Добавьте блеск, сатин, вечерние аксессуары и немного смелости.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}