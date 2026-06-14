import { Bookmark, Gift } from "lucide-react";
import { motion } from "framer-motion";
import BottomNav from "./NavBar"

function Wishlist() {

  return (
    <div className="pb-20 min-h-screen bg-zinc-100 text-zinc-900 transition-colors dark:bg-zinc-950 dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-zinc-900 p-3 text-white dark:bg-white dark:text-black">
            <Bookmark size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Wishlist</h1>

            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Список желаемых товаров
            </p>
          </div>
        </div>

    <div className="flex items-center justify-center">
      <motion.a
        href="https://ohmywishes.com/users/babkina.kseniya11"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-white shadow-2xl backdrop-blur-xl transition-colors duration-300 hover:bg-white/20"
      >
        <motion.div
          initial={{ rotate: 0 }}
          whileHover={{ rotate: -12 }}
          transition={{ type: 'spring', stiffness: 260, damping: 14 }}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20"
        >
          <Gift className="h-6 w-6 text-emerald-400" />
        </motion.div>

        <div className="flex flex-col">
          <span className="text-lg font-semibold tracking-wide">
            Открыть вишлист
          </span>
        </div>
      </motion.a>
    </div>      </div>

      <BottomNav />
    </div>
  );
}

export default Wishlist;
