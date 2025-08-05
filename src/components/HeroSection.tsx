import { Button } from "@/components/ui/button";
import WaitingListForm from "@/components/WaitingListForm";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  const latexDocument = [
    '\\documentclass[12pt]{article}',
    '\\usepackage{amsmath,amssymb,amsfonts}',
    '\\usepackage{graphicx}',
    '\\usepackage{cite}',
    '',
    '\\title{Research Paper Title}',
    '\\author{Author Name}',
    '\\date{\\today}',
    '',
    '\\begin{document}',
    '\\maketitle',
    '',
    '\\begin{abstract}',
    'This paper presents...',
    '\\end{abstract}',
    '',
    '\\section{Introduction}',
    'The introduction begins here...',
    '',
    '\\begin{equation}',
    'E = mc^2',
    '\\end{equation}',
    '',
    '\\section{Methodology}',
    'Our approach involves...',
    '',
    '\\bibliography{references}',
    '\\end{document}'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTyping) {
        setIsTyping(true);
        setTimeout(() => {
          setCurrentLine(prev => (prev + 1) % latexDocument.length);
          setIsTyping(false);
        }, 2000);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isTyping, latexDocument.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Simple background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px]"></div>
      </div>
      

      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Heading with staggered animation */}
          <div className="space-y-4 mb-8">
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-light leading-tight">
              <span className="text-primary font-normal animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Write.
              </span>
              <br />
              <span className="text-foreground font-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Collaborate.
              </span>
              <br />
              <span className="text-primary font-normal animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                Discover.
              </span>
            </h1>
          </div>
          
          {/* Subtitle with animation */}
          <p className="text-xl text-muted-foreground mb-16 font-light animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            The AI-powered collaborative LaTeX editor for researchers and academics
          </p>
          
          {/* CTA Button with animation */}
          <div className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <WaitingListForm
              trigger={
                <Button variant="hero" size="lg" className="rounded-full px-8 py-3 text-base font-normal hover:scale-105 transition-transform duration-300">
                  Join the waiting list
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;