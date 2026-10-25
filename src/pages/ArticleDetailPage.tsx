import React from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { getArticleBySlug, JOURNAL_ARTICLES } from '@/src/data/journal.ts';
import { PRODUCTS } from '@/src/data/products.ts';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface ArticleDetailPageProps {
  slug: string;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const article = getArticleBySlug(slug) || JOURNAL_ARTICLES[0];

  const relatedProduct = article.relatedProductSlug
    ? PRODUCTS.find((p) => p.slug === article.relatedProductSlug)
    : null;

  return (
    <main className="py-12 sm:py-20 bg-[#FAF6F0] text-[#2D1B1A]">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Back navigation */}
        <button
          onClick={() => navigate('/journal')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#2D1B1A]/70 hover:text-[#6B2C3E] transition-colors mb-10 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to The Sana Edit</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4 mb-10 text-center max-w-2xl mx-auto">
          <div className="text-[11px] text-[#D4A574] tracking-[0.25em] uppercase font-semibold">
            <span>{article.category}</span>
            <span className="mx-2">·</span>
            <span>{article.readTime}</span>
            <span className="mx-2">·</span>
            <span>{article.publishDate}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2D1B1A] leading-tight text-balance">
            {article.title}
          </h1>

          <p className="text-base text-[#2D1B1A]/80 font-serif italic">
            {article.subtitle}
          </p>

          <div className="pt-2 text-xs text-[#2D1B1A]/60">
            <span>Words by </span>
            <strong className="text-[#6B2C3E] font-semibold">{article.author.name}</strong>
            <span>, {article.author.role}</span>
          </div>
        </div>

        {/* Hero Artwork */}
        <div className="aspect-16/9 bg-[#FFFFFF] border border-[#E8D5C4] mb-12 shadow-sm overflow-hidden">
          <BrandAssetImage
            assetId={article.assetId}
            alt={article.title}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Article Body Content */}
        <div className="space-y-8 text-sm sm:text-base text-[#2D1B1A]/85 font-light leading-relaxed max-w-2xl mx-auto">
          {/* Pull quote */}
          <blockquote className="my-10 p-6 sm:p-8 bg-[#FFFFFF] border-l-2 border-[#6B2C3E] shadow-xs">
            <p className="font-serif italic text-lg sm:text-xl text-[#6B2C3E] leading-snug">
              “{article.pullQuote}”
            </p>
          </blockquote>

          {article.contentParagraphs.map((para, idx) => (
            <div key={idx} className="space-y-3">
              {para.heading && (
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#2D1B1A] pt-4">
                  {para.heading}
                </h3>
              )}
              <p>{para.body}</p>
            </div>
          ))}
        </div>

        {/* Related Ritual Product Callout */}
        {relatedProduct && (
          <div className="mt-16 pt-12 border-t border-[#E8D5C4] max-w-2xl mx-auto">
            <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-xs">
              <div className="w-24 h-24 bg-[#FAF6F0] border border-[#E8D5C4] shrink-0 overflow-hidden">
                <BrandAssetImage
                  assetId={relatedProduct.assetId}
                  alt={relatedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-1 text-center sm:text-left">
                <span className="text-[10px] tracking-wider uppercase text-[#D4A574] font-semibold">
                  Featured in this Essay
                </span>
                <h4 className="font-serif text-lg font-semibold text-[#2D1B1A]">
                  {relatedProduct.name}
                </h4>
                <p className="text-xs text-[#2D1B1A]/70 line-clamp-1">{relatedProduct.description}</p>
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-4">
                  <span className="font-serif font-bold text-sm text-[#6B2C3E]">
                    ${relatedProduct.price}
                  </span>
                  <button
                    onClick={() => addToCart(relatedProduct, 1)}
                    className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-4 py-2 text-[10px] tracking-wider uppercase font-semibold transition-colors cursor-pointer"
                  >
                    Add to Bag
                  </button>
                  <button
                    onClick={() => navigate(`/products/${relatedProduct.slug}`)}
                    className="text-xs text-[#6B2C3E] underline font-medium cursor-pointer"
                  >
                    View Specs
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
