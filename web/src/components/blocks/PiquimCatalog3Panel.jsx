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
        <div
          style={{
            fontFamily: 'Gilroy, sans-serif',
            fontWeight: 900,
            fontSize: 56,
            lineHeight: 1,
            letterSpacing: '-1.68px',
            color: '#fffaf6',
            width: 376,
          }}
        >
          <p className="mb-0">Elegí tu mundo.</p>
          <p>
            <em className="text-[#ff4d00]" style={{ fontStyle: 'italic' }}>Inspirate</em>
            <span>.</span>
          </p>
        </div>
        <p
          className="text-[#ff4d00] text-[16px] tracking-[3.2px] whitespace-nowrap"
          style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 600 }}
        >
          NUESTRO CATÁLOGO
        </p>
      </div>

      {/* Panels */}
      <div className="flex gap-[2px]">
        {cards.map((card, idx) => (
          <div
            key={card.id}
            className="relative overflow-hidden bg-[#1a1614] h-[700px]"
            style={{ width: 'calc(33.333% - 1.33px)', minWidth: 0, flexShrink: 0 }}
          >
            {/* BG image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${card.image})` }}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{ background: PANEL_OVERLAYS[idx] }}
            />
            {/* Content */}
            <div
              className="absolute left-10 flex flex-col gap-4 items-start"
              style={{ top: 380, width: 398 }}
            >
              {/* Number label */}
              <div className="flex items-center gap-3">
                <div className="bg-white h-px w-6 shrink-0" />
                <p
                  className="text-white text-[11px] tracking-[1.98px] whitespace-nowrap"
                  style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}
                >
                  {card.prefix}
                </p>
              </div>

              {/* Category title */}
              <p
                className="text-[#ff4d00] whitespace-nowrap"
                style={{
                  fontFamily: 'Gilroy, sans-serif',
                  fontWeight: 900,
                  fontStyle: 'italic',
                  fontSize: 56,
                  letterSpacing: '-1.68px',
                  lineHeight: 1,
                }}
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
                className="flex items-center gap-2 border-b-2 border-[#ff4d00] pb-1 text-[#fffaf6] whitespace-nowrap hover:opacity-80 transition-opacity"
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
