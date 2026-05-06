import { wishlistItems } from "../constants";
import { Gift } from "../components/icons";
import { SectionCard } from "../components/layout";

export function WishlistPanel({
  wishlist,
  notice,
  onToggle,
}: {
  wishlist: string[];
  notice: string;
  onToggle: (id: string, title: string) => void;
}) {
  return (
    <section className="flex w-full items-start px-4 py-4 sm:px-6 sm:py-6 lg:items-center lg:px-10 lg:py-8">
      <SectionCard className="min-h-[calc(100dvh-2rem)] w-full lg:h-[calc(100dvh-4rem)]">
        <div className="flex h-full flex-col justify-between gap-6 sm:gap-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/55">
              <Gift className="h-3.5 w-3.5 text-pink-300" />
              Вишлист
            </div>
            <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">Подарки, которые можно забронировать</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
              Нажмите на подарок, чтобы отметить его за собой.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {wishlistItems.map((item) => {
              const reserved = wishlist.includes(item.id);

              return (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-black/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-medium">{item.title}</div>
                      <div className="mt-1 text-sm leading-6 text-white/58">{item.note}</div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        reserved ? "bg-emerald-400/15 text-emerald-200" : "bg-white/8 text-white/55"
                      }`}
                    >
                      {reserved ? "занято" : "свободно"}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggle(item.id, item.title)}
                    className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                      reserved
                        ? "border border-white/12 bg-white/7 text-white/90 hover:bg-white/10"
                        : "bg-white text-[#100d1b] hover:-translate-y-0.5"
                    }`}
                  >
                    {reserved ? "Снять" : "Забронировать"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-black/10 p-4 text-sm text-white/65">
            <span>Забронировано позиций</span>
            <span className="text-base font-semibold text-white">{wishlist.length}</span>
          </div>

          {notice && (
            <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
              {notice}
            </div>
          )}
        </div>
      </SectionCard>
    </section>
  );
}