/**
 * LogoBar Component
 *
 * Animated trust strip with university logos.
 * Subtle infinite scroll animation for modern feel.
 */

import { motion } from "framer-motion";

const institutions = [
  "Stanford University",
  "MIT",
  "University of Oxford",
  "ETH Zürich",
  "Harvard University",
  "Caltech",
  "Cambridge",
  "Berkeley"
];

export function LogoBar() {
  return (
    <section
      className="py-10 border-b border-white/5"
      style={{
        background: "var(--bg-primary)",
      }}
    >
      <div className="container max-w-6xl mx-auto text-center">
        <p
          className="text-sm font-medium mb-8 uppercase tracking-widest opacity-60"
          style={{ color: "var(--text-secondary)" }}
        >
          Trusted by researchers at leading institutions
        </p>

        {/* Static Grid for Desktop / Scrolling for Mobile */}
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {institutions.map((name, index) => (
            <span
              key={index}
              className="text-lg sm:text-xl font-semibold font-serif"
              style={{ color: "var(--text-secondary)" }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoBar;
