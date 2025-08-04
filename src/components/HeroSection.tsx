import { Button } from "@/components/ui/button";
import WaitingListForm from "@/components/WaitingListForm";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-[600px] h-[600px] bg-primary/30 rounded-full blur-[120px] animate-pulse"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Heading with staggered animation */}
          <div className="space-y-4 mb-8">
            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-light leading-tight">
              <span className="text-primary font-normal animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Write.
              </span>
              <br />
              <span className="text-foreground font-light animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Collaborate.
              </span>
              <br />
              <span className="text-primary font-normal animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                Discover.
              </span>
            </h1>
          </div>
          
          {/* Subtitle with animation */}
          <p className="text-xl text-muted-foreground mb-16 font-light animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            The AI-powered collaborative LaTeX editor for researchers and academics
          </p>
          
          {/* CTA Button with animation */}
          <div className="animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <WaitingListForm
              trigger={
                <Button variant="hero" size="lg" className="rounded-full px-8 py-3 text-base font-normal hover:scale-105 transition-transform duration-300">
                  Join the waiting list
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;