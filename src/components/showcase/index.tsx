/**
 * TabbedProductShowcase - Main orchestrator for product demo
 *
 * Auto-rotating tabbed interface showing:
 * - Organize: Bibliography management with PDF import/annotation
 * - Write: LaTeX editor with live preview
 * - Cite: Citation insertion workflow
 *
 * Features:
 * - Dynamic duration per tab based on animation length
 * - Pauses on user interaction
 * - Smooth transitions between views
 */

import { useState, useEffect, useCallback } from "react";
import { OrganizeView, ORGANIZE_DURATION } from "./OrganizeView";
import { WriteView, WRITE_DURATION } from "./WriteView";
import { LibraryIcon, EditIcon, LinkIcon } from "./shared/Icons";
import type { TabId, Tab } from "./types";

const tabs: Tab[] = [
  {
    id: "organize",
    label: "Organize",
    description: "Your library, your way",
    duration: ORGANIZE_DURATION,
    icon: <LibraryIcon className="w-5 h-5" strokeWidth={1.5} />,
  },
  {
    id: "write",
    label: "Write",
    description: "LaTeX editor built-in",
    duration: WRITE_DURATION,
    icon: <EditIcon />,
  },
  {
    id: "cite",
    label: "Cite",
    description: "Cite as you write",
    duration: WRITE_DURATION, // Same as write for now
    icon: <LinkIcon className="w-5 h-5" strokeWidth={1.5} />,
  },
];

export function TabbedProductShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>("organize");
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  // Get current tab config
  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  // Get next tab in rotation
  const getNextTab = useCallback((current: TabId): TabId => {
    const currentIndex = tabs.findIndex((t) => t.id === current);
    const nextIndex = (currentIndex + 1) % tabs.length;
    return tabs[nextIndex].id;
  }, []);

  // Handle animation complete - move to next tab
  const handleAnimationComplete = useCallback(() => {
    if (!isPaused) {
      setActiveTab((prev) => getNextTab(prev));
      setProgressKey((k) => k + 1);
    }
  }, [isPaused, getNextTab]);

  // Auto-rotation fallback (in case animation doesn't call onComplete)
  useEffect(() => {
    if (isPaused) return;

    const timeout = setTimeout(() => {
      setActiveTab((prev) => getNextTab(prev));
      setProgressKey((k) => k + 1);
    }, currentTab.duration + 500); // Add buffer

    return () => clearTimeout(timeout);
  }, [isPaused, activeTab, currentTab.duration, getNextTab]);

  // Handle user click - switch immediately and pause
  const handleTabClick = (tabId: TabId) => {
    if (tabId === activeTab) return;

    setActiveTab(tabId);
    setProgressKey((k) => k + 1);
    setIsPaused(true);

    // Resume auto-rotation after 15 seconds of inactivity
    setTimeout(() => setIsPaused(false), 15000);
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
                    style={{ animationDuration: `${tab.duration}ms` }}
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mockup container */}
      <div className="relative rounded-xl overflow-hidden border border-border/20 bg-card shadow-xl">
        {activeTab === "organize" && (
          <OrganizeView
            isActive={activeTab === "organize"}
            onComplete={handleAnimationComplete}
          />
        )}
        {activeTab === "write" && (
          <WriteView isActive={activeTab === "write"} />
        )}
        {activeTab === "cite" && (
          <WriteView showCitation isActive={activeTab === "cite"} />
        )}
      </div>

      {/* Tab descriptions */}
      <div className="text-center">
        <p className="text-muted-foreground">{currentTab.description}</p>
      </div>
    </div>
  );
}

// Re-export for backwards compatibility
export default TabbedProductShowcase;
