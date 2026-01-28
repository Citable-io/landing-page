/**
 * OutlineSidebar - PDF document outline/table of contents
 * Shown when PDF reader is open (replaces CollectionsSidebar)
 */

import { ChevronRightIcon } from "../shared/Icons";

interface OutlineSidebarProps {
  className?: string;
}

const outlineSections = [
  { id: "abstract", label: "Abstract", level: 0 },
  { id: "intro", label: "1. Introduction", level: 0 },
  { id: "methods", label: "2. Methods", level: 0 },
  { id: "results", label: "3. Results", level: 0 },
  { id: "discussion", label: "4. Discussion", level: 0 },
  { id: "conclusion", label: "5. Conclusion", level: 0 },
];

export function OutlineSidebar({ className = "" }: OutlineSidebarProps) {
  return (
    <div className={`w-64 bg-card flex flex-col ${className}`}>
      {/* Header */}
      <div className="h-11 flex items-center px-4 border-b border-border/20">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Outline
        </span>
      </div>

      {/* Outline content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {/* Document title */}
        <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-muted-foreground">
          <ChevronRightIcon />
          <span className="truncate">Attention Is All You Need</span>
        </div>

        {/* Sections */}
        {outlineSections.map((section) => (
          <OutlineItem key={section.id} label={section.label} />
        ))}
      </div>
    </div>
  );
}

interface OutlineItemProps {
  label: string;
}

function OutlineItem({ label }: OutlineItemProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
      <span className="text-muted-foreground/50">§</span>
      <span>{label}</span>
    </div>
  );
}
