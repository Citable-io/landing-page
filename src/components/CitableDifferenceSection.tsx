import { Check, X, ArrowRight, Sparkles, FileText, BookOpen, Users, Cpu } from "lucide-react";

const CitableDifferenceSection = () => {
  const beforeItems = [
    { text: "Switch to Zotero to find a paper", icon: FileText },
    { text: "Copy citation key manually", icon: BookOpen },
    { text: "Paste into Overleaf editor", icon: FileText },
    { text: "Hope the reference compiles correctly", icon: X },
    { text: "Repeat for every single citation", icon: X },
  ];

  const afterItems = [
    { text: "Type \\cite{} and see smart suggestions", check: true },
    { text: "Click to insert from your bibliography", check: true },
    { text: "Hover to preview abstract and details", check: true },
    { text: "Discover related papers inline", check: true },
    { text: "Stay in flow, always", check: true },
  ];

  return (
    <section id="difference" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">The Citable Difference</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Your Bibliography and Your Paper,{" "}
            <span className="text-primary">Finally in One Place</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Stop juggling between Zotero and Overleaf. With Citable, your references live alongside your writing, making citations effortless.
          </p>
        </div>

        {/* Before/After Comparison */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          {/* Before: Old Workflow */}
          <div className="relative rounded-2xl border border-error/20 bg-bg-secondary/50 p-8 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
                <X className="w-5 h-5 text-error" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">The Old Way</h3>
                <p className="text-sm text-text-muted">Fragmented workflow</p>
              </div>
            </div>

            {/* Tool Logos */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
              <div className="px-3 py-2 rounded-lg bg-bg-tertiary border border-border text-sm text-text-muted">
                Zotero
              </div>
              <ArrowRight className="w-4 h-4 text-text-dim" />
              <div className="px-3 py-2 rounded-lg bg-bg-tertiary border border-border text-sm text-text-muted">
                Overleaf
              </div>
              <ArrowRight className="w-4 h-4 text-text-dim" />
              <div className="px-3 py-2 rounded-lg bg-bg-tertiary border border-border text-sm text-text-muted">
                Copy/Paste
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {beforeItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-error font-medium">{index + 1}</span>
                  </div>
                  <span className="text-text-secondary text-sm">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Strikethrough overlay effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-error/30 transform -rotate-3" />
            </div>
          </div>

          {/* After: Citable Workflow */}
          <div className="relative rounded-2xl border border-primary/30 bg-gradient-card p-8 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

            {/* Header */}
            <div className="flex items-center gap-3 mb-8 relative">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">The Citable Way</h3>
                <p className="text-sm text-primary">Unified workflow</p>
              </div>
            </div>

            {/* Single Tool */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-primary/20 relative">
              <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-sm text-primary font-medium">
                Citable
              </div>
              <span className="text-text-muted text-sm">= Bibliography + Editor + AI</span>
            </div>

            {/* Benefits */}
            <div className="space-y-4 relative">
              {afterItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-foreground text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Benefits Row */}
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { icon: BookOpen, title: "One System", desc: "Bibliography + editor unified" },
            { icon: Sparkles, title: "Smart Suggestions", desc: "AI-powered citation hints" },
            { icon: FileText, title: "Live Preview", desc: "See your paper as you write" },
            { icon: Users, title: "Collaborate", desc: "Real-time co-authoring" },
          ].map((benefit, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-bg-secondary/50 border border-border hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-display font-semibold text-foreground mb-1">{benefit.title}</h4>
              <p className="text-sm text-text-muted">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CitableDifferenceSection;
