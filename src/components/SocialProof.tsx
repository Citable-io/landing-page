/**
 * SocialProof Component
 *
 * Clean stats section with animated counters and testimonials.
 */

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Star } from "lucide-react";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  affiliation: string;
  avatar: string;
}

const stats: Stat[] = [
  { value: 10000, suffix: "+", label: "Papers organized" },
  { value: 500, suffix: "+", label: "Researchers waiting" },
  { value: 4.9, suffix: "/5", label: "Beta satisfaction" },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "Finally, a tool that understands how researchers actually work. No more juggling between Zotero, Overleaf, and Google Scholar.",
    name: "Dr. Sarah Chen",
    role: "Assistant Professor",
    affiliation: "Stanford University",
    avatar: "SC",
  },
  {
    quote:
      "The citation graph feature alone has saved me hours of literature review. It's like having a research assistant that never sleeps.",
    name: "Michael Torres",
    role: "PhD Candidate",
    affiliation: "MIT",
    avatar: "MT",
  },
  {
    quote:
      "I've tried every reference manager out there. Citable is the first one that doesn't feel like a compromise.",
    name: "Dr. Emma Williams",
    role: "Research Fellow",
    affiliation: "Oxford University",
    avatar: "EW",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (value < 10) {
      return latest.toFixed(1);
    }
    return Math.round(latest).toLocaleString();
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1],
      });
      return controls.stop;
    }
  }, [isInView, value, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function SocialProof() {
  return (
    <section
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "var(--bg-tertiary)" }}
    >
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 md:mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 rounded-xl"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-subtle)",
              }}
              variants={staggerItem}
            >
              <div
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{ color: "var(--indigo-11)" }}
              >
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div
                className="text-sm uppercase tracking-wider font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="rounded-xl p-6"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-subtle)",
              }}
              variants={staggerItem}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4"
                    style={{ color: "var(--amber-9)", fill: "var(--amber-9)" }}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-base mb-5 leading-relaxed"
                style={{ color: "var(--text-primary)" }}
              >
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    background: "var(--indigo-9)",
                    color: "white",
                  }}
                >
                  {testimonial.avatar}
                </div>
                <div>
                  <div
                    className="font-medium text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {testimonial.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {testimonial.role}, {testimonial.affiliation}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default SocialProof;
