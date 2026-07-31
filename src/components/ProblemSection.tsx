import { Clock, Unlink, AlertCircle, ArrowRight } from "lucide-react";

const ProblemSection = () => {
  const painPoints = [
    {
      icon: Clock,
      title: "Hours lost searching for citations",
      description: "Switching between Zotero, Google Scholar, and your editor breaks your flow and wastes precious research time.",
    },
    {
      icon: Unlink,
      title: "Disconnected tools, broken workflow",
      description: "Your bibliography lives in one app, your paper in another. Copy-pasting citations leads to broken references and frustration.",
    },
    {
      icon: AlertCircle,
      title: "LaTeX errors with no clear help",
      description: "Cryptic compilation errors leave you guessing. Finding which line caused the issue shouldn't be a research project itself.",
    },
  ];

  return (
    <section id="problem" className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-bg-secondary/50" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Research Writing Shouldn't Feel Like This
          </h2>
          <p className="text-lg text-text-secondary">
            If you've ever felt frustrated by the fragmented tools in academic writing, you're not alone.
          </p>
        </div>

        {/* Pain Points Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-xl bg-bg-primary border border-border hover:border-primary/30 transition-all duration-300 card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-lg bg-error/10 flex items-center justify-center mb-6 group-hover:bg-error/20 transition-colors">
                <point.icon className="w-7 h-7 text-error" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {point.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Transition */}
        <div className="flex flex-col items-center mt-16 pt-16 border-t border-border">
          <div className="flex items-center gap-3 text-primary">
            <ArrowRight className="w-5 h-5" />
            <span className="text-lg font-medium">There's a better way</span>
            <ArrowRight className="w-5 h-5" />
          </div>
          <p className="mt-4 text-2xl md:text-3xl font-display font-bold text-foreground text-center">
            Citable brings everything together.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
