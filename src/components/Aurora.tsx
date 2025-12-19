/**
 * Aurora Background Component
 *
 * Animated gradient orbs that create a subtle northern lights effect.
 * Uses CSS-only animations for performance.
 */

export function Aurora() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Cyan orb - top left */}
      <div className="aurora-orb aurora-orb-1" />

      {/* Violet orb - right side */}
      <div className="aurora-orb aurora-orb-2" />

      {/* Emerald orb - bottom left (hidden on mobile) */}
      <div className="aurora-orb aurora-orb-3" />
    </div>
  );
}
