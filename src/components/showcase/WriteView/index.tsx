/**
 * WriteView - LaTeX editor demo with step-based animations
 * Shows the Write workflow: typing → compiling → preview
 * Also shows Citation workflow: cite command → dropdown → selection → insertion
 */

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { CursorLight } from "../OrganizeView/CursorLight";

// Helper to convert hex to rgba
function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
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
  color?: string;
}

const writeSteps: WriteStep[] = ["idle", "typing", "compile", "preview"];
const citeSteps: CiteStep[] = ["idle", "linked-bib", "cite-trigger", "cite-select", "cite-insert"];

const stepTimings: Record<Step, number> = {
  "idle": 800,
  "typing": 3000,
  "compile": 2000,
  "preview": 2500,
  "linked-bib": 2500,
  "cite-trigger": 1200,
  "cite-select": 1800,
  "cite-insert": 1500,
};

export function WriteView({ showCitation = false, isActive = true, onComplete, color = "#C2E5FF" }: WriteViewProps) {
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
        case "idle": return "📚 Linked Bibliography";
        case "linked-bib": return "📚 Your linked bibliography with citation status";
        case "cite-trigger": return "🔍 Type \\cite{ to insert citation";
        case "cite-select": return "📚 Select from citation suggestions";
        case "cite-insert": return "✅ Citation inserted in PDF";
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
        <CursorLight color={color} />

        {/* Step 1: Show ONLY file browser */}
        {step === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full flex"
          >
            <FileBrowserSidebar />
          </motion.div>
        )}

        {/* Step 2-3: Show ONLY editor (no file browser) */}
        {(step === "typing" || step === "compile") && (
          <motion.div
            className="w-full flex flex-col bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
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

            {/* Editor with compile overlay */}
            <div className="flex-1 flex min-h-0 relative">
              <EditorPane step={step} showCitation={showCitation} color={color} />

              {/* Compile animation overlay */}
              {step === "compile" && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="flex flex-col items-center gap-3"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-full border-2 flex items-center justify-center"
                      style={{
                        borderColor: hexToRgba(color, 0.3),
                        borderTopColor: color,
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <PlayIcon className="w-6 h-6" style={{ color: color }} />
                    </motion.div>
                    <span className="text-sm font-medium text-foreground">Compiling PDF...</span>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 4: Show ONLY PDF */}
        {step === "preview" && (
          <motion.div
            className="w-full flex flex-col bg-secondary/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PDFPreviewPane step={step} showCitation={showCitation} />
          </motion.div>
        )}

        {/* Linked bibliography step: Show ONLY bibliography panel */}
        {showCitation && step === "linked-bib" && (
          <motion.div
            className="w-full flex flex-col bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LinkedBibliographyPanel />
          </motion.div>
        )}

        {/* Citation steps: Show ONLY editor (no file browser) */}
        {showCitation && (step === "cite-trigger" || step === "cite-select" || step === "cite-insert") && (
          <motion.div
            className="w-full flex flex-col bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-11 flex items-center gap-1 px-2 bg-secondary/50 border-b border-border/20">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-card text-foreground text-sm">
                <DocumentIcon />
                <span>Main.tex</span>
                <button className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground rounded">
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div className="flex-1 flex min-h-0">
              <EditorPane step={step} showCitation={showCitation} color={color} />
            </div>
          </motion.div>
        )}
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
          ? "bg-secondary/50 text-foreground"
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

function EditorPane({ step, showCitation, color = "#C2E5FF" }: { step: Step; showCitation: boolean; color?: string }) {
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
          <EditorLine num={1} content={<><span style={{color}}>\documentclass</span><span className="text-amber-500">{`{`}</span>article<span className="text-amber-500">{`}`}</span></>} />
          <EditorLine num={2} />
          <EditorLine num={3} content={<><span style={{color}}>\usepackage</span><span className="text-amber-500">{`{`}</span>graphicx<span className="text-amber-500">{`}`}</span></>} />
          <EditorLine num={4} content={<><span style={{color}}>\usepackage</span><span className="text-amber-500">{`{`}</span>biblatex<span className="text-amber-500">{`}`}</span></>} />
          <EditorLine num={5} />
          <EditorLine num={6} content={<><span style={{color}}>\begin</span><span className="text-amber-500">{`{`}</span>document<span className="text-amber-500">{`}`}</span></>} />
          <EditorLine num={7} />

          {/* Animated content that appears during typing */}
          {showContent && (
            <>
              <div className="flex gap-4">
                <span className="w-6 text-right text-muted-foreground/50 select-none">8</span>
                <span className="font-mono text-xs sm:text-sm">
                  <span style={{color}}>\section</span>
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
          ? "text-foreground bg-secondary/50"
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
    <div className="flex flex-1 flex-col bg-secondary/10 min-w-0">
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

function LinkedBibliographyPanel() {
  const citations = [
    { id: "smith2024", name: "Smith et al. (2024)", title: "Climate Change Impacts on Biodiversity", cited: true },
    { id: "johnson2023", name: "Johnson (2023)", title: "Ecosystem Response to Climate Stress", cited: true },
    { id: "williams2023", name: "Williams (2023)", title: "Biodiversity Loss Mechanisms", cited: false },
    { id: "brown2022", name: "Brown et al. (2022)", title: "Marine Conservation Strategies", cited: false },
  ];

  return (
    <div className="flex h-full">
      {/* Folder Tree */}
      <motion.div
        className="w-1/2 border-r border-border/20 bg-secondary/30 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          Collections
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-secondary/50 text-foreground text-sm">
            <ChevronRightIcon className="w-4 h-4" />
            <FolderIcon className="w-4 h-4" />
            <span>Environmental Science</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded text-muted-foreground text-sm ml-4">
            <FolderIcon className="w-4 h-4" />
            <span>Climate Studies</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded text-muted-foreground text-sm ml-4">
            <FolderIcon className="w-4 h-4" />
            <span>Conservation</span>
          </div>
        </div>
      </motion.div>

      {/* PDF List with Citation Status */}
      <motion.div
        className="w-1/2 bg-background p-4 overflow-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
          References
        </div>
        <div className="space-y-2">
          {citations.map((citation) => (
            <motion.div
              key={citation.id}
              className={`p-2.5 rounded border transition-all ${
                citation.cited
                  ? "border-secondary/50 bg-secondary/50"
                  : "border-border/20 bg-secondary/50"
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-2">
                <DocumentIcon className="w-4 h-4 flex-shrink-0 mt-0.5 text-foreground/50" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">
                    {citation.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {citation.title}
                  </div>
                </div>
                {citation.cited && (
                  <motion.div
                    className="flex items-center gap-1 px-2 py-1 rounded bg-secondary/50 flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckIcon className="w-3.5 h-3.5 text-foreground/70" />
                    <span className="text-xs font-medium text-foreground/70">Cited</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Export duration for tab controller (static for now, will be animated later)
// Increased from 5000 to 9000 to account for the new linked-bib step in citation workflow
export const WRITE_DURATION = 9000;
