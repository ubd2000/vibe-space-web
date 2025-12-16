'use client';

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Award, Users, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import { cn } from "@/lib/utils";

interface CreatorCardProps {
    avatar: any;
    name: string;
    tags: string[];
    followers: number;
    sales: number;
    rating: number;
    verified: boolean;
    index: number;
}

const CreatorCard = ({ avatar, name, tags, followers, sales, rating, verified, index }: CreatorCardProps) => {
    return (
        <div
            className="group p-6 rounded-2xl glass hover:shadow-[0_0_40px_hsl(180_100%_50%/0.2)] transition-all duration-500 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16">
                    <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-primary/50">
                        <Image
                            src={avatar}
                            alt={name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Award className="w-3 h-3 text-primary-foreground" />
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">{name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                    <p className="font-display font-bold text-primary">{followers.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">팔로워</p>
                </div>
                <div>
                    <p className="font-display font-bold text-secondary">{sales}</p>
                    <p className="text-xs text-muted-foreground">판매</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                        <span className="font-display font-bold text-accent">{rating}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">평점</p>
                </div>
            </div>

            <Link href={`/creators/${name}`}>
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    프로필 보기
                </Button>
            </Link>
        </div>
    );
};

export default function CreatorsPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = ["All", "VTuber", "Live2D", "3D Model", "Illustration", "Character", "Cyberpunk", "Fantasy"];

    const allCreators = [
        { avatar: avatar1, name: "PixelMaster", tags: ["VTuber", "Live2D", "Illustration"], followers: 12500, sales: 234, rating: 4.9, verified: true },
        { avatar: avatar2, name: "MoonArtist", tags: ["Fantasy", "3D Model", "Texture"], followers: 8900, sales: 156, rating: 4.8, verified: true },
        { avatar: avatar3, name: "TechCreator", tags: ["Cyberpunk", "Mecha", "VRChat"], followers: 15600, sales: 312, rating: 4.9, verified: true },
        { avatar: avatar4, name: "KawaiiDev", tags: ["Cute", "Anime", "Accessories"], followers: 21000, sales: 489, rating: 5.0, verified: true },
        { avatar: avatar1, name: "StarDust", tags: ["High Poly", "3D Model", "Realism"], followers: 5400, sales: 89, rating: 4.7, verified: false },
        { avatar: avatar2, name: "NeonVibe", tags: ["Motion", "Live2D", "Effects"], followers: 3200, sales: 45, rating: 4.8, verified: true },
        { avatar: avatar3, name: "CyberSoul", tags: ["Robot", "Cyberpunk", "Armor"], followers: 8800, sales: 120, rating: 4.6, verified: true },
        { avatar: avatar4, name: "DreamCatcher", tags: ["Fairy", "Fantasy", "Particles"], followers: 1200, sales: 23, rating: 5.0, verified: false },
        { avatar: avatar1, name: "VTube Studio", tags: ["VTuber", "Software", "Tools"], followers: 15000, sales: 500, rating: 4.9, verified: true },
        { avatar: avatar2, name: "AnimeArt", tags: ["Illustration", "Anime", "Character"], followers: 7500, sales: 120, rating: 4.5, verified: false },
        { avatar: avatar3, name: "MechaBuilder", tags: ["Mecha", "3D Model", "Robot"], followers: 11000, sales: 250, rating: 4.8, verified: true },
        { avatar: avatar4, name: "FantasyWorld", tags: ["Fantasy", "Background", "Assets"], followers: 6000, sales: 90, rating: 4.6, verified: true },
    ];

    const popularCreators = allCreators.slice(0, 4);

    const filteredCreators = selectedCategory === "All"
        ? allCreators
        : allCreators.filter(creator => creator.tags.includes(selectedCategory));

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="container mx-auto px-4">

                    {/* Header Section */}
                    <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
                        <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                            <span className="text-foreground">인기 </span>
                            <span className="gradient-text">크리에이터</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            뛰어난 아바타를 만드는 최고의 크리에이터들을 만나보세요.
                            <br />
                            좋아하는 작가를 팔로우하고 신작 소식을 받아보세요.
                        </p>

                        {/* Search Bar */}
                        <div className="mt-8 relative max-w-xl mx-auto">
                            <input
                                type="text"
                                placeholder="크리에이터 이름 또는 태그 검색..."
                                className="w-full pl-12 pr-4 py-4 rounded-full glass border-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-6">
                                검색
                            </Button>
                        </div>
                    </div>

                    {/* Popular Creators Grid (Top 4) */}
                    <div className="mb-20">
                        <div className="flex items-center gap-2 mb-8">
                            <Star className="w-6 h-6 text-primary filled" />
                            <h2 className="text-2xl font-bold font-display">오늘의 인기 크리에이터</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {popularCreators.map((creator, index) => (
                                <CreatorCard key={index} {...creator} index={index} />
                            ))}
                        </div>
                    </div>

                    {/* All Creators Section */}
                    <div className="mb-16" id="all-creators">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                            <div className="flex items-center gap-2">
                                <Users className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-bold font-display">전체 크리에이터</h2>
                                <span className="text-muted-foreground text-sm ml-2">({filteredCreators.length})</span>
                            </div>

                            {/* Category Filter */}
                            <div className="flex flex-wrap items-center gap-2">
                                <Filter className="w-4 h-4 text-muted-foreground mr-2" />
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={cn(
                                            "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                                            selectedCategory === category
                                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                                : "bg-secondary/10 text-muted-foreground hover:bg-secondary/20 hover:text-foreground"
                                        )}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredCreators.map((creator, index) => (
                                <CreatorCard key={`all-${index}`} {...creator} index={index} />
                            ))}
                        </div>

                        {filteredCreators.length === 0 && (
                            <div className="text-center py-20 text-muted-foreground">
                                조건에 맞는 크리에이터가 없습니다.
                            </div>
                        )}
                    </div>

                    {/* Join CTA */}
                    <div className="relative rounded-3xl overflow-hidden glass p-12 text-center animate-fade-in">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-3xl" />
                        <div className="relative z-10 flex flex-col items-center gap-6">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                <Users className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold font-display mb-2">크리에이터가 되어보세요</h2>
                                <p className="text-muted-foreground">
                                    나만의 아바타를 판매하고 전 세계 팬들과 소통하세요.
                                    <br />
                                    VirtuMall이 당신의 창작 활동을 지원합니다.
                                </p>
                            </div>
                            <Link href="/become-creator">
                                <Button variant="hero" size="lg">
                                    크리에이터 시작하기
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
