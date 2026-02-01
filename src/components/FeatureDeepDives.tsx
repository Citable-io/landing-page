/**
 * FeatureDeepDives Component
 *
 * Vibrant feature cards with glassmorphism, bold module colors,
 * and playful hover interactions.
 */

import { motion } from "framer-motion";
import { BookOpen, Edit3, Search, Sparkles, Zap, Shield } from "lucide-react";
import {
  scrollReveal,
  staggerContainer,
  staggerItem,
  viewportOnce,
} from "@/lib/animations";

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bullets: string[];
  module: "bibliography" | "manuscripts" | "discover";
  gradient: string;
  accentIcon: React.ReactNode;
}

const features: Feature[] = [
  {
    id: "bibliography",
    title: "Organize Your Library",
    description:
      "Import, annotate, and manage your references with powerful organization tools.",
    icon: <BookOpen className="w-7 h-7" />,
    bullets: [
      "Drag-and-drop PDF import with automatic metadata",
      "Highlight and annotate with synchronized notes",
      "Smart collections and tags",
      "Full-text search across everything",
    ],
    module: "bibliography",
    gradient: "linear-gradient(135deg, var(--green-9) 0%, var(--green-10) 100%)",
    accentIcon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: "writing",
    title: "Write with Confidence",
    description:
      "A powerful LaTeX editor with live preview, built for academic writing.",
    icon: <Edit3 className="w-7 h-7" />,
    bullets: [
      "Side-by-side editor with instant preview",
      "Rich formatting toolbar for LaTeX",
      "Auto-save and version history",
      "Export to PDF, Word, or share via link",
    ],
    module: "manuscripts",
    gradient: "linear-gradient(135deg, var(--green-9) 0%, var(--green-10) 100%)",
    accentIcon: <Zap className="w-4 h-4" />,
  },
  {
    id: "discovery",
    title: "Discover Connections",
    description:
      "Find related papers and explore citation networks to deepen your research.",
    icon: <Search className="w-7 h-7" />,
    bullets: [
      "Visual citation graphs for paper relationships",
      "AI-powered recommendations",
      "One-click import of discovered papers",
      "Track citation counts and trends",
    ],
    module: "discover",
    gradient: "linear-gradient(135deg, var(--green-9) 0%, var(--green-10) 100%)",
    accentIcon: <Shield className="w-4 h-4" />,
  },
];

const moduleStyles = {
  bibliography: {
    accent: "var(--biblio)",
    tint: "var(--green-a3)",
    light: "var(--green-4)",
    text: "var(--green-11)",
    border: "var(--green-a5)",
    glow: "var(--green-a4)",
  },
  manuscripts: {
    accent: "var(--manu)",
    tint: "var(--green-a3)",
    light: "var(--green-4)",
    text: "var(--green-11)",
    border: "var(--green-a5)",
    glow: "var(--green-a4)",
  },
  discover: {
    accent: "var(--discover)",
    tint: "var(--green-a3)",
    light: "var(--green-4)",
    text: "var(--green-11)",
    border: "var(--green-a5)",
    glow: "var(--green-a4)",
  },
};

export function FeatureDeepDives() {
  return (
    <section className="py-24 md:py-32 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 0% 50%, var(--green-a2) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 100% 50%, var(--green-a2) 0%, transparent 50%),
            var(--bg-primary)
          `,
        }}
      />

      <div className="container max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6"
            style={{
              background: "var(--green-a3)",
              color: "var(--green-11)",
              border: "1px solid var(--green-a5)",
            }}
          >
            Everything in one place
          </motion.span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Three tools.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, var(--green-9), var(--green-11))",
              }}
            >
              One workflow.
            </span>
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Stop switching between apps. Citable brings together the tools
            researchers actually use into one seamless workspace.
          </p>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {features.map((feature, index) => {
            const styles = moduleStyles[feature.module];

            return (
              <motion.div
                key={feature.id}
                className="group relative rounded-2xl p-6 lg:p-8 transition-all duration-500"
                style={{
                  background: "color-mix(in srgb, var(--card-bg) 70%, transparent)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${styles.border}`,
                }}
                variants={staggerItem}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${styles.glow}, transparent 40%)`,
                  }}
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${styles.accent}, transparent)`,
                    opacity: 0.5,
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: feature.gradient,
                    color: "white",
                    boxShadow: `0 4px 20px ${styles.glow}`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 5,
                  }}
                >
                  {feature.icon}
                  {/* Floating accent */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{
                      background: "var(--card-bg)",
                      border: `1px solid ${styles.border}`,
                      color: styles.accent,
                    }}
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    {feature.accentIcon}
                  </motion.div>
                </motion.div>

                {/* Title */}
                <h3
                  className="text-xl lg:text-2xl font-semibold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm lg:text-base mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {feature.description}
                </p>

                {/* Bullets */}
                <ul className="space-y-3">
                  {feature.bullets.map((bullet, bulletIndex) => (
                    <motion.li
                      key={bulletIndex}
                      className="flex items-start gap-3 text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * bulletIndex }}
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{
                          background: styles.tint,
                          color: styles.accent,
                        }}
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <span style={{ color: "var(--text-secondary)" }}>
                        {bullet}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Learn more link */}
                <motion.div
                  className="mt-6 pt-6"
                  style={{ borderTop: `1px solid ${styles.border}` }}
                >
                  <button
                    className="flex items-center gap-2 text-sm font-medium group/link"
                    style={{ color: styles.text }}
                  >
                    Learn more
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      whileHover={{ x: 4 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </motion.svg>
                  </button>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default FeatureDeepDives;
