"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { WishlistService, WishlistItem } from "@/services/wishlist.service";

export default function BuyerWishlistPage() {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchWishlist = async () => {
            try {
                const data = await WishlistService.getUserWishlist(user.id);
                setWishlist(data);
            } catch (error) {
                console.error("Failed to fetch wishlist:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWishlist();
    }, [user]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Heart className="w-8 h-8 text-pink-500" />
                    찜한 상품
                </h1>
                <span className="text-muted-foreground">{wishlist.length}개의 상품</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map((item) => (
                    <div key={item.id} className="group bg-glass rounded-xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-300">
                        <div className="relative aspect-square bg-muted overflow-hidden">
                            {item.productImage ? (
                                <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-secondary/10 text-muted-foreground">No Img</div>
                            )}
                            <button className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-full text-pink-500 hover:bg-black/70 transition-colors">
                                <Heart className="w-5 h-5 fill-current" />
                            </button>
                        </div>
                        <div className="p-4 space-y-3">
                            <div>
                                <h3 className="font-bold text-lg leading-tight mb-1 truncate">{item.productName}</h3>
                                {/* Creator name not directly available in WishlistItemResponse usually, unless joined. Using Placeholder or if backend provides it. */}
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-white/10">
                                <span className="font-bold">{item.productPrice ? `₩${item.productPrice.toLocaleString()}` : '가격 정보 없음'}</span>
                                <button className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                                    <ShoppingCart className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {wishlist.length === 0 && (
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
