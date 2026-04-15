'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DollarSign, Package, Users, TrendingUp, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { CreatorService } from "@/services/creator.service";
import { OrderService } from "@/services/order.service";
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
                // 1. 크리에이터 정보 조회
                const creatorData = await CreatorService.getByUserId(user.id);

                if (creatorData) {
                    setCreator(creatorData);

                    // 2. 크리에이터 판매 내역 조회
                    try {
                        const ordersData = await OrderService.getByCreatorId(creatorData.id);
                        // 최근 5개만 표시
                        setOrders(ordersData.slice(0, 5));
                    } catch (error) {
                        console.warn("Failed to fetch orders:", error);
                        setOrders([]);
                    }
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
        todayRevenue: "₩0", // API가 아직 오늘의 수익을 제공하지 않음
        monthRevenue: "₩0", // API가 아직 이번 달 수익을 제공하지 않음
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
                {/* 최근 주문 */}
                <section className="bg-glass rounded-xl border border-white/5 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">최근 주문</h2>
                        <Link href="/creator/analytics" className="text-xs text-primary hover:underline">더보기</Link>
                    </div>
                    <div className="space-y-3">
                        {orders.length === 0 ? (
                            <div className="p-4 text-center text-muted-foreground text-sm">
                                아직 주문이 없습니다.
                            </div>
                        ) : (
                            orders.map((order: any) => (
                                <div key={order.id} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <ShoppingBag className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium">{order.orderNumber || `주문 #${order.id}`}</span>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            order.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                                            order.status === 'PAID' ? 'bg-blue-500/20 text-blue-400' :
                                            order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-gray-500/20 text-gray-400'
                                        }`}>
                                            {order.status === 'COMPLETED' ? '완료' :
                                             order.status === 'PAID' ? '결제완료' :
                                             order.status === 'PENDING' ? '대기중' : order.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                        <span>{order.items?.length || 0}개 상품</span>
                                        <span className="font-semibold text-foreground">₩{order.totalAmount?.toLocaleString() || 0}</span>
                                    </div>
                                </div>
                            ))
                        )}
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
