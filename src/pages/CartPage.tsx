import React, { useState } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { Trash2, Plus, Minus, Gift, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const CartPage: React.FC = () => {
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

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res.message);
    setPromoInput('');
  };

  return (
    <main className="py-16 sm:py-24 bg-[#FAF6F0] text-[#2D1B1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-16">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
            Your Sanctuary
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2D1B1A]">
            YOUR SHOPPING BAG
          </h1>
          <p className="text-sm text-[#2D1B1A]/70">
            {totalQuantity} {totalQuantity === 1 ? 'creation' : 'creations'} reserved in your concierge parcel.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-16 text-center max-w-xl mx-auto space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF6F0] border border-[#C9A961]/40 text-[#6B2C3E] mx-auto flex items-center justify-center">
              <Gift className="w-7 h-7 stroke-[1.5]" />
            </div>
            <h2 className="font-serif text-2xl text-[#2D1B1A]">Your bag is currently empty</h2>
            <p className="text-xs text-[#2D1B1A]/70 leading-relaxed max-w-sm mx-auto">
              Explore the Velvet Lollipop body care suite and discover the quiet luxury of unhurried ritual.
            </p>
            <button
              onClick={() => navigate('/collections/velvet-lollipop')}
              className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer"
            >
              Discover The Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Items Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Shipping tracker bar */}
              <div className="bg-[#FFFFFF] p-6 border border-[#E8D5C4] space-y-2 text-xs">
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-[#6B2C3E] font-semibold flex items-center gap-2">
                    <span>✦</span>
                    <span>Your order qualifies for complimentary white-glove courier shipping.</span>
                  </span>
                ) : (
                  <div className="space-y-1.5">
                    <span className="text-[#2D1B1A]/80">
                      Add <strong className="text-[#6B2C3E]">{formatPrice(Math.max(0, freeShippingThreshold - subtotal))}</strong> more for complimentary concierge delivery.
                    </span>
                    <div className="w-full bg-[#E8D5C4]/40 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#6B2C3E] h-full transition-all duration-300"
                        style={{ width: `${freeShippingProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="bg-[#FFFFFF] border border-[#E8D5C4] divide-y divide-[#E8D5C4]">
                {items.map((item) => (
                  <div key={item.product.id} className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6">
                    <div
                      onClick={() => navigate(`/products/${item.product.slug}`)}
                      className="w-28 h-28 bg-[#FAF6F0] border border-[#E8D5C4] shrink-0 cursor-pointer overflow-hidden"
                    >
                      <BrandAssetImage
                        assetId={item.product.assetId}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#D4A574]">
                            {item.product.category}
                          </span>
                          <h3
                            onClick={() => navigate(`/products/${item.product.slug}`)}
                            className="font-serif text-lg font-semibold text-[#2D1B1A] hover:text-[#6B2C3E] cursor-pointer"
                          >
                            {item.product.name}
                          </h3>
                          <span className="text-xs text-[#2D1B1A]/60">{item.product.size}</span>
                        </div>

                        <span className="font-serif text-base font-bold text-[#6B2C3E] tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-[#E8D5C4] bg-[#FFFFFF]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 text-[#2D1B1A]/70 hover:text-[#6B2C3E] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-4 text-xs font-semibold tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 text-[#2D1B1A]/70 hover:text-[#6B2C3E] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-xs text-[#2D1B1A]/50 hover:text-[#6B2C3E] flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Complimentary Velvet Gift Presentation Box */}
              <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Gift className="w-5 h-5 text-[#6B2C3E]" />
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2D1B1A]">
                        Complimentary Bespoke Velvet Ribbon & Gift Card
                      </h4>
                      <p className="text-[11px] text-[#2D1B1A]/60">
                        Every order can be finished in our signature burgundy ribbon.
                      </p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={giftWrapping}
                    onChange={(e) => setGiftWrapping(e.target.checked)}
                    className="accent-[#6B2C3E] cursor-pointer w-4 h-4"
                  />
                </div>

                {giftWrapping && (
                  <div className="pt-3 border-t border-[#E8D5C4] space-y-1.5 animate-in fade-in">
                    <label className="text-[11px] uppercase tracking-wider text-[#2D1B1A]/70 block font-medium">
                      Personal Calligraphy Message:
                    </label>
                    <textarea
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      rows={3}
                      className="w-full text-xs p-3 bg-[#FAF6F0] border border-[#E8D5C4] focus:outline-hidden focus:border-[#6B2C3E]"
                      placeholder="Add a personal gift message to accompany this order..."
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Right Summary Sticky Card */}
            <div className="lg:col-span-4 bg-[#FFFFFF] border border-[#E8D5C4] p-8 space-y-6 shadow-sm sticky top-28">
              <h3 className="font-serif text-xl font-semibold text-[#2D1B1A] border-b border-[#E8D5C4] pb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-[#2D1B1A]/70">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-semibold text-[#2D1B1A]">{formatPrice(subtotal, true)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#6B2C3E]">
                    <span>VIP Launch Privilege ({appliedPromo})</span>
                    <span className="tabular-nums font-semibold">-{formatPrice(discountAmount, true)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#2D1B1A]/70">
                  <span>Concierge Shipping</span>
                  <span className="tabular-nums font-semibold text-[#2D1B1A]">
                    {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee, true)}
                  </span>
                </div>

                <div className="flex justify-between text-[#2D1B1A]/70">
                  <span>Estimated Tax</span>
                  <span className="tabular-nums font-semibold text-[#2D1B1A]">{formatPrice(taxAmount, true)}</span>
                </div>

                <div className="pt-4 border-t border-[#E8D5C4] flex justify-between font-bold text-sm text-[#2D1B1A]">
                  <span>Total Amount</span>
                  <span className="tabular-nums text-lg text-[#6B2C3E]">{formatPrice(grandTotal, true)}</span>
                </div>
              </div>

              {/* Promo Code Box */}
              <div className="pt-2 border-t border-[#E8D5C4] space-y-2">
                {appliedPromo ? (
                  <div className="bg-[#FAF6F0] p-2.5 border border-[#D4A574]/40 flex items-center justify-between text-xs">
                    <span className="text-[#6B2C3E] font-medium">{appliedPromo} Active</span>
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
                      className="flex-1 bg-[#FAF6F0] border border-[#E8D5C4] px-3 py-2 text-xs uppercase tracking-wider focus:outline-hidden focus:border-[#6B2C3E]"
                    />
                    <button
                      type="submit"
                      className="bg-[#2D1B1A] text-[#FAF6F0] px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#6B2C3E] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoFeedback && (
                  <p className="text-[10px] text-[#6B2C3E] italic">{promoFeedback}</p>
                )}
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => setIsCheckoutOpen(true)}
                className="w-full bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#2D1B1A]/50 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4A574]" />
                <span>Encrypted 256-Bit SSL Checkout Security</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
