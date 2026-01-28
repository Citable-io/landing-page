/**
 * MarginNote - Small bubble on the right side showing the saved note
 * Matches the real app's MarginNote component style
 * Appears after typing is complete
 */

interface NotePopupProps {
  className?: string;
}

export function NotePopup({ className = "" }: NotePopupProps) {
  return (
    <div
      className={`max-w-[160px] bg-card border-l-[3px] border-l-yellow-400 rounded-md px-2.5 py-2 text-[11px] leading-snug text-foreground shadow-md ${className}`}
    >
      Key finding - supports hypothesis
    </div>
  );
}
