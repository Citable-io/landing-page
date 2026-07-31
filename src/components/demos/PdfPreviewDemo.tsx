import { useState, useEffect } from "react";
import {
  Play,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ArrowUpRight,
  X,
  FileText,
  AlertCircle,
  Check,
} from "lucide-react";
import { useInViewAnimation } from "./shared";

// LaTeX content for the editor side
const LATEX_LINES = [
  { text: "\\documentclass[12pt]{article}", line: 1 },
  { text: "\\usepackage{amsmath}", line: 2 },
  { text: "", line: 3 },
  { text: "\\begin{document}", line: 4 },
  { text: "", line: 5 },
  { text: "\\section{Introduction}", line: 6, syncId: 1 },
  { text: "Quantum entanglement is a", line: 7 },
  { text: "fundamental phenomenon in", line: 8 },
  { text: "quantum mechanics.", line: 9 },
  { text: "", line: 10 },
  { text: "\\section{Methods}", line: 11, syncId: 2 },
  { text: "We analyze the Bell states:", line: 12 },
  { text: "", line: 13 },
  { text: "\\begin{equation}", line: 14 },
  { text: "  |\\Phi^+\\rangle = \\frac{1}{\\sqrt{2}}", line: 15, syncId: 3 },
  { text: "\\end{equation}", line: 16 },
];

// PDF content
const PDF_SECTIONS = [
  { id: 1, type: "heading", text: "1 Introduction", editorLine: 6 },
  { id: 2, type: "text", text: "Quantum entanglement is a fundamental phenomenon in quantum mechanics.", editorLine: 7 },
  { id: 3, type: "heading", text: "2 Methods", editorLine: 11 },
  { id: 4, type: "text", text: "We analyze the Bell states:", editorLine: 12 },
  { id: 5, type: "equation", text: "|Φ⁺⟩ = 1/√2 (|00⟩ + |11⟩)", editorLine: 15 },
];

type DemoState = "idle" | "compiling" | "compiled" | "sync-forward" | "sync-back";

export function PdfPreviewDemo() {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.3, triggerOnce: false });
  const [state, setState] = useState<DemoState>("idle");
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);
  const [highlightedPdf, setHighlightedPdf] = useState<number | null>(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (!isInView) {
      setState("idle");
      setHighlightedLine(null);
      setHighlightedPdf(null);
    }
  }, [isInView]);

  // Demo cycle
  useEffect(() => {
    if (!isInView) return;

    const cycle = [
      { action: () => setState("compiling"), delay: 800 },
      { action: () => setState("compiled"), delay: 2200 },
      // SyncTeX forward: click editor line 6 -> highlight PDF section 1
      { action: () => { setState("sync-forward"); setHighlightedLine(6); setHighlightedPdf(1); }, delay: 3500 },
      // Move to equation
      { action: () => { setHighlightedLine(15); setHighlightedPdf(5); }, delay: 5500 },
      // SyncTeX back: click PDF section 3 -> highlight editor line 11
      { action: () => { setState("sync-back"); setHighlightedPdf(3); setHighlightedLine(11); }, delay: 7500 },
      // Reset
      { action: () => { setState("idle"); setHighlightedLine(null); setHighlightedPdf(null); }, delay: 9500 },
    ];

    const timers = cycle.map(({ action, delay }) => setTimeout(action, delay));
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div
      ref={ref}
      className={`relative w-full rounded-xl overflow-hidden border border-[#374151] transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ backgroundColor: "#111827" }}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#374151]" style={{ backgroundColor: "#111827" }}>
        <div className="flex items-center gap-3">
          {/* Compile Button */}
          <button
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all ${
              state === "compiling"
                ? "text-[#FBBF24] bg-[#FBBF24]/10"
                : "text-[#22C55E] bg-[#22C55E]/10 hover:bg-[#22C55E]/20"
            }`}
          >
            {state === "compiling" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Compiling...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Recompile
              </>
            )}
          </button>

          {/* Status */}
          {state !== "idle" && state !== "compiling" && (
            <>
              <div className="w-px h-6 bg-[#374151]" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                <span className="text-xs text-[#22C55E]">Compiled</span>
                <span className="text-xs text-[#6B7280]">0 errors</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Zoom Controls */}
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded hover:bg-[#374151] text-[#D1D5DB]">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm text-[#D1D5DB] min-w-[3rem] text-center">{zoom}%</span>
            <button className="p-1.5 rounded hover:bg-[#374151] text-[#D1D5DB]">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-[#374151]" />

          {/* Page Navigation */}
          <div className="flex items-center gap-2">
            <button className="p-1 rounded hover:bg-[#374151] text-[#D1D5DB]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-[#D1D5DB]">1 / 5</span>
            <button className="p-1 rounded hover:bg-[#374151] text-[#D1D5DB]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-[#374151]" />

          {/* Actions */}
          <button className="p-1.5 rounded hover:bg-[#374151] text-[#9CA3AF]">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded hover:bg-[#374151] text-[#9CA3AF]">
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Split View */}
      <div className="flex h-[320px]">
        {/* Editor Side */}
        <div className="w-1/2 border-r border-[#374151] overflow-hidden" style={{ backgroundColor: "#080A10" }}>
          <div className="p-4 font-mono text-xs">
            {LATEX_LINES.map((line) => (
              <div
                key={line.line}
                className={`flex leading-5 transition-all duration-300 rounded ${
                  highlightedLine === line.line
                    ? "bg-gradient-to-r from-[#FACC15]/20 to-[#FACC15]/5 border-l-[3px] border-[#FACC15]"
                    : ""
                }`}
              >
                <span className="w-8 text-right pr-3 text-[#4A5568] select-none">{line.line}</span>
                <span className="flex-1">{highlightLatex(line.text)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PDF Preview Side */}
        <div className="w-1/2 flex items-start justify-center p-6 overflow-hidden" style={{ backgroundColor: "#1F2937" }}>
          {state === "compiling" ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-[#9CA3AF] animate-spin" />
              <span className="text-sm text-[#9CA3AF] mt-2">Compiling...</span>
            </div>
          ) : state === "idle" ? (
            <div className="flex flex-col items-center justify-center h-full">
              <FileText className="w-8 h-8 text-[#4B5563]" />
              <span className="text-sm text-[#9CA3AF] mt-2">Click Recompile</span>
            </div>
          ) : (
            <div className="bg-white rounded shadow-2xl p-6 w-full max-w-[280px] text-gray-900">
              <div className="space-y-4">
                {PDF_SECTIONS.map((section) => (
                  <div
                    key={section.id}
                    className={`transition-all duration-300 rounded px-2 py-1 -mx-2 ${
                      highlightedPdf === section.id
                        ? "bg-[#FACC15]/30 ring-2 ring-[#FACC15]"
                        : ""
                    }`}
                  >
                    {section.type === "heading" && (
                      <h3 className="text-sm font-bold">{section.text}</h3>
                    )}
                    {section.type === "text" && (
                      <p className="text-xs text-gray-700 leading-relaxed">{section.text}</p>
                    )}
                    {section.type === "equation" && (
                      <div className="text-center py-2 bg-gray-50 rounded">
                        <span className="text-sm font-serif italic">{section.text}</span>
                        <span className="text-xs text-gray-500 ml-2">(1)</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SyncTeX Indicator */}
      {(state === "sync-forward" || state === "sync-back") && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs flex items-center gap-2 border"
          style={{
            backgroundColor: "#0EA5E9/10",
            borderColor: "#0EA5E9/30",
            color: "#0EA5E9",
            background: "rgba(14, 165, 233, 0.1)",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-pulse" />
          {state === "sync-forward" ? "SyncTeX: Editor → PDF" : "SyncTeX: PDF → Editor"}
        </div>
      )}
    </div>
  );
}

// LaTeX syntax highlighting
function highlightLatex(text: string): React.ReactNode {
  if (!text) return <span>&nbsp;</span>;

  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const patterns = [
    { regex: /\\(documentclass|usepackage|begin|end|section|equation)\b/, color: "#0EA5E9" },
    { regex: /\{[^}]*\}/, color: "#FBBF24" },
    { regex: /\[[^\]]*\]/, color: "#8694A6" },
    { regex: /\\[a-zA-Z]+/, color: "#0EA5E9" },
  ];

  while (remaining.length > 0) {
    let matched = false;

    for (const pattern of patterns) {
      const match = remaining.match(pattern.regex);
      if (match && match.index === 0) {
        parts.push(
          <span key={key++} style={{ color: pattern.color }}>
            {match[0]}
          </span>
        );
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      let nextMatch = remaining.length;
      for (const pattern of patterns) {
        const match = remaining.match(pattern.regex);
        if (match && match.index !== undefined && match.index < nextMatch) {
          nextMatch = match.index;
        }
      }

      if (nextMatch > 0) {
        parts.push(
          <span key={key++} className="text-[#A4B4C8]">
            {remaining.slice(0, nextMatch)}
          </span>
        );
        remaining = remaining.slice(nextMatch);
      }
    }
  }

  return parts.length > 0 ? parts : <span className="text-[#A4B4C8]">{text}</span>;
}

export default PdfPreviewDemo;
