import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Lock, Bell, Camera } from "lucide-react";
import { useState } from "react";

const AccountSettings = () => {
    const [user, setUser] = useState({
        name: "VibeUser_001",
        email: "user@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
        notifications: {
            email: true,
            marketing: false
        }
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock save
        alert("정보가 저장되었습니다.");
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="mb-8">
                <h1 className="text-2xl font-bold font-display mb-1">계정 설정</h1>
                <p className="text-muted-foreground text-sm">프로필 정보와 계정 보안을 관리하세요.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Profile Section */}
                <section className="space-y-6 bg-glass p-8 rounded-2xl border border-white/5">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        프로필 정보
                    </h2>

                    <div className="flex items-center gap-6">
                        <div className="relative group cursor-pointer">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-20 h-20 rounded-full bg-secondary/20 object-cover border-2 border-white/10"
                            />
                            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">프로필 사진</p>
                            <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 최대 1MB.</p>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">닉네임</Label>
                            <Input
                                id="name"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                className="bg-background/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">이메일</Label>
                            <Input
                                id="email"
                                type="email"
                                value={user.email}
                                disabled
                                className="bg-background/20 text-muted-foreground"
                            />
                        </div>
                    </div>
                </section>

                {/* Security Section */}
                <section className="space-y-6 bg-glass p-8 rounded-2xl border border-white/5">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Lock className="w-5 h-5 text-primary" />
                        보안
                    </h2>

                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">현재 비밀번호</Label>
                            <Input id="current-password" type="password" className="bg-background/50" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">새 비밀번호</Label>
                            <Input id="new-password" type="password" className="bg-background/50" />
                        </div>
                    </div>
                </section>

                {/* Notifications Section */}
                <section className="space-y-6 bg-glass p-8 rounded-2xl border border-white/5">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                        <Bell className="w-5 h-5 text-primary" />
                        알림 설정
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">이메일 알림</Label>
                                <p className="text-xs text-muted-foreground">구매 내역 및 주요 보안 알림을 받습니다.</p>
                            </div>
                            <Switch
                                checked={user.notifications.email}
                                onCheckedChange={(c) => setUser({ ...user, notifications: { ...user.notifications, email: c } })}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">마케팅 정보 수신</Label>
                                <p className="text-xs text-muted-foreground">새로운 에셋 추천 및 할인 소식을 받습니다.</p>
                            </div>
                            <Switch
                                checked={user.notifications.marketing}
                                onCheckedChange={(c) => setUser({ ...user, notifications: { ...user.notifications, marketing: c } })}
                            />
                        </div>
                    </div>
                </section>

                <div className="flex justify-end gap-4">
                    <Button type="button" variant="outline">취소</Button>
                    <Button type="submit">변경사항 저장</Button>
                </div>
            </form>
        </div>
    );
};

export default AccountSettings;
