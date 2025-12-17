'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PortfolioManagementPage() {
    // Mock Data
    const portfolios = [
        {
            id: 1,
            title: "Cyberpunk City Concept",
            image: "https://images.unsplash.com/photo-1615840287214-7ff58ee04896?auto=format&fit=crop&q=80&w=800",
            category: "Concept Art",
            date: "2024.03.15",
            views: 1240,
            likes: 45
        },
        {
            id: 2,
            title: "Character Sketch - Neon",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
            category: "Sketch",
            date: "2024.03.14",
            views: 890,
            likes: 32
        },
        {
            id: 3,
            title: "3D Modeling Process",
            image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=800",
            category: "3D Model",
            date: "2024.03.10",
            views: 2100,
            likes: 156
        },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">포트폴리오 관리</h1>
                    <p className="text-muted-foreground mt-1">
                        작업물을 포트폴리오로 정리하여 팬들과 공유하세요.
                    </p>
                </div>
                <Link href="/creator/portfolio/new">
                    <Button variant="glow" className="w-full md:w-auto gap-2">
                        <Plus className="w-4 h-4" />
                        새 포트폴리오 등록
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="포트폴리오 검색..." className="pl-10 bg-secondary/10" />
                </div>
                <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    필터
                </Button>
            </div>

            {/* Portfolio List */}
            <div className="grid gap-4">
                {portfolios.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-xl glass hover:bg-muted/40 transition-all group"
                    >
                        {/* Image */}
                        <div className="w-full md:w-48 aspect-video rounded-lg overflow-hidden relative flex-shrink-0">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 w-full text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                                <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-bold w-fit mx-auto md:mx-0">
                                    {item.category}
                                </span>
                                <span className="text-xs text-muted-foreground">{item.date}</span>
                            </div>
                            <h3 className="font-display font-bold text-lg text-foreground mb-1">
                                {item.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground justify-center md:justify-start">
                                <div className="flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    {item.views.toLocaleString()}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart className="w-4 h-4" />
                                    {item.likes.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 border-white/10 pt-4 md:pt-0 mt-2 md:mt-0">
                            <Button variant="ghost" size="icon" className="hover:text-primary">
                                <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="hover:text-destructive">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}

                {portfolios.length === 0 && (
                    <div className="text-center py-20 rounded-2xl glass border-2 border-dashed border-white/5">
                        <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-lg text-foreground mb-2">등록된 포트폴리오가 없습니다</h3>
                        <p className="text-muted-foreground mb-6">첫 번째 포트폴리오를 등록하여 팬들에게 보여주세요.</p>
                        <Link href="/creator/portfolio/new">
                            <Button variant="glow">
                                <Plus className="w-4 h-4 mr-2" />
                                새 포트폴리오 등록
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
