import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Product, PRODUCTS } from '@/src/data/products.ts';

const WISHLIST_STORAGE_KEY = 'sana_wishlist';

export interface WishlistContextType {
  wishlistIds: string[];
  wishlistProducts: Product[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => boolean;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  totalWishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse wishlist from localStorage:', e);
    }
    return [];
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Failed to persist wishlist to localStorage:', e);
    }
  }, [wishlistIds]);

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlistIds.includes(productId);
    },
    [wishlistIds]
  );

  const addToWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const toggleWishlist = useCallback((productId: string): boolean => {
    let added = false;
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        added = false;
        return prev.filter((id) => id !== productId);
      } else {
        added = true;
        return [...prev, productId];
      }
    });
    return added;
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
  }, []);

  // Compute product objects in wishlist order
  const wishlistProducts = useMemo(() => {
    const map = new Map(PRODUCTS.map((p) => [p.id, p]));
    return wishlistIds
      .map((id) => map.get(id))
      .filter((p): p is Product => Boolean(p));
  }, [wishlistIds]);

  const totalWishlistCount = wishlistIds.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        isInWishlist,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        totalWishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
