import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustedBySection from "@/components/TrustedBySection";
import DetailedFeaturesSection from "@/components/DetailedFeaturesSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import WaitingListForm from "@/components/WaitingListForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TrustedBySection />
      <DetailedFeaturesSection />

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/20">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-light text-foreground leading-tight mb-6">
              Get in
              <br />
              <span className="text-primary font-light">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              Ready to transform your research writing experience? Join our waiting list to be among the first to experience CITABLE.
            </p>
            <WaitingListForm
              trigger={
                <Button variant="cta" size="lg" className="rounded-full px-8 py-3">
                  Join the waiting list
                </Button>
              }
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
