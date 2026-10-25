export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  publishDate: string;
  excerpt: string;
  author: {
    name: string;
    role: string;
  };
  assetId: string;
  contentParagraphs: {
    heading?: string;
    body: string;
  }[];
  pullQuote: string;
  relatedProductSlug?: string;
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'article_1',
    slug: 'the-art-of-a-body-care-ritual',
    title: 'The Art of a Body Care Ritual: Slowing Down in a Rapid World',
    subtitle: 'Why the space between cleansing and resting is where true luxury begins.',
    category: 'Rituals & Philosophy',
    readTime: '4 min read',
    publishDate: 'Autumn 2026',
    excerpt: 'In an era where haste is often mistaken for efficiency, dedicating twenty unhurried minutes to your skin transforms personal maintenance into a quiet sacred communion.',
    author: {
      name: 'Elena Vance',
      role: 'Creative Director & Founder, SANA BEAUTY',
    },
    assetId: 'editorial_ritual_evening',
    pullQuote: 'A ritual is not something you rush to finish; it is a sanctuary you create with your own hands.',
    relatedProductSlug: 'velvet-elixir',
    contentParagraphs: [
      {
        heading: 'The Geometry of Stillness',
        body: 'Too often, modern body care is reduced to functional hygiene—a rushed shower, a cold pump of moisturizer, and an immediate sprint into tomorrow’s obligations. At SANA BEAUTY, we believe the body remembers gentleness. When warm water meets finely crystallized sugar in Le Bon Bon de Bain, the physical friction isn’t merely mechanical; it is the conscious shedding of the day’s burdens.',
      },
      {
        heading: 'The Sensation of Layering',
        body: 'The architecture of our Velvet Lollipop ritual is deliberate. Exfoliating with botanical sugar pearls creates an receptive foundation. Then, pressing Velvet Elixir onto still-steaming skin locks water molecules into the upper lipid mantle. Finally, sealing that luminosity with Velvet Body Lotion creates a cushion of long-lasting comfort that feels like slipping into tailor-made velvet.',
      },
      {
        heading: 'Sensory Memory and Sillage',
        body: 'Fragrance applied to cold, dry skin dissipates into the ether. But fragrance misted over warm, oiled limbs binds with the body’s natural warmth. The notes of spun sugar, rich peach amber, and warm cashmeran evolve uniquely on each person, creating an intimate aura that stays close to you throughout the evening.',
      },
    ],
  },
  {
    id: 'article_2',
    slug: 'why-packaging-is-part-of-the-experience',
    title: 'Why Packaging Is Part of the Experience: The Tactile Philosophy of Velvet',
    subtitle: 'Before a formula ever touches your skin, your eyes and fingertips have already begun the conversation.',
    category: 'Design & Craft',
    readTime: '5 min read',
    publishDate: 'Autumn 2026',
    excerpt: 'Luxury is not accidental. The weighted heft of frosted glass, the crisp snap of a magnetic box, and the soft resistance of velvet ribbon are emotional preludes to the formulas within.',
    author: {
      name: 'Marc St. Laurent',
      role: 'Head of Industrial Design',
    },
    assetId: 'editorial_packaging_craft',
    pullQuote: 'Packaging should make you pause, breathe, and anticipate the experience before a single drop is released.',
    relatedProductSlug: 'velvet-lollipop-signature-box',
    contentParagraphs: [
      {
        heading: 'The Weight of Deliberation',
        body: 'When you pick up a flacon of Velvet Elixir, the cold density of custom amber glass immediately registers in the palm. There are no flimsy plastics or disposable caps. Every edge is sculpted to rest with balance and assurance on bathroom travertine or bedside marble.',
      },
      {
        heading: 'The Unboxing Prelude',
        body: 'Our signature rigid presentation box was engineered over twelve iterations. We tested the tension of the woven velvet ribbon so that untying it produces an audible, satisfying glide. Inside, custom-molded peach velvet cavities receive each product like bespoke jewelry, honoring the investment you have made in yourself.',
      },
      {
        heading: 'Sustainability Through Longevity',
        body: 'True luxury designs products that are cherished, not discarded. Our heavy glass vessels and rigid keepsake boxes are crafted to remain on your vanity as timeless decorative objects long after your final mist has diffused.',
      },
    ],
  },
  {
    id: 'article_3',
    slug: 'the-beauty-of-taking-your-time',
    title: 'The Beauty of Taking Your Time: Creating an Evening Sanctuary',
    subtitle: 'How intentional evening rituals quiet the mind and prepare the senses for restorative sleep.',
    category: 'Sensory Wellness',
    readTime: '3 min read',
    publishDate: 'Autumn 2026',
    excerpt: 'Dusk is the transition between the world outside and your inner world. Here is how to construct an evening cadence that signals deep restorative surrender.',
    author: {
      name: 'Claire Beauchamp',
      role: 'Editorial Contributor',
    },
    assetId: 'hero_campaign',
    pullQuote: 'When you treat your skin with reverence, you remind yourself that you are worthy of peace.',
    relatedProductSlug: 'le-bon-bon-de-bain',
    contentParagraphs: [
      {
        heading: 'Dimming the External World',
        body: 'Begin by lower the ambient lighting half an hour before your bath. Warm candle flame softens the harsh edges of the day and stimulates melatonin release. The warm steam of a bath prepares your pores while Le Bon Bon de Bain envelops the room in warm vanilla and spun sugar aromatics.',
      },
      {
        heading: 'The Rhythmic Touch',
        body: 'Apply Velvet Elixir not with hasty swipes, but with deliberate, sweeping motions from ankles upward toward the heart. This light lymphatic encouragement eases tension from legs that carried you all day, while the golden oil melts effortlessly into the skin.',
      },
    ],
  },
  {
    id: 'article_4',
    slug: 'layering-fragrance-on-warm-skin',
    title: 'Layering Fragrance on Warm Skin: The Symphony of Mist and Elixir',
    subtitle: 'The Parisian secret to an intimate scent sillage that whispers rather than shouts.',
    category: 'Fragrance & Scent',
    readTime: '4 min read',
    publishDate: 'Autumn 2026',
    excerpt: 'Discover why traditional single-spritz application fails, and how scent layering creates a warm, cocooning cloud that lasts from dusk to dawn.',
    author: {
      name: 'Jean-Luc Moreau',
      role: 'Master Perfumer & Olfactory Consultant',
    },
    assetId: 'fragrance_marshmallow',
    pullQuote: 'The most captivating fragrances are not projected at a room; they are discovered when someone leans in close.',
    relatedProductSlug: 'velvet-body-spray',
    contentParagraphs: [
      {
        heading: 'The Molecular Anchor',
        body: 'Alcohol-based perfume molecules require a lipid base to bond properly with skin chemistry. Misting fragrance onto bare, dry skin causes top notes to flash off rapidly. By first conditioning the epidermis with Velvet Elixir’s golden botanical oils, the fragrance molecules become enveloped in the oil’s lipid matrix, slowing down evaporation by over 300%.',
      },
      {
        heading: 'The Velvet Lollipop Note Profile',
        body: 'The Velvet Lollipop olfactory signature is built upon three complementary accords: a playful gourmet overture of marshmallow and spun sugar, an incandescent heart of ripe peach amber, and an intoxicating dry-down of cashmeran and warm vanilla bourbon.',
      },
    ],
  },
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}
