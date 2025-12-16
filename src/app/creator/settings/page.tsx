'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Save, Upload, User, Globe, Twitter, Disc } from "lucide-react";
import Image from "next/image";
import avatar1 from "@/assets/avatar-1.png"; // Using existing asset as default

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate save API call
        setTimeout(() => {
            setIsLoading(false);
            alert("설정이 저장되었습니다!");
        }, 1000);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-display font-bold text-foreground">내 샵 설정</h1>
                <p className="text-muted-foreground mt-2">브랜드 프로필과 정보를 관리하세요.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Branding Section */}
                <div className="space-y-6 p-6 rounded-2xl glass border border-white/5">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Upload className="w-5 h-5 text-primary" />
                        브랜딩
                    </h2>

                    {/* Cover Image */}
                    <div className="space-y-4">
                        <Label>커버 이미지</Label>
                        <div className="relative h-48 w-full rounded-xl overflow-hidden bg-secondary/20 group border-2 border-dashed border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                                <Upload className="w-8 h-8 mb-2" />
                                <span className="text-sm font-medium">커버 이미지 업로드 (1200x320)</span>
                            </div>
                            <Image
                                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop"
                                alt="Cover Preview"
                                fill
                                className="object-cover opacity-50 group-hover:opacity-40 transition-opacity"
                            />
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className="space-y-4">
                        <Label>프로필 아바타</Label>
                        <div className="flex items-center gap-6">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/20 group cursor-pointer">
                                <Image
                                    src={avatar1}
                                    alt="Avatar Preview"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <Button type="button" variant="outline" size="sm">이미지 변경</Button>
                                <p className="text-xs text-muted-foreground">권장 사이즈: 400x400px</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Basic Info Section */}
                <div className="space-y-6 p-6 rounded-2xl glass border border-white/5">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        기본 정보
                    </h2>

                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="shopName">샵 이름 (활동명)</Label>
                            <Input id="shopName" defaultValue="PixelMaster" placeholder="활동명을 입력하세요" className="bg-secondary/10" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">소개글</Label>
                            <Textarea
                                id="bio"
                                defaultValue="5년차 버츄얼 아바타 전문 크리에이터입니다. 사이버펑크와 판타지 스타일을 주로 작업합니다."
                                placeholder="자신을 소개하는 글을 작성하세요"
                                className="min-h-[100px] bg-secondary/10 resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags">전문 태그 (쉼표로 구분)</Label>
                            <Input id="tags" defaultValue="Live2D, 3D Modeling, Character Design" className="bg-secondary/10" />
                        </div>
                    </div>
                </div>

                {/* Social Links Section */}
                <div className="space-y-6 p-6 rounded-2xl glass border border-white/5">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        소셜 링크
                    </h2>

                    <div className="grid gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 flex justify-center"><Twitter className="w-5 h-5 text-sky-400" /></div>
                            <Input placeholder="Twitter 프로필 URL" className="flex-1 bg-secondary/10" />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 flex justify-center"><Disc className="w-5 h-5 text-indigo-400" /></div>
                            <Input placeholder="Discord 사용자명 또는 서버 링크" className="flex-1 bg-secondary/10" />
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 flex justify-center"><Globe className="w-5 h-5 text-muted-foreground" /></div>
                            <Input placeholder="개인 웹사이트 URL" className="flex-1 bg-secondary/10" />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4 pb-20">
                    <Button type="submit" variant="glow" size="lg" disabled={isLoading} className="w-full md:w-auto min-w-[150px]">
                        <Save className="w-4 h-4 mr-2" />
                        {isLoading ? "저장 중..." : "변경사항 저장"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
