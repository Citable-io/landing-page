/**
 * Header Component
 *
 * Floating glassmorphism header - minimal and clean.
 */

import { motion } from "framer-motion";
import CitableIcon from "@/components/CitableIcon";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div
          className="flex items-center justify-between h-14 px-4 rounded-2xl"
          style={{
            background: "color-mix(in srgb, var(--bg-primary) 70%, transparent)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 4px 30px var(--mauve-a3)",
          }}
        >
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CitableIcon className="w-24 sm:w-28" />
          </motion.a>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
