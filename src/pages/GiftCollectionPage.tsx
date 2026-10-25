import React, { useState } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { PRODUCTS, Product } from '@/src/data/products.ts';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { WishlistButton } from '@/src/components/ui/WishlistButton.tsx';
import { Sparkles, Gift, Check, ArrowRight, Eye } from 'lucide-react';

export const GiftCollectionPage: React.FC = () => {
  const { navigate } = useRouter();
  const { addToCart, setQuickViewProduct } = useCart();
  const { formatPrice } = useCurrency();

  // Signature interaction state: "closed" or "revealed"
  const [revealState, setRevealState] = useState<'closed' | 'revealed'>('closed');
  // When revealed, which of the 4 nestled products is inspected
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('velvet-elixir');

  const giftSet = PRODUCTS.find((p) => p.slug === 'velvet-lollipop-signature-box')!;
  const coreProducts = PRODUCTS.filter((p) => p.category !== 'Gift Collection');
  const activeProduct = PRODUCTS.find((p) => p.slug === selectedProductSlug) || coreProducts[1];

  const handleToggleReveal = () => {
    setRevealState((prev) => (prev === 'closed' ? 'revealed' : 'closed'));
  };

  return (
    <main className="bg-[#FAF6F0] text-[#2D1B1A]">
      {/* Editorial Header */}
      <section className="py-20 sm:py-28 bg-[#2D1B1A] text-[#FAF6F0] text-center border-b border-[#6B2C3E]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#C9A961] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Signature Flagship Experience</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF6F0]">
            THE VELVET REVEAL
          </h1>

          <p className="text-base sm:text-lg text-[#E8D5C4]/90 font-light leading-relaxed max-w-2xl mx-auto">
            Interact with the handcrafted Velvet Lollipop presentation box. Untie the velvet ribbon to uncover the four full-sized treasures nestled within.
          </p>
        </div>
      </section>

      {/* Signature Interactive Velvet Reveal Stage */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="bg-[#FFFFFF] border border-[#E8D5C4] shadow-xl p-6 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Box Stage */}
            <div className="lg:col-span-7 flex flex-col items-center">
              {/* Interactive Reveal Toggle Button */}
              <div className="mb-6 flex items-center gap-4">
                <button
                  onClick={handleToggleReveal}
                  className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
                  <span>
                    {revealState === 'closed' ? 'Untie Ribbon & Reveal Inside' : 'Re-Tie Box'}
                  </span>
                </button>
              </div>

              {/* Box Container */}
              <div className="relative w-full aspect-4/3 max-w-xl bg-[#2D1B1A] border border-[#C9A961]/40 shadow-2xl overflow-hidden flex items-center justify-center p-6 transition-all duration-500">
                {revealState === 'closed' ? (
                  <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-500">
                    <BrandAssetImage
                      assetId="packaging_gift_box_closed"
                      alt="Closed Velvet Lollipop presentation box with plush ribbon"
                      className="w-full h-full object-contain"
                    />
                    <span className="absolute bottom-4 text-xs font-serif italic text-[#D4A574]">
                      Burgundy Rigid Presentation Box · Hand-Tied Velvet Ribbon
                    </span>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
                    <BrandAssetImage
                      assetId="packaging_gift_box_open"
                      alt="Open Velvet Lollipop presentation box with 4 products nestled"
                      className="w-full h-full object-contain"
                    />
                    <span className="absolute bottom-4 text-xs font-serif italic text-[#D4A574]">
                      Peach Velvet Insert · Select Any Product Below to Inspect
                    </span>
                  </div>
                )}
              </div>

              {/* Product Selectors when revealed */}
              {revealState === 'revealed' && (
                <div className="mt-6 w-full max-w-xl grid grid-cols-4 gap-2 animate-in fade-in duration-300">
                  {coreProducts.map((p) => {
                    const isSelected = p.slug === selectedProductSlug;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedProductSlug(p.slug)}
                        className={`p-2.5 text-center border text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#6B2C3E] text-[#FAF6F0] border-[#6B2C3E] font-semibold shadow-xs'
                            : 'bg-[#FAF6F0] text-[#2D1B1A] border-[#E8D5C4] hover:border-[#6B2C3E]'
                        }`}
                      >
                        <span className="block text-[9px] uppercase tracking-wider text-[#D4A574]">
                          Step {p.stepNumber}
                        </span>
                        <span className="font-serif truncate block text-[11px] mt-0.5">{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Information & Product Inspector */}
            <div className="lg:col-span-5 space-y-6">
              {revealState === 'closed' ? (
                /* Information on the Complete Gift Box */
                <div className="space-y-6 animate-in fade-in">
                  <div className="space-y-2">
                    <span className="text-[11px] tracking-[0.25em] uppercase text-[#6B2C3E] font-semibold">
                      The Ultimate Gift Gesture
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D1B1A]">
                      The Velvet Lollipop Keepsake Box
                    </h2>
                    <div className="flex items-baseline gap-4 pt-1">
                      <span className="font-serif text-3xl font-bold text-[#6B2C3E] tabular-nums">
                        {formatPrice(185)}
                      </span>
                      <span className="text-xs text-[#2D1B1A]/60 line-through tabular-nums">
                        {formatPrice(208)} Value
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[#2D1B1A]/80 font-light leading-relaxed">
                    Four coordinated full-size formulations, encased in a rigid keepsake presentation box crafted from heavy bookbinding board, enveloped in deep velvet burgundy paper and finished with hot-stamped gold foil.
                  </p>

                  <ul className="space-y-2 text-xs text-[#2D1B1A]/80">
                    <li className="flex items-center gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#6B2C3E]" />
                      <span>01. Le Bon Bon de Bain (Body Scrub, 200ml)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#6B2C3E]" />
                      <span>02. Velvet Elixir (Body Oil, 100ml)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#6B2C3E]" />
                      <span>03. Velvet Body Lotion (Body Lotion, 250ml)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check className="w-3.5 h-3.5 text-[#6B2C3E]" />
                      <span>04. Velvet Body Spray (Fine Fragrance Mist, 150ml)</span>
                    </li>
                  </ul>

                  <div className="pt-4 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => addToCart(giftSet, 1)}
                        className="flex-1 bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer shadow-md text-center"
                      >
                        Acquire The Gift Set · {formatPrice(185)}
                      </button>
                      <WishlistButton
                        productId={giftSet.id}
                        productName={giftSet.name}
                        variant="detail"
                      />
                    </div>
                    <p className="text-[11px] text-[#2D1B1A]/60 text-center">
                      Includes complimentary personalized calligraphy card & white-glove courier shipping.
                    </p>
                  </div>
                </div>
              ) : (
                /* Inspected Nestled Product Detail */
                <div className="space-y-6 animate-in fade-in">
                  <div className="space-y-2 border-b border-[#E8D5C4] pb-4">
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-[#6B2C3E]">
                      Nestled in Box · Step {activeProduct.stepNumber}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#2D1B1A]">
                      {activeProduct.name}
                    </h3>
                    <p className="font-serif italic text-xs text-[#D4A574]">
                      {activeProduct.subtitle} · {activeProduct.size}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#2D1B1A]/80 font-light leading-relaxed">
                    {activeProduct.longDescription}
                  </p>

                  <div className="p-4 bg-[#FAF6F0] border border-[#E8D5C4] text-xs space-y-1">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-[#6B2C3E] block">
                      Olfactory Accords:
                    </span>
                    <p className="font-serif italic text-[#2D1B1A]/80">
                      {activeProduct.sensoryNotes.join(' · ')}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => addToCart(giftSet, 1)}
                      className="flex-1 bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] py-3.5 px-4 text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer text-center"
                    >
                      Acquire Full Set ({formatPrice(185)})
                    </button>
                    <button
                      onClick={() => addToCart(activeProduct, 1)}
                      className="bg-[#FAF6F0] hover:bg-[#FFFFFF] border border-[#6B2C3E] text-[#6B2C3E] py-3.5 px-4 text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer text-center"
                    >
                      Add Individual ({formatPrice(activeProduct.price)})
                    </button>
                    <WishlistButton
                      productId={activeProduct.id}
                      productName={activeProduct.name}
                      variant="card"
                      className="w-12 h-12 rounded-none border border-[#E8D5C4] shrink-0 self-center"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
