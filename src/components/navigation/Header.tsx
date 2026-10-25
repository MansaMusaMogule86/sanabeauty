import React, { useState, useEffect } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { useCart } from '@/src/context/CartContext.tsx';
import { useCurrency } from '@/src/context/CurrencyContext.tsx';
import { useWishlist } from '@/src/context/WishlistContext.tsx';
import { CurrencySwitcher } from '@/src/components/ui/CurrencySwitcher.tsx';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { totalQuantity, setIsCartOpen, setIsSearchOpen } = useCart();
  const { totalWishlistCount } = useWishlist();
  const { formatPrice } = useCurrency();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'The Collection', path: '/collections/velvet-lollipop' },
    { label: 'Our Story', path: '/our-story' },
    { label: 'The Ritual', path: '/the-ritual' },
    { label: 'Journal', path: '/journal' },
  ];

  return (
    <>
      {/* Quiet luxury notification ribbon */}
      <div className="bg-[#2D1B1A] text-[#E8D5C4] text-[11px] tracking-[0.2em] uppercase py-2 px-4 text-center border-b border-[#6B2C3E]/40 font-medium">
        <span>Complimentary Concierge Shipping on Orders Above {formatPrice(75)}</span>
        <span className="hidden sm:inline text-[#C9A961] ml-3">· Code: VELVET10 for 10% Off</span>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF6F0]/95 backdrop-blur-md shadow-xs border-b border-[#E8D5C4]/60 py-3.5'
            : 'bg-[#FAF6F0] border-b border-[#E8D5C4]/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single text element in Playfair Display) */}
          <button
            onClick={() => {
              navigate('/');
              setMobileMenuOpen(false);
            }}
            className="group text-left cursor-pointer focus-visible:outline-hidden"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.25em] text-[#6B2C3E] uppercase whitespace-nowrap shrink-0 group-hover:text-[#2D1B1A] transition-colors">
              SANA BEAUTY
            </span>
          </button>

          {/* Zone 2: 4–5 single-line clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs tracking-[0.18em] uppercase font-medium text-[#2D1B1A]/80">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`relative py-1 cursor-pointer transition-colors whitespace-nowrap shrink-0 hover:text-[#6B2C3E] ${
                    isActive ? 'text-[#6B2C3E] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#6B2C3E]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Interactive Affordances (Currency Switcher, Search, VIP Lounge, Shopping Bag) */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0">
            {/* Currency Switcher */}
            <CurrencySwitcher variant="header" />

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-[#2D1B1A] hover:text-[#6B2C3E] transition-colors cursor-pointer"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4 stroke-[1.75]" />
            </button>

            <button
              onClick={() => navigate('/wishlist')}
              className="relative p-1.5 text-[#2D1B1A] hover:text-[#6B2C3E] transition-colors cursor-pointer"
              aria-label={`View Wishlist (${totalWishlistCount} saved)`}
              title="Personal Sanctuary (Wishlist)"
            >
              <Heart className="w-4 h-4 stroke-[1.75]" />
              {totalWishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6B2C3E] text-[#FAF6F0] text-[9px] font-semibold w-3.5 h-3.5 rounded-full flex items-center justify-center tabular-nums">
                  {totalWishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate('/account')}
              className="p-1.5 text-[#2D1B1A] hover:text-[#6B2C3E] transition-colors cursor-pointer"
              aria-label="VIP Account Lounge"
            >
              <User className="w-4 h-4 stroke-[1.75]" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-1.5 text-[#2D1B1A] hover:text-[#6B2C3E] transition-colors cursor-pointer flex items-center gap-1.5"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
              {totalQuantity > 0 && (
                <span className="bg-[#6B2C3E] text-[#FAF6F0] text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#2D1B1A] hover:text-[#6B2C3E] cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[88px] bg-[#FAF6F0] border-b border-[#E8D5C4] px-6 py-8 shadow-xl z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col space-y-5 text-sm tracking-[0.2em] uppercase font-medium text-[#2D1B1A]">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setMobileMenuOpen(false);
                  }}
                  className="text-left py-2 border-b border-[#E8D5C4]/40 hover:text-[#6B2C3E] flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-[#D4A574]">→</span>
                </button>
              ))}
              <button
                onClick={() => {
                  navigate('/find-your-ritual');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E8D5C4]/40 text-[#6B2C3E] font-semibold flex items-center justify-between"
              >
                <span>Find Your Ritual</span>
                <span className="text-[#C9A961]">✦</span>
              </button>
              <button
                onClick={() => {
                  navigate('/gift-collection');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E8D5C4]/40 text-[#6B2C3E] font-semibold flex items-center justify-between"
              >
                <span>The Velvet Reveal (Gift Set)</span>
                <span className="text-[#6B2C3E]">→</span>
              </button>
              <button
                onClick={() => {
                  navigate('/wishlist');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 text-[#2D1B1A] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#6B2C3E]" />
                  <span>Saved Sanctuary (Wishlist)</span>
                </div>
                {totalWishlistCount > 0 && (
                  <span className="bg-[#6B2C3E] text-[#FAF6F0] text-[10px] px-2 py-0.5 rounded-full font-semibold">
                    {totalWishlistCount}
                  </span>
                )}
              </button>
            </nav>
            <div className="mt-6 pt-6 border-t border-[#E8D5C4]/60">
              <CurrencySwitcher variant="mobile" />
            </div>
            <div className="mt-6 pt-6 border-t border-[#E8D5C4] flex items-center justify-between text-xs text-[#2D1B1A]/70">
              <span>SANA BEAUTY Flagship</span>
              <button
                onClick={() => {
                  navigate('/contact');
                  setMobileMenuOpen(false);
                }}
                className="text-[#6B2C3E] underline font-medium"
              >
                Concierge Care
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
