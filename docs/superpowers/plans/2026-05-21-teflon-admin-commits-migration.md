# Teflon Admin Commits Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the approved admin-panel behavior from recent `Proyecto-Teflon` commits into Piquim while preserving Piquim content.

**Architecture:** Apply equivalent source changes directly to Piquim components instead of cherry-picking commits. Keep generated build output local to Piquim and avoid importing source-repo documents.

**Tech Stack:** React 18, Vite, `cmdk`, Phosphor icons, Tailwind utility classes.

---

### Task 1: Clean Integrations Admin

**Files:**
- Modify: `web/src/components/admin/evolution/IntegrationsEditor.jsx`

- [ ] Remove unused quick-test state destructuring from `manager`.
- [ ] Remove `ResultPanel`, product-sync snippets, quick-test buttons and demo sync result panels.
- [ ] Keep HTTP image upload, FTP sync, manifest, credentials and deployment diagnostics.

### Task 2: Port Product Delete Modal

**Files:**
- Modify: `web/src/components/admin/evolution/CatalogEditor.jsx`
- Modify: `web/src/pages/admin/evolution/EvolutionAdmin.jsx`
- Modify: `web/src/hooks/admin/useCatalogManager.js`

- [ ] Add `createPortal`, `Trash`, `openActionsId` and `deleteTarget`.
- [ ] Add the actions dropdown to each product card.
- [ ] Add the improved modal and Escape handling.
- [ ] Pass `catalog.handleDeleteProduct` into both `CatalogEditor` instances.
- [ ] Update `handleDeleteProduct(id, productName, options)` so `{ skipConfirm: true }` bypasses `window.confirm`.

### Task 3: Port Inspector Actions Layout

**Files:**
- Modify: `web/src/components/admin/evolution/CatalogInspectorPanel.jsx`

- [ ] Replace the compact action row with the card-style actions area.
- [ ] Keep the same handlers for stock, featured, delete and clear featured.

### Task 4: Port Command Palette Redesign

**Files:**
- Modify: `web/src/components/admin/evolution/CommandPalette.jsx`
- Modify: `web/src/components/admin/evolution/EvolutionLayout.jsx`

- [ ] Replace the old `Command` wrapper with `CommandPrimitive`.
- [ ] Add module commands, result groups, keyboard hints and dynamic search items.
- [ ] Pass `searchItems` from `EvolutionLayout` to `CommandPalette`.

### Task 5: Verify

**Files:**
- Run: `web/`

- [ ] Run `npm run build`.
- [ ] Report any warning separately from build success.
