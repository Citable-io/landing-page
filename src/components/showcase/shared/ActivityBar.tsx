/**
 * ActivityBar - Vertical icon bar on the left side
 * Adapts based on the current view (library, pdf-reader, editor)
 */

import { LogoIcon, LibraryIcon, SearchIcon, TagIcon, SettingsIcon, FolderIcon, OutlineIcon } from "./Icons";
import type { ActivityBarVariant } from "../types";

interface ActivityBarProps {
  variant: ActivityBarVariant;
  className?: string;
}

export function ActivityBar({ variant, className = "" }: ActivityBarProps) {
  return (
    <div className={`w-14 bg-secondary/80 flex flex-col items-center py-3 ${className}`}>
      {/* Logo */}
      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary cursor-pointer hover:bg-primary/10 transition-colors">
        <LogoIcon />
      </div>

      {/* Main icons - vary by variant */}
      <div className="flex flex-col items-center gap-2 mt-4">
        {variant === "library" && (
          <>
            <ActivityBarButton icon={<LibraryIcon />} active />
            <ActivityBarButton icon={<SearchIcon />} />
            <ActivityBarButton icon={<TagIcon />} />
          </>
        )}

        {variant === "pdf-reader" && (
          <>
            <ActivityBarButton icon={<OutlineIcon />} active />
          </>
        )}

        {variant === "editor" && (
          <>
            <ActivityBarButton icon={<FolderIcon className="w-5 h-5" />} active />
            <ActivityBarButton icon={<SearchIcon />} />
            <ActivityBarButton icon={<LibraryIcon />} />
          </>
        )}
      </div>

      {/* Settings at bottom */}
      <div className="mt-auto">
        <ActivityBarButton icon={<SettingsIcon />} />
      </div>
    </div>
  );
}

interface ActivityBarButtonProps {
  icon: React.ReactNode;
  active?: boolean;
}

function ActivityBarButton({ icon, active = false }: ActivityBarButtonProps) {
  return (
    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
        active
          ? "text-primary bg-primary/10"
          : "text-muted-foreground hover:bg-secondary/80"
      }`}
    >
      {icon}
    </div>
  );
}
