/**
 * SocialProof Component - Futuristic Stats & Testimonials
 *
 * Modern, gradient-enhanced section with animated KPIs and researcher testimonials.
 */

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Star, BookOpen, Users, Award } from "lucide-react";
import { staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";

// Color palette: 3 light colors + 3 dark colors
const colorPalette = [
  { light: "#C3E9D7", dark: "#1B3A32" }, // Mint green
  { light: "#C2E5FF", dark: "#0E3264" }, // Blue
  { light: "#DADcff", dark: "#2A2E66" }, // Purple
];

// Helper to convert hex to rgba
function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: "book" | "users" | "award";
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  affiliation: string;
  avatar: string;
  initials: string;
}

const stats: Stat[] = [
  { value: 10000, suffix: "+", label: "Papers organized", icon: "book" },
  { value: 500, suffix: "+", label: "Researchers", icon: "users" },
  { value: 4.9, suffix: "/5", label: "Satisfaction", icon: "award" },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "Finally, a tool that understands how researchers actually work. No more juggling between Zotero, Overleaf, and Google Scholar.",
    name: "Dr. Sarah Chen",
    role: "Assistant Professor",
    affiliation: "Stanford University",
    avatar: "SC",
    initials: "SC",
  },
  {
    quote:
      "The citation graph feature alone has saved me hours of literature review. It's like having a research assistant that never sleeps.",
    name: "Michael Torres",
    role: "PhD Candidate",
    affiliation: "MIT",
    avatar: "MT",
    initials: "MT",
  },
  {
    quote:
      "I've tried every reference manager out there. Citable is the first one that doesn't feel like a compromise.",
    name: "Dr. Emma Williams",
    role: "Research Fellow",
    affiliation: "Oxford University",
    avatar: "EW",
    initials: "EW",
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
        duration: 2.5,
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
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, ${hexToRgba("#C3E9D7", 0.1)} 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${hexToRgba("#DADcff", 0.1)} 0%, transparent 50%),
              var(--bg-primary)
            `,
          }}
        />
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Trusted by Researchers
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            Join thousands of researchers who are revolutionizing their workflow with Citable
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {stats.map((stat, index) => {
            const colors = colorPalette[index % colorPalette.length];
            return (
              <motion.div
                key={index}
                className="group relative rounded-2xl p-8 overflow-hidden"
                style={{
                  background: hexToRgba(colors.light, 0.15),
                  border: `1px solid ${colors.light}`,
                }}
                variants={staggerItem}
                whileHover={{
                  y: -8,
                  boxShadow: `0 20px 40px ${hexToRgba(colors.light, 0.25)}`,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient Accent */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 0% 50%, ${hexToRgba(colors.dark, 0.1)}, transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-4">
                    {stat.icon === "book" && <BookOpen className="w-10 h-10" style={{ color: colors.light }} />}
                    {stat.icon === "users" && <Users className="w-10 h-10" style={{ color: colors.light }} />}
                    {stat.icon === "award" && <Award className="w-10 h-10" style={{ color: colors.light }} />}
                  </div>
                  <div className="text-5xl md:text-6xl font-bold mb-3" style={{ color: colors.dark }}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    className="text-sm font-medium uppercase tracking-widest"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6 }}
        >
          <h3
            className="text-2xl font-semibold mb-8 text-center"
            style={{ color: "var(--text-primary)" }}
          >
            What Researchers Are Saying
          </h3>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {testimonials.map((testimonial, index) => {
              const colors = colorPalette[index % colorPalette.length];
              return (
                <motion.div
                  key={index}
                  className="group relative rounded-2xl overflow-hidden backdrop-blur-sm"
                  style={{
                    background: hexToRgba(colors.light, 0.1),
                    border: `1px solid ${colors.light}`,
                  }}
                  variants={staggerItem}
                  whileHover={{
                    y: -8,
                    boxShadow: `0 25px 50px ${hexToRgba(colors.light, 0.2)}`,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glow Effect on Hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at top right, ${hexToRgba(colors.light, 0.15)}, transparent 70%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-8 flex flex-col h-full">
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
                        >
                          <Star
                            className="w-5 h-5"
                            style={{
                              color: colors.light,
                              fill: colors.light,
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote
                      className="text-base mb-8 leading-relaxed flex-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Divider */}
                    <div
                      className="h-px mb-6 group-hover:h-1.5 transition-all duration-300"
                      style={{
                        background: `linear-gradient(90deg, ${colors.light}, transparent)`,
                      }}
                    />

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${colors.light}, ${colors.dark})`,
                          color: "white",
                        }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {testimonial.initials}
                      </motion.div>
                      <div>
                        <div
                          className="font-semibold text-sm"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {testimonial.name}
                        </div>
                        <div
                          className="text-xs leading-snug"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          <div>{testimonial.role}</div>
                          <div>{testimonial.affiliation}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default SocialProof;
