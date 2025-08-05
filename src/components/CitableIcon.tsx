import { useEffect, useState } from "react";

const CitableIcon = ({ className = "w-20 h-20" }: { className?: string }) => {
  const [isDark, setIsDark] = useState(true);
  
  useEffect(() => {
    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const darkMode = htmlElement.classList.contains('dark');
      setIsDark(darkMode);
    };
    
    // Check immediately
    checkTheme();
    
    // Set up observer to watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);
  
  const logoSrc = isDark ? "/assets/dark-mode-logo.png" : "/assets/light-mode-logo.png";
  
  return (
    <div className={`${className} relative`}>
      <img 
        src={logoSrc}
        alt="Citable Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default CitableIcon;