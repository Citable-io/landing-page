import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustedBySection from "@/components/TrustedBySection";
import DetailedFeaturesSection from "@/components/DetailedFeaturesSection";
import Workflow from "@/components/Workflow";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      {/* <TrustedBySection /> */}
      <div className="max-h-[3000px]">
        <DetailedFeaturesSection />
      </div>
      <Workflow />
      <Footer />
    </div>
  );
};

export default Index;
