import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import avatarDetail2 from "@/assets/avatar-detail-2.png";
import avatarDetail3 from "@/assets/avatar-detail-3.png";

// Mock Data
const wishlistItems = [
    {
        id: 1,
        name: "사이버 워리어 (Cyber Warrior)",
        creator: "TechCreator",
        price: "₩55,000",
        image: avatarDetail2,
        rating: 4.8
    },
    {
        id: 2,
        name: "핑크 캣걸 (Pink Cat Girl)",
        creator: "KawaiiDev",
        price: "₩30,000",
        image: avatarDetail3,
        rating: 4.9
    },
    {
        id: 3,
        name: "퓨처리스틱 메카 슈트",
        creator: "MechaSim",
        price: "₩42,000",
        image: null,
        rating: 4.5
    }
];

const Wishlist = () => {
    return (
        <div className="min-h-full space-y-8 animate-fade-in">
            <div className="mb-8">
                <h1 className="text-2xl font-bold font-display mb-1">찜한 상품</h1>
                <p className="text-muted-foreground text-sm">관심 있는 상품을 모아보세요.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((item) => (
                    <div key={item.id} className="group rounded-2xl overflow-hidden glass border border-white/5 hover:border-primary/50 transition-all duration-300">
                        {/* Image */}
                        <div className="aspect-square bg-secondary/10 relative overflow-hidden">
                            {item.image ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                    이미지 없음
                                </div>
                            )}
                            <button className="absolute top-3 right-3 p-2 rounded-full glass hover:bg-red-500/20 text-red-500 transition-colors">
                                <Heart className="w-4 h-4 fill-current" />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <h3 className="font-display font-semibold truncate mb-1">{item.name}</h3>
                            <p className="text-xs text-muted-foreground mb-3">by {item.creator}</p>

                            <div className="flex items-center justify-between">
                                <span className="font-bold text-lg">{item.price}</span>
                                <Button size="sm" className="rounded-lg w-10 h-10 p-0">
                                    <ShoppingCart className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
