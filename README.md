# 아바타 바이브 스페이스 (Avatar Vibe Space)

**Avatar Vibe Space**는 VRChat 아바타 및 관련 에셋을 거래하고 정보를 공유할 수 있는 종합 플랫폼입니다. 크리에이터와 사용자를 연결하며, 커뮤니티 기능을 통해 다양한 교류를 지원합니다.

## ✨ 주요 기능

### 🛍️ 마켓플레이스 (Marketplace)
- **아바타 및 에셋 구매**: 다양한 스타일의 아바타와 액세서리를 탐색하고 구매할 수 있습니다.
- **상세 페이지**: 3D 모델 뷰어를 통해 아바타를 미리 확인하고 상세 정보를 볼 수 있습니다.
- **장바구니**: 원하는 상품을 담고 쿠폰을 적용하여 구매를 진행할 수 있습니다.

### 🎨 크리에이터 센터 (Creator Center)
- **대시보드**: 판매 현황, 수익 통계를 한눈에 확인할 수 있습니다.
- **상품 관리**: 새로운 상품을 등록하고 관리할 수 있습니다.
- **정산 관리**: 수익금을 정산받고 내역을 조회할 수 있습니다.

### 👥 커뮤니티 (Community)
- **정보/팁**: 유니티, 블렌더 팁 등 유용한 정보를 공유합니다.
- **아바타 자랑**: 자신의 아바타를 뽐내고 피드백을 받을 수 있습니다.
- **자유게시판**: 자유로운 주제로 소통하는 공간입니다.

## 🛠️ 기술 스택 (Tech Stack)

이 프로젝트는 최신 모던 웹 기술을 사용하여 구축되었습니다.

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI 기반)
- **State Management**: React Context, [TanStack Query](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)
- **3D Viewer**: [@google/model-viewer](https://modelviewer.dev/)

## 🚀 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

### 1. 프로젝트 복제 (Clone)
```bash
git clone <REPOSITORY_URL>
cd avatar-vibe-space
```

### 2. 의존성 설치 (Install Dependencies)
```bash
npm install
```

### 3. 개발 서버 실행 (Run Dev Server)
```bash
npm run dev
```
브라우저에서 `http://localhost:3000`으로 접속하여 확인합니다.

### 4. 빌드 (Build)
프로덕션 배포를 위한 빌드 명령입니다.
```bash
npm run build
```

## 📂 폴더 구조 (Directory Structure)

```
src/
├── app/                 # Next.js App Router 페이지 및 레이아웃
├── assets/              # 이미지 및 정적 파일
├── components/          # 재사용 가능한 UI 컴포넌트
│   ├── layout/          # 레이아웃 관련 컴포넌트 (Buyer, Creator)
│   ├── ui/              # shadcn/ui 기본 컴포넌트
│   └── ...              # 비즈니스 로직 컴포넌트
├── hooks/               # 커스텀 React Hooks (예: useCart)
└── lib/                 # 유틸리티 함수 및 상수 (utils.ts, cart.ts, constants.ts)
```

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
