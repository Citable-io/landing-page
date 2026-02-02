/**
 * TabbedProductShowcase - Main orchestrator for product demo
 *
 * Vibrant tabbed interface with module-specific colors,
 * smooth transitions, and playful interactions.
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OrganizeView, ORGANIZE_DURATION } from "./OrganizeView";
import { WriteView, WRITE_DURATION } from "./WriteView";
import { LibraryIcon, EditIcon, LinkIcon } from "./shared/Icons";
import type { TabId, Tab } from "./types";

interface TabConfig extends Tab {
  module: "bibliography" | "manuscripts" | "discover";
  gradient: string;
}

const tabs: TabConfig[] = [
  {
    id: "organize",
    label: "Organize",
    description: "Import PDFs, extract metadata, and organize your library",
    duration: ORGANIZE_DURATION,
    icon: <LibraryIcon className="w-5 h-5" strokeWidth={1.5} />,
    module: "bibliography",
    gradient: "linear-gradient(135deg, #C3E9D7 0%, #1B3A32 100%)",
  },
  {
    id: "write",
    label: "Write",
    description: "LaTeX editor with live preview and real-time collaboration",
    duration: WRITE_DURATION,
    icon: <EditIcon />,
    module: "manuscripts",
    gradient: "linear-gradient(135deg, #C2E5FF 0%, #0E3264 100%)",
  },
  {
    id: "cite",
    label: "Cite",
    description: "Insert citations seamlessly while you write",
    duration: WRITE_DURATION,
    icon: <LinkIcon className="w-5 h-5" strokeWidth={1.5} />,
    module: "discover",
    gradient: "linear-gradient(135deg, #DADcff 0%, #2A2E66 100%)",
  },
];

const moduleStyles = {
  bibliography: {
    accent: "#C3E9D7",
    accentDark: "#1B3A32",
    accentHover: "#A8DCC0",
    tint: "#E8F7F2",
    light: "#D8F0EB",
    text: "#1B3A32",
    border: "#C3E9D7",
    glow: "rgba(195, 233, 215, 0.3)",
  },
  manuscripts: {
    accent: "#C2E5FF",
    accentDark: "#0E3264",
    accentHover: "#8FD3FF",
    tint: "#E8F5FF",
    light: "#D5EBFF",
    text: "#0E3264",
    border: "#C2E5FF",
    glow: "rgba(194, 229, 255, 0.3)",
  },
  discover: {
    accent: "#DADcff",
    accentDark: "#2A2E66",
    accentHover: "#BFBEF0",
    tint: "#F0F0FF",
    light: "#E5E5FF",
    text: "#2A2E66",
    border: "#DADcff",
    glow: "rgba(218, 220, 255, 0.3)",
  },
};

export function TabbedProductShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>("organize");
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];
  const currentStyles = moduleStyles[currentTab.module];

  const getNextTab = useCallback((current: TabId): TabId => {
    const currentIndex = tabs.findIndex((t) => t.id === current);
    const nextIndex = (currentIndex + 1) % tabs.length;
    return tabs[nextIndex].id;
  }, []);

  const handleAnimationComplete = useCallback(() => {
    if (!isPaused) {
      setActiveTab((prev) => getNextTab(prev));
      setProgressKey((k) => k + 1);
    }
  }, [isPaused, getNextTab]);

  useEffect(() => {
    if (isPaused) return;

    const timeout = setTimeout(() => {
      setActiveTab((prev) => getNextTab(prev));
      setProgressKey((k) => k + 1);
    }, currentTab.duration + 500);

    return () => clearTimeout(timeout);
  }, [isPaused, activeTab, currentTab.duration, getNextTab]);

  const handleTabClick = (tabId: TabId) => {
    if (tabId === activeTab) return;

    setActiveTab(tabId);
    setProgressKey((k) => k + 1);
    setIsPaused(true);

    setTimeout(() => setIsPaused(false), 15000);
  };

  return (
    <div className="space-y-8">
      {/* Tab buttons */}
      <div className="flex justify-center">
        <div
          className="inline-flex gap-2 p-2 rounded-2xl"
          style={{
            background: "color-mix(in srgb, var(--bg-tertiary) 80%, transparent)",
            backdropFilter: "blur(8px)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const styles = moduleStyles[tab.module];

            return (
              <motion.button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="relative flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-colors"
                style={{
                  background: isActive ? tab.gradient : "transparent",
                  color: isActive ? "white" : "var(--text-secondary)",
                  boxShadow: isActive ? `0 4px 15px ${styles.glow}` : "none",
                }}
                whileHover={!isActive ? { background: "var(--bg-hover)" } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <span className="transition-transform duration-300">
                  {tab.icon}
                </span>
                <span className="hidden sm:inline">{tab.label}</span>

                {/* Progress indicator */}
                {isActive && !isPaused && (
                  <motion.div
                    className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.3)" }}
                  >
                    <motion.div
                      key={progressKey}
                      className="h-full rounded-full bg-white"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: tab.duration / 1000,
                        ease: "linear",
                      }}
                    />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Mockup container */}
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "var(--card-bg)",
          border: `1px solid ${currentStyles.border}`,
          boxShadow: `0 25px 50px -12px ${currentStyles.glow}, 0 0 0 1px ${currentStyles.border}`,
        }}
        layout
      >
        {/* Top gradient accent with section color */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: currentTab.gradient }}
          layoutId="tab-accent"
        />

        <AnimatePresence mode="wait">
          {activeTab === "organize" && (
            <motion.div
              key="organize"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <OrganizeView
                isActive={activeTab === "organize"}
                onComplete={handleAnimationComplete}
                color="#C3E9D7"
              />
            </motion.div>
          )}
          {activeTab === "write" && (
            <motion.div
              key="write"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <WriteView isActive={activeTab === "write"} onComplete={handleAnimationComplete} color="#C2E5FF" />
            </motion.div>
          )}
          {activeTab === "cite" && (
            <motion.div
              key="cite"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <WriteView showCitation isActive={activeTab === "cite"} onComplete={handleAnimationComplete} color="#DADcff" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tab description */}
      <motion.div className="text-center" key={activeTab} layout>
        <motion.p
          className="text-lg"
          style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentTab.description}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default TabbedProductShowcase;
