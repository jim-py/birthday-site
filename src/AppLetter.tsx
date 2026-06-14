import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import CapConvert from "../src/photos/CapConvert.png";
import DarkKonvert from "../src/photos/DarkKonvert.png";
import WaxPrint from "../src/photos/WaxPrint.png";
import LizaMisha from "../src/photos/LizaMisha.jpg";
import AlenaIvan from "../src/photos/AlenaIvan.jpg";
import Regina from "../src/photos/Regina.jpg";
import Nastya from "../src/photos/Nastya.jpg";
import Denis from "../src/photos/Denis.jpg";
import PaperEnvelope from "../src/photos/PaperEnvelope.avif";
import BackgroundBlack from "../src/photos/BackgroundBlack.jpg";
import Error404 from "./Funny404";
import { useNavigate } from "react-router-dom";

/* ==========================================================================
   Types
========================================================================== */

type OpenState = "closed" | "opening" | "opened";

type ZState = "closed" | "opening" | "opened";

type Letter = {
  letterPhoto: string;
};

/* ==========================================================================
   Static Data
========================================================================== */

const LETTERS: Record<string, Letter> = {
  "a2f05295-bea7-42d2-ae45-bbb21bed8660": {
    letterPhoto: LizaMisha,
  },

  "b7c1f3a2-91c8-4f2e-9f2b-2f3a8c91d123": {
    letterPhoto: AlenaIvan,
  },
  
  "d9a22006-d0e6-4e56-a9ab-ba25d0346d56": {
    letterPhoto: Regina,
  },
  
  "b3a72609-c528-4a74-8e98-43000f06075d": {
    letterPhoto: Nastya,
  },
  
  "a53c1ac3-b3e7-472f-a418-0826cdcd743a": {
    letterPhoto: Denis,
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
  setZState: (v: ZState) => void;
  setCanNavigate: (v: boolean) => void;
}) {
  const { setOpenState, setConvertOpened, setZState, setCanNavigate } =
    params;

  // старт анимации
  setOpenState("opening");

  // swap текстуры клапана
  await sleep(900);
  setConvertOpened(true);
  setZState("opening");

  await sleep(2000)
  setZState("opened");

  // завершение открытия
  await sleep(1500);
  setOpenState("opened");

  await sleep(5000);
  setCanNavigate(true);

  // navigate(`/home/${letterId}`);
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
        color: ["#ffffff", "#ffd166", "#ff6b6b", "#7dd3fc", "#c084fc"][
          Math.floor(Math.random() * 5)
        ],
      };
    }),
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
    })),
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

  const texts = ["Вы получили письмо…", "Вы получили письмо…"];

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
                    x: [
                      0,
                      Math.cos((angle * Math.PI) / 180) * (fw.size * 0.55),
                    ],
                    y: [
                      0,
                      Math.sin((angle * Math.PI) / 180) * (fw.size * 0.55),
                    ],
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
          className="mt-4 text-neutral-300 font-serif"
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
  CapConvert,
  DarkKonvert,
  WaxPrint,

  PaperEnvelope,
  BackgroundBlack,

  LizaMisha,
  AlenaIvan,
  Regina,
  Nastya,
  Denis,
];

function preloadImages(urls: string[]): Promise<void[]> {
  return Promise.all(
    urls.map((src) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();

        img.src = src;
        console.log(reject);

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
  const [ZState, setZState] = useState<ZState>("closed");
  const [canNavigate, setCanNavigate] = useState(false);

  const letterId =
    window.location.pathname.split("/").filter(Boolean)[0] ?? null;

  const isValidUUID = (id: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id,
    );

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /* ========================================================================
     Derived Data
  ======================================================================== */

  const letter = letterId ? LETTERS[letterId] : null;

  /* ========================================================================
     Effects
  ======================================================================== */

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
      setZState,
      setCanNavigate,
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
    <div className=" flex items-center justify-center bg-black">
      {/* Основной контейнер 9:16 */}
      <div
        className="
          relative
          aspect-[9/16]
          h-[100dvh]
          overflow-hidden
          bg-gradient-to-b from-amber-100 via-amber-50 to-stone-200
          shadow-2xl
        "
        style={{
          perspective: 2000,
          backgroundImage: `url(${BackgroundBlack})`,
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
              w-[300px]
              h-[200px]
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
              backgroundImage: `url(${PaperEnvelope})`,
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
                  ? `url(${CapConvert})`
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
                backgroundImage: `url(${CapConvert})`,
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
                backgroundImage: `url(${PaperEnvelope})`,
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
                top-25
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
                scaleY: 0.3,
                zIndex: 1,
              }}
                onClick={() => {
    if (canNavigate) {
      navigate(`/home/${letterId}`);
    }
  }}
              animate={{
                zIndex: ZState === "closed" ? 1 : ZState === "opening" ? 11 : ZState === "opened" ? 110 : 1,
                y: openState === "closed" ? 0 : [0, -180, 0],
                scaleY: openState === "closed" ? 0.3 : [0.3, 0.3, 0.3, 1],
              }}
              transition={{
                y: {
                  delay: 2,
                  duration: 1.6,
                  times: [0, 0.45, 1],
                  ease: ["easeOut", "easeInOut"],
                },

                scaleY: {
                  duration: 4,
                  times: [0, 0.7, 0.85, 1],
                  ease: "easeInOut",
                },
                opacity: {
                  delay: 2,
                  duration: 0.4,
                },
              }}
              style={{
                transformOrigin: "center",
                backgroundImage: `url(${letter?.letterPhoto})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: "Montserrat, sans-serif",
              }}
              className="
                absolute
                left-1/2
                top-1/2
                z-1
                h-[230%]
                w-[90%]
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
