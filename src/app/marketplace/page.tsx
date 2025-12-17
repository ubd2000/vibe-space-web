'use client';

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, Filter } from "lucide-react";
import Link from "next/link";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import Image from "next/image";

// Mock data (extended)
const allItems = [
    { id: 1, image: avatar1, name: "네온 드리머", creator: "PixelMaster", price: "₩25,000", likes: 234, views: 1250, category: "VTuber" },
    { id: 2, image: avatar2, name: "루나 엘프", creator: "MoonArtist", price: "₩35,000", likes: 456, views: 2340, category: "판타지" },
    { id: 3, image: avatar3, name: "사이버 워리어", creator: "TechCreator", price: "₩45,000", likes: 312, views: 1890, category: "사이버펑크" },
    { id: 4, image: avatar4, name: "핑크 캣걸", creator: "KawaiiDev", price: "₩30,000", likes: 567, views: 3210, category: "귀여움" },
    { id: 5, image: avatar2, name: "얼음 공주", creator: "FrostArt", price: "₩40,000", likes: 289, views: 1567, category: "판타지" },
    { id: 6, image: avatar1, name: "스타 보이", creator: "GalaxyMaker", price: "₩28,000", likes: 198, views: 987, category: "VTuber" },
    { id: 7, image: avatar4, name: "체리 블라썸", creator: "SakuraStudio", price: "₩32,000", likes: 421, views: 2100, category: "귀여움" },
    { id: 8, image: avatar3, name: "다크 나이트", creator: "ShadowForge", price: "₩55,000", likes: 378, views: 1789, category: "게임" },
    { id: 9, image: avatar1, name: "메카 파일럿", creator: "MechaZone", price: "₩42,000", likes: 156, views: 890, category: "SF" },
    { id: 10, image: avatar2, name: "숲의 요정", creator: "NatureSpirit", price: "₩38,000", likes: 678, views: 4500, category: "판타지" },
    { id: 11, image: avatar3, name: "스트릿 댄서", creator: "UrbanVibe", price: "₩29,000", likes: 234, views: 1200, category: "현대" },
    { id: 12, image: avatar4, name: "고딕 롤리타", creator: "DarkCute", price: "₩36,000", likes: 890, views: 5600, category: "고딕" },
];

import { CATEGORIES } from "@/lib/constants";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function MarketplacePage() {
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredItems = allItems.filter(item => {
        const matchesCategory = selectedCategory === "전체" || item.category === selectedCategory ||
            // Simple mapping for demo purposes; in real app, items would get specific subcategories
            (selectedCategory === "아바타" && ["VTuber", "판타지", "사이버펑크", "귀여움"].includes(item.category));
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.creator.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header & Search */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl font-display font-bold mb-2">마켓플레이스</h1>
                            <p className="text-muted-foreground">크리에이터들의 독창적인 작품을 발견하세요.</p>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="무엇을 찾고 계신가요?"
                                    className="pl-10 bg-background/50 border-white/10 focus:border-primary/50"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                                <Filter className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left Sidebar (Booth Style) */}
                        <aside className="hidden lg:block w-64 shrink-0">
                            <div className="sticky top-24 space-y-8">
                                {CATEGORIES.map((category) => (
                                    <div key={category.name} className="bg-card/30 rounded-xl p-4 border border-white/5">
                                        <h3 className="font-bold text-sm text-foreground/80 mb-3 flex items-center gap-2">
                                            {category.name}
                                        </h3>
                                        <div className="space-y-4">
                                            {category.subcategories.map((sub) => (
                                                <div key={sub.name}>
                                                    <button
                                                        onClick={() => setSelectedCategory(sub.name)}
                                                        className={`w-full text-left text-xs font-semibold py-1 px-2 rounded-md mb-1 transition-colors flex items-center justify-between ${selectedCategory === sub.name
                                                            ? "bg-primary/20 text-primary"
                                                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                                            }`}
                                                    >
                                                        {sub.name}
                                                        {selectedCategory === sub.name && <ChevronRight className="w-3 h-3" />}
                                                    </button>
                                                    <div className="pl-3 border-l border-white/10 space-y-1">
                                                        {sub.details.map((detail) => (
                                                            <button
                                                                key={detail}
                                                                onClick={() => setSelectedCategory(detail)}
                                                                className={`w-full text-left text-[11px] py-1 px-2 rounded-md transition-colors ${selectedCategory === detail
                                                                    ? "text-primary font-medium"
                                                                    : "text-muted-foreground hover:text-foreground"
                                                                    }`}
                                                            >
                                                                {detail}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* Price Filter (Visual Only) */}
                                <div className="bg-card/30 rounded-xl p-4 border border-white/5">
                                    <h3 className="font-bold text-sm text-foreground/80 mb-3">가격</h3>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <input type="checkbox" className="rounded border-white/20 bg-black/20" id="price-free" />
                                            <label htmlFor="price-free" className="cursor-pointer">무료</label>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <input type="checkbox" className="rounded border-white/20 bg-black/20" id="price-paid" />
                                            <label htmlFor="price-paid" className="cursor-pointer">유료</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1">
                            {/* Active Filter Display */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>총 <span className="text-foreground font-bold">{filteredItems.length}</span>개의 작품</span>
                                    {selectedCategory !== "전체" && (
                                        <>
                                            <span className="text-white/20">|</span>
                                            <span className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                                                {selectedCategory}
                                                <button onClick={() => setSelectedCategory("전체")} className="hover:text-primary/70 ml-1">×</button>
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <select className="bg-background border border-white/10 rounded-md text-xs px-2 py-1.5 text-muted-foreground focus:outline-none focus:border-primary/50">
                                        <option>인기순</option>
                                        <option>최신순</option>
                                        <option>낮은 가격순</option>
                                    </select>
                                </div>
                            </div>

                            {/* Grid */}
                            {filteredItems.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                    {filteredItems.map((item) => (
                                        <div key={item.id} className="group relative rounded-xl overflow-hidden glass border border-white/5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                                            <Link href={`/avatar/${item.id}`} className="block">
                                                {/* Image */}
                                                <div className="aspect-square overflow-hidden relative bg-black/20">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        width={400}
                                                        height={400}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    {/* Wishlist Button Overlay */}
                                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-rose-500/80 transition-colors text-white"
                                                            onClick={(e) => { e.preventDefault(); }}
                                                        >
                                                            <Heart className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-4">
                                                    <div className="text-xs text-muted-foreground mb-1">{item.category}</div>
                                                    <h3 className="font-semibold text-foreground text-sm mb-2 truncate leading-tight">{item.name}</h3>

                                                    <div className="flex items-center justify-between mt-3">
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-[10px] text-white font-bold">
                                                                {item.creator[0]}
                                                            </div>
                                                            <span className="truncate max-w-[80px]">{item.creator}</span>
                                                        </div>
                                                        <span className="font-bold text-foreground text-sm">{item.price}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                                    <p className="text-muted-foreground mb-4">해당 카테고리에 상품이 없습니다.</p>
                                    <Button variant="outline" onClick={() => { setSelectedCategory("전체"); setSearchQuery(""); }}>
                                        전체 보기
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};
