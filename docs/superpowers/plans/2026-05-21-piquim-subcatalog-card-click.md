# Piquim Subcatalog Card Click Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Piquim subcatalog product cards open product detail while keeping the cart button as an add-to-cart action.

**Architecture:** Update the subcatalog product normalization and the `PiquimSubcatalogProductCard` component in `CatalogPage.jsx`. Keep route and navbar behavior unchanged.

**Tech Stack:** React 18, Vite, StoreContext cart/favorites helpers, Tailwind utilities.

---

### Task 1: Normalize Product Data For Actions

**Files:**
- Modify: `web/src/pages/store/CatalogPage.jsx`

- [ ] Add `sku`, `image`, and `alt` to the normalized subcatalog product object.

### Task 2: Split Card, Cart, And Favorite Actions

**Files:**
- Modify: `web/src/pages/store/CatalogPage.jsx`

- [ ] Use `useStore()` inside `PiquimSubcatalogProductCard`.
- [ ] Add `onClick`, `onKeyDown`, `role="link"`, and `tabIndex={0}` to the `article`.
- [ ] Add hover/focus classes to the `article`.
- [ ] Change the cart icon button to call `addToCart` and stop event propagation.
- [ ] Change the favorite icon button to call `toggleFavorite` and stop event propagation.

### Task 3: Verify

**Files:**
- Run: `web/`

- [ ] Run `npm run build`.
- [ ] Request `/catalog?category=heladeria` from the local dev server.
