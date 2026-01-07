import { Heart, Eye, ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import { useEffect, useState } from "react";
import { Product, ProductService } from "@/services/product.service";
import { CATEGORIES } from "@/lib/constants";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

interface AvatarCardProps {
  id: number | string;
  image: string | StaticImageData;
  name: string;
  creator: string;
  price: string;
  likes: number;
  views: number;
  index: number;
}

const AvatarCard = ({ id, image, name, creator, price, likes, views, index }: AvatarCardProps) => {
  const router = useRouter();

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    const user = authService.getCurrentUser();
    if (!user) {
      if (confirm("로그인이 필요한 서비스입니다. 로그인 하시겠습니까?")) {
        router.push("/login?returnUrl=/");
      }
      return;
    }
    // TODO: Call API to toggle like
    alert("좋아요가 반영되었습니다!");
  };

  return (
    <Link
      href={`/avatar/${id}`}
      className="group relative rounded-2xl overflow-hidden glass hover:scale-105 transition-all duration-500 animate-fade-in block"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
      </div>

      {/* Like & View overlay */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
        <button
          onClick={handleLike}
          className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-black transition-colors"
          title="찜하기"
        >
          <Heart className="w-4 h-4" />
        </button>
        <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white">
          <Eye className="w-4 h-4" />
        </div>
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getActive();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ["전체", ...CATEGORIES.map(c => c.name)];

  const [visibleCount, setVisibleCount] = useState(8);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <section id="marketplace" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">트렌딩 에셋</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            3D 모델, 텍스쳐, 그리고 매력적인 2D 작품들을 만나보세요
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
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, visibleCount).map((product, index) => (
              <AvatarCard
                key={product.id}
                id={product.id}
                image={(product.images && product.images[0]) || avatar1} // Fallback image safety check
                name={product.name}
                creator={product.creator?.name || "알 수 없음"}
                price={`₩${product.price.toLocaleString()}`}
                likes={product.sales || 0} // Using sales as likes proxy for now or 0
                views={(product.reviewCount || 0) * 10} // Mock views based on reviews
                index={index}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {visibleCount < products.length && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" onClick={handleLoadMore}>
              더 많은 아바타 보기
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MarketplaceSection;
