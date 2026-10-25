import React, { useState } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart, PlacedOrder } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { X, CheckCircle, ShieldCheck, Gift, Truck, ArrowLeft } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { navigate } = useRouter();
  const { formatPrice } = useCurrency();
  const {
    items,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    grandTotal,
    giftWrapping,
    giftMessage,
    appliedPromo,
    isCheckoutOpen,
    setIsCheckoutOpen,
    completeDemoCheckout,
  } = useCart();

  const [fullName, setFullName] = useState('Kizzy Alaoui');
  const [email, setEmail] = useState('kizzy.alaoui@gmail.com');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Beverly Hills');
  const [state, setState] = useState('CA');
  const [postalCode, setPostalCode] = useState('90210');
  const [country] = useState('United States');

  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !address || !city) return;

    const order = completeDemoCheckout({
      fullName,
      address,
      city,
      state,
      postalCode,
      country,
    });
    setConfirmedOrder(order);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-[#2D1B1A]/75 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative bg-[#FAF6F0] text-[#2D1B1A] max-w-2xl w-full border border-[#E8D5C4] shadow-2xl z-10 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#2D1B1A] text-[#FAF6F0] px-6 py-4 flex items-center justify-between border-b border-[#6B2C3E]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold tracking-[0.2em] uppercase text-[#E8D5C4]">
              SANA BEAUTY
            </span>
            <span className="text-xs text-[#D4A574]">· Concierge Checkout</span>
          </div>

          <button
            onClick={handleClose}
            className="p-1 text-[#FAF6F0]/70 hover:text-[#FAF6F0] transition-colors cursor-pointer"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {confirmedOrder ? (
          /* Confirmation Receipt State */
          <div className="p-8 sm:p-10 space-y-6 text-center animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-[#6B2C3E] text-[#C9A961] mx-auto flex items-center justify-center shadow-lg">
              <CheckCircle className="w-9 h-9 stroke-[1.75]" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#6B2C3E] font-semibold">
                Order Confirmed
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2D1B1A]">
                Thank you for your acquisition.
              </h3>
              <p className="text-sm font-mono text-[#6B2C3E] font-bold">
                Order Reference: {confirmedOrder.orderNumber}
              </p>
              <p className="text-xs text-[#2D1B1A]/70 max-w-md mx-auto leading-relaxed">
                Your Velvet Lollipop ritual is being prepared by our white-glove packaging atelier. A confirmation notice has been sent to your email.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-6 text-left space-y-4 max-w-lg mx-auto text-xs">
              <div className="flex justify-between border-b border-[#E8D5C4]/60 pb-3 font-semibold text-[#6B2C3E]">
                <span>Delivering To:</span>
                <span className="text-[#2D1B1A] font-normal">{confirmedOrder.shippingAddress.fullName}</span>
              </div>
              <div className="text-[#2D1B1A]/80 space-y-0.5">
                <p>{confirmedOrder.shippingAddress.address}</p>
                <p>
                  {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} {confirmedOrder.shippingAddress.postalCode}
                </p>
              </div>

              {confirmedOrder.giftWrapping && (
                <div className="pt-2 border-t border-[#E8D5C4]/60 flex items-start gap-2 text-[#6B2C3E]">
                  <Gift className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block">Bespoke Velvet Ribbon & Card:</span>
                    <span className="italic text-[#2D1B1A]/70">"{confirmedOrder.giftMessage}"</span>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-[#E8D5C4]/60 space-y-1 text-[#2D1B1A]/70">
                <div className="flex justify-between">
                  <span>Items:</span>
                  <span className="tabular-nums font-medium text-[#2D1B1A]">{formatPrice(confirmedOrder.subtotal, true)}</span>
                </div>
                {confirmedOrder.discount > 0 && (
                  <div className="flex justify-between text-[#6B2C3E]">
                    <span>VIP Code Discount:</span>
                    <span className="tabular-nums font-medium">-{formatPrice(confirmedOrder.discount, true)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-[#2D1B1A] pt-1 border-t border-[#E8D5C4]/40">
                  <span>Total Paid:</span>
                  <span className="tabular-nums text-[#6B2C3E]">{formatPrice(confirmedOrder.total, true)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  handleClose();
                  navigate('/account');
                }}
                className="w-full sm:w-auto bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-8 py-3.5 text-xs tracking-widest uppercase font-semibold transition-colors cursor-pointer"
              >
                View in VIP Lounge
              </button>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto bg-transparent border border-[#2D1B1A]/30 text-[#2D1B1A] px-8 py-3.5 text-xs tracking-widest uppercase font-medium hover:bg-[#FAF6F0] transition-colors cursor-pointer"
              >
                Return to Boutique
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            {/* Transparency Note */}
            <div className="bg-[#FFFFFF] border-l-2 border-[#C9A961] p-3.5 text-xs text-[#2D1B1A]/80 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#C9A961] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#6B2C3E] block">
                  Demonstration Flagship Mode:
                </span>
                <span>
                  Live commerce payments (Stripe/Shopify) can be bound to production merchant credentials. This concierge checkout creates a verified test order with realistic tracking.
                </span>
              </div>
            </div>

            {/* Customer & Delivery Form */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#6B2C3E] border-b border-[#E8D5C4] pb-2">
                1. Delivery & Recipient Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#2D1B1A]/70 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-[#FFFFFF] border border-[#E8D5C4] px-3.5 py-2.5 focus:outline-hidden focus:border-[#6B2C3E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#2D1B1A]/70 mb-1">
                    Email for Shipment Notifications
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#FFFFFF] border border-[#E8D5C4] px-3.5 py-2.5 focus:outline-hidden focus:border-[#6B2C3E]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] uppercase tracking-wider text-[#2D1B1A]/70 mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full bg-[#FFFFFF] border border-[#E8D5C4] px-3.5 py-2.5 focus:outline-hidden focus:border-[#6B2C3E]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#2D1B1A]/70 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className="w-full bg-[#FFFFFF] border border-[#E8D5C4] px-3.5 py-2.5 focus:outline-hidden focus:border-[#6B2C3E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#2D1B1A]/70 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                      className="w-full bg-[#FFFFFF] border border-[#E8D5C4] px-3 py-2.5 focus:outline-hidden focus:border-[#6B2C3E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#2D1B1A]/70 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                      className="w-full bg-[#FFFFFF] border border-[#E8D5C4] px-3 py-2.5 focus:outline-hidden focus:border-[#6B2C3E]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Courier Selection */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest font-semibold text-[#6B2C3E] border-b border-[#E8D5C4] pb-2">
                2. Courier Service
              </h4>
              <div className="p-3 bg-[#FFFFFF] border border-[#E8D5C4] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-[#6B2C3E]" />
                  <div>
                    <span className="font-semibold block">SANA Signature White-Glove Courier</span>
                    <span className="text-[#2D1B1A]/60">Insured express delivery with temperature-controlled transit (2–3 Days)</span>
                  </div>
                </div>
                <span className="font-bold tabular-nums">
                  {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee, true)}
                </span>
              </div>
            </div>

            {/* Order Totals Summary */}
            <div className="bg-[#FFFFFF] border border-[#E8D5C4] p-4 text-xs space-y-2">
              <div className="flex justify-between text-[#2D1B1A]/70">
                <span>Items Subtotal ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span className="tabular-nums font-medium text-[#2D1B1A]">{formatPrice(subtotal, true)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#6B2C3E]">
                  <span>Applied Promo ({appliedPromo})</span>
                  <span className="tabular-nums font-medium">-{formatPrice(discountAmount, true)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#2D1B1A]/70">
                <span>Shipping</span>
                <span className="tabular-nums font-medium text-[#2D1B1A]">
                  {shippingFee === 0 ? 'Complimentary' : formatPrice(shippingFee, true)}
                </span>
              </div>
              <div className="flex justify-between text-[#2D1B1A]/70">
                <span>Estimated Tax</span>
                <span className="tabular-nums font-medium text-[#2D1B1A]">{formatPrice(taxAmount, true)}</span>
              </div>
              <div className="pt-2 border-t border-[#E8D5C4] flex justify-between font-bold text-sm text-[#2D1B1A]">
                <span>Total Due</span>
                <span className="tabular-nums text-base text-[#6B2C3E]">{formatPrice(grandTotal, true)}</span>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleClose}
                className="text-xs text-[#2D1B1A]/70 hover:text-[#6B2C3E] flex items-center gap-1 cursor-pointer order-2 sm:order-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Bag</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-8 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-colors cursor-pointer shadow-md order-1 sm:order-2"
              >
                Place Concierge Acquisition · {formatPrice(grandTotal, true)}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
