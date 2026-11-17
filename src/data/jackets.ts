export type GenderFilter = 'All' | 'Boys' | 'Girls' | 'Unisex';
export type AgeBracket =
  | 'All Ages'
  | 'Toddlers (2-5Y)'
  | 'Kids (6-10Y)'
  | 'Juniors (11-14Y)'
  | 'Teens & Adults (15Y+)';

export interface SizeOption {
  label: string;
  ageRange: string;
  minAge: number;
  maxAge: number;
  minHeightCm: number;
  maxHeightCm: number;
  chestCm: string;
  lengthCm: string;
  bracket: Exclude<AgeBracket, 'All Ages'>;
}

export interface JacketProduct {
  id: string;
  sku: string;
  name: string;
  category: Exclude<GenderFilter, 'All'>;
  ageSpanLabel: string;
  brackets: Exclude<AgeBracket, 'All Ages'>[];
  price: number;
  colorName: string;
  colorHex: string;
  weatherRating: string;
  crestDetail: string;
  shortTag: string;
  description: string;
  fabricSpecs: string[];
  image: string;
  sizes: SizeOption[];
}

export interface LookbookFeature {
  id: string;
  title: string;
  subtitle: string;
  aspectClass: string;
  image: string;
  linkedJacketId: string;
  actionLabel: string;
}

export const HERO_CAMPAIGN_IMAGE = '/src/assets/images/hero_mk_jackets_v2_1794755419049.jpg';

export const LOOKBOOK_FEATURES: LookbookFeature[] = [
  {
    id: 'lookbook-boys',
    title: 'Boys Dusk Architecture Edit',
    subtitle: 'Emerald Crown Varsity & Obsidian-Gold Moto · Ages 2 to Adult',
    aspectClass: 'aspect-[4/3]',
    image: '/src/assets/images/lookbook_boys_street_v3_1794894859420.jpg',
    linkedJacketId: 'mk-emerald-racing-varsity',
    actionLabel: 'Shop Boys Edit',
  },
  {
    id: 'lookbook-girls',
    title: 'Girls Evening Satin & Trench Edit',
    subtitle: 'Ruby Satin Puffer & Royal Plum Storm Trench · Ages 2 to Adult',
    aspectClass: 'aspect-[4/3]',
    image: '/src/assets/images/lookbook_girls_editorial_v3_1794894859675.jpg',
    linkedJacketId: 'mk-crimson-satin-puffer',
    actionLabel: 'Shop Girls Edit',
  },
  {
    id: 'lookbook-crest-macro',
    title: 'Gold Bullion MK Crest Craft',
    subtitle: 'Hand-finished bullion embroidery & brushed brass MK hardware',
    aspectClass: 'aspect-[4/3]',
    image: '/src/assets/images/crest_closeup_craft_v3_1794894859796.jpg',
    linkedJacketId: 'mk-champagne-velvet-puffer',
    actionLabel: 'Inspect Velvet Puffer',
  },
];

export const ALL_AGE_FIT_MATRIX: {
  bracket: Exclude<AgeBracket, 'All Ages'>;
  sizes: string;
  heightRange: string;
  chestRange: string;
  fitNotes: string;
}[] = [
  {
    bracket: 'Toddlers (2-5Y)',
    sizes: '2T, 3T, 4T, 5Y',
    heightRange: '88 – 112 cm',
    chestRange: '52 – 58 cm',
    fitNotes: 'Easy-grip zipper pulls, plush fleece collars, room for knit layers.',
  },
  {
    bracket: 'Kids (6-10Y)',
    sizes: '6Y, 8Y, 10Y',
    heightRange: '114 – 142 cm',
    chestRange: '60 – 72 cm',
    fitNotes: 'Reinforced elbow panels, articulated sleeves for daily school & play.',
  },
  {
    bracket: 'Juniors (11-14Y)',
    sizes: '12Y, 14Y',
    heightRange: '144 – 164 cm',
    chestRange: '74 – 84 cm',
    fitNotes: 'Tailored athletic shoulder cut with adjustable internal hem drawcords.',
  },
  {
    bracket: 'Teens & Adults (15Y+)',
    sizes: '16Y / XS, S, M, L',
    heightRange: '165 – 188 cm',
    chestRange: '86 – 106 cm',
    fitNotes: 'Modern relaxed silhouette engineered for layering over hoodies or shirts.',
  },
];

export const JACKETS: JacketProduct[] = [
  {
    id: 'mk-emerald-racing-varsity',
    sku: 'MK-RV-01',
    name: 'Emerald Crown Racing Varsity',
    category: 'Boys',
    ageSpanLabel: 'Ages 2 to Adult',
    brackets: ['Toddlers (2-5Y)', 'Kids (6-10Y)', 'Juniors (11-14Y)', 'Teens & Adults (15Y+)'],
    price: 138,
    colorName: 'Emerald, Obsidian & Gold',
    colorHex: '#0F5132',
    weatherRating: 'Wind-Resistant · 4°C to 18°C',
    crestDetail: 'Gold-embroidered MK crown & laurel crest stitched on left chest',
    shortTag: 'Signature Crest',
    description:
      'Rich emerald Melton wool paired with supple jet-black leather sleeves, ivory shoulder stripes, and brushed-metal center zip. Crowned with the gleaming gold MK Racing crest on the chest.',
    fabricSpecs: [
      '440gsm emerald Melton wool body with pebbled leather sleeves',
      'Two-way polished nickel zipper & cream leather welt pockets',
      'Gold bullion-thread MK crown crest embroidered on left chest',
    ],
    image: '/src/assets/images/jacket_boys_racing_v2_1794755419751.jpg',
    sizes: [
      { label: '3T', ageRange: '2–3 Yrs', minAge: 2, maxAge: 3, minHeightCm: 88, maxHeightCm: 100, chestCm: '56 cm', lengthCm: '40 cm', bracket: 'Toddlers (2-5Y)' },
      { label: '5Y', ageRange: '4–5 Yrs', minAge: 4, maxAge: 5, minHeightCm: 101, maxHeightCm: 113, chestCm: '60 cm', lengthCm: '44 cm', bracket: 'Toddlers (2-5Y)' },
      { label: '8Y', ageRange: '7–8 Yrs', minAge: 6, maxAge: 9, minHeightCm: 114, maxHeightCm: 135, chestCm: '68 cm', lengthCm: '50 cm', bracket: 'Kids (6-10Y)' },
      { label: '12Y', ageRange: '11–12 Yrs', minAge: 10, maxAge: 13, minHeightCm: 136, maxHeightCm: 158, chestCm: '78 cm', lengthCm: '57 cm', bracket: 'Juniors (11-14Y)' },
      { label: 'S (16Y+)', ageRange: '15–16 Yrs', minAge: 14, maxAge: 16, minHeightCm: 159, maxHeightCm: 173, chestCm: '92 cm', lengthCm: '64 cm', bracket: 'Teens & Adults (15Y+)' },
      { label: 'M', ageRange: '17+ / Adult', minAge: 17, maxAge: 99, minHeightCm: 174, maxHeightCm: 192, chestCm: '98 cm', lengthCm: '67 cm', bracket: 'Teens & Adults (15Y+)' },
    ],
  },
  {
    id: 'mk-crimson-satin-puffer',
    sku: 'MK-CP-02',
    name: 'Ruby Satin Shearling Puffer',
    category: 'Girls',
    ageSpanLabel: 'Ages 2 to Adult',
    brackets: ['Toddlers (2-5Y)', 'Kids (6-10Y)', 'Juniors (11-14Y)', 'Teens & Adults (15Y+)'],
    price: 148,
    colorName: 'Ruby Crimson & Gold',
    colorHex: '#8B1538',
    weatherRating: 'Thermal Insulation · -10°C to 10°C',
    crestDetail: 'Champagne-gold metallic MK medallion emblem mounted on left chest',
    shortTag: 'Best Seller',
    description:
      'Diamond-quilted ruby satin shell topped with a lush crimson faux-fur collar and gold hardware throughout. Finished with an unmistakable champagne-gold MK medallion on the left chest.',
    fabricSpecs: [
      'Water-repellent luminous ruby satin diamond-quilted shell',
      'Plush tonal faux-fur collar with gold MK zipper pull & cuff bar',
      'Raised champagne-gold MK circular crest on chest',
    ],
    image: '/src/assets/images/jacket_girls_crimson_puffer_v2_1794755420808.jpg',
    sizes: [
      { label: '3T', ageRange: '2–3 Yrs', minAge: 2, maxAge: 4, minHeightCm: 88, maxHeightCm: 105, chestCm: '57 cm', lengthCm: '41 cm', bracket: 'Toddlers (2-5Y)' },
      { label: '6Y', ageRange: '5–6 Yrs', minAge: 5, maxAge: 7, minHeightCm: 106, maxHeightCm: 124, chestCm: '63 cm', lengthCm: '46 cm', bracket: 'Kids (6-10Y)' },
      { label: '10Y', ageRange: '9–10 Yrs', minAge: 8, maxAge: 11, minHeightCm: 125, maxHeightCm: 145, chestCm: '72 cm', lengthCm: '53 cm', bracket: 'Kids (6-10Y)' },
      { label: '14Y', ageRange: '13–14 Yrs', minAge: 12, maxAge: 14, minHeightCm: 146, maxHeightCm: 162, chestCm: '84 cm', lengthCm: '60 cm', bracket: 'Juniors (11-14Y)' },
      { label: 'S (16Y+)', ageRange: '15–16 Yrs', minAge: 15, maxAge: 16, minHeightCm: 163, maxHeightCm: 173, chestCm: '90 cm', lengthCm: '63 cm', bracket: 'Teens & Adults (15Y+)' },
      { label: 'M', ageRange: '17+ / Adult', minAge: 17, maxAge: 99, minHeightCm: 174, maxHeightCm: 192, chestCm: '96 cm', lengthCm: '66 cm', bracket: 'Teens & Adults (15Y+)' },
    ],
  },
  {
    id: 'mk-champagne-velvet-puffer',
    sku: 'MK-CV-03',
    name: 'Champagne Velvet Crown Puffer',
    category: 'Girls',
    ageSpanLabel: 'Ages 2 to Adult',
    brackets: ['Toddlers (2-5Y)', 'Kids (6-10Y)', 'Juniors (11-14Y)', 'Teens & Adults (15Y+)'],
    price: 156,
    colorName: 'Champagne Gold Velvet',
    colorHex: '#C5A059',
    weatherRating: 'Plush Thermal · -8°C to 12°C',
    crestDetail: 'Sculpted gold crown & laurel MK crest with engraved MK zipper pull',
    shortTag: 'New Arrival',
    description:
      'Luminous crushed-velvet quilted puffer lined in silk-touch ivory satin. Finished with a sculpted gold MK crown medallion on the chest and custom MK-stamped hardware.',
    fabricSpecs: [
      'Plush crushed champagne velvet outer with satin collar lining',
      'Custom MK-engraved brushed gold main & pocket zipper pulls',
      '3D gold bullion & metallic MK crown crest on left chest',
    ],
    image: '/src/assets/images/jacket_girls_champagne_velvet_v3_1794894857186.jpg',
    sizes: [
      { label: '4T', ageRange: '3–4 Yrs', minAge: 2, maxAge: 4, minHeightCm: 88, maxHeightCm: 108, chestCm: '58 cm', lengthCm: '42 cm', bracket: 'Toddlers (2-5Y)' },
      { label: '8Y', ageRange: '7–8 Yrs', minAge: 5, maxAge: 9, minHeightCm: 109, maxHeightCm: 136, chestCm: '68 cm', lengthCm: '49 cm', bracket: 'Kids (6-10Y)' },
      { label: '12Y', ageRange: '11–12 Yrs', minAge: 10, maxAge: 13, minHeightCm: 137, maxHeightCm: 156, chestCm: '78 cm', lengthCm: '56 cm', bracket: 'Juniors (11-14Y)' },
      { label: 'S (16Y+)', ageRange: '15+ Yrs', minAge: 14, maxAge: 17, minHeightCm: 157, maxHeightCm: 173, chestCm: '90 cm', lengthCm: '61 cm', bracket: 'Teens & Adults (15Y+)' },
      { label: 'M', ageRange: 'Teen / Adult', minAge: 18, maxAge: 99, minHeightCm: 174, maxHeightCm: 192, chestCm: '96 cm', lengthCm: '64 cm', bracket: 'Teens & Adults (15Y+)' },
    ],
  },
  {
    id: 'mk-cobalt-leather-racer',
    sku: 'MK-CR-04',
    name: 'Midnight Cobalt Racing Leather',
    category: 'Boys',
    ageSpanLabel: 'Ages 6 to Adult',
    brackets: ['Kids (6-10Y)', 'Juniors (11-14Y)', 'Teens & Adults (15Y+)'],
    price: 168,
    colorName: 'Midnight Cobalt & Ivory',
    colorHex: '#1D3557',
    weatherRating: 'Windproof Moto · 2°C to 18°C',
    crestDetail: 'Winged metallic silver & gold MK shield crest on left chest',
    shortTag: 'Flagship Leather',
    description:
      'Full-grain midnight cobalt and obsidian moto leather with ribbed shoulder armor, ivory racing stripes, and adjustable waist buckles. Anchored by the winged silver-gold MK shield.',
    fabricSpecs: [
      'Supple full-grain cobalt & obsidian paneled moto leather',
      'Accordion quilted shoulder and elbow articulation panels',
      'Sculpted winged metallic gold & silver MK chest crest',
    ],
    image: '/src/assets/images/jacket_boys_midnight_leather_v3_1794894858121.jpg',
    sizes: [
      { label: '8Y', ageRange: '7–8 Yrs', minAge: 6, maxAge: 9, minHeightCm: 114, maxHeightCm: 136, chestCm: '69 cm', lengthCm: '49 cm', bracket: 'Kids (6-10Y)' },
      { label: '12Y', ageRange: '11–12 Yrs', minAge: 10, maxAge: 13, minHeightCm: 137, maxHeightCm: 158, chestCm: '79 cm', lengthCm: '56 cm', bracket: 'Juniors (11-14Y)' },
      { label: 'S (16Y+)', ageRange: '15–16 Yrs', minAge: 14, maxAge: 16, minHeightCm: 159, maxHeightCm: 173, chestCm: '94 cm', lengthCm: '63 cm', bracket: 'Teens & Adults (15Y+)' },
      { label: 'M', ageRange: 'Teen / Adult', minAge: 17, maxAge: 25, minHeightCm: 174, maxHeightCm: 182, chestCm: '100 cm', lengthCm: '66 cm', bracket: 'Teens & Adults (15Y+)' },
      { label: 'L', ageRange: 'Adult', minAge: 26, maxAge: 99, minHeightCm: 183, maxHeightCm: 196, chestCm: '106 cm', lengthCm: '69 cm', bracket: 'Teens & Adults (15Y+)' },
    ],
  },
  {
    id: 'mk-coral-teddy-bomber',
    sku: 'MK-TB-05',
    name: 'Coral & Cream Shearling Teddy',
    category: 'Unisex',
    ageSpanLabel: 'Ages 2 to 10',
    brackets: ['Toddlers (2-5Y)', 'Kids (6-10Y)'],
    price: 98,
    colorName: 'Terracotta Coral & Cream',
    colorHex: '#B85D43',
    weatherRating: 'Cozy Fleece · 0°C to 16°C',
    crestDetail: 'Gold-embroidered MK Kids crown shield stitched on left chest',
    shortTag: 'Toddler & Kids',
    description:
      'Ultra-soft high-pile terracotta coral and cream sherpa teddy fleece with an oversized cozy hood and antique brass snaps. Detailed with a golden MK shield on the chest.',
    fabricSpecs: [
      'Deep-pile hypoallergenic coral & cream teddy shearling fleece',
      'Brushed cotton storm placket with easy-snap brass buttons',
      'Embroidered gold bullion MK Kids crown shield on chest',
    ],
    image: '/src/assets/images/jacket_toddler_coral_teddy_v3_1794894857490.jpg',
    sizes: [
      { label: '2T', ageRange: '2 Yrs', minAge: 2, maxAge: 2, minHeightCm: 88, maxHeightCm: 95, chestCm: '54 cm', lengthCm: '38 cm', bracket: 'Toddlers (2-5Y)' },
      { label: '3T', ageRange: '3 Yrs', minAge: 3, maxAge: 3, minHeightCm: 96, maxHeightCm: 103, chestCm: '56 cm', lengthCm: '40 cm', bracket: 'Toddlers (2-5Y)' },
      { label: '5Y', ageRange: '4–5 Yrs', minAge: 4, maxAge: 5, minHeightCm: 104, maxHeightCm: 113, chestCm: '60 cm', lengthCm: '44 cm', bracket: 'Toddlers (2-5Y)' },
      { label: '8Y', ageRange: '6–8 Yrs', minAge: 6, maxAge: 8, minHeightCm: 114, maxHeightCm: 132, chestCm: '67 cm', lengthCm: '49 cm', bracket: 'Kids (6-10Y)' },
      { label: '10Y', ageRange: '9–10 Yrs', minAge: 9, maxAge: 10, minHeightCm: 133, maxHeightCm: 145, chestCm: '72 cm', lengthCm: '53 cm', bracket: 'Kids (6-10Y)' },
    ],
  },
  {
    id: 'mk-caramel-aviator-bomber',
    sku: 'MK-AB-06',
    name: 'Caramel Suede Shearling Aviator',
    category: 'Unisex',
    ageSpanLabel: 'Ages 2 to 14',
    brackets: ['Toddlers (2-5Y)', 'Kids (6-10Y)', 'Juniors (11-14Y)'],
    price: 126,
    colorName: 'Caramel Amber & Espresso',
    colorHex: '#9C5C24',
    weatherRating: 'Shearling Warmth · -6°C to 14°C',
    crestDetail: 'Espresso & gold embroidered MK shield crest stitched on left chest',
    shortTag: 'Heritage Warmth',
    description:
      'Diamond-quilted caramel shell trimmed with espresso suede plackets, antique brass snaps, and a full cream shearling interior lining. Features the bold gold-on-espresso MK shield on the chest.',
    fabricSpecs: [
      'Quilted caramel technical twill with espresso suede trim',
      'Ultra-soft cream shearling fleece collar & interior body',
      'Woven espresso & gold MK laurel shield on chest',
    ],
    image: '/src/assets/images/jacket_toddler_gold_bomber_v2_1794755421161.jpg',
    sizes: [
      { label: '2T', ageRange: '2 Yrs', minAge: 2, maxAge: 3, minHeightCm: 88, maxHeightCm: 100, chestCm: '54 cm', lengthCm: '39 cm', bracket: 'Toddlers (2-5Y)' },
      { label: '4T', ageRange: '4 Yrs', minAge: 4, maxAge: 5, minHeightCm: 101, maxHeightCm: 113, chestCm: '58 cm', lengthCm: '43 cm', bracket: 'Toddlers (2-5Y)' },
      { label: '6Y', ageRange: '6–7 Yrs', minAge: 6, maxAge: 7, minHeightCm: 114, maxHeightCm: 126, chestCm: '64 cm', lengthCm: '48 cm', bracket: 'Kids (6-10Y)' },
      { label: '8Y', ageRange: '8–9 Yrs', minAge: 8, maxAge: 10, minHeightCm: 127, maxHeightCm: 142, chestCm: '70 cm', lengthCm: '52 cm', bracket: 'Kids (6-10Y)' },
      { label: '12Y', ageRange: '11–12 Yrs', minAge: 11, maxAge: 14, minHeightCm: 143, maxHeightCm: 164, chestCm: '79 cm', lengthCm: '58 cm', bracket: 'Juniors (11-14Y)' },
    ],
  },
  {
    id: 'mk-obsidian-amber-moto',
    sku: 'MK-MB-07',
    name: 'Obsidian & Gold Asymmetrical Moto',
    category: 'Boys',
    ageSpanLabel: 'Ages 6 to Adult',
    brackets: ['Kids (6-10Y)', 'Juniors (11-14Y)', 'Teens & Adults (15Y+)'],
    price: 142,
    colorName: 'Obsidian & Burnt Gold',
    colorHex: '#C27D2C',
    weatherRating: 'Heavyweight Weather Shell · 2°C to 18°C',
    crestDetail: 'Metallic silver & gold MK crowned wreath emblem on left chest',
    shortTag: 'Street Luxe',
    description:
      'Architectural asymmetrical-zip moto bomber combining matte obsidian nylon with quilted burnt-gold shoulder and sleeve paneling. Detailed with a sculpted metallic MK crown crest on the chest.',
    fabricSpecs: [
      'High-density matte obsidian twill & quilted gold contrast sleeve',
      'Asymmetrical brass moto front zip & utility arm pocket',
      'Sculpted gold & silver MK crowned wreath crest on chest',
    ],
    image: '/src/assets/images/jacket_teen_twotone_moto_v2_1794755421568.jpg',
    sizes: [
      { label: '8Y', ageRange: '7–8 Yrs', minAge: 6, maxAge: 9, minHeightCm: 114, maxHeightCm: 134, chestCm: '69 cm', lengthCm: '49 cm', bracket: 'Kids (6-10Y)' },
      { label: '10Y', ageRange: '9–10 Yrs', minAge: 10, maxAge: 11, minHeightCm: 135, maxHeightCm: 148, chestCm: '74 cm', lengthCm: '53 cm', bracket: 'Kids (6-10Y)' },
      { label: '14Y', ageRange: '13–14 Yrs', minAge: 12, maxAge: 14, minHeightCm: 149, maxHeightCm: 164, chestCm: '84 cm', lengthCm: '59 cm', bracket: 'Juniors (11-14Y)' },
      { label: 'S (16Y+)', ageRange: '15+ Yrs', minAge: 15, maxAge: 17, minHeightCm: 165, maxHeightCm: 175, chestCm: '94 cm', lengthCm: '63 cm', bracket: 'Teens & Adults (15Y+)' },
      { label: 'M', ageRange: 'Teen / Adult', minAge: 18, maxAge: 24, minHeightCm: 176, maxHeightCm: 183, chestCm: '100 cm', lengthCm: '66 cm', bracket: 'Teens & Adults (15Y+)' },
      { label: 'L', ageRange: 'Adult', minAge: 25, maxAge: 99, minHeightCm: 184, maxHeightCm: 196, chestCm: '106 cm', lengthCm: '69 cm', bracket: 'Teens & Adults (15Y+)' },
    ],
  },
  {
    id: 'mk-plum-belted-trench',
    sku: 'MK-PT-08',
    name: 'Royal Plum Belted Storm Trench',
    category: 'Girls',
    ageSpanLabel: 'Ages 6 to Adult',
    brackets: ['Kids (6-10Y)', 'Juniors (11-14Y)', 'Teens & Adults (15Y+)'],
    price: 134,
    colorName: 'Royal Plum & Pearl',
    colorHex: '#6B1D43',
    weatherRating: 'Storm-Repellent Twill · 6°C to 20°C',
    crestDetail: 'Gold bullion embroidered MK crest mounted on left chest lapel',
    shortTag: 'Tailored Fit',
    description:
      'Double-breasted cropped utility trench in rich royal plum with crisp ivory storm-flap piping, belted waist, and gleaming gold dome buttons. Adorned with an ornate gold MK crest on the chest.',
    fabricSpecs: [
      'Water-repellent brushed plum cotton-twill with pearl piping',
      'Removable waist tie belt, buttoned shoulder epaulettes & storm flap',
      'Ornate gold-thread MK royal crest stitched on left chest',
    ],
    image: '/src/assets/images/jacket_girls_plum_trench_v2_1794755421573.jpg',
    sizes: [
      { label: '6Y', ageRange: '6–7 Yrs', minAge: 6, maxAge: 8, minHeightCm: 114, maxHeightCm: 130, chestCm: '64 cm', lengthCm: '46 cm', bracket: 'Kids (6-10Y)' },
      { label: '10Y', ageRange: '9–10 Yrs', minAge: 9, maxAge: 10, minHeightCm: 131, maxHeightCm: 142, chestCm: '72 cm', lengthCm: '52 cm', bracket: 'Kids (6-10Y)' },
      { label: '12Y', ageRange: '11–12 Yrs', minAge: 11, maxAge: 12, minHeightCm: 143, maxHeightCm: 154, chestCm: '78 cm', lengthCm: '56 cm', bracket: 'Juniors (11-14Y)' },
      { label: '14Y', ageRange: '13–14 Yrs', minAge: 13, maxAge: 14, minHeightCm: 155, maxHeightCm: 164, chestCm: '83 cm', lengthCm: '59 cm', bracket: 'Juniors (11-14Y)' },
      { label: 'S (16Y+)', ageRange: '15+ Yrs', minAge: 15, maxAge: 99, minHeightCm: 165, maxHeightCm: 185, chestCm: '90 cm', lengthCm: '62 cm', bracket: 'Teens & Adults (15Y+)' },
    ],
  },
  {
    id: 'mk-sapphire-alpine-parka',
    sku: 'MK-SA-09',
    name: 'Sapphire & Titanium Alpine Down',
    category: 'Unisex',
    ageSpanLabel: 'Ages 2 to Adult',
    brackets: ['Toddlers (2-5Y)', 'Kids (6-10Y)', 'Juniors (11-14Y)', 'Teens & Adults (15Y+)'],
    price: 158,
    colorName: 'Sapphire, Silver & Obsidian',
    colorHex: '#1D4ED8',
    weatherRating: 'Sub-Zero Alpine 15,000mm · -18°C to 4°C',
    crestDetail: 'High-contrast white & silver MK Alpine Peaks crest on chest',
    shortTag: 'Pro Alpine',
    description:
      'High-altitude insulated puffer parka pairing electric sapphire baffles with titanium-silver shoulder armor and obsidian abrasion panels. Stamped cleanly with the luminous MK Alpine crest.',
    fabricSpecs: [
      '15,000mm waterproof breathable ripstop with titanium panels',
      'Dual waterproof chest zip pockets & snow-lock storm cuffs',
      'Luminous silver-white MK Alpine Peaks crest on left chest',
    ],
    image: '/src/assets/images/jacket_all_age_sapphire_ski_v2_1794755421966.jpg',
    sizes: [
      { label: '4T', ageRange: '3–4 Yrs', minAge: 2, maxAge: 5, minHeightCm: 88, maxHeightCm: 113, chestCm: '58 cm', lengthCm: '45 cm', bracket: 'Toddlers (2-5Y)' },
      { label: '8Y', ageRange: '7–8 Yrs', minAge: 6, maxAge: 10, minHeightCm: 114, maxHeightCm: 142, chestCm: '70 cm', lengthCm: '53 cm', bracket: 'Kids (6-10Y)' },
      { label: '12Y', ageRange: '11–12 Yrs', minAge: 11, maxAge: 14, minHeightCm: 143, maxHeightCm: 164, chestCm: '80 cm', lengthCm: '60 cm', bracket: 'Juniors (11-14Y)' },
      { label: 'S (16Y+)', ageRange: '15–16 Yrs', minAge: 15, maxAge: 17, minHeightCm: 165, maxHeightCm: 174, chestCm: '92 cm', lengthCm: '67 cm', bracket: 'Teens & Adults (15Y+)' },
      { label: 'M', ageRange: 'Teen / Adult', minAge: 18, maxAge: 25, minHeightCm: 175, maxHeightCm: 183, chestCm: '99 cm', lengthCm: '70 cm', bracket: 'Teens & Adults (15Y+)' },
      { label: 'L', ageRange: 'Adult', minAge: 26, maxAge: 99, minHeightCm: 184, maxHeightCm: 196, chestCm: '106 cm', lengthCm: '73 cm', bracket: 'Teens & Adults (15Y+)' },
    ],
  },
];
