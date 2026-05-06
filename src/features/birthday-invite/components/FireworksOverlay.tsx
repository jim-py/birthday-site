import { motion } from "framer-motion";

export function FireworksOverlay() {
  const fireworks = [
    { left: "8%", top: "16%", delay: 0 },
    { left: "78%", top: "10%", delay: 0.7 },
    { left: "18%", top: "72%", delay: 1.1 },
    { left: "88%", top: "68%", delay: 1.6 },
    { left: "48%", top: "7%", delay: 2.1 },
  ];

  return (
    <>
      {fireworks.map((fw, idx) => (
        <Firework key={idx} left={fw.left} top={fw.top} delay={fw.delay} />
      ))}
    </>
  );
}

function Firework({ left, top, delay }: { left: string; top: string; delay: number }) {
  const particles = [
    { dx: -54, dy: -18 },
    { dx: -28, dy: -44 },
    { dx: 0, dy: -58 },
    { dx: 28, dy: -44 },
    { dx: 54, dy: -18 },
    { dx: 46, dy: 20 },
    { dx: 20, dy: 50 },
    { dx: -18, dy: 52 },
    { dx: -46, dy: 22 },
  ];

  return (
    <div className="pointer-events-none absolute z-0" style={{ left, top }}>
      <motion.div
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-white/90 shadow-[0_0_22px_rgba(255,255,255,0.95)]"
        animate={{ scale: [0.8, 2.2, 0.8], opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 2.8, repeat: Infinity, delay, ease: "easeOut" }}
      />
      {particles.map((p, idx) => (
        <motion.span
          key={idx}
          className="absolute left-0 top-0 block h-1.5 w-1.5 rounded-full"
          style={{
            background: idx % 4 === 0 ? "#f472b6" : idx % 4 === 1 ? "#fbbf24" : idx % 4 === 2 ? "#c084fc" : "#fff",
            boxShadow: "0 0 14px rgba(255,255,255,0.9)",
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
          animate={{ x: p.dx, y: p.dy, opacity: [0, 1, 0], scale: [0.4, 1.2, 0.6] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: delay + idx * 0.04, ease: "easeOut" }}
        />
      ))}
      <motion.div
        className="absolute left-0 top-0 h-20 w-20 rounded-full border border-white/15"
        animate={{ scale: [0.2, 1.8, 0.2], opacity: [0, 0.6, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, delay, ease: "easeOut" }}
      />
    </div>
  );
}