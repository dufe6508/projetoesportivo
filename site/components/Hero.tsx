"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FotoCapa } from "./FotoCapa";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Icone } from "./Icone";

gsap.registerPlugin(useGSAP);

/**
 * Hero em carrossel com as fotos reais do projeto.
 *
 * Legibilidade: a foto recebe um escurecimento de base uniforme, mais um
 * gradiente da esquerda para o texto e uma faixa no topo para a barra de
 * navegação. Sem isso a nav sumia sobre céu claro.
 *
 * Acessibilidade: setas e pontos são botões de verdade, o giro para no hover
 * e no foco, e não existe quando o usuário pede menos movimento.
 */

type Lamina = {
  foto: string;
  /** recorte 3:4 servido no celular, ver components/FotoCapa.tsx */
  fotoMovel?: string;
  posicao?: string;
  posicaoMobile?: string;
  titulo: string;
  apoio: string;
};

/**
 * Duas lâminas, os dois elencos em atividade. A foto da quadra vazia saiu:
 * era a terceira parada de um giro que ninguém espera até o fim, e dizia
 * menos sobre o projeto do que qualquer elenco diz.
 */
/**
 * `posicao` tem duas leituras porque o recorte muda de natureza: no celular a
 * foto 16:9 entra num retrato e o corte é horizontal, no desktop é vertical.
 * Sem separar as duas, ou sobra teto no monitor ou some rosto no telefone.
 */
const laminas: Lamina[] = [
  {
    foto: "/fotos/elenco-volei-feminino.webp",
    fotoMovel: "/fotos/elenco-volei-feminino-movel.webp",
    posicao: "50% 58%",
    posicaoMobile: "50% 50%",
    titulo: "Esporte que transforma",
    apoio: "Voleibol e Futsal para adolescentes e jovens.",
  },
  {
    // o convite ao patrocínio entra sobre o elenco do futsal: quem sustenta o
    // material, o uniforme e o transporte sustenta um grupo, não uma quadra
    // recorte 16:9 fechado no grupo (ver _novas.mjs): no quadro largo do
    // elenco o time saía do tamanho de um rodapé na tela do monitor
    foto: "/fotos/hero-futsal-feminino.webp",
    fotoMovel: "/fotos/elenco-futsal-feminino-movel.webp",
    posicao: "50% 50%",
    posicaoMobile: "50% 50%",
    titulo: "Seja um patrocinador",
    apoio: "Ajude o desenvolvimento do projeto.",
  },
];

const GIRO = 7000;

export function Hero() {
  const [atual, setAtual] = useState(0);
  const [pausado, setPausado] = useState(false);
  const raiz = useRef<HTMLElement>(null);

  const ir = useCallback((i: number) => setAtual((i + laminas.length) % laminas.length), []);

  useEffect(() => {
    if (pausado) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => ir(atual + 1), GIRO);
    return () => clearTimeout(t);
  }, [atual, pausado, ir]);

  // cada troca reanima o texto: sem isso a lâmina nova entra seca
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        "[data-ativa] [data-anima]",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.07 },
      );
    },
    { scope: raiz, dependencies: [atual] },
  );

  return (
    <section
      ref={raiz}
      className="relative isolate h-[68svh] min-h-[420px] w-full overflow-hidden
                 bg-navy-950 md:h-[90svh] md:min-h-[560px]"
      aria-roledescription="carrossel"
      aria-label="Destaques do projeto"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocusCapture={() => setPausado(true)}
      onBlurCapture={() => setPausado(false)}
    >
      {laminas.map((l, i) => (
        <div
          key={l.foto}
          data-ativa={i === atual ? "" : undefined}
          aria-hidden={i !== atual}
          className={`absolute inset-0 transition-opacity duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]
                      ${i === atual ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <FotoCapa
            src={l.foto}
            movel={l.fotoMovel}
            alt=""
            prioridade={i === 0}
            posicao={l.posicao ?? "50% 50%"}
            posicaoMobile={l.posicaoMobile ?? l.posicao ?? "50% 50%"}
            className={`transition-transform duration-[9000ms] ease-linear
                        ${i === atual ? "scale-[1.06]" : "scale-100"}`}
          />

          {/* No monitor o texto abre no alto da foto e o escurecimento
              acompanha. No celular o recorte 3:4 fecha no grupo e sobra pouca
              parede: ali o texto desce para o pé, o miolo da foto fica limpo e
              só o topo mantém a sombra que a barra de navegação precisa. */}
          <div
            aria-hidden
            className="absolute inset-0 md:hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,14,34,.5) 0%, rgba(0,14,34,.18) 26%, rgba(0,14,34,.03) 46%, rgba(0,14,34,.55) 76%, rgba(0,14,34,.94) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,14,34,.9) 0%, rgba(0,14,34,.72) 26%, rgba(0,14,34,.28) 52%, rgba(0,14,34,.5) 100%)",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,14,34,.78) 0%, rgba(0,14,34,.42) 44%, rgba(0,14,34,0) 78%)",
            }}
          />

          <div className="relative flex h-full items-end pb-14 md:items-start md:pb-0">
            <div className="mx-auto w-full max-w-[1320px] px-5 md:px-10 md:pt-[7.75rem]">
              {/* Sem a linha de localização e com título curto: o bairro já
                  aparece no apoio, no rodapé e na página de contato, e era o
                  terceiro nível de texto competindo dentro do mesmo bloco. */}
              <div className="max-w-[58ch]">
                <h1
                  data-anima
                  className="u-display max-w-[15ch] text-[clamp(1.7rem,7.6vw,4.25rem)] text-white md:max-w-[20ch]"
                >
                  {l.titulo}
                </h1>
                <p
                  data-anima
                  className="mt-2 max-w-[34ch] text-[0.9375rem] leading-snug text-white/75
                             md:mt-4 md:max-w-[38ch] md:text-[1.0625rem] md:leading-relaxed"
                >
                  {l.apoio}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Setas nas laterais, sem moldura, integradas à foto. Antes ficavam
          empilhadas no rodapé do hero disputando espaço com os CTAs. */}
      <div className="pointer-events-none absolute inset-y-0 inset-x-0 z-10 flex items-center justify-between px-1 md:px-3">
        {(
          [
            ["CaretLeft", -1, "Destaque anterior"],
            ["CaretRight", 1, "Próximo destaque"],
          ] as const
        ).map(([icone, passo, rotulo]) => (
          <button
            key={rotulo}
            onClick={() => ir(atual + passo)}
            aria-label={rotulo}
            className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full
                       text-white/70 transition-[color,background-color,transform] duration-[160ms]
                       ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/10 hover:text-white
                       active:scale-[0.92]"
          >
            <Icone nome={icone} className="h-5 w-5 drop-shadow-[0_1px_6px_rgba(0,14,34,.8)]" />
          </button>
        ))}
      </div>

      {/* posição, centralizada no pé */}
      <div className="absolute inset-x-0 bottom-3 z-10 md:bottom-8">
        <div className="flex items-center justify-center gap-2">
          {laminas.map((l, i) => (
            <button
              key={l.foto}
              onClick={() => ir(i)}
              aria-label={`Ir para o destaque ${i + 1}: ${l.titulo}`}
              aria-current={i === atual}
              className="grid h-11 w-7 place-items-center"
            >
              <span
                aria-hidden
                className={`block h-[2.5px] rounded-full transition-all duration-300
                            ease-[cubic-bezier(0.23,1,0.32,1)]
                            ${i === atual ? "w-8 bg-white" : "w-3.5 bg-white/40 hover:bg-white/70"}`}
              />
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Destaque {atual + 1} de {laminas.length}: {laminas[atual].titulo}
      </p>
    </section>
  );
}
