'use client';

import { Button } from "@/components/ui/button";
import { DollarSign, Package, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function CreatorDashboardPage() {
    // Mock Data
    const stats = {
        todayRevenue: "₩150,000",
        monthRevenue: "₩4,500,000",
        totalSales: 128,
        followers: 1240
    };

    const recentOrders = [
        { id: "ORD-001", item: "네온 드리머", price: "₩45,000", date: "방금 전", user: "User123" },
        { id: "ORD-002", item: "사이버 펑크 팩", price: "₩50,000", date: "1시간 전", user: "VibeMaster" },
        { id: "ORD-003", item: "홀로그램 이펙트", price: "₩15,000", date: "3시간 전", user: "Newbie_01" },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-display">대시보드</h1>
                    <p className="text-muted-foreground text-sm">오늘의 판매 현황을 확인하세요.</p>
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
                {/* Recent Orders */}
                <section className="bg-glass rounded-xl border border-white/5 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">최근 주문</h2>
                        <Link href="/creator/analytics" className="text-xs text-primary hover:underline">더보기</Link>
                    </div>
                    <div className="space-y-3">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                <div>
                                    <p className="font-semibold text-sm">{order.item}</p>
                                    <p className="text-xs text-muted-foreground">{order.user} • {order.date}</p>
                                </div>
                                <span className="font-bold text-sm text-green-400">+{order.price}</span>
                            </div>
                        ))}
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
