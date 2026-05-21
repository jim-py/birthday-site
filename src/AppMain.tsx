import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
} from "lucide-react";

const images = [
  "https://sun9-9.vkuserphoto.ru/s/v1/ig2/dW3JFi_aiSvyfAdQjJQCoo0bPIFQjNxuhwhJ5VLdEz9fAoNNHWzY8thLc_JZQ_rd2TVUe8BW9NLpgl8vAuLpHwBm.jpg?quality=95&as=32x57,48x85,72x128,108x192,160x284,240x427,360x640,480x853,540x960,640x1138,720x1280,1080x1920,1280x2276,1440x2560&from=bu&cs=1440x0",
  "https://sun9-15.vkuserphoto.ru/s/v1/ig2/saYopRi8Nm74KW9F8b8uwwQsURPbRKHH6RZY-jyU3UkSO25wR5qobjwgcKmucnhn_VF29zleuF5WL4tM8y5VVdGE.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu&cs=2560x0",
  "https://sun9-18.vkuserphoto.ru/s/v1/ig2/BZWL0MYwAxEV1ISNqXtlcZ18VHMxOwgj8kMJk8dw078Zr_FLPdAOATq1z9l1jhp7qwI6pgVsc6m_v-6MA-lXZWav.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu&cs=2560x0",
  "https://sun9-25.vkuserphoto.ru/s/v1/ig2/r-q9HQETlam3ZckoezRobqlpS9yaA0pIJrrR-YDNjLhAOqNz_9djAAqhuJoD8fhQtBn_q3MgYslfyvcd46FkdfHx.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu&cs=2560x0",
  "https://sun9-88.vkuserphoto.ru/s/v1/ig2/NIM86KgynSb_FgOQq2ukSSFne5vtXQvILnJ75Lgaj3Hc7GVAJ4WJlwfuZ1PZWQ0GVBzjyjcMOHQaaznb1laL5WTK.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,2560x1920&from=bu&cs=2560x0",
  "https://sun9-34.vkuserphoto.ru/s/v1/ig2/2mjayV8p0CGGITAxu3bpMFkJ3qAlw8wgKkc1KrxuZQT394XGAHPaZNGAmu_B6--7MF7J8ZF7P4zQGt7sAI2ZYX5R.jpg?quality=95&as=32x57,48x85,72x128,108x192,160x285,240x427,360x641,480x855,540x961,640x1139,719x1280&from=bu&cs=719x0",
];

const EVENT_DATE = new Date("2026-06-20T18:00:00");

function getTimeLeft() {
  const difference = EVENT_DATE.getTime() - Date.now();

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function CountdownCard({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="
        rounded-3xl
        border
        border-black/10
        bg-white/70
        p-5
        text-center
        shadow-lg
        backdrop-blur-xl
        dark:border-white/10
        dark:bg-white/5
      "
    >
      <div
        className="
          text-4xl
          font-black
          tracking-tight
          text-zinc-900
          dark:text-white
          md:text-5xl
        "
      >
        {String(value).padStart(2, "0")}
      </div>

      <div
        className="
          mt-2
          text-xs
          uppercase
          tracking-[0.25em]
          text-zinc-500
          dark:text-zinc-400
        "
      >
        {label}
      </div>
    </motion.div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <CountdownCard value={timeLeft.days} label="Дней" />
      <CountdownCard value={timeLeft.hours} label="Часов" />
      <CountdownCard value={timeLeft.minutes} label="Минут" />
      <CountdownCard value={timeLeft.seconds} label="Секунд" />
    </div>
  );
}

function Carousel() {
  const [index, setIndex] = useState(0);

  const startX = useRef(0);
  const startY = useRef(0);

  const isLocked = useRef(false);
  const direction = useRef<"horizontal" | "vertical" | null>(null);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // AUTO PLAY
  useEffect(() => {
    const id = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(id);
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;

    direction.current = null;
    isLocked.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    const dx = x - startX.current;
    const dy = y - startY.current;

    // ещё не определили направление
    if (!direction.current) {
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 8) {
        direction.current = "horizontal";
        isLocked.current = true;
      } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
        direction.current = "vertical";
        isLocked.current = false;
      }
    }

    // если горизонтальный свайп — блокируем скролл страницы
    if (isLocked.current) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const endX = e.changedTouches[0].clientX;
    const dx = startX.current - endX;

    if (direction.current !== "horizontal") return;

    if (dx > 50) nextSlide();
    if (dx < -50) prevSlide();
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="
        relative
        overflow-hidden
        rounded-[34px]
        border
        border-black/10
        bg-white
        shadow-2xl
        select-none
        dark:border-white/10
        dark:bg-zinc-900
      "
      style={{
        touchAction: "pan-y",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          draggable={false}
          className="
            h-[680px]
            w-full
            object-cover
            pointer-events-none
            md:h-[620px]
          "
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* controls */}
      <div className="absolute left-0 right-0 top-0 flex justify-end p-4 md:p-6">

        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="rounded-full bg-black/40 p-3 text-white backdrop-blur-md"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="rounded-full bg-black/40 p-3 text-white backdrop-blur-md"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* caption */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h1 className="text-4xl font-black text-white md:text-6xl">
          День рождения
        </h1>

        <p className="mt-3 max-w-xl text-sm text-zinc-200 md:text-base">
          Атмосферное мероприятие, музыка и красивые локации.
        </p>

        <div className="mt-5 flex justify-center gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-white" : "w-2.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div
      className="
        min-h-screen
        bg-zinc-100
        px-4
        py-6
        text-zinc-900
        transition-colors
        duration-300
        dark:bg-black
        dark:text-white
        md:px-8
        md:py-10
      "
    >
      <div className="mx-auto max-w-6xl">
        <Carousel />

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="
            mt-8
            rounded-[34px]
            border
            border-black/10
            bg-white/70
            p-6
            shadow-xl
            backdrop-blur-xl
            dark:border-white/10
            dark:bg-white/5
            md:p-8
          "
        >
          <div
            className="
              flex
              flex-col
              gap-6
              md:flex-row
              md:items-center
              md:justify-between
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-zinc-500
                  dark:text-zinc-400
                "
              >
                <CalendarDays size={18} />

                <span>Дата мероприятия</span>
              </div>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-black
                  md:text-5xl
                "
              >
                20 июня 2026 · 18:00
              </h2>
            </div>

            <div
              className="
                flex
                flex-col
                gap-4
                md:items-end
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-zinc-700
                  dark:text-zinc-200
                "
              >
                <MapPin size={18} />

                <span>
                  Berlin Event Hall, Alexanderplatz 8,
                  Berlin
                </span>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-zinc-500
                  dark:text-zinc-400
                "
              >
                <Clock3 size={16} />

                <span>До начала мероприятия</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Countdown />
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default App;