import React from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { PRODUCTS } from '@/src/data/products.ts';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { WishlistButton } from '@/src/components/ui/WishlistButton.tsx';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export const CollectionPage: React.FC = () => {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const coreProducts = PRODUCTS.filter((p) => p.category !== 'Gift Collection');
  const giftSet = PRODUCTS.find((p) => p.slug === 'velvet-lollipop-signature-box');

  return (
    <main className="bg-[#FAF6F0] text-[#2D1B1A]">
      {/* Editorial Collection Hero */}
      <section className="relative py-20 sm:py-28 bg-[#2D1B1A] text-[#FAF6F0] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(107,44,62,0.4)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#D4A574]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
              <span>Inaugural Collection</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-[#FAF6F0]">
              THE VELVET LOLLIPOP EXPERIENCE
            </h1>

            <p className="text-base sm:text-lg text-[#E8D5C4]/90 font-light leading-relaxed">
              A four-part symphony designed to cocoon the body in luxurious softness. Inspired by the decadence of Parisian confectionery and warm amber light.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs tracking-wider uppercase">
              <span className="text-[#C9A961]">Exfoliate</span>
              <span className="text-[#FAF6F0]/40">·</span>
              <span className="text-[#C9A961]">Nourish</span>
              <span className="text-[#FAF6F0]/40">·</span>
              <span className="text-[#C9A961]">Soften</span>
              <span className="text-[#FAF6F0]/40">·</span>
              <span className="text-[#C9A961]">Finish</span>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Products In-Depth Showcase */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 space-y-24">
        {coreProducts.map((product, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={product.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                isEven ? '' : 'lg:grid-flow-dense'
              }`}
            >
              {/* Image Column */}
              <div
                className={`lg:col-span-6 relative aspect-square max-w-lg mx-auto w-full bg-[#FFFFFF] border border-[#E8D5C4] shadow-md overflow-hidden ${
                  isEven ? '' : 'lg:col-start-7'
                }`}
              >
                <BrandAssetImage
                  assetId={product.assetId}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.stepNumber && (
                  <div className="absolute top-4 left-4 bg-[#6B2C3E] text-[#FAF6F0] text-[10px] tracking-widest uppercase font-semibold px-3 py-1">
                    Step {product.stepNumber} · {product.stepLabel}
                  </div>
                )}
                <div className="absolute top-4 right-4 z-20">
                  <WishlistButton
                    productId={product.id}
                    productName={product.name}
                    variant="card"
                  />
                </div>
              </div>

              {/* Text Column */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  isEven ? '' : 'lg:col-start-1'
                }`}
              >
                <div className="space-y-2">
                  <span className="text-[11px] tracking-[0.25em] uppercase text-[#6B2C3E] font-semibold">
                    {product.category} · {product.size}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D1B1A]">
                    {product.name}
                  </h2>
                  <p className="font-serif italic text-sm text-[#D4A574]">
                    {product.subtitle}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#2D1B1A]/80 font-light leading-relaxed">
                  {product.longDescription}
                </p>

                {/* Key Benefits */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-[#6B2C3E] block">
                    Ritual Benefits:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#2D1B1A]/80">
                    {product.keyBenefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <Check className="w-3.5 h-3.5 text-[#6B2C3E] shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer shadow-sm"
                  >
                    Add to Bag · {formatPrice(product.price)}
                  </button>

                  <WishlistButton
                    productId={product.id}
                    productName={product.name}
                    variant="detail"
                    className="py-3 px-5"
                  />

                  <button
                    onClick={() => navigate(`/products/${product.slug}`)}
                    className="text-xs tracking-[0.18em] uppercase text-[#6B2C3E] hover:underline flex items-center gap-1.5 font-semibold cursor-pointer"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Signature Gift Set Banner */}
      {giftSet && (
        <section className="bg-[#4F1D2C] text-[#FAF6F0] py-20 border-t border-[#6B2C3E]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center max-w-3xl space-y-6">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#C9A961] font-semibold">
              The Presentation Keepsake
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF6F0]">
              Acquire All Four in The Signature Velvet Box
            </h2>
            <p className="text-sm sm:text-base text-[#FAF6F0]/80 font-light leading-relaxed">
              Receive the complete Velvet Lollipop suite housed within our rigid burgundy keepsake presentation box, tied with plush velvet ribbon.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => addToCart(giftSet, 1)}
                className="bg-[#C9A961] hover:bg-[#DFCA91] text-[#2D1B1A] px-8 py-4 text-xs tracking-[0.2em] uppercase font-bold transition-colors cursor-pointer shadow-lg"
              >
                Add The Gift Set to Bag · {formatPrice(185)}
              </button>
              <button
                onClick={() => navigate('/gift-collection')}
                className="border border-[#FAF6F0]/40 text-[#FAF6F0] hover:bg-[#FAF6F0]/10 px-8 py-4 text-xs tracking-[0.18em] uppercase font-medium transition-colors cursor-pointer"
              >
                Experience The Velvet Reveal
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};
