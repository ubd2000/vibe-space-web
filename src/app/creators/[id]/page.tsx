'use client';

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import {
    Heart,
    Share2,
    Star,
    Award,
    MessageCircle,
    UserPlus,
    MapPin,
    Grid,
    List,
    Filter,
    Pin,
    ThumbsUp,
    MoreHorizontal,
    Send,
    Plus
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import avatar1 from "@/assets/avatar-1.png";
import avatarDetail1 from "@/assets/avatar-detail-1.png";
import avatarDetail2 from "@/assets/avatar-detail-2.png";
import avatarDetail3 from "@/assets/avatar-detail-3.png";
import { cn } from "@/lib/utils";
import { CreatorDM } from "@/components/creator/CreatorDM";

export default function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [activeTab, setActiveTab] = useState("selling");
    const [expandedPosts, setExpandedPosts] = useState<number[]>([]);
    const [isDMOpen, setIsDMOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const toggleComments = (postId: number) => {
        setExpandedPosts(prev =>
            prev.includes(postId)
                ? prev.filter(id => id !== postId)
                : [...prev, postId]
        );
    };

    const decodedId = decodeURIComponent(id);
    const isOwner = decodedId === "me" || decodedId === "PixelMaster";

    // Mock Data
    const creator = {
        name: isOwner ? "PixelMaster" : (decodedId || "Unknown"),
        avatar: avatar1,
        coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop",
        bio: "5년차 버츄얼 아바타 전문 크리에이터입니다. 사이버펑크와 판타지 스타일을 주로 작업합니다. 커미션은 DM 주세요!",
        location: "Seoul, Korea",
        followers: 12500,
        following: 150,
        sales: 234,
        rating: 4.9,
        verified: true,
        tags: ["Live2D", "3D Modeling", "Character Design"]
    };

    const items = [
        { id: "1", name: "네온 드리머", image: avatarDetail1, price: "₩45,000", likes: 124, category: "VTuber" },
        { id: "2", name: "루나 엘프", image: avatarDetail2, price: "₩35,000", likes: 89, category: "Fantasy" },
        { id: "3", name: "사이버 워리어", image: avatarDetail3, price: "₩55,000", likes: 256, category: "Cyberpunk" },
        { id: "4", name: "핑크 캣걸", image: avatarDetail1, price: "₩30,000", likes: 45, category: "Cute" },
        { id: "5", name: "고딕 메이드", image: avatarDetail2, price: "₩40,000", likes: 112, category: "Gothic" },
        { id: "6", name: "메카닉 솔저", image: avatarDetail3, price: "₩60,000", likes: 78, category: "Sci-Fi" },
    ];

    const portfolioItems = [
        { id: 1, title: "Cyberpunk City Concept", image: "https://images.unsplash.com/photo-1615840287214-7ff58ee04896?auto=format&fit=crop&q=80&w=800", type: "Concept Art" },
        { id: 2, title: "Character Sketch - Neon", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800", type: "Sketch" },
        { id: 3, title: "3D Modeling Process", image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=800", type: "3D Model" },
        { id: 4, title: "Fantasy World Building", image: "https://images.unsplash.com/photo-1564053489984-317bbd824340?auto=format&fit=crop&q=80&w=800", type: "Environment" },
        { id: 5, title: "VTuber Rigging Demo", image: "https://images.unsplash.com/photo-1626027376326-f4044af165ba?auto=format&fit=crop&q=80&w=800", type: "Live2D" },
    ];

    const communityPosts = [
        {
            id: 1,
            author: "PixelMaster",
            isCreator: true,
            avatar: avatar1,
            date: "2024-03-15",
            content: "이번 신작 '네온 드리머' 업데이트 예정입니다! 많은 기대 부탁드려요 ✨\n#신작 #업데이트 #스포일러",
            likes: 156,
            comments: 3,
            pinned: true,
            commentList: [
                { id: 101, author: "VirtualFan", content: "너무 기대됩니다!! 얼른 나왔으면 좋겠어요", date: "2024-03-15", isCreator: false },
                { id: 102, author: "StreamerKim", content: "이번에도 퀄리티 대박이네요 ㄷㄷ", date: "2024-03-15", isCreator: false },
                { id: 103, author: "PixelMaster", content: "감사합니다! 열심히 준비 중이에요 :)", date: "2024-03-16", isCreator: true, avatar: avatar1 }
            ]
        },
        {
            id: 2,
            author: "FanUser123",
            isCreator: false,
            date: "2024-03-14",
            content: "구매한 아바타 옷 텍스처 수정 가능한가요? 혹시 가이드가 따로 있는지 궁금합니다!",
            likes: 5,
            comments: 1,
            pinned: false,
            commentList: [
                { id: 201, author: "PixelMaster", content: "네! PSD 파일 내에 색상 레이어가 분리되어 있어 쉽게 수정 가능합니다. 가이드 문서는 파일에 동봉되어 있어요 :)", date: "2024-03-14", isCreator: true, avatar: avatar1 }
            ]
        },
        {
            id: 3,
            author: "VTubeLover",
            isCreator: false,
            date: "2024-03-10",
            content: "작가님 팬이에요! 다음 작품은 언제쯤 나오나요? ㅠㅠ",
            likes: 12,
            comments: 2,
            pinned: false,
            commentList: [
                { id: 301, author: "WaitingForU", content: "저도 기다리고 있어요 ㅠㅠ", date: "2024-03-11", isCreator: false },
                { id: 302, author: "PixelMaster", content: "현재 기획 단계입니다! 조만간 소식 들려드릴게요~", date: "2024-03-12", isCreator: true, avatar: avatar1 }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pb-20">
                {/* Cover Image */}
                <div className="h-64 md:h-80 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10" />
                    <Image
                        src={creator.coverImage}
                        alt="Cover"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="container mx-auto px-4 -mt-20 relative z-20">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row items-start gap-6 mb-12">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background overflow-hidden shadow-2xl glass p-1 relative">
                                <Image
                                    src={creator.avatar}
                                    alt={creator.name}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            {creator.verified && (
                                <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-4 border-background shadow-lg">
                                    <Award className="w-4 h-4 text-primary-foreground" />
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 pt-4 md:pt-20">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">
                                        {creator.name}
                                    </h1>
                                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                        <MapPin className="w-4 h-4" />
                                        {creator.location}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button variant="hero" className="gap-2">
                                        <UserPlus className="w-4 h-4" />
                                        팔로우
                                    </Button>
                                    <Button variant="outline" className="gap-2" onClick={() => setIsDMOpen(true)}>
                                        <MessageCircle className="w-4 h-4" />
                                        메시지
                                    </Button>
                                    <Button variant="glass" size="icon">
                                        <Share2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>

                            <p className="text-foreground/80 leading-relaxed max-w-2xl mb-6">
                                {creator.bio}
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-6 p-4 rounded-xl glass inline-flex">
                                <div className="text-center">
                                    <p className="font-display font-bold text-lg text-foreground">{creator.followers.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">팔로워</p>
                                </div>
                                <div className="w-px h-10 bg-border" />
                                <div className="text-center">
                                    <p className="font-display font-bold text-lg text-foreground">{creator.following.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">팔로잉</p>
                                </div>
                                <div className="w-px h-10 bg-border" />
                                <div className="text-center">
                                    <p className="font-display font-bold text-lg text-primary">{creator.sales.toLocaleString()}</p>
                                    <p className="text-xs text-muted-foreground">총 판매</p>
                                </div>
                                <div className="w-px h-10 bg-border" />
                                <div className="text-center">
                                    <div className="flex items-center gap-1 justify-center">
                                        <span className="font-display font-bold text-lg text-yellow-500">{creator.rating}</span>
                                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">평점</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Tabs */}
                    <div className="mb-8 border-b border-border">
                        <div className="flex items-center gap-8">
                            <button
                                onClick={() => setActiveTab("selling")}
                                className={cn(
                                    "pb-4 border-b-2 font-semibold transition-colors",
                                    activeTab === "selling"
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                )}
                            >
                                판매 작품 ({items.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("portfolio")}
                                className={cn(
                                    "pb-4 border-b-2 font-semibold transition-colors",
                                    activeTab === "portfolio"
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                )}
                            >
                                포트폴리오 ({portfolioItems.length})
                            </button>
                            <button
                                onClick={() => setActiveTab("community")}
                                className={cn(
                                    "pb-4 border-b-2 font-semibold transition-colors",
                                    activeTab === "community"
                                        ? "border-primary text-primary"
                                        : "border-transparent text-muted-foreground hover:text-foreground"
                                )}
                            >
                                커뮤니티 ({communityPosts.length})
                            </button>
                        </div>
                    </div>

                    {/* Filter & Sort (Only for selling/portfolio) */}
                    {activeTab !== "community" && (
                        <div className="flex items-center justify-between mb-6">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Filter className="w-4 h-4" />
                                필터
                            </Button>
                            <div className="flex items-center gap-2 p-1 rounded-lg bg-muted/50">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={cn(
                                        "p-2 rounded transition-all",
                                        viewMode === 'grid'
                                            ? "bg-background shadow-sm text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={cn(
                                        "p-2 rounded transition-all",
                                        viewMode === 'list'
                                            ? "bg-background shadow-sm text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Grid Content */}
                    {activeTab === "selling" && (
                        <>
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
                                    {/* Add Item Button (Owner Only) */}
                                    {isOwner && (
                                        <Link href="/creator/products/new" className="group rounded-2xl overflow-hidden border-2 border-dashed border-white/10 hover:border-primary/50 flex flex-col items-center justify-center min-h-[300px] transition-all duration-300 bg-white/5 hover:bg-white/10">
                                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                <Plus className="w-8 h-8 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-foreground text-lg">새 작품 등록</h3>
                                            <p className="text-sm text-muted-foreground mt-2">판매할 에셋을 업로드하세요</p>
                                        </Link>
                                    )}
                                    {items.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/avatar/${item.id}`}
                                            className="group rounded-2xl overflow-hidden glass hover:shadow-[0_0_30px_hsl(180_100%_50%/0.15)] transition-all duration-300"
                                        >
                                            <div className="aspect-[4/3] overflow-hidden relative">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-white/20">
                                                        <Heart className="w-4 h-4 text-white" />
                                                    </button>
                                                </div>
                                                <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-xs font-medium text-white">
                                                    {item.category}
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                                                    {item.name}
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-bold text-foreground">{item.price}</span>
                                                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                                        <Heart className="w-3 h-3" />
                                                        {item.likes}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4 animate-fade-in">
                                    {/* Add Item Button (List View) */}
                                    {isOwner && (
                                        <Link href="/creator/products/new" className="block w-full p-4 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/50 transition-all duration-300 bg-white/5 hover:bg-white/10 text-center cursor-pointer">
                                            <div className="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary">
                                                <Plus className="w-5 h-5" />
                                                <span className="font-semibold">새 작품 등록하기</span>
                                            </div>
                                        </Link>
                                    )}
                                    {items.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/avatar/${item.id}`}
                                            className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl glass hover:bg-muted/40 transition-all duration-300 group"
                                        >
                                            <div className="relative w-full sm:w-48 aspect-[4/3] rounded-lg overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-medium text-white">
                                                    {item.category}
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <div className="flex items-start justify-between">
                                                        <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
                                                            {item.name}
                                                        </h3>
                                                        <button className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center -mr-2">
                                                            <Heart className="w-4 h-4 text-muted-foreground hover:text-red-500 transition-colors" />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                                        이 작품은 크리에이터의 독창적인 감각이 돋보이는 3D 에셋입니다. 다양한 표정과 모션이 포함되어 있으며, VRChat 및 게임 엔진에서 즉시 사용 가능합니다.
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className="font-display font-bold text-xl text-primary">{item.price}</span>
                                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Heart className="w-4 h-4" />
                                                            {item.likes}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <MessageCircle className="w-4 h-4" />
                                                            12
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === "portfolio" && (
                        <>
                            {viewMode === 'grid' ? (
                                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 animate-fade-in">
                                    {/* Add Portfolio Button (Owner Only) */}
                                    {isOwner && (
                                        <Link href="/creator/portfolio/new" className="break-inside-avoid rounded-2xl overflow-hidden border-2 border-dashed border-white/10 hover:border-primary/50 p-8 flex flex-col items-center justify-center text-center transition-all duration-300 bg-white/5 hover:bg-white/10 mb-6 cursor-pointer">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                <Plus className="w-6 h-6 text-primary" />
                                            </div>
                                            <h3 className="font-semibold text-foreground">포트폴리오 추가</h3>
                                            <p className="text-sm text-muted-foreground mt-1">멋진 작업물을 공유해보세요</p>
                                        </Link>
                                    )}
                                    {portfolioItems.map((item) => (
                                        <Link
                                            href={`/portfolio/${item.id}`}
                                            key={item.id}
                                            className="break-inside-avoid rounded-2xl overflow-hidden glass hover:shadow-lg transition-all duration-300 group block"
                                        >
                                            <div className="relative w-full h-auto"> {/* Hack for Image with unknown height in masonry layout */}
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    width={0}
                                                    height={0}
                                                    sizes="100vw"
                                                    className="w-full h-auto object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-foreground">{item.title}</h3>
                                                <p className="text-sm text-primary">{item.type}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-6 animate-fade-in">
                                    {/* Add Portfolio Button (List View) */}
                                    {isOwner && (
                                        <Link href="/creator/portfolio/new" className="block w-full p-6 rounded-xl border-2 border-dashed border-white/10 hover:border-primary/50 transition-all duration-300 bg-white/5 hover:bg-white/10 text-center cursor-pointer mb-6">
                                            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground group-hover:text-primary">
                                                <Plus className="w-6 h-6" />
                                                <span className="font-semibold text-lg">새 포트폴리오 추가</span>
                                                <span className="text-sm">멋진 작업 과정을 공유해보세요</span>
                                            </div>
                                        </Link>
                                    )}
                                    {portfolioItems.map((item) => (
                                        <Link
                                            href={`/portfolio/${item.id}`}
                                            key={item.id}
                                            className="block p-6 rounded-2xl glass hover:bg-muted/40 transition-all duration-300 group"
                                        >
                                            <div className="flex flex-col md:flex-row gap-6">
                                                <div className="w-full md:w-64 aspect-video rounded-lg overflow-hidden relative flex-shrink-0">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="flex-1 flex flex-col">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-bold">
                                                            {item.type}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">2024.03.15</span>
                                                    </div>
                                                    <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-muted-foreground line-clamp-2 md:line-clamp-3 mb-4 flex-1">
                                                        작업 과정 비하인드 스토리와 사용된 툴, 그리고 구상 단계의 스케치들을 공유합니다. 이 프로젝트를 통해 어떤 영감을 받았는지 확인해보세요.
                                                    </p>

                                                    <div className="flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground mt-auto">
                                                        <div className="flex items-center gap-1 hover:text-foreground">
                                                            <ThumbsUp className="w-4 h-4" />
                                                            좋아요 45
                                                        </div>
                                                        <div className="flex items-center gap-1 hover:text-foreground">
                                                            <MessageCircle className="w-4 h-4" />
                                                            댓글 12
                                                        </div>
                                                        <div className="flex items-center gap-1 ml-auto hover:text-foreground">
                                                            <Share2 className="w-4 h-4" />
                                                            공유
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === "community" && (
                        <div className="max-w-3xl mx-auto animate-fade-in">
                            {/* Write Post Box */}
                            <div className="p-6 rounded-2xl glass mb-8">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary" />
                                    </div>
                                    <div className="flex-1">
                                        <textarea
                                            placeholder={`${creator.name}님에게 질문하거나 응원의 메시지를 남겨보세요!`}
                                            className="w-full min-h-[100px] bg-secondary/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-muted-foreground"
                                        />
                                        <div className="flex justify-end mt-3">
                                            <Button size="sm">
                                                <Send className="w-4 h-4 mr-2" />
                                                게시하기
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Posts List */}
                            <div className="space-y-6">
                                {communityPosts.map((post) => (
                                    <div key={post.id} className="p-6 rounded-2xl glass">
                                        {/* Post Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center overflow-hidden relative ${post.isCreator ? "ring-2 ring-primary" : "bg-muted"}`}>
                                                    {post.avatar ? (
                                                        <Image src={post.avatar} alt={post.author} fill className="object-cover" />
                                                    ) : (
                                                        <span className="font-bold text-muted-foreground">{post.author[0]}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-semibold text-foreground">{post.author}</p>
                                                        {post.isCreator && (
                                                            <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                                                                CREATOR
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">{post.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {post.pinned && (
                                                    <div className="flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                                                        <Pin className="w-3 h-3" />
                                                        고정됨
                                                    </div>
                                                )}
                                                <button className="text-muted-foreground hover:text-foreground">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Post Content */}
                                        <div className="mb-4">
                                            <p className="text-foreground/90 whitespace-pre-wrap">{post.content}</p>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-4 border-t border-border pt-4">
                                            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                                <ThumbsUp className="w-4 h-4" />
                                                좋아요 {post.likes}
                                            </button>
                                            <button
                                                onClick={() => toggleComments(post.id)}
                                                className={cn(
                                                    "flex items-center gap-2 text-sm transition-colors",
                                                    expandedPosts.includes(post.id) ? "text-primary" : "text-muted-foreground hover:text-primary"
                                                )}
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                댓글 {post.comments}
                                            </button>
                                            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors ml-auto">
                                                <Share2 className="w-4 h-4" />
                                                공유
                                            </button>
                                        </div>

                                        {/* Comments Section */}
                                        {expandedPosts.includes(post.id) && post.commentList && (
                                            <div className="mt-4 pt-4 border-t border-border space-y-4 animate-fade-in">
                                                {post.commentList.map((comment) => (
                                                    <div key={comment.id} className="flex gap-3">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 relative ${comment.isCreator ? "ring-1 ring-primary" : "bg-muted"}`}>
                                                            {comment.isCreator && comment.avatar ? (
                                                                <Image src={comment.avatar} alt={comment.author} fill className="object-cover" />
                                                            ) : (
                                                                <span className="font-bold text-xs text-muted-foreground">{comment.author[0]}</span>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 bg-secondary/5 rounded-2xl rounded-tl-none p-3">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-semibold text-sm text-foreground">{comment.author}</span>
                                                                {comment.isCreator && (
                                                                    <span className="px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                                                                        CREATOR
                                                                    </span>
                                                                )}
                                                                <span className="text-[10px] text-muted-foreground">{comment.date}</span>
                                                            </div>
                                                            <p className="text-sm text-foreground/90">{comment.content}</p>
                                                        </div>
                                                    </div>
                                                ))}

                                                {/* Write Comment */}
                                                <div className="flex gap-3 pt-2">
                                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary" />
                                                    </div>
                                                    <div className="flex-1 relative">
                                                        <input
                                                            type="text"
                                                            placeholder="댓글을 입력하세요..."
                                                            className="w-full h-10 bg-secondary/10 rounded-full pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
                                                        />
                                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-primary hover:bg-primary/10 transition-colors">
                                                            <Send className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
            <CreatorDM
                isOpen={isDMOpen}
                onOpenChange={setIsDMOpen}
                creatorName={creator.name}
                creatorAvatar={creator.avatar}
            />
        </div>
    );
}
