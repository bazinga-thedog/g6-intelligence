-- Update all neighborhoods with complete investment data
-- Run this in Supabase SQL Editor or pgAdmin

BEGIN;

-- Add avg_days_on_market_sale column if it doesn't exist
ALTER TABLE neighborhoods ADD COLUMN IF NOT EXISTS avg_days_on_market_sale INTEGER;

-- Update Alfama (ID: 1)
UPDATE neighborhoods
SET
  description = 'Alfama is Lisbon''s best-known historic district, offering scarce character property, panoramic viewpoints and enduring international demand. Renovated apartments can attract premium long-term tenants, executives and lifestyle buyers, while the tightly constrained urban fabric supports value retention. Investment performance varies materially by building condition, natural light, access and outlook, with upper-floor river views commanding substantial premiums. Older structures may require seismic, roofing, façade and common-area works, and vehicle access is limited. Short-term rental licensing must be verified asset by asset. Alfama therefore suits investors comfortable with technical due diligence, selective renovation and longer holding periods rather than standardized, highly liquid residential stock.',
  price_per_sqm_eur_min = 5400,
  price_per_sqm_eur_max = 8500,
  price_per_sqm_usd_min = 6175,
  price_per_sqm_usd_max = 9720,
  price_per_sqm_gbp_min = 4595,
  price_per_sqm_gbp_max = 7233,
  rental_yield_min = 3.7,
  rental_yield_max = 5.4,
  days_to_rent_avg = 25,
  acquisition_tax = 6.8,
  avg_holding_time = 8,
  days_available_to_rent = 28,
  avg_days_on_market_sale = 90,
  rent_per_sqm_eur = 295,
  rent_per_sqm_usd = 337,
  rent_per_sqm_gbp = 251,
  price_growth_5y = '[3.8, 2.5, 2.9, 3.5, 5.5]'::jsonb,
  rental_growth_5y = '[-6.0, 30.0, 15.0, 5.0, 1.0]'::jsonb,
  avg_rental_time = 14
WHERE id = 1;

-- Update Chiado (ID: 2)
UPDATE neighborhoods
SET
  description = 'Chiado is one of Lisbon''s most prestigious mixed-use districts, combining luxury retail, theatres, restaurants, offices and exceptional walkability. Residential supply is limited, and high-quality renovated apartments attract affluent Portuguese buyers, international residents and corporate tenants. Its central location and architectural quality support capital preservation, although entry prices are among the city''s highest and gross rental yields are comparatively compressed. Building quality, lift access, acoustic insulation and condominium liabilities require close review, particularly in older assets. Chiado is best suited to investors prioritizing scarcity, liquidity within the prime segment and long-term wealth preservation over maximum income generation or value-led acquisition strategies.',
  price_per_sqm_eur_min = 7000,
  price_per_sqm_eur_max = 11000,
  price_per_sqm_usd_min = 8004,
  price_per_sqm_usd_max = 12578,
  price_per_sqm_gbp_min = 5957,
  price_per_sqm_gbp_max = 9361,
  rental_yield_min = 3.0,
  rental_yield_max = 4.5,
  days_to_rent_avg = 30,
  acquisition_tax = 6.8,
  avg_holding_time = 9,
  days_available_to_rent = 30,
  avg_days_on_market_sale = 105,
  rent_per_sqm_eur = 310,
  rent_per_sqm_usd = 354,
  rent_per_sqm_gbp = 264,
  price_growth_5y = '[4.5, 1.0, 8.0, -6.0, -1.5]'::jsonb,
  rental_growth_5y = '[-4.0, 28.0, 14.0, 4.0, 2.0]'::jsonb,
  avg_rental_time = 16
WHERE id = 2;

-- Update Belém (ID: 3)
UPDATE neighborhoods
SET
  description = 'Belém is a prestigious western Lisbon district defined by waterfront public spaces, major cultural institutions, embassies and established residential streets. It attracts families, diplomats and professionals seeking a quieter environment with good access to central Lisbon, Cascais and international schools. Larger apartments, terraces and river views can command meaningful premiums, while limited high-quality stock supports resilient long-term values. Rental demand is dependable but generally less intense than in the historic centre, producing moderate yields. Investors should distinguish between prime riverside micro-locations and more peripheral sections, while assessing transport noise, building age, parking and renovation requirements. Belém suits balanced, lower-volatility residential strategies.',
  price_per_sqm_eur_min = 5400,
  price_per_sqm_eur_max = 9000,
  price_per_sqm_usd_min = 6175,
  price_per_sqm_usd_max = 10292,
  price_per_sqm_gbp_min = 4595,
  price_per_sqm_gbp_max = 7659,
  rental_yield_min = 3.0,
  rental_yield_max = 4.4,
  days_to_rent_avg = 26,
  acquisition_tax = 6.8,
  avg_holding_time = 8,
  days_available_to_rent = 25,
  avg_days_on_market_sale = 85,
  rent_per_sqm_eur = 245,
  rent_per_sqm_usd = 280,
  rent_per_sqm_gbp = 208,
  price_growth_5y = '[5.5, 8.0, 7.0, 8.5, 10.0]'::jsonb,
  rental_growth_5y = '[-3.2, 25.0, 12.0, 6.0, 13.3]'::jsonb,
  avg_rental_time = 13
WHERE id = 3;

-- Update Parque das Nações (ID: 4)
UPDATE neighborhoods
SET
  description = 'Parque das Nações is Lisbon''s principal modern waterfront district, offering contemporary apartments, offices, schools, retail, parks and strong transport connectivity through Oriente. Demand is driven by professionals, corporate tenants, families and international residents who value newer construction, parking, lifts and energy efficiency. The neighborhood typically provides lower maintenance risk and faster leasing than historic districts, although condominium charges and variations in tower quality can affect net returns. New development and premium riverfront schemes broaden buyer choice, reducing the scarcity advantage found in central Lisbon. The area is well suited to investors seeking operationally efficient assets, stable occupancy and balanced capital growth rather than heritage-led appreciation.',
  price_per_sqm_eur_min = 5600,
  price_per_sqm_eur_max = 9000,
  price_per_sqm_usd_min = 6404,
  price_per_sqm_usd_max = 10292,
  price_per_sqm_gbp_min = 4765,
  price_per_sqm_gbp_max = 7659,
  rental_yield_min = 3.0,
  rental_yield_max = 4.2,
  days_to_rent_avg = 22,
  acquisition_tax = 6.8,
  avg_holding_time = 8,
  days_available_to_rent = 20,
  avg_days_on_market_sale = 70,
  rent_per_sqm_eur = 227,
  rent_per_sqm_usd = 260,
  rent_per_sqm_gbp = 193,
  price_growth_5y = '[7.0, 6.0, 9.0, -8.0, 16.8]'::jsonb,
  rental_growth_5y = '[2.0, 35.5, 8.0, 3.0, 2.0]'::jsonb,
  avg_rental_time = 11
WHERE id = 4;

-- Update Príncipe Real (ID: 5)
UPDATE neighborhoods
SET
  description = 'Príncipe Real is a boutique prime neighborhood known for landscaped squares, design retail, restaurants, diplomatic residences and elegant nineteenth-century buildings. Its limited supply and strong appeal among affluent international residents support premium pricing and long-term capital preservation. Renovated apartments with lifts, terraces, views or parking are particularly scarce and can outperform the wider market. Rental yields are moderate because acquisition costs are high, while unrenovated buildings may involve structural work, condominium complexity and lengthy permitting. Noise and tourism exposure vary considerably by street. Príncipe Real is most appropriate for investors seeking distinctive, defensible assets with strong lifestyle appeal and patient appreciation rather than high initial cash yield.',
  price_per_sqm_eur_min = 7200,
  price_per_sqm_eur_max = 11500,
  price_per_sqm_usd_min = 8233,
  price_per_sqm_usd_max = 13150,
  price_per_sqm_gbp_min = 6127,
  price_per_sqm_gbp_max = 9786,
  rental_yield_min = 3.1,
  rental_yield_max = 4.5,
  days_to_rent_avg = 28,
  acquisition_tax = 6.8,
  avg_holding_time = 9,
  days_available_to_rent = 26,
  avg_days_on_market_sale = 95,
  rent_per_sqm_eur = 328,
  rent_per_sqm_usd = 375,
  rent_per_sqm_gbp = 279,
  price_growth_5y = '[1.5, 4.0, 5.5, 2.5, -4.1]'::jsonb,
  rental_growth_5y = '[-2.0, 30.0, 12.0, 4.0, 1.0]'::jsonb,
  avg_rental_time = 14
WHERE id = 5;

-- Update Santos (ID: 6)
UPDATE neighborhoods
SET
  description = 'Santos is an increasingly established riverside investment district linking Lisbon''s historic centre with Estrela and Alcântara. The area benefits from design businesses, restaurants, universities, offices and improving public realm, supporting demand from students, young professionals and international tenants. Renovated apartments can combine stronger rental income than Lisbon''s ultra-prime neighborhoods with credible long-term appreciation. Performance remains highly micro-location dependent: river proximity, noise, nightlife, rail infrastructure and building condition materially influence value and tenant retention. Ongoing regeneration provides upside but can also create construction disruption. Santos suits investors seeking a central, lifestyle-oriented market with balanced income and growth, provided asset-level due diligence is rigorous.',
  price_per_sqm_eur_min = 5800,
  price_per_sqm_eur_max = 10000,
  price_per_sqm_usd_min = 6632,
  price_per_sqm_usd_max = 11435,
  price_per_sqm_gbp_min = 4936,
  price_per_sqm_gbp_max = 8510,
  rental_yield_min = 3.6,
  rental_yield_max = 5.1,
  days_to_rent_avg = 21,
  acquisition_tax = 6.8,
  avg_holding_time = 7,
  days_available_to_rent = 22,
  avg_days_on_market_sale = 75,
  rent_per_sqm_eur = 325,
  rent_per_sqm_usd = 372,
  rent_per_sqm_gbp = 277,
  price_growth_5y = '[4.0, 3.5, 2.5, 0.4, 3.1]'::jsonb,
  rental_growth_5y = '[-1.0, 32.0, 15.0, 5.0, 2.0]'::jsonb,
  avg_rental_time = 11
WHERE id = 6;

-- Update Dubai Marina (ID: 7)
UPDATE neighborhoods
SET
  description = 'Dubai Marina is a highly liquid waterfront apartment market with established infrastructure, metro and tram access, extensive leisure amenities and consistent expatriate demand. Its broad tower inventory supports frequent transactions and diverse entry points, while furnished and conventional leases can generate attractive gross yields. Performance differs sharply by building, view, floor, unit efficiency and proximity to transport or the beach. Service charges, traffic congestion, short-term rental competition and ageing tower maintenance can materially reduce net returns. Investors should prioritize buildings with strong management, efficient layouts and credible reserve funds. Dubai Marina suits income-focused investors seeking liquidity and international tenant demand within a mature freehold community.',
  price_per_sqm_eur_min = 4400,
  price_per_sqm_eur_max = 8500,
  price_per_sqm_usd_min = 5031,
  price_per_sqm_usd_max = 9720,
  price_per_sqm_gbp_min = 3744,
  price_per_sqm_gbp_max = 7233,
  rental_yield_min = 5.5,
  rental_yield_max = 7.0,
  days_to_rent_avg = 18,
  acquisition_tax = 4.0,
  avg_holding_time = 7,
  days_available_to_rent = 20,
  avg_days_on_market_sale = 45,
  rent_per_sqm_eur = 336,
  rent_per_sqm_usd = 384,
  rent_per_sqm_gbp = 286,
  price_growth_5y = '[13.0, 18.0, 17.0, 19.0, 6.0]'::jsonb,
  rental_growth_5y = '[8.0, 24.0, 20.0, 12.0, 6.0]'::jsonb,
  avg_rental_time = 12
WHERE id = 7;

-- Update Downtown Dubai (ID: 8)
UPDATE neighborhoods
SET
  description = 'Downtown Dubai is the emirate''s flagship urban district, anchored by the Burj Khalifa, Dubai Mall and a concentration of luxury hospitality, offices and branded residences. It attracts affluent residents, corporate tenants and global investors, supporting strong liquidity and premium rents for well-positioned units. Landmark views, building reputation, floor height and walking access create wide price dispersion. Acquisition costs and service charges are high, while yields are generally below those of more value-oriented Dubai communities. New branded supply and cyclical international demand can increase volatility. Downtown is best suited to investors seeking globally recognizable assets, capital preservation and premium tenant profiles rather than maximum cash-on-cash income.',
  price_per_sqm_eur_min = 6500,
  price_per_sqm_eur_max = 13000,
  price_per_sqm_usd_min = 7433,
  price_per_sqm_usd_max = 14866,
  price_per_sqm_gbp_min = 5531,
  price_per_sqm_gbp_max = 11063,
  rental_yield_min = 4.8,
  rental_yield_max = 6.3,
  days_to_rent_avg = 20,
  acquisition_tax = 4.0,
  avg_holding_time = 7,
  days_available_to_rent = 22,
  avg_days_on_market_sale = 50,
  rent_per_sqm_eur = 464,
  rent_per_sqm_usd = 531,
  rent_per_sqm_gbp = 395,
  price_growth_5y = '[12.0, 14.0, 18.0, 14.0, 11.6]'::jsonb,
  rental_growth_5y = '[7.0, 20.0, 18.0, 10.0, 7.0]'::jsonb,
  avg_rental_time = 12
WHERE id = 8;

-- Update Palm Jumeirah (ID: 9)
UPDATE neighborhoods
SET
  description = 'Palm Jumeirah is Dubai''s leading trophy residential market, offering beachfront apartments, villas, branded residences and resort infrastructure. Scarce waterfront positioning and sustained demand from high-net-worth international buyers have produced exceptional appreciation, especially for renovated villas and new ultra-prime schemes. Rental demand is strong but highly segmented, with returns dependent on property type, beach access, view, condition and brand. Entry prices, service charges and refurbishment costs are substantial, and liquidity can weaken for oversized or incorrectly priced assets. Future performance may be more cyclical after recent gains. The Palm suits investors prioritizing prestige, scarcity and long-term wealth storage with tolerance for higher ticket sizes.',
  price_per_sqm_eur_min = 7500,
  price_per_sqm_eur_max = 20000,
  price_per_sqm_usd_min = 8576,
  price_per_sqm_usd_max = 22870,
  price_per_sqm_gbp_min = 6382,
  price_per_sqm_gbp_max = 17020,
  rental_yield_min = 4.2,
  rental_yield_max = 6.0,
  days_to_rent_avg = 28,
  acquisition_tax = 4.0,
  avg_holding_time = 8,
  days_available_to_rent = 30,
  avg_days_on_market_sale = 75,
  rent_per_sqm_eur = 443,
  rent_per_sqm_usd = 507,
  rent_per_sqm_gbp = 377,
  price_growth_5y = '[25.0, 20.0, 18.0, 20.0, 26.7]'::jsonb,
  rental_growth_5y = '[10.0, 25.0, 22.0, 15.0, 9.0]'::jsonb,
  avg_rental_time = 14
WHERE id = 9;

-- Update Business Bay (ID: 10)
UPDATE neighborhoods
SET
  description = 'Business Bay is a central mixed-use district adjoining Downtown Dubai, with dense residential, office, hotel and retail development around the canal. It attracts professionals and corporate tenants and offers comparatively accessible entry prices, strong leasing velocity and attractive apartment yields. Connectivity and proximity to major employment centers support long-term demand, while newer branded projects are upgrading the area''s investment profile. However, tower quality, service charges, traffic access and unit efficiency vary considerably, and a substantial development pipeline can constrain rental or resale growth in weaker buildings. Business Bay suits active investors seeking income and liquidity, provided selection emphasizes proven management, practical layouts and defensible micro-locations.',
  price_per_sqm_eur_min = 4800,
  price_per_sqm_eur_max = 9500,
  price_per_sqm_usd_min = 5489,
  price_per_sqm_usd_max = 10863,
  price_per_sqm_gbp_min = 4085,
  price_per_sqm_gbp_max = 8084,
  rental_yield_min = 5.4,
  rental_yield_max = 7.5,
  days_to_rent_avg = 16,
  acquisition_tax = 4.0,
  avg_holding_time = 6,
  days_available_to_rent = 18,
  avg_days_on_market_sale = 40,
  rent_per_sqm_eur = 346,
  rent_per_sqm_usd = 396,
  rent_per_sqm_gbp = 294,
  price_growth_5y = '[10.0, 16.0, 20.0, 18.0, 9.3]'::jsonb,
  rental_growth_5y = '[8.0, 22.0, 20.0, 12.0, 8.0]'::jsonb,
  avg_rental_time = 12
WHERE id = 10;

-- Update Jumeirah Beach Residence (ID: 11)
UPDATE neighborhoods
SET
  description = 'Jumeirah Beach Residence is an established beachfront high-rise community combining direct beach access, The Walk, restaurants, hotels and proximity to Dubai Marina. It attracts expatriate families, professionals and holiday-oriented tenants, supporting both annual and furnished rental strategies. Sea views, renovated interiors and convenient parking command premiums, while well-priced apartments can remain relatively liquid. Many towers are now mature, making building management, façade condition, service charges, lift performance and reserve funding central to due diligence. Congestion and competition from newer beachfront developments are additional risks. JBR suits investors seeking recognizable waterfront exposure, dependable tenant demand and moderate-to-strong income within an established community.',
  price_per_sqm_eur_min = 4300,
  price_per_sqm_eur_max = 8500,
  price_per_sqm_usd_min = 4917,
  price_per_sqm_usd_max = 9720,
  price_per_sqm_gbp_min = 3659,
  price_per_sqm_gbp_max = 7233,
  rental_yield_min = 5.0,
  rental_yield_max = 6.6,
  days_to_rent_avg = 19,
  acquisition_tax = 4.0,
  avg_holding_time = 7,
  days_available_to_rent = 22,
  avg_days_on_market_sale = 50,
  rent_per_sqm_eur = 302,
  rent_per_sqm_usd = 345,
  rent_per_sqm_gbp = 257,
  price_growth_5y = '[12.0, 15.0, 18.0, 14.0, -4.6]'::jsonb,
  rental_growth_5y = '[7.0, 20.0, 18.0, 10.0, 4.0]'::jsonb,
  avg_rental_time = 12
WHERE id = 11;

-- Update Ribeira (ID: 12)
UPDATE neighborhoods
SET
  description = 'Ribeira is Porto''s landmark historic waterfront district, with UNESCO-listed urban fabric, exceptional tourism visibility and highly constrained residential supply. Character apartments can attract international buyers and premium tenants, while river views and professionally renovated interiors command substantial premiums. Investment outcomes depend heavily on access, natural light, floor level, structural condition and licensing. Many buildings lack lifts or parking and may require complex conservation works, increasing capital expenditure and execution risk. Short-term rental rules and condominium documentation must be verified for each asset. Ribeira is best suited to specialist investors pursuing scarcity, renovation-led value creation and long-term appreciation rather than standardized, low-maintenance residential income.',
  price_per_sqm_eur_min = 4200,
  price_per_sqm_eur_max = 7500,
  price_per_sqm_usd_min = 4803,
  price_per_sqm_usd_max = 8576,
  price_per_sqm_gbp_min = 3574,
  price_per_sqm_gbp_max = 6382,
  rental_yield_min = 4.3,
  rental_yield_max = 6.0,
  days_to_rent_avg = 24,
  acquisition_tax = 6.8,
  avg_holding_time = 8,
  days_available_to_rent = 26,
  avg_days_on_market_sale = 90,
  rent_per_sqm_eur = 263,
  rent_per_sqm_usd = 301,
  rent_per_sqm_gbp = 224,
  price_growth_5y = '[4.0, 7.0, 3.0, 6.0, -1.5]'::jsonb,
  rental_growth_5y = '[5.0, 45.0, 10.0, 4.0, -3.0]'::jsonb,
  avg_rental_time = 13
WHERE id = 12;

-- Update Foz do Douro (ID: 13)
UPDATE neighborhoods
SET
  description = 'Foz do Douro is Porto''s premier coastal residential market, combining Atlantic frontage, established schools, high-quality amenities and strong demand from affluent families and international residents. Large apartments, houses, terraces, parking and unobstructed sea views are scarce and support long-term capital preservation. The tenant base is stable and quality focused, although acquisition prices compress gross yields compared with central or emerging districts. Liquidity is strongest for modern, well-located properties and weaker for oversized or renovation-intensive assets. Coastal exposure, condominium costs and energy performance require assessment. Foz suits investors prioritizing defensive value, lifestyle appeal and patient appreciation over high initial rental income.',
  price_per_sqm_eur_min = 4000,
  price_per_sqm_eur_max = 7500,
  price_per_sqm_usd_min = 4574,
  price_per_sqm_usd_max = 8576,
  price_per_sqm_gbp_min = 3404,
  price_per_sqm_gbp_max = 6382,
  rental_yield_min = 3.2,
  rental_yield_max = 4.6,
  days_to_rent_avg = 30,
  acquisition_tax = 6.8,
  avg_holding_time = 9,
  days_available_to_rent = 28,
  avg_days_on_market_sale = 100,
  rent_per_sqm_eur = 197,
  rent_per_sqm_usd = 225,
  rent_per_sqm_gbp = 168,
  price_growth_5y = '[6.0, 8.0, 7.0, 9.0, 14.4]'::jsonb,
  rental_growth_5y = '[3.0, 25.0, 8.0, 2.0, 1.4]'::jsonb,
  avg_rental_time = 15
WHERE id = 13;

-- Update Boavista (ID: 14)
UPDATE neighborhoods
SET
  description = 'Boavista is a broad, established Porto investment corridor centered on the city''s principal business and cultural avenue. It combines offices, hospitals, schools, retail, transport links and varied residential stock, producing dependable demand from professionals, families and corporate tenants. Modern apartments with parking and efficient layouts generally lease quickly, while selected renovation opportunities offer value creation. Pricing and building quality vary substantially between prime avenue locations, residential side streets and peripheral sections, so micro-location analysis is essential. Infrastructure improvements support long-term prospects, but traffic and construction can affect specific assets. Boavista suits balanced investors seeking liquidity, stable occupancy and moderate growth at a discount to Porto''s coastal prime market.',
  price_per_sqm_eur_min = 3500,
  price_per_sqm_eur_max = 6500,
  price_per_sqm_usd_min = 4002,
  price_per_sqm_usd_max = 7433,
  price_per_sqm_gbp_min = 2978,
  price_per_sqm_gbp_max = 5531,
  rental_yield_min = 4.0,
  rental_yield_max = 5.6,
  days_to_rent_avg = 22,
  acquisition_tax = 6.8,
  avg_holding_time = 8,
  days_available_to_rent = 22,
  avg_days_on_market_sale = 75,
  rent_per_sqm_eur = 211,
  rent_per_sqm_usd = 241,
  rent_per_sqm_gbp = 180,
  price_growth_5y = '[4.5, 8.0, 4.5, 8.0, 5.0]'::jsonb,
  rental_growth_5y = '[5.0, 35.0, 9.0, 3.0, 2.0]'::jsonb,
  avg_rental_time = 12
WHERE id = 14;

-- Update Cedofeita (ID: 15)
UPDATE neighborhoods
SET
  description = 'Cedofeita is a central Porto neighborhood with a strong creative identity, independent retail, galleries, universities, hospitals and walkable access to the historic core. It attracts students, young professionals, international residents and owner-occupiers, supporting resilient rental demand and comparatively strong leasing velocity. Renovated apartments in well-managed buildings can combine attractive income with long-term appreciation, while unrenovated stock offers selective value-add potential. Street noise, tourism exposure, lack of parking and variable structural quality can materially affect performance. Recent rent volatility also argues for conservative underwriting. Cedofeita suits investors seeking a central, diversified tenant base and balanced income-growth exposure rather than ultra-prime capital preservation.',
  price_per_sqm_eur_min = 3800,
  price_per_sqm_eur_max = 6500,
  price_per_sqm_usd_min = 4345,
  price_per_sqm_usd_max = 7433,
  price_per_sqm_gbp_min = 3234,
  price_per_sqm_gbp_max = 5531,
  rental_yield_min = 4.2,
  rental_yield_max = 5.9,
  days_to_rent_avg = 19,
  acquisition_tax = 6.8,
  avg_holding_time = 7,
  days_available_to_rent = 20,
  avg_days_on_market_sale = 65,
  rent_per_sqm_eur = 224,
  rent_per_sqm_usd = 256,
  rent_per_sqm_gbp = 191,
  price_growth_5y = '[3.9, 8.6, 4.0, 8.2, 3.5]'::jsonb,
  rental_growth_5y = '[6.0, 58.9, 7.7, 0.9, -2.6]'::jsonb,
  avg_rental_time = 12
WHERE id = 15;

COMMIT;

-- Verification query (optional - run after the updates)
-- SELECT id, name, city_name, price_per_sqm_eur_min, rental_yield_min, rental_yield_max FROM neighborhoods ORDER BY id;
