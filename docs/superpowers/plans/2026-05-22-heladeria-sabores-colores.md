# Heladeria Sabores Colores Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar grupos de sabores/colores en Heladeria con selector modal por swatches.

**Architecture:** Extender `productGroups` en `piquimSubcatalogs.js` con paletas de sabores y agregar estado de seleccion en `CatalogPage.jsx`.

**Tech Stack:** React 18, Vite, Tailwind.

---

### Task 1: Datos de sabores

**Files:**
- Modify: `web/src/data/piquimSubcatalogs.js`

- [ ] Agregar grupos `Sabor & Color en Polvo` y `Pastas Oleosas y Frutales`.
- [ ] Definir `flavors` con `name` y `color`.
- [ ] Agregar keywords para clasificacion por producto.

### Task 2: Selector modal

**Files:**
- Modify: `web/src/pages/store/CatalogPage.jsx`

- [ ] Agregar estado `flavorFilters`.
- [ ] Filtrar productos por sabores seleccionados.
- [ ] Agregar modal con swatches y seleccion multiple desde los filtros.

### Task 3: Verify

**Files:**
- Verify only

- [ ] Run `npm run build` in `web`.
- [ ] Check `/catalog?category=heladeria`.
