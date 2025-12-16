'use client';

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { KeyRound } from "lucide-react";

export default function FindPasswordPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-orange-500/10 rounded-full flex items-center justify-center mb-6">
                    <KeyRound className="w-12 h-12 text-orange-500" />
                </div>
                <h1 className="text-3xl font-bold mb-4">비밀번호 찾기</h1>
                <p className="text-muted-foreground mb-8">이메일 주소를 입력하시면 재설정 링크를 보내드립니다.</p>
                <Link href="/login">
                    <Button variant="outline">로그인으로 돌아가기</Button>
                </Link>
            </div>
        </div>
    );
}
