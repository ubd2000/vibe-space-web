'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CreatorService } from "@/services/creator.service";
import { OrderService } from "@/services/order.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Wallet,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle,
    AlertCircle,
    Download,
    Calendar
} from "lucide-react";
import { toast } from "sonner";

export default function SettlementPage() {
    const { user } = useAuth();
    const [creator, setCreator] = useState<any>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    // 크리에이터 수익 배분율 (70%)
    const CREATOR_COMMISSION_RATE = 0.7;

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                const creatorData = await CreatorService.getByUserId(user.id);

                if (creatorData) {
                    setCreator(creatorData);

                    try {
                        const ordersData = await OrderService.getByCreatorId(creatorData.id);
                        setOrders(ordersData);
                    } catch (error) {
                        console.warn("Failed to fetch orders:", error);
                        setOrders([]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch settlement data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    if (!creator) {
        return <div className="p-8 text-center">크리에이터 정보를 찾을 수 없습니다.</div>;
    }

    // 정산 금액 계산
    const completedOrders = orders.filter(order => order.status === 'COMPLETED');
    const paidOrders = orders.filter(order => order.status === 'PAID');

    // 정산 가능 금액 (완료된 주문의 크리에이터 몫)
    const availableAmount = completedOrders.reduce((sum, order) => {
        return sum + (order.totalAmount || 0) * CREATOR_COMMISSION_RATE;
    }, 0);

    // 정산 예정 금액 (결제 완료되었지만 아직 배송/완료 안된 주문)
    const pendingAmount = paidOrders.reduce((sum, order) => {
        return sum + (order.totalAmount || 0) * CREATOR_COMMISSION_RATE;
    }, 0);

    // 총 정산 금액
    const totalSettled = 0; // 실제로는 백엔드에서 정산 완료 금액을 가져와야 함

    // 이번 달 수익
    const now = new Date();
    const thisMonthOrders = completedOrders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
    });
    const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => {
        return sum + (order.totalAmount || 0) * CREATOR_COMMISSION_RATE;
    }, 0);

    const handleWithdraw = () => {
        if (availableAmount < 10000) {
            toast.error("최소 출금 금액은 ₩10,000입니다.");
            return;
        }

        setIsWithdrawing(true);

        // 실제로는 백엔드 API를 호출해야 함
        setTimeout(() => {
            toast.success("정산 신청이 완료되었습니다. 영업일 기준 3-5일 내에 입금됩니다.");
            setIsWithdrawing(false);
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-3">
                    <Wallet className="w-8 h-8 text-primary" />
                    정산 관리
                </h1>
                <p className="text-muted-foreground mt-2">수익 현황과 정산 내역을 관리하세요.</p>
            </div>

            {/* 수익 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    label="정산 가능 금액"
                    value={`₩${Math.round(availableAmount).toLocaleString()}`}
                    description="완료된 주문의 수익"
                    icon={DollarSign}
                    color="text-green-400"
                    bgColor="bg-green-500/10"
                />
                <StatCard
                    label="정산 예정 금액"
                    value={`₩${Math.round(pendingAmount).toLocaleString()}`}
                    description="결제 완료 대기 중"
                    icon={Clock}
                    color="text-yellow-400"
                    bgColor="bg-yellow-500/10"
                />
                <StatCard
                    label="이번 달 수익"
                    value={`₩${Math.round(thisMonthRevenue).toLocaleString()}`}
                    description="월 누적 수익"
                    icon={TrendingUp}
                    color="text-blue-400"
                    bgColor="bg-blue-500/10"
                />
            </div>

            {/* 정산 신청 섹션 */}
            <div className="bg-glass rounded-xl border border-white/5 p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    정산 신청
                </h2>

                <div className="space-y-6">
                    {/* 수익 배분율 안내 */}
                    <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                            <div className="flex-1 text-sm">
                                <p className="font-semibold text-primary mb-1">수익 배분 정책</p>
                                <p className="text-muted-foreground">
                                    판매 금액의 <span className="font-bold text-primary">{CREATOR_COMMISSION_RATE * 100}%</span>가 크리에이터에게 정산됩니다.
                                    플랫폼 수수료 {(1 - CREATOR_COMMISSION_RATE) * 100}%는 운영 및 결제 처리에 사용됩니다.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 정산 가능 금액 표시 */}
                    <div className="p-6 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10">
                        <div className="text-center">
                            <p className="text-muted-foreground text-sm mb-2">현재 정산 가능 금액</p>
                            <p className="text-4xl font-bold font-display text-primary mb-4">
                                ₩{Math.round(availableAmount).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                최소 출금 금액: ₩10,000 | 출금 수수료: 무료
                            </p>
                        </div>
                    </div>

                    {/* 출금 계좌 정보 */}
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="bank">은행</Label>
                            <Input
                                id="bank"
                                placeholder="은행명을 입력하세요"
                                className="bg-background/50"
                                defaultValue="국민은행"
                            />
                        </div>
                        <div>
                            <Label htmlFor="account">계좌번호</Label>
                            <Input
                                id="account"
                                placeholder="계좌번호를 입력하세요"
                                className="bg-background/50"
                                defaultValue="123-456-789012"
                            />
                        </div>
                        <div>
                            <Label htmlFor="accountHolder">예금주</Label>
                            <Input
                                id="accountHolder"
                                placeholder="예금주명을 입력하세요"
                                className="bg-background/50"
                                defaultValue={creator.displayName}
                            />
                        </div>
                    </div>

                    {/* 정산 신청 버튼 */}
                    <Button
                        className="w-full gap-2"
                        variant="glow"
                        size="lg"
                        onClick={handleWithdraw}
                        disabled={availableAmount < 10000 || isWithdrawing}
                    >
                        {isWithdrawing ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                처리 중...
                            </>
                        ) : (
                            <>
                                <Download className="w-5 h-5" />
                                ₩{Math.round(availableAmount).toLocaleString()} 정산 신청
                            </>
                        )}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                        정산 신청 후 영업일 기준 3-5일 내에 입금됩니다.
                    </p>
                </div>
            </div>

            {/* 정산 내역 */}
            <div className="bg-glass rounded-xl border border-white/5 p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    정산 내역
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="border-b border-white/10">
                            <tr className="text-left text-muted-foreground">
                                <th className="pb-3">날짜</th>
                                <th className="pb-3">주문번호</th>
                                <th className="pb-3">판매 금액</th>
                                <th className="pb-3">수수료</th>
                                <th className="pb-3">정산 금액</th>
                                <th className="pb-3">상태</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {completedOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-muted-foreground">
                                        정산 가능한 주문이 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                completedOrders.map((order: any) => {
                                    const totalAmount = order.totalAmount || 0;
                                    const fee = totalAmount * (1 - CREATOR_COMMISSION_RATE);
                                    const settlement = totalAmount * CREATOR_COMMISSION_RATE;

                                    return (
                                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                            <td className="py-3 text-muted-foreground">
                                                {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                                            </td>
                                            <td className="py-3 font-medium">
                                                {order.orderNumber || `#${order.id}`}
                                            </td>
                                            <td className="py-3">
                                                ₩{totalAmount.toLocaleString()}
                                            </td>
                                            <td className="py-3 text-red-400">
                                                -₩{Math.round(fee).toLocaleString()}
                                            </td>
                                            <td className="py-3 font-semibold text-green-400">
                                                ₩{Math.round(settlement).toLocaleString()}
                                            </td>
                                            <td className="py-3">
                                                <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400 flex items-center gap-1 w-fit">
                                                    <CheckCircle className="w-3 h-3" />
                                                    정산가능
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 정산 예정 내역 */}
            {paidOrders.length > 0 && (
                <div className="bg-glass rounded-xl border border-white/5 p-6">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-yellow-400" />
                        정산 예정 내역
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="border-b border-white/10">
                                <tr className="text-left text-muted-foreground">
                                    <th className="pb-3">날짜</th>
                                    <th className="pb-3">주문번호</th>
                                    <th className="pb-3">판매 금액</th>
                                    <th className="pb-3">예상 정산 금액</th>
                                    <th className="pb-3">상태</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {paidOrders.map((order: any) => {
                                    const totalAmount = order.totalAmount || 0;
                                    const settlement = totalAmount * CREATOR_COMMISSION_RATE;

                                    return (
                                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                            <td className="py-3 text-muted-foreground">
                                                {new Date(order.createdAt).toLocaleDateString('ko-KR')}
                                            </td>
                                            <td className="py-3 font-medium">
                                                {order.orderNumber || `#${order.id}`}
                                            </td>
                                            <td className="py-3">
                                                ₩{totalAmount.toLocaleString()}
                                            </td>
                                            <td className="py-3 font-semibold text-yellow-400">
                                                ₩{Math.round(settlement).toLocaleString()}
                                            </td>
                                            <td className="py-3">
                                                <span className="px-2 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400 flex items-center gap-1 w-fit">
                                                    <Clock className="w-3 h-3" />
                                                    배송완료 후 정산
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

const StatCard = ({ label, value, description, icon: Icon, color, bgColor }: any) => (
    <div className="bg-glass p-6 rounded-xl border border-white/5 hover:border-primary/30 transition-colors">
        <div className="flex items-center justify-between mb-3">
            <div className={`p-3 rounded-lg ${bgColor}`}>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>
        </div>
        <p className="text-muted-foreground text-sm mb-1">{label}</p>
        <p className={`text-3xl font-bold font-display mb-1 ${color}`}>{value}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
    </div>
);
