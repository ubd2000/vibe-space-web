'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Heart, Users, Settings, LogOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: "대시보드", path: "/buyer/dashboard" },
        { icon: ShoppingBag, label: "주문 내역", path: "/buyer/orders" },
        { icon: Heart, label: "찜한 상품", path: "/buyer/wishlist" },
        { icon: Users, label: "팔로우 목록", path: "/buyer/following" },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-8 pt-24">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Navigation Bar (LNB) */}
                    <aside className="w-full lg:w-64 flex-shrink-0 animate-fade-in order-1">
                        <div className="bg-glass rounded-2xl border border-white/10 p-4 sticky top-24">
                            <div className="mb-6 px-4 pt-2">
                                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                                    내 활동
                                </h2>
                                <nav className="space-y-1">
                                    {menuItems.map((item) => {
                                        const isActive = pathname === item.path;
                                        return (
                                            <Link
                                                key={item.path}
                                                href={item.path}
                                                className={cn(
                                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                                    isActive
                                                        ? "bg-primary/20 text-primary font-semibold"
                                                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                                )}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>

                            <div className="border-t border-white/10 my-2 pt-4 px-4 pb-2">
                                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">
                                    설정
                                </h2>
                                <nav className="space-y-1">
                                    <Link
                                        href="/buyer/settings"
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                            pathname === "/buyer/settings"
                                                ? "bg-accent/20 text-accent font-semibold"
                                                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                        )}
                                    >
                                        <Settings className="w-5 h-5" />
                                        계정 설정
                                    </Link>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200">
                                        <LogOut className="w-5 h-5" />
                                        로그아웃
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <div className="flex-1 animate-fade-in order-2" style={{ animationDelay: "0.1s" }}>
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
