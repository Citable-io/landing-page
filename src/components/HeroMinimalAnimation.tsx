/**
 * HeroMinimalAnimation - Subtle CSS-based background animation
 * Simple floating orbs with minimal complexity
 */

export function HeroMinimalAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating orb 1 */}
      <div
        className="absolute rounded-full blur-3xl opacity-30"
        style={{
          width: "400px",
          height: "400px",
          background: "var(--green-9)",
          top: "-10%",
          left: "5%",
          animation: "float 20s ease-in-out infinite",
        }}
      />

      {/* Floating orb 2 */}
      <div
        className="absolute rounded-full blur-3xl opacity-20"
        style={{
          width: "300px",
          height: "300px",
          background: "var(--green-8)",
          bottom: "-5%",
          right: "10%",
          animation: "float 25s ease-in-out infinite",
          animationDelay: "-5s",
        }}
      />

      {/* Subtle gradient mesh */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 30% 50%, var(--green-3) 0%, transparent 50%),
            radial-gradient(circle at 70% 80%, var(--green-2) 0%, transparent 50%)
          `,
          opacity: 0.4,
          animation: "gradientShift 8s ease-in-out infinite",
        }}
      />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(10px); }
        }

        @keyframes gradientShift {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

export default HeroMinimalAnimation;
