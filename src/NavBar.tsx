import { motion } from "framer-motion";
import {
  Home,
  Music,
  Heart,
  User,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const items = [
  { id: "home", icon: Home, path: "/home" },
  { id: "music", icon: Music, path: "/music" },
  { id: "wishlist", icon: Heart, path: "/wishlist" },
  { id: "profile", icon: User, path: "/profile" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  return (
    <div className="fixed bottom-4 left-0 right-0 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <div
          className="flex items-center gap-2 px-3 scale-[1.3] py-2 rounded-full
                     bg-white/10 dark:bg-black/30 backdrop-blur-xl
                     border border-white/20 shadow-lg"
        >
          {items.map((item) => {
            const Icon = item.icon;

            const isActive = location.pathname.startsWith(item.path);

            return (
              <motion.button
                key={item.id}
                onClick={() => navigate(`${item.path}/${id}`)}
                whileTap={{ scale: 0.85 }}
                className="relative flex items-center justify-center w-11 h-11 rounded-full"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/20 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}

                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/60"
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}