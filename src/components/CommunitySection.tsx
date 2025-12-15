
import { useState } from "react";
import { MessageCircle, ThumbsUp, Clock, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface PostCardProps {
  id: number;
  title: string;
  author: string;
  category: string;
  likes: number;
  comments: number;
  time: string;
  trending?: boolean;
  index: number;
}

const PostCard = ({ id, title, author, category, likes, comments, time, trending, index }: PostCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/community/post/${id}`)}
      className="group p-5 rounded-xl glass hover:bg-muted/30 transition-all duration-300 cursor-pointer animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium",
              category === "자유" && "bg-blue-500/10 text-blue-500",
              category === "정보/팁" && "bg-green-500/10 text-green-500",
              category === "아바타" && "bg-purple-500/10 text-purple-500"
            )}>
              {category}
            </span>
            {trending && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 인기
              </span>
            )}
            <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto md:ml-0">
              <Clock className="w-3 h-3" /> {time}
            </span>
          </div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">
            {author}
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground whitespace-nowrap">
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-pink-500/70" /> {likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" /> {comments}
          </span>
        </div>
      </div>
    </div>
  );
};

// Expanded mock data
const allMockPosts = [
  // Info/Tips
  { id: 101, title: "유니티 쉐이더 기초 강좌 공유합니다", author: "DevGuru", category: "정보/팁", likes: 450, comments: 82, time: "2시간 전", trending: true },
  { id: 102, title: "블렌더 3.0 단축키 모음집", author: "3DArtist", category: "정보/팁", likes: 320, comments: 45, time: "5시간 전", trending: true },
  { id: 103, title: "뚜따 작업 시 주의할 점 TOP 5", author: "Ripper", category: "정보/팁", likes: 210, comments: 33, time: "1일 전" },
  { id: 104, title: "VRChat 아바타 최적화 가이드", author: "OptiMan", category: "정보/팁", likes: 180, comments: 22, time: "1일 전" },
  { id: 105, title: "부스(BOOTH) 결제 방법 정리", author: "Shopper", category: "정보/팁", likes: 150, comments: 15, time: "2일 전" },
  { id: 106, title: "무료 에셋 사이트 추천", author: "Freebie", category: "정보/팁", likes: 140, comments: 10, time: "3일 전" },
  { id: 107, title: "피직스본 설정법 상세 설명", author: "BoneMaster", category: "정보/팁", likes: 130, comments: 28, time: "3일 전" },
  { id: 108, title: "표정 제스처 설정 강의", author: "FaceMaker", category: "정보/팁", likes: 120, comments: 18, time: "4일 전" },
  { id: 109, title: "OBS 방송 세팅 꿀팁", author: "Streamer", category: "정보/팁", likes: 110, comments: 55, time: "5일 전" },
  { id: 110, title: "VR 장비 관리 요령", author: "GearHead", category: "정보/팁", likes: 105, comments: 12, time: "6일 전" },

  // Free Board
  { id: 201, title: "오늘 날씨가 정말 좋네요! 다들 뭐하시나요?", author: "VTubeFan", category: "자유", likes: 88, comments: 15, time: "10분 전" },
  { id: 202, title: "어제 방송 보신 분 계신가요? ㅋㅋ", author: "Viewer1", category: "자유", likes: 76, comments: 22, time: "30분 전" },
  { id: 203, title: "아바타 바꾸고 싶은데 고민이네요", author: "Changer", category: "자유", likes: 65, comments: 40, time: "1시간 전", trending: true },
  { id: 204, title: "주말에 정모 가시는 분?", author: "Party", category: "자유", likes: 150, comments: 50, time: "2시간 전", trending: true },
  { id: 205, title: "V로이드 처음 써보는데 재밌네요", author: "Newbie", category: "자유", likes: 45, comments: 8, time: "3시간 전" },
  { id: 206, title: "점심 메뉴 추천 좀요", author: "Hungry", category: "자유", likes: 30, comments: 12, time: "4시간 전" },
  { id: 207, title: "요즘 유행하는 밈이 뭔가요?", author: "Boomer", category: "자유", likes: 90, comments: 33, time: "5시간 전" },
  { id: 208, title: "작업하다 날려먹었습니다 ㅠㅠ", author: "SadDev", category: "자유", likes: 200, comments: 60, time: "6시간 전", trending: true },
  { id: 209, title: "다들 어떤 프로그램 쓰시나요?", author: "Curious", category: "자유", likes: 55, comments: 19, time: "7시간 전" },
  { id: 210, title: "심심해서 끄적여봄", author: "Doodler", category: "자유", likes: 40, comments: 5, time: "8시간 전" },
  { id: 211, title: "11번째 글 (순위 밖)", author: "Nobody", category: "자유", likes: 10, comments: 1, time: "9시간 전" },

  // Avatar Showcase
  { id: 301, title: "봄 맞이 핑크 컨셉! 산뜻하게 꾸며봤어요", author: "CherryBlossom", category: "아바타", likes: 500, comments: 120, time: "1시간 전", trending: true },
  { id: 302, title: "사이버펑크 스타일 남캐 커마", author: "NeoCity", category: "아바타", likes: 480, comments: 90, time: "3시간 전", trending: true },
  { id: 303, title: "고양이 귀 메이드 컨셉", author: "NekoMaid", category: "아바타", likes: 420, comments: 75, time: "6시간 전" },
  { id: 304, title: "할로윈 기념 호박 마녀", author: "Witchy", category: "아바타", likes: 380, comments: 60, time: "1일 전" },
  { id: 305, title: "심플한 사복 패션", author: "Casual", category: "아바타", likes: 350, comments: 55, time: "1일 전" },
  { id: 306, title: "판타지 기사 갑옷 풀세트", author: "Knight", category: "아바타", likes: 330, comments: 45, time: "2일 전" },
  { id: 307, title: "여름 수영복 스킨", author: "Summer", category: "아바타", likes: 550, comments: 150, time: "3일 전", trending: true },
  { id: 308, title: "교복 스타일 리텍", author: "School", category: "아바타", likes: 310, comments: 40, time: "3일 전" },
  { id: 309, title: "천사 컨셉 날개 추가", author: "Angel", category: "아바타", likes: 290, comments: 35, time: "4일 전" },
  { id: 310, title: "악마 꼬리 포인트", author: "Devil", category: "아바타", likes: 280, comments: 30, time: "5일 전" },
];

const categories = [
  { id: "free", name: "자유게시판", searchKey: "자유", desc: "자유롭게 이야기를 나누는 공간" },
  { id: "info", name: "정보/팁", searchKey: "정보/팁", desc: "유용한 정보와 팁을 공유하는 공간" },
  { id: "showcase", name: "아바타 자랑", searchKey: "아바타", desc: "나만의 멋진 아바타를 뽐내는 공간" },
];

const CommunitySection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(categories[0].id);

  // Filter by category and sort by likes (descending)
  const activeCategory = categories.find(c => c.id === activeTab);
  const displayedPosts = allMockPosts
    .filter(post => post.category === activeCategory?.searchKey)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 10);

  return (
    <section id="community" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-background to-background" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">커뮤니티 인기글</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              지금 가장 핫한 이야기를 놓치지 마세요
            </p>
          </div>
          <Button variant="outline" className="gap-2 hidden md:flex" onClick={() => navigate("/community")}>
            커뮤니티 전체보기 <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Top Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "relative px-6 py-3 rounded-t-xl transition-all duration-300 text-sm font-bold",
                activeTab === cat.id
                  ? "text-primary bg-glass border-t border-x border-white/10 -mb-[1px] z-10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
            >
              {cat.name}
              {activeTab === cat.id && (
                <div className="absolute top-0 left-0 w-full h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Posts List */}
        <div className="bg-glass rounded-b-3xl rounded-tr-3xl border border-white/10 p-6 md:p-8 shadow-xl min-h-[600px] flex flex-col relative before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] before:bg-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              {activeCategory?.name} 인기 TOP 10
            </h3>
            <span className="text-sm text-muted-foreground">
              실시간 추천순
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 flex-1 content-start">
            {displayedPosts.map((post, index) => (
              <PostCard key={post.id} {...post} index={index} />
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-center md:hidden">
            <Button variant="ghost" onClick={() => navigate("/community")}>
              더보기
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
