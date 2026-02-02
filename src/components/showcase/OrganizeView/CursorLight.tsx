/**
 * CursorLight - Green glow effect that follows the real user cursor
 * Tracks actual mouse position and displays a beautiful green light halo
 */

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CursorLightProps {
  // Optional: only show light in certain areas
  showOnHover?: boolean;
  // Color for the glow effect (hex color)
  color?: string;
}

// Helper function to convert hex to rgba
function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function CursorLight({ showOnHover = false, color = "#C2E5FF" }: CursorLightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isOver, setIsOver] = useState(!showOnHover);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });
    };

    const handleMouseEnter = () => setIsOver(true);
    const handleMouseLeave = () => setIsOver(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      if (showOnHover) {
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);
      }
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        if (showOnHover) {
          container.removeEventListener("mouseenter", handleMouseEnter);
          container.removeEventListener("mouseleave", handleMouseLeave);
        }
      }
    };
  }, [showOnHover]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <motion.div
        className="absolute"
        animate={{
          x: isOver ? mousePos.x - 80 : -200,
          y: isOver ? mousePos.y - 80 : -200,
          opacity: isOver ? 0.5 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 25,
          mass: 0.7,
        }}
      >
        {/* Outer glow layer */}
        <div
          className="w-40 h-40 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${hexToRgba(color, 0.35)} 0%, ${hexToRgba(color, 0.15)} 40%, transparent 70%)`,
          }}
        />

        {/* Inner pulsing core */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `radial-gradient(circle, ${hexToRgba(color, 0.45)} 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </div>
  );
}

export default CursorLight;
