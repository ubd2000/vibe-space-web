'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Heart, Zap, Download, Star, Package } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { OrderService } from "@/services/order.service";
import { ProductService } from "@/services/product.service";



export default function BuyerDashboardPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState({ orders: 0, wishlist: 0, following: 0 });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                // Fetch Orders
                const ordersData = await OrderService.getByUserId(user.id);
                setRecentOrders(ordersData);

                // Fetch Stats (Derived from orders and other services if avail)
                // Wishlist/Following API might not exist yet, defaulting to 0 or mock if needed.
                // Assuming Order count is accurate.
                setStats({
                    orders: ordersData.length,
                    wishlist: 0, // Placeholder
                    following: 0  // Placeholder
                });

                // Fetch Recommendations (Mock for now or ProductService.getActive)
                const products = await ProductService.getActive();
                setRecommendations(products.slice(0, 2));

            } catch (error) {
                console.error("Failed to fetch buyer dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!user) return null;

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header / Profile Summary */}
            <section className="bg-glass rounded-2xl border border-white/10 p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-secondary/20 shadow-inner flex items-center justify-center overflow-hidden border-2 border-white/10">
                        {user.profileImageUrl ? (
                            <Image
                                src={user.profileImageUrl}
                                alt={user.nickname}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <span className="text-3xl font-bold text-secondary">
                                {user.nickname.substring(0, 1).toUpperCase()}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left z-10">
                    <h1 className="text-2xl font-display font-bold text-foreground mb-1">
                        반가워요, {user.nickname}님!
                    </h1>
                    <p className="text-muted-foreground text-sm mb-4">{user.email}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold">
                            구매자 회원
                        </span>
                    </div>
                </div>

                <div className="flex gap-4 z-10">
                    <Button variant="outline" className="gap-2" asChild>
                        <Link href="/buyer/settings">
                            프로필 편집
                        </Link>
                    </Button>
                </div>
            </section>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "구매한 에셋", value: stats.orders, icon: ShoppingBag, color: "text-blue-400" },
                    { label: "찜한 상품", value: stats.wishlist, icon: Heart, color: "text-pink-400" },
                    { label: "팔로우", value: stats.following, icon: Zap, color: "text-yellow-400" },
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
                        <Link href="/buyer/orders" className="text-sm text-primary hover:underline flex items-center gap-1">
                            전체보기 <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentOrders.length === 0 ? (
                            <div className="p-4 text-center text-muted-foreground bg-glass rounded-xl border border-white/5">
                                구매 내역이 없습니다.
                            </div>
                        ) : (
                            recentOrders.map((order) => (
                                <div key={order.id} className="bg-glass rounded-xl p-4 border border-white/5 flex items-center gap-4 hover:bg-white/5 transition-colors">
                                    <div className="w-12 h-12 rounded-lg bg-secondary/10 overflow-hidden flex-shrink-0 relative flex items-center justify-center">
                                        <Package className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm truncate">주문 #{order.id}</h4>
                                        <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-sm">{order.totalAmount}원</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Recommendations */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">추천 에셋</h2>
                        <Link href="/marketplace" className="text-sm text-primary hover:underline flex items-center gap-1">
                            둘러보기 <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recommendations.map((item) => (
                            <Link key={item.id} href={`/marketplace/${item.id}`}>
                                <div className="bg-glass rounded-xl p-4 border border-white/5 flex items-center gap-4 hover:bg-white/5 transition-colors group mb-3">
                                    <div className="w-12 h-12 rounded-lg bg-pink-500/10 overflow-hidden flex-shrink-0 relative">
                                        {item.images && item.images[0] ? (
                                            <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-secondary/10">
                                                <Zap className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <span>by {item.creator?.name || 'Unknown'}</span>
                                            <span className="flex items-center gap-0.5 text-yellow-500"><Star className="w-3 h-3 fill-current" /> {item.rating}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-sm block">₩{item.price.toLocaleString()}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
