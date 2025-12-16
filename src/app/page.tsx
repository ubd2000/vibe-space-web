'use client';

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarketplaceSection from "@/components/MarketplaceSection";
import CreatorsSection from "@/components/CreatorsSection";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main>
                <HeroSection />
                <MarketplaceSection />
                <CreatorsSection />
            </main>
            <Footer />
        </div>
    );
}
