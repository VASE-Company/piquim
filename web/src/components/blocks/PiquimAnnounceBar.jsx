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
