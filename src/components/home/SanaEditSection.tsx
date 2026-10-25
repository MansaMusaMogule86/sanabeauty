import React from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { JOURNAL_ARTICLES } from '@/src/data/journal.ts';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { ArrowRight } from 'lucide-react';

export const SanaEditSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="py-24 sm:py-32 bg-[#FAF6F0] text-[#2D1B1A]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-[#E8D5C4]">
          <div className="space-y-3">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
              Beauty Magazine & Essays
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2D1B1A]">
              THE SANA EDIT.
            </h2>
          </div>

          <button
            onClick={() => navigate('/journal')}
            className="text-xs tracking-[0.2em] uppercase font-semibold text-[#6B2C3E] hover:text-[#2D1B1A] transition-colors self-start md:self-end flex items-center gap-2 group"
          >
            <span>Explore All Journal Editions</span>
            <span className="transition-transform group-hover:translate-x-1 text-[#D4A574]">→</span>
          </button>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.slice(0, 3).map((article) => (
            <article
              key={article.id}
              className="group flex flex-col bg-[#FFFFFF] border border-[#E8D5C4]/80 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Cover Artwork */}
              <div
                onClick={() => navigate(`/journal/${article.slug}`)}
                className="aspect-16/10 bg-[#FAF6F0] overflow-hidden cursor-pointer relative"
              >
                <BrandAssetImage
                  assetId={article.assetId}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-[#FAF6F0]/90 backdrop-blur-xs text-[10px] tracking-widest uppercase font-semibold text-[#6B2C3E] px-2.5 py-1">
                  {article.category}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-[11px] text-[#D4A574] font-medium tracking-wider">
                    <span>{article.readTime}</span>
                    <span className="mx-2">·</span>
                    <span>{article.publishDate}</span>
                  </div>

                  <h3
                    onClick={() => navigate(`/journal/${article.slug}`)}
                    className="font-serif text-xl font-semibold text-[#2D1B1A] group-hover:text-[#6B2C3E] transition-colors leading-snug cursor-pointer"
                  >
                    {article.title}
                  </h3>

                  <p className="text-xs text-[#2D1B1A]/70 line-clamp-3 font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8D5C4]/40 flex items-center justify-between text-xs">
                  <span className="text-[#2D1B1A]/60 italic font-serif text-[11px]">
                    By {article.author.name}
                  </span>
                  <button
                    onClick={() => navigate(`/journal/${article.slug}`)}
                    className="text-[#6B2C3E] font-semibold text-[11px] tracking-wider uppercase flex items-center gap-1 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
