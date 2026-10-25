import React, { useState } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { PRODUCTS, Product } from '@/src/data/products.ts';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { WishlistButton } from '@/src/components/ui/WishlistButton.tsx';
import { Eye, Plus, Sparkles, Filter } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { navigate } = useRouter();
  const { addToCart, setQuickViewProduct } = useCart();
  const { formatPrice } = useCurrency();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'Body Scrub', label: 'Body Scrub' },
    { id: 'Body Oil', label: 'Body Oil' },
    { id: 'Body Lotion', label: 'Body Lotion' },
    { id: 'Body Spray', label: 'Body Spray' },
    { id: 'Gift Collection', label: 'Signature Gift Sets' },
  ];

  let filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  if (sortBy === 'price-asc') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <main className="py-16 sm:py-24 bg-[#FAF6F0] text-[#2D1B1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Page Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
            The SANA Atelier
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2D1B1A]">
            THE COMPLETE BOUTIQUE
          </h1>
          <p className="text-sm sm:text-base text-[#2D1B1A]/80 font-light leading-relaxed">
            Every formulation in the Velvet Lollipop suite is crafted to elevate everyday personal care into an unhurried, tactile sanctuary.
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-12 border-b border-[#E8D5C4]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs tracking-wider uppercase font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#6B2C3E] text-[#FAF6F0] shadow-xs'
                      : 'bg-[#FFFFFF] text-[#2D1B1A]/80 hover:text-[#6B2C3E] border border-[#E8D5C4]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3 self-end md:self-auto text-xs">
            <span className="text-[#2D1B1A]/60 uppercase tracking-wider text-[11px]">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FFFFFF] border border-[#E8D5C4] px-3 py-2 text-xs font-medium focus:outline-hidden focus:border-[#6B2C3E] cursor-pointer"
            >
              <option value="featured">Editorial Curation</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col bg-[#FFFFFF] border border-[#E8D5C4] hover:shadow-lg transition-all duration-300"
            >
              {/* Product Artwork */}
              <div className="relative aspect-4/5 overflow-hidden bg-[#FAF6F0]">
                {product.badge && (
                  <span className="absolute top-4 left-4 z-10 bg-[#FAF6F0]/90 backdrop-blur-xs text-[10px] tracking-widest uppercase font-semibold text-[#6B2C3E] px-2.5 py-1 border border-[#E8D5C4]/60">
                    {product.badge}
                  </span>
                )}

                {/* Top-Right Heart Wishlist Toggle */}
                <div className="absolute top-4 right-4 z-20">
                  <WishlistButton
                    productId={product.id}
                    productName={product.name}
                    variant="card"
                  />
                </div>

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

                {/* Floating Quick Actions */}
                <div className="absolute inset-x-4 bottom-4 z-20 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setQuickViewProduct(product)}
                    className="flex-1 bg-[#FAF6F0]/95 hover:bg-[#FAF6F0] text-[#2D1B1A] py-2.5 text-[11px] tracking-widest uppercase font-medium border border-[#E8D5C4] shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>

                  <button
                    onClick={() => addToCart(product, 1)}
                    className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] p-2.5 shadow-sm transition-colors cursor-pointer"
                    aria-label={`Add ${product.name} to bag`}
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#6B2C3E] font-medium">
                    <span className="uppercase tracking-[0.2em] text-[10px]">{product.category}</span>
                    <span className="tabular-nums font-semibold text-[#2D1B1A]">{formatPrice(product.price)}</span>
                  </div>

                  <button
                    onClick={() => navigate(`/products/${product.slug}`)}
                    className="text-left font-serif text-lg font-semibold text-[#2D1B1A] hover:text-[#6B2C3E] transition-colors leading-snug cursor-pointer block"
                  >
                    {product.name}
                  </button>

                  <p className="text-xs text-[#2D1B1A]/70 line-clamp-2 font-light leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8D5C4]/40 flex items-center justify-between text-[11px] text-[#2D1B1A]/60">
                  <span className="tabular-nums">{product.size}</span>
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="text-[#6B2C3E] font-semibold tracking-wider hover:underline uppercase text-[10px] cursor-pointer"
                  >
                    + Add To Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Reassurance Banner */}
        <div className="mt-20 pt-12 border-t border-[#E8D5C4] grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-1">
            <span className="font-serif text-sm font-semibold text-[#6B2C3E]">Bespoke Presentation</span>
            <p className="text-xs text-[#2D1B1A]/70">Every parcel includes hand-tied velvet ribbon and personalized card.</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-sm font-semibold text-[#6B2C3E]">White-Glove Delivery</span>
            <p className="text-xs text-[#2D1B1A]/70">Complimentary express shipping on all orders over $75.</p>
          </div>
          <div className="space-y-1">
            <span className="font-serif text-sm font-semibold text-[#6B2C3E]">Clean Formulation</span>
            <p className="text-xs text-[#2D1B1A]/70">Cruelty-free, paraben-free, crafted with precious botanical oils.</p>
          </div>
        </div>
      </div>
    </main>
  );
};
