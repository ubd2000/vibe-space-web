'use client';

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard } from "lucide-react";

export default function CheckoutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <CreditCard className="w-12 h-12 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold mb-4">결제 페이지</h1>
                <p className="text-muted-foreground mb-8">안전한 결제 시스템이 연동될 예정입니다.</p>
                <Link href="/cart">
                    <Button variant="outline">돌아가기</Button>
                </Link>
                <Button className="ml-4">결제하기 (Demo)</Button>
            </div>
        </div>
    );
}
