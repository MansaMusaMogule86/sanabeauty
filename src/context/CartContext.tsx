import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '@/src/data/products.ts';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PlacedOrder {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  giftWrapping: boolean;
  giftMessage?: string;
}

interface CartContextType {
  items: CartItem[];
  totalQuantity: number;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  grandTotal: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  giftWrapping: boolean;
  setGiftWrapping: (wrap: boolean) => void;
  giftMessage: string;
  setGiftMessage: (msg: string) => void;
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  lastPlacedOrder: PlacedOrder | null;
  completeDemoCheckout: (customerInfo: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }) => PlacedOrder;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 75;
const STANDARD_SHIPPING_FEE = 12;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sana_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Hydrate products with latest catalog
        return parsed.map((item: { productId: string; quantity: number }) => {
          const product = PRODUCTS.find((p) => p.id === item.productId);
          return product ? { product, quantity: item.quantity } : null;
        }).filter(Boolean);
      }
    } catch {
      // fallback
    }
    // Default initial luxury item in bag for exquisite first impression
    const defaultProduct = PRODUCTS.find((p) => p.slug === 'velvet-elixir');
    return defaultProduct ? [{ product: defaultProduct, quantity: 1 }] : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [giftWrapping, setGiftWrapping] = useState(true);
  const [giftMessage, setGiftMessage] = useState('With warmth and velvet softness.');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('VELVET10');
  const [lastPlacedOrder, setLastPlacedOrder] = useState<PlacedOrder | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      const serializable = items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));
      localStorage.setItem('sana_cart', JSON.stringify(serializable));
    } catch {
      // ignore
    }
  }, [items]);

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Promo discount logic
  let discountAmount = 0;
  if (appliedPromo === 'VELVET10') {
    discountAmount = Math.round(subtotal * 0.1 * 100) / 100;
  } else if (appliedPromo === 'SANALUXE') {
    discountAmount = Math.min(25, subtotal);
  }

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const taxAmount = Math.round((subtotal - discountAmount) * 0.08 * 100) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee + taxAmount);

  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VELVET10') {
      setAppliedPromo('VELVET10');
      return { success: true, message: 'VIP Launch Offer Applied: 10% Off' };
    }
    if (clean === 'SANALUXE') {
      setAppliedPromo('SANALUXE');
      return { success: true, message: 'Private Atelier Code Applied: $25 Privilege' };
    }
    return { success: false, message: 'Invalid or expired concierge promotion code.' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const completeDemoCheckout = (customerInfo: {
    fullName: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }) => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `SB-${randomSuffix}`;
    const newOrder: PlacedOrder = {
      orderNumber,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
      items: [...items],
      subtotal,
      discount: discountAmount,
      shipping: shippingFee,
      tax: taxAmount,
      total: grandTotal,
      shippingAddress: customerInfo,
      giftWrapping,
      giftMessage: giftWrapping ? giftMessage : undefined,
    };

    setLastPlacedOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        grandTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        giftWrapping,
        setGiftWrapping,
        giftMessage,
        setGiftMessage,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        lastPlacedOrder,
        completeDemoCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
