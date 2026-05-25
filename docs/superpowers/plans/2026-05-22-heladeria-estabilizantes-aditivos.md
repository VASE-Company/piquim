# Heladeria Estabilizantes Aditivos Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mostrar Estabilizantes y Aditivos como grupos principales del catalogo Heladeria, con categorias internas desplegadas.

**Architecture:** Declarar la taxonomia especial en `piquimSubcatalogs.js` y hacer que `CatalogPage.jsx` use esa taxonomia solo cuando el catalogo seleccionado la define.

**Tech Stack:** React 18, Vite, Tailwind.

---

### Task 1: Taxonomia Heladeria

**Files:**
- Modify: `web/src/data/piquimSubcatalogs.js`

- [ ] Agregar `productGroups` a Heladeria con Estabilizantes y Aditivos.
- [ ] Reducir el filtro principal de Heladeria a esos dos grupos.
- [ ] Cambiar el segundo filtro de Heladeria a Categoria.

### Task 2: Render agrupado

**Files:**
- Modify: `web/src/pages/store/CatalogPage.jsx`

- [ ] Clasificar productos con la taxonomia especial cuando exista.
- [ ] Usar los grupos principales para el primer filtro.
- [ ] Usar categorias internas para el segundo filtro.
- [ ] Renderizar secciones principales con subsecciones internas.

### Task 3: Verify

**Files:**
- Verify only

- [ ] Run `npm run build` in `web`.
- [ ] Confirm changed references with `rg`.
