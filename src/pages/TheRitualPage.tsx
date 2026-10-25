import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { PRODUCTS } from '@/src/data/products.ts';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import {
  RitualProgress,
  RITUAL_STAGES,
} from '@/src/components/ritual/RitualProgress.tsx';
import { Sparkles, Clock, Check, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

export const TheRitualPage: React.FC = () => {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const [activeStep, setActiveStep] = useState<number>(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  const topStepperRef = useRef<HTMLDivElement>(null);
  const stepSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isManualScrollingRef = useRef(false);
  const manualScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const steps = [
    {
      num: '01',
      title: 'EXFOLIATE',
      productSlug: 'le-bon-bon-de-bain',
      productName: 'Le Bon Bon de Bain',
      time: '3–4 Minutes',
      waterTemp: 'Warm, Steamy',
      advice:
        'Step into the shower or bath. Allow the warm steam to open skin follicles and ease the nervous system. Take a generous scoop of Le Bon Bon de Bain and massage with circular, upward strokes. The sugar pearls gently dissolve into a milky emulsion, polishing away rough edges without disrupting your skin’s acid mantle.',
      quote: '“Exfoliation is not friction; it is the conscious shedding of the day’s burdens.”',
      tip: 'Focus on elbows, knees, and heels with circular motion before rinsing with lukewarm water.',
    },
    {
      num: '02',
      title: 'NOURISH',
      productSlug: 'velvet-elixir',
      productName: 'Velvet Elixir',
      time: '2 Minutes',
      waterTemp: 'Immediately Post-Bathing',
      advice:
        'Step out of the water but do not towel completely dry. While your limbs are still dewy and warm, dispense 4–6 drops of Velvet Elixir into your palms. Press gently onto collarbones, arms, and thighs. The golden botanical nectar binds with water molecules, locking in deep nourishment and bestowing a candle-lit satin glow.',
      quote: '“Apply oil to warm skin to capture hydration at its peak molecular absorption.”',
      tip: 'Warm oil between palms for 5 seconds to activate the cold-pressed botanical essences.',
    },
    {
      num: '03',
      title: 'SOFTEN',
      productSlug: 'velvet-body-lotion',
      productName: 'Velvet Body Lotion',
      time: '2 Minutes',
      waterTemp: 'Ambient Air',
      advice:
        'Smooth Velvet Body Lotion across your body, gliding directly over the Elixir. The biomimetic ceramides and peach amber nectar seal in the oil layer, providing the tactile comfort of cashmere against bare skin that lasts through the night.',
      quote: '“Layering lotion over oil creates a protective velvety cushion that never feels greasy.”',
      tip: 'Glide along the lymphatic flow in long strokes toward the heart to encourage relaxation.',
    },
    {
      num: '04',
      title: 'FINISH',
      productSlug: 'velvet-body-spray',
      productName: 'Velvet Body Spray',
      time: '1 Minute',
      waterTemp: 'Cool Fine Mist',
      advice:
        'Crown your ritual with the fine fragrance mist. Hold the flacon 8 inches away and diffuse across pulse points, hair ends, and décolletage. The warm notes of spun sugar, amber, and cashmeran bind with the warm body oils for an intimate, unforgettable personal sillage.',
      quote: '“A fragrance misted over oiled skin becomes an intimate aura that whispers.”',
      tip: 'Allow the scent to settle naturally into skin warmth without rubbing wrists together.',
    },
  ];

  // Manual interaction: Smooth scroll to selected stage with scroll-spy suppression
  const handleSelectStep = useCallback((index: number) => {
    setActiveStep(index);
    isManualScrollingRef.current = true;

    if (manualScrollTimeoutRef.current) {
      clearTimeout(manualScrollTimeoutRef.current);
    }

    const stage = RITUAL_STAGES[index];
    const targetEl =
      (stage ? document.getElementById(stage.sectionId) : null) ||
      stepSectionRefs.current[index];

    if (targetEl) {
      // Header (~65px) + Sticky Bar (~55px) + Buffer (~15px)
      const headerOffset = 135;
      const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
      const targetScrollTop = Math.max(0, elementPosition - headerOffset);

      window.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth',
      });
    }

    // Re-enable scroll spy after the smooth scroll finishes
    manualScrollTimeoutRef.current = setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 750);
  }, []);

  // Toggle completion of a step
  const toggleStepCompleted = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleResetRitual = () => {
    setCompletedSteps([]);
    handleSelectStep(0);
  };

  // Scroll listener: detects active section and toggles sticky stepper visibility
  useEffect(() => {
    const handleScroll = () => {
      // Check sticky stepper visibility relative to top stepper container
      if (topStepperRef.current) {
        const topRect = topStepperRef.current.getBoundingClientRect();
        // Show sticky bar once top stepper starts leaving view
        setIsStickyVisible(topRect.bottom < 110);
      }

      // If user recently clicked a step manually, let the animation finish without overriding
      if (isManualScrollingRef.current) {
        return;
      }

      // Determine active stage based on viewport position
      const focalPoint = window.innerHeight * 0.38;
      let currentIdx = -1;

      RITUAL_STAGES.forEach((stage, index) => {
        const el = document.getElementById(stage.sectionId) || stepSectionRefs.current[index];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= focalPoint && rect.bottom > focalPoint) {
          currentIdx = index;
        }
      });

      // Edge case: if past the last step or above the first step
      if (currentIdx === -1) {
        const firstEl =
          document.getElementById(RITUAL_STAGES[0].sectionId) || stepSectionRefs.current[0];
        const lastEl =
          document.getElementById(RITUAL_STAGES[RITUAL_STAGES.length - 1].sectionId) ||
          stepSectionRefs.current[stepSectionRefs.current.length - 1];

        if (firstEl && firstEl.getBoundingClientRect().top > focalPoint) {
          currentIdx = 0;
        } else if (lastEl && lastEl.getBoundingClientRect().bottom <= focalPoint) {
          currentIdx = RITUAL_STAGES.length - 1;
        }
      }

      if (currentIdx !== -1 && currentIdx !== activeStep) {
        setActiveStep(currentIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (manualScrollTimeoutRef.current) {
        clearTimeout(manualScrollTimeoutRef.current);
      }
    };
  }, [activeStep]);

  return (
    <main className="bg-[#FAF6F0] text-[#2D1B1A] relative">
      {/* Desktop Floating Companion Rail */}
      <RitualProgress
        activeStage={activeStep}
        onStageChange={handleSelectStep}
        completedStages={completedSteps}
        mode="floating-rail"
      />

      {/* Sticky Floating Progress Bar docked beneath the Header */}
      <div
        className={`sticky top-[58px] sm:top-[66px] z-30 transition-all duration-300 ${
          isStickyVisible
            ? 'opacity-100 translate-y-0 shadow-md'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <RitualProgress
          activeStage={activeStep}
          onStageChange={handleSelectStep}
          completedStages={completedSteps}
          mode="docked-bar"
        />
      </div>

      {/* Hero Header */}
      <section className="py-20 sm:py-28 bg-[#2D1B1A] text-[#FAF6F0] text-center border-b border-[#6B2C3E]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#D4A574]">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
            <span>The SANA Body Care Method</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#FAF6F0]">
            THE VELVET RITUAL MASTERCLASS
          </h1>

          <p className="text-base sm:text-lg text-[#E8D5C4]/90 font-light leading-relaxed max-w-2xl mx-auto">
            A comprehensive guide to transforming personal care into a meditative evening sanctuary through deliberate botanical layering.
          </p>
        </div>
      </section>

      {/* Interactive Ritual Progress Stepper Section */}
      <section
        ref={topStepperRef}
        className="py-12 bg-[#FAF6F0] border-b border-[#E8D5C4]"
      >
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <RitualProgress
            activeStage={activeStep}
            onStageChange={handleSelectStep}
            completedStages={completedSteps}
            mode="banner"
          />

          {/* Completion tracker banner if steps are marked done */}
          {completedSteps.length > 0 && (
            <div className="mt-6 p-4 bg-[#FFFFFF] border border-[#C9A961]/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[#6B2C3E]">
                <CheckCircle2 className="w-4 h-4 text-[#C9A961]" />
                <span className="font-medium">
                  {completedSteps.length} of {steps.length} stages marked complete in this session
                </span>
              </div>
              <button
                onClick={handleResetRitual}
                className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-neutral-500 hover:text-[#6B2C3E] cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Ritual</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Sequential Masterclass Steps */}
      <section className="py-20 max-w-5xl mx-auto px-6 sm:px-8 space-y-20">
        {steps.map((st, idx) => {
          const product = PRODUCTS.find((p) => p.slug === st.productSlug)!;
          const isCurrent = idx === activeStep;
          const isDone = completedSteps.includes(idx);
          const stageSectionId = RITUAL_STAGES[idx]?.sectionId || `ritual-stage-${idx}`;

          return (
            <div
              key={st.num}
              ref={(el) => {
                stepSectionRefs.current[idx] = el;
              }}
              id={stageSectionId}
              className={`bg-[#FFFFFF] border transition-all duration-300 p-8 sm:p-12 relative overflow-hidden ${
                isCurrent
                  ? 'border-[#C9A961] shadow-lg ring-1 ring-[#C9A961]/40'
                  : 'border-[#E8D5C4] shadow-xs'
              }`}
            >
              {/* Highlight bar for current active step */}
              {isCurrent && (
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C9A961]" />
              )}

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Step Header & Product Artwork */}
                <div className="md:col-span-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-3xl font-bold text-[#6B2C3E]">
                        {st.num}
                      </span>
                      <span className="h-[1px] w-8 bg-[#D4A574]" />
                      <span className="text-xs uppercase tracking-widest font-semibold text-[#2D1B1A]">
                        {st.title}
                      </span>
                    </div>

                    {/* Step Complete Toggle */}
                    <button
                      onClick={() => toggleStepCompleted(idx)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold border transition-colors cursor-pointer ${
                        isDone
                          ? 'bg-[#C9A961] border-[#C9A961] text-[#2D1B1A]'
                          : 'border-[#E8D5C4] hover:border-[#6B2C3E] text-neutral-600'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{isDone ? 'Completed' : 'Mark Done'}</span>
                    </button>
                  </div>

                  <div className="aspect-square bg-[#FAF6F0] border border-[#E8D5C4] overflow-hidden relative group">
                    <BrandAssetImage
                      assetId={product.assetId}
                      alt={st.productName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#2D1B1A]/85 text-[#FAF6F0] px-2.5 py-1 text-[10px] uppercase tracking-widest border border-[#D4A574]/40 font-mono">
                      {st.time}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#2D1B1A]/70 pt-1">
                    <span className="flex items-center gap-1 text-[#6B2C3E]">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{st.time}</span>
                    </span>
                    <span className="italic font-serif text-neutral-600">
                      {st.waterTemp}
                    </span>
                  </div>
                </div>

                {/* Right Advice & Purchase CTA */}
                <div className="md:col-span-7 space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-[#D4A574] font-semibold">
                        Stage {st.num} · {product.category}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#C9A961] flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#C9A961]" />
                          Current Stage
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-[#2D1B1A]">
                      {st.productName}
                    </h3>
                  </div>

                  <p className="text-sm text-[#2D1B1A]/80 font-light leading-relaxed">
                    {st.advice}
                  </p>

                  <div className="bg-[#FAF6F0] p-3.5 border-l-2 border-[#C9A961] text-xs text-[#2D1B1A]/80">
                    <span className="font-semibold text-[#6B2C3E] block uppercase tracking-wider text-[10px] mb-1">
                      Atelier Technique
                    </span>
                    <p className="italic">{st.tip}</p>
                  </div>

                  <blockquote className="border-l-2 border-[#6B2C3E] pl-4 text-xs font-serif italic text-[#6B2C3E] leading-relaxed">
                    {st.quote}
                  </blockquote>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#E8D5C4]/60">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-6 py-3 text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer"
                      >
                        Add Step {st.num} to Bag · {formatPrice(product.price)}
                      </button>

                      <button
                        onClick={() => navigate(`/products/${product.slug}`)}
                        className="text-xs tracking-wider uppercase text-[#6B2C3E] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <span>Product Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Step forward to next stage */}
                    {idx < steps.length - 1 && (
                      <button
                        onClick={() => handleSelectStep(idx + 1)}
                        className="text-[11px] uppercase tracking-wider text-neutral-500 hover:text-[#6B2C3E] flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <span>Next: {steps[idx + 1].title}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Full Routine Bundle Promotion */}
      <section className="bg-[#2D1B1A] text-[#FAF6F0] py-16 border-t border-[#6B2C3E]">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center space-y-6">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4A574] font-medium">
            The Complete Body Sanctuary
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl">
            EXPERIENCE THE COMPLETE 4-STAGE RITUAL
          </h2>
          <p className="text-sm text-[#E8D5C4]/80 max-w-xl mx-auto font-light leading-relaxed">
            Acquire all four formulations together in our bespoke presentation coffret, calibrated for optimum botanical layering.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                steps.forEach((s) => {
                  const p = PRODUCTS.find((prod) => prod.slug === s.productSlug);
                  if (p) addToCart(p, 1);
                });
              }}
              className="bg-[#D4A574] hover:bg-[#E8D5C4] text-[#2D1B1A] px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer"
            >
              Add All 4 Ritual Stages to Bag · {formatPrice(242)}
            </button>
            <button
              onClick={() => navigate('/collections/body-care')}
              className="text-xs tracking-[0.18em] uppercase text-[#FAF6F0] hover:text-[#D4A574] border border-[#FAF6F0]/20 hover:border-[#D4A574] px-6 py-3.5 transition-colors cursor-pointer"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
