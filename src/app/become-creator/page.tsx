'use client';

import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, DollarSign, Globe, Zap, Shield, BarChart, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";

export default function BecomeCreatorPage() {
    const [step, setStep] = useState<"landing" | "form">("landing");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Mock API call
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("크리에이터 신청이 완료되었습니다! 심사 결과는 메일로 안내됩니다.");
            // Reset or redirect could go here
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-16">
                {step === "landing" ? (
                    <>
                        {/* Hero Section */}
                        <section className="relative py-32 overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 -z-10" />
                            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
                            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

                            <div className="container mx-auto px-4 text-center">
                                <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium mb-6 animate-fade-in">
                                    🚀 크리에이터 사전 등록 진행 중
                                </span>
                                <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 tracking-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
                                    당신의 <span className="gradient-text">상상력</span>을<br />
                                    <span className="text-primary">수익</span>으로 만드세요
                                </h1>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
                                    Vibe Space는 당신의 3D 모델, 아바타, 그리고 일러스트를 기다리는 전 세계 팬들과 만나는 공간입니다.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                                    <Button
                                        variant="glow"
                                        size="lg"
                                        className="text-lg px-8 h-14"
                                        onClick={() => setStep("form")}
                                    >
                                        무료로 시작하기 <ArrowRight className="ml-2 w-5 h-5" />
                                    </Button>
                                    <Link href="/marketplace">
                                        <Button variant="outline" size="lg" className="text-lg px-8 h-14 border-primary/20 hover:bg-primary/10">
                                            마켓플레이스 둘러보기
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </section>

                        {/* Stats Section */}
                        <section className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm">
                            <div className="container mx-auto px-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                                    <StatItem value="10M+" label="월간 활성 사용자" />
                                    <StatItem value="$500M+" label="누적 크리에이터 수익" />
                                    <StatItem value="70%" label="업계 최고 수익 배분율" />
                                </div>
                            </div>
                        </section>

                        {/* Why Join Us */}
                        <section className="py-24 relative">
                            <div className="container mx-auto px-4">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">왜 Vibe Space인가요?</h2>
                                    <p className="text-muted-foreground text-lg">
                                        창작에만 집중하세요. 나머지는 저희가 해결해 드립니다.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <FeatureCard
                                        icon={<Globe className="w-8 h-8 text-blue-500" />}
                                        title="글로벌 마켓플레이스"
                                        description="전 세계 어디서든 당신의 작품을 구매할 수 있습니다. 언어와 환율 걱정 없이 판매하세요."
                                    />
                                    <FeatureCard
                                        icon={<Zap className="w-8 h-8 text-yellow-500" />}
                                        title="즉각적인 정산"
                                        description="복잡한 절차 없이, 판매 즉시 수익을 확인하고 월 1회 자동으로 정산받으세요."
                                    />
                                    <FeatureCard
                                        icon={<Shield className="w-8 h-8 text-green-500" />}
                                        title="저작권 보호"
                                        description="블록체인 기술을 활용한 NFT 인증으로 당신의 창작물에 대한 소유권을 완벽하게 보호합니다."
                                    />
                                </div>
                            </div>
                        </section>

                        {/* How it Works */}
                        <section className="py-24 bg-secondary/5">
                            <div className="container mx-auto px-4">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">활동 방법</h2>
                                </div>
                                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                    <StepCard step="01" title="크리에이터 신청" desc="간단한 양식을 작성하여 크리에이터 권한을 신청합니다." />
                                    <StepCard step="02" title="포트폴리오 심사" desc="제출하신 포트폴리오를 바탕으로 24시간 내 심사가 진행됩니다." />
                                    <StepCard step="03" title="판매 시작" desc="샵을 개설하고 당신의 멋진 아이템을 전 세계에 판매하세요." />
                                </div>
                            </div>
                        </section>

                        {/* Bottom CTA */}
                        <section className="py-32 relative overflow-hidden text-center">
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent -z-10" />
                            <h2 className="text-4xl font-bold mb-6 font-display">준비 되셨나요?</h2>
                            <Button
                                variant="glow"
                                size="lg"
                                className="text-xl px-12 py-8 rounded-full shadow-2xl shadow-primary/20"
                                onClick={() => setStep("form")}
                            >
                                크리에이터 신청하기
                            </Button>
                        </section>
                    </>
                ) : (
                    /* Creator Application Form Section */
                    <section className="py-20 animate-fade-in">
                        <div className="container mx-auto px-4 max-w-2xl">
                            <div className="mb-10 text-center">
                                <h1 className="text-3xl font-bold font-display mb-2">크리에이터 신청서</h1>
                                <p className="text-muted-foreground">당신의 재능을 보여주세요. 심사는 보통 24시간 이내에 완료됩니다.</p>
                            </div>

                            <div className="bg-glass border border-white/10 rounded-2xl p-8 shadow-2xl">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="nickname" className="text-base">활동명 (닉네임)</Label>
                                        <Input id="nickname" placeholder="브랜드나 샵 이름으로 사용됩니다." className="bg-background/50 h-12" required />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="portfolio" className="text-base">포트폴리오 링크</Label>
                                        <Input id="portfolio" placeholder="ArtStation, Behance, Instagram 등 URL" className="bg-background/50 h-12" required />
                                        <p className="text-xs text-muted-foreground">작업물을 확인할 수 있는 링크를 입력해주세요.</p>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="introduction" className="text-base">소개글</Label>
                                        <Textarea
                                            id="introduction"
                                            placeholder="어떤 스타일의 에셋을 제작하시나요? (예: VRChat 아바타, 게임용 3D 모델, 2D 캐릭터 일러스트 등)"
                                            className="bg-background/50 min-h-[150px] resize-none"
                                            required
                                        />
                                    </div>

                                    <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
                                        <Checkbox id="terms" required className="mt-1" />
                                        <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                                            (필수) Vibe Space 크리에이터 이용약관 및 판매자 정책에 동의합니다.
                                            판매 수익의 70%는 크리에이터에게 정산되며, 저작권 침해 시 계정이 정지될 수 있습니다.
                                        </Label>
                                    </div>

                                    <div className="pt-4 flex gap-4">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="flex-1 h-12"
                                            onClick={() => setStep("landing")}
                                        >
                                            취소
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="glow"
                                            className="flex-1 h-12"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                    제출 중...
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-2">
                                                    신청서 제출 <CheckCircle className="w-4 h-4" />
                                                </span>
                                            )}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </div>
    );
}

// Components for Landing Page
const StatItem = ({ value, label }: { value: string, label: string }) => (
    <div>
        <p className="text-4xl font-bold text-white mb-2 font-display">{value}</p>
        <p className="text-muted-foreground">{label}</p>
    </div>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 group text-left">
        <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300 border border-white/5">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
            {description}
        </p>
    </div>
);

const StepCard = ({ step, title, desc }: { step: string, title: string, desc: string }) => (
    <div className="relative p-8 rounded-2xl border border-white/10 bg-background/50 hover:bg-background/80 transition-colors">
        <span className="text-6xl font-bold text-white/5 absolute top-4 right-4">{step}</span>
        <h3 className="text-xl font-bold mb-3 relative z-10">{title}</h3>
        <p className="text-muted-foreground relative z-10 text-sm">{desc}</p>
    </div>
);
