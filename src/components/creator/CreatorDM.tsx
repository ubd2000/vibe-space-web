'use client';

import { useState, useRef, useEffect } from "react";
import { Send, Image as ImageIcon, Smile, MoreVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'creator';
    timestamp: string;
}

interface CreatorDMProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    creatorName: string;
    creatorAvatar: string | any; // Accept StaticImageData or string
}

export function CreatorDM({ isOpen, onOpenChange, creatorName, creatorAvatar }: CreatorDMProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            content: `안녕하세요! ${creatorName}입니다. 작업 의뢰나 문의사항이 있으시면 편하게 남겨주세요.`,
            sender: 'creator',
            timestamp: '오전 10:00'
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new message arrives
    useEffect(() => {
        if (scrollRef.current) {
            const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages, isOpen]);

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setInputValue("");

        // Simulate auto-reply
        setTimeout(() => {
            const reply: Message = {
                id: (Date.now() + 1).toString(),
                content: "메시지 감사합니다! 현재 작업 중이라 확인이 늦을 수 있습니다. 잠시만 기다려주세요 :)",
                sender: 'creator',
                timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, reply]);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md p-0 flex flex-col bg-background border-l border-border/50 shadow-2xl">
                {/* Header */}
                <SheetHeader className="px-6 py-4 border-b border-border flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar className="h-10 w-10 border border-border">
                                <AvatarImage src={typeof creatorAvatar === 'string' ? creatorAvatar : creatorAvatar.src} alt={creatorName} className="object-cover" />
                                <AvatarFallback>{creatorName[0]}</AvatarFallback>
                            </Avatar>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                        </div>
                        <div className="flex flex-col">
                            <SheetTitle className="text-base font-bold">{creatorName}</SheetTitle>
                            <SheetDescription className="text-xs text-muted-foreground">
                                현재 활동 중
                            </SheetDescription>
                        </div>
                    </div>
                    {/* Custom Close Button provided by SheetContent usually, but we can add actions here */}
                    {/* <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MoreVertical className="w-5 h-5" />
          </Button> */}
                </SheetHeader>

                {/* Chat Area */}
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                    <div className="flex flex-col gap-4 min-h-full justify-end">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex max-w-[80%] flex-col gap-1",
                                    msg.sender === 'user' ? "self-end items-end" : "self-start items-start"
                                )}
                            >
                                <div
                                    className={cn(
                                        "px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm",
                                        msg.sender === 'user'
                                            ? "bg-primary text-primary-foreground rounded-br-none"
                                            : "bg-secondary/10 text-foreground border border-border/50 rounded-bl-none"
                                    )}
                                >
                                    {msg.content}
                                </div>
                                <span className="text-[10px] text-muted-foreground px-1">
                                    {msg.timestamp}
                                </span>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 bg-background border-t border-border">
                    <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
                        <div className="relative">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="메시지 보내기..."
                                className="pr-12 py-6 bg-secondary/5 border-border/50 focus-visible:ring-primary/20"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                disabled={!inputValue.trim()}
                                className={cn(
                                    "absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 transition-all duration-200",
                                    inputValue.trim() ? "opacity-100 scale-100" : "opacity-0 scale-90"
                                )}
                            >
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <ImageIcon className="w-4 h-4" />
                            </Button>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                <Smile className="w-4 h-4" />
                            </Button>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
}
