# Catalog Product Card Interactions Design

## Goal

Improve the public catalog product grid so it shows 12 products per page, uses a more compact card layout, and makes product cards feel interactive and clickable.

## Design

The catalog continues using the existing `/public/products` endpoint and existing pagination state in `CatalogPage.jsx`. The product request limit changes from 9 to 12, so each catalog page displays up to 12 products.

The grid becomes denser on large screens by using four columns instead of three, which makes the product area roughly 30% smaller per card. Card spacing, image radius, typography, and padding are reduced to match the smaller layout.

Each card becomes a keyboard-accessible clickable article. Clicking the card opens `/product/:id`; pressing Enter or Space while focused does the same. Internal controls such as favorites, cart, variant expansion, and variant detail buttons stop event propagation so they keep their existing behavior without accidentally navigating.

## Scope

This is a frontend-only change in `web/src/pages/store/CatalogPage.jsx`. No backend or product detail route changes are needed.

