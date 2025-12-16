'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MoreVertical, Edit, Trash, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import heroAvatar from "@/assets/hero-avatar.png";
import avatarDetail1 from "@/assets/avatar-detail-1.png";

export default function ProductManagementPage() {
    const products = [
        { id: 1, name: "네온 드리머 (Neon Dreamer)", price: "45,000", sales: 42, status: "판매중", image: heroAvatar },
        { id: 2, name: "사이버 펑크 시티", price: "50,000", sales: 15, status: "심사중", image: avatarDetail1 },
        { id: 3, name: "홀로그램 이펙트 팩", price: "15,000", sales: 89, status: "판매중", image: null },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold font-display">상품 관리</h1>
                    <p className="text-muted-foreground text-sm">등록된 상품을 수정하거나 새로운 상품을 업로드하세요.</p>
                </div>
                <Link href="/creator/products/new">
                    <Button className="gap-2 w-full sm:w-auto">
                        <Plus className="w-4 h-4" /> 새 상품 등록
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-2 bg-glass p-2 rounded-xl border border-white/10 max-w-md">
                <Search className="w-5 h-5 text-muted-foreground ml-2" />
                <Input className="border-0 bg-transparent focus-visible:ring-0" placeholder="상품명 검색..." />
            </div>

            <div className="bg-glass rounded-xl border border-white/5 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-white/5 text-muted-foreground font-medium border-b border-white/5">
                        <tr>
                            <th className="p-4 pl-6">상품 정보</th>
                            <th className="p-4">가격</th>
                            <th className="p-4">판매량</th>
                            <th className="p-4">상태</th>
                            <th className="p-4 text-right pr-6">관리</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 pl-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-secondary/10 overflow-hidden relative">
                                            {product.image ? (
                                                <Image src={product.image} alt={product.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-secondary/20 flex items-center justify-center text-xs">No Img</div>
                                            )}
                                        </div>
                                        <span className="font-medium">{product.name}</span>
                                    </div>
                                </td>
                                <td className="p-4 font-mono">₩{product.price}</td>
                                <td className="p-4">{product.sales}개</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.status === "판매중" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right pr-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-red-400">
                                            <Trash className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
