# Piquim About Admin Design

## Goal

Make the admin module "Sobre nosotros" use a Piquim-specific editable page structure when the active tenant is Piquim, matching the Piquim admin editing experience instead of the generic About blocks.

## Design

Add a `piquim-about` page key in the frontend section defaults. It will save to the existing backend slug `about`, but the admin editor will use Piquim block templates, labels, and preview behavior when `design_preset` or branding name identifies the tenant as Piquim.

The public `/about` route will also merge loaded sections with `piquim-about` defaults for Piquim tenants, preserving saved content while filling missing props from the Piquim templates.

## Editable Blocks

The first implementation will use the existing Piquim block components and editors:

- `PiquimHero`
- `PiquimAnnounceBar`
- `PiquimTresMundos`
- `PiquimCatalog3Panel`
- `PiquimCTABanner`

These blocks already have editor support in `BlockPropertiesEditor`, so "Sobre nosotros" remains editable without adding new inspector forms.

## Scope

No backend route changes are needed. `/tenant/pages/about` and `/public/pages/about` continue to store and serve the page. The change is frontend-only and keeps non-Piquim tenants on the existing generic `about` defaults.

