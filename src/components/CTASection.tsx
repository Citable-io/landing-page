/**
 * CTASection Component
 *
 * Clean CTA section with waitlist form.
 */

import { motion } from "framer-motion";
import { WaitlistForm } from "./WaitlistForm";
import { CheckCircle } from "lucide-react";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

export function CTASection() {
  return (
    <section
      id="waitlist"
      className="relative py-20 md:py-28 px-4 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Subtle gradient accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 100%, var(--indigo-a3) 0%, transparent 60%),
            transparent
          `,
        }}
      />

      <motion.div
        className="relative z-10 container max-w-2xl mx-auto text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {/* Headline */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight"
          style={{ color: "var(--text-primary)" }}
          variants={staggerItem}
        >
          Ready to simplify your research?
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          className="text-lg mb-10 max-w-lg mx-auto"
          style={{ color: "var(--text-secondary)" }}
          variants={staggerItem}
        >
          Join researchers from leading universities who are already on the waitlist.
        </motion.p>

        {/* Waitlist form */}
        <motion.div className="flex justify-center mb-8" variants={staggerItem}>
          <WaitlistForm />
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          variants={staggerItem}
        >
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <CheckCircle className="w-4 h-4" style={{ color: "var(--success)" }} />
            <span>Free during beta</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <CheckCircle className="w-4 h-4" style={{ color: "var(--success)" }} />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <CheckCircle className="w-4 h-4" style={{ color: "var(--success)" }} />
            <span>Early access perks</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default CTASection;
