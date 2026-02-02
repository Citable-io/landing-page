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

export function ReferenceTable({ step, className = "", accentColor = "#3B82F6" }: ReferenceTableProps) {
  // Show references based on workflow step
  const showImportAnimation = step === "upload";
  const showExtractingMetadata = step === "tagging";
  const selectedRowId = step === "tagging" ? "ref-1" : null;

  return (
    <div
      className={`flex-1 flex flex-col min-w-0 ${className}`}
      style={{ background: "#FFFFFF" }}
    >
      {/* Tab Bar - Shows active collection */}
      <div
        className="h-11 flex items-center gap-1 px-2 border-b"
        style={{ borderColor: "#E5E7EB" }}
      >
        <div
          className="flex items-center gap-2 px-3 py-1.5 transition-colors border-b-2"
          style={{ color: accentColor, borderColor: accentColor }}
        >
          <DocumentIcon />
          <span className="text-xs font-medium">All Papers</span>
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="h-11 flex items-center justify-between px-4 border-b"
        style={{ borderColor: "#E5E7EB" }}
      >
        <div className="flex items-center gap-2">
          <button
            className="h-8 px-3 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 text-white shadow-lg"
            style={{
              backgroundColor: accentColor,
            }}
          >
            <PlusIcon />
            Import Papers
          </button>
        </div>
        <div className="relative transition-all">
          <SearchIcon className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search papers..."
            className="h-8 w-32 sm:w-40 pl-8 pr-3 text-xs bg-secondary/50 border-0 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1"
            readOnly
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto relative">
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

        {/* Data Table - showing papers with tags */}
        {showExtractingMetadata && (
          <table className="w-full text-sm">
            <thead className="sticky top-0" style={{ background: "#F5F6FA", borderBottom: "1px solid #E5E7EB" }}>
              <tr className="h-11 text-left text-xs uppercase tracking-wider" style={{ color: "#6B7280" }}>
                <th className="px-4 font-medium">Title</th>
                <th className="px-4 font-medium hidden sm:table-cell">Authors</th>
                <th className="px-4 font-medium">Year</th>
                <th className="px-4 font-medium hidden md:table-cell">Venue</th>
                <th className="px-4 font-medium hidden lg:table-cell">Tags</th>
              </tr>
            </thead>
            <tbody style={{ borderColor: "#E5E7EB" }}>
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
  accentColor = "#3B82F6",
}: ReferenceRowProps) {
  const tagBgColor = hexToRgba(accentColor, 0.15);
  const tagTextColor = accentColor;

  return (
    <tr
      className={`h-11 transition-all cursor-pointer border-b ${
        animateIn ? "animate-fade-in-row" : ""
      }`}
      style={{
        backgroundColor: selected ? hexToRgba(accentColor, 0.08) : undefined,
        animationDelay: animateIn ? `${animationDelay}s` : undefined,
        borderColor: "#E5E7EB",
      }}
    >
      <td className="px-4 font-medium" style={{ color: "#111827" }}>{reference.title}</td>
      <td className="px-4 hidden sm:table-cell text-xs" style={{ color: "#6B7280" }}>
        {reference.authors}
      </td>
      <td className="px-4" style={{ color: "#6B7280" }}>{reference.year}</td>
      <td className="px-4 hidden md:table-cell text-xs" style={{ color: "#6B7280" }}>
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
