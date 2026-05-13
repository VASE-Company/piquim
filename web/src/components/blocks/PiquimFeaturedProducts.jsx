import React, { useState } from 'react';
import { navigate } from '../../utils/navigation';

const CATEGORY_FILTERS = ['Todos', 'Heladería', 'Panadería', 'Confitería'];

const BADGE_STYLES = {
  'MÁS VENDIDO': 'bg-[#ff4d00]',
  'NUEVO': 'bg-[#d4a24a]',
  'PROMO -15%': 'bg-[#1a1614]',
  'Mayorista': 'bg-[#ff4d00]',
};

const GRADIENT_COLORS = {
  heladeria: 'rgba(107,184,224,0.18), rgba(107,184,224,0.42)',
  panaderia: 'rgba(212,162,74,0.18), rgba(212,162,74,0.42)',
  confiteria: 'rgba(224,81,138,0.18), rgba(224,81,138,0.42)',
};

function normalizeCategory(str) {
  return String(str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

function ProductCard({ product, onAddToCart }) {
  const badge = product.badge?.text;
  const badgeBg = BADGE_STYLES[badge] || 'bg-[#ff4d00]';
  const catKey = normalizeCategory(product.category || product.data?.category || '');
  const gradientColor = GRADIENT_COLORS[catKey] || GRADIENT_COLORS.heladeria;
  const categoryLabel = (
    product.data?.category_label ||
    product.category ||
    ''
  ).toUpperCase();

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
            <p
              className="text-white text-[9px] tracking-[0.72px] font-bold whitespace-nowrap"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
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
      <div className="flex flex-col gap-[6px] p-[18px] flex-1">
        {categoryLabel && (
          <p
            className="text-[#ff4d00] text-[10px] tracking-[1.8px] whitespace-nowrap"
            style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}
          >
            {categoryLabel}
          </p>
        )}
        <p
          className="text-[#1a1614] text-[16px] leading-[1.3] overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}
        >
          {product.name}
        </p>
        <p
          className="text-[#b5ada8] text-[12px] overflow-hidden text-ellipsis whitespace-nowrap"
          style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 400 }}
        >
          {product.shortDescription}
        </p>
        <div className="flex-1" />
        <div className="flex items-center justify-between">
          <p
            className="font-black text-[#1a1614] text-[20px] whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {product.price > 0 ? `$ ${Number(product.price).toLocaleString('es-AR')}` : 'Consultar'}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart?.(product); }}
            className="w-10 h-10 bg-[#ff4d00] rounded-full flex items-center justify-center text-white hover:bg-[#e04400] transition-colors shrink-0"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PiquimFeaturedProducts({ products = [], onAddToCart }) {
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filtered = activeFilter === 'Todos'
    ? products
    : products.filter((p) => {
        const cat = normalizeCategory(p.category || p.data?.category || '');
        return cat === normalizeCategory(activeFilter);
      });

  return (
    <div className="bg-[#fffaf6] flex flex-col gap-14 p-[120px] w-full">
      {/* Section header */}
      <div className="flex items-end justify-between w-full">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#ff4d00] shrink-0" />
            <p
              className="text-[#ff4d00] text-[12px] tracking-[2.4px] whitespace-nowrap"
              style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}
            >
              LO MÁS PEDIDO
            </p>
          </div>
          <p
            style={{
              fontFamily: 'Gilroy, sans-serif',
              fontWeight: 900,
              fontSize: 56,
              letterSpacing: '-1.12px',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            <span className="text-[#1a1614]">Productos </span>
            <em className="text-[#ff4d00]">destacados</em>
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 flex-wrap">
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
      {filtered.length > 0 ? (
        <div className="flex flex-wrap gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-40 text-[#b5ada8] text-[14px]" style={{ fontFamily: 'Gilroy, sans-serif' }}>
          No hay productos en esta categoría.
        </div>
      )}

      {/* Ver todo CTA */}
      <div className="flex justify-center w-full">
        <button
          onClick={() => navigate('/catalog')}
          className="flex items-center gap-3 bg-[#1a1614] text-[#fffaf6] rounded-full px-9 py-[18px] whitespace-nowrap hover:bg-[#2d2522] transition-colors"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
        >
          <span className="text-[13px] tracking-[1.56px]">VER TODO EL CATÁLOGO</span>
          <span className="text-[#ff4d00] text-[18px]">→</span>
        </button>
      </div>
    </div>
  );
}
