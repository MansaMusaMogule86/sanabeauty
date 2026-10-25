import React from 'react';
import { HeroSection } from '@/src/components/home/HeroSection.tsx';
import { BrandStatementSection } from '@/src/components/home/BrandStatementSection.tsx';
import { CollectionSection } from '@/src/components/home/CollectionSection.tsx';
import { VelvetRitualSection } from '@/src/components/home/VelvetRitualSection.tsx';
import { FragranceStorySection } from '@/src/components/home/FragranceStorySection.tsx';
import { SignatureBoxSection } from '@/src/components/home/SignatureBoxSection.tsx';
import { SanaEditSection } from '@/src/components/home/SanaEditSection.tsx';
import { RitualFinderSection } from '@/src/components/home/RitualFinderSection.tsx';
import { WaitlistSection } from '@/src/components/home/WaitlistSection.tsx';

export const HomePage: React.FC = () => {
  return (
    <main className="w-full">
      {/* Section 1: Immersive Hero */}
      <HeroSection />

      {/* Section 2: The Brand Statement */}
      <BrandStatementSection />

      {/* Section 3: The Collection */}
      <CollectionSection />

      {/* Section 4: The Velvet Ritual */}
      <VelvetRitualSection />

      {/* Section 5: The Fragrance Story */}
      <FragranceStorySection />

      {/* Section 6: The Signature Box */}
      <SignatureBoxSection />

      {/* Section 7: The Beauty Editorial */}
      <SanaEditSection />

      {/* Section 8: The Signature Experience (Ritual Finder) */}
      <RitualFinderSection />

      {/* Section 9: The Waitlist / Pre-launch Private Access */}
      <WaitlistSection />
    </main>
  );
};
