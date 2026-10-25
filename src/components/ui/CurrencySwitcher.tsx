import React, { useState, useRef, useEffect } from 'react';
import { useCurrency, CurrencyConfig } from '@/src/context/CurrencyContext.tsx';
import { ChevronDown, Check, Globe } from 'lucide-react';

interface CurrencySwitcherProps {
  variant?: 'header' | 'footer' | 'mobile';
  className?: string;
}

export const CurrencySwitcher: React.FC<CurrencySwitcherProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { currency, setCurrencyCode, availableCurrencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Handle keyboard escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (curr: CurrencyConfig) => {
    setCurrencyCode(curr.code);
    setIsOpen(false);
  };

  if (variant === 'mobile') {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase font-semibold text-[#6B2C3E]">
          <Globe className="w-3.5 h-3.5" />
          <span>Regional Currency</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {availableCurrencies.map((c) => {
            const isSelected = c.code === currency.code;
            return (
              <button
                key={c.code}
                onClick={() => setCurrencyCode(c.code)}
                className={`py-2 px-2.5 text-xs font-medium border text-center transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#6B2C3E] text-[#FAF6F0] border-[#6B2C3E] font-semibold'
                    : 'bg-[#FFFFFF] text-[#2D1B1A]/80 border-[#E8D5C4] hover:border-[#6B2C3E]'
                }`}
              >
                <span className="block text-[11px] font-mono">{c.code}</span>
                <span className="text-[10px] opacity-75">{c.symbol}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  const isFooter = variant === 'footer';

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select Currency"
        className={`flex items-center gap-1.5 py-1 px-2 transition-colors cursor-pointer text-xs font-medium focus-visible:outline-hidden ${
          isFooter
            ? 'text-[#FAF6F0]/80 hover:text-[#FAF6F0] border border-[#FAF6F0]/20 bg-[#1F1212]'
            : 'text-[#2D1B1A]/80 hover:text-[#6B2C3E] border border-[#E8D5C4]/60 bg-[#FAF6F0]/80 hover:bg-[#FAF6F0]'
        }`}
      >
        <span className="text-[11px] font-mono tracking-wider">{currency.code}</span>
        <span className="text-[11px] opacity-80">({currency.symbol})</span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 opacity-60 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Luxury Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute z-50 mt-1.5 w-48 shadow-xl border overflow-hidden animate-in fade-in zoom-in-95 duration-150 ${
            isFooter
              ? 'bottom-full mb-2 right-0 bg-[#2D1B1A] border-[#6B2C3E] text-[#FAF6F0]'
              : 'right-0 bg-[#FAF6F0] border-[#E8D5C4] text-[#2D1B1A]'
          }`}
        >
          <div className="py-1 divide-y divide-[#E8D5C4]/30">
            {availableCurrencies.map((c) => {
              const isSelected = c.code === currency.code;
              return (
                <button
                  key={c.code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(c)}
                  className={`w-full px-3.5 py-2.5 text-xs text-left flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? isFooter
                        ? 'bg-[#6B2C3E] text-[#FAF6F0] font-semibold'
                        : 'bg-[#6B2C3E] text-[#FAF6F0] font-semibold'
                      : isFooter
                      ? 'hover:bg-[#3F1722] text-[#FAF6F0]/80'
                      : 'hover:bg-[#FFFFFF] text-[#2D1B1A]/80 hover:text-[#6B2C3E]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-semibold w-8">{c.code}</span>
                    <span className="text-[11px] truncate max-w-[90px]">{c.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono font-medium opacity-80">{c.symbol}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#C9A961]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
