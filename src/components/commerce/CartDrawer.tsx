import React, { useState } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { X, Trash2, Plus, Minus, Gift, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { navigate } = useRouter();
  const { formatPrice } = useCurrency();
  const {
    items,
    totalQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    grandTotal,
    freeShippingThreshold,
    freeShippingProgress,
    isCartOpen,
    setIsCartOpen,
    giftWrapping,
    setGiftWrapping,
    giftMessage,
    setGiftMessage,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    updateQuantity,
    removeFromCart,
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res.message);
    setPromoInput('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#2D1B1A]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF6F0] text-[#2D1B1A] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#E8D5C4] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold text-[#6B2C3E] uppercase tracking-widest">
                Shopping Bag
              </span>
              <span className="text-xs text-[#2D1B1A]/60 tabular-nums">({totalQuantity})</span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#2D1B1A]/70 hover:text-[#6B2C3E] transition-colors cursor-pointer"
              aria-label="Close Shopping Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Tracker */}
          <div className="bg-[#FFFFFF] px-6 py-3 border-b border-[#E8D5C4]/60 text-xs">
            {subtotal >= freeShippingThreshold ? (
              <span className="text-[#6B2C3E] font-medium flex items-center gap-1.5">
                <span>✦</span>
                <span>You have unlocked complimentary concierge delivery</span>
              </span>
            ) : (
              <div className="space-y-1.5">
                <span className="text-[#2D1B1A]/80">
                  Add{' '}
                  <strong className="text-[#6B2C3E]">
                    {formatPrice(Math.max(0, freeShippingThreshold - subtotal))}
                  </strong>{' '}
                  more for complimentary white-glove shipping
                </span>
                <div className="w-full bg-[#E8D5C4]/50 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#6B2C3E] h-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8D5C4]/40 text-[#6B2C3E] mx-auto flex items-center justify-center">
                  <Gift className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-lg text-[#2D1B1A]">Your bag is currently empty</h3>
                <p className="text-xs text-[#2D1B1A]/70 max-w-xs mx-auto leading-relaxed">
                  Discover the Velvet Lollipop body care suite and begin your daily sanctuary.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/collections/velvet-lollipop');
                  }}
                  className="bg-[#6B2C3E] text-[#FAF6F0] px-6 py-3 text-xs tracking-widest uppercase font-semibold transition-colors cursor-pointer"
                >
                  Explore The Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 pb-6 border-b border-[#E8D5C4]/60 group"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate(`/products/${item.product.slug}`);
                    }}
                    className="w-20 h-24 bg-[#FAF6F0] border border-[#E8D5C4] shrink-0 overflow-hidden cursor-pointer"
                  >
                    <BrandAssetImage
                      assetId={item.product.assetId}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            setIsCartOpen(false);
                            navigate(`/products/${item.product.slug}`);
                          }}
                          className="font-serif text-sm font-semibold text-[#2D1B1A] hover:text-[#6B2C3E] transition-colors cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#2D1B1A]/40 hover:text-[#6B2C3E] p-1 transition-colors cursor-pointer"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-[10px] tracking-wider uppercase text-[#D4A574] block mt-0.5">
                        {item.product.size}
                      </span>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E8D5C4] bg-[#FFFFFF]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-[#6B2C3E] text-[#2D1B1A]/70 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-medium tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-[#6B2C3E] text-[#2D1B1A]/70 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-semibold text-sm tabular-nums text-[#2D1B1A]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Complimentary Gift Ribbon Packaging Option */}
            {items.length > 0 && (
              <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#6B2C3E]" />
                    <span className="text-xs font-semibold text-[#2D1B1A]">
                      Complimentary Luxury Gift Presentation
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={giftWrapping}
                    onChange={(e) => setGiftWrapping(e.target.checked)}
                    className="accent-[#6B2C3E] cursor-pointer"
                  />
                </div>
                {giftWrapping && (
                  <div className="pt-2 border-t border-[#E8D5C4]/40 space-y-1.5 animate-in fade-in">
                    <label className="text-[10px] uppercase tracking-wider text-[#2D1B1A]/70 block font-medium">
                      Bespoke Calligraphy Gift Note:
                    </label>
                    <textarea
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      rows={2}
                      className="w-full text-xs p-2.5 bg-[#FAF6F0] border border-[#E8D5C4] focus:outline-hidden focus:border-[#6B2C3E]"
                      placeholder="Write your personal gift message..."
                    />
                  </div>
                )}
              </div>
            )}

            {/* Promo Code Input */}
            {items.length > 0 && (
              <div className="space-y-2">
                {appliedPromo ? (
                  <div className="bg-[#E8D5C4]/30 border border-[#D4A574]/40 p-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#6B2C3E]">
                      <Tag className="w-3.5 h-3.5" />
                      <span className="font-semibold">{appliedPromo} applied (-{formatPrice(discountAmount, true)})</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-[10px] uppercase tracking-wider text-[#2D1B1A]/60 hover:text-[#6B2C3E] underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. VELVET10)"
                      className="flex-1 bg-[#FFFFFF] border border-[#E8D5C4] px-3 py-2 text-xs uppercase tracking-wider focus:outline-hidden focus:border-[#6B2C3E]"
                    />
                    <button
                      type="submit"
                      className="bg-[#2D1B1A] text-[#FAF6F0] px-4 py-2 text-xs tracking-wider uppercase font-medium hover:bg-[#6B2C3E] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoFeedback && (
                  <p className="text-[10px] text-[#6B2C3E] italic">{promoFeedback}</p>
                )}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-[#FFFFFF] border-t border-[#E8D5C4] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#2D1B1A]/70">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-[#2D1B1A]">{formatPrice(subtotal, true)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#6B2C3E]">
                    <span>VIP Promotion ({appliedPromo})</span>
                    <span className="tabular-nums font-medium">-{formatPrice(discountAmount, true)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#2D1B1A]/70">
                  <span>Concierge Shipping</span>
                  <span className="tabular-nums font-medium text-[#2D1B1A]">
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee, true)}
                  </span>
                </div>

                <div className="flex justify-between text-[#2D1B1A]/70">
                  <span>Estimated Tax</span>
                  <span className="tabular-nums font-medium text-[#2D1B1A]">{formatPrice(taxAmount, true)}</span>
                </div>

                <div className="pt-2 border-t border-[#E8D5C4] flex justify-between text-sm font-semibold text-[#2D1B1A]">
                  <span>Total Due</span>
                  <span className="tabular-nums text-base text-[#6B2C3E]">{formatPrice(grandTotal, true)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full text-center py-2 text-xs text-[#2D1B1A]/70 hover:text-[#6B2C3E] underline cursor-pointer"
                >
                  View Full Bag & Gifting Preferences
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#2D1B1A]/50 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4A574]" />
                <span>Encrypted 256-Bit SSL Checkout Security</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
