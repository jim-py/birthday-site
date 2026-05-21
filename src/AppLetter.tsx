import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

type Letter = {
  name: string;
  title: string;
  body: string;
};

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

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [letterId, setLetterId] = useState<string | null>(null);

  useEffect(() => {
    const pathId = window.location.pathname.split("/").filter(Boolean)[0];
    setLetterId(pathId);
  }, []);

  const letter = letterId ? LETTERS[letterId] : null;

  if (!letter) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-neutral-900 text-white">
        Letter not found
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-neutral-900">
      {/* 9:16 Frame */}
      <div className="relative aspect-[9/16] h-[90vh] bg-gradient-to-b from-amber-100 via-amber-50 to-stone-200 shadow-2xl rounded-2xl overflow-hidden border border-stone-300">
        {/* Vintage paper texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00000022_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Envelope */}
        <motion.div
          initial={{ scale: 0.9, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            onClick={() => setIsOpen(true)}
            className="relative w-[80%] h-[45%] cursor-pointer
            bg-gradient-to-b from-stone-100 via-stone-50 to-stone-200
            border border-stone-300
            shadow-lg
            rounded-md
            before:content-[''] before:absolute before:inset-0
            before:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.8),transparent_60%)]
            before:opacity-40"
          >
            {/* Envelope flap */}
            <motion.div
              initial={{ rotateX: 0 }}
              animate={{ rotateX: isOpen ? 180 : 0 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="absolute top-0 left-0 w-full h-[55%] origin-top
              bg-gradient-to-b from-stone-200 to-stone-300
              border-b border-stone-300
              shadow-[inset_0_-10px_20px_rgba(0,0,0,0.08)]"
              style={{
                transformStyle: "preserve-3d",
                clipPath: "polygon(-5% 0, 105% 0, 50% 105%)",
              }}
            />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-0 top-1/2 w-full h-px bg-stone-300 opacity-40" />
              <div className="absolute top-0 left-1/2 w-px h-full bg-stone-300 opacity-20" />
            </div>
            {/* Seal */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: isOpen ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-10 h-10 rounded-full bg-amber-700 flex items-center justify-center shadow-md">
                <Mail size={18} className="text-white" />
              </div>
            </motion.div>

            {/* Letter */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{
                y: isOpen ? -20 : 40,
                opacity: isOpen ? 1 : 0,
              }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute inset-4 bg-white shadow-md border border-stone-200 rounded-sm p-4"
            >
              <div className="text-xs uppercase tracking-widest text-stone-400 mb-2">
                Приглашение
              </div>

              <div className="text-sm text-stone-700 leading-relaxed font-serif whitespace-pre-line">
                {letter.body}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
