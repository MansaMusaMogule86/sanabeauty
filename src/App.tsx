/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from '@/src/context/RouterContext.tsx';
import { CurrencyProvider } from '@/src/context/CurrencyContext.tsx';
import { WishlistProvider } from '@/src/context/WishlistContext.tsx';
import { CartProvider } from '@/src/context/CartContext.tsx';
import { Header } from '@/src/components/navigation/Header.tsx';
import { Footer } from '@/src/components/navigation/Footer.tsx';
import { CartDrawer } from '@/src/components/commerce/CartDrawer.tsx';
import { QuickViewModal } from '@/src/components/commerce/QuickViewModal.tsx';
import { SearchModal } from '@/src/components/commerce/SearchModal.tsx';
import { CheckoutModal } from '@/src/components/commerce/CheckoutModal.tsx';
import { SEOManager } from '@/src/components/seo/SEOManager.tsx';
import { PageTransition } from '@/src/components/motion/PageTransition.tsx';

// Pages
import { HomePage } from '@/src/pages/HomePage.tsx';
import { ShopPage } from '@/src/pages/ShopPage.tsx';
import { CollectionPage } from '@/src/pages/CollectionPage.tsx';
import { ProductDetailPage } from '@/src/pages/ProductDetailPage.tsx';
import { TheRitualPage } from '@/src/pages/TheRitualPage.tsx';
import { RitualFinderPage } from '@/src/pages/RitualFinderPage.tsx';
import { OurStoryPage } from '@/src/pages/OurStoryPage.tsx';
import { JournalPage } from '@/src/pages/JournalPage.tsx';
import { ArticleDetailPage } from '@/src/pages/ArticleDetailPage.tsx';
import { GiftCollectionPage } from '@/src/pages/GiftCollectionPage.tsx';
import { CartPage } from '@/src/pages/CartPage.tsx';
import { WishlistPage } from '@/src/pages/WishlistPage.tsx';
import { AccountPage } from '@/src/pages/AccountPage.tsx';
import { ContactPage } from '@/src/pages/ContactPage.tsx';
import { PolicyPages } from '@/src/pages/PolicyPages.tsx';

const AppContent: React.FC = () => {
  const { currentPath, navigate } = useRouter();

  const renderCurrentRoute = () => {
    // Normalization
    const path = currentPath.split('?')[0].replace(/\/+$/, '') || '/';

    // 1. Homepage
    if (path === '/') {
      return <HomePage />;
    }

    // 2. Shop
    if (path === '/shop') {
      return <ShopPage />;
    }

    // 3. Velvet Lollipop Collection
    if (path === '/collections/velvet-lollipop') {
      return <CollectionPage />;
    }

    // 4. Product Details
    if (path.startsWith('/products/')) {
      const slug = path.replace('/products/', '');
      return <ProductDetailPage slug={slug} />;
    }

    // 5. The Ritual
    if (path === '/the-ritual') {
      return <TheRitualPage />;
    }

    // 6. Ritual Finder
    if (path === '/find-your-ritual') {
      return <RitualFinderPage />;
    }

    // 7. Our Story
    if (path === '/our-story') {
      return <OurStoryPage />;
    }

    // 8. The Sana Edit (Journal)
    if (path === '/journal') {
      return <JournalPage />;
    }

    // 9. Journal Article
    if (path.startsWith('/journal/')) {
      const slug = path.replace('/journal/', '');
      return <ArticleDetailPage slug={slug} />;
    }

    // 10. Gift Collection / Velvet Reveal
    if (path === '/gift-collection') {
      return <GiftCollectionPage />;
    }

    // 11. Cart
    if (path === '/cart') {
      return <CartPage />;
    }

    // 12. Wishlist / Personal Sanctuary
    if (path === '/wishlist') {
      return <WishlistPage />;
    }

    // 13. Account
    if (path === '/account') {
      return <AccountPage />;
    }

    // 13. Contact
    if (path === '/contact') {
      return <ContactPage />;
    }

    // 14. Policy & FAQ Pages
    if (path === '/faq') return <PolicyPages type="faq" />;
    if (path === '/shipping') return <PolicyPages type="shipping" />;
    if (path === '/returns') return <PolicyPages type="returns" />;
    if (path === '/privacy') return <PolicyPages type="privacy" />;
    if (path === '/terms') return <PolicyPages type="terms" />;

    // 404 Luxury Fallback
    return (
      <main className="py-32 bg-[#FAF6F0] text-center px-6">
        <div className="max-w-md mx-auto space-y-6">
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#6B2C3E] font-semibold">
            Page Not Located
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#2D1B1A]">
            AN UNCHARTED SANCTUARY
          </h1>
          <p className="text-xs sm:text-sm text-[#2D1B1A]/70 leading-relaxed font-light">
            The page you seek may have shifted location. Allow us to escort you back to the collection boutique.
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="bg-[#6B2C3E] hover:bg-[#85344B] text-[#FAF6F0] px-8 py-3.5 text-xs tracking-widest uppercase font-semibold transition-colors cursor-pointer"
          >
            Return to Boutique
          </button>
        </div>
      </main>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#2D1B1A]">
      {/* Dynamic SEO Meta & Title Manager */}
      <SEOManager />

      {/* Top Navigation */}
      <Header />

      {/* Main Routed Content with Elegant Motion Page Transitions */}
      <PageTransition routeKey={currentPath.split('?')[0].replace(/\/+$/, '') || '/'}>
        {renderCurrentRoute()}
      </PageTransition>

      {/* Global Overlays & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <CheckoutModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <CurrencyProvider>
        <WishlistProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </WishlistProvider>
      </CurrencyProvider>
    </RouterProvider>
  );
}
