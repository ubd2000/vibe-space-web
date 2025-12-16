'use client';

import { useState, use } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Heart, Eye, Calendar, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import avatar1 from "@/assets/avatar-1.png";
import portfolioImage1 from "@/assets/avatar-detail-1.png";
import portfolioImage2 from "@/assets/avatar-detail-2.png";
import portfolioImage3 from "@/assets/avatar-detail-3.png";

export default function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Mock Data (In a real app, you'd fetch this based on the ID)
    const portfolioItem = {
        id: id,
        title: "Cyberpunk City Concept",
        images: [portfolioImage1, portfolioImage2, portfolioImage3],
        type: "Concept Art",
        description: "This is a concept art piece designed for a futuristic cyberpunk city environment. The focus was on neon lighting, wet textures, and a dense, vertical architectural style. This piece served as the main visual reference for the 3D modeling team.",
        tools: ["Photoshop", "Blender", "Midjourney"],
        date: "2024.02.15",
        views: 1250,
        likes: 342,
        creator: {
            name: "PixelMaster",
            avatar: avatar1,
            role: "Concept Artist"
        }
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % portfolioItem.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + portfolioItem.images.length) % portfolioItem.images.length);
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    {/* Back Button */}
                    <button onClick={() => router.back()} className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        돌아가기
                    </button>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: Image Area */}
                        <div className="lg:col-span-2 space-y-4">
                            {/* Main Image Slider */}
                            <div className="relative rounded-2xl overflow-hidden glass shadow-2xl group aspect-video">
                                <Image
                                    src={portfolioItem.images[currentImageIndex]}
                                    alt={`${portfolioItem.title} - ${currentImageIndex + 1}`}
                                    fill
                                    className="object-cover transition-opacity duration-300"
                                />

                                {/* Overlay Actions */}
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <Button variant="glass" size="icon" className="rounded-full">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                    <Button variant="glass" size="icon" className="rounded-full">
                                        <Heart className="w-4 h-4" />
                                    </Button>
                                </div>

                                {/* Navigation Buttons */}
                                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button
                                        variant="glass"
                                        size="icon"
                                        className="rounded-full h-10 w-10 bg-black/50 hover:bg-black/70 border-none text-white"
                                        onClick={prevImage}
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </Button>
                                    <Button
                                        variant="glass"
                                        size="icon"
                                        className="rounded-full h-10 w-10 bg-black/50 hover:bg-black/70 border-none text-white"
                                        onClick={nextImage}
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </Button>
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-4 overflow-x-auto p-2">
                                {portfolioItem.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 transition-all ${currentImageIndex === index
                                            ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                            : "opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>

                            {/* Mobile Info (visible only on small screens) */}
                            <div className="lg:hidden mt-4">
                                <h1 className="text-2xl font-bold font-display mb-2">{portfolioItem.title}</h1>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {portfolioItem.views}</span>
                                    <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {portfolioItem.likes}</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {portfolioItem.date}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Info & Details */}
                        <div className="space-y-8 animate-fade-in">
                            {/* Title & Stats */}
                            <div className="hidden lg:block">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                        {portfolioItem.type}
                                    </span>
                                </div>
                                <h1 className="text-3xl font-bold font-display mb-4 text-foreground">{portfolioItem.title}</h1>

                                <div className="flex items-center justify-between text-muted-foreground border-b border-border pb-6">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-help" title="조회수">
                                            <Eye className="w-4 h-4" /> {portfolioItem.views.toLocaleString()}
                                        </span>
                                        <span className="flex items-center gap-1.5 hover:text-pink-500 transition-colors cursor-pointer" title="좋아요">
                                            <Heart className="w-4 h-4" /> {portfolioItem.likes}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm">{portfolioItem.date}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Creator Profile */}
                            <div className="p-6 rounded-2xl glass flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20 relative">
                                    <Image src={portfolioItem.creator.avatar} alt={portfolioItem.creator.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold text-lg text-foreground">{portfolioItem.creator.name}</p>
                                    <p className="text-sm text-muted-foreground">{portfolioItem.creator.role}</p>
                                </div>
                                <Button className="ml-auto" variant="outline" size="sm">
                                    프로필
                                </Button>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <Layers className="w-5 h-5 text-primary" />
                                    작품 설명
                                </h3>
                                <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                                    {portfolioItem.description}
                                </p>
                            </div>

                            {/* Tools Used */}
                            <div>
                                <h3 className="text-lg font-semibold mb-3">사용 툴</h3>
                                <div className="flex flex-wrap gap-2">
                                    {portfolioItem.tools.map((tool) => (
                                        <span key={tool} className="px-3 py-1.5 rounded-lg bg-secondary/10 text-secondary text-sm font-medium">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button className="flex-1" variant="hero" size="lg">
                                    <Heart className="w-5 h-5 mr-2" />
                                    좋아요
                                </Button>
                                <Button variant="outline" size="lg">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
