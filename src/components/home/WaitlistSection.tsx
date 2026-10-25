import React from 'react';
import { Sparkles } from 'lucide-react';
import { NewsletterSignup } from '@/src/components/forms/NewsletterSignup.tsx';

export const WaitlistSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF6F0] text-[#2D1B1A] border-b border-[#E8D5C4]/60">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-8 sm:p-14 shadow-lg text-center relative overflow-hidden">
          {/* Subtle gold ribbon top edge */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#6B2C3E] via-[#C9A961] to-[#6B2C3E]" />

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A961]" />
              <span>Private Launch Access</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#2D1B1A] leading-tight">
              SOMETHING BEAUTIFUL IS COMING.
            </h2>

            <p className="text-sm sm:text-base text-[#2D1B1A]/80 font-light leading-relaxed">
              Be the first to step into the Velvet Lollipop universe. Private Launch Members receive guaranteed allocation access to our handcrafted presentation boxes, complimentary velvet gift wrapping, and inaugural member privileges.
            </p>

            <div className="pt-2">
              <NewsletterSignup
                variant="waitlist"
                source="waitlist_private_launch"
                showNameField={true}
                showConsentCheckbox={true}
                placeholder="name@domain.com"
                buttonText="Join The Private Launch List"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

