"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Users, UserMinus, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { SocialService } from "@/services/social.service";

export default function BuyerFollowingPage() {
    const { user } = useAuth();
    const [following, setFollowing] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchFollowing = async () => {
            try {
                const data = await SocialService.getFollowing(user.id);
                setFollowing(data);
            } catch (error) {
                console.error("Failed to fetch following:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFollowing();
    }, [user]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="h-full flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Users className="w-8 h-8 text-purple-500" />
                    팔로우 목록
                </h1>
                <span className="text-muted-foreground">{following.length}명 팔로우 중</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {following.map((user) => (
                    <div key={user.id} className="bg-glass rounded-xl border border-white/10 p-6 flex flex-col gap-4 hover:border-purple-500/30 transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-muted overflow-hidden border-2 border-white/10">
                                    <img src={user.avatarUrl || '/hero-avatar.png'} alt={user.fullName || user.username} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{user.fullName || user.username}</h3>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        {/* Mock stats for now since user response might not have it */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
                            {user.bio || "소개글이 없습니다."}
                        </p>

                        <div className="flex gap-2 mt-auto pt-4 border-t border-white/10">
                            <Button variant="outline" className="flex-1 gap-2 border-red-500/20 text-red-400 hover:text-red-500 hover:bg-red-500/10">
                                <UserMinus className="w-4 h-4" /> 언팔로우
                            </Button>
                            <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                                프로필 방문
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {following.length === 0 && (
                <div className="flex flex-col items-center justify-center p-20 text-center bg-glass rounded-xl border border-white/10 h-[400px]">
                    <Users className="w-16 h-16 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">팔로우한 사용자가 없습니다.</p>
                </div>
            )}
        </div>
    );
}
