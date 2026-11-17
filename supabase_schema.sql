-- ============================================================================
-- MK Outerwear — Complete Supabase PostgreSQL Schema, Policies & Seed Data
-- Run this entire script in: Supabase Dashboard -> SQL Editor -> New Query
-- ============================================================================

-- Cleanly reset orders & order_items if your previous orders table had wrong columns
DROP TABLE IF EXISTS public.order_items CASCADE;
DROP TABLE IF EXISTS public.orders CASCADE;

-- 1. MK Jackets Catalog
CREATE TABLE IF NOT EXISTS public.jackets (
    id VARCHAR(64) PRIMARY KEY,
    sku VARCHAR(32) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('Boys', 'Girls', 'Unisex')),
    age_span_label VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    color_name VARCHAR(100) NOT NULL,
    color_hex VARCHAR(16) NOT NULL,
    weather_rating VARCHAR(120) NOT NULL,
    crest_detail TEXT NOT NULL,
    short_tag VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    fabric_specs JSONB NOT NULL DEFAULT '[]'::jsonb,
    image_url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Age-Mapped Jacket Sizes
CREATE TABLE IF NOT EXISTS public.jacket_sizes (
    id SERIAL PRIMARY KEY,
    jacket_id VARCHAR(64) NOT NULL REFERENCES public.jackets(id) ON DELETE CASCADE,
    size_label VARCHAR(24) NOT NULL,
    age_range VARCHAR(32) NOT NULL,
    min_age INT NOT NULL,
    max_age INT NOT NULL,
    min_height_cm INT NOT NULL,
    max_height_cm INT NOT NULL,
    chest_cm VARCHAR(20) NOT NULL,
    length_cm VARCHAR(20) NOT NULL,
    bracket VARCHAR(40) NOT NULL,
    stock_qty INT NOT NULL DEFAULT 25,
    UNIQUE (jacket_id, size_label)
);

-- 3. Saved Favorites (Wishlist)
CREATE TABLE IF NOT EXISTS public.saved_favorites (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    jacket_id VARCHAR(64) NOT NULL REFERENCES public.jackets(id) ON DELETE CASCADE,
    saved_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (session_id, jacket_id)
);

-- 4. Orders & Checkout (Recreated Cleanly)
CREATE TABLE public.orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(32) UNIQUE NOT NULL,
    customer_name VARCHAR(120) NOT NULL,
    phone VARCHAR(40) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    postal_code VARCHAR(24) NOT NULL,
    payment_method VARCHAR(32) NOT NULL CHECK (payment_method IN ('Card', 'Cash on Delivery')),
    shipping_speed VARCHAR(24) NOT NULL CHECK (shipping_speed IN ('Standard', 'Express')),
    gift_note VARCHAR(120),
    shipping_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT 'Preparing Shipment',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Order Line Items
CREATE TABLE public.order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    jacket_id VARCHAR(64) NOT NULL REFERENCES public.jackets(id),
    size_label VARCHAR(24) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL
);

-- ============================================================================
-- Enable Row Level Security (RLS)
-- ============================================================================
ALTER TABLE public.jackets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jacket_sizes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Drop old policies safely so re-running this script never fails
DROP POLICY IF EXISTS "Public read jackets" ON public.jackets;
DROP POLICY IF EXISTS "Public read sizes" ON public.jacket_sizes;
DROP POLICY IF EXISTS "Public manage favorites" ON public.saved_favorites;
DROP POLICY IF EXISTS "Public read orders" ON public.orders;
DROP POLICY IF EXISTS "Public insert orders" ON public.orders;
DROP POLICY IF EXISTS "Public read order items" ON public.order_items;
DROP POLICY IF EXISTS "Public insert order items" ON public.order_items;

-- Storefront Policies
CREATE POLICY "Public read jackets"
    ON public.jackets FOR SELECT
    USING (true);

CREATE POLICY "Public read sizes"
    ON public.jacket_sizes FOR SELECT
    USING (true);

CREATE POLICY "Public manage favorites"
    ON public.saved_favorites FOR ALL
    USING (true)
    WITH CHECK (true);

-- Note: SELECT is required so .insert(...).select('id') works after checkout
CREATE POLICY "Public read orders"
    ON public.orders FOR SELECT
    USING (true);

CREATE POLICY "Public insert orders"
    ON public.orders FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Public read order items"
    ON public.order_items FOR SELECT
    USING (true);

CREATE POLICY "Public insert order items"
    ON public.order_items FOR INSERT
    WITH CHECK (true);

-- ============================================================================
-- Seed 9 MK Outerwear Jackets
-- ============================================================================
INSERT INTO public.jackets (
    id, sku, name, category, age_span_label, price,
    color_name, color_hex, weather_rating, crest_detail,
    short_tag, description, fabric_specs, image_url
) VALUES
('mk-emerald-racing-varsity', 'MK-RV-01', 'Emerald Crown Racing Varsity', 'Boys', 'Ages 2 to Adult', 138.00,
 'Emerald, Obsidian & Gold', '#0F5132', 'Wind-Resistant · 4°C to 18°C',
 'Gold-embroidered MK crown & laurel crest stitched on left chest', 'Signature Crest',
 'Rich emerald Melton wool paired with supple jet-black leather sleeves, ivory shoulder stripes, and brushed-metal center zip. Crowned with the gleaming gold MK Racing crest on the chest.',
 '["440gsm emerald Melton wool body with pebbled leather sleeves", "Two-way polished nickel zipper & cream leather welt pockets", "Gold bullion-thread MK crown crest embroidered on left chest"]'::jsonb,
 '/src/assets/images/jacket_boys_racing_v2_1794755419751.jpg'),

('mk-crimson-satin-puffer', 'MK-CP-02', 'Ruby Satin Shearling Puffer', 'Girls', 'Ages 2 to Adult', 148.00,
 'Ruby Crimson & Gold', '#8B1538', 'Thermal Insulation · -10°C to 10°C',
 'Champagne-gold metallic MK medallion emblem mounted on left chest', 'Best Seller',
 'Diamond-quilted ruby satin shell topped with a lush crimson faux-fur collar and gold hardware throughout. Finished with an unmistakable champagne-gold MK medallion on the left chest.',
 '["Water-repellent luminous ruby satin diamond-quilted shell", "Plush tonal faux-fur collar with gold MK zipper pull & cuff bar", "Raised champagne-gold MK circular crest on chest"]'::jsonb,
 '/src/assets/images/jacket_girls_crimson_puffer_v2_1794755420808.jpg'),

('mk-champagne-velvet-puffer', 'MK-CV-03', 'Champagne Velvet Crown Puffer', 'Girls', 'Ages 2 to Adult', 156.00,
 'Champagne Gold Velvet', '#C5A059', 'Plush Thermal · -8°C to 12°C',
 'Sculpted gold crown & laurel MK crest with engraved MK zipper pull', 'New Arrival',
 'Luminous crushed-velvet quilted puffer lined in silk-touch ivory satin. Finished with a sculpted gold MK crown medallion on the chest and custom MK-stamped hardware.',
 '["Plush crushed champagne velvet outer with satin collar lining", "Custom MK-engraved brushed gold main & pocket zipper pulls", "3D gold bullion & metallic MK crown crest on left chest"]'::jsonb,
 '/src/assets/images/jacket_girls_champagne_velvet_v3_1794894857186.jpg'),

('mk-cobalt-leather-racer', 'MK-CR-04', 'Midnight Cobalt Racing Leather', 'Boys', 'Ages 6 to Adult', 168.00,
 'Midnight Cobalt & Ivory', '#1D3557', 'Windproof Moto · 2°C to 18°C',
 'Winged metallic silver & gold MK shield crest on left chest', 'Flagship Leather',
 'Full-grain midnight cobalt and obsidian moto leather with ribbed shoulder armor, ivory racing stripes, and adjustable waist buckles. Anchored by the winged silver-gold MK shield.',
 '["Supple full-grain cobalt & obsidian paneled moto leather", "Accordion quilted shoulder and elbow articulation panels", "Sculpted winged metallic gold & silver MK chest crest"]'::jsonb,
 '/src/assets/images/jacket_boys_midnight_leather_v3_1794894858121.jpg'),

('mk-coral-teddy-bomber', 'MK-TB-05', 'Coral & Cream Shearling Teddy', 'Unisex', 'Ages 2 to 10', 98.00,
 'Terracotta Coral & Cream', '#B85D43', 'Cozy Fleece · 0°C to 16°C',
 'Gold-embroidered MK Kids crown shield stitched on left chest', 'Toddler & Kids',
 'Ultra-soft high-pile terracotta coral and cream sherpa teddy fleece with an oversized cozy hood and antique brass snaps. Detailed with a golden MK shield on the chest.',
 '["Deep-pile hypoallergenic coral & cream teddy shearling fleece", "Brushed cotton storm placket with easy-snap brass buttons", "Embroidered gold bullion MK Kids crown shield on chest"]'::jsonb,
 '/src/assets/images/jacket_toddler_coral_teddy_v3_1794894857490.jpg'),

('mk-caramel-aviator-bomber', 'MK-AB-06', 'Caramel Suede Shearling Aviator', 'Unisex', 'Ages 2 to 14', 126.00,
 'Caramel Amber & Espresso', '#9C5C24', 'Shearling Warmth · -6°C to 14°C',
 'Espresso & gold embroidered MK shield crest stitched on left chest', 'Heritage Warmth',
 'Diamond-quilted caramel shell trimmed with espresso suede plackets, antique brass snaps, and a full cream shearling interior lining. Features the bold gold-on-espresso MK shield on the chest.',
 '["Quilted caramel technical twill with espresso suede trim", "Ultra-soft cream shearling fleece collar & interior body", "Woven espresso & gold MK laurel shield on chest"]'::jsonb,
 '/src/assets/images/jacket_toddler_gold_bomber_v2_1794755421161.jpg'),

('mk-obsidian-amber-moto', 'MK-MB-07', 'Obsidian & Gold Asymmetrical Moto', 'Boys', 'Ages 6 to Adult', 142.00,
 'Obsidian & Burnt Gold', '#C27D2C', 'Heavyweight Weather Shell · 2°C to 18°C',
 'Metallic silver & gold MK crowned wreath emblem on left chest', 'Street Luxe',
 'Architectural asymmetrical-zip moto bomber combining matte obsidian nylon with quilted burnt-gold shoulder and sleeve paneling. Detailed with a sculpted metallic MK crown crest on the chest.',
 '["High-density matte obsidian twill & quilted gold contrast sleeve", "Asymmetrical brass moto front zip & utility arm pocket", "Sculpted gold & silver MK crowned wreath crest on chest"]'::jsonb,
 '/src/assets/images/jacket_teen_twotone_moto_v2_1794755421568.jpg'),

('mk-plum-belted-trench', 'MK-PT-08', 'Royal Plum Belted Storm Trench', 'Girls', 'Ages 6 to Adult', 134.00,
 'Royal Plum & Pearl', '#6B1D43', 'Storm-Repellent Twill · 6°C to 20°C',
 'Gold bullion embroidered MK crest mounted on left chest lapel', 'Tailored Fit',
 'Double-breasted cropped utility trench in rich royal plum with crisp ivory storm-flap piping, belted waist, and gleaming gold dome buttons. Adorned with an ornate gold MK crest on the chest.',
 '["Water-repellent brushed plum cotton-twill with pearl piping", "Removable waist tie belt, buttoned shoulder epaulettes & storm flap", "Ornate gold-thread MK royal crest stitched on left chest"]'::jsonb,
 '/src/assets/images/jacket_girls_plum_trench_v2_1794755421573.jpg'),

('mk-sapphire-alpine-parka', 'MK-SA-09', 'Sapphire & Titanium Alpine Down', 'Unisex', 'Ages 2 to Adult', 158.00,
 'Sapphire, Silver & Obsidian', '#1D4ED8', 'Sub-Zero Alpine 15,000mm · -18°C to 4°C',
 'High-contrast white & silver MK Alpine Peaks crest on chest', 'Pro Alpine',
 'High-altitude insulated puffer parka pairing electric sapphire baffles with titanium-silver shoulder armor and obsidian abrasion panels. Stamped cleanly with the luminous MK Alpine crest.',
 '["15,000mm waterproof breathable ripstop with titanium panels", "Dual waterproof chest zip pockets & snow-lock storm cuffs", "Luminous silver-white MK Alpine Peaks crest on left chest"]'::jsonb,
 '/src/assets/images/jacket_all_age_sapphire_ski_v2_1794755421966.jpg')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    fabric_specs = EXCLUDED.fabric_specs,
    image_url = EXCLUDED.image_url;

-- ============================================================================
-- Seed All-Age Sizes for All 9 Jackets
-- ============================================================================
INSERT INTO public.jacket_sizes (
    jacket_id, size_label, age_range, min_age, max_age,
    min_height_cm, max_height_cm, chest_cm, length_cm, bracket, stock_qty
) VALUES
-- 1. Emerald Crown Racing Varsity
('mk-emerald-racing-varsity', '3T', '2–3 Yrs', 2, 3, 88, 100, '56 cm', '40 cm', 'Toddlers (2-5Y)', 25),
('mk-emerald-racing-varsity', '5Y', '4–5 Yrs', 4, 5, 101, 113, '60 cm', '44 cm', 'Toddlers (2-5Y)', 25),
('mk-emerald-racing-varsity', '8Y', '7–8 Yrs', 6, 9, 114, 135, '68 cm', '50 cm', 'Kids (6-10Y)', 25),
('mk-emerald-racing-varsity', '12Y', '11–12 Yrs', 10, 13, 136, 158, '78 cm', '57 cm', 'Juniors (11-14Y)', 25),
('mk-emerald-racing-varsity', 'S (16Y+)', '15–16 Yrs', 14, 16, 159, 173, '92 cm', '64 cm', 'Teens & Adults (15Y+)', 25),
('mk-emerald-racing-varsity', 'M', '17+ / Adult', 17, 99, 174, 192, '98 cm', '67 cm', 'Teens & Adults (15Y+)', 25),

-- 2. Ruby Satin Shearling Puffer
('mk-crimson-satin-puffer', '3T', '2–3 Yrs', 2, 4, 88, 105, '57 cm', '41 cm', 'Toddlers (2-5Y)', 25),
('mk-crimson-satin-puffer', '6Y', '5–6 Yrs', 5, 7, 106, 124, '63 cm', '46 cm', 'Kids (6-10Y)', 25),
('mk-crimson-satin-puffer', '10Y', '9–10 Yrs', 8, 11, 125, 145, '72 cm', '53 cm', 'Kids (6-10Y)', 25),
('mk-crimson-satin-puffer', '14Y', '13–14 Yrs', 12, 14, 146, 162, '84 cm', '60 cm', 'Juniors (11-14Y)', 25),
('mk-crimson-satin-puffer', 'S (16Y+)', '15–16 Yrs', 15, 16, 163, 173, '90 cm', '63 cm', 'Teens & Adults (15Y+)', 25),
('mk-crimson-satin-puffer', 'M', '17+ / Adult', 17, 99, 174, 192, '96 cm', '66 cm', 'Teens & Adults (15Y+)', 25),

-- 3. Champagne Velvet Crown Puffer
('mk-champagne-velvet-puffer', '4T', '3–4 Yrs', 2, 4, 88, 108, '58 cm', '42 cm', 'Toddlers (2-5Y)', 25),
('mk-champagne-velvet-puffer', '8Y', '7–8 Yrs', 5, 9, 109, 136, '68 cm', '49 cm', 'Kids (6-10Y)', 25),
('mk-champagne-velvet-puffer', '12Y', '11–12 Yrs', 10, 13, 137, 156, '78 cm', '56 cm', 'Juniors (11-14Y)', 25),
('mk-champagne-velvet-puffer', 'S (16Y+)', '15+ Yrs', 14, 17, 157, 173, '90 cm', '61 cm', 'Teens & Adults (15Y+)', 25),
('mk-champagne-velvet-puffer', 'M', 'Teen / Adult', 18, 99, 174, 192, '96 cm', '64 cm', 'Teens & Adults (15Y+)', 25),

-- 4. Midnight Cobalt Racing Leather
('mk-cobalt-leather-racer', '8Y', '7–8 Yrs', 6, 9, 114, 136, '69 cm', '49 cm', 'Kids (6-10Y)', 25),
('mk-cobalt-leather-racer', '12Y', '11–12 Yrs', 10, 13, 137, 158, '79 cm', '56 cm', 'Juniors (11-14Y)', 25),
('mk-cobalt-leather-racer', 'S (16Y+)', '15–16 Yrs', 14, 16, 159, 173, '94 cm', '63 cm', 'Teens & Adults (15Y+)', 25),
('mk-cobalt-leather-racer', 'M', 'Teen / Adult', 17, 25, 174, 182, '100 cm', '66 cm', 'Teens & Adults (15Y+)', 25),
('mk-cobalt-leather-racer', 'L', 'Adult', 26, 99, 183, 196, '106 cm', '69 cm', 'Teens & Adults (15Y+)', 25),

-- 5. Coral & Cream Shearling Teddy
('mk-coral-teddy-bomber', '2T', '2 Yrs', 2, 2, 88, 95, '54 cm', '38 cm', 'Toddlers (2-5Y)', 25),
('mk-coral-teddy-bomber', '3T', '3 Yrs', 3, 3, 96, 103, '56 cm', '40 cm', 'Toddlers (2-5Y)', 25),
('mk-coral-teddy-bomber', '5Y', '4–5 Yrs', 4, 5, 104, 113, '60 cm', '44 cm', 'Toddlers (2-5Y)', 25),
('mk-coral-teddy-bomber', '8Y', '6–8 Yrs', 6, 8, 114, 132, '67 cm', '49 cm', 'Kids (6-10Y)', 25),
('mk-coral-teddy-bomber', '10Y', '9–10 Yrs', 9, 10, 133, 145, '72 cm', '53 cm', 'Kids (6-10Y)', 25),

-- 6. Caramel Suede Shearling Aviator
('mk-caramel-aviator-bomber', '2T', '2 Yrs', 2, 3, 88, 100, '54 cm', '39 cm', 'Toddlers (2-5Y)', 25),
('mk-caramel-aviator-bomber', '4T', '4 Yrs', 4, 5, 101, 113, '58 cm', '43 cm', 'Toddlers (2-5Y)', 25),
('mk-caramel-aviator-bomber', '6Y', '6–7 Yrs', 6, 7, 114, 126, '64 cm', '48 cm', 'Kids (6-10Y)', 25),
('mk-caramel-aviator-bomber', '8Y', '8–9 Yrs', 8, 10, 127, 142, '70 cm', '52 cm', 'Kids (6-10Y)', 25),
('mk-caramel-aviator-bomber', '12Y', '11–12 Yrs', 11, 14, 143, 164, '79 cm', '58 cm', 'Juniors (11-14Y)', 25),

-- 7. Obsidian & Gold Asymmetrical Moto
('mk-obsidian-amber-moto', '8Y', '7–8 Yrs', 6, 9, 114, 134, '69 cm', '49 cm', 'Kids (6-10Y)', 25),
('mk-obsidian-amber-moto', '10Y', '9–10 Yrs', 10, 11, 135, 148, '74 cm', '53 cm', 'Kids (6-10Y)', 25),
('mk-obsidian-amber-moto', '14Y', '13–14 Yrs', 12, 14, 149, 164, '84 cm', '59 cm', 'Juniors (11-14Y)', 25),
('mk-obsidian-amber-moto', 'S (16Y+)', '15+ Yrs', 15, 17, 165, 175, '94 cm', '63 cm', 'Teens & Adults (15Y+)', 25),
('mk-obsidian-amber-moto', 'M', 'Teen / Adult', 18, 24, 176, 183, '100 cm', '66 cm', 'Teens & Adults (15Y+)', 25),
('mk-obsidian-amber-moto', 'L', 'Adult', 25, 99, 184, 196, '106 cm', '69 cm', 'Teens & Adults (15Y+)', 25),

-- 8. Royal Plum Belted Storm Trench
('mk-plum-belted-trench', '6Y', '6–7 Yrs', 6, 8, 114, 130, '64 cm', '46 cm', 'Kids (6-10Y)', 25),
('mk-plum-belted-trench', '10Y', '9–10 Yrs', 9, 10, 131, 142, '72 cm', '52 cm', 'Kids (6-10Y)', 25),
('mk-plum-belted-trench', '12Y', '11–12 Yrs', 11, 12, 143, 154, '78 cm', '56 cm', 'Juniors (11-14Y)', 25),
('mk-plum-belted-trench', '14Y', '13–14 Yrs', 13, 14, 155, 164, '83 cm', '59 cm', 'Juniors (11-14Y)', 25),
('mk-plum-belted-trench', 'S (16Y+)', '15+ Yrs', 15, 99, 165, 185, '90 cm', '62 cm', 'Teens & Adults (15Y+)', 25),

-- 9. Sapphire & Titanium Alpine Down
('mk-sapphire-alpine-parka', '4T', '3–4 Yrs', 2, 5, 88, 113, '58 cm', '45 cm', 'Toddlers (2-5Y)', 25),
('mk-sapphire-alpine-parka', '8Y', '7–8 Yrs', 6, 10, 114, 142, '70 cm', '53 cm', 'Kids (6-10Y)', 25),
('mk-sapphire-alpine-parka', '12Y', '11–12 Yrs', 11, 14, 143, 164, '80 cm', '60 cm', 'Juniors (11-14Y)', 25),
('mk-sapphire-alpine-parka', 'S (16Y+)', '15–16 Yrs', 15, 17, 165, 174, '92 cm', '67 cm', 'Teens & Adults (15Y+)', 25),
('mk-sapphire-alpine-parka', 'M', 'Teen / Adult', 18, 25, 175, 183, '99 cm', '70 cm', 'Teens & Adults (15Y+)', 25),
('mk-sapphire-alpine-parka', 'L', 'Adult', 26, 99, 184, 196, '106 cm', '73 cm', 'Teens & Adults (15Y+)', 25)
ON CONFLICT (jacket_id, size_label) DO NOTHING;
