'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowLeft, Github } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await login({
                usernameOrEmail: email,
                password: password
            });

            // Redirect based on role or default
            if (response.role === "CREATOR") {
                router.push("/creator/dashboard");
            } else if (response.role === "ADMIN") {
                router.push("/admin/dashboard");
            } else {
                router.push("/buyer/dashboard");
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px]" />

            <div className="container mx-auto px-4 z-10 flex flex-col items-center">
                {/* Back Link */}
                <Link
                    href="/"
                    className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    홈으로 돌아가기
                </Link>

                {/* Login Card */}
                <div className="w-full max-w-md animate-fade-in">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_hsl(180_100%_50%/0.3)]">
                            <span className="font-display font-bold text-primary-foreground text-xl">V</span>
                        </div>
                        <h1 className="font-display text-2xl font-bold mb-2">다시 오신 것을 환영합니다!</h1>
                        <p className="text-muted-foreground">계정에 로그인하여 아바타 여행을 계속하세요.</p>
                    </div>

                    <div className="p-8 rounded-2xl glass border border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <form onSubmit={handleLogin} className="space-y-6 relative">
                            <div className="space-y-2">
                                <Label htmlFor="email">이메일</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="hello@example.com"
                                        className="pl-10 bg-background/50 border-white/10 focus:border-primary/50"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">비밀번호</Label>
                                    <Link href="/find-password" className="text-xs text-primary hover:text-primary/80">
                                        비밀번호를 잊으셨나요?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 bg-background/50 border-white/10 focus:border-primary/50"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" variant="glow" className="w-full h-11" disabled={loading}>
                                {loading ? "로그인 중..." : "로그인"}
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

                            {/* Creator Login Test Button */}
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full mt-4 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400"
                                onClick={() => router.push("/creator/dashboard")}
                            >
                                크리에이터 로그인 (테스트)
                            </Button>

                        </form>
                    </div>

                    <p className="text-center mt-6 text-sm text-muted-foreground">
                        계정이 없으신가요?{" "}
                        <Link href="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
                            회원가입하기
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
