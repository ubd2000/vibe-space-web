import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
            <div className="text-center space-y-6 max-w-md mx-auto animate-fade-in">
                <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-12 h-12 text-secondary" />
                </div>

                <h1 className="font-display text-4xl md:text-5xl font-bold">
                    404 Page Not Found
                </h1>

                <p className="text-muted-foreground text-lg">
                    요청하신 페이지를 찾을 수 없습니다. <br />
                    주소가 올바른지 다시 한 번 확인해주세요.
                </p>

                <div className="pt-4">
                    <Link href="/">
                        <Button size="lg" className="gap-2">
                            <Home className="w-4 h-4" />
                            홈으로 돌아가기
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
