import { Button } from "@/components/ui/button";
import CitableIcon from "@/components/CitableIcon";
import WaitingListForm from "@/components/WaitingListForm";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  return (
    <header className="w-full border-b border-border/30 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center">
              <CitableIcon className="w-16 h-16" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>

            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>

          {/* Theme Toggle and Join Waiting List Button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <WaitingListForm
              trigger={
                <Button variant="outline" size="sm" className="font-normal">
                  Join waiting list
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;