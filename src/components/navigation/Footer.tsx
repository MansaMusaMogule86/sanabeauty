import React from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { CurrencySwitcher } from '@/src/components/ui/CurrencySwitcher.tsx';
import { NewsletterSignup } from '@/src/components/forms/NewsletterSignup.tsx';
import { SocialLinks } from '@/src/components/ui/SocialLinks.tsx';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <footer className="bg-[#2D1B1A] text-[#FAF6F0] pt-20 pb-12 border-t border-[#6B2C3E]/50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Top Newsletter & Manifesto Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#FAF6F0]/10">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#D4A574] font-medium">
              Private Atelier Invitation
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF6F0] leading-snug">
              Receive the first whispered updates on seasonal releases and private privileges.
            </h3>
            <p className="text-xs text-[#FAF6F0]/70 font-light leading-relaxed max-w-lg">
              Subscribers receive complimentary bespoke gift wrapping, early allocation access, and curated olfactory dispatches from our creative studio.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <NewsletterSignup
              variant="footer"
              source="footer_atelier_invitation"
              placeholder="Enter your email address..."
              buttonText="Request Entry"
            />
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-16 border-b border-[#FAF6F0]/10 text-xs">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-[0.2em] text-[#FAF6F0] uppercase">
              SANA BEAUTY
            </span>
            <p className="text-xs text-[#FAF6F0]/70 font-serif italic max-w-sm leading-relaxed">
              The Velvet Lollipop Experience. A four-part sanctuary of tactile luxury, warm skin, and evocative fragrance.
            </p>
            <div className="pt-2 text-[11px] text-[#D4A574] space-y-1">
              <p>Parisian Inspiration · Formulated with Precision</p>
              <p>Cruelty-Free · Clean Formulation Principles</p>
            </div>
            
            <div className="pt-3 space-y-2">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4A574] font-medium block">
                Atelier Dispatches & Social
              </span>
              <SocialLinks variant="minimal" theme="dark" />
            </div>
          </div>

          {/* Collection */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#D4A574] font-semibold">
              The Ritual
            </h4>
            <ul className="space-y-2 text-[#FAF6F0]/80">
              <li>
                <button onClick={() => navigate('/products/le-bon-bon-de-bain')} className="hover:text-[#D4A574] transition-colors">
                  01. Le Bon Bon de Bain
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/products/velvet-elixir')} className="hover:text-[#D4A574] transition-colors">
                  02. Velvet Elixir
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/products/velvet-body-lotion')} className="hover:text-[#D4A574] transition-colors">
                  03. Velvet Body Lotion
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/products/velvet-body-spray')} className="hover:text-[#D4A574] transition-colors">
                  04. Velvet Body Spray
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/gift-collection')} className="text-[#C9A961] hover:underline font-medium">
                  The Signature Gift Box
                </button>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#D4A574] font-semibold">
              Discovery
            </h4>
            <ul className="space-y-2 text-[#FAF6F0]/80">
              <li>
                <button onClick={() => navigate('/shop')} className="hover:text-[#D4A574] transition-colors">
                  Shop All
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/collections/velvet-lollipop')} className="hover:text-[#D4A574] transition-colors">
                  Velvet Lollipop Suite
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/find-your-ritual')} className="hover:text-[#D4A574] transition-colors">
                  Ritual Finder
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/our-story')} className="hover:text-[#D4A574] transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/journal')} className="hover:text-[#D4A574] transition-colors">
                  The Sana Edit
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/wishlist')} className="hover:text-[#D4A574] transition-colors">
                  Saved Sanctuary (Wishlist)
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Client Care */}
          <div className="space-y-3">
            <h4 className="text-[11px] tracking-[0.25em] uppercase text-[#D4A574] font-semibold">
              Concierge
            </h4>
            <ul className="space-y-2 text-[#FAF6F0]/80">
              <li>
                <button onClick={() => navigate('/contact')} className="hover:text-[#D4A574] transition-colors">
                  Concierge Care
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shipping')} className="hover:text-[#D4A574] transition-colors">
                  White Glove Shipping
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/returns')} className="hover:text-[#D4A574] transition-colors">
                  Complimentary Returns
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/faq')} className="hover:text-[#D4A574] transition-colors">
                  Client Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/account')} className="hover:text-[#D4A574] transition-colors">
                  VIP Client Lounge
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF6F0]/60">
          <div className="flex flex-wrap items-center gap-6">
            <span>© 2026 SANA BEAUTY. All rights reserved.</span>
            <button onClick={() => navigate('/privacy')} className="hover:text-[#FAF6F0] transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => navigate('/terms')} className="hover:text-[#FAF6F0] transition-colors">
              Terms & Conditions
            </button>
            <CurrencySwitcher variant="footer" />
          </div>

          <div className="flex items-center gap-2 text-[#D4A574]">
            <span className="font-serif italic text-xs">The Art of Velvet.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
