import { Button } from "@/components/ui/button";
import { Search, Download, ExternalLink, Package } from "lucide-react";
import heroAvatar from "@/assets/hero-avatar.png";
import avatarDetail1 from "@/assets/avatar-detail-1.png";

// Mock Data
const orders = [
    {
        id: "ORD-20240315-001",
        date: "2024. 03. 15",
        total: "₩45,000",
        status: "결제 완료",
        items: [
            {
                id: 1,
                name: "네온 드리머 (Neon Dreamer)",
                creator: "PixelMaster",
                price: "₩45,000",
                image: heroAvatar
            }
        ]
    },
    {
        id: "ORD-20240228-042",
        date: "2024. 02. 28",
        total: "₩85,000",
        status: "결제 완료",
        items: [
            {
                id: 2,
                name: "사이버 펑크 시티 에셋 팩",
                creator: "TechArt",
                price: "₩50,000",
                image: avatarDetail1
            },
            {
                id: 3,
                name: "기본 모션 세트 V2",
                creator: "MotionLab",
                price: "₩35,000",
                image: null // Placeholder if no image
            }
        ]
    }
];

const OrderHistory = () => {
    return (
        <div className="min-h-full space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-display mb-1">주문 내역</h1>
                    <p className="text-muted-foreground text-sm">구매한 에셋을 확인하고 다운로드하세요.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="주문 검색..."
                        className="pl-10 pr-4 py-2 rounded-lg bg-glass border border-white/10 focus:outline-none focus:border-primary/50 text-sm w-full md:w-64"
                    />
                </div>
            </div>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-glass rounded-xl border border-white/5 overflow-hidden">
                        {/* Order Header */}
                        <div className="p-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 bg-white/5">
                            <div className="flex gap-6 text-sm">
                                <div>
                                    <span className="text-muted-foreground block text-xs mb-1">주문 일자</span>
                                    <span className="font-semibold">{order.date}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground block text-xs mb-1">주문 번호</span>
                                    <span className="font-mono text-muted-foreground">{order.id}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground block text-xs mb-1">총 결제금액</span>
                                    <span className="font-bold text-primary">{order.total}</span>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" className="h-8">
                                영수증 보기
                            </Button>
                        </div>

                        {/* Order Items */}
                        <div className="p-4 space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-lg bg-secondary/10 overflow-hidden flex-shrink-0">
                                        {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Package className="w-6 h-6 text-muted-foreground/50" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold truncate">{item.name}</h4>
                                        <p className="text-sm text-muted-foreground">by {item.creator}</p>
                                    </div>
                                    <div className="text-right flex items-center gap-4">
                                        <span className="font-semibold hidden sm:inline-block">{item.price}</span>
                                        <Button size="sm" variant="secondary" className="gap-2">
                                            <Download className="w-4 h-4" />
                                            <span className="hidden sm:inline">다운로드</span>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
