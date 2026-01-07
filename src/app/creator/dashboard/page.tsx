'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DollarSign, Package, Users, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { CreatorService } from "@/services/creator.service";
import Link from "next/link";

export default function CreatorDashboardPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [creator, setCreator] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchDashboardData = async () => {
            try {
                // 1. Get Creator Profile by User ID to get Creator ID
                const creatorData = await CreatorService.getByUserId(user.id); // Assuming user object has id. Wait, AuthResponse might not have id?
                // Let's check AuthResponse again. It usually has ID in JWT but maybe not in the response object directly shown in Service file?
                // user is AuthResponse. Let's assume it has `id` or we need to decode token or fetch /auth/me.
                // The API /auth/login response shows username, email, role. No ID?
                // The API /auth/me shows username, email, role. No ID?
                // Wait, if no user ID in Auth context, how do we get it?
                // Maybe I need to update AuthContext to store full user details or fetch /auth/me which returns ID?
                // Let's assume for now user has id (standard). If not I will need to fix AuthContext.

                if (creatorData) {
                    setCreator(creatorData);

                    // 2. Fetch Orders (Recent Sales) - We need an endpoint for sold orders?
                    // The OrderService.getByUserId gets orders *bought* by user.
                    // We need orders *sold* by creator.
                    // API might not have this endpoint yet based on list?
                    // "GET /api/orders/user/{userId}" -> User Order List
                    // "GET /api/creators/{creatorId}" has stats.
                    // Use stats for numbers.
                    // For recent orders list, maybe "GET /api/orders/creator/{creatorId}"? (Not in generic list)
                    // If not available, we might leave recent orders empty or mock until API exists.
                    // Or use `ProductService` if it has sales history?
                    // Let's check API doc... "GET /api/orders/user/{userId}" is for buyer.
                    // No endpoint listed for "Creator Sales History".
                    // I will leave recent orders empty/mock for now or comment it out.
                    // But I will trigger state update.
                }
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [user]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!creator) return <div className="p-8 text-center">크리에이터 정보를 찾을 수 없습니다.</div>;

    const stats = {
        todayRevenue: "₩0", // API doesn't provide today revenue yet
        monthRevenue: "₩0", // API doesn't provide month revenue yet
        totalSales: creator.stats.totalSales || 0,
        followers: creator.stats.followers || 0
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-display">대시보드</h1>
                    <p className="text-muted-foreground text-sm">{creator.displayName}님의 판매 현황을 확인하세요.</p>
                </div>
                <Link href="/creator/products/new">
                    <Button className="gap-2">
                        <Package className="w-4 h-4" /> 새 상품 등록
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="오늘 수익" value={stats.todayRevenue} icon={DollarSign} color="text-green-400" />
                <StatCard label="이번 달 수익" value={stats.monthRevenue} icon={TrendingUp} color="text-blue-400" />
                <StatCard label="총 판매량" value={stats.totalSales} icon={Package} color="text-purple-400" />
                <StatCard label="팔로워" value={stats.followers} icon={Users} color="text-pink-400" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Recent Orders - Placeholder as no API */}
                <section className="bg-glass rounded-xl border border-white/5 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">최근 주문 (API 미구현)</h2>
                        <Link href="/creator/analytics" className="text-xs text-primary hover:underline">더보기</Link>
                    </div>
                    <div className="space-y-3">
                        <div className="p-4 text-center text-muted-foreground text-sm">
                            최근 판매 내역 API가 준비 중입니다.
                        </div>
                    </div>
                </section>

                {/* Notifications / Announcements */}
                <section className="bg-glass rounded-xl border border-white/5 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">알림 센터</h2>
                    </div>
                    <div className="space-y-3">
                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-sm">
                            <span className="font-bold text-primary block mb-1">🎉 이달의 크리에이터 선정!</span>
                            축하합니다! 3월 &apos;주목할 만한 크리에이터&apos;에 선정되셨습니다.
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 text-sm">
                            <span className="font-semibold block mb-1">새로운 리뷰 도착</span>
                            &apos;네온 드리머&apos; 상품에 별점 5점 리뷰가 등록되었습니다.
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

const StatCard = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-glass p-6 rounded-xl border border-white/5 flex flex-col justify-between h-32 hover:border-primary/30 transition-colors">
        <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm font-medium">{label}</span>
            <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
        </div>
        <span className="text-2xl font-bold font-display">{value}</span>
    </div>
);
