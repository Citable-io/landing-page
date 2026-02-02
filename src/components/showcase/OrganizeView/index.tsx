/**
 * OrganizeView - Animated bibliography management showcase
 *
 * Video-like walkthrough showing the full organize workflow:
 * 1. empty-state (2s) - Clean library ready for papers
 * 2. import-action (1.5s) - User clicks Import button
 * 3. pdf-drop (2.5s) - PDFs being imported with animations
 * 4. metadata-extraction (3s) - Metadata auto-extracting (title, authors, year)
 * 5. organizing (2s) - Papers being organized into collections
 * 6. paper-select (1.5s) - Click on a paper to see details
 * 7. detail-view (2s) - Paper metadata displayed on right panel
 * 8. filtering (2s) - Show search/filter in action
 * 9. organized (1.5s) - Final organized library state
 */

import { useState, useEffect, useCallback } from "react";
import { CollectionsSidebar } from "./CollectionsSidebar";
import { ReferenceTable } from "./ReferenceTable";
import { CursorLight } from "./CursorLight";
import type { OrganizeStep } from "../types";

interface OrganizeViewProps {
  isActive: boolean;
  onComplete?: () => void;
  color?: string;
}

// Step timing in milliseconds - tells the story of importing and organizing
const stepTimings: Record<OrganizeStep, number> = {
  "empty-state": 1500,
  "import-action": 1000,
  "pdf-drop": 2500,
  "metadata-extraction": 3000,
  "organizing": 2000,
  "paper-select": 1500,
  "detail-view": 2000,
  "filtering": 2000,
  "organized": 1500,
};

const stepOrder: OrganizeStep[] = [
  "empty-state",
  "import-action",
  "pdf-drop",
  "metadata-extraction",
  "organizing",
  "paper-select",
  "detail-view",
  "filtering",
  "organized",
];

export function OrganizeView({ isActive, onComplete, color = "#C3E9D7" }: OrganizeViewProps) {
  const [step, setStep] = useState<OrganizeStep>("empty-state");

  // Get next step
  const getNextStep = useCallback((current: OrganizeStep): OrganizeStep | null => {
    const currentIndex = stepOrder.indexOf(current);
    if (currentIndex === -1 || currentIndex >= stepOrder.length - 1) {
      return null;
    }
    return stepOrder[currentIndex + 1];
  }, []);

  // Reset when becoming active
  useEffect(() => {
    if (isActive) {
      setStep("empty-state");
    }
  }, [isActive]);

  // Progress through steps
  useEffect(() => {
    if (!isActive) return;

    const timeout = setTimeout(() => {
      const nextStep = getNextStep(step);
      if (nextStep) {
        setStep(nextStep);
      } else {
        // Animation complete - loop back to start
        setStep("empty-state");
      }
    }, stepTimings[step]);

    return () => clearTimeout(timeout);
  }, [isActive, step, getNextStep]);

  // Determine layout based on step
  const showSidebar = ["organizing", "paper-select", "detail-view", "filtering", "organized"].includes(step);

  return (
    <div className="relative h-[420px] overflow-hidden bg-card">
      {/* Colored light glow effect following real user cursor */}
      <CursorLight color={color} />

      {showSidebar ? (
        // Two-column layout: sidebar + table
        <div className="flex h-full">
          <CollectionsSidebar step={step} accentColor={color} />
          <ReferenceTable step={step} accentColor={color} />
        </div>
      ) : (
        // Single column: full-width table
        <div className="flex h-full">
          <ReferenceTable step={step} accentColor={color} />
        </div>
      )}
    </div>
  );
}

// Export duration for the tab controller
export const ORGANIZE_DURATION = Object.values(stepTimings).reduce((a, b) => a + b, 0);
