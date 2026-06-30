-- Remove cities that are NOT Portugal, UK, or Dubai
-- Keep only: Portugal (Lisbon, Porto, Algarve), UK (all cities), Dubai

-- Delete non-core cities
DELETE FROM investment_locations
WHERE country_code NOT IN ('PT', 'UK', 'AE')
  AND city != 'Dubai';

-- Also remove Singapore if still present
DELETE FROM investment_locations
WHERE city = 'Singapore';

-- Verify remaining cities
-- Should have: 3 Portugal + 10 UK + 1 Dubai = 14 cities total
SELECT
  country,
  COUNT(*) as city_count,
  STRING_AGG(city, ', ' ORDER BY city) as cities
FROM investment_locations
GROUP BY country
ORDER BY country;

-- Expected output:
-- Dubai (UAE): Dubai
-- Portugal: Algarve, Lisbon, Porto
-- United Kingdom: Birmingham, Bristol, Edinburgh, Glasgow, Leeds, Liverpool, London, Manchester, Newcastle, Nottingham
