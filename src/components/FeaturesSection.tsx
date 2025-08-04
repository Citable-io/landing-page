const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: "Real-Time Collaborative LaTeX Editor",
      description: "Write LaTeX with syntax highlighting, real-time collaboration, version history, and GitHub-like paragraph modifications. Auto-save, comments, and error detection in a VSCode-like sidebar.",
      hasDemo: true
    },
    {
      id: 2,
      title: "AI-Assisted Writing & Autocomplete",
      description: "LaTeX-aware autocomplete, grammar suggestions, AI-assisted rewriting, citation generation, and customizable review rules. Chat with your document and get intelligent layout management.",
      hasDemo: true
    },
    {
      id: 3,
      title: "Integrated Bibliography Manager",
      description: "Import from BibTeX, DOI, Zotero, and Google Scholar. Smart citation insertion, bibliography reformatting, and hover previews for formulas and paper abstracts.",
      hasDemo: true
    },
    {
      id: 4,
      title: "Smart Literature Graph",
      description: "Discover influential prior works, recent follow-ups, and thematic clusters. Connected Papers-like visualization to explore the research landscape around your work.",
      hasDemo: false
    }
  ];

  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-sm text-muted-foreground mb-6 font-normal animate-fade-in-up">Our features</p>
          <h2 className="text-5xl lg:text-6xl font-light text-foreground leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Everything you need to
            <br />
            <span className="text-primary font-light">write better research</span>
          </h2>
        </div>
        
        <div className="space-y-4 max-w-2xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              className="border border-primary/40 rounded-2xl p-8 hover:border-primary/60 transition-all duration-300 bg-transparent animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-base font-normal text-foreground mb-3">
                    {feature.id}. {feature.title}
                  </h3>
                  {feature.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed font-light">
                      {feature.description}
                    </p>
                  )}
                </div>
                {feature.hasDemo && (
                  <div className="ml-8 flex-shrink-0">
                    <div className="w-36 h-24 bg-muted/20 rounded-xl flex items-center justify-center border border-border/30">
                      <span className="text-xs text-muted-foreground font-normal">GIF DEMO</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;