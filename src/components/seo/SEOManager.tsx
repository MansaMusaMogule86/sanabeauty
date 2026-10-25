import React, { useEffect } from 'react';
import { useRouter } from '@/src/context/RouterContext.tsx';
import { updateSEO, SEOProps } from '@/src/hooks/useSEO.ts';
import { getProductBySlug } from '@/src/data/products.ts';
import { getArticleBySlug } from '@/src/data/journal.ts';

export const SEOManager: React.FC = () => {
  const { currentPath } = useRouter();

  useEffect(() => {
    const path = currentPath.split('?')[0].replace(/\/+$/, '') || '/';
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const canonicalUrl = `${baseUrl}${path}`;

    let seoData: SEOProps = {
      title: 'SANA BEAUTY | The Velvet Lollipop Experience',
      description:
        'Ultra luxury beauty and body care digital flagship. Discover the Velvet Lollipop ritual, crafted with sensual textures, warm fragrance notes, and bespoke packaging.',
      ogType: 'website',
      canonicalUrl,
    };

    // Route-specific SEO matching
    if (path === '/') {
      seoData = {
        title: 'SANA BEAUTY | The Velvet Lollipop Experience',
        description:
          'A luxury body care ritual wrapped in softness, warmth and indulgence. Experience Le Bon Bon de Bain, Velvet Elixir, silken lotions, and sensual fragrance mists.',
        ogType: 'website',
        canonicalUrl,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'OnlineStore',
          name: 'SANA BEAUTY',
          description:
            'Ultra luxury beauty and body care digital flagship. The Velvet Lollipop collection and rituals.',
          url: canonicalUrl,
          brand: {
            '@type': 'Brand',
            name: 'SANA BEAUTY',
            slogan: 'The Art of Velvet',
          },
          priceRange: '$$$',
        },
      };
    } else if (path === '/shop') {
      seoData = {
        title: 'Boutique & Collection | SANA BEAUTY',
        description:
          'Shop the complete SANA BEAUTY body care suite. Explore artisanal body scrubs, multi-sensory dry body oils, hydrating lotions, and fine fragrance mists.',
        ogType: 'website',
        canonicalUrl,
      };
    } else if (path === '/collections/velvet-lollipop') {
      seoData = {
        title: 'The Velvet Lollipop Collection | SANA BEAUTY',
        description:
          'Discover the four-piece Velvet Lollipop ritual. Sensual formulations inspired by Parisian confectionery and warm amber light.',
        ogType: 'website',
        canonicalUrl,
      };
    } else if (path.startsWith('/products/')) {
      const slug = path.replace('/products/', '');
      const product = getProductBySlug(slug);

      if (product) {
        seoData = {
          title: `${product.name} – ${product.subtitle} | SANA BEAUTY`,
          description: `${product.description} Size: ${product.size}. Notes: ${product.sensoryNotes.join(', ')}.`,
          ogType: 'product',
          canonicalUrl,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            brand: {
              '@type': 'Brand',
              name: 'SANA BEAUTY',
            },
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'USD',
              availability: product.isAvailable
                ? 'https://schema.org/InStock'
                : 'https://schema.org/PreOrder',
              url: canonicalUrl,
            },
          },
        };
      }
    } else if (path === '/the-ritual') {
      seoData = {
        title: 'The 4-Step Velvet Ritual Masterclass | SANA BEAUTY',
        description:
          'Step-by-step masterclass on unhurried body care: Exfoliate, Nourish, Soften, and Finish with fine fragrance layering on warm skin.',
        ogType: 'article',
        canonicalUrl,
      };
    } else if (path === '/find-your-ritual') {
      seoData = {
        title: 'Find Your Velvet Moment | Interactive Ritual Concierge | SANA BEAUTY',
        description:
          'Consult with our lifestyle ritual finder. Answer 3 intuitive questions to receive your tailored body care sequence and scent pairing.',
        ogType: 'website',
        canonicalUrl,
      };
    } else if (path === '/our-story') {
      seoData = {
        title: 'Our Story & The Art of Velvet | SANA BEAUTY',
        description:
          'Discover the philosophy of SANA BEAUTY. How tactile velvet textures, precious marula and camellia oils, and Parisian confectionery inspired a modern sanctuary.',
        ogType: 'website',
        canonicalUrl,
      };
    } else if (path === '/journal') {
      seoData = {
        title: 'The Sana Edit | Beauty Magazine, Rituals & Design',
        description:
          'Editorial dispatches from SANA BEAUTY. Thoughtful essays on taking your time, packaging as an emotional prelude, and fragrance chemistry.',
        ogType: 'website',
        canonicalUrl,
      };
    } else if (path.startsWith('/journal/')) {
      const slug = path.replace('/journal/', '');
      const article = getArticleBySlug(slug);

      if (article) {
        seoData = {
          title: `${article.title} | The Sana Edit`,
          description: article.excerpt,
          ogType: 'article',
          canonicalUrl,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.excerpt,
            author: {
              '@type': 'Person',
              name: article.author.name,
              jobTitle: article.author.role,
            },
            publisher: {
              '@type': 'Organization',
              name: 'SANA BEAUTY',
            },
            mainEntityOfPage: canonicalUrl,
          },
        };
      }
    } else if (path === '/gift-collection') {
      seoData = {
        title: 'The Velvet Reveal & Signature Gift Box | SANA BEAUTY',
        description:
          'Experience The Velvet Reveal. Discover the handcrafted rigid burgundy gift box tied with plush velvet ribbon and four coordinated body care creations.',
        ogType: 'product',
        canonicalUrl,
      };
    } else if (path === '/cart') {
      seoData = {
        title: 'Shopping Bag | SANA BEAUTY',
        description:
          'Review your reserved SANA BEAUTY selections. Complimentary white-glove shipping on orders above $75 and bespoke ribbon gift wrapping.',
        ogType: 'website',
        canonicalUrl,
      };
    } else if (path === '/wishlist') {
      seoData = {
        title: 'Saved Sanctuary & Wishlist | SANA BEAUTY',
        description:
          'View your curated suite of preserved Velvet Lollipop formulations, body care rituals, and signature gift creations.',
        ogType: 'website',
        canonicalUrl,
      };
    } else if (path === '/account') {
      seoData = {
        title: 'VIP Client Lounge & Saved Rituals | SANA BEAUTY',
        description:
          'Private allocation lounge for SANA BEAUTY members. Access saved ritual consultations, order histories, and early-access privileges.',
        ogType: 'website',
        canonicalUrl,
      };
    } else if (path === '/contact') {
      seoData = {
        title: 'Concierge Desk & Client Care | SANA BEAUTY',
        description:
          'Connect with the SANA BEAUTY Concierge for personalized ritual recommendations, bespoke gift orders, and private allocations.',
        ogType: 'website',
        canonicalUrl,
      };
    } else if (path === '/faq') {
      seoData = {
        title: 'Client Inquiries & FAQ | SANA BEAUTY',
        description:
          'Answers to frequently asked questions regarding the Velvet Lollipop ritual, skin compatibility, fragrance notes, and packaging.',
        ogType: 'website',
        canonicalUrl,
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is the order of application for the Velvet Lollipop ritual?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: '01. Exfoliate with Le Bon Bon de Bain; 02. Nourish with Velvet Elixir; 03. Soften with Velvet Body Lotion; 04. Finish with Velvet Body Spray.',
              },
            },
            {
              '@type': 'Question',
              name: 'Are SANA BEAUTY products cruelty-free?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, all SANA BEAUTY formulations are 100% cruelty-free and paraben-free.',
              },
            },
          ],
        },
      };
    } else if (path === '/shipping') {
      seoData = {
        title: 'White Glove Courier Shipping | SANA BEAUTY',
        description:
          'Details regarding our insured, climate-controlled courier shipping services. Complimentary delivery on orders over $75.',
        ogType: 'website',
        canonicalUrl,
      };
    } else if (path === '/returns') {
      seoData = {
        title: 'Complimentary Returns & Guarantee | SANA BEAUTY',
        description:
          'Our unhurried 30-day client return guarantee. Return unopened items with our prepaid courier label for full reimbursement.',
        ogType: 'website',
        canonicalUrl,
      };
    } else if (path === '/privacy') {
      seoData = {
        title: 'Privacy Policy & Confidentiality | SANA BEAUTY',
        description:
          'Learn how SANA BEAUTY protects client privacy, enforces strict confidentiality, and secures transactions.',
        ogType: 'website',
        canonicalUrl,
      };
    } else if (path === '/terms') {
      seoData = {
        title: 'Terms & Conditions of Sale | SANA BEAUTY',
        description:
          'Terms of service, intellectual property notices, and conditions of acquisition for SANA BEAUTY.',
        ogType: 'website',
        canonicalUrl,
      };
    }

    // Apply updates
    updateSEO(seoData);
  }, [currentPath]);

  return null;
};
