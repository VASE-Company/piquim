# Catalog Product Card Interactions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show 12 products per catalog page, make cards about 30% more compact, and let users click product cards to open product detail pages.

**Architecture:** Reuse the existing `CatalogPage.jsx` product fetch and pagination model. Keep all changes in the catalog component by changing page size, grid density, card styling, and event handling.

**Tech Stack:** React 18, Vite, Tailwind CSS utility classes, existing custom navigation helper.

---

### Task 1: Increase Catalog Page Size

**Files:**
- Modify: `web/src/pages/store/CatalogPage.jsx`

- [ ] **Step 1: Change the request limit**

Change:

```js
const limit = 9;
```

to:

```js
const limit = 12;
```

Expected behavior: `/public/products` receives `limit=12`, and `totalPages` is recalculated from 12 items per page.

### Task 2: Compact the Product Grid

**Files:**
- Modify: `web/src/pages/store/CatalogPage.jsx`

- [ ] **Step 1: Increase desktop grid density**

Change the product grid wrapper from three XL columns to four XL columns:

```jsx
<div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 xl:grid-cols-4">
```

- [ ] **Step 2: Reduce card spacing and text scale**

Update `CatalogProductCard` classes so the card uses smaller radius, padding, image hover scale, description text, price text, and action buttons.

Expected behavior: the catalog area feels roughly 30% smaller while preserving readability.

### Task 3: Make Cards Clickable and Animated

**Files:**
- Modify: `web/src/pages/store/CatalogPage.jsx`

- [ ] **Step 1: Make the article interactive**

Add `role="link"`, `tabIndex={0}`, `onClick={openProduct}`, and an Enter/Space `onKeyDown` handler to the card article.

- [ ] **Step 2: Add hover feedback**

Use stronger transition classes:

```jsx
className="group cursor-pointer overflow-hidden rounded-[14px] border shadow-sm outline-none transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 focus-visible:ring-2 focus-visible:ring-primary/40"
```

- [ ] **Step 3: Stop card navigation from internal controls**

For favorites, detail icon, variant toggle, add-to-cart, variation detail, and variation add buttons, call `event.stopPropagation()` before their existing action.

Expected behavior: clicking the card opens product detail; clicking controls performs the control action only.

### Task 4: Verify

**Files:**
- Verify only

- [ ] **Step 1: Build frontend**

Run:

```bash
cd web
npm run build
```

Expected: Vite build exits with code 0.

- [ ] **Step 2: Check catalog route responds**

Run against the existing dev server:

```powershell
Invoke-WebRequest -UseBasicParsing http://127.0.0.1:5173/catalog -TimeoutSec 5
```

Expected: HTTP 200.

