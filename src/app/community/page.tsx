'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunitySidebar from "@/components/community/CommunitySidebar";
import PostList from "@/components/community/PostList";
import { Button } from "@/components/ui/button";
import { PenSquare, Search } from "lucide-react";

export default function CommunityPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold font-display text-foreground">커뮤니티</h1>
                            <p className="text-muted-foreground mt-1">창작자와 팬이 만나는 공간</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative hidden md:block w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="검색어 입력..."
                                    className="w-full h-10 pl-9 pr-4 rounded-lg bg-secondary/10 border border-transparent focus:bg-background focus:border-primary focus:outline-none transition-all text-sm"
                                />
                            </div>
                            <Button className="gap-2" onClick={() => router.push('/community/write')}>
                                <PenSquare className="w-4 h-4" />
                                <span className="hidden sm:inline">글쓰기</span>
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Sidebar */}
                        <div className="md:col-span-3 lg:col-span-3">
                            <CommunitySidebar
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                                selectedSubCategory={selectedSubCategory}
                                onSelectSubCategory={setSelectedSubCategory}
                            />
                        </div>

                        {/* Main Feed */}
                        <div className="md:col-span-9 lg:col-span-9">
                            {/* Mobile Search (visible only on mobile) */}
                            <div className="relative md:hidden mb-6">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="관심있는 내용을 검색해보세요"
                                    className="w-full h-12 pl-9 pr-4 rounded-xl bg-secondary/10 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                                />
                            </div>

                            <div className="bg-glass rounded-2xl min-h-[500px]">
                                <PostList selectedCategory={selectedCategory} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
