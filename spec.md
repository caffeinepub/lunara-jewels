# Lunara Jewels

## Current State
The shop page displays all products fetched from the backend. The backend has 20 hardcoded products in the `products` map. The frontend ShopPage shows products in a grid with Men/Women/All tabs and a search bar.

## Requested Changes (Diff)

### Add
- Nothing to add

### Modify
- Backend: Clear all products from the `products` map so it starts empty
- Frontend: Update ShopPage to handle empty collection gracefully with a friendly empty-state message

### Remove
- All 20 hardcoded products from the backend products map

## Implementation Plan
1. Regenerate backend with an empty products map (no seed products)
2. Update frontend ShopPage empty state to show a friendly "Collection coming soon" message instead of the search-related empty state when there are no products at all
