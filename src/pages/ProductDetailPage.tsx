import React, { useState } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { getProductBySlug, PRODUCTS } from '@/src/data/products.ts';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { WishlistButton } from '@/src/components/ui/WishlistButton.tsx';
import { Plus, Minus, Check, Sparkles, ChevronDown, ChevronUp, Gift, ShieldCheck, ArrowLeft } from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const product = getProductBySlug(slug) || PRODUCTS[0];

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'ritual' | 'packaging' | 'ingredients' | 'shipping'>('ritual');
  const [added, setAdded] = useState(false);

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="py-12 sm:py-20 bg-[#FAF6F0] text-[#2D1B1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Back Link Breadcrumb */}
        <button
          onClick={() => navigate('/shop')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#2D1B1A]/70 hover:text-[#6B2C3E] transition-colors mb-10 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Boutique</span>
        </button>

        {/* PDP Main Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Gallery (Sticky on desktop) */}
          <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-28">
            <div className="aspect-square bg-[#FFFFFF] border border-[#E8D5C4] shadow-md overflow-hidden relative">
              {product.stepNumber && (
                <div className="absolute top-4 left-4 z-10 bg-[#6B2C3E] text-[#FAF6F0] text-[10px] tracking-widest uppercase font-semibold px-3 py-1">
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

              <BrandAssetImage
                assetId={product.assetId}
                alt={product.name}
                className="w-full h-full object-cover"
                priority
              />
            </div>

            {/* Gallery Mini Vignettes */}
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-square bg-[#FFFFFF] border border-[#E8D5C4] p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] tracking-widest uppercase font-serif text-[#6B2C3E] font-semibold">
                  Primary Vessel
                </span>
                <span className="text-[9px] text-[#2D1B1A]/60 mt-1">{product.size}</span>
              </div>
              <div className="aspect-square bg-[#FFFFFF] border border-[#E8D5C4] p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] tracking-widest uppercase font-serif text-[#6B2C3E] font-semibold">
                  Olfactory Accords
                </span>
                <span className="text-[9px] text-[#2D1B1A]/60 mt-1">Velvet Amber</span>
              </div>
              <div className="aspect-square bg-[#FFFFFF] border border-[#E8D5C4] p-3 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] tracking-widest uppercase font-serif text-[#6B2C3E] font-semibold">
                  Atelier Packaging
                </span>
                <span className="text-[9px] text-[#2D1B1A]/60 mt-1">Gold Foil Inscription</span>
              </div>
            </div>
          </div>

          {/* Right Product Buy Module */}
          <div className="lg:col-span-5 space-y-8">
            {/* Title & Category */}
            <div className="space-y-3 pb-6 border-b border-[#E8D5C4]">
              <div className="flex items-center justify-between text-xs text-[#6B2C3E] font-medium">
                <span className="uppercase tracking-[0.25em]">{product.category}</span>
                <span className="text-[11px] text-[#D4A574]">In Stock · SANA Flagship</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D1B1A]">
                {product.name}
              </h1>

              <p className="font-serif italic text-sm text-[#D4A574]">
                {product.subtitle}
              </p>

              <div className="pt-2 flex items-baseline gap-4">
                <span className="font-serif text-3xl font-bold text-[#6B2C3E] tabular-nums">
                  {formatPrice(product.price)}
                </span>
                <span className="text-xs text-[#2D1B1A]/70 uppercase tracking-wider">
                  {product.size}
                </span>
              </div>
            </div>

            {/* Short & Long Description */}
            <div className="space-y-4">
              <p className="text-sm text-[#2D1B1A]/80 font-light leading-relaxed">
                {product.description}
              </p>

              {/* Scent notes unboxed typography */}
              <div className="p-4 bg-[#FFFFFF] border border-[#E8D5C4] text-xs space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-[#6B2C3E] block">
                  Olfactory Harmony:
                </span>
                <p className="font-serif italic text-[#2D1B1A]/80">
                  {product.sensoryNotes.join(' · ')}
                </p>
              </div>
            </div>

            {/* Quantity Selector & Add to Bag CTA */}
            <div className="space-y-4 pt-4 border-t border-[#E8D5C4]">
              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                <div className="flex items-center border border-[#E8D5C4] bg-[#FFFFFF] self-start sm:self-auto">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-[#2D1B1A]/70 hover:text-[#6B2C3E] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 text-sm font-semibold tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-[#2D1B1A]/70 hover:text-[#6B2C3E] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className="flex-1 bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] py-4 px-6 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-[#C9A961]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag · {formatPrice(product.price * quantity)}</span>
                  )}
                </button>

                <WishlistButton
                  productId={product.id}
                  productName={product.name}
                  variant="detail"
                />
              </div>

              {/* White glove shipping & gift note promise */}
              <div className="flex items-center gap-2 text-[11px] text-[#2D1B1A]/70">
                <Gift className="w-3.5 h-3.5 text-[#6B2C3E]" />
                <span>Complimentary bespoke ribbon presentation included.</span>
              </div>
            </div>

            {/* Accordion Tabs for Ritual, Packaging, Ingredients, Shipping */}
            <div className="border-t border-[#E8D5C4] divide-y divide-[#E8D5C4] pt-2 text-xs">
              {/* Tab 1: Application Method */}
              <div className="py-4">
                <button
                  onClick={() => setActiveTab(activeTab === 'ritual' ? ('' as any) : 'ritual')}
                  className="w-full flex items-center justify-between text-left font-semibold uppercase tracking-wider text-[#6B2C3E] cursor-pointer"
                >
                  <span>The Ritual Method</span>
                  {activeTab === 'ritual' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeTab === 'ritual' && (
                  <div className="pt-3 space-y-2 text-[#2D1B1A]/80 font-light leading-relaxed animate-in fade-in">
                    <p>{product.ritualInstruction}</p>
                  </div>
                )}
              </div>

              {/* Tab 2: Packaging Architecture */}
              <div className="py-4">
                <button
                  onClick={() => setActiveTab(activeTab === 'packaging' ? ('' as any) : 'packaging')}
                  className="w-full flex items-center justify-between text-left font-semibold uppercase tracking-wider text-[#6B2C3E] cursor-pointer"
                >
                  <span>Packaging Architecture</span>
                  {activeTab === 'packaging' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeTab === 'packaging' && (
                  <div className="pt-3 space-y-2 animate-in fade-in">
                    <ul className="space-y-1.5 text-[#2D1B1A]/80">
                      {product.packagingDetails.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4A574]" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Tab 3: Verified Ingredients */}
              <div className="py-4">
                <button
                  onClick={() => setActiveTab(activeTab === 'ingredients' ? ('' as any) : 'ingredients')}
                  className="w-full flex items-center justify-between text-left font-semibold uppercase tracking-wider text-[#6B2C3E] cursor-pointer"
                >
                  <span>Botanical Ingredients</span>
                  {activeTab === 'ingredients' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeTab === 'ingredients' && (
                  <div className="pt-3 space-y-2 text-[#2D1B1A]/80 font-light leading-relaxed animate-in fade-in">
                    <p>{product.ingredientsSummary}</p>
                    <p className="text-[10px] text-[#2D1B1A]/50 italic pt-1">
                      Free from parabens, phthalates, synthetic colorants, and mineral oils. Cruelty-free.
                    </p>
                  </div>
                )}
              </div>

              {/* Tab 4: White-Glove Shipping & Returns */}
              <div className="py-4">
                <button
                  onClick={() => setActiveTab(activeTab === 'shipping' ? ('' as any) : 'shipping')}
                  className="w-full flex items-center justify-between text-left font-semibold uppercase tracking-wider text-[#6B2C3E] cursor-pointer"
                >
                  <span>Concierge Shipping & Returns</span>
                  {activeTab === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {activeTab === 'shipping' && (
                  <div className="pt-3 space-y-2 text-[#2D1B1A]/80 font-light leading-relaxed animate-in fade-in">
                    <p>
                      Complimentary white-glove courier shipping is provided on all orders of $75 or more. All parcels are packed in rigid presentation boxes with temperature cushioning.
                    </p>
                    <p>
                      Unopened formulations may be returned within 30 days of receipt with our prepaid concierge label.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Carousel */}
        <div className="mt-24 pt-16 border-t border-[#E8D5C4]">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
              Complete Your Sanctuary
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2D1B1A]">
              RECOMMENDED RITUAL PAIRINGS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                onClick={() => navigate(`/products/${rel.slug}`)}
                className="bg-[#FFFFFF] border border-[#E8D5C4] p-6 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="relative aspect-square bg-[#FAF6F0] mb-4 overflow-hidden">
                  <div className="absolute top-2 right-2 z-20">
                    <WishlistButton
                      productId={rel.id}
                      productName={rel.name}
                      variant="card"
                    />
                  </div>
                  <BrandAssetImage
                    assetId={rel.assetId}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#D4A574]">{rel.category}</span>
                  <h4 className="font-serif text-base font-semibold text-[#2D1B1A] group-hover:text-[#6B2C3E] transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-[#2D1B1A]/70 line-clamp-2">{rel.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E8D5C4]/60 flex items-center justify-between text-xs font-semibold">
                  <span className="tabular-nums text-[#6B2C3E]">{formatPrice(rel.price)}</span>
                  <span className="text-[#2D1B1A]/60 group-hover:text-[#6B2C3E] uppercase text-[10px] tracking-wider">
                    View Product →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
