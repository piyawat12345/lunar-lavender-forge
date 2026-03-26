import Navbar from "@/components/Navbar";
import SalesMarquee from "@/components/SalesMarquee";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductsSection from "@/components/ProductsSection";
import FooterSection from "@/components/FooterSection";
import MobileBottomNav from "@/components/MobileBottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-[68px]">
        <SalesMarquee />
      </div>
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <FooterSection />
      <MobileBottomNav />
    </div>
  );
};

export default Index;
