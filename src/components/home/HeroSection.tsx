import React from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { ArrowDown, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigate } = useRouter();

  const handleScrollDown = () => {
    const nextSection = document.getElementById('brand-statement');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] lg:min-h-[94vh] bg-[#2D1B1A] text-[#FAF6F0] flex flex-col justify-between overflow-hidden">
      {/* Background Campaign Visual Layer */}
      <div className="absolute inset-0 z-0">
        <BrandAssetImage
          assetId="hero_campaign"
          alt="SANA BEAUTY Campaign: Woman in burgundy velvet gown holding Velvet Elixir body oil"
          className="w-full h-full object-cover opacity-90"
          priority
        />
        {/* Cinematic gradient scrims to ensure 100% WCAG AA text legibility without blocking model */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B1A] via-[#2D1B1A]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D1B1A]/80 via-[#2D1B1A]/30 to-transparent lg:w-3/5" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-16 sm:pt-24 pb-16 flex-1 flex flex-col justify-center">
        <div className="max-w-xl space-y-6">
          {/* Collection Kicker */}
          <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#D4A574] font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
            <span>The Velvet Lollipop Experience</span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF6F0] leading-[1.1] text-balance">
            A LITTLE LUXURY. EVERY DAY.
          </h1>

          {/* Secondary Subtitle */}
          <p className="text-base sm:text-lg text-[#E8D5C4] font-light leading-relaxed max-w-lg">
            Meet Velvet Lollipop. A body care ritual wrapped in softness, warmth and indulgence.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => navigate('/collections/velvet-lollipop')}
              className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 text-center cursor-pointer shadow-lg hover:shadow-xl hover:translate-y-[-1px]"
            >
              Discover The Collection
            </button>
            <button
              onClick={() => navigate('/the-ritual')}
              className="bg-transparent hover:bg-[#FAF6F0]/10 text-[#FAF6F0] border border-[#C9A961]/60 px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-colors text-center cursor-pointer"
            >
              Explore The Ritual
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Trust Ribbon */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 pb-8 flex items-center justify-between text-xs text-[#FAF6F0]/70">
        <div className="hidden sm:flex items-center gap-6 tracking-widest uppercase text-[11px] text-[#D4A574]">
          <span>01 · Exfoliate</span>
          <span>·</span>
          <span>02 · Nourish</span>
          <span>·</span>
          <span>03 · Soften</span>
          <span>·</span>
          <span>04 · Finish</span>
        </div>

        <button
          onClick={handleScrollDown}
          className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#FAF6F0]/80 hover:text-[#C9A961] transition-colors cursor-pointer group"
          aria-label="Scroll to next section"
        >
          <span>Scroll to Discover</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce group-hover:text-[#C9A961]" />
        </button>
      </div>
    </section>
  );
};
