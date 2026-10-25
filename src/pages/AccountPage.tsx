import React from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { Sparkles, Package, User, BookmarkCheck, ArrowRight } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { navigate } = useRouter();
  const { formatPrice } = useCurrency();
  const { lastPlacedOrder } = useCart();

  // Retrieve saved ritual if any from localStorage
  let savedRitual: { title: string; date: string; products: string[] } | null = null;
  try {
    const raw = localStorage.getItem('sana_saved_ritual');
    if (raw) savedRitual = JSON.parse(raw);
  } catch {
    // ignore
  }

  return (
    <main className="py-16 sm:py-24 bg-[#FAF6F0] text-[#2D1B1A]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#E8D5C4] pb-8">
          <div className="space-y-1">
            <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
              Client Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#2D1B1A]">
              THE VIP LOUNGE
            </h1>
            <p className="text-xs text-[#2D1B1A]/70">
              Welcome, <strong className="font-semibold text-[#6B2C3E]">Kizzy Alaoui</strong> · Private Launch Tier 1 Member
            </p>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E8D5C4] px-5 py-3 text-xs flex items-center gap-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-[#C9A961]" />
            <div>
              <span className="font-semibold text-[#6B2C3E] block">Allocation Priority</span>
              <span className="text-[11px] text-[#2D1B1A]/70">Guaranteed Velvet Presentation Box Access</span>
            </div>
          </div>
        </div>

        {/* Saved Ritual Spotlight */}
        <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E8D5C4]/60 pb-4">
            <div className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-[#6B2C3E]" />
              <h3 className="font-serif text-lg font-semibold text-[#2D1B1A]">
                Your Prescribed Velvet Ritual
              </h3>
            </div>
            <button
              onClick={() => navigate('/find-your-ritual')}
              className="text-xs text-[#6B2C3E] hover:underline font-medium"
            >
              Re-take Consultation →
            </button>
          </div>

          {savedRitual ? (
            <div className="space-y-3 text-xs">
              <h4 className="font-serif text-base font-semibold text-[#6B2C3E]">
                {savedRitual.title}
              </h4>
              <p className="text-[#2D1B1A]/70">
                Prescribed on {new Date(savedRitual.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {savedRitual.products.map((pName, i) => (
                  <span
                    key={i}
                    className="bg-[#FAF6F0] border border-[#E8D5C4] px-3 py-1 text-[11px] text-[#2D1B1A]"
                  >
                    {pName}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-4 text-xs text-[#2D1B1A]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span>You haven't completed the Find Your Velvet Moment consultation yet.</span>
              <button
                onClick={() => navigate('/find-your-ritual')}
                className="bg-[#6B2C3E] text-[#FAF6F0] px-5 py-2 text-[11px] tracking-wider uppercase font-semibold transition-colors cursor-pointer"
              >
                Find Your Ritual
              </button>
            </div>
          )}
        </div>

        {/* Order History */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-[#6B2C3E]" />
            <h3 className="font-serif text-xl font-semibold text-[#2D1B1A]">
              Acquisition & Order History
            </h3>
          </div>

          <div className="bg-[#FFFFFF] border border-[#E8D5C4] divide-y divide-[#E8D5C4]">
            {lastPlacedOrder ? (
              <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-mono font-bold text-sm text-[#6B2C3E]">
                      {lastPlacedOrder.orderNumber}
                    </span>
                    <span className="mx-2 text-[#2D1B1A]/40">·</span>
                    <span className="text-[#2D1B1A]/70">{lastPlacedOrder.date}</span>
                  </div>
                  <span className="bg-[#FAF6F0] text-[#6B2C3E] border border-[#D4A574]/40 px-3 py-1 font-medium text-[11px] self-start sm:self-auto">
                    Preparing In Packaging Atelier
                  </span>
                </div>

                <div className="space-y-1 text-xs text-[#2D1B1A]/80">
                  {lastPlacedOrder.items.map((it) => (
                    <div key={it.product.id} className="flex justify-between">
                      <span>{it.quantity}× {it.product.name}</span>
                      <span className="tabular-nums font-semibold">{formatPrice(it.product.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#E8D5C4]/60 flex items-center justify-between text-xs font-semibold">
                  <span>Total Paid</span>
                  <span className="tabular-nums text-sm text-[#6B2C3E]">{formatPrice(lastPlacedOrder.total, true)}</span>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-mono font-bold text-sm text-[#6B2C3E]">
                      #SB-48192 (VIP Allocation Reserve)
                    </span>
                    <span className="mx-2 text-[#2D1B1A]/40">·</span>
                    <span className="text-[#2D1B1A]/70">October 2026</span>
                  </div>
                  <span className="bg-[#FAF6F0] text-[#6B2C3E] border border-[#D4A574]/40 px-3 py-1 font-medium text-[11px] self-start sm:self-auto">
                    VIP Reservation Confirmed
                  </span>
                </div>
                <p className="text-xs text-[#2D1B1A]/70">
                  1× The Velvet Lollipop Signature Presentation Box ({formatPrice(185)}) with bespoke calligraphy gift card.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Concierge Care Touchpoint */}
        <div className="bg-[#2D1B1A] text-[#FAF6F0] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-lg font-semibold text-[#FAF6F0]">
              Dedicated VIP Concierge Desk
            </h4>
            <p className="text-xs text-[#E8D5C4]/80 font-light">
              Inquire regarding bespoke gift inscriptions, private event allocations, or formulation consultations.
            </p>
          </div>
          <button
            onClick={() => navigate('/contact')}
            className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-6 py-3 text-xs tracking-wider uppercase font-semibold transition-colors cursor-pointer shrink-0"
          >
            Contact Concierge
          </button>
        </div>
      </div>
    </main>
  );
};
