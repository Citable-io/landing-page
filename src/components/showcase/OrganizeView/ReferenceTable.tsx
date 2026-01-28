/**
 * ReferenceTable - Bibliography reference table with toolbar
 * Shows papers with title, authors, year, and tags
 */

import { PlusIcon, SearchIcon, DocumentIcon, PdfIcon, PdfDocIcon } from "../shared/Icons";
import type { OrganizeStep } from "../types";

interface ReferenceTableProps {
  step: OrganizeStep;
  className?: string;
}

// Initial references (before PDF drop)
const initialReferences = [
  {
    id: "1",
    title: "A Study of Plasticity Loss in Deep RL",
    authors: "Julian, A., Ash, J.",
    year: "2024",
    tag: { name: "plasticity", color: "primary" },
  },
];

// New references that will be added during animation
const newReferences = [
  {
    id: "new-1",
    title: "Attention Is All You Need",
    authors: "Vaswani, A., et al.",
    year: "2017",
    tag: { name: "transformers", color: "violet" },
  },
  {
    id: "new-2",
    title: "BERT: Pre-training of Deep Bidirectional",
    authors: "Devlin, J., et al.",
    year: "2019",
    tag: { name: "nlp", color: "emerald" },
  },
  {
    id: "new-3",
    title: "GPT-4 Technical Report",
    authors: "OpenAI",
    year: "2023",
    tag: { name: "llm", color: "pink" },
  },
];

export function ReferenceTable({ step, className = "" }: ReferenceTableProps) {
  // Determine which references to show based on step
  const showNewRefs = step !== "idle" && step !== "pdf-drop";
  const selectedRowId = step === "row-click" ? "new-1" : null;
  // Paper tab becomes active when row is clicked
  const paperTabActive = step === "row-click";

  return (
    <div className={`flex-1 flex flex-col min-w-0 bg-background ${className}`}>
      {/* Tab Bar */}
      <div className="h-11 flex items-center gap-1 px-2 bg-card border-b border-border/20">
        {/* Collection tab - active initially, becomes inactive when paper opens */}
        <div className={`flex items-center gap-2 px-3 py-1.5 transition-colors ${
          !paperTabActive
            ? "text-primary border-b-2 border-primary"
            : "text-muted-foreground"
        }`}>
          <DocumentIcon />
          <span className="text-xs font-medium">Machine Learning</span>
        </div>
        {/* Paper tab - appears when row clicked, becomes active */}
        {paperTabActive && (
          <div className="flex items-center gap-2 px-3 py-1.5 text-primary border-b-2 border-primary transition-colors animate-fade-in">
            <PdfIcon />
            <span className="text-xs font-medium truncate max-w-[160px]">Attention Is All You Need</span>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="h-11 flex items-center justify-between px-4 border-b border-border/20">
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 text-xs font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1.5">
            <PlusIcon />
            Add
          </button>
        </div>
        <div className="relative">
          <SearchIcon className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="h-8 w-32 sm:w-40 pl-8 pr-3 text-xs bg-secondary/50 border-0 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            readOnly
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto relative">
        {/* PDF Drop animation overlay */}
        {step === "pdf-drop" && <PdfDropAnimation />}

        <table className="w-full text-sm">
          <thead className="bg-secondary/30 sticky top-0">
            <tr className="h-11 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-4 font-medium">Title</th>
              <th className="px-4 font-medium hidden sm:table-cell">Authors</th>
              <th className="px-4 font-medium">Year</th>
              <th className="px-4 font-medium hidden md:table-cell">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {/* New references (animated in) */}
            {showNewRefs &&
              newReferences.map((ref, index) => (
                <ReferenceRow
                  key={ref.id}
                  reference={ref}
                  selected={ref.id === selectedRowId}
                  animationDelay={index * 0.5}
                  animateIn={step === "metadata-fill"}
                />
              ))}

            {/* Initial references */}
            {initialReferences.map((ref) => (
              <ReferenceRow key={ref.id} reference={ref} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface Reference {
  id: string;
  title: string;
  authors: string;
  year: string;
  tag: { name: string; color: string };
}

interface ReferenceRowProps {
  reference: Reference;
  selected?: boolean;
  animationDelay?: number;
  animateIn?: boolean;
}

function ReferenceRow({
  reference,
  selected = false,
  animationDelay = 0,
  animateIn = false,
}: ReferenceRowProps) {
  // Tag colors using design system palette
  const tagColors: Record<string, string> = {
    primary: "bg-primary/15 text-primary",
    violet: "bg-[hsl(var(--violet))]/15 text-[hsl(var(--violet))]",
    emerald: "bg-[hsl(var(--emerald))]/15 text-[hsl(var(--emerald))]",
    pink: "bg-destructive/15 text-destructive",
  };

  return (
    <tr
      className={`h-11 transition-all ${
        selected
          ? "bg-primary/[0.22] hover:bg-primary/[0.28]"
          : "hover:bg-secondary/30"
      } ${animateIn ? "animate-fade-in-row" : ""}`}
      style={animateIn ? { animationDelay: `${animationDelay}s` } : undefined}
    >
      <td className="px-4 text-foreground">{reference.title}</td>
      <td className="px-4 text-muted-foreground hidden sm:table-cell">
        {reference.authors}
      </td>
      <td className="px-4 text-muted-foreground">{reference.year}</td>
      <td className="px-4 hidden md:table-cell">
        <span
          className={`px-2 py-0.5 text-xs rounded ${
            tagColors[reference.tag.color] || tagColors.primary
          }`}
        >
          {reference.tag.name}
        </span>
      </td>
    </tr>
  );
}

function PdfDropAnimation() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
      <div className="flex gap-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="animate-pdf-drop opacity-0"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <PdfDocIcon className="w-12 h-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
