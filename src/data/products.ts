export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  stepNumber?: string;
  stepLabel?: string;
  price: number;
  size: string;
  description: string;
  longDescription: string;
  sensoryNotes: string[];
  ritualInstruction: string;
  packagingDetails: string[];
  ingredientsSummary: string;
  keyBenefits: string[];
  assetId: string;
  isAvailable: boolean;
  isHero?: boolean;
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod_scrub',
    slug: 'le-bon-bon-de-bain',
    name: 'Le Bon Bon de Bain',
    subtitle: 'Sensorial Exfoliating Body Soufflé',
    category: 'Body Scrub',
    stepNumber: '01',
    stepLabel: 'EXFOLIATE',
    price: 48,
    size: '200 ml / 6.7 fl. oz.',
    description: 'An indulgent, whipped sugar polish that melts effortlessly onto warm skin, sweeping away dullness to reveal a supple, luminous canvas.',
    longDescription:
      'Le Bon Bon de Bain is the sensorial opening overture to the Velvet Lollipop ritual. Whipped into an airy, cloud-like soufflé with ultra-fine crystalline sugar pearls and nourishing botanical lipids, this luxurious scrub dissolves delicately under warm water without stripping natural moisture. It leaves the skin impeccably soft, smoothed, and prepped to absorb the deeper nourishing layers of the ritual.',
    sensoryNotes: ['Sweet Spun Sugar', 'Warm Marshmallow', 'Blush Peach Amber', 'Vanilla Blossom'],
    ritualInstruction:
      'In the shower or bath, massage a generous scoop onto damp skin using circular, upward strokes. Focus on shoulders, elbows, and knees. Rinse with warm water to release the warm, sweet aromatics.',
    packagingDetails: [
      'Heavy-base frosted glass jar with tactile satin finish',
      'Velvet Burgundy screw lid with gold foil crest',
      'Includes custom bespoke gold-toned cosmetic scoop',
      'Recyclable luxury glass packaging',
    ],
    ingredientsSummary:
      'Ultra-fine sucrose crystals, Sweet Almond Oil, Squalane, Shea Butter, Vitamin E, Fragrance (Parfum), Jojoba Seed Oil.',
    keyBenefits: [
      'Gently polishes away rough, dull texture',
      'Leaves skin cushioned in soft botanical moisture',
      'Prepares skin for deep oil absorption',
      'Envelopes the bath in comforting marshmallow aromatics',
    ],
    assetId: 'product_scrub',
    isAvailable: true,
    badge: 'Step 01 Ritual',
  },
  {
    id: 'prod_oil',
    slug: 'velvet-elixir',
    name: 'Velvet Elixir',
    subtitle: 'Multi-Sensory Nourishing Body Oil',
    category: 'Body Oil',
    stepNumber: '02',
    stepLabel: 'NOURISH',
    price: 62,
    size: '100 ml / 3.4 fl. oz.',
    description: 'A luminous, dry-touch botanical nectar that imbues the skin with a warm satin gleam and an irresistible, lingering aura of softness.',
    longDescription:
      'The crown jewel of the SANA BEAUTY collection, as celebrated in our campaign. Velvet Elixir is an opulent multi-sensory dry oil formulated with precious golden botanical oils that sink into warm skin in seconds. It seals in moisture without any greasy residue, bestowing an ethereal, candle-lit radiance that catches natural light while releasing waves of warm amber and whipped vanilla sweetness.',
    sensoryNotes: ['Peach Amber Resin', 'Warm Cashmeran', 'Bourbon Vanilla Bean', 'Golden Honey Blossom'],
    ritualInstruction:
      'Immediately following your bath or shower, dispense 4–6 precious drops directly into palms. Press gently onto still-damp skin, sweeping over collarbones, arms, and legs until fully absorbed.',
    packagingDetails: [
      'Architectural amber glass flacon with UV protection',
      'Precision glass pipette dropper with champagne gold collar',
      'Embossed hot-stamped gold foil label',
      'Presented in a rigid burgundy sleeve',
    ],
    ingredientsSummary:
      'Camellia Seed Oil, Organic Marula Oil, Golden Jojoba Oil, Caprylic/Capric Triglyceride, Vitamin E Tocopherol, Fragrance (Parfum).',
    keyBenefits: [
      'Instant satin sheen without residue',
      'Locks in deep cellular hydration',
      'Enhances natural skin luminosity',
      'Signature campaign centerpiece',
    ],
    assetId: 'product_oil',
    isAvailable: true,
    isHero: true,
    badge: 'Campaign Icon',
  },
  {
    id: 'prod_lotion',
    slug: 'velvet-body-lotion',
    name: 'Velvet Body Lotion',
    subtitle: 'Silken Hydrating Body Veil',
    category: 'Body Lotion',
    stepNumber: '03',
    stepLabel: 'SOFTEN',
    price: 52,
    size: '250 ml / 8.5 fl. oz.',
    description: 'A sumptuous, velvety emulsion that envelops limbs in comforting, cushion-soft hydration and delicate all-day moisture.',
    longDescription:
      'Velvet Body Lotion is crafted to deliver the tactile sensation of cashmere and silk draped over the body. Infused with biomimetic ceramides and delicate peach amber nectar, this silken emulsion melts instantly on contact. It smooths, calms, and cushions the skin with an ultra-comfortable barrier that keeps limbs touchably soft throughout the day.',
    sensoryNotes: ['Velvet Nectar', 'Whipped Coconut Milk', 'Blush Peony', 'Soft Musks'],
    ritualInstruction:
      'Smooth generously over the entire body as Step 03 of your ritual, layering seamlessly over Velvet Elixir to lock in lasting velvety softness.',
    packagingDetails: [
      'Soft-touch matte peach-cream bottle with weighted base',
      'Custom champagne gold precision pump mechanism',
      'Minimalist burgundy debossed typography',
      'Airless hygiene design preserves botanical vitality',
    ],
    ingredientsSummary:
      'Aqua (Purified Water), Glycerin, Shea Butter Ethyl Esters, Ceramides NP, Peach Fruit Extract, Squalane, Glyceryl Stearate, Fragrance (Parfum).',
    keyBenefits: [
      'All-day touchable velvet softness',
      'Strengthens the skin moisture barrier',
      'Featherweight absorption with zero stickiness',
      'Amplifies the Velvet Lollipop fragrance sillage',
    ],
    assetId: 'product_lotion',
    isAvailable: true,
    badge: 'Step 03 Ritual',
  },
  {
    id: 'prod_spray',
    slug: 'velvet-body-spray',
    name: 'Velvet Body Spray',
    subtitle: 'Sensual Fine Fragrance Mist',
    category: 'Body Spray',
    stepNumber: '04',
    stepLabel: 'FINISH',
    price: 46,
    size: '150 ml / 5.1 fl. oz.',
    description: 'An ethereal fragrance veil that crowns your ritual, diffusing an irresistible cloud of warm amber, soft marshmallow, and delicate vanilla.',
    longDescription:
      'The final whisper and signature flourish. Velvet Body Spray delivers a micro-fine, weightless mist that lingers gently in hair, on pulse points, and over clothed shoulders. Inspired by the warmth of luxury Parisian fragrance ateliers, it leaves an unforgettable impression—sweet yet sophisticated, soft yet quietly magnetic.',
    sensoryNotes: ['Gourmand Marshmallow', 'Solar Amber', 'Pink Sugar Crystals', 'Cashmere Musk'],
    ritualInstruction:
      'Spritz generously from 8 inches away over pulse points, hair, and décolletage. Reapply throughout the day whenever a touch of velvet indulgence is desired.',
    packagingDetails: [
      'Slender, statuesque glass flacon with frosted clarity',
      'Champagne gold ultra-fine micro-mist actuator',
      'Velvet Burgundy tactile cap with gold interior',
      'Travel-safe leak-resistant closure',
    ],
    ingredientsSummary:
      'Alcohol Denat., Aqua (Water), Fragrance (Parfum), Benzyl Salicylate, Coumarin, Limonene, Linalool, Tocopheryl Acetate.',
    keyBenefits: [
      'Ultra-fine, cloud-like mist dispersion',
      'Non-drying, hair and clothing friendly',
      'Long-lasting personal scent bubble',
      'Effortless luxury on-the-go refresh',
    ],
    assetId: 'product_spray',
    isAvailable: true,
    badge: 'Step 04 Ritual',
  },
  {
    id: 'prod_gift_set',
    slug: 'velvet-lollipop-signature-box',
    name: 'The Velvet Lollipop Gift Set',
    subtitle: 'The Complete 4-Step Body Care Ritual & Presentation Keepsake',
    category: 'Gift Collection',
    price: 185,
    size: 'Complete 4-Piece Suite',
    description: 'The ultimate presentation of SANA BEAUTY. All four full-size Velvet Lollipop body care treasures housed in our bespoke burgundy rigid presentation box tied with plush velvet ribbon.',
    longDescription:
      'The definitive expression of luxury body care. Housed in a rigid, handcrafted keepsake presentation box in deep Velvet Burgundy (#6B2C3E), adorned with hot-stamped champagne gold foil and hand-tied with plush double-faced velvet ribbon. Upon unveiling, the soft peach velvet interior reveals all four full-size treasures—Le Bon Bon de Bain, Velvet Elixir, Velvet Body Lotion, and Velvet Body Spray—arranged in custom-molded perfection. A gift designed to be impossible to forget.',
    sensoryNotes: ['The Complete Velvet Scent Symphony', 'Marshmallow, Peach Amber & Vanilla Cashmere'],
    ritualInstruction:
      'Unveil the presentation box to embark on the complete four-step ritual: Polish with Le Bon Bon de Bain, nourish with Velvet Elixir, hydrate with Velvet Body Lotion, and crown with Velvet Body Spray.',
    packagingDetails: [
      'Rigid luxury presentation box in deep Velvet Burgundy with magnetic closure',
      'Plush double-faced velvet ribbon in rich burgundy',
      'Champagne gold foil hot-stamped insignia',
      'Custom molded peach velvet protective tray',
      'Includes personalized SANA BEAUTY calligraphy gift card',
    ],
    ingredientsSummary:
      'Contains full-sized editions of all four formulations: Le Bon Bon de Bain (200ml), Velvet Elixir (100ml), Velvet Body Lotion (250ml), and Velvet Body Spray (150ml).',
    keyBenefits: [
      'All 4 full-sized ritual products included ($208 value)',
      'Handcrafted keepsake velvet presentation box',
      'Complimentary personalized gift calligraphy service',
      'Complimentary insured signature white-glove shipping',
    ],
    assetId: 'packaging_gift_box_open',
    isAvailable: true,
    badge: 'Prestige Gift Set',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
