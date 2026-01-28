/**
 * Shared types for the product showcase components
 */

export type TabId = "organize" | "write" | "cite";

export interface Tab {
  id: TabId;
  label: string;
  description: string;
  icon: React.ReactNode;
  duration: number; // Duration in ms for this tab's animation
}

// Animation step types for each view
export type OrganizeStep =
  | "idle"
  | "pdf-drop"
  | "metadata-fill"
  | "row-click"
  | "layout-shift"
  | "text-select"
  | "color-pick"
  | "note-popup";

export type WriteStep =
  | "idle"
  | "typing"
  | "compile"
  | "preview";

export type CiteStep =
  | "idle"
  | "cite-trigger"
  | "cite-select"
  | "cite-insert";

// Activity bar variants
export type ActivityBarVariant = "library" | "pdf-reader" | "editor";
