# Teflon FTP/HTTP Integration Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port FTP image sync and HTTP image upload integrations from `Proyecto-Teflon` to Piquim without affecting Piquim storefront text.

**Architecture:** Reuse Teflon backend services and routes, wire them into Piquim's existing integration API, and preserve the current Piquim admin UI unless technical endpoint fields need alignment.

**Tech Stack:** Node.js, Express, PostgreSQL, Multer, JWT, basic-ftp, React/Vite admin panel.

---

### Task 1: Add backend upload primitives

**Files:**
- Create: `server/src/services/uploadPublicUrl.js`
- Create: `server/src/services/uploadsService.js`
- Create: `server/src/routes/uploads.js`
- Modify: `server/src/app.js`
- Modify: `server/package.json`
- Modify: `server/package-lock.json`

- [ ] Add the upload URL helper and uploads service from `Proyecto-Teflon`.
- [ ] Mount `uploadsRouter` at `/api/uploads` behind `authenticate`.
- [ ] Add `basic-ftp` to server dependencies.

### Task 2: Add integration image endpoints

**Files:**
- Create: `server/src/services/integrationFtpImages.service.js`
- Modify: `server/src/controllers/integration.controller.js`
- Modify: `server/src/routes/integrations.js`
- Modify: `server/src/services/integrationManifest.js`

- [ ] Add FTP image sync service.
- [ ] Add HTTP image upload controller.
- [ ] Add FTP sync controllers for API key and legacy compatibility routes.
- [ ] Add Multer memory upload handling for `/api/v1/integrations/images/upload`.
- [ ] Add schema/manifest fields for upload and FTP sync endpoints.

### Task 3: Preserve Piquim content

**Files:**
- Inspect only unless needed: `web/src/components/admin/evolution/IntegrationsEditor.jsx`
- Do not modify: `web/src/data/defaultSections.js`, `db/seed.sql`, storefront text files.

- [ ] Confirm the admin integrations panel already reads endpoint fields from the manifest.
- [ ] Avoid copying storefront or seed text from Teflon.

### Task 4: Verify

**Files:**
- Verify only

- [ ] Run `npm install` in `server` to update dependency lockfile.
- [ ] Run `npm run build` in `web`.
- [ ] Run a Node import smoke test for changed backend modules.

