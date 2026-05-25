# Piquim Card Images And Cart Validation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show real product images in Piquim catalog cards and prevent invalid cart items from breaking checkout validation.

**Architecture:** Keep visual logic inside `CatalogPage.jsx`, cart normalization inside `StoreContext.jsx`, and backend validation inside `checkout.js`.

**Tech Stack:** React 18, Vite, Express, PostgreSQL UUID validation.

---

### Task 1: Product Images In Piquim Cards

- [ ] Add a helper that returns only real product image URLs.
- [ ] Add `hasImage` to normalized subcatalog products.
- [ ] Render `<img>` when `hasImage` is true; otherwise render the category icon.

### Task 2: Cart Validation Guardrails

- [ ] Add UUID validation and cart item normalization to `StoreContext`.
- [ ] Ignore invalid products in `addToCart`.
- [ ] Return controlled checkout errors for invalid product IDs server-side.

### Task 3: Verify

- [ ] Run `npm run build`.
- [ ] Import `server/src/routes/checkout.js`.
- [ ] Check local HTTP responses.
