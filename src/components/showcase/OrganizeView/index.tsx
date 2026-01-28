/**
 * OrganizeView - Animated bibliography management showcase
 *
 * Animation sequence (~15s):
 * 1. pdf-drop (2s) - PDFs drop onto table
 * 2. metadata-fill (3s) - Rows appear with metadata
 * 3. row-click (1s) - First row gets selected
 * 4. layout-shift (2s) - Sidebar changes, PDF opens
 * 5. text-select (1.5s) - Text selection appears
 * 6. color-pick (2s) - Tooltip shows, yellow selected
 * 7. note-popup (3s) - Popup with typing note
 */

import { useState, useEffect, useCallback } from "react";
import { ActivityBar } from "../shared/ActivityBar";
import { CollectionsSidebar } from "./CollectionsSidebar";
import { OutlineSidebar } from "./OutlineSidebar";
import { ReferenceTable } from "./ReferenceTable";
import { PDFViewer } from "./PDFViewer";
import type { OrganizeStep } from "../types";

interface OrganizeViewProps {
  isActive: boolean;
  onComplete?: () => void;
}

// Step timing in milliseconds
const stepTimings: Record<OrganizeStep, number> = {
  idle: 500,
  "pdf-drop": 2000,
  "metadata-fill": 3000,
  "row-click": 1000,
  "layout-shift": 2000,
  "text-select": 1500,
  "color-pick": 2000,
  "note-popup": 3000,
};

const stepOrder: OrganizeStep[] = [
  "idle",
  "pdf-drop",
  "metadata-fill",
  "row-click",
  "layout-shift",
  "text-select",
  "color-pick",
  "note-popup",
];

export function OrganizeView({ isActive, onComplete }: OrganizeViewProps) {
  const [step, setStep] = useState<OrganizeStep>("idle");

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
      setStep("idle");
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
        // Animation complete
        onComplete?.();
      }
    }, stepTimings[step]);

    return () => clearTimeout(timeout);
  }, [isActive, step, getNextStep, onComplete]);

  // Determine which layout to show
  const showPdfView = ["layout-shift", "text-select", "color-pick", "note-popup"].includes(step);
  const activityBarVariant = showPdfView ? "pdf-reader" : "library";

  return (
    <div className="flex h-[420px]">
      <ActivityBar variant={activityBarVariant} />

      {showPdfView ? (
        <>
          <OutlineSidebar />
          <PDFViewer step={step} />
        </>
      ) : (
        <>
          <CollectionsSidebar />
          <ReferenceTable step={step} />
        </>
      )}
    </div>
  );
}

// Export duration for the tab controller
export const ORGANIZE_DURATION = Object.values(stepTimings).reduce((a, b) => a + b, 0);
