/**
 * LogoBar Component
 *
 * Animated trust strip with university logos.
 * Subtle infinite scroll animation for modern feel.
 */

import { motion } from "framer-motion";

const institutions = [
  { name: "Stanford", logo: "S" },
  { name: "MIT", logo: "MIT" },
  { name: "Oxford", logo: "O" },
  { name: "Berkeley", logo: "B" },
  { name: "Cambridge", logo: "C" },
  { name: "ETH Zürich", logo: "ETH" },
  { name: "Harvard", logo: "H" },
  { name: "Caltech", logo: "CT" },
];

// Duplicate for seamless loop
const allInstitutions = [...institutions, ...institutions];

export function LogoBar() {
  return (
    <section
      className="py-6 px-4 overflow-hidden"
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="container max-w-6xl mx-auto">
        <p
          className="text-center text-sm mb-5"
          style={{ color: "var(--text-secondary)" }}
        >
          Trusted by researchers at leading institutions
        </p>

        {/* Scrolling container */}
        <div className="relative">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to right, var(--bg-secondary), transparent)",
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{
              background: "linear-gradient(to left, var(--bg-secondary), transparent)",
            }}
          />

          {/* Animated logos */}
          <motion.div
            className="flex items-center gap-12"
            animate={{
              x: [0, -50 * institutions.length],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {allInstitutions.map((institution, index) => (
              <div
                key={`${institution.name}-${index}`}
                className="flex items-center gap-3 flex-shrink-0"
              >
                {/* Logo circle */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-default)",
                    color: "var(--text-secondary)",
                  }}
                >
                  {institution.logo}
                </div>
                <span
                  className="text-sm font-medium whitespace-nowrap"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {institution.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LogoBar;
