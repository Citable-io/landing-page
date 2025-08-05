import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Brain, BookOpen, Search, Zap, Code, MessageSquare, FileText, Network, Eye, Plus, X, Check, Clock, GitBranch, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const DetailedFeaturesSection = () => {
  const [hoveredCitation, setHoveredCitation] = useState(false);
  const [tikzStep, setTikzStep] = useState(0);
  const [graphNodes, setGraphNodes] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [suggestionState, setSuggestionState] = useState('pending');
  const [collaboratorCursors, setCollaboratorCursors] = useState([]);
  const [discoveryPhase, setDiscoveryPhase] = useState('searching');
  const [aiThinking, setAiThinking] = useState(false);

  // Simplified graph discovery animation
  useEffect(() => {
    const phases = ['searching', 'found', 'clustering'];
    let phaseIndex = 0;
    
    const timer = setInterval(() => {
      setDiscoveryPhase(phases[phaseIndex]);
      phaseIndex = (phaseIndex + 1) % phases.length;
      
      if (phases[phaseIndex] === 'found') {
        setGraphNodes([0, 1, 2, 3, 4]);
      } else if (phases[phaseIndex] === 'clustering') {
        setSelectedPaper(2);
      } else {
        setGraphNodes([]);
        setSelectedPaper(null);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Simplified TikZ generation
  useEffect(() => {
    const steps = [
      { type: 'thinking', content: 'Analyzing your request...' },
      { type: 'code', content: '\\begin{tikzpicture}' },
      { type: 'code', content: '  \\node[draw, circle] (input) at (0,0) {Input};' },
      { type: 'code', content: '  \\node[draw, circle] (hidden) at (3,0) {Hidden};' },
      { type: 'code', content: '  \\node[draw, circle] (output) at (6,0) {Output};' },
      { type: 'code', content: '  \\draw[->] (input) -- (hidden);' },
      { type: 'code', content: '  \\draw[->] (hidden) -- (output);' },
      { type: 'code', content: '\\end{tikzpicture}' },
      { type: 'preview', content: 'preview' }
    ];
    
    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < steps.length) {
        setTikzStep(currentStep);
        setAiThinking(steps[currentStep].type === 'thinking');
        currentStep++;
      } else {
        setTikzStep(0);
        currentStep = 0;
        setAiThinking(false);
      }
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // Simplified collaboration cursors
  useEffect(() => {
    const updateCursors = () => {
      setCollaboratorCursors([
        { id: 1, x: Math.random() * 200, y: Math.random() * 60, name: 'Alex', color: '#03624c' },
        { id: 2, x: Math.random() * 200, y: Math.random() * 60, name: 'Sarah', color: '#f59e0b' }
      ]);
    };
    
    updateCursors();
    const timer = setInterval(updateCursors, 2000);
    return () => clearInterval(timer);
  }, []);

  // Suggestion state cycling
  useEffect(() => {
    const states = ['pending', 'accepted', 'rejected'];
    let stateIndex = 0;
    
    const timer = setInterval(() => {
      setSuggestionState(states[stateIndex]);
      stateIndex = (stateIndex + 1) % states.length;
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const detailedFeatures = [
    {
      icon: <Search className="w-7 h-7" />,
      title: "Intelligent Literature Discovery",
      highlights: [
        "Explore research landscape with citation maps",
        "Find thematic clusters & influential works",
        "See papers commonly cited together",
        "Instantly add papers to your bibliography"
      ],
      demo: (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          {/* Simplified header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Research Discovery</span>
            <div className="flex items-center space-x-2">
              {discoveryPhase === 'searching' && (
                <span className="text-xs text-[#03624c] dark:text-[#00DF82]">Searching...</span>
              )}
              {discoveryPhase === 'found' && (
                <span className="text-xs text-green-600 dark:text-green-400">Found 127 papers</span>
              )}
              {discoveryPhase === 'clustering' && (
                <span className="text-xs text-purple-600 dark:text-purple-400">Clustering themes</span>
              )}
            </div>
          </div>

          {/* Simplified network visualization */}
          <div className="relative h-24 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 280 96">
              {graphNodes.length > 0 && (
                <g className="opacity-60">
                  <line x1="60" y1="30" x2="140" y2="60" stroke="#03624c" strokeWidth="2" className="animate-pulse" />
                  <line x1="140" y1="60" x2="220" y2="35" stroke="#03624c" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                  <line x1="60" y1="30" x2="80" y2="70" stroke="#03624c" strokeWidth="2" className="animate-pulse" style={{ animationDelay: '1s' }} />
                </g>
              )}

              {graphNodes.map((node, index) => {
                const papers = [
                  { x: 60, y: 30, cluster: "ml" },
                  { x: 140, y: 60, cluster: "nlp" },
                  { x: 220, y: 35, cluster: "llm" },
                  { x: 80, y: 70, cluster: "cv" },
                  { x: 200, y: 70, cluster: "nlp" }
                ];
                
                const paper = papers[index];
                const isSelected = selectedPaper === index;
                const clusterColors = {
                  ml: '#03624c', nlp: '#8b5cf6', llm: '#f59e0b', cv: '#ef4444'
                };

                return (
                  <g 
                    key={node} 
                    className="animate-fade-in cursor-pointer" 
                    style={{ animationDelay: `${index * 0.3}s` }}
                    onClick={() => setSelectedPaper(index)}
                  >
                    <circle 
                      cx={paper.x} 
                      cy={paper.y} 
                      r={isSelected ? "8" : "6"} 
                      fill={clusterColors[paper.cluster]} 
                      className={`transition-all duration-300 ${isSelected ? 'animate-pulse' : ''}`}
                      opacity={isSelected ? 1 : 0.8}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Simple legend */}
            <div className="absolute top-2 left-2 flex space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-[#03624c] rounded-full"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">ML</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">NLP</span>
              </div>
            </div>

            {/* Add to Bibliography button */}
            {selectedPaper !== null && (
              <div className="absolute bottom-2 right-2 animate-fade-in">
                <button className="bg-[#03624c] dark:bg-[#00DF82] text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-1">
                  <Plus className="w-3 h-3" />
                  <span>Add to Bibliography</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: "Effortless Bibliography Management",
      highlights: [
        "Easily import from DOI, BibTeX, or the web",
        "Hover over citations to preview abstracts",
        "Get smart \\cite{} suggestions while writing",
        "Cite papers directly from manager"
      ],
      demo: (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          {/* Simplified header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">paper.tex</span>
            <div className="text-xs bg-[#03624c]/10 dark:bg-[#00DF82]/10 text-[#03624c] dark:text-[#00DF82] px-2 py-1 rounded-full">
              142 citations
            </div>
          </div>

          {/* Simplified writing interface */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-600">
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                Recent advances in transformer architectures have revolutionized natural language processing{' '}
                <span 
                  className="relative inline-block group"
                  onMouseEnter={() => setHoveredCitation(true)}
                  onMouseLeave={() => setHoveredCitation(false)}
                >
                  <span className="text-[#03624c] dark:text-[#00DF82] font-medium cursor-pointer bg-[#03624c]/10 dark:bg-[#00DF82]/10 px-1.5 py-0.5 rounded-md border border-[#03624c]/20 dark:border-[#00DF82]/20 hover:border-[#03624c] dark:hover:border-[#00DF82] transition-all duration-200">
                    [Vaswani2017]
                  </span>
                  
                  {/* Enhanced hover popup with bibliography integration */}
                  {hoveredCitation && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 shadow-xl z-20 animate-fade-in">
                      <div className="p-4">
                        {/* Header with status */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <BookOpen className="w-4 h-4 text-[#03624c] dark:text-[#00DF82]" />
                            <span className="text-xs text-[#03624c] dark:text-[#00DF82] font-semibold">Citation Preview</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs text-green-600 dark:text-green-400">In Bibliography</span>
                          </div>
                        </div>
                        
                        {/* Paper details */}
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                          "Attention Is All You Need"
                        </h4>
                        <div className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                          Vaswani, A., Shazeer, N., Parmar, N., et al. • NIPS 2017
                        </div>
                        
                        {/* Quick stats */}
                        <div className="flex items-center space-x-4 mb-3 text-xs text-slate-500 dark:text-slate-400">
                          <span>📊 65,127 citations</span>
                          <span>⭐ Highly influential</span>
                        </div>
                        
                        {/* Integration actions */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600 dark:text-slate-400">Cite as:</span>
                            <div className="flex items-center space-x-2">
                              <button className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded border border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                                {"\\cite{Vaswani2017}"}
                              </button>
                              <button className="text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded border border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                                {"\\citep{Vaswani2017}"}
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-600 dark:text-slate-400">Quick actions:</span>
                            <div className="flex items-center space-x-2">
                              <button className="text-xs text-[#03624c] dark:text-[#00DF82] hover:underline flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>View PDF</span>
                              </button>
                              <button className="text-xs text-[#03624c] dark:text-[#00DF82] hover:underline flex items-center space-x-1">
                                <Search className="w-3 h-3" />
                                <span>Find similar</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Bibliography integration status */}
                        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <Check className="w-3 h-3 text-green-500" />
                              <span className="text-slate-600 dark:text-slate-400">Added to bibliography</span>
                            </div>
                            <button className="text-xs text-[#03624c] dark:text-[#00DF82] hover:underline">
                              Manage →
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                        <div className="w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-white dark:border-t-slate-700"></div>
                      </div>
                    </div>
                  )}
                </span>
                . These models have achieved state-of-the-art performance.
              </p>
            </div>
            
            {/* Simplified suggestion bar */}
            <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-600">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-3 h-3 text-[#03624c] dark:text-[#00DF82]" />
                <span className="text-xs text-slate-600 dark:text-slate-400">Suggest:</span>
                <button className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded border border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                  + Devlin2018 (BERT)
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Brain className="w-7 h-7" />,
      title: "Your AI Research Assistant",
      highlights: [
        "Rewrite & improve your text with AI assistance",
        "Generate LaTeX tables & TikZ from prompts",
        "Set custom AI rules for paper consistency",
        "Use smart autocomplete for LaTeX & citations"
      ],
      demo: (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          {/* Simplified header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">AI Research Assistant</span>
            {aiThinking ? (
              <span className="text-xs text-[#03624c] dark:text-[#00DF82]">Thinking...</span>
            ) : (
              <span className="text-xs text-[#03624c] dark:text-[#00DF82]">Ready</span>
            )}
          </div>

          {/* Compact AI interface */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-600">
            {/* Input area */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-2 h-2 bg-[#03624c] dark:bg-[#00DF82] rounded-full"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">AI Prompt:</span>
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">"Create a neural network diagram"</span>
            </div>
            
            {/* Code generation progress */}
            <div className="space-y-1">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">Generating...</div>
              
              <div className="bg-slate-900 rounded p-2 font-mono text-xs">
                <div className="space-y-1">
                  {tikzStep >= 1 && (
                    <div className="text-purple-400 animate-fade-in">{"\\begin{tikzpicture}"}</div>
                  )}
                  {tikzStep >= 2 && (
                    <div className="text-blue-400 animate-fade-in">  {"\\node[draw, circle] (input) at (0,0) {Input};"}</div>
                  )}
                  {tikzStep >= 3 && (
                    <div className="text-green-400 animate-fade-in">  {"\\node[draw, circle] (hidden) at (3,0) {Hidden};"}</div>
                  )}
                  {tikzStep >= 4 && (
                    <div className="text-red-400 animate-fade-in">  {"\\node[draw, circle] (output) at (6,0) {Output};"}</div>
                  )}
                  {tikzStep >= 5 && (
                    <div className="text-yellow-400 animate-fade-in">  {"\\draw[->] (input) -- (hidden);"}</div>
                  )}
                  {tikzStep >= 6 && (
                    <div className="text-yellow-400 animate-fade-in">  {"\\draw[->] (hidden) -- (output);"}</div>
                  )}
                  {tikzStep >= 7 && (
                    <div className="text-purple-400 animate-fade-in">{"\\end{tikzpicture}"}</div>
                  )}
                </div>
              </div>
              
              {/* Status bar */}
              <div className="flex items-center justify-between text-xs mt-2">
                <span className="text-slate-500 dark:text-slate-400">Syntax validated</span>
                <button className="text-[#03624c] dark:text-[#00DF82] hover:underline">
                  Insert into document →
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Collaboration, Reimagined",
      highlights: [
        "Collaborate in real-time with live cursors",
        "Suggest changes instead of editing directly",
        "Accept or reject suggestions with one click",
        "Track all versions with named checkpoints"
      ],
      demo: (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700" style={{ minHeight: '220px' }}>
          {/* Simplified header */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">paper.tex</span>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-5 h-5 bg-[#03624c] rounded-full flex items-center justify-center text-xs text-white font-bold">A</div>
                <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-xs text-white font-bold">S</div>
                <span className="text-xs text-slate-500 dark:text-slate-400">2 online</span>
              </div>
            </div>
          </div>

          {/* Simplified code editor */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600 relative overflow-hidden">
            <div className="p-3 font-mono text-sm relative" style={{ minHeight: '120px' }}>
              {/* Live cursors */}
              {collaboratorCursors.map(cursor => (
                <div
                  key={cursor.id}
                  className="absolute pointer-events-none animate-pulse"
                  style={{ 
                    left: `${cursor.x}px`, 
                    top: `${cursor.y}px`,
                    transition: 'all 2s ease-in-out'
                  }}
                >
                  <div className="flex items-center space-x-1">
                    <div 
                      className="w-0.5 h-4 animate-pulse"
                      style={{ backgroundColor: cursor.color }}
                    ></div>
                    <div 
                      className="px-2 py-0.5 rounded text-xs text-white shadow-lg"
                      style={{ backgroundColor: cursor.color }}
                    >
                      {cursor.name}
                    </div>
                  </div>
                </div>
              ))}

              <div className="space-y-1">
                <div className="flex items-center">
                  <span className="text-slate-400 mr-3 w-6 text-xs">1</span>
                  <span className="text-blue-600 dark:text-blue-400">\section</span>
                  <span className="text-slate-700 dark:text-slate-300">{`{Machine Learning Applications}`}</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-slate-400 mr-3 w-6 text-xs">2</span>
                  <span className="text-slate-700 dark:text-slate-300">Recent developments in neural networks have</span>
                </div>
                
                {/* Line with suggestion */}
                <div className="flex items-center relative">
                  <span className="text-slate-400 mr-3 w-6 text-xs">3</span>
                  <span className="text-slate-700 dark:text-slate-300">
                    {suggestionState === 'pending' && (
                      <>
                        demonstrated{' '}
                        <span className="relative">
                          <span className="bg-yellow-200 dark:bg-yellow-800/50 px-1 rounded">
                            remarkable capabilities
                          </span>
                          
                          {/* Cursor-style suggestion popup */}
                          <div className="absolute -top-16 -left-20 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg shadow-xl z-10 w-80 animate-fade-in">
                            <div className="p-3">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-xs text-white font-bold">S</div>
                                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Sarah suggests:</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3 text-slate-400" />
                                  <span className="text-xs text-slate-400">now</span>
                                </div>
                              </div>
                              
                              <div className="text-xs text-slate-600 dark:text-slate-400 mb-3 bg-slate-50 dark:bg-slate-800 p-2 rounded border">
                                <div className="flex items-center space-x-2">
                                  <span className="text-red-500 line-through">remarkable capabilities</span>
                                  <span className="text-slate-400">→</span>
                                  <span className="text-green-600 font-medium">unprecedented performance</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex space-x-2">
                                  <button className="bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 px-3 py-1.5 rounded text-xs font-medium hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors flex items-center space-x-1">
                                    <Check className="w-3 h-3" />
                                    <span>Accept</span>
                                  </button>
                                  <button className="bg-red-100 dark:bg-red-800/30 text-red-700 dark:text-red-300 px-3 py-1.5 rounded text-xs font-medium hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors flex items-center space-x-1">
                                    <X className="w-3 h-3" />
                                    <span>Reject</span>
                                  </button>
                                </div>
                                <div className="text-xs text-slate-400">
                                  <span className="font-mono">⌘+Enter</span> / <span className="font-mono">⌘+Esc</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Arrow pointing to suggestion */}
                            <div className="absolute top-full left-4">
                              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-slate-700"></div>
                            </div>
                          </div>
                        </span>
                      </>
                    )}
                    
                    {suggestionState === 'accepted' && (
                      <span className="bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 px-1 rounded">
                        unprecedented performance
                      </span>
                    )}
                    
                    {suggestionState === 'rejected' && (
                      <span className="text-slate-700 dark:text-slate-300">
                        remarkable capabilities
                      </span>
                    )}
                    {' '}in various domains.
                  </span>
                </div>
              </div>
            </div>

            {/* Simplified version control */}
            <div className="px-3 py-2 bg-slate-50 dark:bg-slate-700 border-t border-slate-200 dark:border-slate-600">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">3 pending suggestions</span>
                <span className="text-slate-500 dark:text-slate-400">Last saved: 2s ago</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

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

        <div className="grid gap-8 lg:grid-cols-2 max-w-[1400px] mx-auto">
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

              <div className="space-y-8">
                {/* Feature highlights as a clean list */}
                <div className="space-y-3">
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

                {/* Demo section with better separation */}
                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
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