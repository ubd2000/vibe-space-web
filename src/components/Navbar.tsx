'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Users, Palette, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CategoryService, CategoryTree } from "@/services/category.service";
import { ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import * as LucideIcons from "lucide-react";

// Lucide 아이콘을 동적으로 렌더링하는 헬퍼 함수
const renderIcon = (iconUrl: string | undefined) => {
  if (!iconUrl || !iconUrl.startsWith('lucide:')) return null;
  const iconName = iconUrl.replace('lucide:', '');
  const pascalCase = iconName.split('-').map(part =>
    part.charAt(0).toUpperCase() + part.slice(1)
  ).join('');
  const Icon = (LucideIcons as any)[pascalCase];
  return Icon ? <Icon className="w-4 h-4" /> : null;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const [categories, setCategories] = useState<CategoryTree[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const navLinks = [
    { name: "크리에이터", href: "/creators", icon: Palette },
    { name: "커뮤니티", href: "/community", icon: Users },
  ];

  // API에서 카테고리 가져오기
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoryLoading(true);
        const data = await CategoryService.getCategoryTree();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setCategoryLoading(false);
      }
    };
    loadCategories();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-lg">V</span>
            </div>
            <span className="font-display font-bold text-xl gradient-text">Vibe Space</span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden md:flex items-center gap-8">
            {/* 마켓플레이스 메가 메뉴 트리거 */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-2">
                <ShoppingBag className="w-4 h-4" />
                <span>마켓플레이스</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>

              {/* 메가 메뉴 콘텐츠 */}
              <div className="absolute top-full left-0 w-[600px] p-6 rounded-xl glass border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                {categoryLoading ? (
                  <div className="text-center py-4 text-sm text-muted-foreground">카테고리 로딩 중...</div>
                ) : (
                  <div className="grid grid-cols-3 gap-8">
                    {categories.map((category) => (
                      <div key={category.id}>
                        <h3 className="font-bold text-primary mb-3 text-sm flex items-center gap-1">
                          {renderIcon(category.iconUrl)}
                          {category.name}
                        </h3>
                        <div className="space-y-4">
                          {category.subcategories.map((sub) => (
                            <div key={sub.id}>
                              <Link href={`/marketplace?category=${category.slug}&subcategory=${sub.slug}`} className="block text-xs font-semibold text-foreground hover:text-primary mb-1">
                                {sub.name}
                              </Link>
                              <div className="flex flex-col gap-1 pl-2 border-l border-white/10">
                                {sub.subcategories.map((detail) => (
                                  <Link
                                    key={detail.id}
                                    href={`/marketplace?category=${category.slug}&subcategory=${sub.slug}&detail=${detail.slug}`}
                                    className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                                  >
                                    {detail.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 transition-colors duration-300 ${pathname === link.href ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}`}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* CTA 버튼들 */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/become-creator" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors mr-2">
              크리에이터 입점
            </Link>
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* 크리에이터 마이 프로필 (데모 링크) */}
            {user ? (
              <>
                <Link href={user.role === 'CREATOR' ? "/creator/dashboard" : "/buyer/dashboard"}>
                  <Button variant="ghost" className="text-primary hover:text-primary/80">
                    <Users className="w-4 h-4 mr-2" />
                    내 프로필
                  </Button>
                </Link>
                <Button variant="ghost" onClick={logout}>로그아웃</Button>
              </>
            ) : (
              isLoading ? null : (
                <>
                  <Link href="/login">
                    <Button variant="ghost">로그인</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="glow">시작하기</Button>
                  </Link>
                </>
              )
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 모바일 네비게이션 */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors px-2 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link href="/become-creator" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full">크리에이터 입점</Button>
                </Link>
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-between">
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      장바구니
                    </span>
                    {itemCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </Link>
                {user ? (
                  <>
                    <Link href={user.role === 'CREATOR' ? "/creator/dashboard" : "/buyer/dashboard"} onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        내 프로필
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full" onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}>로그아웃</Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">로그인</Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button variant="glow" className="w-full">시작하기</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
