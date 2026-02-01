/**
 * ReferenceTable - Interactive demo showing the organize workflow
 * Animates through: empty → import → extract → organize → filter → complete
 */

import { PlusIcon, SearchIcon, DocumentIcon } from "../shared/Icons";
import type { OrganizeStep } from "../types";

interface ReferenceTableProps {
  step: OrganizeStep;
  className?: string;
}

// References that appear during the workflow
const workflowReferences = [
  {
    id: "ref-1",
    title: "Attention Is All You Need",
    authors: "Vaswani, A., et al.",
    year: "2017",
    venue: "NeurIPS",
    tag: { name: "transformers", color: "green" },
  },
  {
    id: "ref-2",
    title: "BERT: Pre-training of Deep Bidirectional Transformers",
    authors: "Devlin, J., et al.",
    year: "2019",
    venue: "NAACL",
    tag: { name: "language-models", color: "green" },
  },
  {
    id: "ref-3",
    title: "Language Models are Unsupervised Multitask Learners",
    authors: "Radford, A., et al.",
    year: "2019",
    venue: "OpenAI Blog",
    tag: { name: "nlp", color: "green" },
  },
];

export function ReferenceTable({ step, className = "" }: ReferenceTableProps) {
  // Show references based on workflow step
  const showEmptyState = step === "empty-state" || step === "import-action";
  const showImportAnimation = step === "pdf-drop";
  const showExtractingMetadata = step === "metadata-extraction" || step === "organizing";
  const showPaperSelected = ["paper-select", "detail-view", "filtering", "organized"].includes(step);
  const showFilterActive = step === "filtering";
  const selectedRowId = (step === "paper-select" || step === "detail-view" || step === "filtering" || step === "organized") ? "ref-1" : null;

  return (
    <div className={`flex-1 flex flex-col min-w-0 bg-background ${className}`}>
      {/* Tab Bar - Shows active collection */}
      <div className="h-11 flex items-center gap-1 px-2 bg-card border-b border-border/20">
        <div className="flex items-center gap-2 px-3 py-1.5 transition-colors text-primary border-b-2 border-primary">
          <DocumentIcon />
          <span className="text-xs font-medium">All Papers</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-11 flex items-center justify-between px-4 border-b border-border/20">
        <div className="flex items-center gap-2">
          <button
            className={`h-8 px-3 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
              step === "import-action"
                ? "bg-green-600 text-white shadow-lg scale-105"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            <PlusIcon />
            Import Papers
          </button>
        </div>
        <div className={`relative transition-all ${showFilterActive ? "ring-2 ring-green-500/50" : ""}`}>
          <SearchIcon className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={showFilterActive ? "Searching..." : "Search papers..."}
            className="h-8 w-32 sm:w-40 pl-8 pr-3 text-xs bg-secondary/50 border-0 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            readOnly
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto relative">
        {/* Empty State */}
        {showEmptyState && (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <DocumentIcon className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No papers yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Click "Import Papers" to get started
            </p>
            <div className="text-xs text-muted-foreground/50">
              Drag & drop PDFs or click to browse
            </div>
          </div>
        )}

        {/* PDF Import Animation */}
        {showImportAnimation && (
          <div className="h-full flex items-center justify-center">
            <div className="flex gap-6">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="animate-pdf-drop opacity-0"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  <div className="w-16 h-20 bg-gradient-to-b from-green-400 to-green-600 rounded-lg shadow-lg flex items-center justify-center">
                    <span className="text-white text-2xl">📄</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Data Table - showing extracted papers */}
        {(showExtractingMetadata || showPaperSelected) && (
          <table className="w-full text-sm">
            <thead className="bg-secondary/30 sticky top-0">
              <tr className="h-11 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 font-medium">Title</th>
                <th className="px-4 font-medium hidden sm:table-cell">Authors</th>
                <th className="px-4 font-medium">Year</th>
                <th className="px-4 font-medium hidden md:table-cell">Venue</th>
                <th className="px-4 font-medium hidden lg:table-cell">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {workflowReferences.map((ref, index) => (
                <ReferenceRow
                  key={ref.id}
                  reference={ref}
                  selected={ref.id === selectedRowId}
                  animateIn={showExtractingMetadata}
                  animationDelay={index * 0.4}
                  step={step}
                />
              ))}
            </tbody>
          </table>
        )}

        {/* Organizing Animation */}
        {step === "organizing" && (
          <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-transparent pointer-events-none animate-pulse" />
        )}
      </div>
    </div>
  );
}

interface Reference {
  id: string;
  title: string;
  authors: string;
  year: string;
  venue: string;
  tag: { name: string; color: string };
}

interface ReferenceRowProps {
  reference: Reference;
  selected?: boolean;
  animateIn?: boolean;
  animationDelay?: number;
  step?: OrganizeStep;
}

function ReferenceRow({
  reference,
  selected = false,
  animateIn = false,
  animationDelay = 0,
  step,
}: ReferenceRowProps) {
  const tagColors: Record<string, string> = {
    green: "bg-green-500/20 text-green-300",
    blue: "bg-blue-500/20 text-blue-300",
    purple: "bg-purple-500/20 text-purple-300",
  };

  return (
    <tr
      className={`h-11 transition-all cursor-pointer ${
        selected ? "bg-primary/25 hover:bg-primary/30" : "hover:bg-secondary/40"
      } ${animateIn ? "animate-fade-in-row" : ""}`}
      style={animateIn ? { animationDelay: `${animationDelay}s` } : undefined}
    >
      <td className="px-4 text-foreground font-medium">{reference.title}</td>
      <td className="px-4 text-muted-foreground hidden sm:table-cell text-xs">
        {reference.authors}
      </td>
      <td className="px-4 text-muted-foreground">{reference.year}</td>
      <td className="px-4 text-muted-foreground hidden md:table-cell text-xs">
        {reference.venue}
      </td>
      <td className="px-4 hidden lg:table-cell">
        <span className={`px-2 py-0.5 text-xs rounded ${tagColors[reference.tag.color] || tagColors.green}`}>
          {reference.tag.name}
        </span>
      </td>
    </tr>
  );
}
