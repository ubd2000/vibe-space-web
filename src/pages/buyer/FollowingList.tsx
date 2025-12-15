import { Button } from "@/components/ui/button";
import { UserCheck, Star } from "lucide-react";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";

// Mock Data
const following = [
    {
        id: 1,
        name: "PixelMaster",
        avatar: avatar1,
        bio: "5년차 버츄얼 아바타 전문 크리에이터",
        followers: "12.5k",
        items: 42
    },
    {
        id: 2,
        name: "V-Artist_Luna",
        avatar: avatar2,
        bio: "몽환적인 스타일의 VRChat 퍼블릭 아바타를 제작합니다.",
        followers: "8.2k",
        items: 15
    },
    {
        id: 3,
        name: "MechaDesignLab",
        avatar: null,
        bio: "하드 서넙스 메카닉 모델링 전문",
        followers: "3.4k",
        items: 28
    }
];

const FollowingList = () => {
    return (
        <div className="min-h-full space-y-8 animate-fade-in">
            <div className="mb-8">
                <h1 className="text-2xl font-bold font-display mb-1">팔로우 목록</h1>
                <p className="text-muted-foreground text-sm">구독 중인 크리에이터의 새 소식을 받아보세요.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {following.map((creator) => (
                    <div key={creator.id} className="p-5 rounded-xl glass border border-white/5 flex items-center gap-4 hover:border-primary/30 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-secondary/10 overflow-hidden flex-shrink-0">
                            {creator.avatar ? (
                                <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-xl">
                                    {creator.name[0]}
                                </div>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display font-bold truncate">{creator.name}</h3>
                                <span className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-medium">PRO</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1 mb-2">{creator.bio}</p>
                            <div className="flex gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1"><UserCheck className="w-3 h-3" /> {creator.followers}</span>
                                <span className="flex items-center gap-1"><Star className="w-3 h-3" /> {creator.items} Items</span>
                            </div>
                        </div>

                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-400 hover:bg-red-400/10">
                            언팔로우
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FollowingList;
