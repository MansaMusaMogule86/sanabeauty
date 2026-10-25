import React, { useState } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { PRODUCTS, Product } from '@/src/data/products.ts';
import { Sparkles, Check, Share2, BookmarkCheck, ArrowRight } from 'lucide-react';

interface RitualOutcome {
  title: string;
  subtitle: string;
  cadenceDescription: string;
  recommendedProducts: Product[];
  stepsAdvice: string[];
}

export const RitualFinderSection: React.FC = () => {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [question1, setQuestion1] = useState<string>('evening');
  const [question2, setQuestion2] = useState<string>('glow');
  const [question3, setQuestion3] = useState<string>('15min');
  const [savedLocally, setSavedLocally] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Compute recommended sequence
  const getOutcome = (): RitualOutcome => {
    const scrub = PRODUCTS.find((p) => p.slug === 'le-bon-bon-de-bain')!;
    const oil = PRODUCTS.find((p) => p.slug === 'velvet-elixir')!;
    const lotion = PRODUCTS.find((p) => p.slug === 'velvet-body-lotion')!;
    const spray = PRODUCTS.find((p) => p.slug === 'velvet-body-spray')!;

    if (question3 === '5min') {
      return {
        title: 'The Luminous Express Ritual',
        subtitle: 'A high-impact 5-minute glow cadence for effortless daily luxury.',
        cadenceDescription:
          'When time is precious, layering Velvet Elixir with a feather-light mist of Velvet Body Spray delivers instant satin luminosity and an intimate fragrance cloud that endures all day.',
        recommendedProducts: [oil, spray],
        stepsAdvice: [
          'Press 4 drops of Velvet Elixir into damp palms and sweep over shoulders and collarbones.',
          'Diffuse Velvet Body Spray from 8 inches away over hair and pulse points for immediate sillage.',
        ],
      };
    }

    if (question1 === 'evening' || question3 === '30min') {
      return {
        title: 'The Evening Velvet Sanctuary',
        subtitle: 'The complete 4-step restorative masterclass for deep tactile peace.',
        cadenceDescription:
          'The ultimate expression of SANA BEAUTY. Unhurried exfoliation in the bath followed by multi-sensory dry oil, comforting velvet lotion, and a crown of warm marshmallow mist.',
        recommendedProducts: [scrub, oil, lotion, spray],
        stepsAdvice: [
          'Exfoliate gently with Le Bon Bon de Bain under warm running water to release tension.',
          'Lock in steamy moisture immediately with precious drops of Velvet Elixir.',
          'Soften and cushion limbs with silken Velvet Body Lotion.',
          'Spritz Velvet Body Spray onto warmed skin before slipping into silk loungewear.',
        ],
      };
    }

    if (question2 === 'hydration') {
      return {
        title: 'The Velveteen Moisture Cocoon',
        subtitle: 'Intensive lipid restoration and 24-hour touchable softness.',
        cadenceDescription:
          'Combining botanical polishing with rich ceramide layering to quench dry, tired skin and restore supple, velvet-smooth vitality.',
        recommendedProducts: [scrub, lotion, oil],
        stepsAdvice: [
          'Buff away dull surface flakes with Le Bon Bon de Bain.',
          'Massage Velvet Body Lotion into limbs using slow, rhythmic strokes.',
          'Seal dry spots and collarbones with Velvet Elixir for a protective golden sheen.',
        ],
      };
    }

    // Default: The Golden Scent Symphony
    return {
      title: 'The Golden Scent Symphony',
      subtitle: 'A sensory pairing focused on radiant warmth and captivating presence.',
      cadenceDescription:
        'Designed for moments when you want to feel unforgettable. The warm peach amber of Velvet Elixir creates the optimal warm lipid anchor for the gourmand notes of Velvet Body Spray.',
      recommendedProducts: [oil, lotion, spray],
      stepsAdvice: [
        'Apply Velvet Body Lotion across the chest, shoulders, and arms.',
        'Warm 3 drops of Velvet Elixir between fingertips and press into neck and wrists.',
        'Mist Velvet Body Spray over hair and décolletage for a multi-dimensional scent halo.',
      ],
    };
  };

  const outcome = getOutcome();

  const handleSaveRitual = () => {
    try {
      const ritualData = {
        title: outcome.title,
        date: new Date().toISOString(),
        products: outcome.recommendedProducts.map((p) => p.name),
      };
      localStorage.setItem('sana_saved_ritual', JSON.stringify(ritualData));
      setSavedLocally(true);
      setTimeout(() => setSavedLocally(false), 3000);
    } catch {
      // ignore
    }
  };

  const handleShareLink = () => {
    const url = `${window.location.origin}/find-your-ritual?q1=${question1}&q2=${question2}&q3=${question3}`;
    navigator.clipboard?.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleAddAllToBag = () => {
    outcome.recommendedProducts.forEach((p) => addToCart(p, 1));
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FAF6F0] text-[#2D1B1A] border-b border-[#E8D5C4]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
            <span>Interactive Lifestyle Concierge</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2D1B1A]">
            FIND YOUR VELVET MOMENT.
          </h2>
          <p className="text-sm sm:text-base text-[#2D1B1A]/80 font-light leading-relaxed">
            Answer three lifestyle questions to unveil your personalized SANA BEAUTY body care ritual sequence.
          </p>
        </div>

        {/* 3 Questions Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Question 1 */}
          <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8D5C4]/60 pb-3">
              <span className="text-[11px] font-serif font-bold text-[#6B2C3E]">QUESTION 01</span>
              <span className="text-[10px] uppercase tracking-wider text-[#D4A574]">Occasion</span>
            </div>
            <h3 className="font-serif text-base font-semibold text-[#2D1B1A]">
              What moment are you preparing for?
            </h3>
            <div className="space-y-2">
              {[
                { id: 'morning', label: 'Morning Refresh & Vitality' },
                { id: 'evening', label: 'Evening Unwind & Decompression' },
                { id: 'weekend', label: 'Weekend Self-Care Sanctuary' },
                { id: 'special', label: 'Special Evening Out' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuestion1(opt.id)}
                  className={`w-full text-left px-4 py-2.5 text-xs transition-colors border cursor-pointer ${
                    question1 === opt.id
                      ? 'bg-[#6B2C3E] text-[#FAF6F0] border-[#6B2C3E] font-medium'
                      : 'bg-[#FAF6F0]/60 hover:bg-[#FAF6F0] text-[#2D1B1A] border-[#E8D5C4]/60'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8D5C4]/60 pb-3">
              <span className="text-[11px] font-serif font-bold text-[#6B2C3E]">QUESTION 02</span>
              <span className="text-[10px] uppercase tracking-wider text-[#D4A574]">Sensation</span>
            </div>
            <h3 className="font-serif text-base font-semibold text-[#2D1B1A]">
              What sensory finish do you desire?
            </h3>
            <div className="space-y-2">
              {[
                { id: 'glow', label: 'Luminous Satin Candle-Lit Glow' },
                { id: 'hydration', label: 'Deep Cushion Softness & Hydration' },
                { id: 'relax', label: 'Calming Stress-Relief Texture' },
                { id: 'scent', label: 'Lingering Gourmand Scent Aura' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuestion2(opt.id)}
                  className={`w-full text-left px-4 py-2.5 text-xs transition-colors border cursor-pointer ${
                    question2 === opt.id
                      ? 'bg-[#6B2C3E] text-[#FAF6F0] border-[#6B2C3E] font-medium'
                      : 'bg-[#FAF6F0]/60 hover:bg-[#FAF6F0] text-[#2D1B1A] border-[#E8D5C4]/60'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#E8D5C4]/60 pb-3">
              <span className="text-[11px] font-serif font-bold text-[#6B2C3E]">QUESTION 03</span>
              <span className="text-[10px] uppercase tracking-wider text-[#D4A574]">Time</span>
            </div>
            <h3 className="font-serif text-base font-semibold text-[#2D1B1A]">
              How much time do you have?
            </h3>
            <div className="space-y-2">
              {[
                { id: '5min', label: '5 Minutes (Express Touch)' },
                { id: '15min', label: '15 Minutes (Daily Ritual)' },
                { id: '30min', label: '30+ Minutes (Full Bath Sanctuary)' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setQuestion3(opt.id)}
                  className={`w-full text-left px-4 py-2.5 text-xs transition-colors border cursor-pointer ${
                    question3 === opt.id
                      ? 'bg-[#6B2C3E] text-[#FAF6F0] border-[#6B2C3E] font-medium'
                      : 'bg-[#FAF6F0]/60 hover:bg-[#FAF6F0] text-[#2D1B1A] border-[#E8D5C4]/60'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Personalized Recommendation Outcome Panel */}
        <div className="bg-[#2D1B1A] text-[#FAF6F0] border border-[#C9A961]/40 p-8 sm:p-12 shadow-xl">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#FAF6F0]/10 pb-6">
              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9A961] font-semibold">
                  Your Bespoke Recommendation
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF6F0]">
                  {outcome.title}
                </h3>
                <p className="text-xs text-[#D4A574] font-serif italic">
                  {outcome.subtitle}
                </p>
              </div>

              {/* Utility actions: Save & Share */}
              <div className="flex items-center gap-3 self-start sm:self-center">
                <button
                  onClick={handleSaveRitual}
                  className="bg-[#1F1212] hover:bg-[#6B2C3E] border border-[#FAF6F0]/20 px-3.5 py-2 text-[11px] tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {savedLocally ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-[#C9A961]" />
                      <span className="text-[#C9A961]">Saved</span>
                    </>
                  ) : (
                    <>
                      <span>Save Ritual</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShareLink}
                  className="bg-[#1F1212] hover:bg-[#6B2C3E] border border-[#FAF6F0]/20 px-3.5 py-2 text-[11px] tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
                </button>
              </div>
            </div>

            <p className="text-sm text-[#FAF6F0]/80 font-light leading-relaxed">
              {outcome.cadenceDescription}
            </p>

            {/* Sequence Steps */}
            <div className="space-y-3">
              <span className="text-[11px] tracking-widest uppercase font-semibold text-[#D4A574] block">
                Prescribed Cadence:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {outcome.stepsAdvice.map((stepText, idx) => (
                  <div key={idx} className="bg-[#1F1212] p-4 border border-[#FAF6F0]/10 flex gap-3 text-xs">
                    <span className="font-serif font-bold text-[#C9A961] shrink-0">0{idx + 1}.</span>
                    <span className="text-[#FAF6F0]/80 leading-relaxed">{stepText}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Products Carousel Cards */}
            <div>
              <span className="text-[11px] tracking-widest uppercase font-semibold text-[#D4A574] block mb-4">
                Included In This Ritual:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {outcome.recommendedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => navigate(`/products/${p.slug}`)}
                    className="bg-[#1F1212] border border-[#FAF6F0]/10 p-3 flex flex-col justify-between hover:border-[#C9A961]/50 cursor-pointer transition-colors group"
                  >
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-[#D4A574] block">
                        {p.category}
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#FAF6F0] group-hover:text-[#C9A961] transition-colors mt-0.5">
                        {p.name}
                      </h4>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#FAF6F0]/10 flex items-center justify-between text-[11px]">
                      <span className="text-[#FAF6F0]/70">{formatPrice(p.price)}</span>
                      <span className="text-[#C9A961] group-hover:translate-x-0.5 transition-transform">→</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Complete Recommended Routine To Bag CTA */}
            <div className="pt-4 border-t border-[#FAF6F0]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <span className="text-xs text-[#E8D5C4]/70">
                Total Recommended Ritual Suite:{' '}
                <strong className="text-[#FAF6F0] font-semibold">
                  {formatPrice(outcome.recommendedProducts.reduce((sum, p) => sum + p.price, 0))}
                </strong>
              </span>

              <button
                onClick={handleAddAllToBag}
                className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer text-center"
              >
                Add Complete Ritual To Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
