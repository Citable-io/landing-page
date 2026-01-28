/**
 * ProductPreview Component
 *
 * Container section for:
 * 1. Tabbed product showcase (Organize, Write, Cite)
 * 2. CTA section with waitlist form (after demo)
 */

import { TabbedProductShowcase } from "./showcase";
import { WaitlistForm } from "./WaitlistForm";

export function ProductPreview() {
  return (
    <section className="relative px-4">
      {/* Product Demo */}
      <div className="container max-w-6xl mx-auto py-8 md:py-12">
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <TabbedProductShowcase />
        </div>
      </div>

      {/* CTA Section - After Demo */}
      <div className="container max-w-2xl mx-auto py-16 md:py-24 text-center">
        {/* Section heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-foreground mb-4">
          Ready to simplify your research?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Be among the first to experience a better way to do research.
        </p>

        {/* Waitlist form */}
        <div className="flex justify-center mb-8">
          <WaitlistForm />
        </div>

        {/* Benefit badges */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Free during beta</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Early access perks</span>
          </div>
        </div>
      </div>
    </section>
  );
}
