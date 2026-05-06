import { motion } from "framer-motion";
import { Check, ChevronRight, GlassWater } from "../components/icons";
import { SectionCard } from "../components/layout";
import { drinkOptions } from "../constants";

export function DrinksPanel({
  selectedDrinks,
  customDrinkEnabled,
  customDrink,
  drinkSent,
  onToggleDrink,
  onToggleCustom,
  onCustomChange,
  onSubmit,
}: {
  selectedDrinks: string[];
  customDrinkEnabled: boolean;
  customDrink: string;
  drinkSent: boolean;
  onToggleDrink: (d: string) => void;
  onToggleCustom: () => void;
  onCustomChange: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <section className="flex w-full items-start px-4 py-4 sm:px-6 sm:py-6 lg:items-center lg:px-10 lg:py-8">
      <SectionCard className="min-h-[calc(100dvh-2rem)] w-full lg:h-[calc(100dvh-4rem)]">
        <div className="flex h-full flex-col justify-between gap-6 sm:gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/55">
              <GlassWater className="h-3.5 w-3.5 text-pink-300" />
              Опросник по напиткам
            </div>
            <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">Что подать на стол?</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
              Выберите несколько позиций или добавьте свой вариант.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {drinkOptions.map((drink) => {
              const active = selectedDrinks.includes(drink);

              return (
                <button
                  key={drink}
                  onClick={() => onToggleDrink(drink)}
                  className={`flex items-center justify-between rounded-3xl border px-4 py-4 text-left transition ${
                    active
                      ? "border-pink-300/50 bg-pink-500/18 shadow-lg shadow-pink-500/10"
                      : "border-white/10 bg-black/10 hover:bg-white/8"
                  }`}
                >
                  <span className="text-base font-medium capitalize">{drink}</span>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                      active
                        ? "border-pink-300 bg-pink-300 text-[#100d1b]"
                        : "border-white/20 text-white/45"
                    }`}
                  >
                    {active ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
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
                <input
                  value={customDrink}
                  onChange={(e) => onCustomChange(e.target.value)}
                  placeholder="Например: вино, текила, сидр..."
                  className="w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-pink-300/50"
                />
              </motion.div>
            )}
          </div>

          <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
            <button
              onClick={onSubmit}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-[#100d1b] shadow-lg shadow-pink-500/20 transition-transform hover:-translate-y-0.5"
            >
              Сохранить выбор <ChevronRight className="h-4 w-4" />
            </button>
            {drinkSent && (
              <div className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                Выбор отмечен.
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/10 p-4 text-sm leading-6 text-white/65">
            Выбрано: {selectedDrinks.length > 0 ? selectedDrinks.join(" · ") : "пока ничего"}
            {customDrinkEnabled && customDrink.trim() ? ` · ${customDrink.trim()}` : ""}
          </div>
        </div>
      </SectionCard>
    </section>
  );
}