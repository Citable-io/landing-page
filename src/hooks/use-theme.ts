import { useState, useEffect } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme") as Theme;
      return saved || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove old classes
    root.classList.remove("light", "dark", "dark-theme");
    // Add new class - use dark-theme for Radix compatibility
    if (theme === "dark") {
      root.classList.add("dark-theme");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return { theme, setTheme };
};
