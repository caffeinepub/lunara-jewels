# Specification

## Summary
**Goal:** Ensure the Shop collection grid ("Our Collection") always displays all 20 products by default.

**Planned changes:**
- Update `frontend/src/pages/ShopPage.tsx` so the collection grid renders all 20 product cards (no slicing/pagination) when the catalog contains 20 items.
- Update `frontend/src/hooks/useProducts.ts` to prevent actor/query initialization states from resulting in fewer than 20 displayed products by using `sampleProducts` as a fallback during loading/unavailable backend states.
- If backend returns fewer than 20 products (including empty/invalid results), merge in items from `frontend/src/data/sampleProducts.ts` to fill to 20 while avoiding duplicate IDs and preserving existing image URL normalization for backend items.

**User-visible outcome:** Visitors to "Our Collection" see a full 20-item product grid reliably—using backend products when available, or the 20 fallback products (or a filled-to-20 merge) when backend data is unavailable or incomplete.
