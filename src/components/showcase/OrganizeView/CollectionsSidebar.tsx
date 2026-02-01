/**
 * CollectionsSidebar - Shows library organization during workflow
 * Animates through: empty → adding collections → papers organized
 */

import { FolderIcon, PlusIcon, ChevronRightIcon } from "../shared/Icons";
import type { OrganizeStep } from "../types";

interface CollectionsSidebarProps {
  step: OrganizeStep;
  className?: string;
}

const collections = [
  { id: "transformers", name: "Transformers", count: 0, indent: 1 },
  { id: "nlp", name: "Natural Language", count: 0, indent: 1 },
  { id: "toread", name: "To Read", count: 0, indent: 1 },
];

export function CollectionsSidebar({ step, className = "" }: CollectionsSidebarProps) {
  // Update counts based on workflow step
  const getCounts = () => {
    if (["organizing", "paper-select", "detail-view", "filtering", "organized"].includes(step)) {
      return { transformers: 1, nlp: 2, toread: 0 };
    }
    return { transformers: 0, nlp: 0, toread: 0 };
  };

  const counts = getCounts();
  const isOrganizing = step === "organizing";
  return (
    <div className={`w-64 bg-card flex flex-col border-r border-border/20 ${className}`}>
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-4 border-b border-border/20">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Collections
        </span>
        <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded">
          <PlusIcon />
        </button>
      </div>

      {/* Tree content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {/* Show empty state or populated collections based on step */}
        {["empty-state", "import-action", "pdf-drop", "metadata-extraction"].includes(step) ? (
          <div className="flex items-center justify-center h-20 text-muted-foreground text-xs">
            <div className="text-center">
              <FolderIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>No collections yet</p>
            </div>
          </div>
        ) : (
          <>
            {/* My Library root */}
            <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-muted-foreground">
              <ChevronRightIcon />
              <span>My Library</span>
            </div>

            {/* Collection items with paper counts */}
            <CollectionItem
              name="Transformers"
              count={counts.transformers}
              selected={step === "paper-select"}
              isAnimating={isOrganizing}
            />
            <CollectionItem
              name="Natural Language"
              count={counts.nlp}
              selected={false}
              isAnimating={isOrganizing}
            />
            <CollectionItem
              name="To Read"
              count={counts.toread}
              selected={false}
              isAnimating={isOrganizing}
            />
          </>
        )}
      </div>
    </div>
  );
}

interface CollectionItemProps {
  name: string;
  count?: number;
  selected?: boolean;
  isAnimating?: boolean;
}

function CollectionItem({ name, count = 0, selected = false, isAnimating = false }: CollectionItemProps) {
  return (
    <div
      className={`flex items-center gap-2 py-1.5 px-4 rounded text-sm transition-all cursor-pointer ${
        selected ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-secondary/50"
      } ${isAnimating ? "animate-pulse" : ""}`}
    >
      <FolderIcon className="w-4 h-4 flex-shrink-0" />
      <span className="truncate flex-1">{name}</span>
      {count > 0 && (
        <span className="text-xs bg-green-500/20 text-green-300 px-2 py-0.5 rounded">
          {count}
        </span>
      )}
    </div>
  );
}
