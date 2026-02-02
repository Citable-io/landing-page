/**
 * FeatureShowcase Component
 *
 * Alternating feature sections for Organize, Write, and Discover.
 * Uses shadcn Badge for labels. Proper Radix tokens throughout.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Library, Edit3, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { OrganizeView } from "./showcase/OrganizeView";
import { WriteView } from "./showcase/WriteView";

interface Feature {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bullets: string[];
  module: "biblio" | "manuscripts" | "discover";
  reversed: boolean;
}

const features: Feature[] = [
  {
    id: "organize",
    label: "ORGANIZE",
    title: "Smart library that organizes itself",
    description:
      "Import papers from anywhere. Let AI handle the tagging, sorting, and organizing while you focus on what matters.",
    icon: <Library className="w-4 h-4" />,
    bullets: [
      "AI-powered auto-tagging",
      "Smart collections",
      "One-click import from any source",
      "Full-text search across all papers",
    ],
    module: "biblio",
    reversed: false,
  },
  {
    id: "write",
    label: "WRITE",
    title: "LaTeX editor built for researchers",
    description:
      "A powerful editor with live preview, real-time collaboration, and seamless citation insertion as you write.",
    icon: <Edit3 className="w-4 h-4" />,
    bullets: [
      "Side-by-side live preview",
      "Rich formatting toolbar",
      "Auto-save & version history",
      "Export to PDF or Word",
    ],
    module: "manuscripts",
    reversed: true,
  },
  {
    id: "discover",
    label: "DISCOVER",
    title: "Find hidden connections",
    description:
      "Explore citation networks, find related papers, and let AI surface the research you need to strengthen your work.",
    icon: <Search className="w-4 h-4" />,
    bullets: [
      "Visual citation graphs",
      "AI-powered recommendations",
      "One-click paper import",
      "Track citation trends",
    ],
    module: "discover",
    reversed: false,
  },
];

// Helper to convert hex to rgba
function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const moduleStyles = {
  biblio: {
    accent: "#C3E9D7",
    accentDark: "#1B3A32",
    tint: hexToRgba("#C3E9D7", 0.15),
    text: "#1B3A32",
    border: "#C3E9D7",
    glow: hexToRgba("#C3E9D7", 0.25),
    gradient: "linear-gradient(135deg, #C3E9D7 0%, #1B3A32 100%)",
  },
  manuscripts: {
    accent: "#C2E5FF",
    accentDark: "#0E3264",
    tint: hexToRgba("#C2E5FF", 0.15),
    text: "#0E3264",
    border: "#C2E5FF",
    glow: hexToRgba("#C2E5FF", 0.25),
    gradient: "linear-gradient(135deg, #C2E5FF 0%, #0E3264 100%)",
  },
  discover: {
    accent: "#DADcff",
    accentDark: "#2A2E66",
    tint: hexToRgba("#DADcff", 0.15),
    text: "#2A2E66",
    border: "#DADcff",
    glow: hexToRgba("#DADcff", 0.25),
    gradient: "linear-gradient(135deg, #DADcff 0%, #2A2E66 100%)",
  },
};

function FeatureSection({ feature, index }: { feature: Feature; index: number }) {
  const styles = moduleStyles[feature.module];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  const textVariants = {
    hidden: {
      opacity: 0,
      x: feature.reversed ? 30 : -30
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
  };

  const demoVariants = {
    hidden: {
      opacity: 0,
      x: feature.reversed ? -30 : 30,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.1,
      }
    },
  };

  const renderDemo = () => {
    switch (feature.id) {
      case "organize":
        return <OrganizeView isActive={isInView} />;
      case "write":
        return <WriteView isActive={isInView} />;
      case "discover":
        return <WriteView showCitation isActive={isInView} />;
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-4 relative overflow-hidden"
      style={{
        background: index % 2 === 0 ? "var(--bg-primary)" : "var(--bg-secondary)",
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: feature.reversed
            ? `radial-gradient(ellipse 50% 50% at 10% 50%, ${styles.glow} 0%, transparent 60%)`
            : `radial-gradient(ellipse 50% 50% at 90% 50%, ${styles.glow} 0%, transparent 60%)`,
          opacity: 0.3,
        }}
      />

      <div className="container max-w-7xl mx-auto relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          feature.reversed ? "lg:grid-flow-dense" : ""
        }`}>
          {/* Text side */}
          <motion.div
            className={`flex flex-col justify-center ${feature.reversed ? "lg:col-start-2" : ""}`}
            variants={textVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Label pill using shadcn Badge */}
            <Badge
              variant="outline"
              className="w-fit mb-6 gap-2 px-3 py-1.5"
              style={{
                background: styles.tint,
                borderColor: styles.border,
                color: styles.text,
              }}
            >
              <span style={{ color: styles.accent }}>{feature.icon}</span>
              <span className="text-xs font-semibold tracking-wider">
                {feature.label}
              </span>
            </Badge>

            {/* Title */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-6 tracking-tight leading-tight"
              style={{ color: "var(--text-primary)" }}
            >
              {feature.title}
            </h2>

            {/* Description */}
            <p
              className="text-lg md:text-xl mb-8 leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {feature.description}
            </p>

            {/* Bullets */}
            <ul className="space-y-4">
              {feature.bullets.map((bullet, bulletIndex) => (
                <motion.li
                  key={bulletIndex}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                  transition={{
                    delay: 0.25 + bulletIndex * 0.08,
                    duration: 0.4,
                  }}
                >
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: styles.accent,
                      color: "white",
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
                  <span
                    className="text-base"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {bullet}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Demo side */}
          <motion.div
            className={`relative ${feature.reversed ? "lg:col-start-1" : ""}`}
            variants={demoVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Glow behind demo */}
            <div
              className="absolute -inset-8 rounded-3xl blur-3xl"
              style={{
                background: styles.gradient,
                opacity: 0.15,
              }}
            />

            {/* Demo container */}
            <div
              className="relative rounded-xl overflow-hidden shadow-2xl"
              style={{
                background: "var(--card-bg)",
                border: `1px solid var(--mauve-a4)`,
              }}
            >
              {/* macOS-style Window Header */}
              <div
                className="h-8 flex items-center px-4 gap-2"
                style={{
                  background: "var(--mauve-a2)",
                  borderBottom: "1px solid var(--mauve-a3)",
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "var(--red-a6)" }}
                />
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "var(--amber-a6)" }}
                />
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: "var(--green-a6)" }}
                />
              </div>

              {renderDemo()}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FeatureShowcase() {
  return (
    <>
      {features.map((feature, index) => (
        <FeatureSection key={feature.id} feature={feature} index={index} />
      ))}
    </>
  );
}

export default FeatureShowcase;
