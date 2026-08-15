import Image from "next/image";
import { FotoCapa } from "./FotoCapa";
import { Reveal } from "./Motion";
import type { Modalidade } from "@/lib/dados";

/**
 * Abertura das páginas de modalidade.
 *
 * Uma estrutura só para as quatro. A versão anterior tinha quatro
 * composições diferentes e o resultado foi o oposto do pretendido: em vez de
 * ritmo, as páginas pareciam de sites diferentes. O que varia agora é
 * apenas a foto e o ponto de recorte dela.
 *
 * O naipe saiu do rótulo: "Vôlei Feminino" já diz o que a etiqueta repetia.
 */
export function HeroModalidade({ m }: { m: Modalidade }) {
  return (
    <header
      className="on-navy relative isolate flex h-[56svh] min-h-[360px] w-full flex-col justify-start
                 overflow-hidden rounded-b-[26px] bg-navy-950 md:h-[64svh] md:min-h-[480px]
                 md:rounded-b-[44px]"
    >
      {m.elenco ? (
        <FotoCapa
          src={m.elenco.src}
          movel={m.elenco.movel}
          alt={m.elenco.alt}
          prioridade
          posicao={m.elenco.posicao ?? "50% 50%"}
          posicaoMobile={m.elenco.posicaoMobile ?? m.elenco.posicao ?? "50% 50%"}
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "radial-gradient(85% 120% at 24% 0%, #003D95 0%, #00214F 48%, #00152F 82%)",
            }}
          />
          <Image
            src="/escudo.png"
            alt=""
            width={420}
            height={420}
            className="pointer-events-none absolute -right-16 top-1/2 h-[280px] w-[280px]
                       -translate-y-1/2 opacity-[0.07] md:-right-20 md:h-[420px] md:w-[420px]"
          />
        </>
      )}

      {/* escurecimento no topo, onde o texto fica; o pé da foto, onde estão
          as atletas, mantém contraste próprio */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,14,34,.9) 0%, rgba(0,14,34,.7) 28%, rgba(0,14,34,.24) 56%, rgba(0,14,34,.46) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1320px] px-5 pt-[4.75rem] md:px-10 md:pt-[7.75rem]">
        <Reveal>
          {/* max-width folgado e corpo menor: em 11ch, "Vôlei Masculino"
              quebrava em duas linhas por falta de espaço, não por escolha */}
          <p className="u-eyebrow text-white/55">{m.esporte}</p>
          <h1 className="u-display mt-2 max-w-[20ch] text-[clamp(1.75rem,6.6vw,4rem)] text-white md:mt-3">
            {m.nome}
          </h1>
          <p className="mt-2.5 max-w-[30ch] text-[0.875rem] leading-relaxed text-white/70 md:mt-4 md:max-w-[36ch] md:text-[1.0625rem]">
            {m.resumo}
          </p>
        </Reveal>
      </div>
    </header>
  );
}
