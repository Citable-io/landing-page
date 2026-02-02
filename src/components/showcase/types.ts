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
  | "empty-state"
  | "import-action"
  | "pdf-drop"
  | "metadata-extraction"
  | "organizing"
  | "paper-select"
  | "detail-view"
  | "filtering"
  | "organized";

export type WriteStep =
  | "idle"
  | "typing"
  | "compile"
  | "preview";

export type CiteStep =
  | "idle"
  | "linked-bib"
  | "cite-trigger"
  | "cite-select"
  | "cite-insert";

// Activity bar variants
export type ActivityBarVariant = "library" | "pdf-reader" | "editor";
