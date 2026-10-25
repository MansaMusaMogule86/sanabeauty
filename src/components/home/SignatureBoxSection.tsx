import React, { useState } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { PRODUCTS } from '@/src/data/products.ts';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { Sparkles, Gift, ArrowRight } from 'lucide-react';

export const SignatureBoxSection: React.FC = () => {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [boxState, setBoxState] = useState<'closed' | 'open'>('closed');

  const giftSetProduct = PRODUCTS.find((p) => p.slug === 'velvet-lollipop-signature-box');

  return (
    <section className="py-24 sm:py-32 bg-[#4F1D2C] text-[#FAF6F0] relative overflow-hidden border-y border-[#6B2C3E]">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,97,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Box Visual */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* Box View Switcher Bar */}
            <div className="flex items-center gap-2 mb-6 bg-[#2D1B1A]/80 p-1.5 border border-[#C9A961]/30">
              <button
                onClick={() => setBoxState('closed')}
                className={`px-4 py-2 text-xs tracking-widest uppercase font-medium transition-colors cursor-pointer ${
                  boxState === 'closed'
                    ? 'bg-[#6B2C3E] text-[#FAF6F0] shadow-sm'
                    : 'text-[#FAF6F0]/70 hover:text-[#FAF6F0]'
                }`}
              >
                1. Tied Ribbon Presentation
              </button>
              <button
                onClick={() => setBoxState('open')}
                className={`px-4 py-2 text-xs tracking-widest uppercase font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                  boxState === 'open'
                    ? 'bg-[#6B2C3E] text-[#FAF6F0] shadow-sm'
                    : 'text-[#FAF6F0]/70 hover:text-[#FAF6F0]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
                <span>2. The Velvet Reveal</span>
              </button>
            </div>

            {/* Presentation Stage */}
            <div className="relative w-full max-w-xl aspect-4/3 bg-[#2D1B1A] border border-[#C9A961]/40 shadow-2xl overflow-hidden flex items-center justify-center p-6 group">
              {boxState === 'closed' ? (
                <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in duration-300">
                  <BrandAssetImage
                    assetId="packaging_gift_box_closed"
                    alt="The Velvet Lollipop closed gift box with ribbon"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] text-[#D4A574]">
                    <span>Rigid Burgundy Box · Hand-Tied Ribbon</span>
                    <button
                      onClick={() => setBoxState('open')}
                      className="text-[#FAF6F0] underline font-semibold flex items-center gap-1 hover:text-[#C9A961]"
                    >
                      Click to Reveal Inside →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                  <BrandAssetImage
                    assetId="packaging_gift_box_open"
                    alt="The Velvet Reveal open gift box with all 4 products"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] text-[#D4A574]">
                    <span>Peach Velvet Tray · 4 Full-Sized Formulations</span>
                    <button
                      onClick={() => setBoxState('closed')}
                      className="text-[#FAF6F0] underline font-semibold flex items-center gap-1 hover:text-[#C9A961]"
                    >
                      Close Box ←
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Editorial & Gift Story */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#C9A961] font-semibold">
              <Gift className="w-3.5 h-3.5" />
              <span>Signature Keepsake</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF6F0] leading-tight">
              BEAUTIFULLY WRAPPED. IMPOSSIBLE TO FORGET.
            </h2>

            <p className="text-base text-[#FAF6F0]/80 font-light leading-relaxed">
              Designed as the definitive gifting gesture. The Velvet Lollipop presentation box is handcrafted with heavy rigid board wrapped in deep velvet burgundy paper, finished with hot-stamped champagne gold foil, and tied with double-faced woven velvet ribbon.
            </p>

            <ul className="space-y-2.5 text-xs text-[#E8D5C4] font-light">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A961]" />
                <span>Includes all 4 full-sized formulations ({formatPrice(208)} value)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A961]" />
                <span>Custom molded peach velvet protective insert</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A961]" />
                <span>Complimentary handwritten calligraphy gift note</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A961]" />
                <span>Complimentary insured signature white-glove delivery</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {giftSetProduct && (
                <button
                  onClick={() => addToCart(giftSetProduct, 1)}
                  className="bg-[#C9A961] hover:bg-[#DFCA91] text-[#2D1B1A] px-7 py-4 text-xs tracking-[0.2em] uppercase font-bold transition-colors cursor-pointer shadow-lg text-center"
                >
                  Acquire Gift Set · {formatPrice(185)}
                </button>
              )}

              <button
                onClick={() => navigate('/gift-collection')}
                className="bg-transparent hover:bg-[#FAF6F0]/10 text-[#FAF6F0] border border-[#FAF6F0]/40 px-6 py-4 text-xs tracking-[0.18em] uppercase font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>The Velvet Reveal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
