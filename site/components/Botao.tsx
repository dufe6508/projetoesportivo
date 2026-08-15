"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icone } from "./Icone";

/**
 * Botão do projeto, versão sóbria.
 * Sem brilho colorido, sem seta por padrão: o brilho lia como plástico e a
 * seta virava ruído em toda tela. A profundidade agora é só contraste de
 * superfície, e o clique responde com uma redução mínima de escala.
 * Ícone só quando ele diz algo, via a prop `icone`.
 */

type Tom = "solido" | "claro" | "ouro" | "contorno" | "contornoClaro" | "texto";

const base =
  "group inline-flex select-none items-center justify-center gap-2 rounded-full " +
  "font-semibold leading-none tracking-[0.004em] " +
  "transition-[background-color,color,border-color,transform] duration-[160ms] " +
  "ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-none";

// Uma medida só para todas as variantes: mesma altura, mesmo raio, mesma
// tipografia. No celular o padding horizontal encolhe para que dois CTAs
// irmãos caibam lado a lado em 320px em vez de empilhar.
const medida =
  "min-h-[46px] px-4 text-[0.875rem] xs:px-6 xs:text-[0.9375rem] " +
  "whitespace-nowrap text-center";

const tons: Record<Tom, string> = {
  // principal sobre fundo claro
  solido: `${medida} bg-navy-800 text-white hover:bg-navy-700`,
  // principal sobre fundo escuro
  claro: `${medida} bg-white text-navy-800 hover:bg-navy-50`,
  // reservado para doação, o único lugar onde o ouro carrega significado
  ouro: `${medida} bg-gold-300 text-navy-900 hover:bg-gold-400`,
  contorno: `${medida} border border-navy-800/18 text-navy-800 hover:border-navy-800/40 hover:bg-navy-800/[0.04]`,
  contornoClaro: `${medida} border border-white/28 text-white hover:border-white/55 hover:bg-white/10`,
  texto: "min-h-[44px] px-0.5 text-[0.9375rem] text-navy-700 hover:text-navy-800",
};

/**
 * Par de CTAs. No celular divide a linha; a partir de 480px cada botão volta
 * à largura do próprio rótulo. Empilhar dois botões de largura total era o
 * que mais comia tela nas páginas internas.
 */
export function Acoes({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`u-acoes ${className}`}>{children}</div>;
}

function Conteudo({
  tom,
  icone,
  children,
}: {
  tom: Tom;
  icone?: string;
  children: ReactNode;
}) {
  return (
    <>
      {tom === "texto" ? (
        <span className="relative">
          {children}
          <span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px w-full bg-current opacity-30
                       transition-opacity duration-[160ms] group-hover:opacity-100"
          />
        </span>
      ) : (
        <span>{children}</span>
      )}
      {icone && <Icone nome={icone} className="h-[17px] w-[17px] shrink-0" />}
    </>
  );
}

type Extra = { tom?: Tom; icone?: string; children: ReactNode };

export function BotaoLink({
  tom = "solido",
  icone,
  className = "",
  children,
  ...props
}: Extra & ComponentProps<typeof Link>) {
  return (
    <Link className={`${base} ${tons[tom]} ${className}`} {...props}>
      <Conteudo tom={tom} icone={icone}>
        {children}
      </Conteudo>
    </Link>
  );
}

export function Botao({
  tom = "solido",
  icone,
  className = "",
  children,
  ...props
}: Extra & ComponentProps<"button">) {
  return (
    <button className={`${base} ${tons[tom]} ${className}`} {...props}>
      <Conteudo tom={tom} icone={icone}>
        {children}
      </Conteudo>
    </button>
  );
}
