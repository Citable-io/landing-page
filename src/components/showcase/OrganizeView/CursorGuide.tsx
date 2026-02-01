/**
 * CursorGuide - Animated cursor showing actions to take
 * Moves around the screen demonstrating where to click/interact
 */

import { motion } from "framer-motion";
import type { OrganizeStep } from "../types";

interface CursorGuideProps {
  step: OrganizeStep;
}

// Define cursor positions and actions for each step
// Positions are relative to the OrganizeView container (56px activity bar + layout)
const cursorStates: Record<OrganizeStep, { x: number; y: number; show: boolean; clicking?: boolean }> = {
  "empty-state": { x: 0, y: 0, show: false }, // Hidden during empty state
  "import-action": { x: 390, y: 75, show: true, clicking: false }, // Point at Import button (in toolbar)
  "pdf-drop": { x: 0, y: 0, show: false }, // Hidden during PDF drop animation
  "metadata-extraction": { x: 0, y: 0, show: false }, // Hidden while table rows fade in
  "organizing": { x: 120, y: 280, show: true, clicking: false }, // Point at collections sidebar
  "paper-select": { x: 420, y: 180, show: true, clicking: true }, // Click on first paper row
  "detail-view": { x: 0, y: 0, show: false }, // Hidden during detail view
  "filtering": { x: 660, y: 75, show: true, clicking: false }, // Point at search box
  "organized": { x: 0, y: 0, show: false }, // Hidden at end
};

export function CursorGuide({ step }: CursorGuideProps) {
  const state = cursorStates[step];
  const { x, y, show, clicking } = state;

  if (!show) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="fixed z-50"
        animate={{
          x: show ? x : -100,
          y: show ? y : -100,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.6,
        }}
      >
        {/* Glow effect around cursor */}
        <motion.div
          className="absolute top-0 left-0 w-12 h-12 bg-green-400/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl"
          animate={{
            scale: clicking ? [1, 1.3, 1] : [1, 1.2, 1],
          }}
          transition={{
            duration: clicking ? 0.3 : 2,
            repeat: Infinity,
            repeatDelay: clicking ? 0.4 : 0.5,
          }}
        />

        {/* Main cursor arrow */}
        <div className="relative w-6 h-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="white"
            stroke="white"
            strokeWidth="1"
            className="drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 0 10px rgba(255,255,255,0.9)) drop-shadow(0 0 6px rgba(31,208,104,0.8))",
            }}
          >
            <path d="M3 3l7.07 18.97L12.58 13.4 19 20.97z" />
          </svg>

          {/* Click pulse animation */}
          {clicking && (
            <motion.div
              className="absolute top-0.5 left-0.5 w-5 h-5 border-2 border-white rounded-full"
              animate={{
                scale: [1, 2.5],
                opacity: [1, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            />
          )}
        </div>

        {/* Helpful tooltip text with arrow */}
        <motion.div
          className="absolute top-8 left-8 bg-white text-gray-900 px-4 py-2 rounded-lg shadow-xl text-sm font-semibold pointer-events-auto z-50 border-2 border-green-400"
          animate={{
            opacity: show ? 1 : 0,
            scale: show ? 1 : 0.8,
            y: show ? 0 : -10,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Arrow pointer */}
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-white border-2 border-green-400 transform rotate-45" />

          {/* Step-specific instructions */}
          <div className="flex items-center gap-2">
            {step === "import-action" && (
              <>
                <span>👆</span>
                <span>Click "Import Papers"</span>
              </>
            )}
            {step === "organizing" && (
              <>
                <span>📁</span>
                <span>Auto-organizing into collections</span>
              </>
            )}
            {step === "paper-select" && (
              <>
                <span>👇</span>
                <span>Click a paper to see details</span>
              </>
            )}
            {step === "filtering" && (
              <>
                <span>🔍</span>
                <span>Search to find papers</span>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CursorGuide;
