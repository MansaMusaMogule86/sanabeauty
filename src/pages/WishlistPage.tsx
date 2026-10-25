import React, { useState } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useWishlist } from '@/src/context/WishlistContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { WishlistButton } from '@/src/components/ui/WishlistButton.tsx';
import { Heart, ShoppingBag, Eye, Trash2, ArrowRight, Gift, Sparkles, Check } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { navigate } = useRouter();
  const { wishlistProducts, clearWishlist, removeFromWishlist } = useWishlist();
  const { addToCart, setQuickViewProduct, setIsCartOpen } = useCart();
  const { formatPrice } = useCurrency();

  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [allMovedFeedback, setAllMovedFeedback] = useState(false);

  const handleAddToCart = (product: (typeof wishlistProducts)[0]) => {
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const handleMoveAllToBag = () => {
    if (wishlistProducts.length === 0) return;
    wishlistProducts.forEach((product) => {
      addToCart(product, 1);
    });
    setAllMovedFeedback(true);
    setTimeout(() => {
      setAllMovedFeedback(false);
      setIsCartOpen(true);
    }, 900);
  };

  return (
    <main className="py-16 sm:py-24 bg-[#FAF6F0] text-[#2D1B1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Editorial Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
            Personal Sanctuary
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2D1B1A]">
            SAVED CREATIONS
          </h1>
          <p className="text-sm sm:text-base text-[#2D1B1A]/75 font-light leading-relaxed">
            Your private curation of Velvet Lollipop formulations awaiting your ritual.
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          /* Empty Wishlist State */
          <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-12 sm:p-20 text-center max-w-2xl mx-auto space-y-8 shadow-xs">
            <div className="w-18 h-18 rounded-full bg-[#FAF6F0] border border-[#C9A961]/50 text-[#6B2C3E] mx-auto flex items-center justify-center shadow-xs">
              <Heart className="w-8 h-8 stroke-[1.5] text-[#6B2C3E]" />
            </div>

            <div className="space-y-3 max-w-md mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#2D1B1A]">
                Your Sanctuary is currently quiet
              </h2>
              <p className="text-xs sm:text-sm text-[#2D1B1A]/70 leading-relaxed font-light">
                Preserve your favorite formulations, from the exfoliating sugar scrub to the Velvet Elixir dry body oil, to assemble your personal unhurried ritual.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => navigate('/shop')}
                className="w-full sm:w-auto bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer shadow-sm"
              >
                Explore The Boutique
              </button>
              <button
                onClick={() => navigate('/collections/velvet-lollipop')}
                className="w-full sm:w-auto bg-transparent border border-[#2D1B1A]/40 text-[#2D1B1A] hover:bg-[#FAF6F0] px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-colors cursor-pointer"
              >
                Discover The Suite
              </button>
            </div>

            {/* Ritual Step Prompts */}
            <div className="pt-8 border-t border-[#E8D5C4]/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#D4A574] font-semibold block">01 · Exfoliate</span>
                <span className="font-serif text-xs text-[#2D1B1A]">Le Bon Bon de Bain</span>
              </div>
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#D4A574] font-semibold block">02 · Nourish</span>
                <span className="font-serif text-xs text-[#2D1B1A]">Velvet Elixir</span>
              </div>
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#D4A574] font-semibold block">03 · Soften</span>
                <span className="font-serif text-xs text-[#2D1B1A]">Body Lotion</span>
              </div>
              <div>
                <span className="text-[10px] tracking-widest uppercase text-[#D4A574] font-semibold block">04 · Finish</span>
                <span className="font-serif text-xs text-[#2D1B1A]">Body Spray</span>
              </div>
            </div>
          </div>
        ) : (
          /* Populated Wishlist */
          <div className="space-y-8">
            {/* Top Bar Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8D5C4] text-xs">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#6B2C3E]">
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? 'Creation Preserved' : 'Creations Preserved'}
                </span>
                <span className="text-[#2D1B1A]/40 hidden sm:inline">·</span>
                <span className="text-[#2D1B1A]/70 hidden sm:inline">
                  Ready to be packaged in signature velvet burgundy ribbon
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleMoveAllToBag}
                  disabled={allMovedFeedback}
                  className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-5 py-2.5 text-xs tracking-wider uppercase font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-75"
                >
                  {allMovedFeedback ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#C9A961]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move All to Bag</span>
                    </>
                  )}
                </button>

                <button
                  onClick={clearWishlist}
                  className="text-xs text-[#2D1B1A]/60 hover:text-[#6B2C3E] underline cursor-pointer px-2 py-1"
                >
                  Clear Sanctuary
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {wishlistProducts.map((product) => {
                const isAdded = addedIds[product.id];
                return (
                  <div
                    key={product.id}
                    className="group flex flex-col bg-[#FFFFFF] border border-[#E8D5C4] hover:shadow-lg transition-all duration-300"
                  >
                    {/* Visual Container */}
                    <div className="relative aspect-4/5 overflow-hidden bg-[#FAF6F0]">
                      {product.stepNumber && (
                        <span className="absolute top-3 left-3 z-10 bg-[#FAF6F0]/90 backdrop-blur-xs text-[9px] tracking-widest uppercase font-semibold text-[#6B2C3E] px-2 py-0.5 border border-[#E8D5C4]/60">
                          Step {product.stepNumber}
                        </span>
                      )}

                      {/* Top-Right Heart Toggle */}
                      <div className="absolute top-3 right-3 z-20">
                        <WishlistButton
                          productId={product.id}
                          productName={product.name}
                          variant="card"
                        />
                      </div>

                      {/* Image */}
                      <div
                        onClick={() => navigate(`/products/${product.slug}`)}
                        className="w-full h-full cursor-pointer group-hover:scale-105 transition-transform duration-500"
                      >
                        <BrandAssetImage
                          assetId={product.assetId}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Quick View Button on Hover */}
                      <div className="absolute inset-x-3 bottom-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="w-full bg-[#FAF6F0]/95 hover:bg-[#FAF6F0] text-[#2D1B1A] py-2 text-[10px] tracking-widest uppercase font-medium border border-[#E8D5C4] shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Quick View</span>
                        </button>
                      </div>
                    </div>

                    {/* Information */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs text-[#6B2C3E] font-medium">
                          <span className="uppercase tracking-[0.2em] text-[10px]">{product.category}</span>
                          <span className="tabular-nums font-semibold text-[#2D1B1A]">{formatPrice(product.price)}</span>
                        </div>

                        <button
                          onClick={() => navigate(`/products/${product.slug}`)}
                          className="text-left font-serif text-base font-semibold text-[#2D1B1A] hover:text-[#6B2C3E] transition-colors leading-snug cursor-pointer block"
                        >
                          {product.name}
                        </button>

                        <p className="text-[11px] text-[#2D1B1A]/70 line-clamp-2 font-light leading-relaxed">
                          {product.description}
                        </p>

                        <p className="text-[10px] text-[#D4A574] italic font-serif pt-1">
                          {product.sensoryNotes.slice(0, 3).join(' · ')}
                        </p>
                      </div>

                      {/* Card Action Controls */}
                      <div className="pt-3 border-t border-[#E8D5C4]/60 space-y-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          disabled={isAdded}
                          className="w-full bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] py-2.5 text-xs tracking-wider uppercase font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-80"
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-[#C9A961]" />
                              <span>Added to Bag</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add to Bag</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className="w-full text-center text-[10px] tracking-wider uppercase text-[#2D1B1A]/50 hover:text-[#6B2C3E] transition-colors flex items-center justify-center gap-1 cursor-pointer pt-0.5"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove from Sanctuary</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sanctuary Packaging Promise */}
            <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FAF6F0] border border-[#C9A961]/40 text-[#6B2C3E] flex items-center justify-center shrink-0">
                  <Gift className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-base font-semibold text-[#2D1B1A]">
                    Complimentary White-Glove Presentation
                  </h4>
                  <p className="text-xs text-[#2D1B1A]/70 font-light">
                    Every order placed from your saved creations arrives housed in bespoke tissue and hand-tied burgundy velvet ribbon.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/shop')}
                className="bg-transparent border border-[#2D1B1A]/30 hover:border-[#6B2C3E] text-[#2D1B1A] hover:text-[#6B2C3E] px-6 py-3 text-xs tracking-widest uppercase font-medium transition-colors cursor-pointer shrink-0"
              >
                Explore More Creations →
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
