
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Heart, Eye, MoreHorizontal, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Post {
    id: number;
    title: string;
    author: string;
    category: string;
    views: number;
    likes: number;
    comments: number;
    date: string;
    image?: string; // For showcase
    contentPreview?: string;
}

// Inline mock data for simplicity in this step
const allPosts: Post[] = [
    { id: 1, category: "free", title: "오늘 날씨가 정말 좋네요! 다들 뭐하시나요?", author: "VTubeFan", views: 120, likes: 15, comments: 5, date: "2024-03-20" },
    { id: 2, category: "info", title: "유니티 쉐이더 기초 강좌 공유합니다", author: "DevGuru", views: 450, likes: 82, comments: 12, date: "2024-03-19" },
    { id: 3, category: "showcase", title: "이번에 새로 깎은 아바타입니다! (평가 부탁드려요)", author: "PixelMaster", views: 800, likes: 150, comments: 34, date: "2024-03-18", image: "https://images.unsplash.com/photo-1549488497-652392723383?auto=format&fit=crop&q=80&w=800" },
    { id: 4, category: "quest", title: "사이버펑크 풍의 남성 아바타 커미션 구합니다", author: "NeoSeeker", views: 200, likes: 8, comments: 3, date: "2024-03-17" },
    { id: 5, category: "free", title: "아바타 꾸미기 너무 어렵네요 ㅠㅠ 팁 좀 주세요", author: "Newbie01", views: 89, likes: 4, comments: 8, date: "2024-03-16" },
    { id: 6, category: "showcase", title: "봄 맞이 핑크 컨셉!", author: "CherryBlossom", views: 600, likes: 95, comments: 20, date: "2024-03-15", image: "https://images.unsplash.com/photo-1529335764857-3f1164d1ea24?auto=format&fit=crop&q=80&w=800" },
];

interface PostListProps {
    selectedCategory: string;
}

const PostList = ({ selectedCategory }: PostListProps) => {
    const navigate = useNavigate();
    const filteredPosts = selectedCategory === "all"
        ? allPosts
        : allPosts.filter(post => post.category === selectedCategory);

    const isGridView = selectedCategory === "showcase";

    if (isGridView) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        onClick={() => navigate(`/community/post/${post.id}`)}
                        className="group rounded-2xl overflow-hidden glass hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                        <div className="aspect-square relative overflow-hidden bg-muted">
                            {post.image ? (
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    <ImageIcon className="w-10 h-10" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                <p className="text-white font-semibold text-center line-clamp-2">{post.title}</p>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                                <span>{post.author}</span>
                                <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {post.likes}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4 animate-fade-in">
            {filteredPosts.map((post) => (
                <div
                    key={post.id}
                    onClick={() => navigate(`/community/post/${post.id}`)}
                    className="p-4 rounded-xl glass hover:bg-secondary/10 transition-colors flex items-center justify-between group cursor-pointer"
                >
                    <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-secondary/20 text-secondary-foreground font-medium">
                                {post.category === 'free' && '자유'}
                                {post.category === 'info' && '정보'}
                                {post.category === 'showcase' && '자랑'}
                                {post.category === 'quest' && '의뢰'}
                            </span>
                            <h3 className="text-base font-medium truncate group-hover:text-primary transition-colors">{post.title}</h3>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{post.author}</span>
                            <span>{post.date}</span>
                            <span className="md:hidden flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground flex-shrink-0">
                        <div className="hidden md:flex items-center gap-1 min-w-[60px]">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                        </div>
                        <div className="flex items-center gap-1 min-w-[50px] text-primary/80">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 min-w-[50px]">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comments}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;
