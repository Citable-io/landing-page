/**
 * CollectionsSidebar - Library folder tree sidebar
 * Shows collections hierarchy with folder icons
 */

import { FolderIcon, PlusIcon, ChevronRightIcon } from "../shared/Icons";

interface CollectionsSidebarProps {
  className?: string;
}

const collections = [
  { id: "ml", name: "Machine Learning", selected: true, indent: 1 },
  { id: "methods", name: "Methods", selected: false, indent: 2 },
  { id: "acl", name: "ACL 2024", selected: false, indent: 1 },
  { id: "toread", name: "To Read", selected: false, indent: 1 },
];

export function CollectionsSidebar({ className = "" }: CollectionsSidebarProps) {
  return (
    <div className={`w-64 bg-card flex flex-col ${className}`}>
      {/* Header */}
      <div className="h-11 flex items-center justify-between px-4 border-b border-border/20">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Library
        </span>
        <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded">
          <PlusIcon />
        </button>
      </div>

      {/* Tree content */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {/* My Library root */}
        <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-muted-foreground">
          <ChevronRightIcon />
          <span>My Library</span>
        </div>

        {/* Collection items */}
        {collections.map((collection) => (
          <CollectionItem
            key={collection.id}
            name={collection.name}
            selected={collection.selected}
            indent={collection.indent}
          />
        ))}

        {/* Add Collection */}
        <div className="flex items-center gap-2 px-4 py-1.5 text-primary text-sm cursor-pointer hover:underline">
          <PlusIcon className="w-4 h-4 flex-shrink-0" />
          <span>Add Collection</span>
        </div>
      </div>
    </div>
  );
}

interface CollectionItemProps {
  name: string;
  selected?: boolean;
  indent?: number;
}

function CollectionItem({ name, selected = false, indent = 1 }: CollectionItemProps) {
  const paddingLeft = indent === 1 ? "px-4" : "px-6";

  return (
    <div
      className={`flex items-center gap-2 py-1.5 rounded text-sm transition-colors ${paddingLeft} ${
        selected
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-secondary/50"
      }`}
    >
      <FolderIcon className="w-4 h-4 flex-shrink-0" />
      <span className="truncate">{name}</span>
    </div>
  );
}
