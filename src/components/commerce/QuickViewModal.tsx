import React, { useState } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { WishlistButton } from '@/src/components/ui/WishlistButton.tsx';
import { X, Plus, Minus, ArrowRight, Check } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { navigate } = useRouter();
  const { formatPrice } = useCurrency();
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  const handleViewFullPage = () => {
    setQuickViewProduct(null);
    navigate(`/products/${quickViewProduct.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-[#2D1B1A]/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Modal Card */}
      <div className="relative bg-[#FAF6F0] text-[#2D1B1A] max-w-3xl w-full border border-[#E8D5C4] shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 text-[#2D1B1A]/60 hover:text-[#6B2C3E] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="bg-[#FFFFFF] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#E8D5C4]">
            <div className="aspect-square w-full max-w-[280px]">
              <BrandAssetImage
                assetId={quickViewProduct.assetId}
                alt={quickViewProduct.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-[#6B2C3E] font-medium">
                <span className="uppercase tracking-[0.2em]">{quickViewProduct.category}</span>
                {quickViewProduct.stepNumber && (
                  <span className="text-[11px] text-[#D4A574]">Step {quickViewProduct.stepNumber}</span>
                )}
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#2D1B1A]">
                {quickViewProduct.name}
              </h3>

              <div className="flex items-baseline gap-4">
                <span className="font-serif text-xl font-bold text-[#6B2C3E] tabular-nums">
                  {formatPrice(quickViewProduct.price)}
                </span>
                <span className="text-xs text-[#2D1B1A]/60">{quickViewProduct.size}</span>
              </div>

              <p className="text-xs text-[#2D1B1A]/80 leading-relaxed font-light">
                {quickViewProduct.description}
              </p>

              {/* Scent notes pill-free text list */}
              <div className="pt-2 text-[11px] text-[#2D1B1A]/70 space-y-1">
                <span className="uppercase tracking-wider font-semibold text-[#6B2C3E] block">
                  Olfactory Accords:
                </span>
                <p className="italic font-serif">
                  {quickViewProduct.sensoryNotes.join(' · ')}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-4 border-t border-[#E8D5C4]">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#E8D5C4] bg-[#FFFFFF]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 hover:text-[#6B2C3E] cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-medium tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 hover:text-[#6B2C3E] cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className="flex-1 bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] py-3 px-6 text-xs tracking-[0.2em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-[#C9A961]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag · {formatPrice(quickViewProduct.price * quantity)}</span>
                  )}
                </button>

                <WishlistButton
                  productId={quickViewProduct.id}
                  productName={quickViewProduct.name}
                  variant="card"
                  className="w-10 h-10 border border-[#E8D5C4] shrink-0"
                />
              </div>

              <button
                onClick={handleViewFullPage}
                className="w-full text-center text-xs text-[#6B2C3E] hover:underline flex items-center justify-center gap-1.5 cursor-pointer font-medium"
              >
                <span>Full Product Ritual & Ingredients</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
