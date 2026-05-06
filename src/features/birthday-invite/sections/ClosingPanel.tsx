import { FeatureLine } from "../components/layout";

export function ClosingPanel() {
  return (
    <section className="flex w-full items-start px-4 py-4 sm:px-6 sm:py-6 lg:items-center lg:px-10 lg:py-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-6 lg:p-8 min-h-[calc(100dvh-2rem)] w-full lg:h-[calc(100dvh-4rem)]">
        <div className="flex h-full flex-col justify-between gap-6 sm:gap-8">
          <div>
            <div className="text-sm uppercase tracking-[0.26em] text-white/50">Финал</div>
            <h3 className="mt-2 text-3xl font-semibold sm:text-4xl">До встречи на вечере</h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              Эта версия уже выглядит как полноценный гостевой сайт: горизонтальное путешествие по блокам, живая атмосфера, фейерверки и интерактивные действия без базы данных.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <FeatureLine title="Приходите вовремя" text="Лучший момент вечера начинается с первых гостей." />
            <FeatureLine title="Формат вечера" text="Ужин, общение, музыка и танцы без официоза." />
            <FeatureLine title="Подарки" text="Вишлист помогает избежать дублей и выбрать конкретное." />
            <FeatureLine title="Напитки" text="Опросник помогает подготовить бар к вашему вкусу." />
          </div>
        </div>
      </div>
    </section>
  );
}