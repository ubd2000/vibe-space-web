# 아바타 바이브 스페이스 (Avatar Vibe Space)

**Avatar Vibe Space**는 VRChat 아바타 및 관련 에셋을 거래하고 정보를 공유할 수 있는 종합 플랫폼입니다. 크리에이터와 사용자를 연결하며, 커뮤니티 기능을 통해 다양한 교류를 지원합니다.

## ✨ 주요 기능

### 🛍️ 마켓플레이스 (Marketplace)
- **아바타 및 에셋 구매**: 다양한 스타일의 아바타와 액세서리를 탐색하고 구매할 수 있습니다.
- **상세 페이지**: 3D 모델 뷰어를 통해 아바타를 미리 확인하고 상세 정보를 볼 수 있습니다.
- **장바구니**: 원하는 상품을 담고 쿠폰을 적용하여 구매를 진행할 수 있습니다.

### 🎨 크리에이터 센터 (Creator Center)
- **대시보드**: 판매 현황, 수익 통계, 최근 주문 내역을 한눈에 확인할 수 있습니다.
- **상품 관리**: 새로운 상품을 등록하고 관리할 수 있습니다.
- **포트폴리오**: 작품을 업로드하고 관리할 수 있습니다.
- **판매 분석**: 총 수익, 월별/일별 수익, 주문 통계를 확인할 수 있습니다.
- **정산 관리**: 수익금을 정산받고 내역을 조회할 수 있습니다 (크리에이터 70% / 플랫폼 30% 배분).
- **설정**: 프로필 정보와 소개를 편집할 수 있습니다.

### 👥 커뮤니티 (Community)
- **정보/팁**: 유니티, 블렌더 팁 등 유용한 정보를 공유합니다.
- **아바타 자랑**: 자신의 아바타를 뽐내고 피드백을 받을 수 있습니다.
- **자유게시판**: 자유로운 주제로 소통하는 공간입니다.

## 🛠️ 기술 스택 (Tech Stack)

이 프로젝트는 최신 모던 웹 기술을 사용하여 구축되었습니다.

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI 기반)
- **State Management**: React Context
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **3D Viewer**: [@google/model-viewer](https://modelviewer.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

### Backend
- **Framework**: Spring Boot 3.x (Kotlin)
- **Architecture**: Spring Modulith
- **Database**: PostgreSQL
- **Authentication**: JWT Bearer Token (24시간 유효)
- **API Documentation**: Swagger/OpenAPI

## 🔗 백엔드 연동 (API Integration)

이 프론트엔드 애플리케이션은 Spring Boot 백엔드 API와 통합되어 작동합니다.

### 주요 기능
- **JWT 인증**: 로그인 시 발급된 JWT 토큰을 사용한 인증
- **자동 토큰 관리**: Axios 인터셉터를 통한 자동 토큰 첨부
- **공개/인증 라우팅**:
  - 공개 접근: 상품 조회, 크리에이터 프로필 보기
  - 인증 필요: 장바구니, 주문, 크리에이터 대시보드
- **실시간 데이터**: 백엔드 API와 실시간 연동

### API 엔드포인트
- **Base URL**: `http://localhost:8081/api`
- **Swagger UI**: `http://localhost:8081/swagger-ui.html`

### 서비스 레이어
- `AuthService`: 인증 및 회원가입
- `UserService`: 사용자 관리
- `CreatorService`: 크리에이터 정보
- `ProductService`: 상품 관리
- `OrderService`: 주문 처리
- `CartService`: 장바구니 관리
- `PortfolioService`: 포트폴리오 관리

## 🚀 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

### 사전 요구사항
- **Node.js**: 18.x 이상
- **npm** 또는 **yarn**
- **백엔드 API**: Spring Boot 서버가 `http://localhost:8081`에서 실행 중이어야 합니다

### 1. 프로젝트 복제 (Clone)
```bash
git clone <REPOSITORY_URL>
cd vibe-space-web
```

### 2. 환경 변수 설정 (Optional)
필요한 경우 `.env.local` 파일을 생성하여 API URL을 설정할 수 있습니다:
```env
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

### 3. 의존성 설치 (Install Dependencies)
```bash
npm install
```

### 4. 개발 서버 실행 (Run Dev Server)
```bash
npm run dev
```
브라우저에서 `http://localhost:3000`으로 접속하여 확인합니다.

### 5. 빌드 (Build)
프로덕션 배포를 위한 빌드 명령입니다.
```bash
npm run build
npm start
```

## 📂 폴더 구조 (Directory Structure)

```
src/
├── app/                      # Next.js App Router 페이지 및 레이아웃
│   ├── (auth)/               # 인증 관련 페이지 (로그인, 회원가입)
│   ├── become-creator/       # 크리에이터 신청
│   ├── creator/              # 크리에이터 대시보드
│   │   ├── dashboard/        # 대시보드 메인
│   │   ├── products/         # 상품 관리
│   │   ├── portfolio/        # 포트폴리오 관리
│   │   ├── analytics/        # 판매 분석
│   │   ├── settlement/       # 정산 관리
│   │   └── settings/         # 설정
│   ├── creators/             # 크리에이터 프로필 (공개)
│   ├── products/             # 상품 목록 및 상세
│   ├── cart/                 # 장바구니
│   └── checkout/             # 결제
├── components/               # 재사용 가능한 UI 컴포넌트
│   ├── auth/                 # 인증 가드 컴포넌트
│   ├── layout/               # 레이아웃 (Buyer, Creator)
│   ├── ui/                   # shadcn/ui 기본 컴포넌트
│   └── ...                   # 비즈니스 로직 컴포넌트
├── contexts/                 # React Context (AuthContext)
├── hooks/                    # 커스텀 React Hooks
├── services/                 # API 서비스 레이어
│   ├── auth.service.ts       # 인증 API
│   ├── creator.service.ts    # 크리에이터 API
│   ├── product.service.ts    # 상품 API
│   ├── order.service.ts      # 주문 API
│   ├── cart.service.ts       # 장바구니 API
│   └── portfolio.service.ts  # 포트폴리오 API
└── lib/                      # 유틸리티 함수 및 설정
    ├── api.ts                # Axios 인스턴스 및 인터셉터
    ├── utils.ts              # 공통 유틸리티
    └── constants.ts          # 상수 정의
```

## 🔒 보안 및 인증 (Security & Authentication)

### JWT 토큰 기반 인증
- **토큰 유효 기간**: 24시간
- **자동 갱신**: 토큰 만료 시 재로그인 필요
- **보안 저장**: localStorage에 저장 (프로덕션에서는 httpOnly 쿠키 권장)

### 접근 제어
- **공개 페이지**: 메인, 상품 목록, 크리에이터 프로필
- **로그인 필요**: 장바구니, 주문, 크리에이터 센터
- **자동 리다이렉트**: 미인증 사용자는 자동으로 로그인 페이지로 이동

### 보안 기능
- **AuthGuard**: 클라이언트 측 라우트 보호
- **Middleware**: 서버 측 라우트 검증
- **Axios 인터셉터**: 자동 토큰 첨부 및 인증 오류 처리

---

## 📝 변경 이력 (Changelog)

### v1.2 (2026년 1월 9일)
- **크리에이터 대시보드 완전 API 연동**
  - 실시간 판매 현황 및 주문 데이터 표시
  - 최근 주문 내역 (최대 5개)
- **판매 분석 페이지 추가**
  - 총 수익, 월별/일별 수익 통계
  - 주문 현황 및 상품 통계
  - 전체 주문 내역 테이블
- **정산 관리 페이지 추가**
  - 70/30 수익 배분율 표시
  - 정산 가능/예정 금액 계산
  - 은행 계좌 정보 입력
  - 정산 내역 테이블
- **크리에이터 신청 개선**
  - 입력 검증 강화
  - 중복 신청 방지
  - 상세한 에러 메시지
- **프로필 접근 권한 수정**
  - 크리에이터 프로필 페이지 공개 접근 가능
  - 정확한 경로 매칭 로직 (`/creator` vs `/creators`)
- **API 에러 처리 개선**
  - 공개 엔드포인트는 401/403 시 자동 리다이렉트 방지
  - 토큰 만료 시 자동 로그아웃

### v1.1 (2026년 1월 6일)
- **JWT 인증 시스템 구현**
  - 로그인/회원가입 기능
  - AuthContext를 통한 전역 인증 상태 관리
  - 토큰 기반 API 요청
- **크리에이터 센터 초기 구현**
  - 대시보드, 상품 관리, 포트폴리오
  - 설정 페이지

### v1.0 (2025년 12월)
- 초기 프로젝트 구조 및 UI 구현
- shadcn/ui 기반 컴포넌트 라이브러리
- 마켓플레이스 및 상품 페이지

---

## 📚 참고 자료 (Resources)

- **백엔드 API 문서**: `vibe-space-api/API_ENDPOINTS.md`
- **백엔드 아키텍처**: `vibe-space-api/MODULE_COMMUNICATION_GUIDE.md`
- **Swagger UI**: http://localhost:8081/swagger-ui.html

---

## 📝 라이선스 (License)

이 프로젝트는 MIT 라이선스를 따릅니다.