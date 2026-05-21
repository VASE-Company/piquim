# Piquim About Admin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make "Sobre nosotros" in the Piquim admin use Piquim-specific editable blocks while still saving to the existing `/about` page.

**Architecture:** Add `PIQUIM_ABOUT_SECTIONS` and a `piquim-about` page key to `defaultSections.js`. Teach the admin editor and public about page to choose `piquim-about` only for Piquim branding, while leaving backend storage unchanged.

**Tech Stack:** React 18, Vite, existing PageBuilder block system, existing tenant page APIs.

---

### Task 1: Add Piquim About Defaults

**Files:**
- Modify: `web/src/data/defaultSections.js`

- [ ] **Step 1: Add a `PIQUIM_ABOUT_SECTIONS` export**

Use existing Piquim block types with about-oriented copy:

```js
export const PIQUIM_ABOUT_SECTIONS = [
    {
        id: 'piquim-about-hero',
        type: 'PiquimHero',
        enabled: true,
        props: {
            badgeText: 'Nosotros',
            preTitle: 'Materia prima',
            titleHighlight: 'con criterio',
            postTitle: 'profesional.',
            primaryLabel: 'Ver catalogo',
            primaryHref: '/catalog',
            secondaryLabel: 'Contactar ventas',
            secondaryHref: '/about',
            statProducts: '+200',
            statCategories: '3',
            statYears: '+30',
            mediaType: 'image',
            image: '/piquim/catalog-confiteria.jpg',
            videoUrl: '',
            videoUrlDesktop: '',
            videoUrlMobile: '',
            videoPoster: '',
            videoAutoplay: true,
            videoLoop: true,
            videoMuted: true,
            videoControls: false,
        },
    },
    {
        id: 'piquim-about-announce',
        type: 'PiquimAnnounceBar',
        enabled: true,
        props: {
            text: 'HECHO EN MAR DEL PLATA · HELADERIA · PANADERIA · CONFITERIA · SOPORTE COMERCIAL',
        },
    },
    {
        id: 'piquim-about-mundos',
        type: 'PiquimTresMundos',
        enabled: true,
        props: {
            titleStart: 'Acompanamos',
            titleHighlight: 'tres mundos',
            titleEnd: 'de produccion.',
            subtitle: 'Organizamos insumos, catalogos y reposicion para que cada obrador compre con claridad.',
            leftImage: '/piquim/product-bucket.png',
            rightImage: '/piquim/product-bucket.png',
        },
    },
    {
        id: 'piquim-about-catalog',
        type: 'PiquimCatalog3Panel',
        enabled: true,
        props: {
            title: 'Lineas pensadas para trabajo diario',
            subtitle: 'Heladeria, panaderia y confiteria con lectura simple y productos listos para operar.',
            cards: PIQUIM_CATALOG_CARDS,
        },
    },
    {
        id: 'piquim-about-cta',
        type: 'PiquimCTABanner',
        enabled: true,
        props: {
            title: 'Necesitas armar un pedido para tu produccion?',
            subtitle: 'El equipo comercial de PIQUIM te acompana para elegir insumos segun receta, volumen y reposicion.',
            primaryLabel: 'Ver productos',
            primaryHref: '/catalog',
            secondaryLabel: 'Hablar con ventas',
            secondaryHref: '/about',
        },
    },
];
```

- [ ] **Step 2: Register the page key**

Add it to `DEFAULT_SECTIONS_BY_PAGE`:

```js
const DEFAULT_SECTIONS_BY_PAGE = {
    home: DEFAULT_HOME_SECTIONS,
    about: DEFAULT_ABOUT_SECTIONS,
    'piquim-home': PIQUIM_HOME_SECTIONS,
    'piquim-about': PIQUIM_ABOUT_SECTIONS,
};
```

### Task 2: Make Admin About Use Piquim Templates

**Files:**
- Modify: `web/src/components/admin/evolution/PageSectionsEditor.jsx`
- Modify: `web/src/pages/admin/evolution/EvolutionAdmin.jsx`
- Modify: `web/src/hooks/admin/useEditorState.js`

- [ ] **Step 1: Import and wire `PIQUIM_ABOUT_SECTIONS` in the editor**

In `PageSectionsEditor.jsx`, import `PIQUIM_ABOUT_SECTIONS`, add `PIQUIM_ABOUT_SECTION_TYPES`, and update `getSectionTemplate`, `getSectionTypeOptions`, and the sidebar title branch for `pageKey === 'piquim-about'`.

- [ ] **Step 2: Select `piquim-about` for Piquim branding**

In `EvolutionAdmin.jsx`, compute:

```js
const aboutEditorPageKey = isPiquimBranding(editor.settings) ? 'piquim-about' : 'about';
```

Pass that value as `pageKey` for the `about` module, while keeping `sections={editor.pageSections?.about || []}` and `onChangeSections={(nextSections) => handlePageSectionsChange('about', nextSections)}`.

- [ ] **Step 3: Normalize loaded about sections for Piquim**

In `useEditorState.js`, import `PIQUIM_ABOUT_SECTIONS`, create a Piquim type set and `normalizeAboutSectionsForBrand(settings, sections)`. If Piquim and no saved Piquim blocks exist, return `PIQUIM_ABOUT_SECTIONS`; otherwise merge with `mergeSectionsWithDefaults('piquim-about', sections)`. Non-Piquim continues to use `mergeSectionsWithDefaults('about', sections)` or `DEFAULT_ABOUT_SECTIONS`.

### Task 3: Make Public About Merge Against Piquim Defaults

**Files:**
- Modify: `web/src/pages/store/AboutPage.jsx`

- [ ] **Step 1: Detect Piquim tenant in the public page**

Use `useTenant` or available tenant settings context to choose:

```js
const pageKey = isPiquim ? 'piquim-about' : 'about';
```

- [ ] **Step 2: Use the selected page key for initial defaults and merge**

Initialize with `getDefaultSectionsForPage(pageKey)` and call `mergeSectionsWithDefaults(pageKey, data.sections)`.

### Task 4: Verify

**Files:**
- Verify only

- [ ] **Step 1: Build frontend**

Run:

```bash
cd web
npm run build
```

Expected: Vite build succeeds.

- [ ] **Step 2: Inspect modified files**

Run:

```bash
git diff -- web/src/data/defaultSections.js web/src/components/admin/evolution/PageSectionsEditor.jsx web/src/pages/admin/evolution/EvolutionAdmin.jsx web/src/hooks/admin/useEditorState.js web/src/pages/store/AboutPage.jsx
```

Expected: changes are limited to Piquim about defaults, page key selection, and normalization.

