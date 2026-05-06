import { highlights } from "../constants";
import { Cake } from "../components/icons";
import { SectionCard } from "../components/layout";

export function AtmospherePanel() {
  return (
    <section className="flex w-full items-start px-4 py-4 sm:px-6 sm:py-6 lg:items-center lg:px-10 lg:py-8">
      <SectionCard className="min-h-[calc(100dvh-2rem)] w-full lg:h-[calc(100dvh-4rem)]">
        <div className="flex h-full flex-col justify-between gap-6 sm:gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/55">
              <Cake className="h-3.5 w-3.5 text-pink-300" />
              Атмосфера
            </div>
            <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">Праздничный тон с первого экрана</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Мягкое свечение, блёстки, насыщенные градиенты и эффект дорогого вечернего события делают сайт визуально живым и заметным.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-black/10 p-4">
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/10 p-2 shadow-lg shadow-pink-500/10">
                  <Icon className="h-4 w-4 text-pink-200" />
                </div>
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