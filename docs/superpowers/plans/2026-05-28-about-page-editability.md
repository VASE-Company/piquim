# About Page Editability & Standardization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Standardize the Piquim About Us page using the standard editable `About*` components configured with Piquim branding, and package the changes into a deployment ZIP.

**Architecture:** We will implement standard components (`AboutHero`, `AboutMission`, `AboutStats`, `AboutValues`, `AboutTeam`, and `AboutCTA`) under `PIQUIM_ABOUT_SECTIONS`, update the allowed section lists in the storefront (`AboutPage.jsx`) and the editor (`PageSectionsEditor.jsx`), write a unit test to verify standard types are mapped correctly, and automate ZIP packaging.

**Tech Stack:** React, Vite, Node.js (with built-in test runner `node:test`).

---

### Task 1: Add Failing Test for About Page Default Sections

**Files:**
- Create: `web/src/data/defaultSections.test.js`

- [ ] **Step 1: Write the failing test**
Create `web/src/data/defaultSections.test.js` with the following content:
```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { PIQUIM_ABOUT_SECTIONS } from './defaultSections.js';

test('PIQUIM_ABOUT_SECTIONS has standard About sections instead of PiquimHero/PiquimTresMundos', () => {
    const types = PIQUIM_ABOUT_SECTIONS.map((section) => section.type);
    assert.deepEqual(types, [
        'AboutHero',
        'AboutMission',
        'AboutStats',
        'AboutValues',
        'AboutTeam',
        'AboutCTA'
    ]);
});
```

- [ ] **Step 2: Run test to verify it fails**
Run: `node web/src/data/defaultSections.test.js`
Expected: FAIL due to mismatched section types (PiquimHero, PiquimAnnounceBar, etc. instead of AboutHero, AboutMission, etc.).

- [ ] **Step 3: Commit**
```bash
git add web/src/data/defaultSections.test.js
git commit -m "test: add failing test for Piquim about sections standardization"
```

---

### Task 2: Standardize default sections with custom Piquim branding

**Files:**
- Modify: `web/src/data/defaultSections.js`
- Test: `web/src/data/defaultSections.test.js`

- [ ] **Step 1: Update PIQUIM_ABOUT_SECTIONS in defaultSections.js**
Modify lines of `web/src/data/defaultSections.js` that define `PIQUIM_ABOUT_SECTIONS`. Replace it with the following:
```javascript
export const PIQUIM_ABOUT_SECTIONS = [
    {
        id: 'piquim-about-hero',
        type: 'AboutHero',
        enabled: true,
        props: {
            tagline: 'Piquim Profesional',
            title: 'Materia prima premium para tu obrador',
            description: 'Acompañamos a heladerías, panaderías y confiterías con productos estables y soporte técnico comercial.',
            primaryButton: { label: 'Ver catálogo', link: '/catalog' },
            secondaryButton: { label: 'Contactar ventas', link: '/about' },
            backgroundImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop',
            styles: {
                accentColor: '#ff4d00',
                overlayColor: '#1a1614',
                overlayOpacity: 0.8,
                textColor: '#fffaf6',
                mutedColor: 'rgba(255,250,246,0.85)',
            },
        },
    },
    {
        id: 'piquim-about-mission',
        type: 'AboutMission',
        enabled: true,
        props: {
            eyebrow: 'Cómo trabajamos',
            title: 'Dos mundos, una misma calidad constante.',
            paragraphs: [
                'En Piquim organizamos nuestro catálogo para que cada maestro heladero y pastelero pueda encontrar bases, pulpas, mejoradores e insumos esenciales de manera ágil.',
                'Acompañamos a negocios y fábricas de alimentos en Mar del Plata y la región para asegurar que su producción diaria mantenga siempre el mejor estándar.',
            ],
            highlights: [
                { icon: 'verified', title: 'Fórmula certificada', text: 'Insumos que rinden y garantizan uniformidad en cada receta.' },
                { icon: 'eco', title: 'Soporte de obrador', text: 'Asesoramiento técnico para optimizar tus procesos de elaboración.' },
            ],
            image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop',
            imageAlt: 'Elaboración artesanal en obrador',
            styles: {
                accentColor: '#ff4d00',
                backgroundColor: '#ffffff',
                textColor: '#1a1614',
                mutedColor: '#6f625d',
            },
        },
    },
    {
        id: 'piquim-about-stats',
        type: 'AboutStats',
        enabled: true,
        props: {
            items: [
                { value: '+30', label: 'años de trayectoria', accent: true },
                { value: '+200', label: 'productos en catálogo' },
                { value: '2', label: 'rubros especializados' },
                { value: 'Mar del Plata', label: 'origen y distribución' },
            ],
            styles: {
                backgroundColor: '#1a1614',
                accentColor: '#ff4d00',
                textColor: '#ffffff',
                mutedColor: '#fffaf6',
            },
        },
    },
    {
        id: 'piquim-about-values',
        type: 'AboutValues',
        enabled: true,
        props: {
            title: 'Nuestros pilares',
            items: [
                {
                    icon: 'quality',
                    title: 'Calidad constante',
                    description: 'Cada lote entregado respeta las especificaciones de rendimiento y sabor esperadas.',
                },
                {
                    icon: 'commitment',
                    title: 'Compromiso de entrega',
                    description: 'Entendemos los tiempos de producción y coordinamos repartos para evitar quiebres de stock.',
                },
                {
                    icon: 'innovation',
                    title: 'Innovación en recetas',
                    description: 'Buscamos y traemos las últimas tendencias en bases y aditivos para la industria del dulce.',
                },
            ],
            styles: {
                backgroundColor: '#fffaf6',
                cardBackground: '#ffffff',
                accentColor: '#ff4d00',
                textColor: '#1a1614',
                mutedColor: '#6f625d',
            },
        },
    },
    {
        id: 'piquim-about-team',
        type: 'AboutTeam',
        enabled: true,
        props: {
            anchor: 'equipo',
            title: 'Detrás de cada gran receta hay materias primas confiables.',
            quote: 'Trabajamos codo a codo con maestros pasteleros y fabricantes de helados para asegurar que sus materias primas nunca sean una preocupación.',
            author: 'El Equipo de Piquim',
            role: 'Operaciones e Insumos Profesionales',
            avatarImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80&auto=format&fit=crop',
            backgroundImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop',
            styles: {
                backgroundColor: '#ffffff',
                overlayColor: '#1a1614',
                overlayOpacity: 0.34,
                textColor: '#1a1614',
            },
        },
    },
    {
        id: 'piquim-about-cta',
        type: 'AboutCTA',
        enabled: true,
        props: {
            title: '¿Querés optimizar la materia prima de tu producción?',
            primaryLink: { label: 'Ver catálogo', link: '/catalog' },
            secondaryLink: { label: 'Hablar con ventas', link: '/about' },
            styles: {
                backgroundColor: '#ffffff',
                accentColor: '#ff4d00',
                textColor: '#1a1614',
                mutedColor: '#6f625d',
            },
        },
    },
];
```

- [ ] **Step 2: Run test to verify it passes**
Run: `node web/src/data/defaultSections.test.js`
Expected: PASS

- [ ] **Step 3: Commit**
```bash
git add web/src/data/defaultSections.js
git commit -m "feat: standardize piquim default about sections"
```

---

### Task 3: Update Allowed Section Types in Storefront AboutPage

**Files:**
- Modify: `web/src/pages/store/AboutPage.jsx:9-15`

- [ ] **Step 1: Replace PIQUIM_ABOUT_SECTION_TYPES in AboutPage.jsx**
Replace lines 9-15 of `web/src/pages/store/AboutPage.jsx`:
```javascript
const PIQUIM_ABOUT_SECTION_TYPES = new Set([
    'PiquimHero',
    'PiquimAnnounceBar',
    'PiquimTresMundos',
    'PiquimCatalog3Panel',
    'PiquimCTABanner',
]);
```
with:
```javascript
const PIQUIM_ABOUT_SECTION_TYPES = new Set([
    'AboutHero',
    'AboutMission',
    'AboutStats',
    'AboutValues',
    'AboutTeam',
    'AboutCTA',
]);
```

- [ ] **Step 2: Commit**
```bash
git add web/src/pages/store/AboutPage.jsx
git commit -m "feat: allow standard about sections in piquim store about page"
```

---

### Task 4: Update Allowed Section Types in Admin PageSectionsEditor

**Files:**
- Modify: `web/src/components/admin/evolution/PageSectionsEditor.jsx:38-44`

- [ ] **Step 1: Replace PIQUIM_ABOUT_SECTION_TYPES in PageSectionsEditor.jsx**
Replace lines 38-44 of `web/src/components/admin/evolution/PageSectionsEditor.jsx`:
```javascript
const PIQUIM_ABOUT_SECTION_TYPES = [
    { type: 'PiquimHero', label: 'Portada Piquim' },
    { type: 'PiquimAnnounceBar', label: 'Barra Anuncio' },
    { type: 'PiquimTresMundos', label: 'Nosotros Piquim' },
    { type: 'PiquimCatalog3Panel', label: 'Lineas Piquim' },
    { type: 'PiquimCTABanner', label: 'CTA Piquim' },
];
```
with:
```javascript
const PIQUIM_ABOUT_SECTION_TYPES = [
    { type: 'AboutHero', label: 'Portada Sobre Nosotros' },
    { type: 'AboutMission', label: 'Mision' },
    { type: 'AboutStats', label: 'Numeros' },
    { type: 'AboutValues', label: 'Valores' },
    { type: 'AboutTeam', label: 'Equipo' },
    { type: 'AboutCTA', label: 'Llamada a la Accion' },
];
```

- [ ] **Step 2: Commit**
```bash
git add web/src/components/admin/evolution/PageSectionsEditor.jsx
git commit -m "feat: enable standard about sections in piquim admin page sections editor"
```

---

### Task 5: Build Verification and ZIP Packaging

**Files:**
- Create: `c:\Users\10\Documents\GitHub\piquim.zip` (overwrite/update)

- [ ] **Step 1: Verify production build compiles**
Run: `npm run build` inside `web` directory to make sure Vite compiles everything with no errors.
Run: `cd web; npm run build; cd ..`
Expected: Successful bundle generation with no syntax or compiler errors.

- [ ] **Step 2: Create deploy ZIP**
Create the deploy ZIP at `c:\Users\10\Documents\GitHub\piquim.zip` using PowerShell `Compress-Archive` or an equivalent utility, excluding heavy files (e.g. `node_modules`, `.git`, `.gemini`, `tmp`).
Run the following PowerShell command:
```powershell
Remove-Item -Path "c:\Users\10\Documents\GitHub\piquim.zip" -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path "c:\Users\10\Documents\GitHub\piquim" -Exclude "node_modules", ".git", ".gemini", "chrome-profile" | Compress-Archive -DestinationPath "c:\Users\10\Documents\GitHub\piquim.zip" -Force
```

- [ ] **Step 3: Commit**
```bash
git commit --allow-empty -m "build: verify compilation and create deploy zip"
```
