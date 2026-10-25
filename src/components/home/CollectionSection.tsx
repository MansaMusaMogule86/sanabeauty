import React from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { PRODUCTS, Product } from '@/src/data/products.ts';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { WishlistButton } from '@/src/components/ui/WishlistButton.tsx';
import { Eye, Plus } from 'lucide-react';

export const CollectionSection: React.FC = () => {
  const { navigate } = useRouter();
  const { addToCart, setQuickViewProduct } = useCart();
  const { formatPrice } = useCurrency();

  // Filter 4 core body care products
  const collectionProducts = PRODUCTS.filter((p) => p.category !== 'Gift Collection');

  return (
    <section className="py-24 sm:py-32 bg-[#FAF6F0] text-[#2D1B1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#E8D5C4]">
          <div className="space-y-3">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
              The Velvet Lollipop Suite
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#2D1B1A]">
              MEET YOUR NEW OBSESSION.
            </h2>
          </div>

          <button
            onClick={() => navigate('/collections/velvet-lollipop')}
            className="text-xs tracking-[0.2em] uppercase font-semibold text-[#6B2C3E] hover:text-[#2D1B1A] transition-colors self-start md:self-end flex items-center gap-2 group"
          >
            <span>View Complete Suite</span>
            <span className="transition-transform group-hover:translate-x-1 text-[#D4A574]">→</span>
          </button>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collectionProducts.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              idx={idx}
              onNavigate={() => navigate(`/products/${product.slug}`)}
              onQuickView={() => setQuickViewProduct(product)}
              onAddToCart={() => addToCart(product, 1)}
            />
          ))}
        </div>

        {/* Subtle Signature Box Highlight banner */}
        <div className="mt-16 bg-[#2D1B1A] text-[#FAF6F0] p-8 sm:p-10 border border-[#6B2C3E]/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4A574] font-medium">
              The Complete Keepsake
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#FAF6F0]">
              The Velvet Lollipop Gift Set
            </h3>
            <p className="text-xs text-[#E8D5C4]/80 font-light max-w-xl">
              Experience the complete four-step ritual housed inside our bespoke burgundy presentation box with velvet ribbon.
            </p>
          </div>

          <button
            onClick={() => navigate('/gift-collection')}
            className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-6 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold transition-colors shrink-0 cursor-pointer"
          >
            Explore The Gift Set · {formatPrice(185)}
          </button>
        </div>
      </div>
    </section>
  );
};

interface ProductCardProps {
  product: Product;
  idx: number;
  onNavigate: () => void;
  onQuickView: () => void;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigate,
  onQuickView,
  onAddToCart,
}) => {
  const { formatPrice } = useCurrency();
  return (
    <div className="group flex flex-col bg-[#FFFFFF] border border-[#E8D5C4]/80 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Product Image Area with Hover Action Bar */}
      <div className="relative aspect-4/5 overflow-hidden bg-[#FAF6F0] flex items-center justify-center">
        {/* Subtle Step Label */}
        {product.stepNumber && (
          <div className="absolute top-4 left-4 z-10 text-[10px] tracking-widest uppercase font-semibold text-[#6B2C3E] bg-[#FAF6F0]/90 backdrop-blur-xs px-2.5 py-1 border border-[#E8D5C4]/60">
            Step {product.stepNumber} · {product.stepLabel}
          </div>
        )}

        {/* Top-Right Heart Wishlist Toggle */}
        <div className="absolute top-4 right-4 z-20">
          <WishlistButton
            productId={product.id}
            productName={product.name}
            variant="card"
          />
        </div>

        {/* Product Visual */}
        <div
          onClick={onNavigate}
          className="w-full h-full cursor-pointer transition-transform duration-500 group-hover:scale-105"
        >
          <BrandAssetImage
            assetId={product.assetId}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Quick View & Add to Bag Floating Action Overlays on Desktop Hover */}
        <div className="absolute inset-x-4 bottom-4 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="flex-1 bg-[#FAF6F0]/95 hover:bg-[#FAF6F0] text-[#2D1B1A] py-2.5 text-[11px] tracking-widest uppercase font-medium border border-[#E8D5C4] shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            title="Quick View"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] p-2.5 shadow-sm transition-colors cursor-pointer"
            title="Add to Bag"
            aria-label={`Add ${product.name} to bag`}
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Card Information */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#6B2C3E] font-medium">
            <span className="uppercase tracking-[0.2em] text-[10px]">{product.category}</span>
            <span className="tabular-nums font-semibold text-[#2D1B1A]">{formatPrice(product.price)}</span>
          </div>

          <button
            onClick={onNavigate}
            className="text-left font-serif text-lg font-semibold text-[#2D1B1A] hover:text-[#6B2C3E] transition-colors leading-snug cursor-pointer block"
          >
            {product.name}
          </button>

          <p className="text-xs text-[#2D1B1A]/70 line-clamp-2 font-light leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer Meta: Size & Scent Accent */}
        <div className="pt-3 border-t border-[#E8D5C4]/40 flex items-center justify-between text-[11px] text-[#2D1B1A]/60">
          <span className="tabular-nums">{product.size}</span>
          <button
            onClick={onAddToCart}
            className="text-[#6B2C3E] font-semibold tracking-wider hover:underline uppercase text-[10px] cursor-pointer"
          >
            + Add To Bag
          </button>
        </div>
      </div>
    </div>
  );
};
