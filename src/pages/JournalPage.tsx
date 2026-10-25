import React from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { JOURNAL_ARTICLES } from '@/src/data/journal.ts';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { Sparkles, ArrowRight } from 'lucide-react';

export const JournalPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <main className="py-16 sm:py-24 bg-[#FAF6F0] text-[#2D1B1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
            <span>Editorial & Philosophy</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2D1B1A]">
            THE SANA EDIT
          </h1>
          <p className="text-sm sm:text-base text-[#2D1B1A]/80 font-light leading-relaxed">
            Essays on the architecture of unhurried beauty, the emotional power of packaging, and the olfactory art of warm skin.
          </p>
        </div>

        {/* Featured First Article Big Layout */}
        {JOURNAL_ARTICLES[0] && (
          <div
            onClick={() => navigate(`/journal/${JOURNAL_ARTICLES[0].slug}`)}
            className="mb-16 bg-[#FFFFFF] border border-[#E8D5C4] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="lg:col-span-7 aspect-16/10 bg-[#FAF6F0] overflow-hidden">
              <BrandAssetImage
                assetId={JOURNAL_ARTICLES[0].assetId}
                alt={JOURNAL_ARTICLES[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="lg:col-span-5 p-8 sm:p-12 space-y-4">
              <div className="text-[11px] text-[#D4A574] font-medium tracking-wider">
                <span>Featured Essay</span>
                <span className="mx-2">·</span>
                <span>{JOURNAL_ARTICLES[0].readTime}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#2D1B1A] group-hover:text-[#6B2C3E] transition-colors leading-snug">
                {JOURNAL_ARTICLES[0].title}
              </h2>

              <p className="text-xs sm:text-sm text-[#2D1B1A]/70 font-light leading-relaxed">
                {JOURNAL_ARTICLES[0].excerpt}
              </p>

              <div className="pt-4 flex items-center gap-2 text-xs text-[#6B2C3E] font-semibold tracking-wider uppercase">
                <span>Read Full Essay</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        )}

        {/* Grid for Remaining Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.slice(1).map((article) => (
            <article
              key={article.id}
              onClick={() => navigate(`/journal/${article.slug}`)}
              className="bg-[#FFFFFF] border border-[#E8D5C4] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/10 bg-[#FAF6F0] overflow-hidden">
                  <BrandAssetImage
                    assetId={article.assetId}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-[10px] text-[#D4A574] tracking-wider uppercase font-semibold">
                    {article.category} · {article.readTime}
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-[#2D1B1A] group-hover:text-[#6B2C3E] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#2D1B1A]/70 line-clamp-3 font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#E8D5C4]/40 mt-4 flex items-center justify-between text-xs">
                <span className="text-[#2D1B1A]/50 font-serif italic text-[11px]">
                  {article.author.name}
                </span>
                <span className="text-[#6B2C3E] font-semibold text-[10px] tracking-wider uppercase flex items-center gap-1">
                  Read →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};
