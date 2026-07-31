import { useState } from "react";
import {
  BookMarked,
  Link2,
  CheckCircle2,
  Highlighter,
  History,
  Maximize2,
} from "lucide-react";
import { EditorDemo, BibliographyDemo, AnnotationsDemo, CitationLinkingDemo } from "./demos";
import { VersionHistoryDemo } from "./demos/VersionHistoryDemo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Feature {
  id: string;
  icon: React.ElementType;
  badge: string;
  headline: string;
  description: string;
  benefits: string[];
  visual: React.ReactNode;
}

const FeatureShowcase = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const features: Feature[] = [
    {
      id: "smart-editor",
      icon: BookMarked,
      badge: "Editor",
      headline: "A Modern LaTeX Editor, Not a 2012 Text Box",
      description: "Built on Monaco (the engine behind VS Code), our editor brings modern IDE features to LaTeX writing. Multiple file tabs, live math preview, code folding—everything Overleaf should have had years ago.",
      benefits: [
        "Multiple tabs — work on several files at once",
        "Live math preview on hover with KaTeX rendering",
        "Code folding for \\begin{} \\end{} blocks",
        "1200+ LaTeX snippets with smart autocomplete",
        "Unsaved changes indicator per file",
      ],
      visual: <EditorDemo />,
    },
    {
      id: "bibliography-management",
      icon: BookMarked,
      badge: "Bibliography",
      headline: "Organize Your Research Library",
      description: "A complete reference manager built for researchers. Import from DOI, BibTeX, or web sources. Organize with collections and tags. Find any paper instantly.",
      benefits: [
        "Import from DOI, BibTeX, or web sources",
        "Bulk upload multiple PDFs at once",
        "Organize with collections and colored tags",
        "Search across all your references",
        "Duplicate detection and cleanup",
      ],
      visual: <BibliographyDemo />,
    },
    {
      id: "bibliography-linking",
      icon: Link2,
      badge: "Library Links",
      headline: "Connect References to Your Projects",
      description: "Link your bibliography folders directly to your LaTeX projects. Citations from linked collections appear in autocomplete, making it seamless to cite from your research library.",
      benefits: [
        "Link collections from your library to any project",
        "\\cite{} autocomplete from linked references",
        "One-click adds citation + updates .bib file",
        "See 'Cited' badges on referenced papers",
        "No more copy-pasting BibTeX entries",
      ],
      visual: <CitationLinkingDemo />,
    },
    {
      id: "annotations",
      icon: Highlighter,
      badge: "Annotations",
      headline: "Highlight and Annotate Your PDFs",
      description: "Read and annotate research papers directly in Citable. Highlight text with 8 vibrant colors, add notes, and keep all your annotations organized alongside your references.",
      benefits: [
        "Highlight with 8 colors or underline",
        "Add notes to any highlight",
        "All annotations in one sidebar panel",
        "Annotations linked to your references",
        "Export annotations as notes",
      ],
      visual: <AnnotationsDemo />,
    },
    {
      id: "version-control",
      icon: History,
      badge: "Version History",
      headline: "Track Every Change to Your Document",
      description: "Never lose your work with automatic version snapshots. Compare any two versions side-by-side, restore previous states, and see exactly what changed between compilations.",
      benefits: [
        "Automatic snapshots on save and compile",
        "Manual snapshots with labels",
        "Side-by-side diff comparison",
        "Restore any previous version",
        "Grouped by day for easy navigation",
      ],
      visual: <VersionHistoryDemo />,
    },
  ];

  // Get the visual component for the modal based on feature id
  const getModalVisual = (featureId: string) => {
    switch (featureId) {
      case "smart-editor":
        return <EditorDemo />;
      case "bibliography-linking":
        return <CitationLinkingDemo />;
      case "bibliography-management":
        return <BibliographyDemo />;
      case "annotations":
        return <AnnotationsDemo />;
      case "version-control":
        return <VersionHistoryDemo />;
      default:
        return null;
    }
  };

  const getFeatureTitle = (featureId: string) => {
    const feature = features.find(f => f.id === featureId);
    return feature?.badge || "";
  };

  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to Write Better Research
          </h2>
          <p className="text-lg text-text-secondary">
            Powerful features designed for academic researchers, built to help you focus on what matters most: your research.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-24 lg:space-y-32">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <feature.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{feature.badge}</span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {feature.headline}
                </h3>

                <p className="text-text-secondary mb-8 leading-relaxed">
                  {feature.description}
                </p>

                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-text-secondary text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual - Clickable to open modal */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div
                  className="relative group cursor-pointer"
                  onClick={() => setOpenModal(feature.id)}
                >
                  {/* Demo preview */}
                  <div className="transition-transform duration-200 group-hover:scale-[1.02]">
                    {feature.visual}
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-200 rounded-xl flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Maximize2 className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white text-sm font-medium">Click to expand</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-size Demo Modal */}
      <Dialog open={openModal !== null} onOpenChange={(open) => !open && setOpenModal(null)}>
        <DialogContent className="max-w-[95vw] w-[1200px] max-h-[90vh] overflow-auto bg-[#0a0a0a] border-[#242E3C] p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-lg font-semibold text-white flex items-center gap-2">
              {openModal && (
                <>
                  {(() => {
                    const feature = features.find(f => f.id === openModal);
                    if (feature) {
                      const IconComponent = feature.icon;
                      return <IconComponent className="w-5 h-5 text-primary" />;
                    }
                    return null;
                  })()}
                  {getFeatureTitle(openModal)} Demo
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="p-4 pt-2">
            {openModal && getModalVisual(openModal)}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FeatureShowcase;
