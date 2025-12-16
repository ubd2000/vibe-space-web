"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, BarChart3, Wallet, LogOut, Store } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CreatorLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const menuItems = [
        { icon: LayoutDashboard, label: "대시보드", path: "/creator/dashboard" },
        { icon: Package, label: "상품 관리", path: "/creator/products" },
        { icon: BarChart3, label: "판매 분석", path: "/creator/analytics" },
        { icon: Wallet, label: "정산 관리", path: "/creator/finance" },
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
                                    크리에이터 센터
                                </h2>
                                <nav className="space-y-1">
                                    {menuItems.map((item) => {
                                        const isActive = pathname === item.path;
                                        return (
                                            <Link
                                                key={item.path}
                                                href={item.path}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                                    ? "bg-accent/20 text-accent font-semibold"
                                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                                                    }`}
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
                                        href="/creator/shop"
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all duration-200"
                                    >
                                        <Store className="w-5 h-5" />
                                        내 샵 설정
                                    </Link>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200">
                                        <LogOut className="w-5 h-5" />
                                        로그아웃
                                    </button>
                                </nav>
                            </div>

                            <div className="mt-4 mx-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
                                <p className="text-xs text-primary font-semibold mb-2">구매자로 전환하시겠어요?</p>
                                <Link href="/buyer/dashboard" className="text-xs underline text-primary/80 hover:text-primary">
                                    구매자 대시보드 가기 &rarr;
                                </Link>
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
};

export default CreatorLayout;
