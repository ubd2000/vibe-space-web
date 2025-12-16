"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";

// Mock Data for Wishlist
const MOCK_WISHLIST = [
    {
        id: "PROD-001",
        title: "Cyberpunk Ninja Avatar",
        creator: "NeonStudio",
        price: "45,000원",
        rating: 4.8,
        reviews: 120,
        image: "/avatar-detail-1.png",
        tags: ["Cyberpunk", "Ninja", "Full Body"]
    },
    {
        id: "PROD-002",
        title: "Magical Girl Outfit",
        creator: "PinkRibbon",
        price: "25,000원",
        rating: 4.9,
        reviews: 85,
        image: "/avatar-detail-2.png",
        tags: ["Cute", "Outfit", "Magical"]
    },
    {
        id: "PROD-003",
        title: "Mecha Suit V2",
        creator: "TechMech",
        price: "60,000원",
        rating: 4.5,
        reviews: 40,
        image: "/avatar-detail-3.png",
        tags: ["Sci-Fi", "Mecha", "Armor"]
    },
    {
        id: "PROD-004",
        title: "Casual Streetwear Pack",
        creator: "UrbanStyle",
        price: "30,000원",
        rating: 4.7,
        reviews: 210,
        image: "/avatar-1.png",
        tags: ["Casual", "Street", "Fashion"]
    }
];

export default function BuyerWishlistPage() {
    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Heart className="w-8 h-8 text-pink-500" />
                    찜한 상품
                </h1>
                <span className="text-muted-foreground">{MOCK_WISHLIST.length}개의 상품</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {MOCK_WISHLIST.map((item) => (
                    <div key={item.id} className="group bg-glass rounded-xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-300">
                        <div className="relative aspect-square bg-muted overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <button className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full text-pink-500 hover:bg-black/70 transition-colors">
                                <Heart className="w-5 h-5 fill-current" />
                            </button>
                        </div>
                        <div className="p-4 space-y-3">
                            <div>
                                <h3 className="font-bold text-lg leading-tight mb-1 truncate">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.creator}</p>
                            </div>

                            <div className="flex items-center gap-1 text-yellow-400 text-xs font-medium">
                                <Star className="w-3 h-3 fill-current" />
                                <span>{item.rating}</span>
                                <span className="text-muted-foreground">({item.reviews})</span>
                            </div>

                            <div className="flex flex-wrap gap-1">
                                {item.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-muted-foreground border border-white/5">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-white/10">
                                <span className="font-bold">{item.price}</span>
                                <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                    <ShoppingCart className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {MOCK_WISHLIST.length === 0 && (
                <div className="flex flex-col items-center justify-center p-20 text-center bg-glass rounded-xl border border-white/10 h-[400px]">
                    <Heart className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">찜한 상품이 없습니다.</p>
                    <Link href="/">
                        <Button variant="outline">쇼핑하러 가기</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
