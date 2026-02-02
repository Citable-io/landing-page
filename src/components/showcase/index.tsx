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
    gradient: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
  },
  {
    id: "write",
    label: "Write",
    description: "LaTeX editor with live preview and real-time collaboration",
    duration: WRITE_DURATION,
    icon: <EditIcon />,
    module: "manuscripts",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
  },
  {
    id: "cite",
    label: "Cite",
    description: "Insert citations seamlessly while you write",
    duration: WRITE_DURATION,
    icon: <LinkIcon className="w-5 h-5" strokeWidth={1.5} />,
    module: "discover",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
  },
];

const moduleStyles = {
  bibliography: {
    accent: "#3B82F6",
    accentDark: "#2563EB",
    accentHover: "#60A5FA",
    tint: "#EFF6FF",
    light: "#DBEAFE",
    text: "#111827",
    border: "#E5E7EB",
    glow: "rgba(194, 229, 255, 0.3)",
  },
  manuscripts: {
    accent: "#3B82F6",
    accentDark: "#2563EB",
    accentHover: "#60A5FA",
    tint: "#EFF6FF",
    light: "#DBEAFE",
    text: "#111827",
    border: "#E5E7EB",
    glow: "rgba(194, 229, 255, 0.3)",
  },
  discover: {
    accent: "#3B82F6",
    accentDark: "#2563EB",
    accentHover: "#60A5FA",
    tint: "#EFF6FF",
    light: "#DBEAFE",
    text: "#111827",
    border: "#E5E7EB",
    glow: "rgba(194, 229, 255, 0.3)",
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
    <div
      className="space-y-8 p-8 rounded-3xl"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E5E7EB",
        boxShadow: "0 0 80px 0 rgba(194, 229, 255, 0.4), 0 0 80px 0 rgba(218, 220, 255, 0.25)",
      }}
    >
      {/* Tab buttons */}
      <div className="flex justify-center">
        <div
          className="inline-flex gap-2 p-2 rounded-2xl"
          style={{
            background: "#F5F6FA",
            border: "1px solid #E5E7EB",
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
                  color: isActive ? "white" : "#6B7280",
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
          background: "#FFFFFF",
          border: `1px solid #E5E7EB`,
          boxShadow: `0 10px 30px -10px rgba(194, 229, 255, 0.3)`,
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
                color="#3B82F6"
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
              <WriteView isActive={activeTab === "write"} onComplete={handleAnimationComplete} color="#3B82F6" />
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
              <WriteView showCitation isActive={activeTab === "cite"} onComplete={handleAnimationComplete} color="#3B82F6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tab description */}
      <motion.div className="text-center" key={activeTab} layout>
        <motion.p
          className="text-lg"
          style={{ color: "#6B7280" }}
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
