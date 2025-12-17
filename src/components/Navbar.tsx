'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag, Users, Palette, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { CATEGORIES } from "@/lib/constants";
import { ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();
  const pathname = usePathname();

  const navLinks = [
    { name: "크리에이터", href: "/creators", icon: Palette },
    { name: "커뮤니티", href: "/community", icon: Users },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-lg">V</span>
            </div>
            <span className="font-display font-bold text-xl gradient-text">Vibe Space</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Marketplace Mega Menu Trigger */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors py-2">
                <ShoppingBag className="w-4 h-4" />
                <span>마켓플레이스</span>
                <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
              </button>

              {/* Mega Menu Content */}
              <div className="absolute top-full left-0 w-[600px] p-6 rounded-xl glass border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="grid grid-cols-3 gap-8">
                  {CATEGORIES.map((category) => (
                    <div key={category.name}>
                      <h3 className="font-bold text-primary mb-3 text-sm">{category.name}</h3>
                      <div className="space-y-4">
                        {category.subcategories.map((sub) => (
                          <div key={sub.name}>
                            <Link href={`/marketplace?category=${category.name}&subcategory=${sub.name}`} className="block text-xs font-semibold text-foreground hover:text-primary mb-1">
                              {sub.name}
                            </Link>
                            <div className="flex flex-col gap-1 pl-2 border-l border-white/10">
                              {sub.details.map((detail) => (
                                <Link
                                  key={detail}
                                  href={`/marketplace?category=${category.name}&subcategory=${sub.name}&detail=${detail}`}
                                  className="text-[10px] text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {detail}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
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

          {/* CTA Buttons */}
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
            {/* Creator My Profile (Demo Link) */}
            <Link href="/creators/me">
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                <Users className="w-4 h-4 mr-2" />
                내 프로필
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost">로그인</Button>
            </Link>
            <Link href="/signup">
              <Button variant="glow">시작하기</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
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
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full">로그인</Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <Button variant="glow" className="w-full">시작하기</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
