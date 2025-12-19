/**
 * AnimatedMockup Component
 *
 * Realistic product mockup matching the editor aesthetic from editor-layouts-corrected.html
 * Shows: Activity Bar | Sidebar (File Browser) | Editor Pane | PDF Pane
 */

export function AnimatedMockup() {
  return (
    <div className="relative rounded-xl overflow-hidden border border-border/50 bg-card shadow-2xl">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/30 bg-secondary/80">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-muted-foreground font-medium">Citable Editor</span>
        </div>
        <div className="w-12" />
      </div>

      {/* App layout */}
      <div className="flex h-[320px] sm:h-[400px]">
        {/* Activity Bar - 56px */}
        <div className="w-14 bg-secondary border-r border-border/30 flex flex-col items-center py-3">
          {/* Logo */}
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary cursor-pointer hover:bg-primary/10 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>

          {/* Activity icons */}
          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary bg-primary/10" title="Files">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary/80 transition-colors" title="Search">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary/80 transition-colors" title="References">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>

          {/* Bottom icons */}
          <div className="mt-auto flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary/80 transition-colors" title="Settings">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Sidebar - File Browser */}
        <div className="w-48 sm:w-56 bg-card border-r border-border/30 flex flex-col">
          {/* Sidebar header */}
          <div className="h-10 flex items-center justify-between px-4 border-b border-border/20">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">File Browser</span>
            <div className="flex gap-1">
              <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* File tree */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {/* Active file */}
            <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-primary/10 text-primary text-sm">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="truncate">Main.tex</span>
            </div>
            {/* Other files */}
            <div className="flex items-center gap-2 px-2 py-1.5 rounded text-muted-foreground hover:bg-secondary/50 text-sm transition-colors">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="truncate">chapter1.tex</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded text-muted-foreground hover:bg-secondary/50 text-sm transition-colors">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="truncate">references.bib</span>
            </div>
            {/* Folder */}
            <div className="flex items-center gap-2 px-2 py-1.5 rounded text-muted-foreground hover:bg-secondary/50 text-sm transition-colors">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span className="truncate">figures/</span>
            </div>

            {/* Outline section */}
            <div className="mt-4 pt-4 border-t border-border/20">
              <div className="flex items-center gap-2 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
                <span>Outline</span>
              </div>
              <div className="space-y-0.5 mt-1">
                <div className="flex items-center gap-2 px-4 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <span className="text-muted-foreground/50">§</span> Introduction
                </div>
                <div className="flex items-center gap-2 px-4 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <span className="text-muted-foreground/50">§</span> Methods
                </div>
                <div className="flex items-center gap-2 px-4 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <span className="text-muted-foreground/50">§</span> Results
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0 bg-background">
          {/* Tab bar */}
          <div className="h-10 flex items-center gap-1 px-2 bg-secondary/50 border-b border-border/20">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded text-foreground text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Main.tex</span>
              <button className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground rounded">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Editor + PDF split */}
          <div className="flex-1 flex min-h-0">
            {/* Editor pane */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Toolbar */}
              <div className="h-10 flex items-center gap-1 px-3 border-b border-border/10">
                <button className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:bg-secondary/50 rounded transition-colors" title="Bold">
                  <span className="text-sm font-bold">B</span>
                </button>
                <button className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:bg-secondary/50 rounded transition-colors" title="Italic">
                  <span className="text-sm italic">I</span>
                </button>
                <div className="w-px h-5 bg-border/30 mx-1" />
                <button className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:bg-secondary/50 rounded transition-colors" title="Insert Citation">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </button>
              </div>

              {/* Code content */}
              <div className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-auto">
                <div className="space-y-1">
                  <div className="flex gap-4">
                    <span className="w-6 text-right text-muted-foreground/50 select-none">1</span>
                    <span><span className="text-primary">\documentclass</span><span className="text-amber-500">{`{`}</span>article<span className="text-amber-500">{`}`}</span></span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-6 text-right text-muted-foreground/50 select-none">2</span>
                    <span></span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-6 text-right text-muted-foreground/50 select-none">3</span>
                    <span><span className="text-primary">\usepackage</span><span className="text-amber-500">{`{`}</span>graphicx<span className="text-amber-500">{`}`}</span></span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-6 text-right text-muted-foreground/50 select-none">4</span>
                    <span><span className="text-primary">\usepackage</span><span className="text-amber-500">{`{`}</span>biblatex<span className="text-amber-500">{`}`}</span></span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-6 text-right text-muted-foreground/50 select-none">5</span>
                    <span></span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-6 text-right text-muted-foreground/50 select-none">6</span>
                    <span><span className="text-primary">\begin</span><span className="text-amber-500">{`{`}</span>document<span className="text-amber-500">{`}`}</span></span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-6 text-right text-muted-foreground/50 select-none">7</span>
                    <span></span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-6 text-right text-muted-foreground/50 select-none">8</span>
                    <span><span className="text-primary">\section</span><span className="text-amber-500">{`{`}</span>Introduction<span className="text-amber-500">{`}`}</span></span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-6 text-right text-muted-foreground/50 select-none">9</span>
                    <span className="text-foreground">Recent studies have shown that climate</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="w-6 text-right text-muted-foreground/50 select-none">10</span>
                    <span className="text-foreground">change impacts biodiversity <span className="text-violet bg-violet/10 px-1 rounded">\cite{`{`}smith2024{`}`}</span>.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Resize handle */}
            <div className="w-1 bg-secondary hover:bg-primary/50 cursor-col-resize transition-colors hidden sm:block" />

            {/* PDF pane */}
            <div className="hidden sm:flex w-[45%] flex-col bg-card border-l border-border/20">
              {/* PDF toolbar */}
              <div className="h-10 flex items-center justify-between px-3 border-b border-border/10">
                <button className="flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-4 h-4 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Recompile</span>
                </button>
                <div className="flex items-center gap-1">
                  <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground rounded text-xs">−</button>
                  <span className="text-xs text-muted-foreground px-1">100%</span>
                  <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground rounded text-xs">+</button>
                </div>
              </div>

              {/* PDF content placeholder */}
              <div className="flex-1 p-4 flex items-center justify-center">
                <div className="w-full max-w-[200px] aspect-[1/1.4] bg-background rounded shadow-lg border border-border/30 p-4 flex flex-col">
                  {/* Title area */}
                  <div className="mb-4">
                    <div className="h-2 w-24 bg-foreground/20 rounded mb-2" />
                    <div className="h-1.5 w-16 bg-muted-foreground/20 rounded" />
                  </div>
                  {/* Content lines */}
                  <div className="space-y-2 flex-1">
                    <div className="h-1.5 w-full bg-muted-foreground/10 rounded" />
                    <div className="h-1.5 w-[90%] bg-muted-foreground/10 rounded" />
                    <div className="h-1.5 w-[95%] bg-muted-foreground/10 rounded" />
                    <div className="h-1.5 w-[85%] bg-muted-foreground/10 rounded" />
                    <div className="h-1.5 w-full bg-muted-foreground/10 rounded" />
                    {/* Highlighted citation */}
                    <div className="h-1.5 w-[70%] bg-primary/30 rounded animate-highlight-pulse" />
                    <div className="h-1.5 w-[92%] bg-muted-foreground/10 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
