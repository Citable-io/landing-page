import { Button } from "@/components/ui/button";
import WaitingListForm from "@/components/WaitingListForm";
import { ArrowDown, Sparkles } from "lucide-react";

const HeroSection = () => {
  const scrollToFeatures = () => {
    document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Hero Background */}
        <div className="absolute inset-0 bg-gradient-hero" />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-primary/8 via-transparent to-transparent rounded-full blur-3xl animate-float-medium" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial opacity-50" />

        {/* Floating Research Elements */}
        <div className="absolute top-32 left-8 opacity-[0.06] font-mono text-xs text-primary animate-float-slow hidden lg:block">
          <div className="transform rotate-12 space-y-1">
            <div>\documentclass[12pt]{'{'} article{'}'}</div>
            <div>\usepackage{'{'} amsmath{'}'}</div>
            <div>\begin{'{'} document{'}'}</div>
          </div>
        </div>

        <div className="absolute top-1/4 right-16 opacity-[0.08] font-mono text-sm text-primary animate-float-medium hidden lg:block">
          <div className="transform -rotate-6">\cite{'{'} einstein1905{'}'}</div>
        </div>

        <div className="absolute bottom-40 left-16 opacity-[0.06] font-serif text-lg text-primary animate-float-slow hidden lg:block">
          <div className="transform rotate-3">E = mc<sup>2</sup></div>
        </div>

        <div className="absolute bottom-32 right-20 opacity-[0.05] font-mono text-xs text-primary animate-float-medium hidden lg:block">
          <div className="transform rotate-6 space-y-1">
            <div>@article{'{'} author2024,</div>
            <div className="pl-4">title = {'{'}"Research Paper"{'}'}</div>
            <div>{'}'}</div>
          </div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-secondary border border-border mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-text-secondary">Now in Private Beta</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="text-primary animate-fade-in-up block" style={{ animationDelay: '0.1s' }}>
              Craft it.
            </span>
            <span className="text-foreground animate-fade-in-up block" style={{ animationDelay: '0.2s' }}>
              Polish it.
            </span>
            <span className="text-primary animate-fade-in-up block" style={{ animationDelay: '0.3s' }}>
              Cite it.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-fade-in-up font-body" style={{ animationDelay: '0.4s' }}>
            The AI-powered research environment that empowers your every word. Write LaTeX papers with intelligent citations, real-time collaboration, and an AI assistant that understands academic writing.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <WaitingListForm
              trigger={
                <Button
                  size="lg"
                  className="rounded-full px-8 py-6 text-base font-medium animate-glow-pulse hover:scale-105 transition-transform duration-300"
                >
                  Join the Beta Waitlist
                </Button>
              }
            />
            <button
              onClick={scrollToFeatures}
              className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors duration-300 group"
            >
              <span className="text-sm">See Citable in action</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Product Visual Placeholder - Live Embed Area */}
        <div className="mt-16 lg:mt-20 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <div className="relative rounded-xl overflow-hidden border border-border bg-bg-secondary/50 backdrop-blur-sm">
            {/* Window Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-tertiary/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error/50" />
                <div className="w-3 h-3 rounded-full bg-warning/50" />
                <div className="w-3 h-3 rounded-full bg-success/50" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-text-muted font-mono">research-paper.tex — Citable</span>
              </div>
            </div>

            {/* Editor Preview */}
            <div className="grid md:grid-cols-2 divide-x divide-border">
              {/* Left: Editor */}
              <div className="p-6 min-h-[300px] font-mono text-sm">
                <div className="space-y-2 text-text-secondary">
                  <div><span className="text-primary">\section</span>{'{'}<span className="text-foreground">Introduction</span>{'}'}</div>
                  <div className="text-text-muted pl-4">
                    The study of quantum computing has seen remarkable
                  </div>
                  <div className="text-text-muted pl-4">
                    progress in recent years <span className="text-primary">\cite</span>{'{'}<span className="text-foreground">nielsen2010</span>{'}'}<span className="animate-blink-cursor inline-block w-0.5 h-4 bg-primary ml-0.5" />.
                  </div>
                  <div className="mt-4">
                    <span className="text-primary">\begin</span>{'{'}<span className="text-foreground">equation</span>{'}'}
                  </div>
                  <div className="pl-4 text-manuscripts-green">
                    H|\psi\rangle = E|\psi\rangle
                  </div>
                  <div>
                    <span className="text-primary">\end</span>{'{'}<span className="text-foreground">equation</span>{'}'}
                  </div>
                </div>

                {/* Citation Autocomplete Popup */}
                <div className="mt-4 w-64 rounded-lg border border-border bg-bg-elevated shadow-lg overflow-hidden">
                  <div className="px-3 py-2 border-b border-border bg-bg-tertiary">
                    <span className="text-xs text-text-muted">Suggested Citations</span>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="px-3 py-2 bg-primary/10 hover:bg-primary/20 cursor-pointer transition-colors">
                      <div className="text-sm font-medium text-foreground">nielsen2010</div>
                      <div className="text-xs text-text-muted truncate">Quantum Computation and Quantum Information</div>
                    </div>
                    <div className="px-3 py-2 hover:bg-bg-hover cursor-pointer transition-colors">
                      <div className="text-sm font-medium text-foreground">preskill2018</div>
                      <div className="text-xs text-text-muted truncate">Quantum Computing in the NISQ Era</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: PDF Preview */}
              <div className="p-6 min-h-[300px] bg-bg-tertiary/30 hidden md:block">
                <div className="space-y-4">
                  <div className="text-lg font-display font-bold text-foreground">1 Introduction</div>
                  <div className="text-sm text-text-secondary leading-relaxed">
                    The study of quantum computing has seen remarkable progress in recent years [1]. The fundamental equation governing quantum systems is the Schrodinger equation:
                  </div>
                  <div className="flex justify-center py-4">
                    <div className="font-serif text-lg italic text-foreground">
                      H|&psi;&#10217; = E|&psi;&#10217;
                    </div>
                  </div>
                  <div className="text-sm text-text-secondary">
                    This equation forms the basis of quantum mechanical calculations...
                  </div>
                </div>

                {/* Collaborator Cursors */}
                <div className="absolute top-24 right-16">
                  <div className="flex items-center gap-1">
                    <div className="w-0.5 h-5 bg-bibliography-blue animate-pulse" />
                    <div className="px-2 py-0.5 rounded text-xs bg-bibliography-blue text-white font-medium">
                      Dr. Smith
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-bg-tertiary/50 text-xs text-text-muted">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  Compiled successfully
                </span>
                <span>Line 42, Col 15</span>
              </div>
              <div className="flex items-center gap-3">
                <span>23 citations</span>
                <span>pdfLaTeX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
