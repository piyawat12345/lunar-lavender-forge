import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProductsSection from "@/components/ProductsSection";
import FooterSection from "@/components/FooterSection";
import MobileBottomNav from "@/components/MobileBottomNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <FooterSection />
      <MobileBottomNav />
    </div>
  );
};

export default Index;
