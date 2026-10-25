import React, { useState } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { PRODUCTS } from '@/src/data/products.ts';
import { BrandAssetImage } from '@/src/components/ui/BrandAssetImage.tsx';
import {
  RitualProgressStepper,
  DEFAULT_RITUAL_STAGES,
} from '@/src/components/ritual/RitualProgressStepper.tsx';
import { ArrowRight, BookOpen } from 'lucide-react';

export const VelvetRitualSection: React.FC = () => {
  const { navigate } = useRouter();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const ritualSteps = [
    {
      step: '01',
      title: 'EXFOLIATE',
      productName: 'Le Bon Bon de Bain',
      subtitle: 'Whipped Exfoliating Soufflé',
      slug: 'le-bon-bon-de-bain',
      assetId: 'product_scrub',
      description:
        'Warm water opens the senses. Gently polish away dead skin cells with micro-fine crystalline sugar pearls infused with sweet almond and jojoba lipids, preparing the body for maximum hydration.',
      ritualTip: 'Massage in upward circular motions on shoulders and limbs for 2 minutes before warm rinse.',
      duration: '3 Minutes',
    },
    {
      step: '02',
      title: 'NOURISH',
      productName: 'Velvet Elixir',
      subtitle: 'Multi-Sensory Dry Body Oil',
      slug: 'velvet-elixir',
      assetId: 'product_oil',
      description:
        'While skin is still damp and steaming from the bath, press 4–6 drops of Velvet Elixir into your palms and sweep over limbs. Precious marula and camellia oils seal in moisture with a featherweight, non-greasy satin gleam.',
      ritualTip: 'Focus on collarbones, shoulders, and legs for a golden, candle-lit radiance.',
      duration: '2 Minutes',
    },
    {
      step: '03',
      title: 'SOFTEN',
      productName: 'Velvet Body Lotion',
      subtitle: 'Silken Hydrating Veil',
      slug: 'velvet-body-lotion',
      assetId: 'product_lotion',
      description:
        'Layer over the Elixir to cushion the epidermis in biomimetic ceramides and peach amber nectar. The skin drinks in lasting, touchable velvet softness that endures for up to 24 hours.',
      ritualTip: 'Smooth downward in long relaxing sweeps to calm tension and comfort the nervous system.',
      duration: '2 Minutes',
    },
    {
      step: '04',
      title: 'FINISH',
      productName: 'Velvet Body Spray',
      subtitle: 'Sensual Fine Fragrance Mist',
      slug: 'velvet-body-spray',
      assetId: 'product_spray',
      description:
        'Crown the ritual with an intimate fragrance cloud. Diffuse over pulse points, hair, and décolletage. The warm notes of spun sugar, amber, and cashmeran bind with the warm body oil for an unforgettable sillage.',
      ritualTip: 'Hold 8 inches away and walk through the mist for an all-encompassing scent bubble.',
      duration: '1 Minute',
    },
  ];

  const currentStep = ritualSteps[activeStepIndex];
  const currentProduct = PRODUCTS.find((p) => p.slug === currentStep.slug);

  return (
    <section className="py-24 sm:py-32 bg-[#2D1B1A] text-[#FAF6F0] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6B2C3E]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A574]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4A574] font-medium">
            The 4-Step Body Care Experience
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FAF6F0]">
            YOUR MOMENT. YOUR RITUAL.
          </h2>
          <p className="text-sm text-[#E8D5C4]/80 font-light leading-relaxed">
            Four carefully calibrated steps designed to transform daily bathing into an immersive sensory sanctuary.
          </p>
        </div>

        {/* Visual Ritual Progress Stepper */}
        <div className="mb-10">
          <RitualProgressStepper
            activeStep={activeStepIndex}
            onSelectStep={(idx) => setActiveStepIndex(idx)}
            stages={DEFAULT_RITUAL_STAGES}
            variant="full"
            theme="dark"
            showControls={false}
          />
        </div>

        {/* Interactive Step Display */}
        <div className="bg-[#1F1212] border border-[#FAF6F0]/10 rounded-none p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Product Visual */}
          <div className="lg:col-span-5 relative aspect-square max-w-md mx-auto w-full bg-[#FAF6F0] rounded-none overflow-hidden shadow-2xl">
            <BrandAssetImage
              assetId={currentStep.assetId}
              alt={currentStep.productName}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute top-4 left-4 bg-[#2D1B1A]/90 text-[#FAF6F0] px-3 py-1 text-[10px] tracking-widest uppercase font-semibold border border-[#C9A961]/40">
              Step {currentStep.step} · {currentStep.duration}
            </div>
          </div>

          {/* Right Column: Step Description & Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#D4A574] font-medium">
                Stage {currentStep.step} · {currentStep.title}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF6F0]">
                {currentStep.productName}
              </h3>
              <p className="text-sm text-[#D4A574] font-serif italic">
                {currentStep.subtitle}
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#FAF6F0]/80 font-light leading-relaxed">
              {currentStep.description}
            </p>

            {/* Ritual Tip Box */}
            <div className="p-4 bg-[#2D1B1A] border-l-2 border-[#C9A961] text-xs text-[#E8D5C4] space-y-1">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C9A961] block">
                Atelier Application Method
              </span>
              <p className="italic leading-relaxed">{currentStep.ritualTip}</p>
            </div>

            {/* Step Action Buttons & Link to Full Masterclass */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {currentProduct && (
                <button
                  onClick={() => addToCart(currentProduct, 1)}
                  className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-6 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer"
                >
                  Add {currentProduct.name} to Bag · {formatPrice(currentProduct.price)}
                </button>
              )}

              <button
                onClick={() => navigate(`/products/${currentStep.slug}`)}
                className="text-xs tracking-[0.18em] uppercase text-[#E8D5C4] hover:text-[#FAF6F0] underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Product Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => navigate('/the-ritual')}
                className="text-xs tracking-[0.18em] uppercase text-[#D4A574] hover:text-[#FAF6F0] flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Full Masterclass</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
