import CitableIcon from "@/components/CitableIcon";

const Footer = () => {
  return (
    <footer className="border-t border-border/20 py-16">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Links */}
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12 mb-8 md:mb-0">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <CitableIcon className="w-7 h-7" />
              <span className="text-xl font-semibold text-foreground tracking-tight">CITABLE</span>
            </div>
            
            {/* Links */}
            <nav className="flex space-x-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Lorem Ipsum
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Lorem Ipsum
              </a>
            </nav>
          </div>
          
          {/* Connect Section */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Connect with us</span>
            <div className="w-6 h-6 rounded flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-border/20 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>Copyright © 2025</p>
          <div className="flex space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">User agreement</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;