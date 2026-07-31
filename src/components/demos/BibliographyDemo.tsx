import { useState, useEffect } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Folder,
  FileText,
  Upload,
  CheckCircle2,
  File,
  X,
  ExternalLink,
  Tag,
} from "lucide-react";
import { useInViewAnimation } from "./shared";

// Platform icons - matching the real Citable IDE
const PLATFORM_ICONS = {
  logo: "/assets/platform-icons/activity-bar/logo-platform.svg",
  bibliography: "/assets/platform-icons/activity-bar/Group.png",
  search: "/assets/platform-icons/ide/icones-search.svg",
  settings: "/assets/platform-icons/activity-bar/Calque_1-1.png",
};

interface Reference {
  id: string;
  title: string;
  authors: string;
  year: string;
  hasPdf: boolean;
  journal?: string;
  doi?: string;
  tags?: string[];
}

// References that appear after .bib import
const BIB_REFERENCES: Reference[] = [
  { id: "1", title: "Attention Is All You Need", authors: "Vaswani, A. et al.", year: "2017", hasPdf: false, journal: "NeurIPS 2017", doi: "10.48550/arXiv.1706.03762", tags: ["transformers", "NLP"] },
  { id: "2", title: "BERT: Pre-training of Deep Bidirectional Transformers", authors: "Devlin, J. et al.", year: "2019", hasPdf: false, journal: "NAACL 2019", doi: "10.18653/v1/N19-1423", tags: ["transformers", "deep-learning"] },
  { id: "3", title: "Language Models are Few-Shot Learners", authors: "Brown, T. et al.", year: "2020", hasPdf: false, journal: "NeurIPS 2020", doi: "10.48550/arXiv.2005.14165", tags: ["NLP", "deep-learning"] },
];

// Additional references from PDF upload
const PDF_REFERENCES: Reference[] = [
  { id: "4", title: "Scaling Laws for Neural Language Models", authors: "Kaplan, J. et al.", year: "2020", hasPdf: true, journal: "arXiv", doi: "10.48550/arXiv.2001.08361", tags: ["transformers"] },
  { id: "5", title: "An Image is Worth 16x16 Words", authors: "Dosovitskiy, A. et al.", year: "2021", hasPdf: true, journal: "ICLR 2021", doi: "10.48550/arXiv.2010.11929", tags: ["deep-learning"] },
  { id: "6", title: "Chain-of-Thought Prompting", authors: "Wei, J. et al.", year: "2022", hasPdf: true, journal: "NeurIPS 2022", doi: "10.48550/arXiv.2201.11903", tags: ["NLP"] },
];

const COLLECTIONS = [
  { id: "1", name: "Machine Learning", hasChildren: true, isOpen: true },
  { id: "2", name: "Transformers", parent: "1" },
];

const TAGS = [
  { name: "transformers", color: "#0EA5E9" },
  { name: "deep-learning", color: "#22C55E" },
  { name: "NLP", color: "#A28AE5" },
];

type DemoPhase = "idle" | "dropzone" | "bib-uploading" | "bib-done" | "pdf-uploading" | "pdf-done" | "complete";

export function BibliographyDemo() {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.3, triggerOnce: false });
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [visibleBibRefs, setVisibleBibRefs] = useState<string[]>([]);
  const [visiblePdfRefs, setVisiblePdfRefs] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedRef, setSelectedRef] = useState<Reference | null>(null);

  // Reset when out of view
  useEffect(() => {
    if (!isInView) {
      setPhase("idle");
      setVisibleBibRefs([]);
      setVisiblePdfRefs([]);
      setUploadProgress(0);
      setSelectedRef(null);
    }
  }, [isInView]);

  // Demo sequence
  useEffect(() => {
    if (!isInView) return;

    const sequence = [
      // Show dropzone
      { delay: 500, action: () => setPhase("dropzone") },
      // Start .bib upload
      { delay: 1500, action: () => { setPhase("bib-uploading"); setUploadProgress(0); } },
      { delay: 1800, action: () => setUploadProgress(30) },
      { delay: 2100, action: () => setUploadProgress(70) },
      { delay: 2400, action: () => setUploadProgress(100) },
      { delay: 2700, action: () => setPhase("bib-done") },
      // Show .bib references appearing
      { delay: 3000, action: () => setVisibleBibRefs(["1"]) },
      { delay: 3200, action: () => setVisibleBibRefs(["1", "2"]) },
      { delay: 3400, action: () => setVisibleBibRefs(["1", "2", "3"]) },
      // Start PDF upload
      { delay: 4500, action: () => { setPhase("pdf-uploading"); setUploadProgress(0); } },
      { delay: 4800, action: () => setUploadProgress(25) },
      { delay: 5100, action: () => setUploadProgress(50) },
      { delay: 5400, action: () => setUploadProgress(75) },
      { delay: 5700, action: () => setUploadProgress(100) },
      { delay: 6000, action: () => setPhase("pdf-done") },
      // Show PDF references appearing
      { delay: 6300, action: () => setVisiblePdfRefs(["4"]) },
      { delay: 6500, action: () => setVisiblePdfRefs(["4", "5"]) },
      { delay: 6700, action: () => setVisiblePdfRefs(["4", "5", "6"]) },
      // Complete
      { delay: 7500, action: () => setPhase("complete") },
      // Open sidebar for first reference
      { delay: 8200, action: () => setSelectedRef(BIB_REFERENCES[0]) },
      // Switch to another reference
      { delay: 9500, action: () => setSelectedRef(PDF_REFERENCES[0]) },
      // Close sidebar
      { delay: 10800, action: () => setSelectedRef(null) },
      // Reset
      { delay: 12500, action: () => {
        setPhase("idle");
        setVisibleBibRefs([]);
        setVisiblePdfRefs([]);
        setUploadProgress(0);
        setSelectedRef(null);
      }},
    ];

    const timers = sequence.map(({ delay, action }) => setTimeout(action, delay));
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const allReferences = [
    ...BIB_REFERENCES.filter(r => visibleBibRefs.includes(r.id)),
    ...PDF_REFERENCES.filter(r => visiblePdfRefs.includes(r.id)),
  ];

  const showUploadOverlay = phase === "dropzone" || phase === "bib-uploading" || phase === "bib-done" || phase === "pdf-uploading" || phase === "pdf-done";

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
          <div className="w-9 h-9 rounded-lg bg-[#0EA5E9]/10 border-l-2 border-[#0EA5E9] flex items-center justify-center">
            <img src={PLATFORM_ICONS.bibliography} alt="Bibliography" className="w-4 h-4 opacity-90" />
          </div>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center">
            <img src={PLATFORM_ICONS.search} alt="Search" className="w-4 h-4 opacity-40" />
          </div>
          <div className="flex-1" />
          <div className="w-9 h-9 rounded-lg flex items-center justify-center">
            <img src={PLATFORM_ICONS.settings} alt="Settings" className="w-4 h-4 opacity-40" />
          </div>
        </div>

        {/* Left Sidebar - Collections & Tags */}
        <div className="w-44 flex-shrink-0 border-r border-[#242E3C] flex flex-col" style={{ backgroundColor: "#0E1218" }}>
          {/* Search */}
          <div className="p-2.5 border-b border-[#242E3C]">
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-[#8694A6]" style={{ backgroundColor: "#171F2A" }}>
              <Search className="w-3.5 h-3.5" />
              <span>Search...</span>
            </div>
          </div>

          {/* Collections */}
          <div className="flex-1 overflow-auto">
            <div className="p-2.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-[#8694A6] uppercase tracking-wide">Collections</span>
              </div>
              <div className="space-y-0.5">
                {COLLECTIONS.filter(c => !c.parent).map((collection) => (
                  <div key={collection.id}>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer hover:bg-[#1E2630] group">
                      {collection.hasChildren ? (
                        collection.isOpen ? (
                          <ChevronDown className="w-3 h-3 text-[#8694A6]" />
                        ) : (
                          <ChevronRight className="w-3 h-3 text-[#8694A6]" />
                        )
                      ) : (
                        <div className="w-3" />
                      )}
                      <Folder className="w-3.5 h-3.5 text-[#0EA5E9]" />
                      <span className="text-[12px] text-[#A4B4C8] flex-1 truncate group-hover:text-[#E6ECF6]">
                        {collection.name}
                      </span>
                    </div>
                    {collection.isOpen && COLLECTIONS.filter(c => c.parent === collection.id).map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center gap-1.5 px-2 py-1 ml-4 rounded cursor-pointer hover:bg-[#1E2630] group"
                      >
                        <Folder className="w-3.5 h-3.5 text-[#0EA5E9]" />
                        <span className="text-[12px] text-[#A4B4C8] flex-1 truncate group-hover:text-[#E6ECF6]">
                          {child.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="p-2.5 border-t border-[#242E3C]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-[#8694A6] uppercase tracking-wide">Tags</span>
              </div>
              <div className="space-y-0.5">
                {TAGS.map((tag) => (
                  <div
                    key={tag.name}
                    className="flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer hover:bg-[#1E2630] group"
                  >
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tag.color }} />
                    <span className="text-[12px] text-[#A4B4C8] flex-1 truncate group-hover:text-[#E6ECF6]">
                      {tag.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`flex flex-col min-w-0 relative transition-all duration-300 ${selectedRef ? "flex-1" : "flex-1"}`} style={{ backgroundColor: "#080A10" }}>
          {/* Toolbar */}
          <div className="px-3 py-2 border-b border-[#242E3C] flex items-center justify-between" style={{ backgroundColor: "#0E1218" }}>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-medium text-[#E6ECF6]">All References</span>
              <span className="text-[11px] text-[#8694A6] bg-[#1E2630] px-1.5 py-0.5 rounded">
                {allReferences.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-[#A4B4C8] hover:text-[#E6ECF6] hover:bg-[#1E2630] transition-colors">
                <Upload className="w-3 h-3" />
                Import
              </button>
            </div>
          </div>

          {/* Table or Empty State */}
          <div className="flex-1 overflow-hidden relative">
            {allReferences.length === 0 && phase === "idle" ? (
              /* Empty State */
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-[#1E2630] flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-[#8694A6]" />
                </div>
                <h3 className="text-[15px] font-medium text-[#E6ECF6] mb-2">No references yet</h3>
                <p className="text-[12px] text-[#8694A6] mb-4 max-w-[200px]">
                  Drop .bib or PDF files here to get started
                </p>
              </div>
            ) : (
              /* Table */
              <>
                {/* Table Header */}
                <div className="flex items-center border-b border-[#1A222C] text-[10px] uppercase tracking-wider text-[#8694A6] font-semibold" style={{ backgroundColor: "#161C24" }}>
                  <div className="w-8 px-2 py-2"></div>
                  <div className="flex-1 px-2 py-2">Title</div>
                  {!selectedRef && (
                    <div className="w-12 px-2 py-2 text-center">Year</div>
                  )}
                </div>

                {/* Table Rows */}
                <div className="overflow-y-auto" style={{ maxHeight: "calc(100% - 32px)" }}>
                  {allReferences.map((reference, index) => (
                    <div
                      key={reference.id}
                      onClick={() => setSelectedRef(reference)}
                      className={`flex items-center border-b border-[#1A222C] hover:bg-[#1E2630] transition-all duration-300 animate-fade-in cursor-pointer ${
                        selectedRef?.id === reference.id ? "bg-[#0EA5E9]/10 border-l-2 border-l-[#0EA5E9]" : ""
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="w-8 px-2 py-2 flex items-center justify-center">
                        {reference.hasPdf ? (
                          <FileText className="w-4 h-4 text-[#FF6467]" />
                        ) : (
                          <File className="w-4 h-4 text-[#8694A6]" />
                        )}
                      </div>
                      <div className="flex-1 px-2 py-2 min-w-0">
                        <div className="text-[12px] text-[#E6ECF6] truncate">{reference.title}</div>
                        <div className="text-[10px] text-[#8694A6] truncate">{reference.authors}</div>
                      </div>
                      {!selectedRef && (
                        <div className="w-12 px-2 py-2 text-center">
                          <div className="text-[11px] text-[#A4B4C8]">{reference.year}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Upload Overlay */}
            {showUploadOverlay && (
              <div className="absolute inset-0 bg-[#080A10]/90 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="w-[280px] rounded-xl border border-[#242E3C] overflow-hidden" style={{ backgroundColor: "#0E1218" }}>
                  {/* Upload Header */}
                  <div className="px-4 py-3 border-b border-[#242E3C]">
                    <h3 className="text-[13px] font-semibold text-[#E6ECF6]">
                      {phase === "dropzone" && "Import References"}
                      {(phase === "bib-uploading" || phase === "bib-done") && "Importing .bib file"}
                      {(phase === "pdf-uploading" || phase === "pdf-done") && "Uploading PDFs"}
                    </h3>
                  </div>

                  {/* Upload Content */}
                  <div className="p-4">
                    {phase === "dropzone" && (
                      <div className="border-2 border-dashed border-[#3A4A5C] rounded-lg p-6 text-center hover:border-[#0EA5E9] transition-colors">
                        <Upload className="w-10 h-10 text-[#8694A6] mx-auto mb-3" />
                        <p className="text-[12px] text-[#A4B4C8] mb-1">
                          Drop files here or click to browse
                        </p>
                        <p className="text-[10px] text-[#8694A6]">
                          .bib, .pdf (multiple supported)
                        </p>
                      </div>
                    )}

                    {(phase === "bib-uploading" || phase === "bib-done") && (
                      <div className="space-y-3">
                        {/* File info */}
                        <div className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: "#171F2A" }}>
                          <div className="w-10 h-10 rounded-lg bg-[#22C55E]/10 flex items-center justify-center">
                            <span className="text-[10px] font-bold text-[#22C55E]">BIB</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[12px] text-[#E6ECF6] truncate">references.bib</div>
                            <div className="text-[10px] text-[#8694A6]">24 references found</div>
                          </div>
                          {phase === "bib-done" && (
                            <CheckCircle2 className="w-5 h-5 text-[#22C55E]" />
                          )}
                        </div>

                        {/* Progress bar */}
                        {phase === "bib-uploading" && (
                          <div className="space-y-1.5">
                            <div className="h-1.5 bg-[#1E2630] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#0EA5E9] rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <div className="text-[10px] text-[#8694A6] text-right">{uploadProgress}%</div>
                          </div>
                        )}

                        {phase === "bib-done" && (
                          <div className="text-[11px] text-[#22C55E] text-center py-1">
                            ✓ Import complete
                          </div>
                        )}
                      </div>
                    )}

                    {(phase === "pdf-uploading" || phase === "pdf-done") && (
                      <div className="space-y-3">
                        {/* Multiple files */}
                        <div className="space-y-2">
                          {["Scaling_Laws_2020.pdf", "ViT_2021.pdf", "CoT_Prompting_2022.pdf"].map((file, i) => (
                            <div key={file} className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: "#171F2A" }}>
                              <div className="w-8 h-8 rounded bg-[#FF6467]/10 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-[#FF6467]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[11px] text-[#E6ECF6] truncate">{file}</div>
                              </div>
                              {(phase === "pdf-done" || (phase === "pdf-uploading" && uploadProgress > (i + 1) * 30)) && (
                                <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Progress bar */}
                        {phase === "pdf-uploading" && (
                          <div className="space-y-1.5">
                            <div className="h-1.5 bg-[#1E2630] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#0EA5E9] rounded-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <div className="text-[10px] text-[#8694A6] text-right">
                              Uploading 3 files... {uploadProgress}%
                            </div>
                          </div>
                        )}

                        {phase === "pdf-done" && (
                          <div className="text-[11px] text-[#22C55E] text-center py-1">
                            ✓ 3 PDFs uploaded, metadata extracted
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reference Detail Sidebar */}
        <div
          className={`flex-shrink-0 border-l border-[#242E3C] flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
            selectedRef ? "w-52 opacity-100" : "w-0 opacity-0"
          }`}
          style={{ backgroundColor: "#0E1218" }}
        >
          {selectedRef && (
            <div className="w-52 flex flex-col h-full">
              {/* Header */}
              <div className="px-3 py-2 border-b border-[#242E3C] flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#E6ECF6]">Details</span>
                <button
                  onClick={() => setSelectedRef(null)}
                  className="p-1 rounded hover:bg-[#1E2630] transition-colors"
                >
                  <X className="w-3 h-3 text-[#8694A6]" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {/* Title */}
                <div>
                  <div className="text-[10px] text-[#8694A6] uppercase tracking-wide mb-1">Title</div>
                  <div className="text-[12px] text-[#E6ECF6] leading-relaxed">{selectedRef.title}</div>
                </div>

                {/* Authors */}
                <div>
                  <div className="text-[10px] text-[#8694A6] uppercase tracking-wide mb-1">Authors</div>
                  <div className="text-[11px] text-[#A4B4C8]">{selectedRef.authors}</div>
                </div>

                {/* Year & Journal */}
                <div className="flex gap-4">
                  <div>
                    <div className="text-[10px] text-[#8694A6] uppercase tracking-wide mb-1">Year</div>
                    <div className="text-[11px] text-[#A4B4C8]">{selectedRef.year}</div>
                  </div>
                  {selectedRef.journal && (
                    <div className="flex-1">
                      <div className="text-[10px] text-[#8694A6] uppercase tracking-wide mb-1">Journal</div>
                      <div className="text-[11px] text-[#A4B4C8] truncate">{selectedRef.journal}</div>
                    </div>
                  )}
                </div>

                {/* DOI */}
                {selectedRef.doi && (
                  <div>
                    <div className="text-[10px] text-[#8694A6] uppercase tracking-wide mb-1">DOI</div>
                    <div className="flex items-center gap-1 text-[10px] text-[#0EA5E9]">
                      <ExternalLink className="w-3 h-3" />
                      <span className="truncate">{selectedRef.doi}</span>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {selectedRef.tags && selectedRef.tags.length > 0 && (
                  <div>
                    <div className="text-[10px] text-[#8694A6] uppercase tracking-wide mb-2 flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      Tags
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedRef.tags.map((tag) => {
                        const tagData = TAGS.find(t => t.name === tag);
                        return (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full text-[10px]"
                            style={{
                              backgroundColor: tagData ? `${tagData.color}20` : "#1E2630",
                              color: tagData?.color || "#A4B4C8"
                            }}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* PDF Status */}
                <div className="pt-2 border-t border-[#242E3C]">
                  <div className="flex items-center gap-2">
                    {selectedRef.hasPdf ? (
                      <>
                        <FileText className="w-4 h-4 text-[#FF6467]" />
                        <span className="text-[11px] text-[#22C55E]">PDF attached</span>
                      </>
                    ) : (
                      <>
                        <File className="w-4 h-4 text-[#8694A6]" />
                        <span className="text-[11px] text-[#8694A6]">No PDF</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BibliographyDemo;
