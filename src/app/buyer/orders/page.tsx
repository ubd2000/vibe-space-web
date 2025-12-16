'use client';

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function BuyerOrdersPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-4">주문 내역</h1>
                <p className="text-muted-foreground mb-8">구매하신 상품 목록입니다.</p>
                <Link href="/buyer/dashboard">
                    <Button>대시보드로 돌아가기</Button>
                </Link>
            </div>
        </div>
    );
}
