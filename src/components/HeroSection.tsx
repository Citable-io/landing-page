import { Button } from "@/components/ui/button";
import WaitingListForm from "@/components/WaitingListForm";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [citationIndex, setCitationIndex] = useState(0);
  const [equationIndex, setEquationIndex] = useState(0);

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

  const citations = [
    '\\cite{author2023}',
    '\\citep{smith2022}',
    '\\citet{jones2024}',
    '\\ref{fig:results}',
    '\\eqref{eq:main}'
  ];

  const equations = [
    'E = mc^2',
    '\\sum_{i=1}^{n} x_i',
    '\\int_{0}^{\\infty} e^{-x} dx',
    '\\frac{\\partial f}{\\partial x}',
    '\\alpha + \\beta = \\gamma'
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

  useEffect(() => {
    const citationInterval = setInterval(() => {
      setCitationIndex(prev => (prev + 1) % citations.length);
    }, 4000);

    return () => clearInterval(citationInterval);
  }, [citations.length]);

  useEffect(() => {
    const equationInterval = setInterval(() => {
      setEquationIndex(prev => (prev + 1) % equations.length);
    }, 5000);

    return () => clearInterval(equationInterval);
  }, [equations.length]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-[#03624c]/10 dark:from-[#00DF82]/10 via-transparent to-transparent rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-[#03624c]/8 dark:from-[#00DF82]/8 via-transparent to-transparent rounded-full blur-3xl animate-float-medium"></div>

        {/* LaTeX Code */}
        <div className="absolute top-32 left-8 opacity-5 dark:opacity-8 font-mono text-xs text-[#03624c] dark:text-[#00DF82] animate-float-slow hidden md:block">
          <div className="transform rotate-12">
            {latexDocument.slice(currentLine, currentLine + 3).map((line, i) => (
              <div key={i} className={`transition-opacity duration-500 ${isTyping && i === 0 ? 'opacity-100' : 'opacity-60'}`}>
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Citations */}
        <div className="absolute top-1/4 right-20 opacity-6 dark:opacity-10 font-mono text-sm text-[#03624c] dark:text-[#00DF82] animate-float-medium hidden md:block">
          <div className="transform -rotate-6 transition-all duration-1000">
            {citations[citationIndex]}
          </div>
        </div>

        {/* Equations */}
        <div className="absolute bottom-40 left-16 opacity-5 dark:opacity-8 font-serif text-lg text-[#03624c] dark:text-[#00DF82] animate-float-slow hidden md:block">
          <div className="transform rotate-3 transition-all duration-1000">
            {equations[equationIndex]}
          </div>
        </div>

        {/* Paper Structure Visualization */}
        <div className="absolute top-1/2 left-12 opacity-4 dark:opacity-6 animate-float-medium hidden md:block">
          <div className="space-y-2 transform -rotate-12">
            <div className="w-16 h-1 bg-[#03624c]/20 dark:bg-[#00DF82]/20 rounded animate-pulse"></div>
            <div className="w-12 h-0.5 bg-[#03624c]/15 dark:bg-[#00DF82]/15 rounded animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-20 h-0.5 bg-[#03624c]/15 dark:bg-[#00DF82]/15 rounded animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="w-8 h-0.5 bg-[#03624c]/10 dark:bg-[#00DF82]/10 rounded animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        {/* Bibliography */}
        <div className="absolute bottom-32 right-16 opacity-4 dark:opacity-6 font-mono text-xs text-[#03624c] dark:text-[#00DF82] animate-float-slow hidden md:block">
          <div className="transform rotate-6 space-y-1">
            <div className="animate-fade-in-out">Author, A. (2024)</div>
            <div className="animate-fade-in-out" style={{ animationDelay: '2s' }}>Smith, J. (2023)</div>
            <div className="animate-fade-in-out" style={{ animationDelay: '4s' }}>Jones, M. (2022)</div>
          </div>
        </div>

        {/* Collaboration Network Nodes */}
        <div className="absolute top-24 right-1/3 opacity-4 dark:opacity-6 hidden md:block">
          <div className="relative w-24 h-24 animate-spin-slow">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-[#03624c]/20 dark:bg-[#00DF82]/20 rounded-full -translate-x-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 left-1/2 w-1.5 h-1.5 bg-[#03624c]/15 dark:bg-[#00DF82]/15 rounded-full -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-0 w-1 h-1 bg-[#03624c]/10 dark:bg-[#00DF82]/10 rounded-full -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-[#03624c]/15 dark:bg-[#00DF82]/15 rounded-full -translate-y-1/2 animate-pulse" style={{ animationDelay: '3s' }}></div>
          </div>
        </div>

        {/* Collaboration Avatars and Comments */}
        <div className="absolute top-1/3 left-1/4 animate-float-slow opacity-4 dark:opacity-6 hidden md:block">
          <div className="relative w-32 h-32">
            <div className="absolute top-0 left-0 w-6 h-6 bg-[#03624c]/25 dark:bg-[#00DF82]/25 rounded-full flex items-center justify-center text-[10px] text-white font-semibold">
              AJ
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-[#03624c]/25 dark:bg-[#00DF82]/25 rounded-full flex items-center justify-center text-[10px] text-white font-semibold" style={{ animationDelay: '1.5s' }}>
              ML
            </div>
            <div className="absolute top-10 left-8 bg-white/10 dark:bg-white/15 text-white text-xs px-2 py-1 rounded backdrop-blur-sm shadow animate-fade-in-out" style={{ animationDelay: '2s' }}>
              “Should we revise this paragraph?”
            </div>
          </div>
        </div>

        {/* Real-time cursors */}
        <div className="absolute bottom-1/3 right-1/3 animate-float-medium opacity-4 dark:opacity-6 hidden md:block">
          <div className="relative w-32 h-32">
            <div className="absolute top-6 left-4 w-1 h-4 bg-[#03624c]/40 dark:bg-[#00DF82]/40 rounded-sm animate-blink-cursor"></div>
            <div className="absolute bottom-4 right-6 w-1 h-4 bg-[#03624c]/40 dark:bg-[#00DF82]/40 rounded-sm animate-blink-cursor" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Timeline */}
        <div className="absolute bottom-1/2 left-1/3 opacity-3 dark:opacity-5 animate-float-medium hidden md:block">
          <div className="flex items-center space-x-3 transform rotate-45">
            <div className="w-2 h-2 bg-[#03624c]/20 dark:bg-[#00DF82]/20 rounded-full animate-ping"></div>
            <div className="w-8 h-0.5 bg-[#03624c]/15 dark:bg-[#00DF82]/15"></div>
            <div className="w-1.5 h-1.5 bg-[#03624c]/15 dark:bg-[#00DF82]/15 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="w-6 h-0.5 bg-[#03624c]/10 dark:bg-[#00DF82]/10"></div>
            <div className="w-1 h-1 bg-[#03624c]/10 dark:bg-[#00DF82]/10 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Grid pattern */}
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#03624c]/20 dark:bg-[#00DF82]/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#03624c]/15 dark:bg-[#00DF82]/15 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#03624c]/10 dark:bg-[#00DF82]/10 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute inset-0 opacity-[0.01] dark:opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="space-y-4 mb-8">
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-light leading-tight">
              <span className="text-primary font-normal animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Craft it.
              </span>
              <br />
              <span className="text-foreground font-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Polish it.
              </span>
              <br />
              <span className="text-primary font-normal animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                Cite it.
              </span>
            </h1>
          </div>

          <p className="text-xl text-muted-foreground mb-16 font-light animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            The research environment that empowers your every word.
          </p>

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
