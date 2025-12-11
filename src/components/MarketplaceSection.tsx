import { Heart, Eye, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";

interface AvatarCardProps {
  image: string;
  name: string;
  creator: string;
  price: string;
  likes: number;
  views: number;
  index: number;
}

const AvatarCard = ({ image, name, creator, price, likes, views, index }: AvatarCardProps) => {
  return (
    <Link 
      to={`/avatar/${index + 1}`}
      className="group relative rounded-2xl overflow-hidden glass hover:scale-105 transition-all duration-500 animate-fade-in block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
      </div>

      {/* Overlay Actions */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-accent/20 transition-colors">
          <Heart className="w-4 h-4 text-accent" />
        </button>
        <button className="w-9 h-9 rounded-full glass flex items-center justify-center hover:bg-primary/20 transition-colors">
          <ShoppingCart className="w-4 h-4 text-primary" />
        </button>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-display font-semibold text-lg text-foreground mb-1 truncate">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3">by {creator}</p>
        
        <div className="flex items-center justify-between">
          <span className="font-display font-bold text-primary text-lg">{price}</span>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" /> {likes}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" /> {views}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const MarketplaceSection = () => {
  const avatars = [
    { image: avatar1, name: "네온 드리머", creator: "PixelMaster", price: "₩25,000", likes: 234, views: 1250 },
    { image: avatar2, name: "루나 엘프", creator: "MoonArtist", price: "₩35,000", likes: 456, views: 2340 },
    { image: avatar3, name: "사이버 워리어", creator: "TechCreator", price: "₩45,000", likes: 312, views: 1890 },
    { image: avatar4, name: "핑크 캣걸", creator: "KawaiiDev", price: "₩30,000", likes: 567, views: 3210 },
    { image: avatar2, name: "얼음 공주", creator: "FrostArt", price: "₩40,000", likes: 289, views: 1567 },
    { image: avatar1, name: "스타 보이", creator: "GalaxyMaker", price: "₩28,000", likes: 198, views: 987 },
    { image: avatar4, name: "체리 블라썸", creator: "SakuraStudio", price: "₩32,000", likes: 421, views: 2100 },
    { image: avatar3, name: "다크 나이트", creator: "ShadowForge", price: "₩55,000", likes: 378, views: 1789 },
  ];

  const categories = ["전체", "VTuber", "게임", "판타지", "사이버펑크", "귀여움"];

  return (
    <section id="marketplace" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">인기 아바타</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            전 세계 크리에이터들이 만든 독창적인 버츄얼 아바타를 만나보세요
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category, index) => (
            <Button
              key={category}
              variant={index === 0 ? "glow" : "glass"}
              size="sm"
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {avatars.map((avatar, index) => (
            <AvatarCard key={index} {...avatar} index={index} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            더 많은 아바타 보기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceSection;
