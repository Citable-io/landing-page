import { useState, useEffect } from "react";
import { FileText, Upload, Check, X } from "lucide-react";

interface UseInViewAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

function useInViewAnimation(options: UseInViewAnimationOptions = {}) {
  const { threshold = 0.3, triggerOnce = false } = options;
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.unobserve(ref);
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold, triggerOnce]);

  return { ref: setRef, isInView };
}

type AnimationState = "idle" | "dropping" | "processing" | "complete";

const GettingStartedSection = () => {
  const { ref, isInView } = useInViewAnimation({ threshold: 0.3, triggerOnce: false });
  const [bibState, setBibState] = useState<AnimationState>("idle");
  const [zipState, setZipState] = useState<AnimationState>("idle");
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  // Reset animations when out of view
  useEffect(() => {
    if (!isInView) {
      setBibState("idle");
      setZipState("idle");
      setSelectedRow(null);
    }
  }, [isInView]);

  // Bib file animation sequence
  useEffect(() => {
    if (!isInView) return;

    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setBibState("dropping"), 500));
    timers.push(setTimeout(() => setBibState("processing"), 1500));
    timers.push(setTimeout(() => {
      setBibState("complete");
    }, 2500));
    // Select a row to show sidebar
    timers.push(setTimeout(() => {
      setSelectedRow("1");
    }, 3500));

    // Loop the animation
    timers.push(setTimeout(() => {
      setBibState("idle");
      setSelectedRow(null);
    }, 9000));

    return () => timers.forEach(clearTimeout);
  }, [isInView, bibState === "idle" && isInView]);

  // Zip file animation sequence (staggered)
  useEffect(() => {
    if (!isInView) return;

    const timers: NodeJS.Timeout[] = [];

    timers.push(setTimeout(() => setZipState("dropping"), 1000));
    timers.push(setTimeout(() => setZipState("processing"), 2000));
    timers.push(setTimeout(() => setZipState("complete"), 3000));

    // Loop the animation
    timers.push(setTimeout(() => {
      setZipState("idle");
    }, 9500));

    return () => timers.forEach(clearTimeout);
  }, [isInView, zipState === "idle" && isInView]);

  // Sample references for the table
  const sampleReferences = [
    { id: "1", title: "Attention Is All You Need", authors: "Vaswani, A. et al.", year: "2017", venue: "NeurIPS", tags: ["ML"], doi: "10.48550" },
    { id: "2", title: "BERT: Pre-training of Deep Bidirectional...", authors: "Devlin, J. et al.", year: "2019", venue: "NAACL", tags: ["NLP", "+1"], doi: "10.18653" },
    { id: "3", title: "Language Models are Few-Shot Learners", authors: "Brown, T. et al.", year: "2020", venue: "NeurIPS", tags: ["LLM"], doi: "10.48550" },
  ];

  // Selected reference details
  const selectedReference = sampleReferences.find(r => r.id === selectedRow);

  // Sample files that appear after .zip import
  const sampleFiles = [
    { name: "main.tex", icon: "TEX" },
    { name: "references.bib", icon: "BIB" },
    { name: "figures/", icon: "DIR" },
  ];

  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Get Started in Seconds
          </h2>
          <p className="text-lg text-text-secondary">
            Import your existing work and start writing immediately. No complex setup required.
          </p>
        </div>

        {/* Cards Container */}
        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-8 max-w-6xl mx-auto transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Card 1: Import .bib - Table + Sidebar Design */}
          <div className="relative rounded-2xl border border-[#242E3C] overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
            <div className="p-6">
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0EA5E9]">
                    <path d="M3 7C3 5.89543 3.89543 5 5 5H9.58579C9.851 5 10.1054 5.10536 10.2929 5.29289L12 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Import Library</h3>
                  <p className="text-sm text-text-secondary">Drop your .bib file</p>
                </div>
              </div>

              {/* Animation Area - Bibliography Table + Sidebar */}
              <div className="relative h-80 rounded-xl border border-[#242E3C] overflow-hidden" style={{ backgroundColor: "#080A10" }}>
                {/* Drop Zone */}
                {(bibState === "idle" || bibState === "dropping" || bibState === "processing") && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    {bibState === "idle" && (
                      <div className="text-center animate-pulse">
                        <Upload className="w-8 h-8 text-[#4A5568] mx-auto mb-2" />
                        <span className="text-sm text-[#4A5568]">Drop .bib file here</span>
                      </div>
                    )}

                    {bibState === "dropping" && (
                      <div className="animate-drop-file">
                        <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-lg px-4 py-3 flex items-center gap-3">
                          <FileText className="w-6 h-6 text-[#22C55E]" />
                          <span className="text-sm font-medium text-[#22C55E]">references.bib</span>
                        </div>
                      </div>
                    )}

                    {bibState === "processing" && (
                      <div className="text-center">
                        <div className="w-10 h-10 border-2 border-[#0EA5E9] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <span className="text-sm text-[#8694A6]">Importing references...</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Bibliography Table + Sidebar - Shows after import */}
                {bibState === "complete" && (
                  <div className="flex h-full animate-fade-in">
                    {/* Table Section */}
                    <div className={`flex flex-col transition-all duration-300 ${selectedRow ? 'flex-1' : 'w-full'}`}>
                      {/* Success Banner */}
                      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#1A222C]" style={{ backgroundColor: "#161C24" }}>
                        <Check className="w-3 h-3 text-[#22C55E]" />
                        <span className="text-[10px] text-[#22C55E]">3 references imported</span>
                      </div>

                      {/* Table Header */}
                      <div className="flex items-center px-3 py-2 border-b border-[#1A222C] text-[9px] uppercase tracking-wider text-[#8694A6] font-semibold" style={{ backgroundColor: "#161C24" }}>
                        <div className="flex-1 min-w-0">Title</div>
                        <div className="w-16 text-center hidden sm:block">Year</div>
                        <div className="w-14 text-center">Tags</div>
                      </div>

                      {/* Table Rows */}
                      <div className="flex-1 overflow-hidden">
                        {sampleReferences.map((ref, i) => (
                          <div
                            key={ref.id}
                            onClick={() => setSelectedRow(ref.id)}
                            className={`flex items-center px-3 py-2 border-b border-[#1A222C] cursor-pointer transition-colors duration-75 animate-slide-up ${
                              selectedRow === ref.id
                                ? 'bg-[#0EA5E9]/15'
                                : 'hover:bg-[#1E2630]'
                            }`}
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            <div className="flex-1 min-w-0 pr-2">
                              <div className="text-[11px] text-[#E6ECF6] truncate">{ref.title}</div>
                              <div className="text-[9px] text-[#8694A6] truncate">{ref.authors}</div>
                            </div>
                            <div className="w-16 text-center text-[10px] text-[#A4B4C8] hidden sm:block">{ref.year}</div>
                            <div className="w-14 flex justify-center gap-1">
                              <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#0EA5E9]/15 text-[#0EA5E9]">{ref.tags[0]}</span>
                              {ref.tags[1] && (
                                <span className="text-[8px] px-1.5 py-0.5 rounded bg-[#A855F7]/15 text-[#A855F7]">{ref.tags[1]}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Details Sidebar */}
                    {selectedRow && selectedReference && (
                      <div className="w-36 border-l border-[#1A222C] flex flex-col animate-slide-in-right" style={{ backgroundColor: "#111820" }}>
                        {/* Sidebar Header */}
                        <div className="flex items-center justify-between px-2 py-2 border-b border-[#242E3C]">
                          <span className="text-[9px] uppercase tracking-wider text-[#E6ECF6] font-semibold">Details</span>
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedRow(null); }}
                            className="text-[#8694A6] hover:text-[#E6ECF6]"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Sidebar Content */}
                        <div className="flex-1 p-2 space-y-2 overflow-hidden">
                          <div>
                            <div className="text-[8px] text-[#8694A6] uppercase mb-0.5">Title</div>
                            <div className="text-[9px] text-[#E6ECF6] line-clamp-2">{selectedReference.title}</div>
                          </div>
                          <div>
                            <div className="text-[8px] text-[#8694A6] uppercase mb-0.5">Authors</div>
                            <div className="text-[9px] text-[#A4B4C8]">{selectedReference.authors}</div>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1">
                              <div className="text-[8px] text-[#8694A6] uppercase mb-0.5">Year</div>
                              <div className="text-[9px] text-[#A4B4C8]">{selectedReference.year}</div>
                            </div>
                            <div className="flex-1">
                              <div className="text-[8px] text-[#8694A6] uppercase mb-0.5">Venue</div>
                              <div className="text-[9px] text-[#A4B4C8]">{selectedReference.venue}</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-[8px] text-[#8694A6] uppercase mb-0.5">DOI</div>
                            <div className="text-[9px] text-[#0EA5E9]">{selectedReference.doi}</div>
                          </div>

                          {/* Mini PDF Preview placeholder */}
                          <div className="mt-2 rounded border border-[#242E3C] bg-[#0E1218] p-2 flex items-center justify-center h-16">
                            <div className="text-[8px] text-[#4A5568]">PDF Preview</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary mt-4 text-center">
                Import your existing bibliography instantly
              </p>
            </div>
          </div>

          {/* Card 2: Import .zip */}
          <div className="relative rounded-2xl border border-[#242E3C] overflow-hidden" style={{ backgroundColor: "#0a0a0a" }}>
            <div className="p-6">
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0EA5E9]">
                    <path d="M13 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V9L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 2V9H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Import Project</h3>
                  <p className="text-sm text-text-secondary">Upload your Overleaf .zip</p>
                </div>
              </div>

              {/* Animation Area */}
              <div className="relative h-80 rounded-xl border border-[#242E3C] overflow-hidden" style={{ backgroundColor: "#0E1218" }}>
                {/* Drop Zone / File */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {zipState === "idle" && (
                    <div className="text-center animate-pulse">
                      <Upload className="w-8 h-8 text-[#4A5568] mx-auto mb-2" />
                      <span className="text-sm text-[#4A5568]">Drop .zip file here</span>
                    </div>
                  )}

                  {zipState === "dropping" && (
                    <div className="animate-drop-file">
                      <div className="bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 rounded-lg px-4 py-3 flex items-center gap-3">
                        <FileText className="w-6 h-6 text-[#0EA5E9]" />
                        <span className="text-sm font-medium text-[#0EA5E9]">my-thesis.zip</span>
                      </div>
                    </div>
                  )}

                  {zipState === "processing" && (
                    <div className="text-center">
                      <div className="w-10 h-10 border-2 border-[#0EA5E9] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                      <span className="text-sm text-[#8694A6]">Extracting project...</span>
                    </div>
                  )}

                  {zipState === "complete" && (
                    <div className="w-full h-full flex flex-col animate-fade-in">
                      {/* Success Banner */}
                      <div className="flex items-center gap-2 px-4 py-2 border-b border-[#1A222C]" style={{ backgroundColor: "#161C24" }}>
                        <Check className="w-4 h-4 text-[#0EA5E9]" />
                        <span className="text-xs text-[#0EA5E9]">Project ready to edit</span>
                      </div>

                      {/* File Tree */}
                      <div className="flex-1 py-2">
                        {sampleFiles.map((file, i) => (
                          <div
                            key={file.name}
                            className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-75 animate-slide-up ${
                              file.name === "main.tex" ? 'bg-[#0EA5E9]/10' : 'hover:bg-[#1E2630]'
                            }`}
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            <div className="w-4" />
                            <span className={`text-[10px] font-medium ${
                              file.icon === "TEX" ? "text-[#0EA5E9]" :
                              file.icon === "BIB" ? "text-[#22C55E]" : "text-[#8694A6]"
                            }`}>
                              {file.icon}
                            </span>
                            <span className={`text-sm ${file.name === "main.tex" ? 'text-[#E6ECF6]' : 'text-[#A4B4C8]'}`}>
                              {file.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Editor Preview */}
                      <div className="border-t border-[#1A222C] p-3" style={{ backgroundColor: "#080A10" }}>
                        <div className="font-mono text-xs text-[#8694A6] space-y-1">
                          <div><span className="text-[#0EA5E9]">\documentclass</span><span className="text-[#FBBF24]">{"{article}"}</span></div>
                          <div><span className="text-[#0EA5E9]">\begin</span><span className="text-[#FBBF24]">{"{document}"}</span></div>
                          <div className="flex items-center">
                            <span className="text-[#A4B4C8]">Your thesis content...</span>
                            <span className="inline-block w-[2px] h-3 bg-[#0EA5E9] ml-0.5 animate-blink-cursor" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-text-secondary mt-4 text-center">
                Continue working on your Overleaf projects
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes drop-file {
          0% {
            opacity: 0;
            transform: translateY(-40px) scale(0.9);
          }
          60% {
            opacity: 1;
            transform: translateY(10px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes blink-cursor {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        .animate-drop-file {
          animation: drop-file 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out forwards;
        }

        .animate-blink-cursor {
          animation: blink-cursor 1s infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default GettingStartedSection;
