/**
 * CursorGuide - Animated cursor showing actions to take
 * Moves around the screen demonstrating where to click/interact
 */

import { motion } from "framer-motion";
import type { OrganizeStep } from "../types";

interface CursorGuideProps {
  step: OrganizeStep;
  color?: string;
}

// Helper to convert hex to rgba
function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Define cursor positions and actions for each step
// Positions are relative to the OrganizeView container (56px activity bar + layout)
const cursorStates: Record<OrganizeStep, { x: number; y: number; show: boolean; clicking?: boolean; tooltipPos?: "right" | "bottom" | "left" }> = {
  "empty-state": { x: 0, y: 0, show: false },
  "import-action": { x: 380, y: 75, show: true, clicking: false, tooltipPos: "bottom" },
  "pdf-drop": { x: 0, y: 0, show: false },
  "metadata-extraction": { x: 0, y: 0, show: false },
  "organizing": { x: 120, y: 280, show: true, clicking: false, tooltipPos: "right" },
  "paper-select": { x: 380, y: 180, show: true, clicking: true, tooltipPos: "right" },
  "detail-view": { x: 0, y: 0, show: false },
  "filtering": { x: 600, y: 75, show: true, clicking: false, tooltipPos: "bottom" },
  "organized": { x: 0, y: 0, show: false },
};

export function CursorGuide({ step, color = "#C3E9D7" }: CursorGuideProps) {
  const state = cursorStates[step];
  const { x, y, show, clicking, tooltipPos = "right" } = state;

  if (!show) return null;

  // Tooltip position based on cursor location
  const getTooltipClass = () => {
    switch (tooltipPos) {
      case "bottom":
        return "top-12 left-1/2 -translate-x-1/2";
      case "left":
        return "top-1/2 -translate-y-1/2 -left-32";
      case "right":
      default:
        return "top-1/2 -translate-y-1/2 left-12";
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      <motion.div
        className="absolute z-50"
        animate={{
          x: show ? x : -100,
          y: show ? y : -100,
        }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 22,
          mass: 0.5,
        }}
      >
        {/* Enhanced glow effect - smaller and cleaner */}
        <motion.div
          className="absolute top-2 left-2 w-6 h-6 rounded-full blur-md"
          style={{
            backgroundColor: hexToRgba(color, 0.4),
          }}
          animate={{
            scale: clicking ? [1, 1.4, 1] : [1, 1.2, 1],
          }}
          transition={{
            duration: clicking ? 0.3 : 2.5,
            repeat: Infinity,
            repeatDelay: clicking ? 0.4 : 0.8,
          }}
        />

        {/* Main cursor arrow - clean design */}
        <div className="relative w-6 h-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-lg"
            style={{
              filter: `drop-shadow(0 0 8px rgba(255,255,255,0.85)) drop-shadow(0 0 4px ${hexToRgba(color, 0.7)})`,
            }}
          >
            {/* Clean arrow cursor */}
            <path
              d="M3 2L3 22L11 13.5L19 21L20.5 19.5L12 12.5L21 11L3 2Z"
              fill="white"
            />
          </svg>

          {/* Click pulse - subtle */}
          {clicking && (
            <motion.div
              className="absolute top-0.5 left-0.5 w-5 h-5 border-2 border-white rounded-full"
              animate={{
                scale: [1, 2.2],
                opacity: [1, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 0.6,
              }}
            />
          )}
        </div>

        {/* Smart tooltip with dynamic positioning */}
        <motion.div
          className={`absolute bg-white text-gray-900 px-3 py-1.5 rounded-md shadow-lg text-xs font-medium pointer-events-auto z-50 flex items-center gap-1.5 ${getTooltipClass()}`}
          style={{
            borderColor: color,
            borderWidth: "1px",
          }}
          animate={{
            opacity: show ? 1 : 0,
            scale: show ? 1 : 0.8,
          }}
          transition={{ duration: 0.25 }}
        >
          {/* Step-specific instructions */}
          {step === "import-action" && (
            <>
              <span>👆</span>
              <span>Import Papers</span>
            </>
          )}
          {step === "organizing" && (
            <>
              <span>📁</span>
              <span>Organizing</span>
            </>
          )}
          {step === "paper-select" && (
            <>
              <span>👇</span>
              <span>Select paper</span>
            </>
          )}
          {step === "filtering" && (
            <>
              <span>🔍</span>
              <span>Search</span>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CursorGuide;
