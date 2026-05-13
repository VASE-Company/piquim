# Piquim Homepage Figma Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the full Piquim homepage design from Figma (node 79:5) as PageBuilder blocks + updated Header/Footer layout components, pixel-faithful to the design.

**Architecture:** Eight new block/layout components, all registered in PageBuilder's COMPONENT_MAP and conditionally swapped in StoreLayout when `design_preset === 'piquim'`. defaultSections.js gets a new piquim-specific home sections array. No new dependencies; parallax uses a native scroll listener.

**Tech Stack:** React 18, Vite, Tailwind CSS, Gilroy font (already loaded via @font-face in index.css), Inter via Google Fonts.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `web/src/components/layout/PiquimHeader.jsx` | CREATE | Sticky pill nav — logo, links, search/cart/register |
| `web/src/components/layout/PiquimFooter.jsx` | CREATE | Dark footer — logo, columns, newsletter, legal bar |
| `web/src/components/blocks/PiquimHero.jsx` | CREATE | Hero section — headline, CTAs, stats |
| `web/src/components/blocks/PiquimAnnounceBar.jsx` | CREATE | Dark marquee bar with promo text |
| `web/src/components/blocks/PiquimTresMundos.jsx` | CREATE | "Tres Mundos" section with parallax scroll |
| `web/src/components/blocks/PiquimCatalog3Panel.jsx` | CREATE | 3-panel dark catalog (Heladería/Panadería/Confitería) |
| `web/src/components/blocks/PiquimFeaturedProducts.jsx` | CREATE | Product grid with category filter chips, API data |
| `web/src/components/blocks/PiquimCTABanner.jsx` | CREATE | Orange CTA banner "¿Listo para llevar tus recetas?" |
| `web/src/components/PageBuilder.jsx` | MODIFY | Register 6 new block types in COMPONENT_MAP |
| `web/src/components/layout/StoreLayout.jsx` | MODIFY | Swap Header/Footer when design_preset === 'piquim' |
| `web/src/data/defaultSections.js` | MODIFY | Export PIQUIM_HOME_SECTIONS with 6 new section entries |
| `web/src/pages/store/HomePage.jsx` | MODIFY | Use PIQUIM_HOME_SECTIONS as default for piquim preset |

---

## Task 1: PiquimAnnounceBar

**Files:**
- Create: `web/src/components/blocks/PiquimAnnounceBar.jsx`

- [ ] **Step 1: Create the component**

```jsx
// web/src/components/blocks/PiquimAnnounceBar.jsx
import React from 'react';

const DEFAULT_TEXT = 'ENVÍO GRATUITO en pedidos +$50.000 ARG  ·  10% OFF en tu primera compra  ·  Industria Argentina  ·  Hecho en Mar del Plata';

export default function PiquimAnnounceBar({ text = DEFAULT_TEXT }) {
  return (
    <div className="bg-[#1a1614] flex items-center justify-center py-3 w-full overflow-hidden">
      <div className="flex items-center gap-16 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {[text, text].map((t, i) => (
          <p key={i} className="text-[#fffaf6] text-[11px] tracking-[0.44px] font-['Inter',sans-serif] shrink-0">
            {t}
          </p>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add marquee keyframe to index.css**

Open `web/src/index.css` and add inside the existing `@layer utilities` block (or create it if absent):

```css
@layer utilities {
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
}
```

- [ ] **Commit**

```bash
git add web/src/components/blocks/PiquimAnnounceBar.jsx web/src/index.css
git commit -m "feat: add PiquimAnnounceBar block"
```

---

## Task 2: PiquimCTABanner

**Files:**
- Create: `web/src/components/blocks/PiquimCTABanner.jsx`

- [ ] **Step 1: Create the component**

```jsx
// web/src/components/blocks/PiquimCTABanner.jsx
import React from 'react';
import { navigate } from '../../utils/navigation';

export default function PiquimCTABanner({
  headline1 = '¿Listo para llevar tus recetas',
  headline2 = 'al próximo nivel?',
  primaryLabel = 'Comprar ahora',
  primaryHref = '/catalog',
  secondaryLabel = 'Ver catálogo →',
  secondaryHref = '/catalog',
}) {
  return (
    <div className="bg-[#ff4d00] relative h-[304px] overflow-hidden w-full shrink-0">
      {/* watermark text */}
      <p
        className="absolute font-black italic text-white opacity-[0.08] whitespace-nowrap select-none pointer-events-none"
        style={{ fontSize: 450, top: -88, left: -64, fontFamily: 'Gilroy, sans-serif', lineHeight: 1 }}
      >
        piquim
      </p>

      {/* headline */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center text-[#fffaf6] whitespace-pre"
        style={{ top: 73, fontFamily: 'Gilroy, sans-serif', fontWeight: 900, fontSize: 60, letterSpacing: '3.6px', lineHeight: '55px' }}
      >
        <p className="mb-0">{headline1} </p>
        <p>{headline2}</p>
      </div>

      {/* CTAs */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-4 items-center" style={{ top: 201 }}>
        <button
          onClick={() => navigate(primaryHref)}
          className="flex items-center gap-2 border border-[rgba(255,255,255,0.8)] rounded-full px-7 py-4 text-white text-[15px] shadow-[0px_8px_24px_-8px_rgba(255,77,0,0.45)] whitespace-nowrap"
          style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}
        >
          {primaryLabel}
          <span className="text-[18px] font-bold">→</span>
        </button>
        <button
          onClick={() => navigate(secondaryHref)}
          className="flex items-center justify-center py-4 text-[#1a1614] text-[15px] whitespace-nowrap"
          style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 600 }}
        >
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add web/src/components/blocks/PiquimCTABanner.jsx
git commit -m "feat: add PiquimCTABanner block"
```

---

## Task 3: PiquimHero

**Files:**
- Create: `web/src/components/blocks/PiquimHero.jsx`

- [ ] **Step 1: Create the component**

```jsx
// web/src/components/blocks/PiquimHero.jsx
import React from 'react';
import { navigate } from '../../utils/navigation';

export default function PiquimHero({
  eyebrow = 'Heladería | Panadería | Confitería',
  primaryLabel = 'Comprar ahora',
  primaryHref = '/catalog',
  secondaryLabel = 'Ver catálogo',
  secondaryHref = '/catalog',
  stat1Value = '+200', stat1Label = 'productos',
  stat2Value = '3',    stat2Label = 'categorías',
  stat3Value = '+30',  stat3Label = 'años de oficio',
}) {
  return (
    <div className="bg-[#fffaf6] w-full">
      {/* Hero content */}
      <div className="flex h-[664px] items-center justify-end overflow-hidden px-20 py-15">
        <div className="flex flex-col gap-6 items-end max-w-[554px]">

          {/* Eyebrow badge */}
          <div className="flex items-center gap-2 bg-[#fff0e8] rounded-full px-[14px] py-2">
            <div className="w-2 h-2 rounded-full bg-[#ff4d00]" />
            <p
              className="text-[#ff4d00] text-[11px] tracking-[1.98px] whitespace-nowrap italic"
              style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 500 }}
            >
              {eyebrow}
            </p>
          </div>

          {/* Headline */}
          <div className="text-right" style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 900, fontSize: 88, lineHeight: 0.89, letterSpacing: '-3.52px' }}>
            <p className="text-[#fff0e8] mb-0 leading-[0.89]">Materia prima</p>
            <p className="text-[#ff4d00] leading-[0.89]">que inspira</p>
            <p className="text-[#fff0e8] leading-[0.89]">cada receta.</p>
          </div>

          {/* CTAs */}
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate(primaryHref)}
              className="flex items-center gap-2 bg-[#ff4d00] text-white rounded-full px-7 py-4 shadow-[0px_8px_24px_-8px_rgba(255,77,0,0.45)] whitespace-nowrap"
              style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700, fontSize: 15 }}
            >
              {primaryLabel}
              <span className="font-bold text-[18px]">→</span>
            </button>
            <button
              onClick={() => navigate(secondaryHref)}
              className="py-4 text-[#1a1614] whitespace-nowrap"
              style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 600, fontSize: 15 }}
            >
              {secondaryLabel}
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-10 border-t border-[#e8dfd8] pt-6">
            {[
              { value: stat1Value, label: stat1Label },
              { value: stat2Value, label: stat2Label },
              { value: stat3Value, label: stat3Label },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1 items-center w-[100px]">
                <p className="font-black text-[30px] text-[#1a1614] whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {value}
                </p>
                <p className="text-[11px] text-black tracking-[1.1px] font-medium uppercase whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add web/src/components/blocks/PiquimHero.jsx
git commit -m "feat: add PiquimHero block"
```

---

## Task 4: PiquimCatalog3Panel

**Files:**
- Create: `web/src/components/blocks/PiquimCatalog3Panel.jsx`

- [ ] **Step 1: Create the component**

```jsx
// web/src/components/blocks/PiquimCatalog3Panel.jsx
import React from 'react';
import { navigate } from '../../utils/navigation';
import { PIQUIM_CATALOG_CARDS } from '../../data/piquimBranding';

const PANEL_OVERLAYS = [
  'linear-gradient(180deg, rgba(107,184,224,0.56) 0%, rgba(26,22,20,0.8) 100%)',
  'linear-gradient(180deg, rgba(255,143,45,0.56) 0%, rgba(26,22,20,0.8) 100%)',
  'linear-gradient(180deg, rgba(224,81,138,0.56) 0%, rgba(26,22,20,0.8) 100%)',
];

export default function PiquimCatalog3Panel({ cards = PIQUIM_CATALOG_CARDS }) {
  return (
    <div className="bg-[#1a1614] w-full shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between px-20 py-[50px]">
        <div style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 900, fontSize: 56, lineHeight: 1, letterSpacing: '-1.68px', color: '#fffaf6', width: 376 }}>
          <p className="mb-0">Elegí tu mundo.</p>
          <p><em className="text-[#ff4d00] not-italic" style={{ fontStyle: 'italic' }}>Inspirate</em><span>.</span></p>
        </div>
        <p className="text-[#ff4d00] text-[16px] tracking-[3.2px] font-semibold whitespace-nowrap" style={{ fontFamily: 'Gilroy, sans-serif' }}>
          NUESTRO CATÁLOGO
        </p>
      </div>

      {/* Panels */}
      <div className="flex gap-[2px]">
        {cards.map((card, idx) => (
          <div key={card.id} className="relative overflow-hidden shrink-0 w-[calc(33.333%-2px)] min-w-0 h-[700px] bg-[#1a1614]">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${card.image})` }}
            />
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{ background: PANEL_OVERLAYS[idx] }}
            />
            {/* Content */}
            <div className="absolute left-10 flex flex-col gap-4 items-start" style={{ top: 380, width: 398 }}>
              {/* Number label */}
              <div className="flex items-center gap-3">
                <div className="bg-white h-px w-6" />
                <p className="text-white text-[11px] tracking-[1.98px] whitespace-nowrap" style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}>
                  {card.prefix}
                </p>
              </div>

              {/* Title */}
              <p
                className="text-[#ff4d00] whitespace-nowrap"
                style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 900, fontStyle: 'italic', fontSize: 56, letterSpacing: '-1.68px', lineHeight: 1 }}
              >
                {card.title}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-[6px]">
                {(card.tags || []).map((tag) => (
                  <span
                    key={tag}
                    className="bg-[rgba(255,255,255,0.14)] border border-white text-[#fffaf6] text-[10px] px-[10px] py-[5px] rounded-full font-medium"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p
                className="text-[#fffaf6] text-[13px] leading-[1.5]"
                style={{ fontFamily: 'Helvetica Neue, sans-serif', width: 320 }}
              >
                {card.description}
              </p>

              {/* CTA link */}
              <button
                onClick={() => navigate(`/catalog?category=${card.categorySlug}`)}
                className="flex items-center gap-2 border-b-2 border-[#ff4d00] pb-1 text-[#fffaf6] whitespace-nowrap"
                style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
              >
                <span className="text-[11px] tracking-[0.88px]">VER CATÁLOGO</span>
                <span className="text-[14px]">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add web/src/components/blocks/PiquimCatalog3Panel.jsx
git commit -m "feat: add PiquimCatalog3Panel block"
```

---

## Task 5: PiquimFeaturedProducts

**Files:**
- Create: `web/src/components/blocks/PiquimFeaturedProducts.jsx`

- [ ] **Step 1: Create the component**

```jsx
// web/src/components/blocks/PiquimFeaturedProducts.jsx
import React, { useState } from 'react';
import { navigate } from '../../utils/navigation';

const CATEGORY_FILTERS = ['Todos', 'Heladería', 'Panadería', 'Confitería'];

const BADGE_STYLES = {
  'MÁS VENDIDO': 'bg-[#ff4d00]',
  'NUEVO': 'bg-[#d4a24a]',
  'PROMO -15%': 'bg-[#1a1614]',
};

export default function PiquimFeaturedProducts({
  products = [],
  onAddToCart,
}) {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filtered = activeFilter === 'Todos'
    ? products
    : products.filter((p) => {
        const cat = (p.category || p.data?.category || '').toLowerCase();
        return cat === activeFilter.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
      });

  return (
    <div className="bg-[#fffaf6] flex flex-col gap-14 p-[120px] w-full">
      {/* Header */}
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#ff4d00]" />
            <p className="text-[#ff4d00] text-[12px] tracking-[2.4px] whitespace-nowrap" style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}>
              LO MÁS PEDIDO
            </p>
          </div>
          <p style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 900, fontSize: 56, letterSpacing: '-1.12px', lineHeight: 1, whiteSpace: 'nowrap' }}>
            <span className="text-[#1a1614]">Productos </span>
            <em className="text-[#ff4d00]">destacados</em>
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2">
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-[18px] py-[10px] rounded-full text-[13px] tracking-[0.26px] whitespace-nowrap transition-colors ${
                activeFilter === f
                  ? 'bg-[#1a1614] text-[#fffaf6]'
                  : 'bg-white border border-[#e8dfd8] text-[#4a4441] hover:bg-[#f5ede6]'
              }`}
              style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 600 }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="flex flex-wrap gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>

      {/* "Ver todo" CTA */}
      <div className="flex justify-center w-full">
        <button
          onClick={() => navigate('/catalog')}
          className="flex items-center gap-3 bg-[#1a1614] text-[#fffaf6] rounded-full px-9 py-[18px] whitespace-nowrap"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
        >
          <span className="text-[13px] tracking-[1.56px]">VER TODO EL CATÁLOGO</span>
          <span className="text-[#ff4d00] text-[18px]">→</span>
        </button>
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  const badge = product.badge?.text;
  const badgeBg = BADGE_STYLES[badge] || 'bg-[#ff4d00]';
  const category = (product.data?.category_label || product.category || '').toUpperCase();
  const gradientColors = {
    heladeria: 'rgba(107,184,224,0.18), rgba(107,184,224,0.42)',
    panaderia: 'rgba(212,162,74,0.18), rgba(212,162,74,0.42)',
    confiteria: 'rgba(224,81,138,0.18), rgba(224,81,138,0.42)',
  };
  const catKey = (product.category || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const gradientColor = gradientColors[catKey] || gradientColors.heladeria;

  return (
    <div
      className="bg-white border border-[#e8dfd8] rounded-[18px] overflow-hidden flex flex-col shrink-0 cursor-pointer hover:shadow-lg transition-shadow"
      style={{ width: 282, height: 380 }}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden shrink-0"
        style={{
          height: 220,
          background: `linear-gradient(142.04deg, ${gradientColor})`,
        }}
      >
        {badge && (
          <div className={`absolute left-4 top-4 ${badgeBg} rounded-full px-[10px] py-[6px]`}>
            <p className="text-white text-[9px] tracking-[0.72px] font-bold whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
              {badge}
            </p>
          </div>
        )}
        {product.image && (
          <img
            src={product.image}
            alt={product.alt || product.name}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-[6px] p-[18px]">
        {category && (
          <p className="text-[#ff4d00] text-[10px] tracking-[1.8px] whitespace-nowrap" style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}>
            {category}
          </p>
        )}
        <p className="text-[#1a1614] text-[16px] leading-[1.3] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}>
          {product.name}
        </p>
        <p className="text-[#b5ada8] text-[12px] whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 400 }}>
          {product.shortDescription}
        </p>
        <div className="h-2" />
        <div className="flex items-center justify-between">
          <p className="font-black text-[#1a1614] text-[20px] whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
            {product.price > 0 ? `$ ${product.price.toLocaleString('es-AR')}` : 'Consultar'}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart?.(product); }}
            className="w-10 h-10 bg-[#ff4d00] rounded-full flex items-center justify-center text-white hover:bg-[#e04400] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add web/src/components/blocks/PiquimFeaturedProducts.jsx
git commit -m "feat: add PiquimFeaturedProducts block with category filter"
```

---

## Task 6: PiquimTresMundos (with parallax)

**Files:**
- Create: `web/src/components/blocks/PiquimTresMundos.jsx`

- [ ] **Step 1: Create the component**

```jsx
// web/src/components/blocks/PiquimTresMundos.jsx
import React, { useEffect, useRef } from 'react';

const IMG_LEFT  = '/piquim/catalogo/balde-heladeria.png';   // bucket tilted left  (-10deg)
const IMG_RIGHT = '/piquim/catalogo/balde-panaderia.png';   // bucket tilted right (+9deg)

export default function PiquimTresMundos({
  leftImage  = IMG_LEFT,
  rightImage = IMG_RIGHT,
  eyebrow = 'RECORRÉ NUESTRAS 3 GRANDES FAMILIAS',
  headline1 = 'Un balde. ',
  headline2 = 'Tres mundos',
  headline3 = 'de creación.',
  description = 'Desde el helado artesanal hasta la torta más sofisticada, el balde Piquim te acompaña en cada paso.',
}) {
  const sectionRef = useRef(null);
  const leftRef   = useRef(null);
  const rightRef  = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect    = sectionRef.current.getBoundingClientRect();
      const viewH   = window.innerHeight;
      // progress 0→1 as section scrolls from bottom to top of viewport
      const progress = Math.min(1, Math.max(0, 1 - (rect.top / viewH)));
      const offset   = (progress - 0.5) * 120; // ±60px

      if (leftRef.current) {
        leftRef.current.style.transform = `translateY(${-offset}px) rotate(-10deg)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translateY(${offset}px) rotate(9deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={sectionRef} className="bg-[#fffaf6] relative w-full overflow-hidden" style={{ minHeight: 521, paddingTop: 100, paddingBottom: 79, paddingLeft: 80, paddingRight: 80 }}>
      {/* Text content — centred */}
      <div className="relative z-10 flex flex-col items-center gap-4 max-w-[620px] mx-auto text-center">
        <p
          className="text-[#ff4d00] text-[12px] tracking-[2.4px] whitespace-nowrap"
          style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}
        >
          {eyebrow}
        </p>
        <div style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 900, fontSize: 66, lineHeight: 1, letterSpacing: '-1.98px' }}>
          <p className="text-[#1a1614] mb-0 whitespace-nowrap">
            {headline1}
            <em className="text-[#ff4d00]">{headline2}</em>
          </p>
          <p className="text-[#1a1614]">{headline3}</p>
        </div>
        <p className="text-[#4a4441] text-[13px] leading-[1.55] mt-2" style={{ fontFamily: 'Helvetica Neue, sans-serif' }}>
          {description}
        </p>
      </div>

      {/* Left bucket */}
      <div
        ref={leftRef}
        className="absolute pointer-events-none"
        style={{
          left: -112,
          top: -190,
          width: 700,
          height: 467,
          transformOrigin: 'center center',
          transform: 'rotate(-10deg)',
          transition: 'transform 0.1s linear',
        }}
      >
        <img src={leftImage} alt="" className="w-full h-full object-cover rounded-[214px]" />
      </div>

      {/* Right bucket */}
      <div
        ref={rightRef}
        className="absolute pointer-events-none"
        style={{
          right: -298,
          top: -187,
          width: 913,
          height: 609,
          transformOrigin: 'center center',
          transform: 'rotate(9deg)',
          transition: 'transform 0.1s linear',
        }}
      >
        <img src={rightImage} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add web/src/components/blocks/PiquimTresMundos.jsx
git commit -m "feat: add PiquimTresMundos block with parallax scroll"
```

---

## Task 7: PiquimHeader

**Files:**
- Create: `web/src/components/layout/PiquimHeader.jsx`

- [ ] **Step 1: Create the component**

```jsx
// web/src/components/layout/PiquimHeader.jsx
import React, { useState } from 'react';
import { navigate } from '../../utils/navigation';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export default function PiquimHeader({
  logoUrl = '/piquim/piquimlogo.png',
  navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Catálogos', href: '/catalog' },
    { label: 'Nosotros', href: '/about' },
  ],
}) {
  const { cartCount } = useStore();
  const { user } = useAuth();

  return (
    <div className="bg-[#fffaf6] border-b border-[#e8dfd8] flex flex-col items-center justify-center px-15 py-[18px] w-full">
      <div
        className="flex items-center justify-between w-full px-15 py-[18px] rounded-[30px] border border-[#e8dfd8]"
        style={{ background: 'rgba(255,191,140,0.6)' }}
      >
        {/* Logo */}
        <button onClick={() => navigate('/')} className="shrink-0 h-[31px] w-[108px]">
          <img src={logoUrl} alt="Piquim" className="h-full w-full object-contain" />
        </button>

        {/* Nav links */}
        <nav className="flex gap-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => navigate(link.href)}
              className="text-[#1a1614] text-[14px] whitespace-nowrap hover:text-[#ff4d00] transition-colors"
              style={{ fontFamily: 'Helvetica Neue, sans-serif', fontWeight: 500 }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-[14px]">
          <button className="text-[#1a1614] hover:text-[#ff4d00] transition-colors" aria-label="Buscar">
            <SearchIcon />
          </button>
          <button className="text-[#1a1614] hover:text-[#ff4d00] transition-colors" aria-label="Guardados">
            <BookmarkIcon />
          </button>
          <button
            className="relative text-[#1a1614] hover:text-[#ff4d00] transition-colors"
            onClick={() => navigate('/cart')}
            aria-label="Carrito"
          >
            <CartIcon />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ff4d00] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => navigate(user ? '/profile' : '/signup')}
            className="flex items-center justify-center h-6 w-[100px] bg-[#ff4d00] rounded-full text-[#fffaf6] text-[14px] whitespace-nowrap"
            style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}
          >
            {user ? 'Mi cuenta' : 'Registrarse'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Commit**

```bash
git add web/src/components/layout/PiquimHeader.jsx
git commit -m "feat: add PiquimHeader layout component"
```

---

## Task 8: PiquimFooter

**Files:**
- Create: `web/src/components/layout/PiquimFooter.jsx`

- [ ] **Step 1: Create the component**

```jsx
// web/src/components/layout/PiquimFooter.jsx
import React, { useState } from 'react';
import { navigate } from '../../utils/navigation';
import { PIQUIM_FOOTER_DEFAULTS } from '../../data/piquimBranding';

export default function PiquimFooter({
  logoUrl     = '/piquim/piquimlogo.png',
  description = PIQUIM_FOOTER_DEFAULTS.description,
  shopLinks   = PIQUIM_FOOTER_DEFAULTS.shopLinks,
  helpLinks   = PIQUIM_FOOTER_DEFAULTS.helpLinks,
  legalLinks  = PIQUIM_FOOTER_DEFAULTS.legalLinks,
  socials     = PIQUIM_FOOTER_DEFAULTS.socials,
  legalText   = PIQUIM_FOOTER_DEFAULTS.legalText,
  newsletter  = PIQUIM_FOOTER_DEFAULTS.newsletter,
}) {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail('');
  };

  return (
    <footer className="bg-[#1a1614] flex flex-col w-full">
      {/* Top */}
      <div className="flex gap-[130px] items-start justify-center px-[120px] pt-20 pb-15">
        {/* Brand column */}
        <div className="flex flex-col gap-5 shrink-0 w-[280px]">
          <button onClick={() => navigate('/')} className="h-[41px] w-[142px]">
            <img src={logoUrl} alt="Piquim" className="h-full w-full object-contain" />
          </button>
          <p className="text-[#b5ada8] text-[13px] leading-[1.7] w-[280px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            {description}
          </p>
          <div className="flex gap-[10px]">
            {socials.map((s) => (
              <a
                key={s.short}
                href={s.href || '#'}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#4a4441] text-[#fffaf6] text-[11px] font-bold tracking-[0.66px] hover:border-[#ff4d00] hover:text-[#ff4d00] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {s.short}
              </a>
            ))}
          </div>
        </div>

        {/* Shop links */}
        <div className="flex flex-col gap-4 shrink-0">
          <p className="text-[#ff4d00] text-[11px] tracking-[2.2px] font-bold whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
            COMPRAR
          </p>
          {shopLinks.map((l) => (
            <button key={l.href} onClick={() => navigate(l.href)} className="text-[#fffaf6] text-[14px] font-medium text-left whitespace-nowrap hover:text-[#ff4d00] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Help links */}
        <div className="flex flex-col gap-4 shrink-0">
          <p className="text-[#ff4d00] text-[11px] tracking-[2.2px] font-bold whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
            AYUDA
          </p>
          {helpLinks.map((l) => (
            <button key={l.href} onClick={() => navigate(l.href)} className="text-[#fffaf6] text-[14px] font-medium text-left whitespace-nowrap hover:text-[#ff4d00] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              {l.label}
            </button>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4 shrink-0 w-[280px]">
          <p className="text-[#ff4d00] text-[11px] tracking-[2.2px] font-bold whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
            {newsletter?.title?.toUpperCase() || 'SUSCRIBETE'}
          </p>
          <p className="text-[#b5ada8] text-[13px] leading-[1.7] w-[280px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            {newsletter?.description || 'Recetas, novedades y descuentos para profesionales. Una vez al mes. Sin spam.'}
          </p>
          <form onSubmit={handleSubscribe} className="flex items-stretch rounded-full overflow-hidden bg-[rgba(74,68,65,0.4)] w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={newsletter?.placeholder || 'tu@email.com'}
              className="flex-1 bg-transparent pl-[18px] py-[14px] text-[#b5ada8] text-[13px] outline-none min-w-0"
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
            <button
              type="submit"
              className="bg-[#ff4d00] px-[22px] py-[14px] text-white text-[16px] font-bold shrink-0 hover:bg-[#e04400] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              →
            </button>
          </form>
          <p className="text-[#b5ada8] text-[11px] leading-[1.6] w-[280px]" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
            Al suscribirte aceptás nuestros Términos y Política de privacidad.
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-[rgba(74,68,65,0.5)] w-full" />

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-[120px] py-7">
        <p className="text-[#b5ada8] text-[12px] whitespace-pre" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}>
          {legalText}
        </p>
        <div className="flex gap-7 items-center">
          {legalLinks.map((l) => (
            <button key={l.href} onClick={() => navigate(l.href)} className="text-[#fffaf6] text-[12px] font-medium whitespace-nowrap hover:text-[#ff4d00] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Commit**

```bash
git add web/src/components/layout/PiquimFooter.jsx
git commit -m "feat: add PiquimFooter layout component"
```

---

## Task 9: Register Blocks in PageBuilder

**Files:**
- Modify: `web/src/components/PageBuilder.jsx`

- [ ] **Step 1: Add imports and register block types**

Replace the import block and COMPONENT_MAP in `web/src/components/PageBuilder.jsx`:

```jsx
import React from 'react';
import HeroSlider from './blocks/HeroSlider';
import BrandMarquee from './blocks/BrandMarquee';
import FeaturedProducts from './blocks/FeaturedProducts';
import Services from './blocks/Services';
import AboutHero from './blocks/AboutHero';
import AboutMission from './blocks/AboutMission';
import AboutStats from './blocks/AboutStats';
import AboutValues from './blocks/AboutValues';
import AboutTeam from './blocks/AboutTeam';
import AboutCTA from './blocks/AboutCTA';
import FeaturesBento from './blocks/FeaturesBento';
import FeaturesBentoGrid from './blocks/FeaturesBentoGrid';
import PiquimHero from './blocks/PiquimHero';
import PiquimAnnounceBar from './blocks/PiquimAnnounceBar';
import PiquimTresMundos from './blocks/PiquimTresMundos';
import PiquimCatalog3Panel from './blocks/PiquimCatalog3Panel';
import PiquimFeaturedProducts from './blocks/PiquimFeaturedProducts';
import PiquimCTABanner from './blocks/PiquimCTABanner';

const COMPONENT_MAP = {
    HeroSlider,
    BrandMarquee,
    FeaturedProducts,
    Services,
    AboutHero,
    AboutMission,
    AboutStats,
    AboutValues,
    AboutTeam,
    AboutCTA,
    FeaturesBento,
    FeaturesBentoGrid,
    PiquimHero,
    PiquimAnnounceBar,
    PiquimTresMundos,
    PiquimCatalog3Panel,
    PiquimFeaturedProducts,
    PiquimCTABanner,
};
```

- [ ] **Commit**

```bash
git add web/src/components/PageBuilder.jsx
git commit -m "feat: register Piquim blocks in PageBuilder"
```

---

## Task 10: StoreLayout — conditional Piquim Header/Footer

**Files:**
- Modify: `web/src/components/layout/StoreLayout.jsx`

- [ ] **Step 1: Add PiquimHeader/PiquimFooter imports and conditional rendering**

After existing imports in `StoreLayout.jsx`, add:

```jsx
import PiquimHeader from './PiquimHeader';
import PiquimFooter from './PiquimFooter';
```

Inside `StoreLayout`, read the design preset from tenant settings:

```jsx
const designPreset = settings?.branding?.design_preset;
const isPiquim = designPreset === 'piquim';
```

Then replace `<Header navLinks={navLinks} />` with:

```jsx
{isPiquim
  ? <PiquimHeader navLinks={navLinks} />
  : <Header navLinks={navLinks} />
}
```

And replace `<Footer />` with:

```jsx
{isPiquim ? <PiquimFooter /> : <Footer />}
```

- [ ] **Commit**

```bash
git add web/src/components/layout/StoreLayout.jsx
git commit -m "feat: swap Header/Footer to Piquim variants when design_preset=piquim"
```

---

## Task 11: Default Sections for Piquim Homepage

**Files:**
- Modify: `web/src/data/defaultSections.js`

- [ ] **Step 1: Export PIQUIM_HOME_SECTIONS constant**

At the end of `defaultSections.js`, add:

```js
export const PIQUIM_HOME_SECTIONS = [
    {
        id: 'piquim-hero',
        type: 'PiquimHero',
        enabled: true,
        props: {},
    },
    {
        id: 'piquim-announce',
        type: 'PiquimAnnounceBar',
        enabled: true,
        props: {},
    },
    {
        id: 'piquim-tres-mundos',
        type: 'PiquimTresMundos',
        enabled: true,
        props: {},
    },
    {
        id: 'piquim-catalog',
        type: 'PiquimCatalog3Panel',
        enabled: true,
        props: {},
    },
    {
        id: 'piquim-featured',
        type: 'PiquimFeaturedProducts',
        enabled: true,
        props: { products: [] },
    },
    {
        id: 'piquim-cta',
        type: 'PiquimCTABanner',
        enabled: true,
        props: {},
    },
];
```

Also update `getDefaultSectionsForPage` to return `PIQUIM_HOME_SECTIONS` when called with `'piquim-home'` key (if the function exists and uses a map):

Find the existing `getDefaultSectionsForPage` function in `defaultSections.js` and add the piquim-home case to its switch/map.

- [ ] **Commit**

```bash
git add web/src/data/defaultSections.js
git commit -m "feat: add PIQUIM_HOME_SECTIONS to defaultSections"
```

---

## Task 12: Wire HomePage to Piquim Sections

**Files:**
- Modify: `web/src/pages/store/HomePage.jsx`

- [ ] **Step 1: Import PIQUIM_HOME_SECTIONS and use per design_preset**

Add to imports:

```jsx
import { PIQUIM_HOME_SECTIONS } from '../../data/defaultSections';
import { useTenant } from '../../context/TenantContext';
```

Inside `HomePage`:

```jsx
const { settings } = useTenant();
const isPiquim = settings?.branding?.design_preset === 'piquim';

const [sections, setSections] = useState(() =>
    isPiquim ? PIQUIM_HOME_SECTIONS : getDefaultSectionsForPage('home')
);
```

Update the `finalSections` memo to inject products into `PiquimFeaturedProducts` as well:

```jsx
const finalSections = useMemo(() => {
    if (!sections) return null;
    return sections
        .filter((section) => {
            if (section.type === 'FeaturedProducts' || section.type === 'PiquimFeaturedProducts') {
                return featuredLoaded && featuredProducts.length > 0;
            }
            return true;
        })
        .map((section) => {
            if (section.type === 'FeaturedProducts' || section.type === 'PiquimFeaturedProducts') {
                return { ...section, props: { ...section.props, products: featuredProducts } };
            }
            return section;
        });
}, [sections, featuredLoaded, featuredProducts]);
```

- [ ] **Commit**

```bash
git add web/src/pages/store/HomePage.jsx
git commit -m "feat: wire HomePage to use Piquim sections when design_preset=piquim"
```

---

## Task 13: Verify in Browser

- [ ] **Step 1: Start dev server**

```bash
cd web && npm run dev
```

- [ ] **Step 2: Open `http://localhost:5173` and verify**

Check each section renders:
- [ ] PiquimHeader: pill nav visible with logo, links, orange "Registrarse" button
- [ ] PiquimHero: large headline, CTAs, stats visible
- [ ] PiquimAnnounceBar: dark bar with scrolling promo text
- [ ] PiquimTresMundos: "Un balde. Tres mundos." with bucket images; scroll to verify parallax movement
- [ ] PiquimCatalog3Panel: 3 dark panels (Heladería, Panadería, Confitería) with images and tags
- [ ] PiquimFeaturedProducts: product cards grid, filter chips work
- [ ] PiquimCTABanner: orange section with "¿Listo para llevar tus recetas?"
- [ ] PiquimFooter: dark footer with logo, links, newsletter form

- [ ] **Step 3: Check non-piquim routes unbroken** — `/about`, `/catalog`, `/products/*` still render old header/footer

---

## Notes

- **Image assets**: `PiquimTresMundos` defaults to `/piquim/catalogo/balde-heladeria.png` and `/piquim/catalogo/balde-panaderia.png`. If those files don't exist yet, the parallax containers will be empty but layout won't break. Supply the real assets in `web/public/piquim/catalogo/`.
- **Logo**: `PiquimHeader` and `PiquimFooter` default to `/piquim/piquimlogo.png`. The existing `TenantContext` exposes `settings.branding.logo_url` — both components can later read that via `useTenant()` if needed.
- **Gilroy Black Italic**: CSS font-style italic + Gilroy fontFamily maps to `Gilroy-Regular.otf` if no italic variant is loaded. Add `Gilroy-BlackItalic.otf` to `web/public/fonts/gilroy/` and a matching `@font-face` in `index.css` if the italic headline doesn't look right.
