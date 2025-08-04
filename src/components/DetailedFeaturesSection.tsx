import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Brain, BookOpen, Search, Zap } from "lucide-react";
import WaitingListForm from "@/components/WaitingListForm";

const DetailedFeaturesSection = () => {
  const detailedFeatures = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Real-Time Collaborative LaTeX Editor",
      description: "",
      highlights: [
        "Real-time cursors and edits",
        "Version history with rollback",
        "Comments and highlights",
        "Auto-save functionality",
        "GitHub-like review system",
        "Syntax highlighting for LaTeX",
        "Error detection in sidebar"
      ]
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Assisted Writing & Autocomplete",
      description: "",
      highlights: [
        "LaTeX-aware autocomplete",
        "Grammar and style suggestions",
        "AI-assisted paragraph rewriting",
        "Citation generation",
        "Customizable review rules",
        "AI-powered layout management",
        "TikZ illustration assistance"
      ]
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Integrated Bibliography Manager",
      description: "",
      highlights: [
        "Import from BibTeX, DOI, Zotero",
        "Smart citation insertion",
        "Bibliography reformatting",
        "Hover previews for formulas",
        "Paper abstract previews",
        "Chrome extension for paper collection",
        "Export to PDF with citations"
      ]
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Smart Literature Graph",
      description: "",
      highlights: [
        "Influential prior works",
        "Recent follow-ups",
        "Thematic clusters",
        "Papers commonly cited together",
        "Connected Papers-like visualization",
        "Literature discovery tools",
        "Research landscape exploration"
      ]
    }
  ];

  return (
    <section id="features" className="py-24 bg-muted/20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-sm text-muted-foreground mb-6 font-normal animate-fade-in-up">Our features</p>
          <h2 className="text-5xl lg:text-6xl font-light text-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Everything you need to
            <br />
            <span className="text-primary font-light">write better research</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Citable combines the power of AI with collaborative LaTeX editing to help researchers write better papers, manage citations, and discover relevant literature.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {detailedFeatures.map((feature, index) => (
            <div 
              key={index}
              className="bg-background border border-border/30 rounded-2xl p-8 hover:border-primary/40 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <div className="text-primary mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <ul className="space-y-3">
                {feature.highlights.map((highlight, highlightIndex) => (
                  <li 
                    key={highlightIndex} 
                    className="flex items-center text-sm text-muted-foreground animate-fade-in-up"
                    style={{ animationDelay: `${(index * 0.2) + (highlightIndex * 0.1) + 0.5}s` }}
                  >
                    <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0 animate-pulse" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-8">
            Ready to transform your research writing experience?
          </p>
          <WaitingListForm
            trigger={
              <Button variant="cta" size="lg" className="rounded-full px-8 py-3">
                Join the waiting list
              </Button>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default DetailedFeaturesSection; 