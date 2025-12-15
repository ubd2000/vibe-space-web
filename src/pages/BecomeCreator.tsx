import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, DollarSign, Globe, Zap, Shield, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

const BecomeCreator = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-16">
                {/* Hero Section */}
                <section className="relative py-28 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 -z-10" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
                            당신의 <span className="gradient-text">상상력</span>을<br />
                            현실의 <span className="text-primary">수익</span>으로
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                            VirtuMall은 전 세계 수백만 명의 사용자가 당신의 아바타와 아이템을 기다리고 있는 공간입니다.
                            지금 바로 크리에이터로 등록하고 창작의 가치를 인정받으세요.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button variant="glow" size="lg" className="text-lg px-8 h-14">
                                크리에이터 시작하기 <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                            <Link to="/marketplace">
                                <Button variant="outline" size="lg" className="text-lg px-8 h-14 bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10">
                                    다른 작품 둘러보기
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            <div>
                                <p className="text-4xl font-bold text-white mb-2">10M+</p>
                                <p className="text-muted-foreground">월간 활성 사용자</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-white mb-2">$500M+</p>
                                <p className="text-muted-foreground">누적 크리에이터 수익</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-white mb-2">Top 1%</p>
                                <p className="text-muted-foreground">업계 최고의 수익 배분율</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24 relative">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">왜 VirtuMall인가요?</h2>
                            <p className="text-muted-foreground text-lg">
                                창작에만 집중하세요. 나머지는 저희가 해결해 드립니다.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Globe className="w-10 h-10 text-blue-500" />}
                                title="글로벌 마켓플레이스"
                                description="전 세계 어디서든 당신의 작품을 구매할 수 있습니다. 언어와 환율 걱정 없이 판매하세요."
                            />
                            <FeatureCard
                                icon={<Zap className="w-10 h-10 text-yellow-500" />}
                                title="즉각적인 정산"
                                description="복잡한 정산 절차 없이, 판매 즉시 수익을 확인하고 빠르게 인출할 수 있습니다."
                            />
                            <FeatureCard
                                icon={<Shield className="w-10 h-10 text-green-500" />}
                                title="저작권 보호"
                                description="블록체인 기술을 활용한 NFT 인증으로 당신의 창작물에 대한 소유권을 완벽하게 보호합니다."
                            />
                            <FeatureCard
                                icon={<BarChart className="w-10 h-10 text-purple-500" />}
                                title="상세한 분석 데이터"
                                description="어떤 아이템이 인기 있는지, 누가 구매하는지 실시간 데이터를 통해 인사이트를 얻으세요."
                            />
                            <FeatureCard
                                icon={<DollarSign className="w-10 h-10 text-emerald-500" />}
                                title="최저 수수료"
                                description="업계 최저 수준의 수수료로 크리에이터에게 더 많은 수익이 돌아가도록 보장합니다."
                            />
                            <FeatureCard
                                icon={<ArrowRight className="w-10 h-10 text-pink-500" />}
                                title="쉬운 시작"
                                description="복잡한 심사 과정 없이, 포트폴리오만 있다면 누구나 즉시 판매를 시작할 수 있습니다."
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 -z-10" />
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold mb-6">지금 바로 시작하세요</h2>
                        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                            당신의 아이디어가 수익이 되는 순간, VirtuMall에서 경험해보세요.
                            <br />첫 번째 아이템 등록까지 5분이면 충분합니다.
                        </p>
                        <Button variant="glow" size="lg" className="text-xl px-12 py-8 rounded-full shadow-2xl shadow-primary/20">
                            무료로 크리에이터 등록하기
                        </Button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 group">
        <div className="mb-6 p-4 rounded-full bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">
            {description}
        </p>
    </div>
);

export default BecomeCreator;
