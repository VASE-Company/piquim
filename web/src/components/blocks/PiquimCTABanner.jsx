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
      {/* watermark */}
      <p
        className="absolute font-black italic text-white select-none pointer-events-none"
        style={{
          fontFamily: 'Gilroy, sans-serif',
          fontSize: 450,
          top: -88,
          left: -64,
          lineHeight: 1,
          opacity: 0.08,
          whiteSpace: 'nowrap',
        }}
      >
        piquim
      </p>

      {/* headline */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center text-[#fffaf6]"
        style={{
          top: 73,
          fontFamily: 'Gilroy, sans-serif',
          fontWeight: 900,
          fontSize: 60,
          letterSpacing: '3.6px',
          lineHeight: '55px',
          whiteSpace: 'pre',
        }}
      >
        <p className="mb-0">{headline1} </p>
        <p>{headline2}</p>
      </div>

      {/* CTAs */}
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-4 items-center" style={{ top: 201 }}>
        <button
          onClick={() => navigate(primaryHref)}
          className="flex items-center gap-2 border border-[rgba(255,255,255,0.8)] rounded-full px-7 py-4 text-white whitespace-nowrap shadow-[0px_8px_24px_-8px_rgba(255,77,0,0.45)]"
          style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700, fontSize: 15 }}
        >
          {primaryLabel}
          <span className="font-bold text-[18px]">→</span>
        </button>
        <button
          onClick={() => navigate(secondaryHref)}
          className="flex items-center justify-center py-4 text-[#1a1614] whitespace-nowrap"
          style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 600, fontSize: 15 }}
        >
          {secondaryLabel}
        </button>
      </div>
    </div>
  );
}
