import { motion } from "framer-motion";

export default function Error404() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-neutral-900 text-white">
      
      {/* фон как в Loader */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)]" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:18px_18px]" />

      {/* мягкие частицы */}
      <div className="absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/30 rounded-full blur-[1px]"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 19) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* центр */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        <motion.div
          animate={{
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-6xl font-serif tracking-widest drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
        >
          404
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-sm text-neutral-300 tracking-[0.3em] uppercase"
        >
          You broke the internet. Congratulations.
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="h-[1px] bg-white/20 mx-auto mt-6"
        />
      </motion.div>
    </div>
  );
}