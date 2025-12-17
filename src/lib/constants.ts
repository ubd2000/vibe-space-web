
export const CART_STORAGE_KEY = 'vibespace-cart';

export const DEMO_COUPONS: Record<string, { discount: number; description: string }> = {
    'WELCOME10': { discount: 10, description: '신규 회원 10% 할인' },
    'CYBER20': { discount: 20, description: '사이버펑크 특별 20% 할인' },
    'VTUBER15': { discount: 15, description: 'VTuber 아바타 15% 할인' },
};

export interface CategoryStructure {
    name: string;
    subcategories: {
        name: string;
        details: string[];
    }[];
}

export const CATEGORIES: CategoryStructure[] = [
    {
        name: "3D 모델",
        subcategories: [
            {
                name: "아바타",
                details: ["여성", "남성", "공용/무성", "SD/치비", "수인/퍼리", "로봇/메카닉"]
            },
            {
                name: "의상",
                details: ["캐주얼", "판타지", "테크/사이버펑크", "제복/유니폼", "드레스/정장", "전통의상"]
            },
            {
                name: "헤어/성형",
                details: ["헤어", "눈/얼굴 텍스처", "메이크업"]
            },
            {
                name: "악세사리",
                details: ["모자/헤드웨어", "무기/장비", "쥬얼리", "날개/꼬리"]
            }
        ]
    },
    {
        name: "2D 에셋",
        subcategories: [
            {
                name: "일러스트",
                details: ["방송용 소스", "캐릭터 시트", "배경", "이모티콘"]
            },
            {
                name: "Live2D",
                details: ["완성 모델", "파츠"]
            },
            {
                name: "UI/디자인",
                details: ["방송 오버레이", "로고/타이포", "배너/썸네일"]
            }
        ]
    },
    {
        name: "도구 및 기타",
        subcategories: [
            {
                name: "에셋 지원",
                details: ["쉐이더", "파티클/이펙트", "애니메이션/포즈"]
            },
            {
                name: "스크립트/툴",
                details: ["유니티 툴", "블렌더 애드온"]
            }
        ]
    }
];

export const SUGGESTED_TAGS = [
    // 플랫폼
    "VRChat", "Unity", "Blender", "Unreal Engine", "Resonite",
    // 규격
    "PhysBone", "Quest 대응", "FullBody", "PC Only",
    // 분위기/스타일
    "Cyberpunk", "Gothic", "Cute", "Horror", "Pastel", "Sci-Fi", "Fantasy", "Realism",
    // 라이선스
    "상업이용가능", "방송용", "R18"
];
