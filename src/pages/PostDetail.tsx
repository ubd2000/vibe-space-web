
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal, User } from "lucide-react";

// Mock data for the post detail (In a real app, fetch by ID)
const mockPost = {
    id: 1,
    category: "자유게시판",
    title: "오늘 날씨가 정말 좋네요! 다들 뭐하시나요?",
    author: "VTubeFan",
    authorAvatar: null,
    date: "2024-03-20 14:30",
    views: 1250,
    likes: 42,
    content: `
    <p>안녕하세요! 오늘 날씨가 너무 좋아서 산책이라도 다녀와야겠어요.</p>
    <p>다들 주말 계획은 어떻게 되시나요? 저는 새로운 아바타 커스터마이징을 좀 해보려고 합니다 ㅋㅋ</p>
    <br/>
    <p>혹시 <strong>V-roid</strong> 쓰시는 분들 팁 좀 공유해주세요!</p>
  `,
    comments: [
        { id: 1, author: "PixelMaster", content: "저는 오늘 하루종일 모델링 작업만 하네요 ㅠㅠ", date: "2024-03-20 14:35" },
        { id: 2, author: "Newbie01", content: "산책 부럽습니다!", date: "2024-03-20 14:40" }
    ]
};

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // In real implementation, fetch post data using 'id'

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        목록으로
                    </button>

                    {/* Post Content */}
                    <div className="bg-glass rounded-2xl overflow-hidden border border-white/10 animate-fade-in shadow-xl">
                        {/* Header */}
                        <div className="p-8 border-b border-white/10">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                                    {mockPost.category}
                                </span>
                                <span className="text-muted-foreground text-sm">{mockPost.date}</span>
                            </div>
                            <h1 className="text-3xl font-bold font-display text-foreground mb-6 leading-tight">
                                {mockPost.title}
                            </h1>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                                        <User className="w-5 h-5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">{mockPost.author}</p>
                                        <p className="text-xs text-muted-foreground">조회 {mockPost.views}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Share2 className="w-5 h-5" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Body (HTML Content) */}
                        <div
                            className="p-8 prose prose-invert max-w-none text-foreground/90 leading-relaxed min-h-[200px]"
                            dangerouslySetInnerHTML={{ __html: mockPost.content }}
                        />

                        {/* Reaction Bar */}
                        <div className="px-8 py-6 border-t border-white/10 flex items-center justify-center gap-4 bg-secondary/5">
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full gap-2 hover:text-pink-500 hover:border-pink-500 hover:bg-pink-500/10 transition-all group"
                            >
                                <Heart className="w-5 h-5 group-hover:fill-current" />
                                좋아요 {mockPost.likes}
                            </Button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-8">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 hidden" />
                            댓글 {mockPost.comments.length}
                        </h3>

                        {/* Comment Input */}
                        <div className="bg-glass rounded-xl p-4 mb-6 flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary/20 flex-shrink-0" />
                            <div className="flex-1">
                                <textarea
                                    placeholder="댓글을 남겨보세요"
                                    className="w-full bg-transparent border-none focus:outline-none resize-none min-h-[60px] text-sm"
                                />
                                <div className="flex justify-end mt-2">
                                    <Button size="sm">등록</Button>
                                </div>
                            </div>
                        </div>

                        {/* Comment List */}
                        <div className="space-y-4">
                            {mockPost.comments.map((comment) => (
                                <div key={comment.id} className="bg-glass/50 rounded-xl p-6 border border-white/5">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                        <span className="font-semibold text-sm">{comment.author}</span>
                                        <span className="text-xs text-muted-foreground">{comment.date}</span>
                                    </div>
                                    <p className="text-foreground/80 pl-11 text-sm">{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PostDetail;
