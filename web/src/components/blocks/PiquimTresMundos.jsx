import React from "react";

export default function PiquimTresMundos({
  eyebrow = "RECORRE NUESTRAS 3 GRANDES FAMILIAS",
  subtitle = "",
  titleStart = "Un balde.",
  titleHighlight = "Tres mundos",
  titleEnd = "de creacion.",
  description = "Desde el helado artesanal hasta la torta mas sofisticada, el balde Piquim te acompana en cada paso.",
  leftImage = "/piquim/product-bucket.png",
  rightImage = "/piquim/product-bucket.png",
}) {
  return (
    <section className="relative overflow-hidden bg-[#fffaf6] px-4 py-14 sm:py-16 md:px-[80px] md:py-[100px]">
      <div className="mx-auto grid max-w-[1317px] items-center gap-8 md:block md:text-center">
        <div className="relative mx-auto flex h-[210px] w-full max-w-[360px] items-end justify-center md:hidden">
          <img
            src={leftImage}
            alt="Balde izquierdo"
            className="absolute left-2 bottom-2 w-[48%] max-w-[170px] -rotate-6 opacity-95"
          />
          <img
            src={rightImage}
            alt="Balde derecho"
            className="absolute right-2 bottom-0 w-[52%] max-w-[185px] rotate-6 opacity-95"
          />
        </div>

        <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#ff4d00] sm:text-[12px] sm:tracking-[2.4px]">
          {eyebrow}
        </p>
        <h2 className="mx-auto mt-3 max-w-[720px] text-[34px] font-black leading-[0.98] text-[#1a1614] sm:text-[42px] md:text-[66px]">
          {titleStart}{" "}
          <span className="italic text-[#ff4d00]">{titleHighlight}</span>
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          {titleEnd}
        </h2>
        <p className="mx-auto mt-5 max-w-[620px] text-[13px] leading-[1.6] text-[#4a4441] sm:mt-6">
          {subtitle || description}
        </p>
        </div>
      </div>

      <img
        src={leftImage}
        alt="Balde izquierdo"
        className="pointer-events-none absolute -left-2 top-[-10px] hidden w-[430px] -rotate-12 opacity-95 md:block lg:w-[470px]"
      />
      <img
        src={rightImage}
        alt="Balde derecho"
        className="pointer-events-none absolute -right-2 top-[-6px] hidden w-[450px] rotate-12 opacity-95 md:block lg:w-[490px]"
      />
    </section>
  );
}
