/**
 * HeroSection Component
 *
 * Compact hero section with:
 * - Aurora background
 * - Headline and subheadline
 * - No scroll indicator (content below naturally indicates more)
 */

import { Aurora } from "./Aurora";

export function HeroSection() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden pt-20 pb-8">
      {/* Aurora background */}
      <Aurora />

      {/* Content */}
      <div className="relative z-10 container max-w-4xl mx-auto px-4 text-center">
        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-foreground mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Research, untangled.
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Your bibliography and writing, finally together.
        </p>
      </div>
    </section>
  );
}

export default HeroSection;
