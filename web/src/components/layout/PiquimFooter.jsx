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
      {/* Top columns */}
      <div className="flex gap-[130px] items-start justify-center px-[120px] pt-20 pb-[60px] flex-wrap">

        {/* Brand column */}
        <div className="flex flex-col gap-5 shrink-0 w-[280px]">
          <button onClick={() => navigate('/')} style={{ height: 41, width: 142 }}>
            <img src={logoUrl} alt="Piquim" className="h-full w-full object-contain" />
          </button>
          <p
            className="text-[#b5ada8] text-[13px] leading-[1.7] w-[280px]"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            {description}
          </p>
          <div className="flex gap-[10px]">
            {socials.map((s) => (
              <a
                key={s.short}
                href={s.href || '#'}
                className="flex items-center justify-center rounded-full border border-[#4a4441] text-[#fffaf6] text-[11px] font-bold tracking-[0.66px] hover:border-[#ff4d00] hover:text-[#ff4d00] transition-colors"
                style={{ fontFamily: 'Inter, sans-serif', width: 40, height: 40 }}
              >
                {s.short}
              </a>
            ))}
          </div>
        </div>

        {/* Shop links */}
        <div className="flex flex-col gap-4 shrink-0">
          <p
            className="text-[#ff4d00] text-[11px] tracking-[2.2px] font-bold whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            COMPRAR
          </p>
          {shopLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => navigate(l.href)}
              className="text-[#fffaf6] text-[14px] font-medium text-left whitespace-nowrap hover:text-[#ff4d00] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Help links */}
        <div className="flex flex-col gap-4 shrink-0">
          <p
            className="text-[#ff4d00] text-[11px] tracking-[2.2px] font-bold whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            AYUDA
          </p>
          {helpLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => navigate(l.href)}
              className="text-[#fffaf6] text-[14px] font-medium text-left whitespace-nowrap hover:text-[#ff4d00] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4 shrink-0 w-[280px]">
          <p
            className="text-[#ff4d00] text-[11px] tracking-[2.2px] font-bold whitespace-nowrap"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            SUSCRIBETE
          </p>
          <p
            className="text-[#b5ada8] text-[13px] leading-[1.7] w-[280px]"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            {newsletter?.description || 'Recetas, novedades y descuentos para profesionales. Una vez al mes. Sin spam.'}
          </p>
          <form onSubmit={handleSubscribe} className="flex items-stretch rounded-full overflow-hidden w-full" style={{ background: 'rgba(74,68,65,0.4)' }}>
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
          <p
            className="text-[#b5ada8] text-[11px] leading-[1.6] w-[280px]"
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
          >
            Al suscribirte aceptás nuestros Términos y Política de privacidad.
          </p>
        </div>

      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ background: 'rgba(74,68,65,0.5)' }} />

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-[120px] py-7 flex-wrap gap-4">
        <p
          className="text-[#b5ada8] text-[12px]"
          style={{ fontFamily: 'Inter, sans-serif', fontWeight: 400 }}
        >
          {legalText}
        </p>
        <div className="flex gap-7 items-center flex-wrap">
          {legalLinks.map((l) => (
            <button
              key={l.label}
              onClick={() => navigate(l.href)}
              className="text-[#fffaf6] text-[12px] font-medium whitespace-nowrap hover:text-[#ff4d00] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
