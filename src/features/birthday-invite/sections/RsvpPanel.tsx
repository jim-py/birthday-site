import { ChevronRight, MessageCircle } from "../components/icons";
import { SectionCard } from "../components/layout";

export function RsvpPanel() {
  return (
    <section id="rsvp" className="flex w-full items-start px-4 py-4 sm:px-6 sm:py-6 lg:items-center lg:px-10 lg:py-8">
      <SectionCard className="min-h-[calc(100dvh-2rem)] w-full lg:h-[calc(100dvh-4rem)]">
        <div className="flex h-full flex-col justify-between gap-6 sm:gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/55">
              <MessageCircle className="h-3.5 w-3.5 text-pink-300" />
              RSVP
            </div>
            <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">Подтвердите присутствие</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
              Выбор статуса можно оставить прямо здесь.
            </p>
          </div>

          <div className="flex flex-col flex-wrap gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-[#100d1b] shadow-lg shadow-pink-500/20 transition-transform hover:-translate-y-0.5">
              Я буду <ChevronRight className="h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 font-medium text-white/92 backdrop-blur-xl transition hover:bg-white/12">
              Скорее всего да
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-5 py-3 font-medium text-white/92 backdrop-blur-xl transition hover:bg-white/12">
              Не смогу прийти
            </button>
          </div>
        </div>
      </SectionCard>
    </section>
  );
}