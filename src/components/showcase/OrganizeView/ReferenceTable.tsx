/**
 * ReferenceTable - Interactive demo showing the organize workflow
 * Animates through: empty → import → extract → organize → filter → complete
 */

import { PlusIcon, SearchIcon, DocumentIcon } from "../shared/Icons";
import type { OrganizeStep } from "../types";

interface ReferenceTableProps {
  step: OrganizeStep;
  className?: string;
  accentColor?: string;
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

// Helper to convert hex to rgba
function hexToRgba(hex: string, opacity: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export function ReferenceTable({ step, className = "", accentColor = "#C3E9D7" }: ReferenceTableProps) {
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
        <div
          className="flex items-center gap-2 px-3 py-1.5 transition-colors border-b-2"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <DocumentIcon />
          <span className="text-xs font-medium">All Papers</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="h-11 flex items-center justify-between px-4 border-b border-border/20">
        <div className="flex items-center gap-2">
          <button
            className={`h-8 px-3 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 text-white shadow-lg ${
              step === "import-action" ? "scale-105" : ""
            }`}
            style={{
              backgroundColor: step === "import-action" ? accentColor : hexToRgba(accentColor, 0.8),
            }}
          >
            <PlusIcon />
            Import Papers
          </button>
        </div>
        <div
          className="relative transition-all"
          style={showFilterActive ? { boxShadow: `0 0 0 2px ${hexToRgba(accentColor, 0.5)}` } : undefined}
        >
          <SearchIcon className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder={showFilterActive ? "Searching..." : "Search papers..."}
            className="h-8 w-32 sm:w-40 pl-8 pr-3 text-xs bg-secondary/50 border-0 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1"
            style={{ focusRing: hexToRgba(accentColor, 0.5) }}
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
              {[0, 1, 2].map((i) => {
                const lighterColor = hexToRgba(accentColor, 0.7);
                const darkerColor = accentColor;
                return (
                  <div
                    key={i}
                    className="animate-pdf-drop opacity-0"
                    style={{ animationDelay: `${i * 0.3}s` }}
                  >
                    <div
                      className="w-16 h-20 rounded-lg shadow-lg flex items-center justify-center"
                      style={{
                        background: `linear-gradient(to bottom, ${lighterColor}, ${darkerColor})`,
                      }}
                    >
                      <span className="text-white text-2xl">📄</span>
                    </div>
                  </div>
                );
              })}
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
                  accentColor={accentColor}
                />
              ))}
            </tbody>
          </table>
        )}

        {/* Organizing Animation */}
        {step === "organizing" && (
          <div
            className="absolute inset-0 pointer-events-none animate-pulse"
            style={{
              background: `linear-gradient(to bottom, ${hexToRgba(accentColor, 0.1)}, transparent)`,
            }}
          />
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
  accentColor?: string;
}

function ReferenceRow({
  reference,
  selected = false,
  animateIn = false,
  animationDelay = 0,
  step,
  accentColor = "#C3E9D7",
}: ReferenceRowProps) {
  const tagBgColor = hexToRgba(accentColor, 0.2);
  const tagTextColor = accentColor;

  return (
    <tr
      className={`h-11 transition-all cursor-pointer ${
        animateIn ? "animate-fade-in-row" : ""
      }`}
      style={{
        backgroundColor: selected ? hexToRgba(accentColor, 0.25) : undefined,
        animationDelay: animateIn ? `${animationDelay}s` : undefined,
      }}
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
        <span
          className="px-2 py-0.5 text-xs rounded"
          style={{
            backgroundColor: tagBgColor,
            color: tagTextColor,
          }}
        >
          {reference.tag.name}
        </span>
      </td>
    </tr>
  );
}
