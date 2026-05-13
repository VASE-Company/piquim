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
      <div className="flex h-[664px] items-center justify-end overflow-hidden px-20 py-15">
        <div className="flex flex-col gap-6 items-end" style={{ maxWidth: 554 }}>

          {/* Eyebrow badge */}
          <div className="flex items-center gap-2 bg-[#fff0e8] rounded-full px-[14px] py-2">
            <div className="w-2 h-2 rounded-full bg-[#ff4d00] shrink-0" />
            <p
              className="text-[#ff4d00] text-[11px] tracking-[1.98px] whitespace-nowrap italic shrink-0"
              style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 500 }}
            >
              {eyebrow}
            </p>
          </div>

          {/* Headline */}
          <div
            className="text-right"
            style={{
              fontFamily: 'Gilroy, sans-serif',
              fontWeight: 900,
              fontSize: 88,
              lineHeight: 0.89,
              letterSpacing: '-3.52px',
            }}
          >
            <p className="text-[#fff0e8] mb-0">Materia prima</p>
            <p className="text-[#ff4d00]">que inspira</p>
            <p className="text-[#fff0e8]">cada receta.</p>
          </div>

          {/* CTAs */}
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate(primaryHref)}
              className="flex items-center gap-2 bg-[#ff4d00] text-white rounded-full px-7 py-4 shadow-[0px_8px_24px_-8px_rgba(255,77,0,0.45)] whitespace-nowrap hover:bg-[#e04400] transition-colors"
              style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700, fontSize: 15 }}
            >
              {primaryLabel}
              <span className="font-bold text-[18px]">→</span>
            </button>
            <button
              onClick={() => navigate(secondaryHref)}
              className="py-4 text-[#1a1614] whitespace-nowrap hover:text-[#ff4d00] transition-colors"
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
                <p
                  className="font-black text-[30px] text-[#1a1614] whitespace-nowrap"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {value}
                </p>
                <p
                  className="text-[11px] text-black tracking-[1.1px] font-medium uppercase whitespace-nowrap"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
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
