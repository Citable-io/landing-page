import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Brain, BookOpen, Search, Zap, Code, MessageSquare, FileText, Network } from "lucide-react";
import { useState, useEffect } from "react";

const DetailedFeaturesSection = () => {
  const [typingText, setTypingText] = useState("");
  const [currentCitation, setCurrentCitation] = useState(0);
  const [graphNodes, setGraphNodes] = useState([]);

  // Typing animation for AI demo
  useEffect(() => {
    const text = "This argument needs supporting evidence.";
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypingText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Citation cycling
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCitation(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Animated graph nodes
  useEffect(() => {
    const timer = setInterval(() => {
      setGraphNodes(prev =>
        prev.length < 8 ? [...prev, prev.length] : []
      );
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const detailedFeatures = [
    {
      icon: <Users className="w-7 h-7" />,
      title: "Real-Time Collaborative LaTeX Editor",
      highlights: [
        "Real-time cursors and edits",
        "Version history with rollback",
        "Comments and highlights",
        "Auto-save functionality",
        "GitHub-like review system"
      ],
      demo: (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-[#03624c] dark:bg-[#00DF82] rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#03624c] dark:bg-[#000000] rounded-full flex items-center justify-center text-xs text-white font">A</div>
              <div className="w-6 h-6 bg-[#03624c] dark:bg-[#03624c] rounded-full flex items-center justify-center text-xs text-white font">B</div>
              <span className="text-xs text-slate-500 dark:text-slate-400">paper.tex</span>
            </div>
          </div>

          <div className="space-y-1 text-sm font-mono">
            <div className="flex items-center">
              <span className="text-slate-400 mr-3 text-xs">1</span>
              <span className="text-[#03624c] dark:text-[#00DF82]">\documentclass</span>
              <span className="text-slate-700 dark:text-slate-300">{`{article}`}</span>
            </div>
            <div className="flex items-center">
              <span className="text-slate-400 mr-3 text-xs">2</span>
              <span className="text-[#03624c] dark:text-[#00DF82]">\title</span>
              <span className="text-slate-700 dark:text-slate-300">{`{Machine Learning in`}</span>
              <div className="w-0.5 h-4 bg-[#03624c] dark:bg-[#00DF82] ml-1 animate-pulse"></div>
            </div>
            <div className="flex items-center relative">
              <span className="text-slate-400 mr-3 text-xs">3</span>
              <span className="text-slate-700 dark:text-slate-300">Research</span>
              <div className="absolute right-0 top-0 bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded text-xs animate-bounce">
                Alex is typing...
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-slate-400 mr-3 text-xs">4</span>
              <span className="text-[#03624c] dark:text-[#00DF82]">\begin</span>
              <span className="text-slate-700 dark:text-slate-300">{`{document}`}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#03624c] dark:bg-[#00DF82] rounded-full animate-ping"></div>
            <span className="text-xs text-slate-500 dark:text-slate-400">2 collaborators online</span>
          </div>
        </div>
      )
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "AI-Assisted Writing & Autocomplete",
      highlights: [
        "LaTeX-aware autocomplete",
        "Grammar and style suggestions",
        "AI-assisted paragraph rewriting",
        "Citation generation",
        "Customizable review rules"
      ],
      demo: (
        <div className="bg-gradient-to-br from-[#03624c]/10 to-[#03624c]/5 dark:from-[#00DF82]/10 dark:to-[#00DF82]/5 rounded-xl p-5 border border-[#03624c]/20 dark:border-[#00DF82]/20 shadow-lg">
          <div className="flex items-center mb-4">
            <Brain className="w-5 h-5 text-[#03624c] dark:text-[#00DF82] mr-2 animate-pulse" />
            <span className="text-sm font-semibold text-[#03624c] dark:text-[#00DF82]">AI Writing Assistant</span>
            <div className="ml-auto w-2 h-2 bg-[#03624c] dark:bg-[#00DF82] rounded-full animate-pulse"></div>
          </div>

          <div className="space-y-3">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-[#03624c]/20 dark:border-[#00DF82]/20 relative overflow-hidden">
              <div className="text-xs text-[#03624c] dark:text-[#00DF82] font-medium mb-2">✨ AI Suggestion</div>
              <div className="text-sm text-slate-700 dark:text-slate-300">
                {typingText}
                <span className="inline-block w-2 h-4 bg-[#03624c] dark:bg-[#00DF82] ml-1 animate-pulse"></span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#03624c]/10 dark:via-[#00DF82]/10 to-transparent animate-shimmer"></div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">Quick Actions</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-[#03624c] dark:bg-[#00DF82] rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-1 h-1 bg-[#03624c] dark:bg-[#00DF82] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-[#03624c] dark:bg-[#00DF82] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-[#03624c]/10 dark:bg-[#00DF82]/10 text-[#03624c] dark:text-[#00DF82] rounded-full text-xs hover:scale-105 transition-transform">
                  Add Citation
                </button>
                <button className="px-3 py-1 bg-[#03624c]/10 dark:bg-[#00DF82]/10 text-[#03624c] dark:text-[#00DF82] rounded-full text-xs hover:scale-105 transition-transform">
                  Rephrase
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: "Integrated Bibliography Manager",
      highlights: [
        "Import from BibTeX, DOI, Zotero",
        "Smart citation insertion",
        "Bibliography reformatting",
        "Hover previews for formulas",
        "Chrome extension for collection"
      ],
      demo: (
        <div className="bg-gradient-to-br from-[#03624c]/10 to-[#03624c]/5 dark:from-[#00DF82]/10 dark:to-[#00DF82]/5 rounded-xl p-5 border border-[#03624c]/20 dark:border-[#00DF82]/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 text-[#03624c] dark:text-[#00DF82] mr-2" />
              <span className="text-sm font-semibold text-[#03624c] dark:text-[#00DF82]">Bibliography</span>
            </div>
            <span className="text-xs bg-[#03624c]/10 dark:bg-[#00DF82]/10 text-[#03624c] dark:text-[#00DF82] px-2 py-1 rounded-full">
              {3} sources
            </span>
          </div>

          <div className="space-y-2">
            {[
              { author: "Smith, J. (2023)", status: "cited", color: "green" },
              { author: "Johnson, A. (2022)", status: "imported", color: "blue" },
              { author: "Williams, B. (2021)", status: "pending", color: "yellow" }
            ].map((citation, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${currentCitation === index ? 'border-[#03624c] dark:border-[#00DF82] shadow-md' : 'border-slate-200 dark:border-slate-600'
                  }`}
                style={{
                  transform: currentCitation === index ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${citation.color === 'green' ? 'bg-[#03624c] dark:bg-[#00DF82]' :
                    citation.color === 'blue' ? 'bg-[#03624c] dark:bg-[#00DF82]' : 'bg-yellow-500'
                    } ${currentCitation === index ? 'animate-pulse' : ''}`}></div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">{citation.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {citation.status === 'cited' && <span className="text-xs text-[#03624c] dark:text-[#00DF82]">✓ Cited</span>}
                  {citation.status === 'imported' && <span className="text-xs text-[#03624c] dark:text-[#00DF82]">📥 New</span>}
                  {citation.status === 'pending' && <span className="text-xs text-yellow-600 dark:text-yellow-400">⏳ Review</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 p-2 bg-[#03624c]/10 dark:bg-[#00DF82]/10 rounded-lg">
            <div className="flex items-center text-xs text-[#03624c] dark:text-[#00DF82]">
              <div className="w-2 h-2 bg-[#03624c] dark:bg-[#00DF82] rounded-full mr-2 animate-pulse"></div>
              Auto-syncing with Zotero...
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Search className="w-7 h-7" />,
      title: "Smart Literature Graph",
      highlights: [
        "Influential prior works",
        "Recent follow-ups",
        "Thematic clusters",
        "Papers commonly cited together",
        "Research landscape exploration"
      ],
      demo: (
        <div className="bg-gradient-to-br from-[#03624c]/10 to-[#03624c]/5 dark:from-[#00DF82]/10 dark:to-[#00DF82]/5 rounded-xl p-5 border border-[#03624c]/20 dark:border-[#00DF82]/20 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Search className="w-5 h-5 text-[#03624c] dark:text-[#00DF82] mr-2" />
              <span className="text-sm font-semibold text-[#03624c] dark:text-[#00DF82]">Research Network</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-[#03624c] dark:bg-[#00DF82] rounded-full animate-pulse"></div>
              <span className="text-xs text-[#03624c] dark:text-[#00DF82]">Discovering...</span>
            </div>
          </div>

          <div className="relative h-32 bg-white dark:bg-slate-800 rounded-lg border border-[#03624c]/20 dark:border-[#00DF82]/20 overflow-hidden">
            {/* Animated network visualization */}
            <svg className="w-full h-full" viewBox="0 0 200 120">
              {/* Connections */}
              <g className="opacity-30">
                <line x1="40" y1="30" x2="100" y2="60" stroke="currentColor" strokeWidth="1" className="text-[#03624c] dark:text-[#00DF82] animate-pulse" />
                <line x1="100" y1="60" x2="160" y2="40" stroke="currentColor" strokeWidth="1" className="text-[#03624c] dark:text-[#00DF82] animate-pulse" style={{ animationDelay: '0.5s' }} />
                <line x1="40" y1="30" x2="70" y2="80" stroke="currentColor" strokeWidth="1" className="text-[#03624c] dark:text-[#00DF82] animate-pulse" style={{ animationDelay: '1s' }} />
                <line x1="70" y1="80" x2="130" y2="90" stroke="currentColor" strokeWidth="1" className="text-[#03624c] dark:text-[#00DF82] animate-pulse" style={{ animationDelay: '1.5s' }} />
                <line x1="160" y1="40" x2="130" y2="90" stroke="currentColor" strokeWidth="1" className="text-[#03624c] dark:text-[#00DF82] animate-pulse" style={{ animationDelay: '2s' }} />
              </g>

              {/* Nodes */}
              {graphNodes.map((node, index) => {
                const positions = [
                  { x: 40, y: 30, color: '[#03624c]', size: 8 },
                  { x: 100, y: 60, color: '[#03624c]', size: 6 },
                  { x: 160, y: 40, color: '[#03624c]', size: 5 },
                  { x: 70, y: 80, color: '[#03624c]', size: 4 },
                  { x: 130, y: 90, color: '[#03624c]', size: 4 },
                  { x: 180, y: 70, color: '[#03624c]', size: 3 },
                  { x: 20, y: 60, color: '[#03624c]', size: 3 },
                  { x: 120, y: 20, color: '[#03624c]', size: 3 }
                ];

                const pos = positions[index % positions.length];
                return (
                  <circle
                    key={node}
                    cx={pos.x}
                    cy={pos.y}
                    r={pos.size}
                    className={`fill-[#03624c] dark:fill-[#00DF82] animate-scale-in`}
                    style={{
                      animationDelay: `${index * 0.3}s`,
                      transformOrigin: `${pos.x}px ${pos.y}px`
                    }}
                  />
                );
              })}
            </svg>

            {/* Floating papers */}
            <div className="absolute top-2 right-2 bg-[#03624c]/10 dark:bg-[#00DF82]/10 px-2 py-1 rounded text-xs text-[#03624c] dark:text-[#00DF82] animate-fade-in-up">
              Deep Learning (2016)
            </div>
            <div className="absolute bottom-2 left-2 bg-[#03624c]/10 dark:bg-[#00DF82]/10 px-2 py-1 rounded text-xs text-[#03624c] dark:text-[#00DF82] animate-fade-in-up" style={{ animationDelay: '1s' }}>
              Transformers (2017)
            </div>
            <div className="absolute bottom-2 right-2 bg-[#03624c]/10 dark:bg-[#00DF82]/10 px-2 py-1 rounded text-xs text-[#03624c] dark:text-[#00DF82] animate-fade-in-up" style={{ animationDelay: '2s' }}>
              GPT-3 (2020)
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-[#03624c] dark:text-[#00DF82]">127 related papers found</span>
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-[#03624c]/10 dark:bg-[#00DF82]/10 text-[#03624c] dark:text-[#00DF82] rounded">ML</span>
              <span className="px-2 py-1 bg-[#03624c]/10 dark:bg-[#00DF82]/10 text-[#03624c] dark:text-[#00DF82] rounded">NLP</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  const WaitingListForm = ({ trigger }) => {
    return trigger;
  };

  return (
    <section id="features" className="py-24 bg-muted/20 dark:bg-muted/20">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm text-muted-foreground mb-4 font-normal animate-fade-in-up">Our features</p>
          <h2 className="text-4xl lg:text-5xl font-light text-foreground leading-tight mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Everything you need to
            <br />
            <span className="text-primary font-light">write better research</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            Citable combines AI with collaborative LaTeX editing to help researchers write better papers.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
          {detailedFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-3xl p-8 hover:border-[#03624c] dark:hover:border-[#00DF82] hover:shadow-2xl hover:shadow-[#03624c]/10 dark:hover:shadow-[#00DF82]/10 transition-all duration-500 animate-fade-in-up hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center mb-6">
                <div className="text-[#03624c] dark:text-[#00DF82] mr-4 p-3 bg-[#03624c]/10 dark:bg-[#00DF82]/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {feature.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                <div className="xl:col-span-2 space-y-3">
                  {feature.highlights.map((highlight, highlightIndex) => (
                    <div
                      key={highlightIndex}
                      className="flex items-start text-sm text-slate-600 dark:text-slate-400 animate-fade-in-up group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300"
                      style={{ animationDelay: `${(index * 0.2) + (highlightIndex * 0.1) + 0.6}s` }}
                    >
                      <CheckCircle className="w-4 h-4 text-[#03624c] dark:text-[#00DF82] mr-3 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="xl:col-span-3">
                  <div className="transform group-hover:scale-105 transition-transform duration-500">
                    {feature.demo}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default DetailedFeaturesSection;