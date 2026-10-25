import React from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';

export const BrandStatementSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section
      id="brand-statement"
      className="py-24 sm:py-32 bg-[#FAF6F0] text-[#2D1B1A] border-b border-[#E8D5C4]/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Statement & Copy */}
          <div className="lg:col-span-7 space-y-8">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
              The Brand Statement
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2D1B1A] leading-[1.2] text-balance">
              SOME RITUALS ARE TOO BEAUTIFUL TO RUSH.
            </h2>

            <div className="h-[1px] w-20 bg-[#D4A574]" />

            <p className="text-base sm:text-lg text-[#2D1B1A]/80 font-light leading-relaxed max-w-xl">
              From the first touch to the final lingering note, SANA BEAUTY transforms everyday body care into a moment worth savoring.
            </p>

            <p className="text-sm text-[#2D1B1A]/70 leading-relaxed max-w-lg">
              Crafted around the tactile sensuality of deep burgundy velvet and the warmth of golden amber, our Velvet Lollipop ritual invites you to slow your breathing, honor your skin, and discover the quiet indulgence of unhurried beauty.
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigate('/our-story')}
                className="group inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase font-semibold text-[#6B2C3E] hover:text-[#2D1B1A] transition-colors"
              >
                <span>Read The SANA Philosophy</span>
                <span className="transition-transform group-hover:translate-x-1 text-[#D4A574]">→</span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Vignette with Cropped Product Artwork */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 max-w-md mx-auto rounded-none border border-[#E8D5C4] shadow-sm overflow-hidden bg-[#FFFFFF]">
              <BrandAssetImage
                assetId="product_oil"
                alt="Velvet Elixir body oil detail in warm studio light"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#2D1B1A]/90 via-[#2D1B1A]/40 to-transparent p-6 text-[#FAF6F0]">
                <p className="font-serif italic text-sm text-[#E8D5C4]">
                  "Tactile softness you can feel long after the day ends."
                </p>
                <span className="text-[10px] tracking-widest uppercase text-[#D4A574] mt-1 block">
                  Velvet Elixir · Campaign Centerpiece
                </span>
              </div>
            </div>

            {/* Subtle decorative gold badge accent */}
            <div className="hidden sm:block absolute -top-5 -right-5 bg-[#FAF6F0] border border-[#C9A961]/50 p-4 shadow-md text-center max-w-[140px]">
              <span className="font-serif text-xs italic text-[#6B2C3E] block">Clean Luxury</span>
              <span className="text-[9px] uppercase tracking-widest text-[#2D1B1A]/70 mt-0.5 block">Made with Reverence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
