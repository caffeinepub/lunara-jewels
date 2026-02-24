# Specification

## Summary
**Goal:** Add a real-time product search bar to the Shop page so customers can filter the product catalog by name or description.

**Planned changes:**
- Add a styled search input field above the product grid on the Shop page (`ShopPage.tsx`)
- Implement client-side filtering that matches products by name or description (case-insensitive) as the user types
- Display a friendly empty-state message when no products match the search query
- Clearing the input restores the full product grid
- Style the search bar to match the Lunara Jewels warm-tone theme (no blue/purple)
- Ensure the search bar is responsive on mobile viewports

**User-visible outcome:** Customers visiting the Shop page can type into a search bar to instantly filter products by name or description, and see a helpful message if nothing matches their query.
