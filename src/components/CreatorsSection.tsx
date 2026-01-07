import { Star, Award, Users, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import { useEffect, useState } from "react";
import { Creator, CreatorService } from "@/services/creator.service";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

interface CreatorCardProps {
  id: number | string;
  avatar: string | StaticImageData;
  name: string;
  tags: string[];
  followers: number;
  sales: number;
  rating: number;
  verified: boolean;
  index: number;
}

const CreatorCard = ({ id, avatar, name, tags, followers, sales, rating, verified, index }: CreatorCardProps) => {
  const router = useRouter();

  const handleFollow = (e: React.MouseEvent) => {
    e.preventDefault();
    const user = authService.getCurrentUser();
    if (!user) {
      if (confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")) {
        router.push("/login?returnUrl=/");
      }
      return;
    }
    // TODO: Call API to toggle follow
    alert(`${name}님을 팔로우했습니다!`);
  };

  return (
    <div
      className="group p-6 rounded-2xl glass hover:shadow-[0_0_40px_hsl(180_100%_50%/0.2)] transition-all duration-500 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <Image
            src={avatar}
            alt={name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/50"
          />
          {verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <Award className="w-3 h-3 text-primary-foreground" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">{name}</h3>
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div>
          <p className="font-display font-bold text-primary">{followers.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">팔로워</p>
        </div>
        <div>
          <p className="font-display font-bold text-secondary">{sales}</p>
          <p className="text-xs text-muted-foreground">판매</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="font-display font-bold text-accent">{rating}</span>
          </div>
          <p className="text-xs text-muted-foreground">평점</p>
        </div>
      </div>

      <Link href={`/creators/${id}`}>
        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          프로필 보기
        </Button>
      </Link>
    </div>
  );
};

const CreatorsSection = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const data = await CreatorService.getTopFollowers();
        setCreators(data);
      } catch (error) {
        console.error("Failed to fetch creators:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  return (
    <section id="creators" className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-[100px]" />
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">인기 </span>
            <span className="gradient-text">크리에이터</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            뛰어난 아바타를 만드는 최고의 크리에이터들을 만나보세요
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creators.map((creator, index) => (
              <CreatorCard
                key={creator.id}
                id={creator.id}
                avatar={creator.avatarUrl || avatar1} // Fallback image
                name={creator.displayName}
                tags={["Creator"]} // Backend doesn't strictly return tags yet, mock it or add field
                followers={creator.stats.followers}
                sales={creator.stats.totalSales}
                rating={creator.stats.rating}
                verified={creator.verified}
                index={index}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl glass">
            <Users className="w-10 h-10 text-primary" />
            <div className="text-left">
              <p className="font-display font-semibold text-foreground">크리에이터가 되어보세요</p>
              <p className="text-sm text-muted-foreground">나만의 아바타를 판매하고 수익을 창출하세요</p>
            </div>
            <Button variant="hero">시작하기</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorsSection;
