import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Heart, Zap, Download, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroAvatar from "@/assets/hero-avatar.png";
import avatarDetail1 from "@/assets/avatar-detail-1.png";
import avatarDetail2 from "@/assets/avatar-detail-2.png";

// Mock User Data
const user = {
    name: "VibeUser_001",
    email: "user@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    stats: {
        orders: 12,
        wishlist: 24,
        following: 8
    }
};

// Mock Recent Orders
const recentOrders = [
    {
        id: "ORD-20240315-001",
        date: "2024. 03. 15",
        name: "네온 드리머 (Neon Dreamer)",
        price: "₩45,000",
        image: heroAvatar
    },
    {
        id: "ORD-20240228-042",
        date: "2024. 02. 28",
        name: "사이버 펑크 시티 에셋 팩",
        price: "₩50,000",
        image: avatarDetail1
    }
];

// Mock Recommendations
const recommendations = [
    {
        id: 101,
        name: "퓨처리스틱 닌자",
        creator: "NinjaDev",
        price: "₩38,000",
        rating: 4.7,
        image: avatarDetail2
    },
    {
        id: 102,
        name: "홀로그램 이펙트 팩",
        creator: "FX_Master",
        price: "₩15,000",
        rating: 4.9,
        image: null
    }
];

const DashboardHome = () => {
    useEffect(() => {
        console.log("DashboardHome Mounted");
        console.log("Recent Orders:", recentOrders);
        console.log("Recommendations:", recommendations);
    }, []);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header / Profile Summary */}
            <section className="bg-glass rounded-2xl border border-white/10 p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-24 h-24 rounded-full bg-secondary/20 shadow-inner"
                    />
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-background rounded-full" />
                </div>

                <div className="flex-1 text-center md:text-left z-10">
                    <h1 className="text-2xl font-display font-bold text-foreground mb-1">
                        반가워요, {user.name}님!
                    </h1>
                    <p className="text-muted-foreground text-sm mb-4">{user.email}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                            구매자 회원
                        </span>
                        <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-xs font-semibold">
                            Level 3
                        </span>
                    </div>
                </div>

                <div className="flex gap-4 z-10">
                    <Button variant="outline" className="gap-2">
                        프로필 편집
                    </Button>
                </div>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "구매한 에셋", value: user.stats.orders, icon: ShoppingBag, color: "text-blue-400" },
                    { label: "찜한 상품", value: user.stats.wishlist, icon: Heart, color: "text-pink-400" },
                    { label: "팔로우", value: user.stats.following, icon: Zap, color: "text-yellow-400" },
                ].map((stat, i) => (
                    <div key={i} className="bg-glass p-6 rounded-xl border border-white/5 flex items-center justify-between hover:border-primary/30 transition-colors cursor-default">
                        <div>
                            <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold font-display">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity & Recommendations */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">최근 구매 내역</h2>
                        <Link to="/buyer/orders" className="text-sm text-primary hover:underline flex items-center gap-1">
                            전체보기 <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="bg-glass rounded-xl p-4 border border-white/5 flex items-center gap-4 hover:bg-white/5 transition-colors">
                                <div className="w-12 h-12 rounded-lg bg-secondary/10 overflow-hidden flex-shrink-0">
                                    <img src={order.image} alt={order.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm truncate">{order.name}</h4>
                                    <p className="text-xs text-muted-foreground">{order.date}</p>
                                </div>
                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                                    <Download className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Recommendations */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">추천 에셋</h2>
                        <Link to="/marketplace" className="text-sm text-primary hover:underline flex items-center gap-1">
                            둘러보기 <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recommendations.map((item) => (
                            <div key={item.id} className="bg-glass rounded-xl p-4 border border-white/5 flex items-center gap-4 hover:bg-white/5 transition-colors group">
                                <div className="w-12 h-12 rounded-lg bg-pink-500/10 overflow-hidden flex-shrink-0 relative">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-secondary/10">
                                            <Zap className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>by {item.creator}</span>
                                        <span className="flex items-center gap-0.5 text-yellow-500"><Star className="w-3 h-3 fill-current" /> {item.rating}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-sm block">{item.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
export default DashboardHome;
