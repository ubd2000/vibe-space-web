'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import {
    Heart,
    Share2,
    ShoppingCart,
    Star,
    ChevronLeft,
    ChevronRight,
    Award,
    Shield,
    Check,
    User,
    ThumbsUp,
    Box,
    Eye,
    Image as ImageIcon
} from "lucide-react";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Asset imports (Assuming these are still valid, or need simple replacement if in public)
// In Next.js, static assets are better in /public, but imports work if configured.
import heroAvatar from "@/assets/hero-avatar.png";
import avatarDetail1 from "@/assets/avatar-detail-1.png";
import avatarDetail2 from "@/assets/avatar-detail-2.png";
import avatarDetail3 from "@/assets/avatar-detail-3.png";
import avatar1 from "@/assets/avatar-1.png";

const AvatarDetailPage = () => {
    const params = useParams(); // Next.js useParams returns object
    const id = params?.id as string;
    const router = useRouter();
    const { add } = useCart();

    // State for product data
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const [selectedImage, setSelectedImage] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [show3D, setShow3D] = useState(false);

    // Import ProductService
    const { ProductService } = require("@/services/product.service");

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                setLoading(true);
                // Try to fetch from API
                // Note: If ID is "1", "2" etc from mocks, backend might not have them if using auto-increment sequence starting from 1 but different data.
                // We will try fetching.
                const data = await ProductService.getById(id);
                setProduct(data);
            } catch (error) {
                console.error("Failed to load product:", error);
                // If API fails (e.g. 404 for mock IDs), we might want to keep using mock data for demo purposes?
                // For now, let's assume we want to show API data.
                // But since user might use mock IDs from main page (if main page still used mock ids - oh wait main page uses real IDs now), 
                // we should expect real IDs.
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    // Dynamic import for model-viewer to avoid SSR issues
    useEffect(() => {
        import("@google/model-viewer").catch(console.error);
    }, []);

    // Mock data - in real app this would come from API
    // Fallback/Default data structure if product is loading or mapped
    const avatar = product ? {
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: `₩${product.price.toLocaleString()}`,
        originalPrice: product.originalPrice ? `₩${product.originalPrice.toLocaleString()}` : undefined,
        discount: product.discount || 0,
        likes: product.sales || 0, // Mock likes with sales
        views: product.reviewCount * 10, // Mock
        sales: product.sales,
        rating: product.rating,
        reviewCount: product.reviewCount,
        images: product.images && product.images.length > 0 ? product.images : [heroAvatar],
        category: product.category?.name || "미분류",
        tags: product.tags || [],
        features: [
            "Live2D 리깅 완료", // Mock features
            "표정 12종 포함",
            "기본 모션 8종"
        ],
        formats: ["PSD", "PNG"], // Mock
        creator: {
            name: product.creator?.name || "알 수 없음",
            avatar: product.creator?.avatar || avatar1,
            followers: 0, // Missing in product list response usually
            totalSales: 0,
            rating: 5.0,
            verified: true,
            description: "크리에이터 소개가 없습니다."
        },
        detailedDescription: product.description // Use simple description for now
    } : null;

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin text-primary">로딩 중...</div></div>;
    }

    if (!avatar) {
        return <div className="min-h-screen flex items-center justify-center">상품을 찾을 수 없습니다.</div>;
    }

    const reviews = [
        { id: 1, user: "HappyVTuber", rating: 5, date: "2024-01-15", content: "정말 퀄리티가 높아요! 리깅도 완벽하고 표정도 다양해서 만족합니다.", helpful: 23 },
        { id: 2, user: "StreamerKim", rating: 5, date: "2024-01-10", content: "구매 후 바로 사용할 수 있어서 좋았어요. 색감이 예뻐요!", helpful: 15 },
        { id: 3, user: "NewDebut", rating: 4, date: "2024-01-05", content: "전체적으로 만족하지만 모션이 조금 더 다양했으면 좋겠어요.", helpful: 8 },
        { id: 4, user: "ArtLover99", rating: 5, date: "2023-12-28", content: "PSD 파일까지 제공해주셔서 커스터마이징하기 좋아요!", helpful: 31 },
    ];

    const relatedAvatars = [
        { id: "2", name: "루나 엘프", image: avatarDetail1, price: "₩35,000", creator: "MoonArtist" },
        { id: "3", name: "사이버 워리어", image: avatarDetail2, price: "₩55,000", creator: "TechCreator" },
        { id: "4", name: "핑크 캣걸", image: avatarDetail3, price: "₩30,000", creator: "KawaiiDev" },
    ];

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % avatar.images.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + avatar.images.length) % avatar.images.length);
    };

    // Helper function to parse price string
    const parsePrice = (priceString: string): number => {
        return parseInt(priceString.replace(/[₩,]/g, ''));
    };

    // Handle add to cart
    const handleAddToCart = () => {
        const success = add({
            id: avatar.id,
            name: avatar.name,
            image: avatar.images[0].src, // Next.js Image object has src property
            price: parsePrice(avatar.price),
            originalPrice: avatar.originalPrice ? parsePrice(avatar.originalPrice) : undefined,
            creator: avatar.creator.name,
            category: avatar.category,
        });

        if (success) {
            toast.success("장바구니에 추가되었습니다", {
                description: `${avatar.name}이(가) 장바구니에 추가되었습니다`,
                action: {
                    label: "장바구니 보기",
                    onClick: () => router.push("/cart"),
                },
            });
        } else {
            toast.info("이미 장바구니에 있습니다", {
                description: "장바구니에서 확인해주세요",
                action: {
                    label: "장바구니 보기",
                    onClick: () => router.push("/cart"),
                },
            });
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-20 pb-16">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in">
                        <Link href="/" className="hover:text-primary transition-colors">홈</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/marketplace" className="hover:text-primary transition-colors">마켓플레이스</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground">{avatar.name}</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Image Gallery */}
                        <div className="space-y-4 animate-fade-in">
                            {/* Main Image */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden glass group">
                                {/* 3D Model Viewer or Image */}
                                {show3D ? (
                                    // @ts-ignore - Web Component
                                    <model-viewer
                                        src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
                                        poster={avatar.images[0].src}
                                        alt={`3D model of ${avatar.name}`}
                                        camera-controls
                                        auto-rotate
                                        style={{ width: "100%", height: "100%", backgroundColor: "var(--background)" }}
                                    />
                                ) : (
                                    <Image
                                        src={avatar.images[selectedImage]}
                                        alt={avatar.name}
                                        className="w-full h-full object-cover"
                                        fill
                                        priority
                                    />
                                )}

                                {/* View Toggle Button - Top Right */}
                                <button
                                    onClick={() => setShow3D(!show3D)}
                                    className="absolute top-4 right-4 z-10 px-4 py-2 rounded-full glass hover:bg-primary/20 transition-colors flex items-center gap-2 font-medium text-sm"
                                >
                                    {show3D ? (
                                        <>
                                            <ImageIcon className="w-4 h-4" />
                                            2D 보기
                                        </>
                                    ) : (
                                        <>
                                            <Box className="w-4 h-4" />
                                            3D 보기
                                        </>
                                    )}
                                </button>

                                {/* Navigation Arrows (Only show in 2D mode) */}
                                {!show3D && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted/50 z-20"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted/50 z-20"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}

                                {/* Discount Badge */}
                                {avatar.discount && !show3D && (
                                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm font-semibold z-10">
                                        -{avatar.discount}%
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-3">
                                {avatar.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${selectedImage === index
                                            ? "ring-2 ring-primary shadow-[0_0_15px_hsl(180_100%_50%/0.4)]"
                                            : "opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <Image src={img} alt="" className="object-cover" fill />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                            {/* Category & Tags */}
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/20 text-primary">
                                    {avatar.category}
                                </span>
                                {avatar.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 rounded-full text-sm bg-muted text-muted-foreground">
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                                {avatar.name}
                            </h1>

                            {/* Stats */}
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <span className="font-semibold text-foreground">{avatar.rating}</span>
                                    <span className="text-muted-foreground">({avatar.reviewCount} 리뷰)</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Heart className="w-4 h-4" />
                                    <span>{avatar.likes.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Eye className="w-4 h-4" />
                                    <span>{avatar.views.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Check className="w-4 h-4" />
                                    <span>{avatar.sales} 판매</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-3">
                                <span className="font-display text-4xl font-bold text-primary">{avatar.price}</span>
                                {avatar.originalPrice && (
                                    <span className="text-xl text-muted-foreground line-through">{avatar.originalPrice}</span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-muted-foreground leading-relaxed">
                                {avatar.description}
                            </p>

                            {/* Features */}
                            <div className="p-4 rounded-xl glass">
                                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-primary" />
                                    포함 내용
                                </h3>
                                <ul className="space-y-2">
                                    {avatar.features.map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Check className="w-4 h-4 text-primary" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Formats */}
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-muted-foreground">파일 형식:</span>
                                {avatar.formats.map((format) => (
                                    <span key={format} className="px-2 py-1 rounded bg-muted text-xs font-medium text-foreground">
                                        {format}
                                    </span>
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button variant="hero" size="xl" className="flex-1" onClick={handleAddToCart}>
                                    <ShoppingCart className="w-5 h-5" />
                                    장바구니에 추가
                                </Button>
                                <Button
                                    variant="glass"
                                    size="xl"
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={isLiked ? "text-accent" : ""}
                                >
                                    <Heart className={`w-5 h-5 ${isLiked ? "fill-accent" : ""}`} />
                                </Button>
                                <Button variant="glass" size="xl">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Creator Card */}
                            <div className="p-5 rounded-xl glass">
                                <div className="flex items-center gap-4">
                                    <div className="relative h-14 w-14">
                                        <Image
                                            src={avatar.creator.avatar}
                                            alt={avatar.creator.name}
                                            className="rounded-full ring-2 ring-primary/50 object-cover"
                                            fill
                                        />
                                        {avatar.creator.verified && (
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                                <Award className="w-3 h-3 text-primary-foreground" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-display font-semibold text-foreground">{avatar.creator.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            팔로워 {avatar.creator.followers.toLocaleString()} · 판매 {avatar.creator.totalSales}
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        팔로우
                                    </Button>
                                </div>
                                <p className="mt-3 text-sm text-muted-foreground">
                                    {avatar.creator.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Description Section (User Editor Content) */}
                    <section className="mt-16 animate-fade-in space-y-6">
                        <h2 className="font-display text-2xl font-bold text-foreground border-b border-border pb-4">
                            상품 정보
                        </h2>
                        <div
                            className="prose prose-invert max-w-none glass p-8 rounded-2xl"
                            data-color-mode="dark"
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(avatar.detailedDescription, {
                                    USE_PROFILES: { html: true },
                                    ADD_ATTR: ['target'],
                                })
                            }}
                        />
                    </section>

                    {/* Reviews Section */}
                    <section className="mt-16 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-display text-2xl font-bold text-foreground">
                                리뷰 <span className="text-primary">({avatar.reviewCount})</span>
                            </h2>
                            <Button variant="outline">리뷰 작성</Button>
                        </div>

                        {/* Rating Summary */}
                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            <div className="p-6 rounded-xl glass text-center">
                                <div className="font-display text-5xl font-bold text-primary mb-2">{avatar.rating}</div>
                                <div className="flex justify-center gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-5 h-5 ${star <= Math.round(avatar.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground">{avatar.reviewCount}개의 리뷰</p>
                            </div>

                            <div className="md:col-span-3 p-6 rounded-xl glass">
                                {[5, 4, 3, 2, 1].map((rating) => {
                                    const count = reviews.filter(r => r.rating === rating).length;
                                    const percentage = (count / reviews.length) * 100;
                                    return (
                                        <div key={rating} className="flex items-center gap-3 mb-2">
                                            <span className="text-sm text-muted-foreground w-8">{rating}점</span>
                                            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-muted-foreground w-8">{count}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Review List */}
                        <div className="space-y-4">
                            {reviews.map((review, index) => (
                                <div
                                    key={review.id}
                                    className="p-5 rounded-xl glass animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                                <User className="w-5 h-5 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground">{review.user}</p>
                                                <p className="text-xs text-muted-foreground">{review.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-4 h-4 ${star <= review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground mb-3">{review.content}</p>
                                    <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                        <ThumbsUp className="w-4 h-4" />
                                        도움이 됨 ({review.helpful})
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-6">
                            <Button variant="outline">더 많은 리뷰 보기</Button>
                        </div>
                    </section>

                    {/* Related Avatars */}
                    <section className="mt-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                        <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                            비슷한 아바타
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {relatedAvatars.map((item, index) => (
                                <Link
                                    key={item.id}
                                    href={`/avatar/${item.id}`}
                                    className="group rounded-2xl overflow-hidden glass hover:scale-105 transition-all duration-500 block"
                                >
                                    <div className="aspect-square overflow-hidden relative">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            fill
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-display font-semibold text-foreground">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">by {item.creator}</p>
                                        <p className="font-display font-bold text-primary">{item.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AvatarDetailPage;
