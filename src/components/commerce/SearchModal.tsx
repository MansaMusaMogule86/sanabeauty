import React, { useState } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { PRODUCTS } from '@/src/data/products.ts';
import { JOURNAL_ARTICLES } from '@/src/data/journal.ts';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { navigate } = useRouter();
  const { formatPrice } = useCurrency();
  const { isSearchOpen, setIsSearchOpen } = useCart();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.sensoryNotes.some((n) => n.toLowerCase().includes(query.toLowerCase()))
  );

  const filteredArticles = JOURNAL_ARTICLES.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    navigate(`/products/${slug}`);
  };

  const handleSelectArticle = (slug: string) => {
    setIsSearchOpen(false);
    navigate(`/journal/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-[#2D1B1A]/70 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="relative bg-[#FAF6F0] text-[#2D1B1A] max-w-2xl w-full border border-[#E8D5C4] shadow-2xl z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E8D5C4] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#6B2C3E] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, rituals, scents, or essays..."
            autoFocus
            className="flex-1 bg-transparent text-sm sm:text-base placeholder-[#2D1B1A]/40 focus:outline-hidden"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 text-[#2D1B1A]/60 hover:text-[#6B2C3E] transition-colors cursor-pointer"
            aria-label="Close Search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="bg-[#FFFFFF] px-6 py-2.5 border-b border-[#E8D5C4]/60 flex items-center gap-4 text-xs text-[#2D1B1A]/70 overflow-x-auto">
          <span className="text-[10px] uppercase tracking-wider text-[#6B2C3E] font-semibold shrink-0">
            Popular:
          </span>
          {['Velvet Elixir', 'Body Scrub', 'Marshmallow', 'Gift Set', 'Evening Sanctuary'].map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="hover:text-[#6B2C3E] transition-colors whitespace-nowrap cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {/* Products */}
          <div className="space-y-3">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#6B2C3E] block">
              Collection Products ({filteredProducts.length})
            </span>
            {filteredProducts.length === 0 ? (
              <p className="text-xs text-[#2D1B1A]/50 italic">No matching products found.</p>
            ) : (
              <div className="space-y-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="p-3 bg-[#FFFFFF] border border-[#E8D5C4] hover:border-[#6B2C3E] transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#D4A574] block">
                        {product.category}
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#2D1B1A] group-hover:text-[#6B2C3E] transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#2D1B1A]/60 line-clamp-1">
                        {product.description}
                      </p>
                    </div>

                    <div className="text-right shrink-0 ml-4 flex items-center gap-3">
                      <span className="text-xs font-semibold tabular-nums">{formatPrice(product.price)}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D4A574] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Journal Articles */}
          <div className="space-y-3 pt-3 border-t border-[#E8D5C4]/60">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#6B2C3E] block">
              The Sana Edit Articles ({filteredArticles.length})
            </span>
            {filteredArticles.length === 0 ? (
              <p className="text-xs text-[#2D1B1A]/50 italic">No matching journal articles.</p>
            ) : (
              <div className="space-y-2">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleSelectArticle(article.slug)}
                    className="p-3 bg-[#FFFFFF] border border-[#E8D5C4] hover:border-[#6B2C3E] transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#D4A574] block">
                        {article.category} · {article.readTime}
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#2D1B1A] group-hover:text-[#6B2C3E] transition-colors">
                        {article.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4A574] group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
