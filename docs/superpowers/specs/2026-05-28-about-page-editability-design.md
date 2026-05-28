# Design Spec: About Page Editability & Standardization for Piquim

This document details the design for migrating the Piquim "About Us" page structure from a Home-like mirrored layout to the standard About blocks structure (`AboutHero`, `AboutMission`, `AboutStats`, `AboutValues`, `AboutTeam`, and `AboutCTA`), enabling full content customization and editing via the admin panel.

## Goal
Resolve content mirroring on the Piquim "About Us" page, aligning its structure with the standardized "Sanitarios Teflon" implementation using custom Piquim copy and brand colors, and ensuring full editability within the admin page sections editor.

## Proposed Design

### 1. Default Sections Definition (`defaultSections.js`)
We will modify `web/src/data/defaultSections.js` to change `PIQUIM_ABOUT_SECTIONS` so it maps to the standard `About*` components, pre-configured with Piquim's brand attributes:
* **Brand Accent**: `#ff4d00` / `#ff7a2f`
* **Text Tone**: Focus on raw materials premium quality (heladería, pastelería, confitería).

#### Draft of the new `PIQUIM_ABOUT_SECTIONS` configuration:
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

### 2. Allowed Section Types updates (`AboutPage.jsx`)
Update the `PIQUIM_ABOUT_SECTION_TYPES` set in `web/src/pages/store/AboutPage.jsx` to list:
* `AboutHero`
* `AboutMission`
* `AboutStats`
* `AboutValues`
* `AboutTeam`
* `AboutCTA`

This ensures the storefront loader filters and accepts the new components for the `piquim-about` key.

### 3. Editor UI Options updates (`PageSectionsEditor.jsx`)
Update `PIQUIM_ABOUT_SECTION_TYPES` array in `web/src/components/admin/evolution/PageSectionsEditor.jsx` to:
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
This enables the admin panel to display, add, and reorder standard about blocks for Piquim as well.

---

## Verification Plan

### Automated/Local Tests
* Ensure compilation and build succeed under Vite.
* Verify through Jest/Vitest that no branding utilities or helper tests are broken.

### Manual Verification
* Access the admin panel under the "Nosotros" tab, check that the new Piquim-adapted about sections load correctly, make an edit, save the sections, and verify that they persist in the database and render on the `/about` storefront page.
* Generate a deployment ZIP bundle containing the modified repository folder structure.
