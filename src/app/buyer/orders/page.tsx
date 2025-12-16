"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag, Package, ChevronRight } from "lucide-react";

// Mock Data for Orders
const MOCK_ORDERS = [
    {
        id: "ORD-2024-001",
        date: "2024. 05. 20",
        status: "구매 확정",
        total: "55,000원",
        items: [
            { name: "Cyberpunk Avatar Set", price: "35,000원", image: "/avatar-detail-1.png" },
            { name: "Neon Boots", price: "20,000원", image: "/avatar-detail-2.png" }
        ]
    },
    {
        id: "ORD-2024-002",
        date: "2024. 05. 15",
        status: "구매 확정",
        total: "15,000원",
        items: [
            { name: "Casual Hoodie", price: "15,000원", image: "/avatar-detail-3.png" }
        ]
    },
    {
        id: "ORD-2024-003",
        date: "2024. 05. 01",
        status: "환불 완료",
        total: "25,000원",
        items: [
            { name: "School Uniform", price: "25,000원", image: "/avatar-1.png" }
        ]
    }
];

export default function BuyerOrdersPage() {
    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <ShoppingBag className="w-8 h-8 text-primary" />
                    주문 내역
                </h1>
                <span className="text-muted-foreground">최근 6개월 내역</span>
            </div>

            <div className="space-y-4">
                {MOCK_ORDERS.map((order) => (
                    <div key={order.id} className="bg-glass rounded-xl border border-white/10 p-6 flex flex-col gap-4">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4">
                            <div className="flex gap-4 text-sm text-muted-foreground">
                                <span className="text-foreground font-semibold">{order.date}</span>
                                <span>|</span>
                                <span>주문번호 {order.id}</span>
                            </div>
                            <Link href={`/buyer/orders/${order.id}`} className="flex items-center text-sm text-primary hover:underline">
                                상세보기 <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-center">
                                    <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-lg">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">{item.price}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === '구매 확정' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {MOCK_ORDERS.length === 0 && (
                <div className="flex flex-col items-center justify-center p-12 text-center bg-glass rounded-xl border border-white/10">
                    <Package className="w-12 h-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">아직 주문 내역이 없습니다.</p>
                </div>
            )}
        </div>
    );
}
