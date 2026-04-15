'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CreatorService } from "@/services/creator.service";
import { OrderService } from "@/services/order.service";
import { ProductService } from "@/services/product.service";
import { BarChart3, TrendingUp, DollarSign, Package, ShoppingBag, Users } from "lucide-react";

export default function AnalyticsPage() {
    const { user } = useAuth();
    const [creator, setCreator] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;

        const fetchAnalytics = async () => {
            try {
                const creatorData = await CreatorService.getByUserId(user.id);

                if (creatorData) {
                    setCreator(creatorData);

                    // 주문 데이터 가져오기
                    try {
                        const ordersData = await OrderService.getByCreatorId(creatorData.id);
                        setOrders(ordersData);
                    } catch (error) {
                        console.warn("Failed to fetch orders:", error);
                        setOrders([]);
                    }

                    // 상품 데이터 가져오기
                    try {
                        const productsData = await ProductService.getByCreatorId(creatorData.id);
                        setProducts(productsData);
                    } catch (error) {
                        console.warn("Failed to fetch products:", error);
                        setProducts([]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch analytics:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [user]);

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    if (!creator) {
        return <div className="p-8 text-center">크리에이터 정보를 찾을 수 없습니다.</div>;
    }

    // 통계 계산
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    const completedOrders = orders.filter(order => order.status === 'COMPLETED').length;
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // 이번 달 통계
    const now = new Date();
    const thisMonthOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
    });
    const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    // 오늘 통계
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
    });
    const todayRevenue = todayOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 text-primary" />
                    판매 분석
                </h1>
                <p className="text-muted-foreground mt-2">판매 데이터와 통계를 확인하세요.</p>
            </div>

            {/* 통계 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="총 수익"
                    value={`₩${totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="text-green-400"
                />
                <StatCard
                    label="이번 달 수익"
                    value={`₩${thisMonthRevenue.toLocaleString()}`}
                    icon={TrendingUp}
                    color="text-blue-400"
                />
                <StatCard
                    label="오늘 수익"
                    value={`₩${todayRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    color="text-purple-400"
                />
                <StatCard
                    label="평균 주문 금액"
                    value={`₩${Math.round(averageOrderValue).toLocaleString()}`}
                    icon={ShoppingBag}
                    color="text-yellow-400"
                />
            </div>

            {/* 주문 통계 */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-glass rounded-xl border border-white/5 p-6">
                    <h2 className="text-lg font-bold mb-4">주문 현황</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">총 주문</span>
                            <span className="text-2xl font-bold">{totalOrders}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">완료된 주문</span>
                            <span className="text-2xl font-bold text-green-400">{completedOrders}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">이번 달 주문</span>
                            <span className="text-2xl font-bold text-blue-400">{thisMonthOrders.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">오늘 주문</span>
                            <span className="text-2xl font-bold text-purple-400">{todayOrders.length}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-glass rounded-xl border border-white/5 p-6">
                    <h2 className="text-lg font-bold mb-4">상품 통계</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">등록된 상품</span>
                            <span className="text-2xl font-bold">{products.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">활성 상품</span>
                            <span className="text-2xl font-bold text-green-400">
                                {products.filter(p => p.active).length}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">총 판매량</span>
                            <span className="text-2xl font-bold text-blue-400">
                                {creator.stats?.totalSales || 0}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">팔로워</span>
                            <span className="text-2xl font-bold text-purple-400">
                                {creator.stats?.followers || 0}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 최근 주문 목록 */}
            <div className="bg-glass rounded-xl border border-white/5 p-6">
                <h2 className="text-lg font-bold mb-4">전체 주문 내역</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-white/10">
                            <tr className="text-left text-muted-foreground">
                                <th className="pb-3">주문번호</th>
                                <th className="pb-3">날짜</th>
                                <th className="pb-3">상품 수</th>
                                <th className="pb-3">금액</th>
                                <th className="pb-3">상태</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                                        주문 내역이 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order: any) => (
                                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                        <td className="py-3 font-medium">{order.orderNumber || `#${order.id}`}</td>
                                        <td className="py-3 text-muted-foreground">
                                            {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                                        </td>
                                        <td className="py-3">{order.items?.length || 0}개</td>
                                        <td className="py-3 font-semibold">₩{order.totalAmount?.toLocaleString() || 0}</td>
                                        <td className="py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                order.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                                                order.status === 'PAID' ? 'bg-blue-500/20 text-blue-400' :
                                                order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-gray-500/20 text-gray-400'
                                            }`}>
                                                {order.status === 'COMPLETED' ? '완료' :
                                                 order.status === 'PAID' ? '결제완료' :
                                                 order.status === 'PENDING' ? '대기중' : order.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

const StatCard = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-glass p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
        <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground text-sm font-medium">{label}</span>
            <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
        </div>
        <span className="text-2xl font-bold font-display">{value}</span>
    </div>
);
