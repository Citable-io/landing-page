/**
 * HighlightTooltip - Color picker for highlighting text
 * Shows 8 color options matching the real app
 */

interface HighlightTooltipProps {
  selectedColor?: string;
  className?: string;
}

const highlightColors = [
  { id: "yellow", hex: "#FFD400", name: "Yellow" },
  { id: "blue", hex: "#3B82F6", name: "Blue" },
  { id: "green", hex: "#10B981", name: "Green" },
];

export function HighlightTooltip({
  selectedColor = "yellow",
  className = "",
}: HighlightTooltipProps) {
  return (
    <div
      className={`absolute -top-10 left-1/2 -translate-x-1/2 animate-fade-in z-50 ${className}`}
    >
      <div className="rounded-lg px-2 py-1.5 shadow-xl flex items-center gap-1.5 bg-card border border-border">
        {highlightColors.map((color) => (
          <button
            key={color.id}
            className={`w-5 h-5 rounded-full transition-transform ${
              color.id === selectedColor
                ? "ring-2 ring-white ring-offset-1 ring-offset-card scale-110"
                : "hover:scale-110"
            }`}
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
      </div>
      {/* Arrow */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-card border-r border-b border-border" />
    </div>
  );
}
