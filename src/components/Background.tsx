/**
 * Background Component
 *
 * Warm gradient background with optional grain texture.
 * Replaces Aurora with a calmer, academic feel.
 */

interface BackgroundProps {
  variant?: "default" | "warm" | "subtle";
  className?: string;
}

export function Background({ variant = "default", className = "" }: BackgroundProps) {
  const gradients = {
    default: `
      radial-gradient(ellipse 80% 50% at 50% -20%, var(--green-a3) 0%, transparent 50%),
      radial-gradient(ellipse 60% 40% at 100% 50%, var(--green-a2) 0%, transparent 40%),
      radial-gradient(ellipse 60% 40% at 0% 50%, var(--green-a2) 0%, transparent 40%),
      linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)
    `,
    warm: `
      radial-gradient(ellipse 100% 60% at 50% 0%, var(--green-a2) 0%, transparent 60%),
      linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 50%, var(--bg-secondary) 100%)
    `,
    subtle: `
      linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)
    `,
  };

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Gradient layer */}
      <div
        className="absolute inset-0"
        style={{
          background: gradients[variant],
        }}
      />

      {/* Optional grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}

export default Background;
