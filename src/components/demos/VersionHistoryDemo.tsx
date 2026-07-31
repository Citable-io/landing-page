import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Plus, GitCompare } from "lucide-react";
import { useInViewAnimation } from "./shared";

// Platform icons - matching the real Citable IDE
const PLATFORM_ICONS = {
  logo: "/assets/platform-icons/activity-bar/logo-platform.svg",
  files: "/assets/platform-icons/activity-bar/folder.png",
  search: "/assets/platform-icons/ide/icones-search.svg",
  bibliography: "/assets/platform-icons/activity-bar/Group.png",
  history: "/assets/platform-icons/activity-bar/Calque_1-1.png",
};

// Version data matching frontend-v2 structure
const VERSIONS = {
  today: [
    {
      id: "v45",
      number: 45,
      label: "Fixed intro paragraph",
      trigger: "compilation" as const,
      time: "2h ago",
      success: true,
      files: ["main.tex"],
    },
    {
      id: "v44",
      number: 44,
      label: "Added references",
      trigger: "manual" as const,
      time: "4h ago",
      success: true,
      files: ["main.tex", "references.bib"],
    },
    {
      id: "v43",
      number: 43,
      label: "",
      trigger: "auto_save" as const,
      time: "6h ago",
      success: true,
      files: ["main.tex"],
    },
  ],
  yesterday: [
    {
      id: "v42",
      number: 42,
      label: "Methodology section",
      trigger: "compilation" as const,
      time: "Yesterday",
      success: true,
      files: ["main.tex", "methodology.tex"],
    },
    {
      id: "v41",
      number: 41,
      label: "",
      trigger: "auto_save" as const,
      time: "Yesterday",
      success: false,
      files: ["main.tex"],
    },
  ],
  thisWeek: [
    {
      id: "v40",
      number: 40,
      label: "Initial draft",
      trigger: "manual" as const,
      time: "3 days ago",
      success: true,
      files: ["main.tex"],
    },
  ],
};

const getTriggerIcon = (trigger: "compilation" | "manual" | "auto_save") => {
  switch (trigger) {
    case "compilation":
      return "⚙️";
    case "manual":
      return "✋";
    case "auto_save":
      return "💾";
  }
};

// Diff content for the compare view
const DIFF_LINES = [
  { type: "context" as const, text: "\\section{Introduction}" },
  { type: "context" as const, text: "" },
  { type: "removed" as const, text: "This paper presents a novel approach to quantum computing." },
  { type: "added" as const, text: "This paper presents a comprehensive analysis of quantum computing" },
  { type: "added" as const, text: "algorithms and their applications in modern cryptography." },
  { type: "context" as const, text: "" },
  { type: "context" as const, text: "\\subsection{Background}" },
];

type DemoState =
  | "idle"
  | "expand-today"
  | "hover-v44"
  | "show-compare"
  | "show-diff"
  | "reset";

export function VersionHistoryDemo() {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.3, triggerOnce: false });
  const [state, setState] = useState<DemoState>("idle");
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["today"]);
  const [hoveredVersion, setHoveredVersion] = useState<string | null>(null);
  const [showCompareMenu, setShowCompareMenu] = useState(false);
  const [showDiff, setShowDiff] = useState(false);

  // Reset when out of view
  useEffect(() => {
    if (!isInView) {
      setState("idle");
      setExpandedGroups(["today"]);
      setHoveredVersion(null);
      setShowCompareMenu(false);
      setShowDiff(false);
    }
  }, [isInView]);

  // Animation state machine
  useEffect(() => {
    if (!isInView) return;

    let timer: NodeJS.Timeout;

    switch (state) {
      case "idle":
        timer = setTimeout(() => {
          setState("expand-today");
        }, 1000);
        break;

      case "expand-today":
        setExpandedGroups(["today"]);
        timer = setTimeout(() => {
          setState("hover-v44");
          setHoveredVersion("v44");
        }, 1500);
        break;

      case "hover-v44":
        timer = setTimeout(() => {
          setState("show-compare");
          setShowCompareMenu(true);
        }, 1500);
        break;

      case "show-compare":
        timer = setTimeout(() => {
          setState("show-diff");
          setShowCompareMenu(false);
          setShowDiff(true);
        }, 2000);
        break;

      case "show-diff":
        timer = setTimeout(() => {
          setState("reset");
        }, 4000);
        break;

      case "reset":
        setShowDiff(false);
        setHoveredVersion(null);
        timer = setTimeout(() => {
          setState("idle");
        }, 1000);
        break;
    }

    return () => clearTimeout(timer);
  }, [state, isInView]);

  const renderVersionCard = (version: typeof VERSIONS.today[0], isHovered: boolean) => (
    <div
      key={version.id}
      className={`px-3 py-2.5 rounded-lg transition-all duration-300 group relative ${
        isHovered ? "bg-[#1E2630]" : "hover:bg-[#161C24]"
      }`}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          {/* Trigger icon + version number */}
          <span className="text-sm flex-shrink-0" title={version.trigger}>
            {getTriggerIcon(version.trigger)}
          </span>
          <span className="text-sm font-medium text-[#E6ECF6] flex-shrink-0">
            v{version.number}
          </span>

          {/* Label */}
          {version.label && (
            <span className="px-2 py-0.5 text-[10px] bg-[#0EA5E9]/20 text-[#0EA5E9] rounded truncate max-w-[100px]">
              {version.label}
            </span>
          )}

          {/* Compilation status dot */}
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              version.success ? "bg-[#22C55E]" : "bg-[#EF4444]"
            }`}
          />
        </div>

        {/* Time */}
        <span className="text-[11px] text-[#8694A6] flex-shrink-0 ml-2">
          {version.time}
        </span>
      </div>

      {/* File info */}
      <div className="mt-1 pl-6 text-[11px] text-[#6B7280]">
        {version.files[0]}
        {version.files.length > 1 && (
          <span className="ml-1">+{version.files.length - 1} more</span>
        )}
      </div>

      {/* Actions (on hover) */}
      {isHovered && (
        <div className="mt-2 pl-6 flex items-center gap-2 animate-fade-in">
          <button className="px-2 py-1 text-[11px] text-[#A4B4C8] hover:text-[#E6ECF6] hover:bg-[#2A3441] rounded transition-colors">
            Preview
          </button>
          <div className="relative">
            <button
              className={`px-2 py-1 text-[11px] text-[#A4B4C8] hover:text-[#E6ECF6] hover:bg-[#2A3441] rounded transition-colors flex items-center gap-1 ${
                showCompareMenu ? "bg-[#2A3441] text-[#E6ECF6]" : ""
              }`}
            >
              Compare
              <ChevronDown className={`w-3 h-3 transition-transform ${showCompareMenu ? "rotate-180" : ""}`} />
            </button>

            {/* Compare dropdown */}
            {showCompareMenu && (
              <div className="absolute left-0 top-full mt-1 z-50 bg-[#1E2630] border border-[#2A3441] rounded shadow-lg min-w-[140px] animate-dropdown-slide">
                <button className="w-full px-3 py-2 text-[11px] text-left text-[#E6ECF6] hover:bg-[#2A3441] transition-colors flex items-center gap-2">
                  <GitCompare className="w-3 h-3" />
                  With current
                </button>
                <button className="w-full px-3 py-2 text-[11px] text-left text-[#E6ECF6] hover:bg-[#2A3441] transition-colors border-t border-[#2A3441] flex items-center gap-2">
                  <GitCompare className="w-3 h-3" />
                  With previous
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderDateGroup = (
    label: string,
    versions: typeof VERSIONS.today,
    groupKey: string,
    count: number
  ) => {
    const isExpanded = expandedGroups.includes(groupKey);
    return (
      <div key={groupKey} className="space-y-1">
        <button
          className="w-full flex items-center gap-2 px-2 py-1.5 text-left hover:bg-[#161C24] rounded transition-colors"
          onClick={() => {
            setExpandedGroups((prev) =>
              prev.includes(groupKey)
                ? prev.filter((g) => g !== groupKey)
                : [...prev, groupKey]
            );
          }}
        >
          {isExpanded ? (
            <ChevronDown className="w-3 h-3 text-[#8694A6]" />
          ) : (
            <ChevronRight className="w-3 h-3 text-[#8694A6]" />
          )}
          <span className="text-xs font-medium text-[#A4B4C8]">{label}</span>
          <span className="text-[10px] text-[#6B7280]">({count})</span>
        </button>
        {isExpanded && (
          <div className="ml-2 space-y-1">
            {versions.map((v) =>
              renderVersionCard(v, hoveredVersion === v.id)
            )}
          </div>
        )}
      </div>
    );
  };

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
        <div
          className="w-14 flex-shrink-0 border-r border-[#1A222C] flex flex-col items-center py-3 gap-3"
          style={{ backgroundColor: "#0E1218" }}
        >
          {/* Logo */}
          <div className="w-10 h-10 flex items-center justify-center mb-4">
            <img src={PLATFORM_ICONS.logo} alt="Citable" className="w-8 h-8" />
          </div>

          {/* Files - Visual only */}
          <div className="w-10 h-10 rounded-lg flex items-center justify-center border-l-2 border-transparent">
            <img src={PLATFORM_ICONS.files} alt="Files" className="w-5 h-5 opacity-40" />
          </div>

          {/* Search - Visual only */}
          <div className="w-10 h-10 rounded-lg flex items-center justify-center border-l-2 border-transparent">
            <img src={PLATFORM_ICONS.search} alt="Search" className="w-5 h-5 opacity-40" />
          </div>

          {/* Bibliography - Visual only */}
          <div className="w-10 h-10 rounded-lg flex items-center justify-center border-l-2 border-transparent">
            <img src={PLATFORM_ICONS.bibliography} alt="Bibliography" className="w-5 h-5 opacity-40" />
          </div>

          {/* History - Active */}
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#0EA5E9]/10 border-l-2 border-[#0EA5E9]">
            <img src={PLATFORM_ICONS.history} alt="History" className="w-5 h-5 opacity-90" />
          </div>
        </div>

        {/* Version History Panel */}
        <div
          className="w-72 flex-shrink-0 border-r border-[#1A222C] flex flex-col"
          style={{ backgroundColor: "#0E1218" }}
        >
          {/* Header */}
          <div className="h-11 border-b border-[#1A222C] flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8694A6]">
                Version History
              </span>
              <span className="text-[10px] text-[#6B7280] bg-[#1E2630] px-1.5 py-0.5 rounded">
                45 versions
              </span>
            </div>
            <button className="p-1 rounded hover:bg-[#1E2630] transition-colors" title="Create snapshot">
              <Plus className="w-4 h-4 text-[#8694A6]" />
            </button>
          </div>

          {/* Version List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {renderDateGroup("Today", VERSIONS.today, "today", 3)}
            {renderDateGroup("Yesterday", VERSIONS.yesterday, "yesterday", 5)}
            {renderDateGroup("This Week", VERSIONS.thisWeek, "thisWeek", 12)}
          </div>
        </div>

        {/* Main Content Area - Diff View or Placeholder */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tab Bar */}
          <div
            className="h-11 border-b border-[#1A222C] flex items-center px-4"
            style={{ backgroundColor: "#161C24" }}
          >
            {showDiff ? (
              <div className="flex items-center gap-3">
                <span className="text-[13px] text-[#E6ECF6] font-medium">
                  Comparing v44 with current
                </span>
                <span className="text-[11px] text-[#22C55E]">+2 lines</span>
                <span className="text-[11px] text-[#EF4444]">-1 line</span>
              </div>
            ) : (
              <span className="text-[13px] text-[#8694A6]">
                Select a version to preview or compare
              </span>
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden" style={{ backgroundColor: "#080A10" }}>
            {showDiff ? (
              <div className="p-4 font-mono text-sm animate-fade-in">
                {/* Diff content */}
                {DIFF_LINES.map((line, i) => (
                  <div
                    key={i}
                    className={`flex leading-7 ${
                      line.type === "added"
                        ? "bg-[#22C55E]/10"
                        : line.type === "removed"
                        ? "bg-[#EF4444]/10"
                        : ""
                    }`}
                  >
                    <span className="w-10 text-right pr-3 text-[#4A5568] select-none text-xs">
                      {line.type === "removed" ? "-" : line.type === "added" ? "+" : " "}
                    </span>
                    <span
                      className={`flex-1 ${
                        line.type === "added"
                          ? "text-[#22C55E]"
                          : line.type === "removed"
                          ? "text-[#EF4444] line-through"
                          : "text-[#A4B4C8]"
                      }`}
                    >
                      {line.text || "\u00A0"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#1E2630] flex items-center justify-center">
                    <GitCompare className="w-8 h-8 text-[#4A5568]" />
                  </div>
                  <p className="text-sm text-[#6B7280]">
                    Click on a version to preview
                  </p>
                  <p className="text-xs text-[#4A5568] mt-1">
                    or compare with the current version
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status indicator */}
      {showDiff && (
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs flex items-center gap-2 border animate-fade-in"
          style={{
            backgroundColor: "rgba(14, 165, 233, 0.1)",
            borderColor: "rgba(14, 165, 233, 0.3)",
            color: "#0EA5E9",
          }}
        >
          <GitCompare className="w-3 h-3" />
          Showing changes between versions
        </div>
      )}
    </div>
  );
}

export default VersionHistoryDemo;
