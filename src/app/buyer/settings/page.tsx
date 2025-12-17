"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { User, Lock, Bell, Shield, CreditCard, LogOut, Loader2, Camera } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function BuyerSettingsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const [passwordData, setPasswordData] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    const handlePasswordChange = () => {
        if (!passwordData.current || !passwordData.new || !passwordData.confirm) {
            toast.error("모든 필드를 입력해주세요.");
            return;
        }
        if (passwordData.new !== passwordData.confirm) {
            toast.error("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsPasswordDialogOpen(false);
            setPasswordData({ current: "", new: "", confirm: "" });
            toast.success("비밀번호가 성공적으로 변경되었습니다.");
        }, 1500);
    };

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            toast.success("설정이 저장되었습니다.");
        }, 1000);
    };

    return (
        <div className="h-full flex flex-col gap-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
                <User className="w-8 h-8 text-accent" />
                계정 설정
            </h1>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="profile">프로필 편집</TabsTrigger>
                    <TabsTrigger value="account">계정 관리</TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="space-y-4 mt-4">
                    <Card className="bg-glass border-white/10">
                        <CardHeader>
                            <CardTitle>프로필 정보</CardTitle>
                            <CardDescription>
                                다른 사용자에게 보여지는 프로필 정보를 수정합니다.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col items-center gap-4 sm:flex-row">
                                <div className="relative group">
                                    <Avatar className="w-24 h-24 cursor-pointer">
                                        <AvatarImage src="/hero-avatar.png" />
                                        <AvatarFallback>USER</AvatarFallback>
                                    </Avatar>
                                    <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Camera className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <div className="space-y-1 text-center sm:text-left">
                                    <h3 className="font-medium">프로필 사진</h3>
                                    <p className="text-sm text-muted-foreground">
                                        JPG, GIF or PNG. 최대 2MB.
                                    </p>
                                    <Button variant="outline" size="sm" className="mt-2">
                                        사진 변경
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="nickname">닉네임</Label>
                                    <Input id="nickname" defaultValue="CyberViber" className="bg-white/5 border-white/10" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="bio">소개</Label>
                                    <Input id="bio" defaultValue="VR과 아바타를 사랑하는 유저입니다." className="bg-white/5 border-white/10" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">이메일</Label>
                                    <Input id="email" defaultValue="user@example.com" disabled className="bg-white/5 border-white/10 opacity-50" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSave} disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                                저장하기
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="account" className="space-y-4 mt-4">
                    <Card className="bg-glass border-white/10">
                        <CardHeader>
                            <CardTitle>보안 및 알림</CardTitle>
                            <CardDescription>
                                비밀번호 및 계정 보안 설정을 관리합니다.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5">
                                    <div className="flex items-center gap-4">
                                        <Lock className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">비밀번호 변경</p>
                                            <p className="text-sm text-muted-foreground">마지막 변경: 3개월 전</p>
                                        </div>
                                    </div>
                                    <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm">변경</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>비밀번호 변경</DialogTitle>
                                                <DialogDescription>
                                                    계정 보안을 위해 주기적으로 비밀번호를 변경해주세요.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="current-password">현재 비밀번호</Label>
                                                    <Input
                                                        id="current-password"
                                                        type="password"
                                                        value={passwordData.current}
                                                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="new-password">새 비밀번호</Label>
                                                    <Input
                                                        id="new-password"
                                                        type="password"
                                                        value={passwordData.new}
                                                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                                    />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="confirm-password">새 비밀번호 확인</Label>
                                                    <Input
                                                        id="confirm-password"
                                                        type="password"
                                                        value={passwordData.confirm}
                                                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit" onClick={handlePasswordChange} disabled={isLoading}>
                                                    {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                                                    비밀번호 변경
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5">
                                    <div className="flex items-center gap-4">
                                        <Shield className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">2단계 인증</p>
                                            <p className="text-sm text-muted-foreground">계정 보안을 강화하세요.</p>
                                        </div>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5">
                                    <div className="flex items-center gap-4">
                                        <Bell className="w-5 h-5 text-muted-foreground" />
                                        <div>
                                            <p className="font-medium">마케팅 알림 수신</p>
                                            <p className="text-sm text-muted-foreground">이벤트 및 프로모션 소식 받기</p>
                                        </div>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-glass border-white/10">
                        <CardHeader>
                            <CardTitle>결제 수단</CardTitle>
                            <CardDescription>
                                등록된 카드 및 결제 정보를 관리합니다.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5">
                                <div className="flex items-center gap-4">
                                    <CreditCard className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium">Visa **** 1234</p>
                                        <p className="text-sm text-muted-foreground">만료일: 12/25</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-500 hover:bg-red-500/10">삭제</Button>
                            </div>
                            <Button variant="outline" className="w-full mt-4">
                                + 새 카드 추가
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="text-center pt-8 pb-4">
                        <Button variant="ghost" className="text-red-400 hover:text-red-500 hover:bg-red-500/10 gap-2">
                            <LogOut className="w-4 h-4" />
                            회원 탈퇴
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div >
    );
}
