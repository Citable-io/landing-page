import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import WaitingListForm from "@/components/WaitingListForm";

const Workflow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);

    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 4500);
    }

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Resume auto-play after 10 seconds
    setTimeout(() => {
      setIsPlaying(true);
    }, 10000);
  };

  const steps = [
    {
      title: "Smart Research",
      description: "AI-powered literature search with intelligent recommendations and citation networks",
      icon: "🔍",
      details: "Discover relevant papers 10x faster with our AI research assistant",
      metrics: "98% accuracy • 50k+ papers indexed"
    },
    {
      title: "Collaborative Writing",
      description: "Real-time LaTeX editing with AI assistance and seamless team collaboration",
      icon: "✍️",
      details: "Write together in real-time with intelligent formatting suggestions",
      metrics: "Real-time sync • Multi-user editing"
    },
    {
      title: "Version Control",
      description: "Advanced version management with intelligent change tracking and rollback",
      icon: "📊",
      details: "Never lose work with automated versioning and smart conflict resolution",
      metrics: "Unlimited versions • Smart merging"
    },
    {
      title: "Publication Ready",
      description: "One-click export to multiple journal formats with automated compliance checking",
      icon: "🚀",
      details: "Export to 500+ journal formats with automatic compliance validation",
      metrics: "500+ formats • Auto-validation"
    }
  ];

  const Demo = ({ step, isActive }) => {
    const demos = {
      0: (
        <div className={`bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 transition-all duration-500 ${isActive ? 'shadow-lg scale-105' : ''}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 bg-blue-500 rounded-full ${isActive ? 'animate-pulse' : ''}`}></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">AI Research Assistant</span>
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">124 papers found</div>
          </div>
          <div className="space-y-2">
            {[
              { width: '85%', relevance: '95%' },
              { width: '78%', relevance: '87%' },
              { width: '82%', relevance: '92%' }
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className={`h-3 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded transition-all duration-1000 ${isActive ? 'animate-pulse' : ''}`}
                  style={{ width: item.width, animationDelay: `${i * 200}ms` }}></div>
                <div className="text-xs text-slate-400 dark:text-slate-500">{item.relevance} relevance</div>
              </div>
            ))}
          </div>
          {isActive && (
            <div className="mt-3 flex items-center space-x-2 text-xs text-blue-600 dark:text-blue-400">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
              <span>Analyzing citations...</span>
            </div>
          )}
        </div>
      ),
      1: (
        <div className={`bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 transition-all duration-500 ${isActive ? 'shadow-lg scale-105' : ''}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500 dark:text-slate-400">manuscript.tex</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full text-white text-xs flex items-center justify-center">A</div>
              <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full text-white text-xs flex items-center justify-center">B</div>
            </div>
          </div>
          <div className="font-mono text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <div className="text-blue-600 dark:text-blue-400">\section&#123;Results&#125;</div>
            <div className="flex items-center">
              <span>Our findings demonstrate</span>
              {isActive && <div className="inline-block w-2 h-4 bg-emerald-500 animate-pulse ml-1"></div>}
            </div>
            <div className="text-slate-500 dark:text-slate-400 italic text-[10px]">
              {isActive && <span className="animate-fade-in">✨ AI suggestion: Consider adding statistical significance</span>}
            </div>
          </div>
          {isActive && (
            <div className="mt-3 flex items-center space-x-2 text-xs text-emerald-600 dark:text-emerald-400">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
              <span>2 collaborators online</span>
            </div>
          )}
        </div>
      ),
      2: (
        <div className={`bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 transition-all duration-500 ${isActive ? 'shadow-lg scale-105' : ''}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">Version History</span>
            <div className="flex items-center space-x-1 text-xs text-slate-400">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span>Auto-saved</span>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { version: 'v2.3', change: 'Added statistical analysis', time: '2 min ago', active: true },
              { version: 'v2.2', change: 'Updated methodology', time: '1 hour ago', active: false },
              { version: 'v2.1', change: 'Refined conclusions', time: '3 hours ago', active: false }
            ].map((commit, i) => (
              <div key={i} className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${commit.active
                ? 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'
                : 'bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}>
                <div className={`w-3 h-3 rounded-full ${commit.active ? 'bg-orange-500 animate-pulse' : 'bg-slate-400'}`}></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{commit.version}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{commit.time}</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 truncate">{commit.change}</div>
                </div>
                {commit.active && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
      3: (
        <div className={`bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 transition-all duration-500 ${isActive ? 'shadow-lg scale-105' : ''}`}>
          <div className="text-center mb-3">
            <span className="text-xs text-slate-500 dark:text-slate-400">Export Formats</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { name: 'Nature', selected: isActive },
              { name: 'IEEE', selected: false },
              { name: 'ACM', selected: false }
            ].map((journal, i) => (
              <div key={journal.name} className={`relative h-12 bg-slate-100 dark:bg-slate-700 rounded-lg border-2 transition-all duration-500 ${journal.selected ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-slate-200 dark:border-slate-600'
                }`}>
                <div className="text-xs text-center pt-2 text-slate-600 dark:text-slate-400">{journal.name}</div>
                {journal.selected && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
          {isActive && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-purple-600 dark:text-purple-400">✓ Format validation</span>
                <span className="text-green-600 dark:text-green-400">✓ Citation check</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                <div className="bg-gradient-to-r from-purple-500 to-green-500 h-1 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
              <div className="text-center text-xs text-purple-600 dark:text-purple-400 font-medium">
                Ready for submission!
              </div>
            </div>
          )}
        </div>
      )
    };

    return demos[step] || demos[0];
  };

  return (
         <section id="workflow" className="py-24 bg-muted/20 dark:bg-muted/20 relative overflow-hidden">
       {/* Background decoration */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(3,98,76,0.05),transparent_50%)] pointer-events-none"></div>
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,223,130,0.05),transparent_50%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative">
                 {/* Header */}
         <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
           <p className="text-sm text-muted-foreground mb-4 font-normal animate-fade-in-up">Research workflow</p>
           <h2 className="text-4xl lg:text-5xl font-light text-foreground leading-tight mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             Everything you need to
             <br />
             <span className="text-primary font-light">streamline your research</span>
           </h2>
           <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
             From initial research to final publication, Citable streamlines every step with AI-powered intelligence.
           </p>
         </div>

        {/* Enhanced Progress Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <div className="bg-slate-200 dark:bg-slate-700 rounded-full h-3 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-[#03624c] via-[#03624c]/80 to-[#00DF82] rounded-full transition-all duration-1000 shadow-lg relative overflow-hidden"
                style={{ width: `${((activeStep + 1) / 4) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              {['Research', 'Write', 'Track', 'Publish'].map((label, index) => (
                <div key={label} className={`text-center transition-all duration-500 ${activeStep >= index ? 'text-[#03624c] dark:text-[#00DF82] font-semibold' : 'text-slate-500 dark:text-slate-400'}`}>
                  <div className={`w-3 h-3 rounded-full mx-auto mb-2 transition-all duration-500 ${activeStep >= index
                    ? 'bg-gradient-to-r from-[#03624c] to-[#00DF82] scale-125 shadow-lg'
                    : 'bg-slate-300 dark:bg-slate-600'
                    }`}></div>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Steps Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <div
                key={index}
                                 className={`group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border transition-all duration-700 cursor-pointer hover:shadow-2xl ${isActive
                   ? 'border-[#03624c] dark:border-[#00DF82] shadow-2xl scale-105 bg-gradient-to-br from-white to-[#03624c]/5 dark:from-slate-800 dark:to-[#00DF82]/5'
                   : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:scale-102'
                   }`}
                onClick={() => handleStepClick(index)}
              >
                                 {/* Background glow effect */}
                 {isActive && (
                   <div className="absolute inset-0 bg-gradient-to-br from-[#03624c]/10 to-[#00DF82]/10 rounded-3xl blur-xl scale-110 opacity-40"></div>
                 )}

                {/* Step Icon */}
                                 <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-500 ${isActive
                   ? 'bg-gradient-to-br from-[#03624c] to-[#00DF82] scale-110 shadow-xl'
                   : 'bg-slate-100 dark:bg-slate-700 group-hover:scale-105'
                   }`}>
                   <span className={`text-xl ${isActive ? 'text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                    {step.icon}
                  </span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                  )}
                </div>

                {/* Enhanced Demo */}
                <div className="mb-6 transform transition-all duration-500">
                  <Demo step={index} isActive={isActive} />
                </div>

                {/* Content */}
                <div className="text-center relative z-10">
                                     <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold mb-4 transition-all duration-300 ${isActive
                     ? 'bg-[#03624c]/10 dark:bg-[#00DF82]/10 text-[#03624c] dark:text-[#00DF82] shadow-lg'
                     : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                     }`}>
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#03624c] dark:bg-[#00DF82] animate-pulse' : 'bg-slate-400'}`}></span>
                    <span>STEP {index + 1}</span>
                  </div>

                                     <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                     {step.title}
                   </h3>
                   <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                     {step.description}
                   </p>

                  {isActive && (
                    <div className="space-y-2 animate-fade-in">
                      <p className="text-xs font-medium text-[#03624c] dark:text-[#00DF82]">
                        {step.details}
                      </p>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {step.metrics}
                      </div>
                    </div>
                  )}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-[#03624c] to-[#00DF82] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>



                 {/* Enhanced CTA Section */}
         <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2rem] p-12 lg:p-16 border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden">
           {/* Animated background elements */}
           <div className="absolute inset-0 bg-gradient-to-br from-[#03624c]/15 via-transparent to-[#00DF82]/15 pointer-events-none"></div>
           <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#03624c]/25 to-[#00DF82]/25 rounded-full blur-3xl transform translate-x-20 -translate-y-20 animate-pulse"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#00DF82]/25 to-[#03624c]/25 rounded-full blur-2xl transform -translate-x-16 translate-y-16 animate-pulse" style={{ animationDelay: '1s' }}></div>
           <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-[#03624c]/15 to-[#00DF82]/15 rounded-full blur-xl transform -translate-x-12 -translate-y-12 animate-pulse" style={{ animationDelay: '2s' }}></div>

          <div className="relative z-10 text-center">
                         <h3 className="text-4xl lg:text-5xl font-light text-foreground leading-tight mb-4">
               Ready to transform your
               <br />
               <span className="text-primary font-light">research workflow?</span>
             </h3>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
               Join the waiting list to get early access to the product.
             </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <WaitingListForm
                trigger={
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#03624c] to-[#00DF82] hover:from-[#03624c]/90 hover:to-[#00DF82]/90 text-white rounded-full px-10 py-4 font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                  >
                    Start Your Research Journey
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                    </svg>
                  </Button>
                }
              />


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;