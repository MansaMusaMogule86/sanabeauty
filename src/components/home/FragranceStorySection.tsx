import React from 'react';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';

export const FragranceStorySection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF6F0] text-[#2D1B1A] border-b border-[#E8D5C4]/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
            Olfactory Architecture
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2D1B1A]">
            SOFTNESS YOU CAN ALMOST SMELL.
          </h2>
          <p className="text-sm sm:text-base text-[#2D1B1A]/80 font-light leading-relaxed">
            An intoxicating gourmand harmony inspired by the decadence of Parisian confectionery and the quiet warmth of sun-drenched amber.
          </p>
        </div>

        {/* Sensory Moodboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Mood 1: Spun Marshmallow */}
          <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-6 space-y-4 shadow-sm group hover:-translate-y-1 transition-transform">
            <div className="aspect-square overflow-hidden bg-[#FAF6F0] relative">
              <BrandAssetImage
                assetId="fragrance_marshmallow"
                alt="Whipped vanilla cream texture"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-[#FAF6F0]/90 text-[10px] tracking-widest uppercase font-semibold text-[#6B2C3E] px-2 py-1">
                Top Accord
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-[#2D1B1A]">
                Spun Sugar & Marshmallow
              </h3>
              <p className="text-xs text-[#2D1B1A]/70 leading-relaxed font-light">
                An airy, playful sweetness that sparkles upon initial touch, evoking freshly spun sugar clouds and velvety confectioner cream.
              </p>
            </div>
          </div>

          {/* Mood 2: Peach Amber */}
          <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-6 space-y-4 shadow-sm group hover:-translate-y-1 transition-transform">
            <div className="aspect-square overflow-hidden bg-[#FAF6F0] relative">
              <BrandAssetImage
                assetId="fragrance_amber"
                alt="Warm golden peach amber catching natural light"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-[#FAF6F0]/90 text-[10px] tracking-widest uppercase font-semibold text-[#6B2C3E] px-2 py-1">
                Heart Accord
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-[#2D1B1A]">
                Peach Amber & Nectar
              </h3>
              <p className="text-xs text-[#2D1B1A]/70 leading-relaxed font-light">
                Sun-warmed peach flesh and incandescent amber resin. It grounds the sweet overture in sophisticated, radiant warmth.
              </p>
            </div>
          </div>

          {/* Mood 3: Velvet Cashmeran */}
          <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-6 space-y-4 shadow-sm group hover:-translate-y-1 transition-transform">
            <div className="aspect-square overflow-hidden bg-[#FAF6F0] relative">
              <BrandAssetImage
                assetId="fragrance_velvet_silk"
                alt="Folds of rich burgundy velvet drapery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-[#FAF6F0]/90 text-[10px] tracking-widest uppercase font-semibold text-[#6B2C3E] px-2 py-1">
                Base Accord
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-[#2D1B1A]">
                Bourbon Vanilla & Cashmeran
              </h3>
              <p className="text-xs text-[#2D1B1A]/70 leading-relaxed font-light">
                Deep, comforting musk and aged bourbon vanilla pods that cling closely to warmed skin, leaving a lingering, tactile memory.
              </p>
            </div>
          </div>
        </div>

        {/* Olfactory Note Pyramid Banner */}
        <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-sm">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4A574] font-semibold block mb-4">
            The Scent Architecture
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#E8D5C4]/60">
            <div className="pt-4 md:pt-0">
              <span className="text-xs font-serif font-bold text-[#6B2C3E] block mb-1">TOP NOTES</span>
              <p className="text-xs text-[#2D1B1A]/80">Pink Sugar Crystals · Fluffy Marshmallow · Dewy Pear</p>
            </div>
            <div className="pt-4 md:pt-0 md:px-4">
              <span className="text-xs font-serif font-bold text-[#6B2C3E] block mb-1">HEART NOTES</span>
              <p className="text-xs text-[#2D1B1A]/80">Warm Peach Amber · Whipped Coconut Milk · Freesia</p>
            </div>
            <div className="pt-4 md:pt-0 md:pl-4">
              <span className="text-xs font-serif font-bold text-[#6B2C3E] block mb-1">BASE NOTES</span>
              <p className="text-xs text-[#2D1B1A]/80">Bourbon Vanilla · Cashmeran · Soft Velvet Musk</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
