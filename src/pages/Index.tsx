import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CitableDifferenceSection from "@/components/CitableDifferenceSection";
import FeatureShowcase from "@/components/FeatureShowcase";
import GettingStartedSection from "@/components/GettingStartedSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: The Citable Difference - Unified Workflow */}
        <CitableDifferenceSection />

        {/* Section 3: Feature Showcase */}
        <FeatureShowcase />

        {/* Section 4: Getting Started */}
        <GettingStartedSection />

        {/* Section 5: Final CTA */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
