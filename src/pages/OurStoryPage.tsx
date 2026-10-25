import React from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import { Sparkles, ArrowRight } from 'lucide-react';

export const OurStoryPage: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <main className="bg-[#FAF6F0] text-[#2D1B1A]">
      {/* Hero Header */}
      <section className="py-20 sm:py-28 bg-[#2D1B1A] text-[#FAF6F0] text-center border-b border-[#6B2C3E]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#D4A574]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
            <span>The Maison Philosophy</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF6F0]">
            THE ART OF VELVET
          </h1>

          <p className="text-base sm:text-lg text-[#E8D5C4]/90 font-light leading-relaxed max-w-2xl mx-auto">
            Born from the belief that everyday body care should never be a chore, but an intentional sanctuary of tactile softness and warmth.
          </p>
        </div>
      </section>

      {/* Narrative Section 1: The Inspiration */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
              01 · The Genesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D1B1A]">
              Slowing Down in a World of Haste.
            </h2>
            <p className="text-sm sm:text-base text-[#2D1B1A]/80 font-light leading-relaxed">
              SANA BEAUTY was conceived in an intimate Parisian atelier where perfume blenders and lipid chemists sought to answer a single question: What if the sensation of slipping into heavy velvet could be translated into liquid form?
            </p>
            <p className="text-sm text-[#2D1B1A]/80 font-light leading-relaxed">
              Most commercial body products are designed to evaporate instantly or mask the skin in artificial silicones. We chose the opposite path: cold-pressed marula, virgin camellia seed, and biomimetic ceramides that melt organically with your body’s natural lipid mantle.
            </p>
          </div>

          <div className="lg:col-span-6 relative aspect-4/3 bg-[#FFFFFF] border border-[#E8D5C4] shadow-md overflow-hidden">
            <BrandAssetImage
              assetId="hero_campaign"
              alt="SANA BEAUTY campaign aesthetics"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Narrative Section 2: The Four Pillars */}
      <section className="py-20 bg-[#FFFFFF] border-y border-[#E8D5C4]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-16">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
              Our Commitments
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2D1B1A]">
              THE PILLARS OF SANA CRAFT
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 border border-[#E8D5C4] bg-[#FAF6F0] space-y-3">
              <span className="font-serif text-2xl font-bold text-[#6B2C3E]">01</span>
              <h4 className="font-serif text-lg font-semibold text-[#2D1B1A]">Tactile Sensory Priority</h4>
              <p className="text-xs text-[#2D1B1A]/70 leading-relaxed font-light">
                Formulations are tested on skin touch resistance, velvet dry-down, and cushion comfort before efficacy approval.
              </p>
            </div>

            <div className="p-8 border border-[#E8D5C4] bg-[#FAF6F0] space-y-3">
              <span className="font-serif text-2xl font-bold text-[#6B2C3E]">02</span>
              <h4 className="font-serif text-lg font-semibold text-[#2D1B1A]">Rigid Keepsake Packaging</h4>
              <p className="text-xs text-[#2D1B1A]/70 leading-relaxed font-light">
                Heavy frosted glass, magnetic presentation boxes, and double-faced velvet ribbon created to grace your vanity indefinitely.
              </p>
            </div>

            <div className="p-8 border border-[#E8D5C4] bg-[#FAF6F0] space-y-3">
              <span className="font-serif text-2xl font-bold text-[#6B2C3E]">03</span>
              <h4 className="font-serif text-lg font-semibold text-[#2D1B1A]">Clean Formulation Ethos</h4>
              <p className="text-xs text-[#2D1B1A]/70 leading-relaxed font-light">
                Cruelty-free, ethically sourced botanicals, free from parabens, phthalates, and unnecessary synthetic fillers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center max-w-2xl mx-auto px-6 space-y-6">
        <h3 className="font-serif text-3xl text-[#2D1B1A]">
          Step Into The Sanctuary
        </h3>
        <p className="text-sm text-[#2D1B1A]/80 font-light leading-relaxed">
          Discover the complete Velvet Lollipop four-piece suite and experience body care transformed.
        </p>
        <button
          onClick={() => navigate('/collections/velvet-lollipop')}
          className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer"
        >
          Explore The Collection
        </button>
      </section>
    </main>
  );
};
