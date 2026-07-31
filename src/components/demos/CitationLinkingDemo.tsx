import { useState, useEffect } from "react";
import {
  FileText,
  Link2,
  Check,
  ChevronDown,
  ChevronRight,
  Folder,
  Sparkles,
  File,
} from "lucide-react";
import { useInViewAnimation } from "./shared";

// Platform icons
const PLATFORM_ICONS = {
  logo: "/assets/platform-icons/activity-bar/logo-platform.svg",
  bibliography: "/assets/platform-icons/activity-bar/Group.png",
  explorer: "/assets/platform-icons/activity-bar/Calque_1.png",
  search: "/assets/platform-icons/ide/icones-search.svg",
};

// Collections from your library
const LIBRARY_COLLECTIONS = [
  { id: "ml", name: "Machine Learning", count: 24 },
  { id: "transformers", name: "Transformers", count: 12 },
  { id: "nlp", name: "NLP Papers", count: 18 },
  { id: "vision", name: "Computer Vision", count: 15 },
];

// References in linked collections (for autocomplete)
const LINKED_REFERENCES = [
  { key: "vaswani2017attention", title: "Attention Is All You Need", authors: "Vaswani et al.", year: "2017" },
  { key: "devlin2019bert", title: "BERT: Pre-training of Deep...", authors: "Devlin et al.", year: "2019" },
  { key: "brown2020language", title: "Language Models are Few-Shot...", authors: "Brown et al.", year: "2020" },
  { key: "dosovitskiy2021image", title: "An Image is Worth 16x16 Words", authors: "Dosovitskiy et al.", year: "2021" },
];

// Project .bib files
const BIB_FILES = [
  { name: "references.bib", count: 8 },
  { name: "related-work.bib", count: 3 },
];

type DemoPhase =
  | "editor"
  | "click-bib"
  | "show-sidebar"
  | "link-popup"
  | "linking"
  | "linked"
  | "back-to-editor"
  | "typing-cite"
  | "autocomplete"
  | "selecting"
  | "bib-popup"
  | "adding"
  | "success"
  | "complete";

export function CitationLinkingDemo() {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.3, triggerOnce: false });
  const [phase, setPhase] = useState<DemoPhase>("editor");
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [typedText, setTypedText] = useState("");
  const [highlightedRef, setHighlightedRef] = useState(0);
  const [selectedBib, setSelectedBib] = useState<string | null>(null);

  // Reset when out of view
  useEffect(() => {
    if (!isInView) {
      setPhase("editor");
      setSelectedCollections([]);
      setTypedText("");
      setHighlightedRef(0);
      setSelectedBib(null);
    }
  }, [isInView]);

  // Demo sequence - much slower timings for visibility
  useEffect(() => {
    if (!isInView) return;

    const sequence = [
      // Step 1: Click bibliography tab (highlight it) - 2s visible
      { delay: 2000, action: () => setPhase("click-bib") },

      // Step 2: Show bibliography sidebar with empty state - 3s visible
      { delay: 4000, action: () => setPhase("show-sidebar") },

      // Step 3: Show link popup - 4s visible before any selections
      { delay: 7000, action: () => setPhase("link-popup") },

      // Step 4: Select first collection - 3s visible with checkbox animation
      { delay: 11000, action: () => setSelectedCollections(["ml"]) },

      // Step 5: Select second collection - 3s visible
      { delay: 14000, action: () => setSelectedCollections(["ml", "transformers"]) },

      // Step 6: Pause to see both selected - 3s
      // Step 7: Linking animation - 3s visible with spinner
      { delay: 17000, action: () => setPhase("linking") },

      // Step 8: Show linked collections with references - 6s visible
      { delay: 20000, action: () => setPhase("linked") },

      // Step 9: Back to editor - 3s before typing
      { delay: 26000, action: () => setPhase("back-to-editor") },

      // Step 10: Type \cite{ slowly - each char 400ms
      { delay: 29000, action: () => { setPhase("typing-cite"); setTypedText("\\"); } },
      { delay: 29500, action: () => setTypedText("\\c") },
      { delay: 30000, action: () => setTypedText("\\ci") },
      { delay: 30500, action: () => setTypedText("\\cit") },
      { delay: 31000, action: () => setTypedText("\\cite") },
      { delay: 31500, action: () => setTypedText("\\cite{") },

      // Step 11: Show autocomplete dropdown - 4s visible
      { delay: 33000, action: () => setPhase("autocomplete") },

      // Step 12: Navigate through options - 2.5s each
      { delay: 37000, action: () => setHighlightedRef(1) },
      { delay: 39500, action: () => setHighlightedRef(0) },

      // Step 13: Select the reference
      { delay: 42000, action: () => setPhase("selecting") },

      // Step 14: Show bib file selection popup - 4s visible before selection
      { delay: 43500, action: () => setPhase("bib-popup") },

      // Step 15: Select bib file - 3s visible with selection
      { delay: 47500, action: () => setSelectedBib("references.bib") },

      // Step 16: Adding animation - 2.5s visible
      { delay: 50500, action: () => setPhase("adding") },

      // Step 17: Success! - 6s visible
      { delay: 53000, action: () => setPhase("success") },
      { delay: 59000, action: () => setPhase("complete") },

      // Reset after showing success
      { delay: 64000, action: () => {
        setPhase("editor");
        setSelectedCollections([]);
        setTypedText("");
        setHighlightedRef(0);
        setSelectedBib(null);
      }},
    ];

    const timers = sequence.map(({ delay, action }) => setTimeout(action, delay));
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const showBibSidebar = ["show-sidebar", "link-popup", "linking", "linked"].includes(phase);
  const showLinkPopup = phase === "link-popup" || phase === "linking";
  const showAutocomplete = ["autocomplete", "selecting"].includes(phase);
  const showBibPopup = ["bib-popup", "adding"].includes(phase);
  const showSuccess = phase === "success" || phase === "complete";

  // Get the code content based on phase
  const getEditorContent = () => {
    const baseLines = [
      { num: 1, content: "\\documentclass{article}", color: "#0EA5E9" },
      { num: 2, content: "\\usepackage{natbib}", color: "#0EA5E9" },
      { num: 3, content: "", color: "" },
      { num: 4, content: "\\begin{document}", color: "#0EA5E9" },
      { num: 5, content: "", color: "" },
      { num: 6, content: "\\section{Related Work}", color: "#22C55E" },
      { num: 7, content: "", color: "" },
      { num: 8, content: "Transformers have revolutionized NLP.", color: "#E6ECF6" },
    ];

    // During linking phases, show base content
    if (["editor", "click-bib", "show-sidebar", "link-popup", "linking", "linked"].includes(phase)) {
      return [
        ...baseLines,
        { num: 9, content: "", color: "" },
      ];
    }

    // When typing \cite{
    if (["back-to-editor", "typing-cite", "autocomplete", "selecting", "bib-popup", "adding"].includes(phase)) {
      return [
        { num: 1, content: "\\documentclass{article}", color: "#0EA5E9" },
        { num: 2, content: "\\usepackage{natbib}", color: "#0EA5E9" },
        { num: 3, content: "", color: "" },
        { num: 4, content: "\\begin{document}", color: "#0EA5E9" },
        { num: 5, content: "", color: "" },
        { num: 6, content: "\\section{Related Work}", color: "#22C55E" },
        { num: 7, content: "", color: "" },
        { num: 8, content: "Transformers have revolutionized NLP. The", color: "#E6ECF6" },
        { num: 9, content: `attention mechanism ${typedText}`, color: "#E6ECF6", highlight: true },
        { num: 10, content: "", color: "" },
      ];
    }

    // Success state
    if (showSuccess) {
      return [
        { num: 1, content: "\\documentclass{article}", color: "#0EA5E9" },
        { num: 2, content: "\\usepackage{natbib}", color: "#0EA5E9" },
        { num: 3, content: "", color: "" },
        { num: 4, content: "\\begin{document}", color: "#0EA5E9" },
        { num: 5, content: "", color: "" },
        { num: 6, content: "\\section{Related Work}", color: "#22C55E" },
        { num: 7, content: "", color: "" },
        { num: 8, content: "Transformers have revolutionized NLP. The", color: "#E6ECF6" },
        { num: 9, content: "attention mechanism \\cite{vaswani2017attention}", color: "#E6ECF6", citationAdded: true },
        { num: 10, content: "", color: "" },
      ];
    }

    return baseLines;
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
        <div className="w-12 flex-shrink-0 border-r border-[#242E3C] flex flex-col items-center py-3 gap-2" style={{ backgroundColor: "#0E1218" }}>
          <div className="w-8 h-8 flex items-center justify-center mb-3">
            <img src={PLATFORM_ICONS.logo} alt="Citable" className="w-7 h-7" />
          </div>

          {/* Explorer - active when in editor */}
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 ${
            !showBibSidebar ? "bg-[#0EA5E9]/10 border-l-2 border-[#0EA5E9]" : ""
          }`}>
            <img src={PLATFORM_ICONS.explorer} alt="Explorer" className={`w-4 h-4 ${!showBibSidebar ? "opacity-90" : "opacity-40"}`} />
          </div>

          {/* Bibliography - active when clicked */}
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 ${
              showBibSidebar ? "bg-[#0EA5E9]/10 border-l-2 border-[#0EA5E9]" : ""
            } ${phase === "click-bib" ? "ring-2 ring-[#0EA5E9] ring-opacity-50 animate-pulse" : ""}`}
          >
            <img src={PLATFORM_ICONS.bibliography} alt="Bibliography" className={`w-4 h-4 ${showBibSidebar ? "opacity-90" : "opacity-40"}`} />
          </div>

          <div className="flex-1" />
        </div>

        {/* File Explorer Sidebar - shown when in editor mode */}
        {!showBibSidebar && (
          <div className="w-44 flex-shrink-0 border-r border-[#242E3C] flex flex-col" style={{ backgroundColor: "#0E1218" }}>
            <div className="px-3 py-2 border-b border-[#242E3C]">
              <span className="text-[11px] font-medium text-[#E6ECF6]">EXPLORER</span>
            </div>
            <div className="p-2">
              <div className="flex items-center gap-1.5 px-2 py-1">
                <ChevronDown className="w-3 h-3 text-[#8694A6]" />
                <Folder className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span className="text-[12px] text-[#E6ECF6]">my-thesis</span>
              </div>
              <div className="ml-4 space-y-0.5">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#0EA5E9]/10">
                  <FileText className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span className="text-[12px] text-[#E6ECF6]">main.tex</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1">
                  <File className="w-3.5 h-3.5 text-[#A28AE5]" />
                  <span className="text-[12px] text-[#A4B4C8]">references.bib</span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1">
                  <File className="w-3.5 h-3.5 text-[#A28AE5]" />
                  <span className="text-[12px] text-[#A4B4C8]">related-work.bib</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bibliography Sidebar - shown when bib tab is active */}
        {showBibSidebar && (
          <div
            className="w-56 flex-shrink-0 border-r border-[#242E3C] flex flex-col animate-slide-in-left"
            style={{ backgroundColor: "#0E1218" }}
          >
            <div className="px-3 py-2 border-b border-[#242E3C] flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#E6ECF6]">LINKED COLLECTIONS</span>
              <button
                className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] transition-all ${
                  phase === "show-sidebar"
                    ? "bg-[#0EA5E9] text-white animate-pulse"
                    : "bg-[#1E2630] text-[#A4B4C8]"
                }`}
              >
                <Link2 className="w-3 h-3" />
                Link
              </button>
            </div>

            {/* Linked collections list */}
            <div className="flex-1 overflow-y-auto p-2">
              {phase === "linked" && selectedCollections.length > 0 ? (
                <div className="space-y-1">
                  {selectedCollections.map((id, i) => {
                    const collection = LIBRARY_COLLECTIONS.find(c => c.id === id);
                    return collection ? (
                      <div
                        key={id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-[#1E2630]">
                          <ChevronDown className="w-3 h-3 text-[#8694A6]" />
                          <Folder className="w-3.5 h-3.5 text-[#0EA5E9]" />
                          <span className="text-[12px] text-[#E6ECF6] flex-1">{collection.name}</span>
                          <span className="text-[10px] text-[#8694A6]">{collection.count}</span>
                        </div>
                        {/* Show references in collection */}
                        <div className="ml-5 mt-1 space-y-0.5">
                          {LINKED_REFERENCES.slice(i * 2, (i * 2) + 2).map((ref) => (
                            <div
                              key={ref.key}
                              className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] text-[#A4B4C8] hover:bg-[#1E2630]"
                            >
                              <FileText className="w-3 h-3 text-[#FF6467]" />
                              <span className="truncate">{ref.title.slice(0, 25)}...</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              ) : (
                /* Empty state - more prominent */
                <div className="flex flex-col items-center justify-center py-8 px-4">
                  <div className="w-12 h-12 rounded-full bg-[#1E2630] flex items-center justify-center mb-3">
                    <Link2 className="w-6 h-6 text-[#0EA5E9]" />
                  </div>
                  <p className="text-[12px] text-[#E6ECF6] font-medium mb-1">No collections linked</p>
                  <p className="text-[10px] text-[#8694A6] text-center mb-3">
                    Link folders from your library to enable citation autocomplete
                  </p>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] ${
                    phase === "show-sidebar"
                      ? "bg-[#0EA5E9] text-white animate-pulse"
                      : "bg-[#1E2630] text-[#A4B4C8]"
                  }`}>
                    <Link2 className="w-3.5 h-3.5" />
                    Click to Link Collections
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Editor */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Editor Tabs */}
          <div className="flex items-center border-b border-[#242E3C] px-2" style={{ backgroundColor: "#0E1218" }}>
            <div className="flex items-center gap-2 px-3 py-2 border-b-2 border-[#0EA5E9]" style={{ backgroundColor: "#161C24" }}>
              <FileText className="w-3.5 h-3.5 text-[#22C55E]" />
              <span className="text-[12px] text-[#E6ECF6]">main.tex</span>
            </div>
          </div>

          {/* Editor Content */}
          <div className="flex-1 overflow-auto p-4 font-mono text-[12px]" style={{ backgroundColor: "#0D1117" }}>
            {getEditorContent().map((line) => (
              <div key={line.num} className="flex">
                <span className="w-8 text-right pr-4 text-[#484F58] select-none">{line.num}</span>
                <span
                  className={`flex-1 ${line.highlight ? "relative" : ""}`}
                  style={{ color: line.color || "#E6ECF6" }}
                >
                  {line.content}
                  {line.highlight && (
                    <span className="animate-blink">|</span>
                  )}
                  {line.citationAdded && (
                    <span className="ml-2 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#22C55E]/20 text-[#22C55E] text-[10px]">
                      <Check className="w-3 h-3" />
                      Added!
                    </span>
                  )}
                </span>
              </div>
            ))}
          </div>

          {/* Autocomplete Dropdown */}
          {showAutocomplete && (
            <div
              className="absolute left-[60px] top-[200px] w-[340px] rounded-lg border border-[#242E3C] shadow-2xl overflow-hidden animate-scale-in z-20"
              style={{ backgroundColor: "#161C24" }}
            >
              <div className="px-3 py-2 border-b border-[#242E3C] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0EA5E9]" />
                <span className="text-[11px] text-[#8694A6]">From linked collections</span>
              </div>
              <div className="max-h-[180px] overflow-y-auto">
                {LINKED_REFERENCES.map((ref, i) => (
                  <div
                    key={ref.key}
                    className={`px-3 py-2 flex items-start gap-3 cursor-pointer transition-colors ${
                      highlightedRef === i ? "bg-[#0EA5E9]/20" : "hover:bg-[#1E2630]"
                    }`}
                  >
                    <FileText className={`w-4 h-4 mt-0.5 ${highlightedRef === i ? "text-[#0EA5E9]" : "text-[#FF6467]"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] text-[#E6ECF6] font-mono truncate">{ref.key}</div>
                      <div className="text-[10px] text-[#8694A6] truncate">{ref.title}</div>
                      <div className="text-[10px] text-[#8694A6]">{ref.authors}, {ref.year}</div>
                    </div>
                    {highlightedRef === i && (
                      <span className="text-[10px] text-[#0EA5E9] bg-[#0EA5E9]/10 px-1.5 py-0.5 rounded">Enter</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bib File Selection Popup */}
          {showBibPopup && (
            <div className="absolute inset-0 bg-[#080A10]/80 backdrop-blur-sm flex items-center justify-center z-30 animate-fade-in">
              <div
                className="w-[280px] rounded-xl border border-[#242E3C] overflow-hidden shadow-2xl animate-scale-in"
                style={{ backgroundColor: "#0E1218" }}
              >
                <div className="px-4 py-3 border-b border-[#242E3C]">
                  <h3 className="text-[13px] font-semibold text-[#E6ECF6]">Add to .bib file</h3>
                  <p className="text-[11px] text-[#8694A6] mt-1">Choose where to save this reference</p>
                </div>
                <div className="p-3 space-y-2">
                  {BIB_FILES.map((file) => (
                    <div
                      key={file.name}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        selectedBib === file.name
                          ? "bg-[#0EA5E9]/20 border border-[#0EA5E9]"
                          : "bg-[#171F2A] hover:bg-[#1E2630] border border-transparent"
                      }`}
                    >
                      <File className={`w-5 h-5 ${selectedBib === file.name ? "text-[#0EA5E9]" : "text-[#A28AE5]"}`} />
                      <div className="flex-1">
                        <div className="text-[12px] text-[#E6ECF6]">{file.name}</div>
                        <div className="text-[10px] text-[#8694A6]">{file.count} references</div>
                      </div>
                      {selectedBib === file.name && (
                        <div className="w-5 h-5 rounded-full bg-[#0EA5E9] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {phase === "adding" && (
                  <div className="px-4 py-3 border-t border-[#242E3C] flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#0EA5E9] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[11px] text-[#0EA5E9]">Adding reference...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Link Collections Popup */}
          {showLinkPopup && (
            <div className="absolute inset-0 bg-[#080A10]/80 backdrop-blur-sm flex items-center justify-center z-30 animate-fade-in">
              <div
                className="w-[300px] rounded-xl border border-[#242E3C] overflow-hidden shadow-2xl animate-scale-in"
                style={{ backgroundColor: "#0E1218" }}
              >
                <div className="px-4 py-3 border-b border-[#242E3C]">
                  <h3 className="text-[13px] font-semibold text-[#E6ECF6] flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-[#0EA5E9]" />
                    Link Collections
                  </h3>
                  <p className="text-[11px] text-[#8694A6] mt-1">Select collections from your library</p>
                </div>
                <div className="p-3 space-y-2">
                  {LIBRARY_COLLECTIONS.map((collection) => (
                    <div
                      key={collection.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        selectedCollections.includes(collection.id)
                          ? "bg-[#0EA5E9]/20 border border-[#0EA5E9]"
                          : "bg-[#171F2A] hover:bg-[#1E2630] border border-transparent"
                      }`}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        selectedCollections.includes(collection.id)
                          ? "bg-[#0EA5E9] border-[#0EA5E9]"
                          : "border-[#3A4A5C]"
                      }`}>
                        {selectedCollections.includes(collection.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <Folder className="w-4 h-4 text-[#0EA5E9]" />
                      <div className="flex-1">
                        <div className="text-[12px] text-[#E6ECF6]">{collection.name}</div>
                      </div>
                      <span className="text-[10px] text-[#8694A6]">{collection.count} refs</span>
                    </div>
                  ))}
                </div>
                {phase === "linking" && (
                  <div className="px-4 py-3 border-t border-[#242E3C] flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-[#0EA5E9] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[11px] text-[#0EA5E9]">Linking collections...</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Success Toast */}
          {showSuccess && (
            <div
              className="absolute bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg border border-[#22C55E]/30 shadow-lg animate-slide-up z-40"
              style={{ backgroundColor: "#22C55E20" }}
            >
              <div className="w-8 h-8 rounded-full bg-[#22C55E] flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-[12px] font-medium text-[#22C55E]">Citation Added!</div>
                <div className="text-[10px] text-[#8694A6]">Added to references.bib</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
        @keyframes slide-in-left {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-left {
          animation: slide-in-left 0.3s ease-out;
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default CitationLinkingDemo;
