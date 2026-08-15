import Image from "next/image";
import { FotoCapa } from "./FotoCapa";
import { Reveal } from "./Motion";

/**
 * Abertura das páginas internas.
 *
 * O vão entre a barra de navegação e o título era o maior desperdício de tela
 * do site no celular: 144px de topo para uma barra de 66px. Agora o respiro
 * acompanha a altura real da barra, e o bloco todo encolhe cerca de 40% em
 * mobile sem mexer no desktop.
 */
export function CabecalhoPagina({
  sobretitulo,
  titulo,
  texto,
  acoes,
  foto,
}: {
  sobretitulo: string;
  titulo: string;
  texto?: string;
  acoes?: React.ReactNode;
  /** quando existe, entra no lugar do fundo em degradê */
  foto?: {
    src: string;
    movel?: string;
    alt: string;
    posicao?: string;
    posicaoMobile?: string;
  };
}) {
  return (
    <header
      className="on-navy relative overflow-hidden rounded-b-[26px] bg-navy-900 md:rounded-b-[44px]"
    >
      {foto ? (
        <>
          <FotoCapa
            src={foto.src}
            movel={foto.movel}
            alt={foto.alt}
            prioridade
            posicao={foto.posicao ?? "50% 50%"}
            posicaoMobile={foto.posicaoMobile ?? foto.posicao ?? "50% 50%"}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,14,34,.93) 0%, rgba(0,14,34,.84) 42%, rgba(0,14,34,.55) 74%, rgba(0,14,34,.74) 100%)",
            }}
          />
        </>
      ) : (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(90% 120% at 78% 0%, #003D95 0%, #00214F 45%, #00152F 78%)",
            }}
          />
          <Image
            src="/escudo.png"
            alt=""
            width={380}
            height={380}
            className="pointer-events-none absolute -right-16 -top-16 h-[240px] w-[240px] opacity-[0.06]
                       md:-right-20 md:-top-24 md:h-[380px] md:w-[380px]"
          />
        </>
      )}

      {/* com foto o bloco cresce: sem folga abaixo do texto a imagem vira uma
          tarja escura e não se lê o que ela mostra */}
      <div
        className={`relative mx-auto max-w-[1320px] px-5 pb-9 pt-[5.25rem] md:px-10 md:pb-20
                    md:pt-[9.5rem] ${foto ? "pb-24 md:pb-36" : ""}`}
      >
        <Reveal>
          <p className="u-eyebrow text-white/55">{sobretitulo}</p>
          <h1 className="u-display mt-2 max-w-[20ch] text-[clamp(1.75rem,6.6vw,4.25rem)] text-white md:mt-3">
            {titulo}
          </h1>
          {texto && (
            <p className="mt-2.5 max-w-[36ch] text-[0.875rem] leading-relaxed text-white/70 md:mt-4 md:max-w-[44ch] md:text-[1.0625rem]">
              {texto}
            </p>
          )}
          {acoes && <div className="mt-6 md:mt-8">{acoes}</div>}
        </Reveal>
      </div>
    </header>
  );
}
