"use client";

import { Button } from "@/components/ui/button";
import { Users, UserMinus, Star } from "lucide-react";

// Mock Data for Following
const MOCK_FOLLOWING = [
    {
        id: "CREATOR-001",
        name: "NeonStudio",
        description: "사이버펑크 스타일 전문 아바타 크리에이터입니다.",
        followers: "12.5K",
        items: 45,
        rating: 4.9,
        avatar: "/avatar-detail-1.png",
        tags: ["Cyberpunk", "Sci-Fi"]
    },
    {
        id: "CREATOR-002",
        name: "PinkRibbon",
        description: "귀엽고 사랑스러운 의상을 만듭니다.",
        followers: "8.2K",
        items: 32,
        rating: 4.8,
        avatar: "/avatar-detail-2.png",
        tags: ["Cute", "Fashion"]
    },
    {
        id: "CREATOR-003",
        name: "VRC_Master",
        description: "유니티 쉐이더 및 파티클 장인",
        followers: "5.1K",
        items: 18,
        rating: 5.0,
        avatar: "/avatar-detail-3.png",
        tags: ["Unity", "Shader"]
    }
];

export default function BuyerFollowingPage() {
    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Users className="w-8 h-8 text-purple-500" />
                    팔로우 목록
                </h1>
                <span className="text-muted-foreground">{MOCK_FOLLOWING.length}명 팔로우 중</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_FOLLOWING.map((creator) => (
                    <div key={creator.id} className="bg-glass rounded-xl border border-white/10 p-6 flex flex-col gap-4 hover:border-purple-500/30 transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-muted overflow-hidden border-2 border-white/10">
                                    <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{creator.name}</h3>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <span>팔로워 {creator.followers}</span>
                                        <span>•</span>
                                        <div className="flex items-center gap-0.5 text-yellow-500">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span>{creator.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                            {creator.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-2">
                            {creator.tags.map(tag => (
                                <span key={tag} className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-xs border border-purple-500/20">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-2 mt-auto pt-4 border-t border-white/10">
                            <Button variant="outline" className="flex-1 gap-2 border-red-500/20 text-red-400 hover:text-red-500 hover:bg-red-500/10">
                                <UserMinus className="w-4 h-4" /> 언팔로우
                            </Button>
                            <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                                샵 방문
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {MOCK_FOLLOWING.length === 0 && (
                <div className="flex flex-col items-center justify-center p-20 text-center bg-glass rounded-xl border border-white/10 h-[400px]">
                    <Users className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">팔로우한 크리에이터가 없습니다.</p>
                </div>
            )}
        </div>
    );
}
