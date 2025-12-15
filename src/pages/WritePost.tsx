
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Image as ImageIcon, X } from "lucide-react";
import TiptapEditor from "@/components/editor/TiptapEditor";

const categories = [
    {
        id: "free",
        name: "자유게시판",
        subCategories: [
            { id: "chat", name: "잡담" },
            { id: "question", name: "질문" },
        ]
    },
    {
        id: "info",
        name: "정보/팁",
        subCategories: [
            { id: "guide", name: "공략" },
            { id: "news", name: "뉴스" },
            { id: "tip", name: "팁" },
        ]
    },
    {
        id: "showcase",
        name: "아바타 자랑",
        subCategories: [
            { id: "screenshot", name: "스크린샷" },
            { id: "video", name: "영상" },
        ]
    },
    {
        id: "quest",
        name: "제작 의뢰",
        subCategories: [
            { id: "hiring", name: "구인" },
            { id: "looking", name: "구직" },
        ]
    },
];

const WritePost = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("free");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const currentCategory = categories.find(c => c.id === selectedCategory);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement submission logic here
        console.log({ selectedCategory, selectedSubCategory, title, content });
        navigate("/community");
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        돌아가기
                    </button>

                    <div className="bg-glass rounded-2xl p-8 animate-fade-in shadow-lg border border-white/10">
                        <h1 className="text-2xl font-bold font-display mb-8">글쓰기</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Category Selection */}
                            <div className="space-y-4">
                                <div>
                                    <Label className="mb-2 block">게시판</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedCategory(category.id);
                                                    setSelectedSubCategory(""); // Reset sub-category
                                                }}
                                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category.id
                                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                                    : "bg-secondary/10 text-muted-foreground hover:bg-secondary/20 hover:text-foreground"
                                                    }`}
                                            >
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sub Category Selection */}
                                {currentCategory?.subCategories && (
                                    <div className="animate-fade-in">
                                        <Label className="mb-2 block">말머리</Label>
                                        <div className="flex flex-wrap gap-2">
                                            {currentCategory.subCategories.map((sub) => (
                                                <button
                                                    key={sub.id}
                                                    type="button"
                                                    onClick={() => setSelectedSubCategory(sub.id)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedSubCategory === sub.id
                                                        ? "bg-primary/20 text-primary border border-primary/50"
                                                        : "bg-secondary/5 text-muted-foreground hover:bg-secondary/10 border border-transparent"
                                                        }`}
                                                >
                                                    {sub.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">제목</Label>
                                <Input
                                    id="title"
                                    placeholder="제목을 입력하세요"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="bg-secondary/5 border-white/10 focus:border-primary h-12 text-lg"
                                    required
                                />
                            </div>

                            {/* Content Editor */}
                            <div className="space-y-2">
                                <Label htmlFor="content">내용</Label>
                                <TiptapEditor
                                    content={content}
                                    onChange={setContent}
                                />
                            </div>

                            {/* Image Upload (Visual Only) */}
                            <div className="space-y-2">
                                <Label>이미지 첨부</Label>
                                <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-8 text-center hover:bg-secondary/5 transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                                        <ImageIcon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        클릭하여 이미지를 업로드하거나 드래그 앤 드롭하세요
                                    </p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 pt-4 border-t border-white/10">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="flex-1 h-12"
                                    onClick={() => navigate(-1)}
                                >
                                    취소
                                </Button>
                                <Button
                                    type="submit"
                                    variant="glow"
                                    className="flex-1 h-12"
                                >
                                    등록하기
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default WritePost;
