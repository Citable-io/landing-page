/**
 * GlobalCursorLight - Green glow effect that follows the real user cursor across the entire page
 * Tracks actual mouse position globally and displays a beautiful green light halo
 */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function GlobalCursorLight() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let moveTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(moveTimeout);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50"
      animate={{
        x: mousePos.x + 40,
        y: mousePos.y - 120,
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
        mass: 0.5,
      }}
    >
      {/* Outer glow layer - larger, less intense */}
      <div
        className="w-80 h-80 rounded-full blur-2xl"
        style={{
          background: "radial-gradient(circle, rgba(31, 208, 104, 0.15) 0%, rgba(31, 208, 104, 0.05) 50%, transparent 80%)",
        }}
      />

      {/* Inner pulsing core */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: isMoving ? [0.4, 0.5, 0.4] : [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: isMoving ? 2 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: "radial-gradient(circle, rgba(31, 208, 104, 0.25) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}

export default GlobalCursorLight;
