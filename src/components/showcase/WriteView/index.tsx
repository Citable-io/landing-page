/**
 * WriteView - LaTeX editor demo with step-based animations
 * Shows the Write workflow: typing → compiling → preview
 * Also shows Citation workflow: cite command → dropdown → selection → insertion
 */

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ActivityBar } from "../shared/ActivityBar";
import { CursorLight } from "../OrganizeView/CursorLight";
import { TypingAnimation } from "./TypingAnimation";
import {
  DocumentIcon,
  FolderIcon,
  PlusIcon,
  ChevronRightIcon,
  CloseIcon,
  UndoIcon,
  RedoIcon,
  LinkIcon,
  ImageIcon,
  CitationIcon,
  TableIcon,
  SearchIcon,
  PlayIcon,
  CheckIcon,
  DownloadIcon,
  ChevronDownIcon,
} from "../shared/Icons";
import type { WriteStep, CiteStep } from "../types";

type Step = WriteStep | CiteStep;

interface WriteViewProps {
  showCitation?: boolean;
  isActive?: boolean;
  onComplete?: () => void;
}

const writeSteps: WriteStep[] = ["idle", "typing", "compile", "preview"];
const citeSteps: CiteStep[] = ["idle", "cite-trigger", "cite-select", "cite-insert"];

const stepTimings: Record<Step, number> = {
  "idle": 800,
  "typing": 3000,
  "compile": 2000,
  "preview": 2500,
  "cite-trigger": 1000,
  "cite-select": 1800,
  "cite-insert": 1500,
};

export function WriteView({ showCitation = false, isActive = true, onComplete }: WriteViewProps) {
  const [step, setStep] = useState<Step>("idle");
  const steps = showCitation ? citeSteps : writeSteps;

  const getExpandedSection = (currentStep: Step) => {
    if (currentStep === "typing" || currentStep === "compile" || currentStep === "cite-trigger" || currentStep === "cite-select") {
      return "editor";
    }
    if (currentStep === "preview" || currentStep === "cite-insert") {
      return "pdf";
    }
    return null;
  };

  const expandedSection = getExpandedSection(step);

  const getStepLabel = (currentStep: Step): string => {
    if (!showCitation) {
      switch (currentStep) {
        case "idle": return "📝 Ready to write";
        case "typing": return "✏️ Typing LaTeX code";
        case "compile": return "⚙️ Compiling PDF";
        case "preview": return "✅ PDF ready";
        default: return "";
      }
    } else {
      switch (currentStep) {
        case "idle": return "📝 Position cursor";
        case "cite-trigger": return "🔍 Typing \\cite{";
        case "cite-select": return "📚 Select citation";
        case "cite-insert": return "✅ Citation inserted";
        default: return "";
      }
    }
  };

  const getNextStep = useCallback((current: Step): Step | null => {
    const currentIndex = steps.indexOf(current as any);
    if (currentIndex === -1 || currentIndex >= steps.length - 1) {
      return null;
    }
    return steps[currentIndex + 1] as Step;
  }, [steps]);

  useEffect(() => {
    if (!isActive) return;

    const timeout = setTimeout(() => {
      const nextStep = getNextStep(step);
      if (nextStep) {
        setStep(nextStep);
      } else {
        setStep(steps[0]);
        onComplete?.();
      }
    }, stepTimings[step]);

    return () => clearTimeout(timeout);
  }, [isActive, step, getNextStep, steps, onComplete]);

  return (
    <div className="relative flex flex-col h-[420px] overflow-hidden">
      {/* Step label */}
      <div className="px-4 py-2 bg-secondary/50 border-b border-border/20">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-xs font-medium text-muted-foreground"
        >
          {getStepLabel(step)}
        </motion.div>
      </div>

      {/* Demo content */}
      <div className="relative flex flex-1 overflow-hidden">
        <CursorLight />

        <ActivityBar variant="editor" />

        {/* Sidebar - File Browser */}
        <motion.div
          style={{
            width: expandedSection === null ? 256 : expandedSection === "editor" ? 100 : 80,
          }}
          transition={{ duration: 0.3 }}
        >
          <FileBrowserSidebar />
        </motion.div>

        {/* Main content area */}
        <motion.div className="flex-1 flex flex-col min-w-0 bg-background" layout>
          {/* Tab bar */}
          <div className="h-11 flex items-center gap-1 px-2 bg-secondary/50 border-b border-border/20">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-card text-foreground text-sm">
              <DocumentIcon />
              <span>Main.tex</span>
              <button className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground rounded">
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Editor + PDF split */}
          <div className="flex-1 flex min-h-0">
            <motion.div
              className="flex-1 min-w-0"
              style={{
                flex: expandedSection === "editor" ? 3 : expandedSection === "pdf" ? 1 : 1.5,
              }}
              transition={{ duration: 0.3 }}
            >
              <EditorPane step={step} showCitation={showCitation} />
            </motion.div>
            <motion.div
              className="hidden sm:flex flex-1 min-w-0"
              style={{
                flex: expandedSection === "pdf" ? 3 : expandedSection === "editor" ? 1 : 1.5,
              }}
              transition={{ duration: 0.3 }}
            >
              <PDFPreviewPane step={step} showCitation={showCitation} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function FileBrowserSidebar() {
  return (
    <div className="w-64 bg-card flex flex-col">
      <div className="h-11 flex items-center justify-between px-4 border-b border-border/20">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          File Browser
        </span>
        <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded">
          <PlusIcon />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <FileItem name="Main.tex" selected />
        <FileItem name="chapter1.tex" />
        <FileItem name="references.bib" />
        <FileItem name="figures/" isFolder />

        <div className="mt-4 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <ChevronRightIcon />
            <span>Outline</span>
          </div>
          <div className="space-y-0.5 mt-1">
            <OutlineItem label="Introduction" />
            <OutlineItem label="Methods" />
            <OutlineItem label="Results" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FileItem({
  name,
  selected = false,
  isFolder = false,
}: {
  name: string;
  selected?: boolean;
  isFolder?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
        selected
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-secondary/50"
      }`}
    >
      {isFolder ? (
        <FolderIcon className="w-4 h-4 flex-shrink-0" />
      ) : (
        <DocumentIcon className="w-4 h-4 flex-shrink-0" />
      )}
      <span className="truncate">{name}</span>
    </div>
  );
}

function OutlineItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-4 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
      <span className="text-muted-foreground/50">§</span> {label}
    </div>
  );
}

function EditorPane({ step, showCitation }: { step: Step; showCitation: boolean }) {
  const isTyping = step === "typing";
  const showContent = step !== "idle";
  const showCiteDropdown = step === "cite-select" || step === "cite-insert";
  const citeSelected = step === "cite-insert";
  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Toolbar */}
      <div className="h-11 flex items-center gap-1 px-3 border-b border-border/10">
        <ToolbarButton icon={<UndoIcon />} />
        <ToolbarButton icon={<RedoIcon />} />
        <ToolbarDivider />
        <ToolbarButton icon={<span className="text-sm font-bold">B</span>} />
        <ToolbarButton icon={<span className="text-sm italic">I</span>} />
        <ToolbarDivider />
        <ToolbarButton icon={<LinkIcon />} />
        <ToolbarButton icon={<ImageIcon />} />
        <ToolbarButton
          icon={<CitationIcon />}
          active={showCitation}
        />
        <ToolbarButton icon={<TableIcon />} />
        <div className="flex-1" />
        <ToolbarButton icon={<SearchIcon />} />
      </div>

      {/* Editor content */}
      <div className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-auto">
        <div className="space-y-1">
          {/* Static header lines */}
          <EditorLine num={1} content={<><span className="text-primary">\documentclass</span><span className="text-amber-500">{`{`}</span>article<span className="text-amber-500">{`}`}</span></>} />
          <EditorLine num={2} />
          <EditorLine num={3} content={<><span className="text-primary">\usepackage</span><span className="text-amber-500">{`{`}</span>graphicx<span className="text-amber-500">{`}`}</span></>} />
          <EditorLine num={4} content={<><span className="text-primary">\usepackage</span><span className="text-amber-500">{`{`}</span>biblatex<span className="text-amber-500">{`}`}</span></>} />
          <EditorLine num={5} />
          <EditorLine num={6} content={<><span className="text-primary">\begin</span><span className="text-amber-500">{`{`}</span>document<span className="text-amber-500">{`}`}</span></>} />
          <EditorLine num={7} />

          {/* Animated content that appears during typing */}
          {showContent && (
            <>
              <div className="flex gap-4">
                <span className="w-6 text-right text-muted-foreground/50 select-none">8</span>
                <span className="font-mono text-xs sm:text-sm">
                  <span className="text-primary">\section</span>
                  <span className="text-amber-500">{`{`}</span>
                  <TypingAnimation
                    text="Introduction"
                    speed={30}
                    isActive={isTyping}
                    showCursor={false}
                  />
                  <span className="text-amber-500">{`}`}</span>
                </span>
              </div>
              <div className="flex gap-4">
                <span className="w-6 text-right text-muted-foreground/50 select-none">9</span>
                <span className="font-mono text-xs sm:text-sm text-foreground">
                  <TypingAnimation
                    text="Recent studies have shown that climate"
                    speed={30}
                    isActive={isTyping}
                    showCursor={false}
                  />
                </span>
              </div>
              <div className="flex gap-4 relative">
                <span className="w-6 text-right text-muted-foreground/50 select-none">10</span>
                <span className="font-mono text-xs sm:text-sm text-foreground">
                  {!showCitation ? (
                    <>
                      <TypingAnimation
                        text="change impacts biodiversity "
                        speed={30}
                        isActive={isTyping}
                        showCursor={false}
                      />
                      <motion.span
                        className="px-1 rounded text-violet bg-violet/10"
                        animate={{
                          backgroundColor: step === "preview" ? "rgba(167, 139, 250, 0.1)" : "rgba(167, 139, 250, 0.1)",
                        }}
                      >
                        \cite{`{`}smith2024{`}`}
                      </motion.span>
                      <TypingAnimation
                        text="."
                        speed={30}
                        isActive={isTyping}
                        showCursor={isTyping}
                      />
                    </>
                  ) : (
                    <>
                      change impacts biodiversity{" "}
                      <motion.span
                        className="px-1 rounded font-semibold"
                        animate={{
                          backgroundColor: citeSelected ? "rgba(59, 130, 246, 0.4)" : "rgba(59, 130, 246, 0.2)",
                          color: citeSelected ? "rgb(37, 99, 235)" : "rgb(96, 165, 250)",
                          scale: citeSelected ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        \cite{`{`}smith2024{`}`}
                      </motion.span>
                      .
                    </>
                  )}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Citation Autocomplete Widget - matches frontend-v2 */}
        {showCiteDropdown && (
          <motion.div
            className="absolute left-28 top-40 w-80 rounded-lg shadow-2xl overflow-hidden border"
            style={{
              backgroundColor: "#161C24",
              borderColor: "rgba(148, 163, 184, 0.1)",
            }}
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            {/* Citation List */}
            <div className="p-1.5 space-y-0 max-h-80 overflow-y-auto">
              {/* From .bib files section */}
              <div
                className="px-3 py-2 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#9CA3AF" }}
              >
                ── From .bib files (2) ──
              </div>

              {/* Smith2024 - Selected during cite-insert */}
              <motion.div
                className="mx-1 px-3 py-2.5 rounded cursor-pointer border-l-2 transition-all"
                style={{
                  backgroundColor: citeSelected ? "rgba(59, 130, 246, 0.2)" : "#161C24",
                  borderColor: citeSelected ? "rgb(59, 130, 246)" : "transparent",
                }}
                animate={{
                  backgroundColor: citeSelected ? "rgba(59, 130, 246, 0.2)" : "#161C24",
                }}
                transition={{ duration: 0.2 }}
              >
                <div style={{ color: "#E6ECF6", fontWeight: 600, fontSize: "0.875rem" }}>
                  Smith2024
                </div>
                <div
                  style={{ color: "#A4B4C8", fontSize: "0.75rem" }}
                  className="truncate"
                >
                  Climate Change Impacts on Biodiversity
                </div>
                <div style={{ color: "#8694A6", fontSize: "0.75rem" }}>
                  Smith, J. et al. • 2024
                </div>
              </motion.div>

              {/* Johnson2023 */}
              <motion.div
                className="mx-1 px-3 py-2.5 rounded cursor-pointer border-l-2 opacity-60 hover:opacity-80 transition-all"
                style={{
                  backgroundColor: "#161C24",
                  borderColor: "transparent",
                }}
              >
                <div style={{ color: "#E6ECF6", fontWeight: 600, fontSize: "0.875rem" }}>
                  Johnson2023
                </div>
                <div
                  style={{ color: "#A4B4C8", fontSize: "0.75rem" }}
                  className="truncate"
                >
                  Ecosystem Response to Climate Stress
                </div>
                <div style={{ color: "#8694A6", fontSize: "0.75rem" }}>
                  Johnson, A. • 2023
                </div>
              </motion.div>

              {/* Linked Bibliography section */}
              <div
                className="px-3 py-2 mt-1 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#9CA3AF" }}
              >
                ── Linked Bibliography (3) ──
              </div>

              {/* Williams2023 */}
              <motion.div
                className="mx-1 px-3 py-2.5 rounded cursor-pointer border-l-2 opacity-60 hover:opacity-80 transition-all"
                style={{
                  backgroundColor: "#161C24",
                  borderColor: "transparent",
                }}
              >
                <div style={{ color: "#E6ECF6", fontWeight: 600, fontSize: "0.875rem" }}>
                  Williams2023
                </div>
                <div
                  style={{ color: "#A4B4C8", fontSize: "0.75rem" }}
                  className="truncate"
                >
                  Biodiversity Loss Mechanisms
                </div>
                <div style={{ color: "#8694A6", fontSize: "0.75rem" }}>
                  Williams, M. • 2023
                </div>
              </motion.div>
            </div>

            {/* Selection Checkmark - appears when cite-insert */}
            {citeSelected && (
              <motion.div
                className="absolute top-14 right-4 flex items-center gap-1"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <span style={{ color: "rgb(59, 130, 246)", fontSize: "0.875rem", fontWeight: 600 }}>
                  ✓ Selected
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function EditorLine({ num, content }: { num: number; content?: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="w-6 text-right text-muted-foreground/50 select-none">{num}</span>
      <span>{content}</span>
    </div>
  );
}

function ToolbarButton({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${
        active
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:bg-secondary/50"
      }`}
    >
      {icon}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-5 bg-border/30 mx-1" />;
}

function PDFPreviewPane({ step, showCitation }: { step: Step; showCitation: boolean }) {
  const isCompiling = step === "compile" || step === "cite-select";
  const showPDF = step === "preview" || step === "cite-insert";
  return (
    <div className="hidden sm:flex flex-1 flex-col bg-secondary/10 min-w-0">
      {/* Toolbar */}
      <div className="h-11 flex items-center justify-between px-3 border-b border-border/10">
        <button className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded transition-colors">
          <PlayIcon className="w-4 h-4 text-emerald" />
          <span>Recompile</span>
          <ChevronDownIcon />
        </button>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2 py-1 text-xs text-emerald">
            <CheckIcon />
            <span>0</span>
          </div>
          <button className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded transition-colors">
            <DownloadIcon />
          </button>
          <div className="w-px h-5 bg-border/30" />
          <div className="flex items-center gap-0.5">
            <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground rounded text-xs">−</button>
            <span className="text-xs text-muted-foreground px-1 min-w-[32px] text-center">100%</span>
            <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground rounded text-xs">+</button>
          </div>
        </div>
      </div>

      {/* PDF content */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-2">
        <div className="h-full w-full max-w-[280px] bg-white rounded-sm shadow-md overflow-hidden">
          <div className="h-full p-4 text-gray-800 font-serif overflow-auto">
            <h1 className="text-[9px] font-bold text-center mb-0.5 text-gray-900">
              Climate Change Impacts on Global Biodiversity
            </h1>
            <p className="text-[6px] text-center text-gray-600 mb-2">
              J. Smith, A. Johnson, M. Williams
            </p>
            <div className="mb-2">
              <p className="font-bold text-[7px] mb-0.5">Abstract</p>
              <p className="text-gray-600 text-[6px] leading-relaxed">
                This study examines the relationship between climate patterns and species distribution across multiple ecosystems.
              </p>
            </div>
            <p className="font-bold text-[8px] mb-1">1. Introduction</p>
            <p className="text-[6px] leading-relaxed mb-1.5">
              Recent studies have shown that climate change impacts biodiversity in significant ways. The relationship between temperature changes and species migration has been documented{" "}
              <motion.span
              className="px-1 rounded font-semibold"
              animate={{
                backgroundColor: step === "cite-insert" ? "rgb(191, 219, 254)" : "rgb(219, 234, 254)",
                color: step === "cite-insert" ? "rgb(3, 102, 214)" : "rgb(51, 145, 219)",
                scale: step === "cite-insert" ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              [1]
            </motion.span>
              . Furthermore, habitat loss combined with shifting climate zones creates compounding effects.
            </p>
            <p className="text-[6px] leading-relaxed mb-2 text-gray-700">
              Our research builds upon previous work by analyzing long-term datasets from multiple continents.
            </p>
            <p className="font-bold text-[8px] mb-1">2. Methods</p>
            <p className="text-[6px] leading-relaxed text-gray-700 mb-1.5">
              We analyzed data from 150 monitoring stations across three continents over a 20-year period.
            </p>
            <p className="font-bold text-[8px] mb-1">3. Results</p>
            <p className="text-[6px] leading-relaxed text-gray-700">
              Our findings indicate a strong correlation (r = 0.87) between temperature anomalies and species migration patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export duration for tab controller (static for now, will be animated later)
export const WRITE_DURATION = 5000;
