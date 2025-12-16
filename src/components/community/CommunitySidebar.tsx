/* eslint-disable */
import { useState, useEffect, type ElementType } from "react";
import { MessageCircle, Hash, Image as ImageIcon, HelpCircle, Newspaper, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
    id: string;
    name: string;
    icon: ElementType;
    subCategories?: { id: string; name: string }[];
}

const categories: Category[] = [
    { id: "all", name: "전체", icon: Hash },
    {
        id: "free",
        name: "자유게시판",
        icon: MessageCircle,
        subCategories: [
            { id: "chat", name: "잡담" },
            { id: "question", name: "질문" },
        ]
    },
    {
        id: "info",
        name: "정보/팁",
        icon: Newspaper,
        subCategories: [
            { id: "guide", name: "공략" },
            { id: "news", name: "뉴스" },
            { id: "tip", name: "팁" },
        ]
    },
    {
        id: "showcase",
        name: "아바타 자랑",
        icon: ImageIcon,
        subCategories: [
            { id: "screenshot", name: "스크린샷" },
            { id: "video", name: "영상" },
        ]
    },
    {
        id: "quest",
        name: "제작 의뢰",
        icon: HelpCircle,
        subCategories: [
            { id: "hiring", name: "구인" },
            { id: "looking", name: "구직" },
        ]
    },
];

interface CommunitySidebarProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
    selectedSubCategory?: string;
    onSelectSubCategory?: (subCategory: string) => void;
}

const CommunitySidebar = ({
    selectedCategory,
    onSelectCategory,
    selectedSubCategory,
    onSelectSubCategory
}: CommunitySidebarProps) => {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    // Automatically expand the selected category
    useEffect(() => {
        if (selectedCategory && !expandedCategories.includes(selectedCategory)) {
            setExpandedCategories(prev => [...prev, selectedCategory]);
        }
    }, [selectedCategory]);

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    return (
        <div className="bg-glass rounded-2xl p-6 border border-white/10 sticky top-24 animate-fade-in space-y-2">
            <h2 className="text-lg font-bold mb-4 px-2">게시판 목록</h2>

            {categories.map((category) => {
                const isExpanded = expandedCategories.includes(category.id);
                const hasSub = !!category.subCategories;

                return (
                    <div key={category.id} className="space-y-1">
                        <div className="relative flex items-center">
                            <button
                                onClick={() => {
                                    onSelectCategory(category.id);
                                    if (onSelectSubCategory) onSelectSubCategory("");
                                }}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden text-left",
                                    selectedCategory === category.id
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                        : "hover:bg-secondary/10 text-muted-foreground hover:text-foreground",
                                    hasSub && "pr-10" // Add padding for the toggle button
                                )}
                            >
                                <category.icon className={cn(
                                    "w-5 h-5 transition-transform duration-300",
                                    selectedCategory === category.id && "scale-110"
                                )} />
                                <span className="font-medium flex-1">{category.name}</span>
                            </button>

                            {hasSub && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleCategory(category.id);
                                    }}
                                    className={cn(
                                        "absolute right-2 p-1.5 rounded-lg transition-colors z-10",
                                        selectedCategory === category.id
                                            ? "text-primary-foreground/80 hover:bg-white/20"
                                            : "text-muted-foreground hover:bg-secondary/20 hover:text-foreground"
                                    )}
                                >
                                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                </button>
                            )}
                        </div>

                        {/* Sub-categories */}
                        {category.subCategories && isExpanded && (
                            <div className="pl-12 pr-2 space-y-1 animate-fade-in-down">
                                {category.subCategories.map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (onSelectSubCategory) onSelectSubCategory(sub.id);
                                        }}
                                        className={cn(
                                            "w-full text-left text-sm py-2 px-3 rounded-lg flex items-center justify-between transition-colors",
                                            selectedSubCategory === sub.id
                                                ? "text-primary bg-primary/10 font-medium"
                                                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                        )}
                                    >
                                        {sub.name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default CommunitySidebar;
