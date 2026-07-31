import { Button } from "@/components/ui/button";
import WaitingListForm from "@/components/WaitingListForm";
import { Shield, Clock, Lock, ArrowRight } from "lucide-react";

const FinalCTA = () => {
  const trustBadges = [
    { icon: Clock, text: "No credit card required" },
    { icon: Shield, text: "Cancel anytime" },
    { icon: Lock, text: "GDPR compliant" },
  ];

  return (
    <section id="cta" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-secondary/50 to-bg-primary" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Start Writing Better Research Papers
          </h2>

          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
            Join thousands of researchers transforming their workflow. Be among the first to experience the future of academic writing.
          </p>

          {/* CTA Form */}
          <div className="max-w-md mx-auto mb-8">
            <WaitingListForm
              trigger={
                <Button
                  size="lg"
                  className="w-full rounded-full px-8 py-6 text-base font-medium animate-glow-pulse hover:scale-105 transition-transform duration-300"
                >
                  Get Early Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              }
            />
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-text-muted">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <badge.icon className="w-4 h-4" />
                <span className="text-sm">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
