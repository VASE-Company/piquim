import React, { useEffect, useRef } from 'react';

const IMG_LEFT  = '/piquim/catalogo/balde-heladeria.png';
const IMG_RIGHT = '/piquim/catalogo/balde-panaderia.png';

export default function PiquimTresMundos({
  leftImage   = IMG_LEFT,
  rightImage  = IMG_RIGHT,
  eyebrow     = 'RECORRÉ NUESTRAS 3 GRANDES FAMILIAS',
  headline1   = 'Un balde. ',
  headline2   = 'Tres mundos',
  headline3   = 'de creación.',
  description = 'Desde el helado artesanal hasta la torta más sofisticada, el balde Piquim te acompaña en cada paso.',
}) {
  const sectionRef = useRef(null);
  const leftRef   = useRef(null);
  const rightRef  = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect     = sectionRef.current.getBoundingClientRect();
      const viewH    = window.innerHeight;
      const progress = Math.min(1, Math.max(0, 1 - rect.top / viewH));
      const offset   = (progress - 0.5) * 120;

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
    <div
      ref={sectionRef}
      className="bg-[#fffaf6] relative w-full overflow-hidden"
      style={{ minHeight: 521, paddingTop: 100, paddingBottom: 79, paddingLeft: 80, paddingRight: 80 }}
    >
      {/* Text content */}
      <div className="relative z-10 flex flex-col items-center gap-4 max-w-[620px] mx-auto text-center">
        <p
          className="text-[#ff4d00] text-[12px] tracking-[2.4px] whitespace-nowrap"
          style={{ fontFamily: 'Gilroy, sans-serif', fontWeight: 700 }}
        >
          {eyebrow}
        </p>
        <div
          style={{
            fontFamily: 'Gilroy, sans-serif',
            fontWeight: 900,
            fontSize: 66,
            lineHeight: 1,
            letterSpacing: '-1.98px',
          }}
        >
          <p className="text-[#1a1614] mb-0 whitespace-nowrap">
            {headline1}
            <em className="text-[#ff4d00]" style={{ fontStyle: 'italic' }}>{headline2}</em>
          </p>
          <p className="text-[#1a1614]">{headline3}</p>
        </div>
        <p
          className="text-[#4a4441] text-[13px] leading-[1.55] mt-2"
          style={{ fontFamily: 'Helvetica Neue, sans-serif' }}
        >
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
          willChange: 'transform',
        }}
      >
        <img
          src={leftImage}
          alt=""
          className="w-full h-full object-cover"
          style={{ borderRadius: 214 }}
        />
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
          willChange: 'transform',
        }}
      >
        <img src={rightImage} alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}
