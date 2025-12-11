import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarketplaceSection from "@/components/MarketplaceSection";
import CreatorsSection from "@/components/CreatorsSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <MarketplaceSection />
        <CreatorsSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
