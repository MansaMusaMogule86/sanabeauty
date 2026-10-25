import { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  ogType?: 'website' | 'article' | 'product';
  canonicalUrl?: string;
  jsonLd?: Record<string, any>;
}

const BRAND_NAME = 'SANA BEAUTY';
const DEFAULT_TITLE = 'SANA BEAUTY | The Velvet Lollipop Experience';
const DEFAULT_DESCRIPTION =
  'Ultra luxury beauty and body care digital flagship. Discover the Velvet Lollipop ritual, crafted with sensual textures, warm fragrance notes, and bespoke packaging.';

/**
 * Updates DOM head elements with page-specific SEO metadata
 */
export function updateSEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  ogType = 'website',
  canonicalUrl,
  jsonLd,
}: SEOProps) {
  if (typeof document === 'undefined') return;

  // 1. Update Title
  const formattedTitle = title.includes(BRAND_NAME) ? title : `${title} | ${BRAND_NAME}`;
  document.title = formattedTitle;

  // 2. Helper to set or create meta tag
  const setMetaTag = (attributeName: 'name' | 'property', attributeValue: string, content: string) => {
    let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attributeName, attributeValue);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // 3. Standard Meta Description
  setMetaTag('name', 'description', description);

  // 4. OpenGraph Metadata
  setMetaTag('property', 'og:title', formattedTitle);
  setMetaTag('property', 'og:description', description);
  setMetaTag('property', 'og:type', ogType);
  setMetaTag('property', 'og:site_name', BRAND_NAME);

  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
  if (currentUrl) {
    setMetaTag('property', 'og:url', currentUrl);
  }

  // 5. Twitter Card Metadata
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', formattedTitle);
  setMetaTag('name', 'twitter:description', description);

  // 6. Canonical Link Tag
  if (currentUrl) {
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', currentUrl);
  }

  // 7. Schema.org JSON-LD Structured Data
  let jsonLdScript = document.getElementById('sana-seo-jsonld') as HTMLScriptElement | null;
  if (jsonLd) {
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'sana-seo-jsonld';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }
    jsonLdScript.textContent = JSON.stringify(jsonLd);
  } else if (jsonLdScript) {
    // Default Organization & Store Schema
    jsonLdScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BeautySalon',
      name: 'SANA BEAUTY',
      url: currentUrl,
      description: DEFAULT_DESCRIPTION,
      brand: {
        '@type': 'Brand',
        name: 'SANA BEAUTY',
      },
      priceRange: '$$$',
    });
  }
}

/**
 * React hook to dynamically update page titles and meta descriptions
 */
export function useSEO(props: SEOProps) {
  useEffect(() => {
    updateSEO(props);
  }, [props.title, props.description, props.ogType, props.canonicalUrl, JSON.stringify(props.jsonLd)]);
}
