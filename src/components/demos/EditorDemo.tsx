import { useState, useEffect } from "react";
import {
  Play,
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
  CheckCircle2,
  Loader2,
  Download,
  Maximize2,
  X,
} from "lucide-react";
import { useInViewAnimation } from "./shared";

// Platform icons - matching the real Citable IDE
const PLATFORM_ICONS = {
  logo: "/assets/platform-icons/activity-bar/logo-platform.svg",
  files: "/assets/platform-icons/activity-bar/folder.png",
  search: "/assets/platform-icons/ide/icones-search.svg",
  bibliography: "/assets/platform-icons/activity-bar/Group.png",
  history: "/assets/platform-icons/activity-bar/Calque_1-1.png",
};

// File tree structure
const FILE_TREE = [
  { id: "1", name: "main.tex", type: "file" as const, icon: "TEX" },
  { id: "2", name: "references.bib", type: "file" as const, icon: "BIB" },
  { id: "3", name: "sections", type: "folder" as const, expanded: true, children: [
    { id: "4", name: "introduction.tex", type: "file" as const, icon: "TEX" },
    { id: "5", name: "methodology.tex", type: "file" as const, icon: "TEX" },
    { id: "6", name: "results.tex", type: "file" as const, icon: "TEX" },
  ]},
];

// Tab configurations for different files
const FILE_CONTENTS: Record<string, { lines: Array<{ num: number; content: string; type: string; foldId?: string; foldStart?: boolean; foldEnd?: boolean; hidden?: boolean }> }> = {
  "main.tex": {
    lines: [
      { num: 1, content: "\\documentclass[12pt]{article}", type: "command" },
      { num: 2, content: "\\usepackage{amsmath}", type: "command" },
      { num: 3, content: "\\input{sections/introduction}", type: "command" },
      { num: 4, content: "\\input{sections/methodology}", type: "command" },
      { num: 5, content: "", type: "empty" },
      { num: 6, content: "\\begin{document}", type: "command" },
      { num: 7, content: "\\maketitle", type: "command" },
      { num: 8, content: "", type: "empty" },
      { num: 9, content: "\\begin{abstract}", type: "command", foldId: "abstract", foldStart: true },
      { num: 10, content: "  We present a novel approach...", type: "text", foldId: "abstract", hidden: true },
      { num: 11, content: "\\end{abstract}", type: "command", foldId: "abstract", foldEnd: true },
      { num: 12, content: "", type: "empty" },
      { num: 13, content: "\\end{document}", type: "command" },
    ],
  },
  "introduction.tex": {
    lines: [
      { num: 1, content: "\\section{Introduction}", type: "command" },
      { num: 2, content: "", type: "empty" },
      { num: 3, content: "The transformer architecture has", type: "text" },
      { num: 4, content: "revolutionized deep learning.", type: "text" },
      { num: 5, content: "", type: "empty" },
      { num: 6, content: "The equation $E = mc^2$ shows that", type: "text" },
      { num: 7, content: "energy and mass are equivalent.", type: "text" },
      { num: 8, content: "", type: "empty" },
      { num: 9, content: "\\subsection{Background}", type: "command" },
      { num: 10, content: "Previous work has shown...", type: "text" },
    ],
  },
  "methodology.tex": {
    lines: [
      { num: 1, content: "\\section{Methodology}", type: "command" },
      { num: 2, content: "", type: "empty" },
      { num: 3, content: "We propose a novel approach based on", type: "text" },
      { num: 4, content: "sparse attention patterns.", type: "text" },
      { num: 5, content: "", type: "empty" },
      { num: 6, content: "Consider the integral:", type: "text" },
      { num: 7, content: "$$\\int_0^\\infty e^{-x^2} dx$$", type: "math" },
      { num: 8, content: "", type: "empty" },
      { num: 9, content: "\\subsection{Implementation}", type: "command" },
      { num: 10, content: "The algorithm proceeds as follows...", type: "text" },
    ],
  },
};

type DemoPhase = "idle" | "multitab" | "mathpreview" | "folding" | "compile";

interface OpenTab {
  id: string;
  name: string;
  icon: string;
  active: boolean;
  modified?: boolean;
}

export function EditorDemo() {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.3, triggerOnce: false });
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [openTabs, setOpenTabs] = useState<OpenTab[]>([
    { id: "main.tex", name: "main.tex", icon: "TEX", active: true },
  ]);
  const [activeTab, setActiveTab] = useState("main.tex");
  const [foldedSections, setFoldedSections] = useState<string[]>([]);
  const [compileState, setCompileState] = useState<"idle" | "compiling" | "success">("idle");

  // Reset when out of view
  useEffect(() => {
    if (!isInView) {
      setPhase("idle");
      setOpenTabs([{ id: "main.tex", name: "main.tex", icon: "TEX", active: true }]);
      setActiveTab("main.tex");
      setFoldedSections([]);
      setCompileState("idle");
    }
  }, [isInView]);

  // Demo sequence
  useEffect(() => {
    if (!isInView) return;

    const sequence = [
      // Multi-tab demo
      { delay: 800, action: () => setPhase("multitab") },
      { delay: 1500, action: () => {
        setOpenTabs([
          { id: "main.tex", name: "main.tex", icon: "TEX", active: false },
          { id: "introduction.tex", name: "introduction.tex", icon: "TEX", active: true },
        ]);
        setActiveTab("introduction.tex");
      }},
      { delay: 3000, action: () => {
        setOpenTabs([
          { id: "main.tex", name: "main.tex", icon: "TEX", active: false },
          { id: "introduction.tex", name: "introduction.tex", icon: "TEX", active: false },
          { id: "methodology.tex", name: "methodology.tex", icon: "TEX", active: true, modified: true },
        ]);
        setActiveTab("methodology.tex");
      }},
      // Math preview
      { delay: 5000, action: () => setPhase("mathpreview") },
      // Code folding
      { delay: 7500, action: () => {
        setPhase("folding");
        setActiveTab("main.tex");
        setOpenTabs(tabs => tabs.map(t => ({ ...t, active: t.id === "main.tex" })));
      }},
      { delay: 8000, action: () => setFoldedSections(["abstract"]) },
      // Compile
      { delay: 10000, action: () => { setPhase("compile"); setCompileState("compiling"); }},
      { delay: 12000, action: () => setCompileState("success") },
      // Reset
      { delay: 14000, action: () => {
        setPhase("idle");
        setOpenTabs([{ id: "main.tex", name: "main.tex", icon: "TEX", active: true }]);
        setActiveTab("main.tex");
        setFoldedSections([]);
        setCompileState("idle");
      }},
    ];

    const timers = sequence.map(({ delay, action }) => setTimeout(action, delay));
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const currentContent = FILE_CONTENTS[activeTab] || FILE_CONTENTS["main.tex"];
  const visibleLines = currentContent.lines.filter(line => {
    if (line.foldId && foldedSections.includes(line.foldId) && line.hidden) {
      return false;
    }
    return true;
  });

  return (
    <div
      ref={ref}
      className={`relative w-full rounded-xl overflow-hidden border border-[#242E3C] transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ backgroundColor: "#080A10" }}
    >
      <div className="flex h-[520px]">
        {/* Activity Bar */}
        <div className="w-12 flex-shrink-0 border-r border-[#1A222C] flex flex-col items-center py-3 gap-2" style={{ backgroundColor: "#0E1218" }}>
          <div className="w-8 h-8 flex items-center justify-center mb-3">
            <img src={PLATFORM_ICONS.logo} alt="Citable" className="w-7 h-7" />
          </div>
          <div className="w-9 h-9 rounded-lg bg-[#0EA5E9]/10 border-l-2 border-[#0EA5E9] flex items-center justify-center">
            <img src={PLATFORM_ICONS.files} alt="Files" className="w-4 h-4 opacity-90" />
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center">
            <img src={PLATFORM_ICONS.search} alt="Search" className="w-4 h-4 opacity-40" />
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center">
            <img src={PLATFORM_ICONS.bibliography} alt="Bibliography" className="w-4 h-4 opacity-40" />
          </div>
          <div className="flex-1" />
          <div className="w-9 h-9 rounded-lg flex items-center justify-center">
            <img src={PLATFORM_ICONS.history} alt="History" className="w-4 h-4 opacity-40" />
          </div>
        </div>

        {/* File Sidebar */}
        <div className="w-40 flex-shrink-0 border-r border-[#1A222C] flex flex-col" style={{ backgroundColor: "#0E1218" }}>
          <div className="h-10 border-b border-[#1A222C] flex items-center px-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8694A6]">Explorer</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-0.5">
              {FILE_TREE.map((item) => (
                <div key={item.id}>
                  <div
                    className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] ${
                      item.type === "file" && item.name === activeTab
                        ? "bg-[#0EA5E9]/10 text-[#E6ECF6]"
                        : "text-[#A4B4C8] hover:bg-[#1E2630]"
                    }`}
                  >
                    {item.type === "folder" ? (
                      <>
                        {item.expanded ? (
                          <ChevronDown className="w-3 h-3 text-[#8694A6]" />
                        ) : (
                          <ChevronRight className="w-3 h-3 text-[#8694A6]" />
                        )}
                        <Folder className="w-3.5 h-3.5 text-[#0EA5E9]" />
                      </>
                    ) : (
                      <>
                        <span className="w-3" />
                        <FileText className={`w-3.5 h-3.5 ${item.icon === "TEX" ? "text-[#0EA5E9]" : "text-[#22C55E]"}`} />
                      </>
                    )}
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.type === "folder" && item.expanded && item.children && (
                    <div className="ml-3">
                      {item.children.map((child) => (
                        <div
                          key={child.id}
                          className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] ${
                            child.name === activeTab
                              ? "bg-[#0EA5E9]/10 text-[#E6ECF6]"
                              : "text-[#A4B4C8] hover:bg-[#1E2630]"
                          }`}
                        >
                          <span className="w-3" />
                          <FileText className="w-3.5 h-3.5 text-[#0EA5E9]" />
                          <span className="truncate">{child.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tab Bar - Multi-tab feature */}
          <div className="h-10 border-b border-[#1A222C] flex items-center px-1 overflow-x-auto" style={{ backgroundColor: "#161C24" }}>
            {openTabs.map((tab) => (
              <div
                key={tab.id}
                className={`flex items-center gap-1.5 px-3 h-full border-b-2 shrink-0 group ${
                  tab.active
                    ? "border-[#0EA5E9] bg-[#080A10]"
                    : "border-transparent hover:bg-[#1E2630]"
                }`}
              >
                <FileText className={`w-3.5 h-3.5 ${tab.active ? "text-[#0EA5E9]" : "text-[#8694A6]"}`} />
                <span className={`text-[12px] ${tab.active ? "text-[#E6ECF6]" : "text-[#8694A6]"}`}>
                  {tab.name}
                </span>
                {tab.modified && (
                  <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
                )}
                <button className="p-0.5 rounded hover:bg-[#3A4A5C] opacity-0 group-hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3 text-[#8694A6]" />
                </button>
              </div>
            ))}
          </div>

          {/* Feature indicator */}
          {phase !== "idle" && phase !== "compile" && (
            <div className="px-3 py-1.5 border-b border-[#1A222C] flex items-center gap-2" style={{ backgroundColor: "rgba(14, 165, 233, 0.05)" }}>
              <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
              <span className="text-[11px] text-[#0EA5E9] font-medium">
                {phase === "multitab" && "Multiple tabs — work on several files at once"}
                {phase === "mathpreview" && "Live math preview on hover"}
                {phase === "folding" && "Code folding for \\begin{} \\end{} blocks"}
              </span>
            </div>
          )}

          {/* Editor + PDF Split */}
          <div className="flex-1 flex min-h-0">
            {/* Editor Panel */}
            <div className="flex-1 flex flex-col min-w-0 border-r border-[#1A222C]">
              {/* Editor Content */}
              <div className="flex-1 overflow-hidden relative" style={{ backgroundColor: "#080A10" }}>
                <div className="p-3 font-mono text-[11px] text-[#A4B4C8] leading-relaxed h-full overflow-auto">
                  {visibleLines.map((line) => (
                    <div key={line.num} className="flex group relative">
                      {/* Line number */}
                      <span className="w-7 text-right pr-3 text-[#4A5568] select-none text-[10px]">
                        {line.num}
                      </span>

                      {/* Fold indicator */}
                      {line.foldStart && line.foldId && (
                        <span
                          className="absolute left-7 text-[#8694A6] cursor-pointer hover:text-[#E6ECF6]"
                          style={{ fontSize: "10px" }}
                        >
                          {foldedSections.includes(line.foldId) ? "▶" : "▼"}
                        </span>
                      )}

                      {/* Code content */}
                      <span className="flex-1 whitespace-pre pl-2">
                        {highlightLatex(line.content)}
                      </span>

                      {/* Folded content indicator */}
                      {line.foldEnd && foldedSections.includes(line.foldId || "") && (
                        <span className="text-[10px] text-[#8694A6] bg-[#1E2630] px-1 rounded ml-1">
                          ...
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Math Preview Tooltip */}
                {phase === "mathpreview" && activeTab === "methodology.tex" && (
                  <div className="absolute left-[120px] top-[120px] bg-[#1E2630] border border-[#3A4A5C] rounded-lg p-3 shadow-xl z-20 animate-fade-in">
                    <div className="text-[10px] text-[#8694A6] mb-1.5">Math Preview</div>
                    <div className="text-lg text-white font-serif">
                      ∫₀^∞ e^(-x²) dx
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* PDF Preview Panel */}
            <div className="w-[42%] flex flex-col" style={{ backgroundColor: "#0E1218" }}>
              {/* PDF Toolbar */}
              <div className="h-10 border-b border-[#1A222C] flex items-center justify-between px-3" style={{ backgroundColor: "#161C24" }}>
                <div className="flex items-center gap-2">
                  <button
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[12px] font-medium transition-all ${
                      compileState === "compiling"
                        ? "text-[#FBBF24] cursor-wait"
                        : "text-[#A4B4C8] hover:text-[#E6ECF6] hover:bg-[#1E2630]"
                    }`}
                  >
                    {compileState === "compiling" ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5 text-[#22C55E] fill-[#22C55E]" />
                    )}
                    {compileState === "compiling" ? "Compiling..." : "Recompile"}
                  </button>

                  {compileState === "success" && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#22C55E]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Success
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded text-[#8694A6] hover:text-[#A4B4C8] hover:bg-[#1E2630]">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 rounded text-[#8694A6] hover:text-[#A4B4C8] hover:bg-[#1E2630]">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* PDF Preview Area */}
              <div className="flex-1 overflow-auto p-3" style={{ backgroundColor: "#1A1A1A" }}>
                <div className="bg-white rounded shadow-lg p-4 text-gray-800 leading-relaxed min-h-full">
                  <div className="text-center mb-4">
                    <div className="text-sm font-bold">A Novel Approach to Deep Learning</div>
                    <div className="text-[10px] text-gray-500 mt-1">Research Team • 2024</div>
                  </div>

                  <div className="text-[10px] font-semibold mb-1">Abstract</div>
                  <div className="text-[9px] text-gray-600 leading-relaxed mb-3 italic">
                    We present a novel approach to understanding transformer architectures
                    and their applications in modern deep learning systems.
                  </div>

                  <div className="text-[10px] font-semibold mb-1">1 Introduction</div>
                  <div className="text-[9px] text-gray-600 leading-relaxed mb-2">
                    The transformer architecture has revolutionized deep learning.
                    The equation <span className="font-serif italic">E = mc²</span> shows that
                    energy and mass are equivalent.
                  </div>

                  <div className="text-[10px] font-semibold mb-1">2 Methodology</div>
                  <div className="text-[9px] text-gray-600 leading-relaxed mb-2">
                    We propose a novel approach based on sparse attention patterns.
                    Consider the integral:
                  </div>

                  <div className="text-center text-[11px] font-serif my-3">
                    <span className="text-gray-800">∫₀^∞ e^(-x²) dx = √π/2</span>
                  </div>

                  <div className="text-[9px] text-gray-600 leading-relaxed">
                    This result is fundamental to probability theory and statistics,
                    forming the basis of the Gaussian distribution.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// LaTeX syntax highlighting
function highlightLatex(text: string): React.ReactNode {
  if (!text) return null;

  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  const patterns = [
    { regex: /\\(documentclass|usepackage|begin|end|section|subsection|title|author|date|maketitle|cite|input)\b/, color: "#0EA5E9" },
    { regex: /\$\$[^$]+\$\$/, color: "#22C55E" }, // Display math
    { regex: /\$[^$]+\$/, color: "#22C55E" }, // Inline math
    { regex: /\{[^}]*\}/, color: "#FBBF24" },
    { regex: /\[[^\]]*\]/, color: "#8694A6" },
    { regex: /%.*$/, color: "#6B7280" },
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
        parts.push(<span key={key++}>{remaining.slice(0, nextMatch)}</span>);
        remaining = remaining.slice(nextMatch);
      }
    }
  }

  return parts.length > 0 ? parts : text;
}

export default EditorDemo;
