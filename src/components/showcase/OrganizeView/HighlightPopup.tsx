/**
 * HighlightPopup - Popup that appears when clicking an existing highlight
 * Shows below the highlight for editing the note
 * Fades out after typing animation completes
 */

interface HighlightPopupProps {
  className?: string;
}

export function HighlightPopup({ className = "" }: HighlightPopupProps) {
  return (
    <div
      className={`absolute left-0 z-50 ${className}`}
      style={{
        top: "100%",
        marginTop: "4px",
        animation: "fade-in 0.3s ease-out forwards, fade-out 0.3s ease-out 2s forwards",
      }}
    >
      <div className="w-[200px] rounded-lg shadow-xl overflow-hidden bg-card border border-border">
        {/* Color accent bar */}
        <div className="h-[3px] bg-yellow-400" />

        <div className="p-2">
          {/* Highlighted text preview */}
          <p className="text-[9px] text-muted-foreground mb-1.5 italic leading-tight line-clamp-2">
            "We propose a new simple network architecture..."
          </p>

          {/* Note input with typing animation */}
          <div className="w-full p-1.5 text-[10px] rounded bg-secondary border border-border text-foreground min-h-[36px]">
            <span className="animate-typing-note">
              Key finding - supports hypothesis
            </span>
            <span className="animate-blink text-muted-foreground">|</span>
          </div>

          {/* Save button */}
          <div className="flex justify-end mt-1.5">
            <button className="px-2 py-0.5 text-[9px] rounded bg-primary text-primary-foreground">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
