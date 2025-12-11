import { MessageCircle, ThumbsUp, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostCardProps {
  title: string;
  author: string;
  category: string;
  likes: number;
  comments: number;
  time: string;
  trending?: boolean;
  index: number;
}

const PostCard = ({ title, author, category, likes, comments, time, trending, index }: PostCardProps) => {
  return (
    <div 
      className="group p-5 rounded-xl glass hover:bg-muted/30 transition-all duration-300 cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
              {category}
            </span>
            {trending && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 인기
              </span>
            )}
          </div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{author}</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {time}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" /> {likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" /> {comments}
          </span>
        </div>
      </div>
    </div>
  );
};

const CommunitySection = () => {
  const posts = [
    { title: "VTuber 데뷔 후기 공유합니다! 3개월 동안의 여정", author: "NewVTuber", category: "후기", likes: 156, comments: 42, time: "2시간 전", trending: true },
    { title: "아바타 리깅 팁: 더 자연스러운 표정 만들기", author: "RigMaster", category: "팁/노하우", likes: 234, comments: 67, time: "5시간 전", trending: true },
    { title: "이번 주 신작 아바타 추천 BEST 5", author: "AvatarReviewer", category: "추천", likes: 189, comments: 34, time: "8시간 전" },
    { title: "Live2D vs VRoid 뭐가 더 좋을까요?", author: "Curious123", category: "질문", likes: 98, comments: 156, time: "12시간 전" },
    { title: "첫 아바타 제작 완료! 피드백 부탁드려요", author: "FirstTimer", category: "피드백", likes: 87, comments: 29, time: "1일 전" },
    { title: "콜라보 크리에이터 모집합니다 (유튜브 10만)", author: "BigCreator", category: "모집", likes: 312, comments: 89, time: "1일 전", trending: true },
  ];

  const categories = [
    { name: "전체", count: 1234 },
    { name: "후기", count: 456 },
    { name: "팁/노하우", count: 789 },
    { name: "질문", count: 234 },
    { name: "모집", count: 123 },
  ];

  return (
    <section id="community" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/10 via-background to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">커뮤니티</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            버츄얼 아바타에 대한 모든 이야기를 나눠보세요
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-5 rounded-xl glass">
              <h3 className="font-display font-semibold text-foreground mb-4">카테고리</h3>
              <div className="space-y-2">
                {categories.map((cat, index) => (
                  <button
                    key={cat.name}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      index === 0 ? "bg-primary/20 text-primary" : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-sm">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>
            <Button variant="hero" className="w-full">
              글 작성하기
            </Button>
          </div>

          {/* Posts */}
          <div className="lg:col-span-3 space-y-4">
            {posts.map((post, index) => (
              <PostCard key={index} {...post} index={index} />
            ))}
            <div className="text-center pt-4">
              <Button variant="outline">더보기</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
