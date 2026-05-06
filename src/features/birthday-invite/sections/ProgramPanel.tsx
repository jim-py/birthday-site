import { schedule } from "../constants";
import { Sparkles } from "../components/icons";
import { SectionCard } from "../components/layout";

export function ProgramPanel() {
  return (
    <section className="flex w-full items-start px-4 py-4 sm:px-6 sm:py-6 lg:items-center lg:px-10 lg:py-8">
      <SectionCard className="min-h-[calc(100dvh-2rem)] w-full lg:h-[calc(100dvh-4rem)]">
        <div className="flex h-full flex-col justify-between gap-6 sm:gap-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-white/50">Program</div>
              <h3 className="mt-2 text-3xl font-semibold sm:text-4xl">План вечера</h3>
            </div>
            <div className="rounded-2xl border border-white/12 bg-white/10 p-3 shadow-lg shadow-black/15">
              <Sparkles className="h-5 w-5 text-violet-200" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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