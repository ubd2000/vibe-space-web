import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import heroAvatar from "@/assets/hero-avatar.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[200px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
              <span className="text-muted-foreground">3D 에셋 & 2D 일러스트 마켓</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-foreground">상상 속의</span>
              <br />
              <span className="gradient-text">모든 바이브</span>
              <br />
              <span className="text-foreground">를 현실로</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              고퀄리티 3D 모델, VRChat 아바타부터 유니크한 2D 일러스트까지.
              크리에이터의 감각적인 에셋을 발견하고 나만의 공간을 채워보세요.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/marketplace">
                <Button variant="hero" size="xl">
                  <Sparkles className="w-5 h-5" />
                  마켓 둘러보기
                </Button>
              </Link>
              <Link href="/become-creator">
                <Button variant="glass" size="xl">
                  크리에이터 되기
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 justify-center lg:justify-start pt-6">
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground">3D 모델</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-secondary">5K+</p>
                <p className="text-sm text-muted-foreground">일러스트</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-accent">50K+</p>
                <p className="text-sm text-muted-foreground">회원</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30 rounded-3xl blur-3xl" />
              <Image
                src={heroAvatar}
                alt="Virtual Avatar"
                width={600}
                height={600}
                priority
                className="relative w-full max-w-lg animate-float drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-xs">아래로 스크롤</span>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
