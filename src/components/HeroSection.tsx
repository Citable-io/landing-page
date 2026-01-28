/**
 * HeroSection Component
 *
 * Vercel-style: Bold centered headline + dual CTAs.
 * Compact enough to show logo bar on first screen.
 */

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-28 pb-16 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -10%, var(--indigo-4) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 0% 50%, var(--teal-3) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 100% 50%, var(--purple-3) 0%, transparent 50%),
              var(--bg-primary)
            `,
          }}
        />

        {/* Subtle floating orb */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, var(--indigo-5) 0%, transparent 70%)",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            filter: "blur(60px)",
          }}
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-5 tracking-tight"
            style={{ color: "var(--text-primary)" }}
            variants={staggerItem}
          >
            Research,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, var(--indigo-11) 0%, var(--purple-11) 50%, var(--teal-11) 100%)",
              }}
            >
              untangled
            </span>
            .
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl sm:text-2xl max-w-2xl mx-auto mb-8"
            style={{ color: "var(--text-secondary)" }}
            variants={staggerItem}
          >
            Your bibliography, writing, and discovery —{" "}
            <span style={{ color: "var(--text-primary)" }}>finally together</span>.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={staggerItem}
          >
            {/* Primary CTA */}
            <motion.button
              onClick={scrollToWaitlist}
              className="h-12 px-6 rounded-xl font-semibold text-base transition-all flex items-center gap-2"
              style={{
                background: "var(--indigo-9)",
                color: "white",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Beta
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              className="h-12 px-6 rounded-xl font-semibold text-base transition-all flex items-center gap-2"
              style={{
                background: "transparent",
                color: "var(--text-primary)",
                border: "1px solid var(--border-default)",
              }}
              whileHover={{
                background: "var(--bg-hover)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-4 h-4" />
              Watch Demo
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
