# Fix Teflon Tenant Design Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `teflon.vase.ar` resolve and render the Teflon storefront instead of inheriting PIQUIM defaults.

**Architecture:** Tenant identity must come from the request host in production storefronts, while editor/admin calls may keep using the selected tenant from local storage. PIQUIM-specific UI should only activate for the PIQUIM tenant, not merely because stale settings contain `design_preset: "piquim"`.

**Tech Stack:** Vite React frontend, Express tenant middleware, Docker multi-stage build, Node test runner for pure utility tests.

---

### Task 1: Tenant Branding Rules

**Files:**
- Create: `web/src/utils/tenantBranding.js`
- Create: `web/src/utils/tenantBranding.test.js`
- Modify: `web/src/context/TenantContext.jsx`
- Modify: `web/src/hooks/admin/useEditorState.js`
- Modify: `web/src/pages/admin/evolution/EvolutionAdmin.jsx`

- [ ] **Step 1: Write failing tests**

Run `node --test src/utils/tenantBranding.test.js` from `web`. Expected first failure: missing `tenantBranding.js`.

- [ ] **Step 2: Implement utility**

Add helpers that detect PIQUIM only from tenant/name/slug identity, infer `sanitarios_industrial` for Teflon, and sanitize stale `design_preset: "piquim"` when the tenant is not PIQUIM.

- [ ] **Step 3: Wire utility**

Use the helpers in the tenant context and admin editor so storefront/layout/editor page-key selection uses the resolved preset.

### Task 2: Tenant Header Source

**Files:**
- Modify: `web/src/utils/api.js`
- Modify: `Dockerfile`

- [ ] **Step 1: Stop baking PIQUIM tenant**

Change Docker `ARG VITE_TENANT_ID` default to blank.

- [ ] **Step 2: Restrict env tenant header**

Only use `VITE_TENANT_ID` automatically on localhost/dev or when an explicit force env is enabled. Production storefront domains should omit `X-Tenant-Id` and let the backend resolve by host.

### Task 3: Storefront Defaults

**Files:**
- Modify: `web/src/data/defaultSections.js`
- Modify: `web/src/context/TenantContext.jsx`

- [ ] **Step 1: Make generic defaults Teflon**

Replace `DEFAULT_HOME_SECTIONS` and `DEFAULT_ABOUT_SECTIONS` copy/assets/styles with sanitarios/Teflon defaults. Keep `PIQUIM_HOME_SECTIONS` and `PIQUIM_ABOUT_SECTIONS` unchanged.

- [ ] **Step 2: Make context defaults neutral/Teflon**

Stop using PIQUIM footer/catalog/contact as the default for every tenant. Use PIQUIM defaults only when the resolved tenant identity is PIQUIM.

### Task 4: Verification

**Files:**
- Test/build only.

- [ ] **Step 1: Red-green utility tests**

Run `node --test src/utils/tenantBranding.test.js`.

- [ ] **Step 2: Build frontend**

Run `npm run build` from `web`.

- [ ] **Step 3: Syntax check server**

Run `node --check src/middleware/tenant.js` from `server`.
