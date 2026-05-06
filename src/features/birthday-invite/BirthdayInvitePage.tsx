import { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { useBirthdayTheme } from "./hooks/useBirthdayTheme";
import { useCountdown } from "./hooks/useCountdown";
import { EVENT_DATE } from "./constants";
import { Panel } from "./components/layout";
import { FireworksOverlay } from "./components/FireworksOverlay";
import { Hero } from "./sections/Hero";
import { AtmospherePanel } from "./sections/AtmospherePanel";
import { ProgramPanel } from "./sections/ProgramPanel";
import { DrinksPanel } from "./sections/DrinksPanel";
import { WishlistPanel } from "./sections/WishlistPanel";
import { RsvpPanel } from "./sections/RsvpPanel";
import { ClosingPanel } from "./sections/ClosingPanel";

export default function BirthdayInvitePage() {
  useBirthdayTheme();

  const countdown = useCountdown(EVENT_DATE);
  const reduceMotion = useReducedMotion();

  const [selectedDrinks, setSelectedDrinks] = useState<string[]>([]);
  const [customDrinkEnabled, setCustomDrinkEnabled] = useState(false);
  const [customDrink, setCustomDrink] = useState("");
  const [drinkSent, setDrinkSent] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [wishlistNotice, setWishlistNotice] = useState<string>("");

  useEffect(() => {
    if (!drinkSent) return;
    const t = window.setTimeout(() => setDrinkSent(false), 2500);
    return () => window.clearTimeout(t);
  }, [drinkSent]);

  useEffect(() => {
    if (!wishlistNotice) return;
    const t = window.setTimeout(() => setWishlistNotice(""), 2400);
    return () => window.clearTimeout(t);
  }, [wishlistNotice]);

  const toggleDrink = (drink: string) => {
    setDrinkSent(false);
    setSelectedDrinks((prev) =>
      prev.includes(drink) ? prev.filter((i) => i !== drink) : [...prev, drink],
    );
  };

  const toggleWishlistItem = (id: string, title: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(id);
      setWishlistNotice(exists ? `Бронь снята: ${title}` : `Подарок забронирован: ${title}`);
      return exists ? prev.filter((i) => i !== id) : [...prev, id];
    });
  };

  return (
    <div className="min-h-[100dvh] overflow-hidden bg-[#09070f] text-white">
      <div
        className="relative isolate min-h-[100dvh] w-full overflow-x-hidden overflow-y-auto lg:h-[100dvh] lg:overflow-x-auto lg:overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_35%),radial-gradient(circle_at_20%_20%,_rgba(255,74,170,0.20),_transparent_28%),radial-gradient(circle_at_80%_10%,_rgba(126,87,255,0.18),_transparent_24%),radial-gradient(circle_at_80%_80%,_rgba(255,183,77,0.12),_transparent_22%),linear-gradient(180deg,#09070f_0%,#120f1f_45%,#09070f_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:48px_48px]" />

        {!reduceMotion && <FireworksOverlay />}

        <div className="relative flex min-h-[100dvh] w-full flex-col items-stretch lg:min-w-max lg:flex-row">
          <Panel className="w-full lg:w-[100vw]">
            <Hero countdown={countdown} />
          </Panel>

          <Panel className="w-full lg:w-[100vw]">
            <AtmospherePanel />
          </Panel>

          <Panel className="w-full lg:w-[100vw]">
            <ProgramPanel />
          </Panel>

          <Panel className="w-full lg:w-[100vw]">
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

          <Panel className="w-full lg:w-[100vw]">
            <WishlistPanel wishlist={wishlist} notice={wishlistNotice} onToggle={toggleWishlistItem} />
          </Panel>

          <Panel className="w-full lg:w-[100vw]">
            <RsvpPanel />
          </Panel>

          <Panel className="w-full lg:w-[100vw]">
            <ClosingPanel />
          </Panel>
        </div>
      </div>
    </div>
  );
}