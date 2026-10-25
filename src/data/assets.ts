/**
 * SANA BEAUTY - Centralized Asset Registry
 *
 * This registry acts as the single source of truth for all brand imagery,
 * campaign photographs, product stills, packaging shots, and textures.
 *
 * All approved assets can be replaced here without touching any component code.
 * If external images are provided, set imageSrc to the local or hosted URL.
 * When imageSrc is null, the system automatically renders high-fidelity
 * vector/SVG luxury mockups with exact brand colorways.
 */

export interface BrandAsset {
  id: string;
  name: string;
  category: 'campaign' | 'product' | 'packaging' | 'editorial' | 'texture';
  alt: string;
  imageSrc: string | null;
  aspectRatio: '16:9' | '4:3' | '1:1' | '3:4';
  description: string;
  isApprovedCampaignAsset?: boolean;
}

export const ASSET_REGISTRY: Record<string, BrandAsset> = {
  // Official Campaign Hero
  hero_campaign: {
    id: 'hero_campaign',
    name: 'Approved SANA BEAUTY Campaign Photograph',
    category: 'campaign',
    alt: 'SANA BEAUTY Campaign: Elegant woman in a rich deep burgundy velvet dress gracefully holding the Velvet Elixir body oil alongside the Velvet Lollipop collection',
    imageSrc: null, // Ready for drop-in replacement when approved photo file is placed in /public/images/campaign/hero.jpg
    aspectRatio: '16:9',
    description: 'Official campaign hero image: Model in burgundy velvet gown, holding Velvet Elixir bottle with the complete SANA collection illuminated in warm amber glow.',
    isApprovedCampaignAsset: true,
  },

  // Products
  product_scrub: {
    id: 'product_scrub',
    name: 'Le Bon Bon de Bain - Body Scrub',
    category: 'product',
    alt: 'Le Bon Bon de Bain exfoliating body scrub in a frosted glass jar with deep burgundy cap and champagne gold lettering',
    imageSrc: null,
    aspectRatio: '4:3',
    description: 'Frosted glass jar with deep velvet burgundy cap, accompanied by a golden cosmetic spoon with whipped sugar scrub texture.',
  },

  product_oil: {
    id: 'product_oil',
    name: 'Velvet Elixir - Body Oil',
    category: 'product',
    alt: 'Velvet Elixir nourishing body oil in an amber glass bottle with precision dropper and champagne gold collar',
    imageSrc: null,
    aspectRatio: '4:3',
    description: 'Luxury amber glass bottle with glass pipette dropper, highlighting golden fluid viscosity and burgundy velvet reflection.',
  },

  product_lotion: {
    id: 'product_lotion',
    name: 'Velvet Body Lotion',
    category: 'product',
    alt: 'Velvet Body Lotion in a soft-touch cream pump bottle with embossed burgundy emblem',
    imageSrc: null,
    aspectRatio: '4:3',
    description: 'Soft-touch matte peach-cream bottle with minimalist gold pump dispenser, conveying deep silken hydration.',
  },

  product_spray: {
    id: 'product_spray',
    name: 'Velvet Body Spray',
    category: 'product',
    alt: 'Velvet Body Spray in a tall slender flacon with champagne gold ultra-fine mist atomizer',
    imageSrc: null,
    aspectRatio: '4:3',
    description: 'Slender architectural flacon with champagne gold mist actuator, capturing delicate fragrance mist.',
  },

  // Packaging & Gift Sets
  packaging_gift_box_closed: {
    id: 'packaging_gift_box_closed',
    name: 'Velvet Lollipop Signature Box - Tied',
    category: 'packaging',
    alt: 'Burgundy rigid presentation gift box tied with plush velvet ribbon and champagne gold foil logo',
    imageSrc: null,
    aspectRatio: '4:3',
    description: 'Rigid presentation keepsake box in deep burgundy #6B2C3E with plush hand-tied velvet ribbon and hot-stamped gold foil.',
  },

  packaging_gift_box_open: {
    id: 'packaging_gift_box_open',
    name: 'Velvet Lollipop Signature Box - The Reveal',
    category: 'packaging',
    alt: 'Open burgundy gift box revealing soft peach interior cushion nestling all four full-size Velvet Lollipop body care products',
    imageSrc: null,
    aspectRatio: '4:3',
    description: 'Interior reveal showing custom molded peach velvet insert holding the Scrub, Elixir, Lotion, and Body Spray in prestige alignment.',
  },

  // Fragrance & Sensory Moodboard
  fragrance_marshmallow: {
    id: 'fragrance_marshmallow',
    name: 'Boujee Marshmallow & Whipped Cream',
    category: 'texture',
    alt: 'Whipped vanilla marshmallow cream texture with soft golden sunlight',
    imageSrc: null,
    aspectRatio: '1:1',
    description: 'Sensory inspiration: Soft marshmallow sweetness, whipped cream cloud, comforting softness.',
  },

  fragrance_amber: {
    id: 'fragrance_amber',
    name: 'Peach Amber & Golden Sunlight',
    category: 'texture',
    alt: 'Warm translucent peach amber resin catching warm afternoon light',
    imageSrc: null,
    aspectRatio: '1:1',
    description: 'Sensory inspiration: Luminous peach amber, warm skin, lingering golden sunset notes.',
  },

  fragrance_velvet_silk: {
    id: 'fragrance_velvet_silk',
    name: 'Burgundy Velvet Drapes',
    category: 'texture',
    alt: 'Folds of heavy deep burgundy velvet textile reflecting soft studio lights',
    imageSrc: null,
    aspectRatio: '1:1',
    description: 'Tactile inspiration: Rich burgundy velvet drape, representing comforting warmth and tactile decadence.',
  },

  // Editorial
  editorial_ritual_evening: {
    id: 'editorial_ritual_evening',
    name: 'The Evening Sanctuary',
    category: 'editorial',
    alt: 'Warm candlelight reflected on travertine stone with body oil drops and soft linen towels',
    imageSrc: null,
    aspectRatio: '3:4',
    description: 'Editorial article visual for evening bath ritual and meditative body care.',
  },

  editorial_packaging_craft: {
    id: 'editorial_packaging_craft',
    name: 'The Tactile Philosophy',
    category: 'editorial',
    alt: 'Close-up of champagne gold foil embossing on burgundy soft-touch paper',
    imageSrc: null,
    aspectRatio: '3:4',
    description: 'Editorial article visual exploring why packaging is an emotional prelude to the ritual.',
  },
};

/**
 * Helper to get asset by ID
 */
export function getAsset(id: string): BrandAsset {
  const asset = ASSET_REGISTRY[id];
  if (!asset) {
    return {
      id,
      name: 'SANA BEAUTY Asset',
      category: 'product',
      alt: 'SANA BEAUTY luxury body care',
      imageSrc: null,
      aspectRatio: '4:3',
      description: 'Pending approved photographic asset',
    };
  }
  return asset;
}
