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
            <div className="flex items-center space-x-3">
              <CitableIcon className="w-10 h-10" />
              <span className="text-xl font-semibold text-foreground" style={{ fontFamily: 'Goodly, Playfair Display, serif' }}>
                Citable
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#hero" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-[#03624c]/5 dark:hover:bg-[#00DF82]/5 hover:backdrop-blur-sm px-3 py-2 rounded-lg">
              Home
            </a>
            
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-[#03624c]/5 dark:hover:bg-[#00DF82]/5 hover:backdrop-blur-sm px-3 py-2 rounded-lg">
              Features
            </a>

            <a href="#workflow" className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-[#03624c]/5 dark:hover:bg-[#00DF82]/5 hover:backdrop-blur-sm px-3 py-2 rounded-lg">
              Workflow
            </a>
          </nav>

          {/* Theme Toggle and Join Waiting List Button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <WaitingListForm
              trigger={
                <Button variant="outline" size="sm" className="font-normal">
                  Join the waiting list
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