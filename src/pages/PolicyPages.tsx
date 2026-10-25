import React from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { Sparkles, ShieldCheck, Truck, RefreshCw, HelpCircle, FileText } from 'lucide-react';

interface PolicyPageProps {
  type: 'faq' | 'shipping' | 'returns' | 'privacy' | 'terms';
}

export const PolicyPages: React.FC<PolicyPageProps> = ({ type }) => {
  const { navigate } = useRouter();

  switch (type) {
    case 'faq':
      return (
        <main className="py-16 sm:py-24 bg-[#FAF6F0] text-[#2D1B1A]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-12">
            <div className="text-center space-y-3">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
                Client Questions
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2D1B1A]">
                FREQUENTLY ASKED INQUIRIES
              </h1>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E8D5C4] divide-y divide-[#E8D5C4] shadow-xs">
              {[
                {
                  q: 'What is the order of application for the Velvet Lollipop ritual?',
                  a: 'We recommend our four-part sequence: 01. Polish skin with Le Bon Bon de Bain in warm steam; 02. Press Velvet Elixir into damp skin post-bath; 03. Cushion limbs with Velvet Body Lotion; 04. Diffuse Velvet Body Spray over hair and pulse points for an intimate fragrance halo.',
                },
                {
                  q: 'Are SANA BEAUTY formulations suitable for sensitive skin?',
                  a: 'Yes. Our formulations are dermatologist-evaluated and free from parabens, phthalates, synthetic dyes, and harsh mineral oils. We rely on biocompatible lipids such as organic marula, sweet almond, and botanical ceramides.',
                },
                {
                  q: 'What fragrance notes define the Velvet Lollipop olfactory signature?',
                  a: 'The signature chord opens with spun sugar and pink marshmallow, transitions into a heart of sun-warmed peach amber and coconut milk, and dries down into warm bourbon vanilla and cashmere musk.',
                },
                {
                  q: 'What makes the Signature Presentation Box unique?',
                  a: 'Our presentation box is crafted from 1200gsm rigid paperboard finished in deep velvet burgundy with hot-stamped gold foil. It features custom-molded peach velvet protective cavities and is hand-tied with plush double-faced velvet ribbon.',
                },
                {
                  q: 'Can I include a personalized gift inscription?',
                  a: 'Yes. Complimentary handwritten calligraphy gift notes are provided with every order upon request at checkout.',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-6 sm:p-8 space-y-2">
                  <h3 className="font-serif text-lg font-semibold text-[#6B2C3E]">
                    {item.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#2D1B1A]/80 font-light leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      );

    case 'shipping':
      return (
        <main className="py-16 sm:py-24 bg-[#FAF6F0] text-[#2D1B1A]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-10">
            <div className="text-center space-y-3">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
                Delivery Services
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2D1B1A]">
                CONCIERGE SHIPPING
              </h1>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-8 sm:p-12 space-y-6 text-sm text-[#2D1B1A]/80 leading-relaxed shadow-xs">
              <div className="flex items-center gap-3 text-[#6B2C3E] font-serif text-lg font-semibold border-b border-[#E8D5C4] pb-4">
                <Truck className="w-5 h-5" />
                <span>Complimentary Delivery On Orders Above $75</span>
              </div>
              <p>
                All SANA BEAUTY creations are dispatched via insured white-glove courier services from our climate-controlled fulfillment ateliers in Paris and California.
              </p>
              <h4 className="font-serif text-base font-semibold text-[#2D1B1A] pt-2">
                Standard Transit Timelines:
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li>Domestic Express Courier: 2–3 business days (Complimentary over $75; otherwise $12).</li>
                <li>International White-Glove Transit: 4–6 business days with door-to-door temperature tracking.</li>
                <li>Signature gift packaging is standard with every shipment.</li>
              </ul>
            </div>
          </div>
        </main>
      );

    case 'returns':
      return (
        <main className="py-16 sm:py-24 bg-[#FAF6F0] text-[#2D1B1A]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-10">
            <div className="text-center space-y-3">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
                Client Satisfaction Guarantee
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2D1B1A]">
                COMPLIMENTARY RETURNS
              </h1>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-8 sm:p-12 space-y-6 text-sm text-[#2D1B1A]/80 leading-relaxed shadow-xs">
              <div className="flex items-center gap-3 text-[#6B2C3E] font-serif text-lg font-semibold border-b border-[#E8D5C4] pb-4">
                <RefreshCw className="w-5 h-5" />
                <span>30-Day Unhurried Return Policy</span>
              </div>
              <p>
                We wish for every SANA BEAUTY encounter to be pure pleasure. If a product does not fulfill your aesthetic or sensorial expectations, unopened creations in their original packaging may be returned within 30 days of delivery.
              </p>
              <p className="text-xs text-[#2D1B1A]/70">
                To initiate a return, contact our Concierge Desk at <strong className="text-[#6B2C3E]">concierge@sanabeauty.luxury</strong>. A prepaid courier return label and instructions will be provided immediately.
              </p>
            </div>
          </div>
        </main>
      );

    case 'privacy':
      return (
        <main className="py-16 sm:py-24 bg-[#FAF6F0] text-[#2D1B1A]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-10">
            <div className="text-center space-y-3">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
                Legal & Governance
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2D1B1A]">
                PRIVACY DISCLOSURE
              </h1>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-8 sm:p-12 space-y-6 text-xs text-[#2D1B1A]/80 leading-relaxed shadow-xs">
              <div className="flex items-center gap-3 text-[#6B2C3E] font-serif text-lg font-semibold border-b border-[#E8D5C4] pb-4">
                <ShieldCheck className="w-5 h-5" />
                <span>Confidentiality & Data Dignity</span>
              </div>
              <p>
                SANA BEAUTY holds client confidentiality in the highest regard. Personal details provided during consultation, waitlist enrolment, or checkout are strictly utilized to fulfill your orders and provide requested atelier dispatches.
              </p>
              <p>
                We do not sell, rent, or trade your personal information to third-party data aggregators. All digital transactions are processed through encrypted 256-bit SSL protocols.
              </p>
            </div>
          </div>
        </main>
      );

    case 'terms':
    default:
      return (
        <main className="py-16 sm:py-24 bg-[#FAF6F0] text-[#2D1B1A]">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 space-y-10">
            <div className="text-center space-y-3">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
                Legal Notice
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2D1B1A]">
                TERMS & CONDITIONS
              </h1>
            </div>

            <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-8 sm:p-12 space-y-6 text-xs text-[#2D1B1A]/80 leading-relaxed shadow-xs">
              <div className="flex items-center gap-3 text-[#6B2C3E] font-serif text-lg font-semibold border-b border-[#E8D5C4] pb-4">
                <FileText className="w-5 h-5" />
                <span>SANA BEAUTY Flagship Conditions of Use</span>
              </div>
              <p>
                By navigating and utilizing the SANA BEAUTY digital flagship, you acknowledge adherence to our conditions of sale, intellectual property rights, and community standards.
              </p>
              <p>
                All brand trademarks, imagery, typographic compositions, and formulation trade names—including "The Velvet Lollipop Experience" and "The Velvet Reveal"—are protected intellectual property of SANA BEAUTY.
              </p>
            </div>
          </div>
        </main>
      );
  }
};
