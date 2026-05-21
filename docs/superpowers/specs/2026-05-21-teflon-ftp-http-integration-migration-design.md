# Teflon FTP/HTTP Integration Migration Design

## Goal

Bring the FTP image sync and HTTP image upload integration work from `Proyecto-Teflon` into Piquim without changing Piquim storefront copy, branding, page defaults, catalog copy, or seeded business content.

## Design

The migration is selective. Backend integration capabilities from `Proyecto-Teflon` are copied into Piquim: upload service URL helpers, uploads JWT route, HTTP image upload controller, FTP image synchronization service, integration manifest fields, and integration routes.

The admin panel keeps the existing Piquim layout and copy. Only technical integration information is aligned with the migrated backend: HTTP image upload endpoint, public uploads base URL, cURL/PowerShell examples, deployment diagnostics, and legacy FTP compatibility notes.

## Scope

In scope:
- `server/package.json` and lockfile dependency for `basic-ftp`.
- `server/src/app.js` route mount for `/api/uploads`.
- New upload helper/services/routes from Teflon.
- Integration controller/routes/manifest additions for `/images/upload` and `/images/ftp/sync`.
- Admin integrations panel if a backend-exposed field is missing.

Out of scope:
- Piquim home/about/catalog content.
- Piquim branding defaults.
- Database seed copy changes.
- Replacing the entire admin panel.

