/**
 * Landing Page
 *
 * Vercel-style structure:
 * - Hero (bold headline + dual CTAs)
 * - Logo bar (trust strip)
 * - Feature sections (alternating left/right)
 * - Social proof (stats + testimonials)
 * - CTA (waitlist form)
 * - Footer
 */

import Header from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LogoBar } from "@/components/LogoBar";
import { FeatureShowcase } from "@/components/FeatureShowcase";
import { SocialProof } from "@/components/SocialProof";
import { CTASection } from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      <Header />
      <HeroSection />
      <LogoBar />
      <FeatureShowcase />
      <SocialProof />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
