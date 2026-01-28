import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 p-0 relative"
    >
      <Sun
        className="h-4 w-4 transition-all"
        style={{
          transform: isDark ? "rotate(-90deg) scale(0)" : "rotate(0) scale(1)",
          opacity: isDark ? 0 : 1,
          position: isDark ? "absolute" : "relative",
        }}
      />
      <Moon
        className="h-4 w-4 transition-all"
        style={{
          transform: isDark ? "rotate(0) scale(1)" : "rotate(90deg) scale(0)",
          opacity: isDark ? 1 : 0,
          position: isDark ? "relative" : "absolute",
        }}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggle;
