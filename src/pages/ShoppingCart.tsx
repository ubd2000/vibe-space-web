import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart as ShoppingCartIcon,
  Trash2,
  ChevronRight,
  ShoppingBag,
  Tag,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/lib/cart";
import { toast } from "sonner";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { cart, itemCount, remove, applyCouponCode, removeCouponCode, totals } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleRemoveItem = (itemId: string, itemName: string) => {
    remove(itemId);
    toast.success("상품이 제거되었습니다", {
      description: `${itemName}이(가) 장바구니에서 제거되었습니다`,
    });
  };

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      toast.error("쿠폰 코드를 입력해주세요");
      return;
    }

    setIsApplyingCoupon(true);
    const result = applyCouponCode(couponInput.trim());

    if (result.valid) {
      toast.success("쿠폰이 적용되었습니다", {
        description: `${result.discount}% 할인이 적용되었습니다`,
      });
      setCouponInput("");
    } else {
      toast.error("유효하지 않은 쿠폰 코드입니다", {
        description: "쿠폰 코드를 확인해주세요",
      });
    }

    setIsApplyingCoupon(false);
  };

  const handleRemoveCoupon = () => {
    removeCouponCode();
    toast.info("쿠폰이 제거되었습니다");
  };

  const handleCheckout = () => {
    if (itemCount === 0) return;
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in">
            <Link to="/" className="hover:text-primary transition-colors">
              홈
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">장바구니</span>
          </div>

          {/* Page Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              장바구니
            </h1>
            <p className="text-muted-foreground">
              {itemCount > 0 ? `${itemCount}개의 상품` : "장바구니가 비어있습니다"}
            </p>
          </div>

          {/* Main Content */}
          {itemCount === 0 ? (
            /* Empty State */
            <div
              className="flex flex-col items-center justify-center py-20 glass rounded-2xl border border-white/5 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6">
                <ShoppingCartIcon className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                장바구니가 비어있습니다
              </h2>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                마켓플레이스에서 멋진 아바타를 찾아보세요
              </p>
              <Link to="/marketplace">
                <Button variant="hero" size="lg">
                  <ShoppingBag className="w-5 h-5" />
                  마켓플레이스 둘러보기
                </Button>
              </Link>
            </div>
          ) : (
            /* Cart Items + Order Summary */
            <div className="grid lg:grid-cols-[1fr_400px] gap-8">
              {/* Left: Cart Items List */}
              <div className="space-y-4">
                {cart.items.map((item, index) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    index={index}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>

              {/* Right: Order Summary */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="glass rounded-2xl p-6 border border-white/5 space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    주문 요약
                  </h2>

                  {/* Coupon Input */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      쿠폰 코드
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="쿠폰 코드 입력"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleApplyCoupon()}
                        className="bg-background/50 border-white/10 focus:border-primary/50"
                        disabled={!!cart.couponCode}
                      />
                      <Button
                        variant="outline"
                        onClick={handleApplyCoupon}
                        disabled={isApplyingCoupon || !!cart.couponCode}
                      >
                        적용
                      </Button>
                    </div>

                    {/* Applied Coupon Badge */}
                    {cart.couponCode && (
                      <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-primary">
                            {cart.couponCode}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            (-{cart.discount}%)
                          </span>
                        </div>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-primary hover:text-primary/70 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-white/10" />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">상품 금액</span>
                      <span className="font-medium text-foreground">
                        ₩{totals.subtotal.toLocaleString()}
                      </span>
                    </div>

                    {totals.discount > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">할인 금액</span>
                        <span className="font-medium text-accent">
                          -₩{totals.discount.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-white/10" />

                  {/* Total */}
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-foreground">
                      총 결제 금액
                    </span>
                    <span className="font-display text-2xl font-bold text-primary">
                      ₩{totals.total.toLocaleString()}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    결제하기
                  </Button>

                  {/* Info Text */}
                  <p className="text-xs text-muted-foreground text-center">
                    디지털 상품은 구매 후 즉시 다운로드 가능합니다
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Cart Item Card Component
interface CartItemCardProps {
  item: CartItem;
  index: number;
  onRemove: (id: string, name: string) => void;
}

const CartItemCard = ({ item, index, onRemove }: CartItemCardProps) => {
  return (
    <div
      className="flex gap-4 p-4 rounded-xl glass border border-white/5 group hover:border-primary/30 transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Image */}
      <Link to={`/avatar/${item.id}`} className="shrink-0">
        <div className="w-24 h-24 rounded-lg overflow-hidden bg-black/20">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <Link to={`/avatar/${item.id}`}>
          <h3 className="font-semibold text-foreground hover:text-primary transition-colors truncate mb-1">
            {item.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mb-2">{item.creator}</p>
        <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary">
          {item.category}
        </span>
      </div>

      {/* Price & Remove */}
      <div className="flex flex-col items-end justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(item.id, item.name)}
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
        <div className="text-right">
          <p className="font-display font-bold text-primary text-lg">
            ₩{item.price.toLocaleString()}
          </p>
          {item.originalPrice && (
            <p className="text-sm text-muted-foreground line-through">
              ₩{item.originalPrice.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
