/**
 * PDFViewer - PDF content with highlighting capability
 * Shows a mockup of a research paper with interactive highlights
 */

import { DocumentIcon, PdfIcon, CloseIcon } from "../shared/Icons";
import type { OrganizeStep } from "../types";
import { HighlightTooltip } from "./HighlightTooltip";
import { HighlightPopup } from "./HighlightPopup";
import { NotePopup } from "./NotePopup";

interface PDFViewerProps {
  step: OrganizeStep;
  className?: string;
}

export function PDFViewer({ step, className = "" }: PDFViewerProps) {
  const showSelection = step === "pdf-open";
  const showColorPicker = step === "taking-notes";
  const showHighlight = step === "taking-notes";
  const showNotePopup = step === "taking-notes";
  const showMarginNote = step === "taking-notes";

  return (
    <div className={`flex-1 flex flex-col min-w-0 bg-background ${className}`}>
      {/* Tab bar - shows both tabs, paper tab is active */}
      <div className="h-11 flex items-center gap-1 px-2 bg-card border-b border-border/20">
        {/* Collection tab - inactive */}
        <div className="flex items-center gap-2 px-3 py-1.5 text-muted-foreground">
          <DocumentIcon />
          <span className="text-xs font-medium">Machine Learning</span>
        </div>
        {/* Paper tab - active */}
        <div className="flex items-center gap-2 px-3 py-1.5 text-primary border-b-2 border-primary">
          <PdfIcon />
          <span className="text-xs font-medium truncate max-w-[160px]">Attention Is All You Need</span>
          <button className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground rounded">
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* PDF Content - centered layout */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-4 bg-secondary/20 relative">
        {/* PDF Paper - centered */}
        <div className="relative h-full w-full max-w-[340px] bg-white rounded shadow-lg overflow-hidden">
          {/* Paper content - no scrollbar */}
          <div className="h-full p-5 text-gray-800 font-serif overflow-hidden">
            {/* Title */}
            <h1 className="text-sm font-bold text-center mb-1 text-gray-900">
              Attention Is All You Need
            </h1>
            {/* Authors */}
            <p className="text-[8px] text-center text-gray-600 mb-3">
              Ashish Vaswani, Noam Shazeer, Niki Parmar, et al.
            </p>

            {/* Abstract */}
            <div className="mb-3">
              <p className="font-bold text-[10px] mb-1">Abstract</p>
              <p className="text-gray-600 text-[8px] leading-relaxed">
                The dominant sequence transduction models are based on complex recurrent or
                convolutional neural networks.
              </p>
            </div>

            {/* Section 1 */}
            <p className="font-bold text-[10px] mb-1">1. Introduction</p>
            <p className="text-[8px] leading-relaxed mb-2">
              Recurrent neural networks have been firmly established as state of the art
              approaches in sequence modeling.
            </p>

            {/* Highlightable text */}
            <div className="text-[8px] leading-relaxed mb-2 relative">
              <span
                className={`relative inline transition-all duration-300 ${
                  showHighlight
                    ? "bg-yellow-300/80"
                    : showSelection
                    ? "bg-blue-300/60"
                    : ""
                }`}
              >
                We propose a new simple network architecture, the Transformer, based solely
                on attention mechanisms.
              </span>

              {/* Color picker tooltip - shows during color-pick step */}
              {showColorPicker && <HighlightTooltip />}

              {/* Note popup - shows during note-popup step (below highlight) */}
              {showNotePopup && <HighlightPopup />}
            </div>

            <p className="text-[8px] leading-relaxed">
              Experiments show these models to be superior in quality while being more
              parallelizable.
            </p>
          </div>
        </div>

        {/* Margin Note - appears on the right after typing finishes (2s delay) */}
        {showMarginNote && (
          <div
            className="absolute opacity-0"
            style={{
              right: "32px",
              top: "50%",
              transform: "translateY(-50%)",
              animation: "fade-in 0.3s ease-out 2.2s forwards",
            }}
          >
            <NotePopup />
          </div>
        )}
      </div>
    </div>
  );
}
