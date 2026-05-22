import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import imageTest from "../src/photos/КрышкаКонверта.png";
import DarkKonvert from "../src/photos/DarkKonvert.png";
import WaxPrint from "../src/photos/WaxPrint.png";
import Error404 from "./Funny404";
import { useNavigate } from 'react-router-dom'

/* ==========================================================================
   Types
========================================================================== */

type OpenState = "closed" | "opening" | "opened";

type Letter = {
  name: string;
  title: string;
  body: string;
};

/* ==========================================================================
   Static Data
========================================================================== */

const LETTERS: Record<string, Letter> = {
  "a2f05295-bea7-42d2-ae45-bbb21bed8660": {
    name: "Alice",
    title: "Vintage Letter #1",
    body: `
Дорогие Лиза и Миша,

Приглашаем Вас на день рождения!
Просим заполнить анкеты!

Ваша Ксюшка.
    `.trim(),
  },

  "b7c1f3a2-91c8-4f2e-9f2b-2f3a8c91d123": {
    name: "Bob",
    title: "Vintage Letter #2",
    body: `
Dear Bob,

This is Letter #2 assigned to your UUID.

Another sealed message from the archive.

Yours truly,
The Past
    `.trim(),
  },
};

/* ==========================================================================
   Utils (архитектурный слой анимации)
========================================================================== */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Единая последовательность анимации конверта.
 * Здесь вся "хореография" вынесена из handler-а.
 */
async function runEnvelopeSequence(params: {
  setOpenState: (s: OpenState) => void;
  setConvertOpened: (v: boolean) => void;
  setShowText: (v: boolean) => void;
  navigate: (path: string) => void;
}) {
  const { setOpenState, setConvertOpened, setShowText, navigate } = params;

  // старт анимации
  setOpenState("opening");

  // swap текстуры клапана
  await sleep(900);
  setConvertOpened(true);

  // завершение открытия
  await sleep(4100);
  setOpenState("opened");
  setShowText(true);
  
  await sleep(6000);

  navigate("/home");
}

/* ==========================================================================
   Loader
========================================================================== */

function Loader() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const [confetti] = useState(() =>
    Array.from({ length: 72 }).map((_, i) => {
      const size = 4 + Math.random() * 6;
      return {
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: 3.5 + Math.random() * 3.5,
        size,
        rotate: Math.random() * 360,
        x: (Math.random() - 0.5) * 120,
        drift: (Math.random() - 0.5) * 80,
        color:
          ["#ffffff", "#ffd166", "#ff6b6b", "#7dd3fc", "#c084fc"][
            Math.floor(Math.random() * 5)
          ],
      };
    })
  );

  const [fireworks] = useState(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: 12 + Math.random() * 76,
      top: 12 + Math.random() * 28,
      delay: Math.random() * 2.2,
      duration: 1.8 + Math.random() * 1.6,
      scale: 0.8 + Math.random() * 0.8,
      size: 70 + Math.random() * 60,
      hue: Math.random() * 360,
    }))
  );

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / 4000, 1);

      setProgress(p);

      setStage((prev) => {
        if (p > 0.45 && prev !== 1) return 1;
        return prev;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const texts = ["Вы получили письмо…", "Садитесь за стол…"];

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden text-white"
      style={{ backgroundColor: "#171717" }}
    >
      {/* фон */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.04)_50%,transparent_100%)]" />

      {/* мягкое мерцание */}
      <div className="absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20 blur-[1px]"
            style={{
              width: 4 + (i % 3),
              height: 4 + (i % 3),
              left: `${(i * 11) % 100}%`,
              top: `${(i * 17) % 100}%`,
            }}
            animate={{
              opacity: [0, 0.35, 0],
              scale: [0.8, 1.6, 0.8],
              x: [0, 10, 0],
              y: [0, -14, 0],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* конфетти */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {confetti.map((c) => (
          <motion.span
            key={c.id}
            className="absolute rounded-sm"
            style={{
              left: `${c.left}%`,
              top: "-10%",
              width: c.size,
              height: c.size * 0.45,
              backgroundColor: c.color,
              rotate: c.rotate,
              boxShadow: `0 0 10px ${c.color}55`,
            }}
            animate={{
              y: ["0vh", "115vh"],
              x: [0, c.x, c.drift],
              rotate: [c.rotate, c.rotate + 360],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: c.duration,
              delay: c.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* фейерверки */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {fireworks.map((fw) => (
          <motion.div
            key={fw.id}
            className="absolute"
            style={{
              left: `${fw.left}%`,
              top: `${fw.top}%`,
              width: fw.size,
              height: fw.size,
            }}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, fw.scale, 0.2], opacity: [0, 1, 0] }}
            transition={{
              duration: fw.duration,
              delay: fw.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, hsla(${fw.hue},100%,70%,0.95) 0%, hsla(${fw.hue},100%,65%,0.45) 18%, transparent 60%)`,
                filter: "blur(1px)",
              }}
            />
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 360) / 12;
              return (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 block rounded-full"
                  style={{
                    width: 4,
                    height: 4,
                    backgroundColor: `hsl(${fw.hue}, 100%, 70%)`,
                    boxShadow: `0 0 12px hsl(${fw.hue}, 100%, 70%)`,
                  }}
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{
                    x: [0, Math.cos((angle * Math.PI) / 180) * (fw.size * 0.55)],
                    y: [0, Math.sin((angle * Math.PI) / 180) * (fw.size * 0.55)],
                    opacity: [0, 1, 0],
                    scale: [0.7, 1.2, 0.7],
                  }}
                  transition={{
                    duration: fw.duration,
                    delay: fw.delay,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              );
            })}
          </motion.div>
        ))}
      </div>

      {/* центральный блок */}
      <motion.div
        initial={{ opacity: 0, scale: 0.86, y: 26 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-serif tracking-wide drop-shadow-[0_0_24px_rgba(255,255,255,0.16)]"
        >
          {texts[stage]}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 text-neutral-300"
        >
          Праздник уже совсем близко
        </motion.p>

        {/* праздничное кольцо */}
        <div className="mt-10 flex items-center justify-center">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 18px rgba(255,255,255,0.12)",
                "0 0 34px rgba(255,255,255,0.24)",
                "0 0 18px rgba(255,255,255,0.12)",
              ],
            }}
            transition={{
              rotate: { repeat: Infinity, duration: 2.8, ease: "linear" },
              scale: { repeat: Infinity, duration: 1.3, ease: "easeInOut" },
              boxShadow: { repeat: Infinity, duration: 1.3, ease: "easeInOut" },
            }}
            className="relative w-24 h-24 rounded-full border border-white/20 bg-white/5 flex items-center justify-center backdrop-blur-sm"
          >
            <div className="w-11 h-11 rounded-full bg-white/10 blur-[1px]" />
            <div className="absolute inset-2 rounded-full border border-white/10" />
          </motion.div>
        </div>

        {/* прогресс */}
        <div className="mt-10 w-72 mx-auto">
          <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-transparent via-white to-transparent"
              style={{
                transform: `scaleX(${progress})`,
                transformOrigin: "left",
              }}
            />
          </div>

          <div className="mt-2 text-xs text-neutral-400">
            {Math.round(progress * 100)}%
          </div>

        </div>
      </motion.div>

      {/* затемнение по краям */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.58)_72%)]" />
    </div>
  );
}

const ASSETS = [
  imageTest,
  DarkKonvert,
  WaxPrint,

  // фоновые текстуры
  "https://img.magnific.com/premium-photo/close-up-paper-envelope_223622-644.jpg",
  "https://img.magnific.com/premium-photo/old-grunge-parchment-paper-texture-background_118047-7213.jpg?w=2000",
];

function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(
    urls.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();

        img.src = src;

        img.onload = () => resolve();
        img.onerror = () => {
          // не валим весь загрузчик из-за одной картинки
          resolve();
        };
      });
    }),
  );
}

/* ==========================================================================
   Component
========================================================================== */

export default function AppLetter() {
  /* ========================================================================
     State
  ======================================================================== */

  const [convertOpened, setConvertOpened] = useState(false);
  const [openState, setOpenState] = useState<OpenState>("closed");

  const [showText, setShowText] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

const letterId = window.location.pathname.split("/").filter(Boolean)[0] ?? null;

const isValidUUID = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  /* ========================================================================
     Derived Data
  ======================================================================== */

  const letter = letterId ? LETTERS[letterId] : null;

  /* ========================================================================
     Effects
  ======================================================================== */

  useEffect(() => {
    if (openState !== "opened" || !letter) return;

    let index = 0;

    const interval = setInterval(() => {
      setDisplayedText(letter.body.slice(0, index + 1));
      index++;

      if (index >= letter.body.length) {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [openState, letter]);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const preload = preloadImages(ASSETS);

        const minDelay = new Promise((res) => setTimeout(res, 4000));

        await Promise.all([preload, minDelay]);

        if (isMounted) {
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ========================================================================
     Handlers
  ======================================================================== */

  const handleOpenEnvelope = () => {
    if (openState !== "closed") return;

    runEnvelopeSequence({
      setOpenState,
      setConvertOpened,
      setShowText,
      navigate,
    });
  };

  /* ========================================================================
     Empty State
  ======================================================================== */

if (!letterId || !isValidUUID(letterId)) {
  return <Error404 />;
}

  if (!letter) {
    return <Error404 />;
  }

  /* ========================================================================
     Render
  ======================================================================== */
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-neutral-900">
      {/* Основной контейнер 9:16 */}
      <div
        className="
          relative
          aspect-[9/16]
          h-[90vh]
          overflow-hidden
          rounded-2xl
          border border-stone-300
          bg-gradient-to-b from-amber-100 via-amber-50 to-stone-200
          shadow-2xl
        "
        style={{
          perspective: 2000,
          backgroundImage:
            "url('https://png.pngtree.com/thumb_back/fw800/background/20231015/pngtree-vintage-wood-table-texture-background-image_13634695.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Texture Overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00000022_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Envelope Scene */}
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Envelope Body */}
          <div
            onClick={handleOpenEnvelope}
            className="
              relative
              w-[80%]
              h-[30%]
              cursor-pointer
              rounded-md
              border border-stone-300
              bg-gradient-to-b from-stone-100 via-stone-50 to-stone-200
              shadow-lg
              before:content-['']
              before:absolute
              before:inset-0
              before:opacity-40
              before:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.8),transparent_60%)]
            "
            style={{
              backgroundImage:
                "url('https://img.magnific.com/premium-photo/close-up-paper-envelope_223622-644.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Animated Flap */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{
                rotateX: openState !== "closed" ? 180 : 0,
                backgroundImage: !convertOpened
                  ? `url(${imageTest})`
                  : `url(${DarkKonvert})`,
              }}
              transition={{
                duration: 1.8,
                times: [0, 1],
                ease: "easeInOut",
              }}
              className="
                absolute
                top-0
                left-0
                z-10
                h-[55%]
                w-full
                origin-top
                border-b border-stone-300
                shadow-[inset_0_-10px_20px_rgba(0,0,0,0.08)]
              "
              style={{
                transformStyle: "preserve-3d",
                clipPath: "polygon(-5% 0, 105% 0, 50% 105%)",
                backgroundImage: `url(${imageTest})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <div
              className="
                absolute
                inset-0
                z-12
                border border-stone-300
                bg-gradient-to-b
                from-stone-100
                to-stone-200
              "
              style={{
                clipPath:
                  "polygon(0 5%, 50% 56%, 53% 56%, 100% 2%, 100% 100%, 0 100%)",
                backgroundImage:
                  "url('https://img.magnific.com/premium-photo/close-up-paper-envelope_223622-644.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Static Flap Shadow */}
            <motion.div
              initial={{ rotateX: 0 }}
              className="
                absolute
                top-0
                left-0
                h-[55%]
                w-full
                origin-top
                scale-y-[1.03]
                border-b border-stone-300
                bg-gradient-to-b from-stone-200 to-stone-300
                shadow-[inset_0_-10px_20px_rgba(0,0,0,0.08)]
              "
              style={{
                transformStyle: "preserve-3d",
                clipPath: "polygon(-5% 0, 105% 0, 50% 105%)",
                backgroundImage: `url(${DarkKonvert})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Wax Seal */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{
                x: openState === "closed" ? 0 : 100,
                y: openState === "closed" ? 0 : 200,
              }}
              transition={{
                delay: 0.2,
                duration: 0.5,
              }}
              className="
                absolute
                top-24
                left-1/2
                z-20
                -translate-x-1/2
                -translate-y-1/2
              "
              style={{
                backgroundImage: `url(${WaxPrint})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="opacity-0 flex h-19 w-19 items-center justify-center rounded-full bg-amber-700 shadow-md">
                <Mail size={18} className="text-white" />
              </div>
            </motion.div>

            {/* Letter */}
            <motion.div
              initial={{
                y: 0,
                opacity: 1,
                scaleY: 0.5,
                zIndex: 1,
              }}
              animate={{
                zIndex: convertOpened ? 11 : 1,
                y: openState === "closed" ? 0 : -140,
                scaleY: openState === "closed" ? 0.5 : 1,
              }}
              transition={{
                y: {
                  delay: 2,
                  duration: 0.9,
                  ease: "easeOut",
                },
                opacity: {
                  delay: 2,
                  duration: 0.4,
                },
                scaleY: {
                  delay: 3,
                  duration: 0.7,
                  ease: "easeInOut",
                },
              }}
              style={{
                transformOrigin: "center",
                backgroundImage:
                  "url('https://img.magnific.com/premium-photo/old-grunge-parchment-paper-texture-background_118047-7213.jpg?w=2000')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="
                absolute
                left-1/2
                top-1/2
                z-1
                h-[150%]
                w-[78%]
                -translate-x-1/2
                -translate-y-1/2
                overflow-hidden
                rounded-sm
                border border-stone-200
                bg-white
                p-6
                shadow-2xl
              "
            >
              {/* Letter Header */}
              <div className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-400">
                Приглашение
              </div>

              {/* Letter Content */}
              {showText && (
                <div className="whitespace-pre-line font-serif text-[15px] leading-relaxed text-stone-700">
                  {displayedText}
                  <span className="animate-pulse">|</span>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
