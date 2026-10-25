import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Conversion rate relative to 1 USD
  decimalPlaces: number;
  symbolPosition: 'prefix' | 'suffix';
  flag: string;
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    rate: 1.0,
    decimalPlaces: 0,
    symbolPosition: 'prefix',
    flag: 'US',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    rate: 0.92,
    decimalPlaces: 0,
    symbolPosition: 'prefix',
    flag: 'EU',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    rate: 0.79,
    decimalPlaces: 0,
    symbolPosition: 'prefix',
    flag: 'GB',
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    name: 'UAE Dirham',
    rate: 3.67,
    decimalPlaces: 0,
    symbolPosition: 'suffix',
    flag: 'AE',
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    rate: 1.36,
    decimalPlaces: 0,
    symbolPosition: 'prefix',
    flag: 'CA',
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    rate: 152.0,
    decimalPlaces: 0,
    symbolPosition: 'prefix',
    flag: 'JP',
  },
};

interface CurrencyContextType {
  currency: CurrencyConfig;
  setCurrencyCode: (code: string) => void;
  availableCurrencies: CurrencyConfig[];
  convertPrice: (amountInUSD: number) => number;
  formatPrice: (amountInUSD: number, showDecimalsIfAny?: boolean) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCode, setCurrentCode] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sana_currency');
        if (saved && CURRENCIES[saved]) {
          return saved;
        }
      } catch {
        // fallback
      }
    }
    return 'USD';
  });

  const currency = useMemo(() => CURRENCIES[currentCode] || CURRENCIES.USD, [currentCode]);

  const setCurrencyCode = (code: string) => {
    if (CURRENCIES[code]) {
      setCurrentCode(code);
      try {
        localStorage.setItem('sana_currency', code);
      } catch {
        // ignore
      }
    }
  };

  const convertPrice = (amountInUSD: number): number => {
    return Math.round(amountInUSD * currency.rate * 100) / 100;
  };

  const formatPrice = (amountInUSD: number, showDecimalsIfAny = false): string => {
    const converted = amountInUSD * currency.rate;

    let formattedNum: string;
    if (currency.decimalPlaces === 0 && !showDecimalsIfAny) {
      formattedNum = Math.round(converted).toLocaleString('en-US');
    } else {
      formattedNum = converted.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    if (currency.symbolPosition === 'suffix') {
      return `${formattedNum} ${currency.symbol}`;
    }
    return `${currency.symbol}${formattedNum}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrencyCode,
        availableCurrencies: Object.values(CURRENCIES),
        convertPrice,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
