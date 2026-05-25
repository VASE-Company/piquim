# Product Detail Breadcrumb Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Piquim-aware breadcrumbs to every product detail layout.

**Architecture:** Compute breadcrumb state once in `ProductDetail.jsx`, pass it through `layoutProps`, and render it in classic, minimal, and immersive templates. Preserve existing route behavior and navbar.

**Tech Stack:** React 18, Vite, local navigation helper, Piquim subcatalog metadata.

---

### Task 1: Pass Catalog Context From Subcatalog Cards

**Files:**
- Modify: `web/src/pages/store/CatalogPage.jsx`

- [ ] Change subcatalog product navigation to include `catalog=<slug>` and `filter=<section title>`.

### Task 2: Build Breadcrumb Items

**Files:**
- Modify: `web/src/pages/store/ProductDetail.jsx`

- [ ] Import `PIQUIM_SUBCATALOGS`.
- [ ] Add helpers to format catalog/filter labels and infer catalog context.
- [ ] Add `breadcrumbItems` to `layoutProps`.
- [ ] Replace the classic hardcoded breadcrumb with mapped items.

### Task 3: Render Breadcrumbs In Alternate Templates

**Files:**
- Modify: `web/src/pages/store/ProductDetailMinimal.jsx`
- Modify: `web/src/pages/store/ProductDetailImmersive.jsx`

- [ ] Accept `breadcrumbItems`.
- [ ] Render the breadcrumb before the product content in each layout.

### Task 4: Verify

**Files:**
- Run: `web/`

- [ ] Run `npm run build`.
- [ ] Check local HTTP responses for catalog and product URLs.
