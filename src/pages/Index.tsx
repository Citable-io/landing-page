/**
 * Landing Page
 *
 * Minimal, calm, premium landing page with:
 * - Aurora background
 * - Hero with headline and waitlist signup
 * - Product preview with animated mockup
 * - Feature pills
 * - Minimal footer
 */

import Header from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductPreview } from "@/components/ProductPreview";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProductPreview />
      <Footer />
    </div>
  );
};

export default Index;
