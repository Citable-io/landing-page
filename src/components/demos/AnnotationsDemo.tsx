import { useState, useEffect } from "react";
import {
  MessageSquare,
  Highlighter,
  Underline,
  Plus,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Trash2,
  X,
  FileText,
} from "lucide-react";
import { useInViewAnimation } from "./shared";

// Frontend-v2 highlight colors (8 colors)
const HIGHLIGHT_COLORS = [
  { name: "yellow", hex: "#FFD400" },
  { name: "red", hex: "#EF4444" },
  { name: "green", hex: "#10B981" },
  { name: "blue", hex: "#3B82F6" },
  { name: "purple", hex: "#8B5CF6" },
  { name: "magenta", hex: "#e56eee" },
  { name: "orange", hex: "#F59E0B" },
  { name: "gray", hex: "#6B7280" },
];

// Mock PDF text content with annotations
const PDF_PARAGRAPHS = [
  {
    id: 1,
    text: "Quantum entanglement is a phenomenon in which quantum states of two or more objects become interconnected.",
    highlights: [{ start: 0, end: 19, color: "#FFD400", id: "h1" }],
  },
  {
    id: 2,
    text: "This means the quantum state of each particle cannot be described independently of the others.",
    highlights: [],
  },
  {
    id: 3,
    text: "Einstein famously referred to entanglement as 'spooky action at a distance' due to its counterintuitive nature.",
    highlights: [{ start: 36, end: 68, color: "#3B82F6", id: "h2" }],
  },
  {
    id: 4,
    text: "Recent experiments have demonstrated entanglement over distances exceeding 1,200 kilometers.",
    highlights: [],
  },
];

// Mock existing annotations
const INITIAL_ANNOTATIONS = [
  {
    id: "h1",
    text: "Quantum entanglement",
    color: "#FFD400",
    page: 1,
    note: "Key concept to define early",
    time: "2h ago",
  },
  {
    id: "h2",
    text: "'spooky action at a distance'",
    color: "#3B82F6",
    page: 1,
    note: "",
    time: "4h ago",
  },
];

type DemoState = "idle" | "selecting" | "color-picker" | "creating" | "adding-note" | "done";
type HighlightMode = "highlight" | "underline" | null;

interface Annotation {
  id: string;
  text: string;
  color: string;
  page: number;
  note: string;
  time: string;
}

export function AnnotationsDemo() {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.3, triggerOnce: false });
  const [state, setState] = useState<DemoState>("idle");
  const [annotations, setAnnotations] = useState<Annotation[]>(INITIAL_ANNOTATIONS);
  const [selectedText, setSelectedText] = useState<{ start: number; end: number; paragraphId: number } | null>(null);
  const [colorPickerPosition, setColorPickerPosition] = useState({ x: 0, y: 0 });
  const [newHighlight, setNewHighlight] = useState<{ paragraphId: number; start: number; end: number; color: string } | null>(null);
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [highlightMode, setHighlightMode] = useState<HighlightMode>("highlight");
  const [selectedColor, setSelectedColor] = useState(0);
  const [isCommentsPanelOpen, setIsCommentsPanelOpen] = useState(true);
  const [zoom] = useState(100);

  // Reset when out of view
  useEffect(() => {
    if (!isInView) {
      setState("idle");
      setAnnotations(INITIAL_ANNOTATIONS);
      setSelectedText(null);
      setNewHighlight(null);
      setActiveAnnotation(null);
      setHighlightMode("highlight");
      setSelectedColor(0);
      setIsCommentsPanelOpen(true);
    }
  }, [isInView]);

  // Demo cycle
  useEffect(() => {
    if (!isInView) return;

    const cycle = [
      // Show existing annotations
      { action: () => setActiveAnnotation("h1"), delay: 1000 },
      { action: () => setActiveAnnotation("h2"), delay: 2500 },
      { action: () => setActiveAnnotation(null), delay: 4000 },

      // Start selecting new text
      {
        action: () => {
          setState("selecting");
          setSelectedText({ paragraphId: 4, start: 28, end: 53 });
          setColorPickerPosition({ x: 160, y: 175 });
        },
        delay: 5000,
      },

      // Show color picker
      { action: () => setState("color-picker"), delay: 6000 },

      // Select green color and create highlight
      {
        action: () => {
          setState("creating");
          setSelectedColor(2); // Green
          setNewHighlight({ paragraphId: 4, start: 28, end: 53, color: "#10B981" });
          setSelectedText(null);
        },
        delay: 7500,
      },

      // Add to annotations
      {
        action: () => {
          setAnnotations((prev) => [
            ...prev,
            {
              id: "h3",
              text: "exceeding 1,200 kilometers",
              color: "#10B981",
              page: 1,
              note: "",
              time: "Just now",
            },
          ]);
          setState("adding-note");
          setActiveAnnotation("h3");
        },
        delay: 8500,
      },

      // Done state
      { action: () => setState("done"), delay: 10000 },

      // Reset
      {
        action: () => {
          setState("idle");
          setAnnotations(INITIAL_ANNOTATIONS);
          setNewHighlight(null);
          setActiveAnnotation(null);
          setSelectedColor(0);
        },
        delay: 12000,
      },
    ];

    const timers = cycle.map(({ action, delay }) => setTimeout(action, delay));
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  // Render paragraph with highlights
  const renderParagraph = (paragraph: (typeof PDF_PARAGRAPHS)[0]) => {
    const allHighlights = [
      ...paragraph.highlights,
      ...(newHighlight && newHighlight.paragraphId === paragraph.id
        ? [{ start: newHighlight.start, end: newHighlight.end, color: newHighlight.color, id: "new" }]
        : []),
    ].sort((a, b) => a.start - b.start);

    if (allHighlights.length === 0 && (!selectedText || selectedText.paragraphId !== paragraph.id)) {
      return <span>{paragraph.text}</span>;
    }

    const parts: React.ReactNode[] = [];
    let lastEnd = 0;

    // Handle selection
    if (selectedText && selectedText.paragraphId === paragraph.id) {
      const { start, end } = selectedText;
      if (start > 0) {
        parts.push(<span key="before">{paragraph.text.slice(0, start)}</span>);
      }
      parts.push(
        <span key="selection" className="bg-[#0EA5E9]/30 border-b-2 border-[#0EA5E9]">
          {paragraph.text.slice(start, end)}
        </span>
      );
      if (end < paragraph.text.length) {
        parts.push(<span key="after">{paragraph.text.slice(end)}</span>);
      }
      return parts;
    }

    // Handle highlights
    allHighlights.forEach((highlight, i) => {
      if (highlight.start > lastEnd) {
        parts.push(<span key={`text-${i}`}>{paragraph.text.slice(lastEnd, highlight.start)}</span>);
      }
      parts.push(
        <span
          key={highlight.id}
          className={`rounded-sm px-0.5 transition-all duration-300 ${
            highlight.id === "new" ? "animate-highlight-create" : ""
          } ${activeAnnotation === highlight.id ? "ring-2 ring-offset-1" : ""}`}
          style={{
            backgroundColor: `${highlight.color}40`,
            ["--highlight-color" as string]: highlight.color,
            ringColor: highlight.color,
          }}
        >
          {paragraph.text.slice(highlight.start, highlight.end)}
        </span>
      );
      lastEnd = highlight.end;
    });

    if (lastEnd < paragraph.text.length) {
      parts.push(<span key="end">{paragraph.text.slice(lastEnd)}</span>);
    }

    return parts;
  };

  return (
    <div
      ref={ref}
      className={`relative w-full rounded-xl overflow-hidden border border-[#242E3C] transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ backgroundColor: "#0d1117" }}
    >
      {/* Toolbar - matching frontend-v2 style */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b border-[#242E3C]"
        style={{ backgroundColor: "#161b22" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#8694A6]" />
            <span className="text-sm text-[#E6ECF6]">research-paper.pdf</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Page Navigation */}
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded hover:bg-[#21262d] text-[#8694A6]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-[#E6ECF6] min-w-[3rem] text-center">1 / 12</span>
            <button className="p-1.5 rounded hover:bg-[#21262d] text-[#8694A6]">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-5 bg-[#30363d]" />

          {/* Zoom Controls */}
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded hover:bg-[#21262d] text-[#8694A6]">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm text-[#E6ECF6] min-w-[3rem] text-center">{zoom}%</span>
            <button className="p-1.5 rounded hover:bg-[#21262d] text-[#8694A6]">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-5 bg-[#30363d]" />

          {/* Highlight/Underline Toggle */}
          <div className="flex items-center gap-1">
            <button
              className={`p-1.5 rounded transition-colors ${
                highlightMode === "highlight" ? "bg-[#21262d]" : "hover:bg-[#21262d]"
              }`}
              title="Highlight mode"
            >
              <div className={`p-0.5 border ${highlightMode === "highlight" ? "border-[#0EA5E9]" : "border-[#8694A6]"} rounded-sm`}>
                <Highlighter className={`w-3.5 h-3.5 ${highlightMode === "highlight" ? "text-[#0EA5E9]" : "text-[#8694A6]"}`} />
              </div>
            </button>
            <button
              className={`p-1.5 rounded transition-colors ${
                highlightMode === "underline" ? "bg-[#21262d]" : "hover:bg-[#21262d]"
              }`}
              title="Underline mode"
            >
              <div className={`p-0.5 border-b-2 ${highlightMode === "underline" ? "border-[#0EA5E9]" : "border-[#8694A6]"}`}>
                <Underline className={`w-3.5 h-3.5 ${highlightMode === "underline" ? "text-[#0EA5E9]" : "text-[#8694A6]"}`} />
              </div>
            </button>

            {/* Color Selector */}
            <div className="flex items-center gap-1 ml-1">
              {HIGHLIGHT_COLORS.slice(0, 4).map((color, i) => (
                <button
                  key={color.name}
                  className={`w-5 h-5 rounded-full transition-all ${
                    selectedColor === i ? "ring-2 ring-offset-1 ring-offset-[#161b22]" : ""
                  }`}
                  style={{ backgroundColor: color.hex, ringColor: color.hex }}
                />
              ))}
              <button className="w-5 h-5 rounded-full border border-[#30363d] flex items-center justify-center text-[#8694A6] hover:bg-[#21262d]">
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="w-px h-5 bg-[#30363d]" />

          {/* Comments Toggle */}
          <button
            onClick={() => setIsCommentsPanelOpen(!isCommentsPanelOpen)}
            className={`p-1.5 rounded flex items-center gap-1.5 transition-colors ${
              isCommentsPanelOpen ? "bg-[#21262d]" : "hover:bg-[#21262d]"
            }`}
            title="Toggle comments panel"
          >
            <MessageSquare className="w-4 h-4 text-[#8694A6]" />
            <span className="bg-[#0EA5E9] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {annotations.length}
            </span>
          </button>
        </div>
      </div>

      <div className="flex h-[380px]">
        {/* PDF Content Area */}
        <div className="flex-1 overflow-hidden relative p-4" style={{ backgroundColor: "#21262d" }}>
          {/* PDF Page */}
          <div className="bg-white rounded shadow-xl p-6 text-gray-900 h-full overflow-auto">
            <h3 className="text-base font-bold mb-4 text-gray-800">Quantum Entanglement: A Review</h3>
            <div className="space-y-3 text-sm leading-relaxed text-gray-700">
              {PDF_PARAGRAPHS.map((paragraph) => (
                <p key={paragraph.id}>{renderParagraph(paragraph)}</p>
              ))}
            </div>
          </div>

          {/* Color Picker Popover */}
          {state === "color-picker" && (
            <div
              className="absolute rounded-lg shadow-2xl border border-[#30363d] p-3 animate-dropdown-slide z-20"
              style={{
                left: colorPickerPosition.x,
                top: colorPickerPosition.y,
                backgroundColor: "#161b22",
              }}
            >
              <div className="flex items-center gap-2 mb-2.5 pb-2 border-b border-[#30363d]">
                <Highlighter className="w-3.5 h-3.5 text-[#8694A6]" />
                <span className="text-xs text-[#E6ECF6] font-medium">Highlight Color</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {HIGHLIGHT_COLORS.map((color, i) => (
                  <button
                    key={color.name}
                    className={`w-7 h-7 rounded-full transition-all hover:scale-110 ${
                      i === 2 ? "ring-2 ring-white/50 ring-offset-2 ring-offset-[#161b22]" : ""
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Comments Panel - 280px width matching frontend-v2 */}
        <div
          className={`w-[280px] border-l border-[#30363d] flex flex-col transition-all duration-300 ${
            isCommentsPanelOpen ? "translate-x-0" : "translate-x-full absolute right-0 h-full"
          }`}
          style={{ backgroundColor: "#0d1117" }}
        >
          {/* Panel Header */}
          <div className="p-3 border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#0EA5E9]" />
              <span className="text-sm font-medium text-[#E6ECF6]">Comments</span>
              <span className="text-xs text-[#8694A6] bg-[#21262d] px-1.5 py-0.5 rounded">
                {annotations.length}
              </span>
            </div>
            <button className="p-1 rounded hover:bg-[#21262d] transition-colors">
              <X className="w-4 h-4 text-[#8694A6]" />
            </button>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {annotations.map((annotation) => (
              <div
                key={annotation.id}
                className={`rounded-lg border transition-all duration-300 cursor-pointer group overflow-hidden ${
                  activeAnnotation === annotation.id
                    ? "border-[#0EA5E9]/50 bg-[#0EA5E9]/5"
                    : "border-[#30363d] hover:bg-[#161b22] hover:border-[#484f58]"
                } ${annotation.id === "h3" ? "animate-fade-in" : ""}`}
              >
                {/* Color stripe at top */}
                <div className="h-1" style={{ backgroundColor: annotation.color }} />

                <div className="p-3">
                  <div className="flex items-start gap-2.5">
                    <div className="flex-1 min-w-0">
                      {/* Highlighted text excerpt */}
                      <p className="text-xs text-[#E6ECF6] leading-relaxed line-clamp-2 font-medium">
                        "{annotation.text}"
                      </p>

                      {/* Note content */}
                      {annotation.note && (
                        <div className="mt-2 p-2 rounded bg-[#161b22] border border-[#30363d] text-xs text-[#8694A6]">
                          {annotation.note}
                        </div>
                      )}

                      {/* Adding note state */}
                      {state === "adding-note" && annotation.id === "h3" && (
                        <div className="mt-2 p-2 rounded bg-[#161b22] border border-[#0EA5E9]/50">
                          <span className="text-xs text-[#8694A6]">Add a note...</span>
                          <span className="inline-block w-0.5 h-3 bg-[#0EA5E9] ml-0.5 animate-blink-cursor" />
                        </div>
                      )}

                      {/* Metadata row */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-[#8694A6]">Page {annotation.page}</span>
                        <span className="text-[10px] text-[#6B7280]">{annotation.time}</span>
                      </div>
                    </div>

                    {/* Delete action (visible on hover) */}
                    <button className="p-1 rounded hover:bg-[#30363d] text-[#6B7280] hover:text-[#EF4444] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selection indicator */}
      {state === "selecting" && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs flex items-center gap-2 border"
          style={{
            backgroundColor: "rgba(14, 165, 233, 0.1)",
            borderColor: "rgba(14, 165, 233, 0.3)",
            color: "#0EA5E9",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-pulse" />
          Selecting text...
        </div>
      )}

      {/* Highlight created indicator */}
      {state === "creating" && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs flex items-center gap-2 border"
          style={{
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            borderColor: "rgba(16, 185, 129, 0.3)",
            color: "#10B981",
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          Highlight created
        </div>
      )}
    </div>
  );
}

export default AnnotationsDemo;
