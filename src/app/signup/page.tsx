'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, User, ArrowLeft, Github } from "lucide-react";
import { authService } from "@/services/auth.service";

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authService.register({
                username: formData.username,
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password
            });
            // Success
            alert('회원가입이 완료되었습니다. 로그인해주세요.');
            router.push("/login");
        } catch (error) {
            console.error('Signup error:', error);
            alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />

            <div className="container mx-auto px-4 z-10 flex flex-col items-center">
                {/* Back Link */}
                <Link
                    href="/"
                    className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    홈으로 돌아가기
                </Link>

                {/* Signup Card */}
                <div className="w-full max-w-md animate-fade-in">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_hsl(180_100%_50%/0.3)]">
                            <span className="font-display font-bold text-primary-foreground text-xl">V</span>
                        </div>
                        <h1 className="font-display text-2xl font-bold mb-2">Vibe Space와 함께하세요</h1>
                        <p className="text-muted-foreground">나만의 아바타 세계를 발견할 준비 되셨나요?</p>
                    </div>

                    <div className="p-8 rounded-2xl glass border border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <form onSubmit={handleSignup} className="space-y-4 relative">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">이름</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="홍길동"
                                        className="pl-10 bg-background/50 border-white/10 focus:border-primary/50"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">닉네임 (아이디)</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="vibez"
                                        className="pl-10 bg-background/50 border-white/10 focus:border-primary/50"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">이메일</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="hello@example.com"
                                        className="pl-10 bg-background/50 border-white/10 focus:border-primary/50"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">비밀번호</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 bg-background/50 border-white/10 focus:border-primary/50"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <Button type="submit" variant="glow" className="w-full h-11 mt-2" disabled={loading}>
                                {loading ? "가입 처리 중..." : "무료로 시작하기"}
                            </Button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background/50 px-2 text-muted-foreground backdrop-blur-sm">
                                        또는
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" type="button" className="hover:bg-background/50">
                                    <Github className="w-4 h-4 mr-2" />
                                    Github
                                </Button>
                                <Button variant="outline" type="button" className="hover:bg-background/50">
                                    Google
                                </Button>
                            </div>
                        </form>
                    </div>

                    <p className="text-center mt-6 text-sm text-muted-foreground">
                        이미 계정이 있으신가요?{" "}
                        <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                            로그인하기
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
