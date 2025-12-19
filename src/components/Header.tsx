/**
 * Header Component
 *
 * Minimal header with logo and theme toggle.
 * Fixed position, transparent background.
 */

import CitableIcon from "@/components/CitableIcon";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <CitableIcon className="w-24 sm:w-28" />
          </a>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
