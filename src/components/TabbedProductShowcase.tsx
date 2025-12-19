/**
 * TabbedProductShowcase Component
 *
 * Auto-rotating tabbed product mockup showcasing:
 * - Organize: Library/bibliography view
 * - Write: LaTeX editor view
 * - Cite: Citation integration view (editor placeholder for now)
 *
 * Features:
 * - Auto-rotates every 5 seconds
 * - Pauses on user interaction
 * - Smooth fade transitions between views
 * - No window chrome (macOS dots removed)
 */

import { useState, useEffect, useCallback } from "react";

type TabId = "organize" | "write" | "cite";

interface Tab {
  id: TabId;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  {
    id: "organize",
    label: "Organize",
    description: "Your library, your way",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    id: "write",
    label: "Write",
    description: "LaTeX editor built-in",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    id: "cite",
    label: "Cite",
    description: "Cite as you write",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    ),
  },
];

const AUTO_ROTATE_INTERVAL = 5000; // 5 seconds

export function TabbedProductShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>("organize");
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  // Get next tab in rotation
  const getNextTab = useCallback((current: TabId): TabId => {
    const currentIndex = tabs.findIndex((t) => t.id === current);
    const nextIndex = (currentIndex + 1) % tabs.length;
    return tabs[nextIndex].id;
  }, []);

  // Auto-rotation
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveTab(prev => getNextTab(prev));
      setProgressKey(k => k + 1);
    }, AUTO_ROTATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, getNextTab]);

  // Handle user click - switch immediately
  const handleTabClick = (tabId: TabId) => {
    if (tabId === activeTab) return;

    setActiveTab(tabId);
    setProgressKey(k => k + 1);
    setIsPaused(true);

    // Resume auto-rotation after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  return (
    <div className="space-y-6">
      {/* Tab buttons */}
      <div className="flex justify-center">
        <div className="inline-flex gap-2 p-1.5 rounded-xl bg-secondary/50 border border-border/30">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
                ${
                  activeTab === tab.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }
              `}
            >
              <span
                className={`transition-colors duration-300 ${
                  activeTab === tab.id ? "text-primary" : ""
                }`}
              >
                {tab.icon}
              </span>
              <span className="hidden sm:inline">{tab.label}</span>

              {/* Progress indicator for active tab */}
              {activeTab === tab.id && !isPaused && (
                <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary/20 rounded-full overflow-hidden">
                  <div
                    key={progressKey}
                    className="h-full bg-primary rounded-full animate-progress"
                    style={{ animationDuration: `${AUTO_ROTATE_INTERVAL}ms` }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mockup container */}
      <div className="relative rounded-xl overflow-hidden border border-border/20 bg-card shadow-xl">
        {activeTab === "organize" && <LibraryView />}
        {activeTab === "write" && <EditorView />}
        {activeTab === "cite" && <EditorView showCitation />}
      </div>

      {/* Tab descriptions */}
      <div className="text-center">
        <p className="text-muted-foreground">
          {tabs.find((t) => t.id === activeTab)?.description}
        </p>
      </div>
    </div>
  );
}

/**
 * LibraryView - Bibliography management interface
 * Based on bibliography-layouts-corrected.html
 */
function LibraryView() {
  return (
    <div className="flex h-[420px]">
      {/* Activity Bar */}
      <div className="w-14 bg-secondary/80 flex flex-col items-center py-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary cursor-pointer hover:bg-primary/10 transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary bg-primary/10">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary/80 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary/80 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
        </div>
        <div className="mt-auto">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary/80 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Sidebar - Collections */}
      <div className="w-64 bg-card flex flex-col ">
        <div className="h-11 flex items-center justify-between px-4 border-b border-border/20">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Library</span>
          <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-muted-foreground">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
            <span>My Library</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded bg-primary/10 text-primary text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="truncate">Offline RL</span>
          </div>
          <div className="flex items-center gap-2 px-6 py-1.5 rounded text-muted-foreground hover:bg-secondary/50 text-sm transition-colors">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="truncate">Methods</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded text-muted-foreground hover:bg-secondary/50 text-sm transition-colors">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="truncate">Exploration</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded text-muted-foreground hover:bg-secondary/50 text-sm transition-colors">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="truncate">To Read</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 text-primary text-sm cursor-pointer hover:underline">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Collection</span>
          </div>
        </div>
      </div>

      {/* Main Content - Reference Table */}
      <div className="flex-1 flex flex-col min-w-0 bg-background">
        {/* Tab Bar - Underlined style */}
        <div className="h-11 flex items-center gap-4 px-4 bg-card border-b border-border/20">
          <div className="flex items-center gap-2 h-full border-b-2 border-primary text-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs font-medium">Offline RL</span>
          </div>
          <div className="flex items-center gap-2 h-full border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-xs font-medium">references.bib</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="h-11 flex items-center justify-between px-4 border-b border-border/20">
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 text-xs font-medium bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add
            </button>
            <button className="h-8 px-3 text-xs font-medium text-muted-foreground border border-border/50 rounded-md hover:bg-secondary/50 transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="hidden sm:inline">Import</span>
            </button>
          </div>
          <div className="relative">
            <svg className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="h-8 w-32 sm:w-40 pl-8 pr-3 text-xs bg-secondary/50 border-0 rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/30 sticky top-0">
              <tr className="h-11 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 font-medium">Title</th>
                <th className="px-4 font-medium hidden sm:table-cell">Authors</th>
                <th className="px-4 font-medium">Year</th>
                <th className="px-4 font-medium hidden md:table-cell">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              <tr className="h-11 hover:bg-secondary/30 transition-colors">
                <td className="px-4 text-foreground">A Study of Plasticity Loss in Deep RL</td>
                <td className="px-4 text-muted-foreground hidden sm:table-cell">Julian, A., Ash, J.</td>
                <td className="px-4 text-muted-foreground">2024</td>
                <td className="px-4 hidden md:table-cell">
                  <span className="px-2 py-0.5 text-xs rounded bg-primary/10 text-primary">plasticity</span>
                </td>
              </tr>
              <tr className="h-11 bg-primary/[0.22] hover:bg-primary/[0.28] transition-colors">
                <td className="px-4 text-foreground">Robust On-Policy Sampling for Evaluation</td>
                <td className="px-4 text-muted-foreground hidden sm:table-cell">Zhang, H., et al.</td>
                <td className="px-4 text-muted-foreground">2022</td>
                <td className="px-4 hidden md:table-cell">
                  <span className="px-2 py-0.5 text-xs rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">policy-eval</span>
                </td>
              </tr>
              <tr className="h-11 hover:bg-secondary/30 transition-colors">
                <td className="px-4 text-foreground">On-Policy Deep RL for Average-Reward</td>
                <td className="px-4 text-muted-foreground hidden sm:table-cell">Zhang, S., Ross, K.</td>
                <td className="px-4 text-muted-foreground">2021</td>
                <td className="px-4 hidden md:table-cell">
                  <span className="px-2 py-0.5 text-xs rounded bg-violet-500/10 text-violet-600 dark:text-violet-400">deep-rl</span>
                </td>
              </tr>
              <tr className="h-11 hover:bg-secondary/30 transition-colors">
                <td className="px-4 text-foreground">Decision Transformer: RL via Sequences</td>
                <td className="px-4 text-muted-foreground hidden sm:table-cell">Chen, L., et al.</td>
                <td className="px-4 text-muted-foreground">2021</td>
                <td className="px-4 hidden md:table-cell">
                  <span className="px-2 py-0.5 text-xs rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">transformer</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/**
 * EditorView - LaTeX editor interface
 * Based on editor-layouts-corrected.html
 */
function EditorView({ showCitation = false }: { showCitation?: boolean }) {
  return (
    <div className="flex h-[420px]">
      {/* Activity Bar */}
      <div className="w-14 bg-secondary/80 flex flex-col items-center py-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary cursor-pointer hover:bg-primary/10 transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary bg-primary/10">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary/80 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary/80 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
        <div className="mt-auto">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-secondary/80 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Sidebar - File Browser */}
      <div className="w-64 bg-card flex flex-col ">
        <div className="h-11 flex items-center justify-between px-4 border-b border-border/20">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">File Browser</span>
          <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-primary/10 text-primary text-sm">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="truncate">Main.tex</span>
          </div>
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
          <div className="flex items-center gap-2 px-2 py-1.5 rounded text-muted-foreground hover:bg-secondary/50 text-sm transition-colors">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="truncate">figures/</span>
          </div>
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
        <div className="h-11 flex items-center gap-1 px-2 bg-secondary/50 border-b border-border/20">
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
            <div className="h-11 flex items-center gap-1 px-3 border-b border-border/10">
              {/* Undo/Redo */}
              <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary/50 rounded transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary/50 rounded transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                </svg>
              </button>
              <div className="w-px h-5 bg-border/30 mx-1" />
              {/* Bold/Italic */}
              <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary/50 rounded transition-colors">
                <span className="text-sm font-bold">B</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary/50 rounded transition-colors">
                <span className="text-sm italic">I</span>
              </button>
              <div className="w-px h-5 bg-border/30 mx-1" />
              {/* Link */}
              <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary/50 rounded transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>
              {/* Image */}
              <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary/50 rounded transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
              {/* Citation */}
              <button className={`w-8 h-8 flex items-center justify-center rounded transition-colors ${showCitation ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:bg-secondary/50'}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </button>
              {/* Table */}
              <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary/50 rounded transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <div className="flex-1" />
              {/* Search */}
              <button className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary/50 rounded transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
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
                  <span className="text-foreground">
                    change impacts biodiversity{" "}
                    <span className={`px-1 rounded ${showCitation ? 'text-violet bg-violet/20 animate-pulse' : 'text-violet bg-violet/10'}`}>
                      \cite{`{`}smith2024{`}`}
                    </span>
                    .
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PDF pane */}
          <div className="hidden sm:flex flex-1 flex-col bg-secondary/10 min-w-0">
            <div className="h-11 flex items-center justify-between px-3 border-b border-border/10">
              {/* Left: Recompile dropdown */}
              <button className="flex items-center gap-1.5 px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded transition-colors">
                <svg className="w-4 h-4 text-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Recompile</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {/* Right: Log indicator, Download, Zoom */}
              <div className="flex items-center gap-2">
                {/* Log indicator */}
                <div className="flex items-center gap-1 px-2 py-1 text-xs text-emerald">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>0</span>
                </div>
                {/* Download */}
                <button className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
                <div className="w-px h-5 bg-border/30" />
                {/* Zoom controls */}
                <div className="flex items-center gap-0.5">
                  <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground rounded text-xs">−</button>
                  <span className="text-xs text-muted-foreground px-1 min-w-[32px] text-center">100%</span>
                  <button className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground rounded text-xs">+</button>
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-hidden p-2">
              {/* PDF paper */}
              <div className="h-full w-full max-w-[280px] bg-white rounded-sm shadow-md overflow-hidden">
                {/* Paper content */}
                <div className="h-full p-4 text-gray-800 font-serif overflow-auto">
                  {/* Title */}
                  <h1 className="text-[9px] font-bold text-center mb-0.5 text-gray-900">
                    Climate Change Impacts on Global Biodiversity
                  </h1>
                  {/* Authors */}
                  <p className="text-[6px] text-center text-gray-600 mb-2">
                    J. Smith, A. Johnson, M. Williams
                  </p>
                  {/* Abstract */}
                  <div className="mb-2">
                    <p className="font-bold text-[7px] mb-0.5">Abstract</p>
                    <p className="text-gray-600 text-[6px] leading-relaxed">
                      This study examines the relationship between climate patterns and species distribution across multiple ecosystems.
                    </p>
                  </div>
                  {/* Section 1 */}
                  <p className="font-bold text-[8px] mb-1">1. Introduction</p>
                  <p className="text-[6px] leading-relaxed mb-1.5">
                    Recent studies have shown that climate change impacts biodiversity in significant ways. The relationship between temperature changes and species migration has been documented{" "}
                    <span className={`${showCitation ? 'bg-sky-200 text-sky-700' : 'bg-sky-100 text-sky-600'} px-0.5 rounded transition-colors`}>
                      [1]
                    </span>
                    . Furthermore, habitat loss combined with shifting climate zones creates compounding effects.
                  </p>
                  <p className="text-[6px] leading-relaxed mb-2 text-gray-700">
                    Our research builds upon previous work by analyzing long-term datasets from multiple continents.
                  </p>
                  {/* Section 2 */}
                  <p className="font-bold text-[8px] mb-1">2. Methods</p>
                  <p className="text-[6px] leading-relaxed text-gray-700 mb-1.5">
                    We analyzed data from 150 monitoring stations across three continents over a 20-year period.
                  </p>
                  {/* Section 3 */}
                  <p className="font-bold text-[8px] mb-1">3. Results</p>
                  <p className="text-[6px] leading-relaxed text-gray-700">
                    Our findings indicate a strong correlation (r = 0.87) between temperature anomalies and species migration patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
