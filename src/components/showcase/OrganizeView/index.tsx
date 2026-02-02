/**
 * OrganizeView - Animated bibliography management showcase
 *
 * Streamlined 4-step workflow:
 * 1. upload (3s) - PDFs being imported with animations
 * 2. tagging (3s) - Metadata auto-extracting and auto-tagging
 * 3. pdf-open (2.5s) - Opening and viewing the PDF
 * 4. taking-notes (3.5s) - Writing notes on the PDF
 */

import { useState, useEffect, useCallback } from "react";
import { ReferenceTable } from "./ReferenceTable";
import { PDFViewer } from "./PDFViewer";
import { CursorLight } from "./CursorLight";
import type { OrganizeStep } from "../types";

interface OrganizeViewProps {
  isActive: boolean;
  onComplete?: () => void;
  color?: string;
}

// Step timing in milliseconds
const stepTimings: Record<OrganizeStep, number> = {
  "upload": 3000,
  "tagging": 3000,
  "pdf-open": 2500,
  "taking-notes": 3500,
};

const stepOrder: OrganizeStep[] = [
  "upload",
  "tagging",
  "pdf-open",
  "taking-notes",
];

export function OrganizeView({ isActive, onComplete, color = "#3B82F6" }: OrganizeViewProps) {
  const [step, setStep] = useState<OrganizeStep>("upload");

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
      setStep("upload");
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
        setStep("upload");
      }
    }, stepTimings[step]);

    return () => clearTimeout(timeout);
  }, [isActive, step, getNextStep]);

  // Determine layout based on step - show PDF viewer for pdf-open and taking-notes steps
  const showPDFView = ["pdf-open", "taking-notes"].includes(step);

  return (
    <div
      className="relative h-[420px] overflow-hidden rounded-2xl"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        boxShadow: "0 0 40px 0 rgba(194, 229, 255, 0.2), 0 0 40px 0 rgba(218, 220, 255, 0.15)",
      }}
    >
      {/* Colored light glow effect following real user cursor */}
      <CursorLight color={color} />

      {showPDFView ? (
        // PDF view for pdf-open and taking-notes steps
        <div className="flex h-full w-full">
          <PDFViewer step={step} />
        </div>
      ) : (
        // Table view for upload and tagging steps
        <div className="flex h-full w-full">
          <ReferenceTable step={step} accentColor={color} />
        </div>
      )}
    </div>
  );
}

// Export duration for the tab controller
export const ORGANIZE_DURATION = Object.values(stepTimings).reduce((a, b) => a + b, 0);
