"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = "power3.out";

/**
 * As fontes chegam depois do primeiro cálculo e mudam a altura dos blocos,
 * o que desloca todo gatilho medido antes. Uma remedição resolve.
 * Sem isso, blocos abaixo da dobra podem nunca aparecer.
 */
if (typeof document !== "undefined") {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

/** Entrada de bloco. Stagger curto, no máximo 6 filhos, conforme o design system. */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  stagger = false,
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  stagger?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const raiz = ref.current;
      if (!raiz) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(raiz.querySelectorAll(".js-reveal"), { opacity: 1, y: 0 });
        gsap.set(raiz, { opacity: 1, y: 0 });
        return;
      }

      const alvos = stagger
        ? Array.from(raiz.querySelectorAll<HTMLElement>(".js-reveal")).slice(0, 6)
        : [raiz];
      if (!alvos.length) return;

      gsap.fromTo(
        alvos,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.62,
          ease: EASE,
          delay,
          stagger: stagger ? 0.05 : 0,
          // "top 96%" pega o bloco assim que ele encosta na dobra. Mais alto que
          // isso deixa a página com buracos em telas curtas.
          scrollTrigger: { trigger: raiz, start: "top 96%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/**
 * Parágrafo de abertura.
 *
 * Era um scrub que acendia palavra por palavra conforme o scroll. Saiu: em
 * tela de celular a frase ficava meio apagada durante boa parte da leitura,
 * e o efeito disputava atenção com o próprio texto. Agora entra com o mesmo
 * fade das demais seções, que é o que o design system pede.
 */
export function TextoScrub({ texto, className = "" }: { texto: string; className?: string }) {
  return (
    <Reveal as="p" className={className}>
      {texto}
    </Reveal>
  );
}

/** Deslocamento leve de imagem no scroll. Só transform, nunca layout. */
export function Parallax({
  children,
  intensidade = 40,
  className = "",
}: {
  children: ReactNode;
  intensidade?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        el.querySelector("[data-parallax]"),
        { yPercent: -intensidade / 6 },
        {
          yPercent: intensidade / 6,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Contador. Dispara uma vez, com tabular-nums para o número não tremer. */
export function Contador({ para, sufixo = "" }: { para: number; sufixo?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const obj = { v: 0 };
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = String(para) + sufixo;
        return;
      }
      gsap.to(obj, {
        v: para,
        duration: 1.2,
        ease: EASE,
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v)) + sufixo;
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className="u-tabular">
      0{sufixo}
    </span>
  );
}
