/**
 * ProductPreview Component
 *
 * Showcase section with floating mockup and vibrant styling.
 */

import { motion } from "framer-motion";
import { TabbedProductShowcase } from "./showcase";
import { scrollReveal, viewportOnce } from "@/lib/animations";

export function ProductPreview() {
  return (
    <section id="demo" className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 0%, var(--green-a2) 0%, transparent 50%),
            var(--bg-primary)
          `,
        }}
      />

      <div className="container max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
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
            See it in action
          </motion.span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Built for how you{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, var(--green-9), var(--green-11))",
              }}
            >
              actually work
            </span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Watch how Citable streamlines your research workflow from start to finish.
          </p>
        </motion.div>

        {/* Product showcase */}
        <motion.div
          variants={scrollReveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <TabbedProductShowcase />
        </motion.div>
      </div>
    </section>
  );
}
