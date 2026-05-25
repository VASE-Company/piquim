# Admin Piquim Taxonomy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar controles pre-cargados de taxonomia Piquim al inspector de producto del admin.

**Architecture:** Reutilizar `PIQUIM_SUBCATALOGS` en `CatalogInspectorPanel.jsx` y actualizar el `productDraft` local.

**Tech Stack:** React 18, Vite, Tailwind.

---

### Task 1: Importar taxonomia

**Files:**
- Modify: `web/src/components/admin/evolution/CatalogInspectorPanel.jsx`

- [ ] Importar `PIQUIM_SUBCATALOGS`.
- [ ] Crear helpers para leer/actualizar specs del draft.

### Task 2: UI Taxonomia Piquim

**Files:**
- Modify: `web/src/components/admin/evolution/CatalogInspectorPanel.jsx`

- [ ] Agregar selects para grupo y subcategoria.
- [ ] Agregar selector visual de sabores cuando el grupo tiene `flavors`.
- [ ] Actualizar `source_category_path`, `source_category` y specs.

### Task 3: Persistencia

**Files:**
- Modify: `web/src/hooks/admin/useCatalogManager.js`

- [ ] Incluir `source_category` en draft inicial, edición y payload local.
- [ ] Mantener `source_category_path`.

### Task 4: Verify

**Files:**
- Verify only

- [ ] Run `npm run build` in `web`.
