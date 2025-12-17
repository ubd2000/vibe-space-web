'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Image as ImageIcon,
    Upload,
    X,
    FileText,
    Tags,
    CheckCircle,
    Plus,
    Box,
    ChevronRight
} from "lucide-react";
import { toast } from "sonner";
import "react-quill-new/dist/quill.snow.css";
import { CATEGORIES, SUGGESTED_TAGS } from "@/lib/constants";

// Dynamic import for ReactQuill
const ReactQuill = dynamic(() => import("react-quill-new"), {
    ssr: false,
    loading: () => <div className="h-64 w-full bg-secondary/5 animate-pulse rounded-md" />
});

export default function ProductUploadPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [features, setFeatures] = useState<string[]>([]);
    const [featureInput, setFeatureInput] = useState("");

    // Category State
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [selectedDetail, setSelectedDetail] = useState("");

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        setSelectedSubCategory("");
        setSelectedDetail("");
    };

    const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubCategory(e.target.value);
        setSelectedDetail("");
    };
    const [description, setDescription] = useState(`
      <h2>✨ 네온 드리머 상세 소개</h2>
      <p>안녕하세요! 사이버펑크 세계관을 기반으로 제작된 오리지널 아바타 '네온 드리머'입니다.</p>
      <p>이 아바타는 VTube Studio와 호환되며, 방송용으로 즉시 사용 가능하도록 세팅되어 있습니다.</p>
      
      <h3>🎥 모션 프리뷰</h3>
      <p>다양한 표정과 자연스러운 움직임을 확인해보세요.</p>
      
      <h3>🎨 색상 팔레트</h3>
      <p>주요 컬러는 시안(#00FFFF)과 마젠타(#FF00FF)를 사용하여 네온 사인의 화려함을 표현했습니다.</p>
      
      <h3>📦 파일 구성</h3>
      <ul>
        <li>Live2D 모델 파일 (.moc3)</li>
        <li>텍스처 아틀라스</li>
        <li>물리 연산 설정 파일 (.json)</li>
        <li>표정 설정 파일 (.exp3.json)</li>
        <li>PSD 원본 (레이어 분리됨)</li>
      </ul>

      <p class="text-xs text-muted-foreground mt-8">* 무단 재배포 및 수정을 금지합니다. 상업적 이용 시 라이센스 범위를 확인해주세요.</p>
    `);

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleAddFeature = () => {
        if (featureInput.trim()) {
            setFeatures([...features, featureInput.trim()]);
            setFeatureInput("");
        }
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Mock API call
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("상품이 성공적으로 등록되었습니다!", {
                description: "검수 후 판매가 시작됩니다."
            });
            router.push("/creator/products");
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto pb-20 animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-display mb-2">새 상품 등록</h1>
                <p className="text-muted-foreground">판매할 아바타나 에셋의 정보를 입력해주세요.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Basic Info */}
                <section className="space-y-6 p-6 rounded-2xl glass border border-white/5">
                    <h2 className="text-xl font-semibold flex items-center gap-2 border-b border-white/5 pb-4 mb-6">
                        <Box className="w-5 h-5 text-primary" /> 기본 정보
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="title" className="text-base">상품명</Label>
                            <Input id="title" placeholder="예: 사이버펑크 네온 시티 아바타" className="h-12 bg-background/50" required maxLength={100} />
                        </div>

                        <div className="space-y-2 col-span-2">
                            <Label>카테고리</Label>
                            <div className="grid md:grid-cols-3 gap-4">
                                {/* 1 Depth */}
                                <select
                                    className="w-full h-12 rounded-md border border-input bg-background/50 px-3 py-2 text-sm"
                                    value={selectedCategory}
                                    onChange={handleCategoryChange}
                                >
                                    <option value="">대분류 선택</option>
                                    {CATEGORIES.map((cat) => (
                                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>

                                {/* 2 Depth */}
                                <select
                                    className="w-full h-12 rounded-md border border-input bg-background/50 px-3 py-2 text-sm"
                                    value={selectedSubCategory}
                                    onChange={handleSubCategoryChange}
                                    disabled={!selectedCategory}
                                >
                                    <option value="">중분류 선택</option>
                                    {selectedCategory && CATEGORIES.find(c => c.name === selectedCategory)?.subcategories.map((sub) => (
                                        <option key={sub.name} value={sub.name}>{sub.name}</option>
                                    ))}
                                </select>

                                {/* 3 Depth */}
                                <select
                                    className="w-full h-12 rounded-md border border-input bg-background/50 px-3 py-2 text-sm"
                                    value={selectedDetail}
                                    onChange={(e) => setSelectedDetail(e.target.value)}
                                    disabled={!selectedSubCategory}
                                >
                                    <option value="">소분류 선택</option>
                                    {selectedSubCategory && CATEGORIES.find(c => c.name === selectedCategory)?.subcategories.find(s => s.name === selectedSubCategory)?.details.map((detail) => (
                                        <option key={detail} value={detail}>{detail}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">판매 가격 (KRW)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">₩</span>
                                <Input id="price" type="number" placeholder="50000" className="pl-8 h-12 bg-background/50" required max={100000000} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Media Upload */}
                <section className="space-y-6 p-6 rounded-2xl glass border border-white/5">
                    <h2 className="text-xl font-semibold flex items-center gap-2 border-b border-white/5 pb-4 mb-6">
                        <ImageIcon className="w-5 h-5 text-primary" /> 이미지 등록
                    </h2>

                    <div className="space-y-4">
                        <Label>대표 이미지 (썸네일)</Label>
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 bg-background/20 hover:bg-background/40 transition-colors cursor-pointer text-center group">
                            <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Upload className="w-8 h-8 text-primary" />
                            </div>
                            <p className="font-medium">이미지를 드래그하거나 클릭하여 업로드</p>
                            <p className="text-xs text-muted-foreground mt-2">1200x1200px 권장 (JPG, PNG)</p>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4">
                        <Label>추가 스크린샷 (최대 5장)</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="aspect-square rounded-xl border border-white/10 bg-background/20 flex items-center justify-center cursor-pointer hover:bg-background/40 transition-colors">
                                <Plus className="w-6 h-6 text-muted-foreground" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Description */}
                <section className="space-y-6 p-6 rounded-2xl glass border border-white/5">
                    <h2 className="text-xl font-semibold flex items-center gap-2 border-b border-white/5 pb-4 mb-6">
                        <FileText className="w-5 h-5 text-primary" /> 상세 설명
                    </h2>

                    <div className="space-y-2">
                        <Label htmlFor="summary">요약 설명 (부제목)</Label>
                        <Input id="summary" placeholder="상품의 특징을 한 문장으로 설명해주세요." className="bg-background/50" maxLength={200} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">상세 소개</Label>
                        <div className="prose-editor">
                            <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={setDescription}
                                placeholder="상품에 대한 자세한 설명을 작성해주세요."
                                modules={{
                                    toolbar: [
                                        [{ 'font': [] }],
                                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                        ['bold', 'italic', 'underline', 'strike'],
                                        [{ 'color': [] }, { 'background': [] }],
                                        [{ 'script': 'sub' }, { 'script': 'super' }],
                                        ['blockquote', 'code-block'],
                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                        [{ 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
                                        ['link', 'image', 'video'],
                                        ['clean']
                                    ],
                                }}
                                className="rounded-md"
                            />
                        </div>
                    </div>

                </section>

                {/* 4. Details & Files */}
                <section className="space-y-6 p-6 rounded-2xl glass border border-white/5">
                    <h2 className="text-xl font-semibold flex items-center gap-2 border-b border-white/5 pb-4 mb-6">
                        <Tags className="w-5 h-5 text-primary" /> 태그 및 파일
                    </h2>

                    {/* Features */}
                    <div className="space-y-3">
                        <Label>주요 특징 (포함 내용)</Label>
                        <div className="flex gap-2">
                            <Input
                                value={featureInput}
                                onChange={(e) => setFeatureInput(e.target.value)}
                                placeholder="예: Live2D 리깅 완료"
                                className="bg-background/50"
                                maxLength={30}
                                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                            />
                            <Button type="button" onClick={handleAddFeature} variant="secondary">추가</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {features.map((feature, index) => (
                                <span key={index} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm flex items-center gap-2">
                                    <CheckCircle className="w-3 h-3" /> {feature}
                                    <button onClick={() => removeFeature(index)} className="hover:text-red-400"><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-3 pt-4">
                        <Label>검색 태그</Label>
                        <Input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            placeholder="태그 입력 후 Enter..."
                            className="bg-background/50"
                            maxLength={20}
                        />
                        <div className="text-xs text-muted-foreground mt-2 mb-2">추천 태그:</div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {SUGGESTED_TAGS.map((tag) => (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => !tags.includes(tag) && setTags([...tags, tag])}
                                    className={`px-2 py-1 rounded-md text-xs border transition-colors ${tags.includes(tag) ? 'bg-primary/20 border-primary text-primary' : 'bg-secondary/5 border-white/5 hover:bg-secondary/10'}`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-sm flex items-center gap-2">
                                    #{tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-red-400"><X className="w-3 h-3" /></button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-4 pt-6 border-t border-white/5">
                        <Label className="text-base text-primary font-bold">판매 파일 업로드 (ZIP, PSD)</Label>
                        <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer flex items-center justify-center gap-4 group">
                            <Upload className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                            <div>
                                <p className="font-medium text-primary">파일 선택 또는 드래그</p>
                                <p className="text-xs text-muted-foreground">최대 2GB</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end gap-4 pt-4">
                    <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>취소</Button>
                    <Button type="submit" variant="glow" size="lg" disabled={isSubmitting} className="px-8">
                        {isSubmitting ? "업로드 중..." : "상품 등록하기"}
                    </Button>
                </div>
            </form>
        </div >
    );
};
