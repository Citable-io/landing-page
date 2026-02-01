/**
 * HeroSection Component
 *
 * Vercel-style: Bold centered headline + dual CTAs.
 * Full viewport with trust strip at bottom.
 */

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const institutions = [
  "Stanford",
  "MIT",
  "Oxford",
  "Harvard",
  "Caltech",
  "ETH Zürich",
];

export function HeroSection() {
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col pt-32 pb-8 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% -20%, var(--green-3) 0%, transparent 60%),
              radial-gradient(circle at 100% 40%, var(--green-2) 0%, transparent 50%),
              var(--bg-primary)
            `,
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto w-full"
        >
          {/* Headline */}
          <motion.h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-semibold mb-8 tracking-tighter leading-[1]"
            style={{ color: "var(--text-primary)" }}
            variants={staggerItem}
          >
            Research,{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, var(--green-9), var(--green-11))",
              }}
            >
              untangled
            </span>
            .
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto mb-12 leading-relaxed font-light"
            style={{ color: "var(--text-secondary)" }}
            variants={staggerItem}
          >
            Your bibliography, writing, and discovery —{" "}
            <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>finally together</span>.
          </motion.p>

          {/* Dual CTAs using shadcn Button */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            variants={staggerItem}
          >
            <Button
              onClick={scrollToWaitlist}
              size="xl"
              variant="cta"
              className="rounded-full shadow-xl"
              style={{
                background: "var(--green-9)",
                boxShadow: "0 10px 40px -10px var(--green-a8)",
              }}
            >
              Start for free
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              size="xl"
              variant="outline"
              className="rounded-full"
              style={{
                background: "var(--mauve-a2)",
                borderColor: "var(--border-default)",
                color: "var(--text-primary)",
              }}
            >
              <Play className="w-5 h-5" style={{ fill: "currentColor" }} />
              Watch Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust Strip - Pinned to bottom */}
      <div className="relative z-10 py-8 mt-auto">
        <div className="container max-w-6xl mx-auto">
          <p
            className="text-center text-xs font-semibold mb-6 uppercase tracking-widest"
            style={{ color: "var(--text-secondary)", opacity: 0.5 }}
          >
            Trusted by researchers at
          </p>
          <div
            className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 transition-opacity duration-500 hover:opacity-100"
            style={{ opacity: 0.4 }}
          >
            {institutions.map((name, index) => (
              <span
                key={index}
                className="text-lg sm:text-xl font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
