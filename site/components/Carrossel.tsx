"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Icone } from "./Icone";

/**
 * Trilho horizontal com scroll-snap.
 *
 * Por que scroll nativo e não transform: o gesto de arrastar no celular já vem
 * de graça, com a inércia certa do sistema, e o teclado navega sozinho. Um
 * carrossel em transform precisaria reimplementar tudo isso pior.
 *
 * As setas ficam nas laterais, meio sobrepostas às extremidades, e só aparecem
 * no ponteiro fino. Em toque elas nem entram no DOM visual: quem tem dedo
 * arrasta. Cada clique anda exatamente um card, medido do próprio DOM, então
 * gap e largura podem mudar sem quebrar o passo.
 */
export function Carrossel({
  children,
  rotulo,
  className = "",
}: {
  children: ReactNode;
  /** descreve o trilho para leitor de tela, ex.: "Elenco do futsal feminino" */
  rotulo: string;
  className?: string;
}) {
  const trilho = useRef<HTMLUListElement>(null);
  const [inicio, setInicio] = useState(true);
  const [fim, setFim] = useState(false);

  const medir = useCallback(() => {
    const el = trilho.current;
    if (!el) return;
    // 2px de folga: sub-pixel de zoom faz scrollLeft nunca bater o valor exato
    setInicio(el.scrollLeft <= 2);
    setFim(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [medir]);

  const andar = (direcao: 1 | -1) => {
    const el = trilho.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>("li");
    // passo = largura do card + gap real, lido do layout
    const gap = parseFloat(getComputedStyle(el).columnGap || "0") || 0;
    const passo = item ? item.offsetWidth + gap : el.clientWidth * 0.8;
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: passo * direcao, behavior: suave ? "smooth" : "auto" });
  };

  const seta =
    "pointer-events-auto grid h-11 w-11 place-items-center rounded-full border " +
    "border-ink-200 bg-white/95 text-navy-800 shadow-[0_6px_20px_-8px_rgb(0_21_47/0.45)] " +
    "backdrop-blur-sm transition-[opacity,transform,border-color] duration-[160ms] " +
    "ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-ink-300 active:scale-[0.94] " +
    "disabled:pointer-events-none disabled:opacity-0";

  return (
    <div className={`relative ${className}`}>
      <ul
        ref={trilho}
        onScroll={medir}
        tabIndex={0}
        role="list"
        aria-label={rotulo}
        className="carrossel-trilho flex snap-x snap-mandatory gap-4 overflow-x-auto
                   overscroll-x-contain scroll-smooth px-5 py-1 md:gap-5 md:px-10"
      >
        {children}
      </ul>

      {/* camada de setas: não intercepta o arrasto, só os botões recebem evento */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center
                   justify-between px-1.5 md:px-4
                   [@media(hover:hover)_and_(pointer:fine)]:flex"
      >
        <button
          type="button"
          onClick={() => andar(-1)}
          disabled={inicio}
          aria-label={`${rotulo}: anterior`}
          className={seta}
        >
          <Icone nome="CaretLeft" className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => andar(1)}
          disabled={fim}
          aria-label={`${rotulo}: próximo`}
          className={seta}
        >
          <Icone nome="CaretRight" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/**
 * Item do trilho. Largura fixa por breakpoint para o snap ter onde encaixar,
 * e no celular sobra uma fresta do card seguinte, que é o que avisa ao dedo
 * que existe mais conteúdo à direita.
 */
export function CarrosselItem({ children }: { children: ReactNode }) {
  return (
    <li className="w-[58vw] shrink-0 snap-start xs:w-[50vw] sm:w-[36vw] md:w-[26vw] lg:w-[19%] xl:w-[17.5%]">
      {children}
    </li>
  );
}
