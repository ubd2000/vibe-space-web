'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Image as ImageIcon, Upload, X, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddPortfolioPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Navigate back to profile (me) or show success message
            // Ideally we should have a toast here but for now just redirect
            router.push('/creators/me');
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-display font-bold text-foreground">포트폴리오 추가</h1>
                <p className="text-muted-foreground mt-2">당신의 멋진 작업물을 공유헤보세요.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Image Upload Section */}
                <div className="space-y-4 p-6 rounded-2xl glass border border-white/5">
                    <Label className="text-lg font-semibold">작업물 이미지</Label>

                    {preview ? (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden group">
                            <Image
                                src={preview}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => setPreview(null)}
                                >
                                    <X className="w-4 h-4 mr-2" />
                                    이미지 삭제
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full aspect-video rounded-xl border-2 border-dashed border-white/10 bg-secondary/5 hover:bg-secondary/10 hover:border-primary/50 transition-all flex flex-col items-center justify-center cursor-pointer relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 text-primary">
                                <Upload className="w-8 h-8" />
                            </div>
                            <p className="font-semibold text-lg mb-1">이미지를 업로드하세요</p>
                            <p className="text-sm text-muted-foreground">JPG, PNG, GIF (최대 10MB)</p>
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="space-y-6 p-6 rounded-2xl glass border border-white/5">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <ImageIcon className="w-5 h-5 text-primary" />
                        상세 정보
                    </h2>

                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">제목</Label>
                            <Input id="title" placeholder="작품의 제목을 입력하세요" className="bg-secondary/10" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">카테고리</Label>
                            <select
                                id="category"
                                className="w-full h-10 px-3 rounded-md border border-input bg-secondary/10 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="concept">컨셉 아트</option>
                                <option value="3d">3D 모델링</option>
                                <option value="illustration">일러스트레이션</option>
                                <option value="live2d">Live2D</option>
                                <option value="other">기타</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">설명</Label>
                            <Textarea
                                id="description"
                                placeholder="작품에 대한 설명을 자유롭게 작성해주세요"
                                className="min-h-[150px] bg-secondary/10 resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="tags">태그</Label>
                            <Input id="tags" placeholder="#사이버펑크 #캐릭터 #네온 (쉼표로 구분)" className="bg-secondary/10" />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4 pb-20">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        disabled={isLoading}
                    >
                        취소
                    </Button>
                    <Button
                        type="submit"
                        variant="glow"
                        disabled={isLoading || !preview}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                등록 중...
                            </>
                        ) : (
                            "포트폴리오 등록"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
