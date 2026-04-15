import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 요청의 경로명 가져오기 (예: /, /protected)
    const path = request.nextUrl.pathname;

    // 보호된 경로 정의
    const protectedPaths = ['/buyer', '/creator', '/admin'];

    // 현재 경로가 보호된 경로로 시작하는지 확인
    // 정확한 경로 매칭: /creator는 매칭, /creators는 매칭 안 됨
    const isProtected = protectedPaths.some((prefix) =>
        path === prefix || path.startsWith(prefix + '/')
    );

    if (isProtected) {
        // 클라이언트 측 인증에서 사용하는 쿠키(또는 해당되는 경우 헤더)에서 "user" 또는 "accessToken" 확인
        // 참고: 클라이언트에서 localStorage를 사용하여 인증하므로, 미들웨어(서버 측)는
        // 토큰이 쿠키에 없으면 접근할 수 없을 수 있습니다.
        // 그러나 간단한 클라이언트 측 가드 시뮬레이션이나 나중에 쿠키로 마이그레이션하는 경우를 위해:

        // 현재는 localStorage 기반 인증을 구현했으므로, 실제 보호는 클라이언트 측에서 발생하거나
        // 로그인 시 쿠키를 설정해야 합니다.
        // 이 단계에서는 레이아웃에서 클라이언트 측 리디렉션을 강제하거나
        // 쿠키를 설정하기로 결정한 경우 쿠키를 확인할 수 있다고 가정합니다.

        // 전략: localStorage를 사용했으므로 당분간 대시보드에 대한 클라이언트 측 보호를 유지합니다.
        // 미들웨어는 강력하지만 쿠키가 필요합니다.
        // 대시보드 보호를 위해 클라이언트 컴포넌트 래퍼/훅에 의존하거나
        // 로그인을 쿠키 설정으로 전환합니다.

        // 현재 구현(localStorage)에서는 미들웨어가 토큰을 볼 수 없습니다.
        // 따라서 이 미들웨어 파일은 향후 쿠키 마이그레이션을 위한 플레이스홀더입니다.
        // 대신 AuthGuard 컴포넌트를 구현하겠습니다.
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * 다음으로 시작하는 경로를 제외한 모든 요청 경로와 일치:
         * - api (API 라우트)
         * - _next/static (정적 파일)
         * - _next/image (이미지 최적화 파일)
         * - favicon.ico (파비콘 파일)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
