import type { Metadata } from "next";
import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Curva } from "@/components/Curva";
import { Icone } from "@/components/Icone";
import { Pix } from "@/components/Pix";
import { Reveal } from "@/components/Motion";
import { BotaoLink } from "@/components/Botao";
import { destinoRecursos as destino } from "@/lib/dados";

export const metadata: Metadata = {
  title: "Apoie",
  description:
    "Formas de apoiar o Projeto Esportivo Cláudio Brandão: PIX, transferência, patrocínio, parceria e voluntariado.",
};

/**
 * Interruptor da tela completa de apoio.
 *
 * Enquanto as contrapartidas de patrocínio e o destino dos recursos não estão
 * fechados, a página mostra só o que já é definitivo: como o dinheiro chega.
 * As quatro formas de apoiar, o "para onde vai" e o fechamento continuam
 * escritos abaixo, intactos. Para trazer a tela antiga de volta é trocar esta
 * linha para `true`, nada mais.
 */
const TELA_COMPLETA = false;

const formas = [
  {
    titulo: "Doe",
    texto:
      "Contribuição pontual ou mensal de pessoa física. Vai direto para material, uniforme e transporte das equipes.",
    detalhe: "PIX e transferência, logo abaixo",
  },
  {
    titulo: "Patrocine",
    texto:
      "Empresas que queiram associar a marca ao projeto. Contrapartidas combinadas caso a caso, com prestação de contas.",
    detalhe: "Proposta sob demanda",
  },
  {
    titulo: "Faça parceria",
    texto:
      "Cessão de espaço, material esportivo, transporte, alimentação ou apoio técnico nos festivais.",
    detalhe: "Aberto a instituições e comércio local",
  },
  {
    titulo: "Seja voluntário",
    texto:
      "Apoio em treino, organização de festival, comunicação e registro fotográfico das equipes.",
    detalhe: "Disponibilidade combinada",
  },
];


export default function Apoie() {
  return (
    <>
      <CabecalhoPagina
        sobretitulo="Apoie"
        titulo="Mude uma história"
        texto={
          TELA_COMPLETA
            ? "Gratuito para quem participa. Há quatro formas de estar junto."
            : "Gratuito para quem participa, sustentado por quem apoia."
        }
      />

      {TELA_COMPLETA && (
        <section className="u-sec bg-white" aria-labelledby="t-formas">
          <div className="mx-auto max-w-[1320px] px-5 md:px-10">
            <h2 id="t-formas" className="sr-only">
              Formas de apoiar
            </h2>

            <div className="grid gap-3 md:grid-cols-2 md:gap-5">
              {formas.map((f, i) => (
                <Reveal key={f.titulo} delay={i * 0.05} className="h-full">
                  <article
                    className="flex h-full flex-col justify-between gap-4 rounded-[14px] bg-white p-4
                               ring-1 ring-ink-200 transition-[transform,box-shadow] duration-300
                               ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1
                               hover:shadow-[0_18px_36px_-22px_rgb(0_21_47/0.4)] md:p-7"
                  >
                    <div>
                      <h3 className="u-titulo text-[1.125rem] text-navy-800 md:text-[1.375rem]">
                        {f.titulo}
                      </h3>
                      <p className="mt-2 max-w-[42ch] text-[0.875rem] leading-relaxed text-ink-500 md:mt-3 md:text-[0.9375rem]">
                        {f.texto}
                      </p>
                    </div>
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.11em] text-ink-400">
                      {f.detalhe}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>


      )}

      {/* ---------- como doar ----------
           Com a tela completa ligada, vem depois das quatro formas e sobre
           fundo próprio, para não colar em branco sobre branco. Sozinha na
           página, encosta direto no cabeçalho e fica em branco: curva entre
           dois blocos exige dois blocos. */}
      <section
        className={`relative u-sec ${TELA_COMPLETA ? "bg-ink-25" : "bg-white"}`}
        aria-labelledby="t-doar"
      >
        {TELA_COMPLETA && <Curva de="var(--color-ink-0)" forma="aba" />}
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal className="max-w-[46ch]">
            <p className="u-eyebrow flex items-center gap-2 text-ink-400">
              <Icone nome="QrCode" className="h-4 w-4" />
              Como doar
            </p>
            <h2
              id="t-doar"
              className="u-display mt-2.5 text-[clamp(1.7rem,6.4vw,3.2rem)] text-navy-800 md:mt-4"
            >
              Dois caminhos, um destino
            </h2>
          </Reveal>

          <Reveal className="mt-6 md:mt-10">
            <Pix />
          </Reveal>
        </div>
      </section>
      {TELA_COMPLETA && (
        <>
          {/* para onde vai. O parágrafo sobre prestação de contas saiu: prometia
              um relatório que ainda não existe e alongava a página sem ajudar
              quem chegou aqui para apoiar. O CNPJ continua no rodapé. */}
          {/* Antes era uma lista de larguras extremas: título encostado à
              esquerda e nota encostada à direita, com um metro de vazio no meio
              em 1320px. Agora título e nota andam juntos, e as quatro linhas
              viram grade a partir do tablet. */}
          <section className="relative u-sec bg-ink-50" aria-labelledby="t-destino">
            <Curva de="var(--color-ink-25)" />
            <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
              <Reveal className="max-w-[46ch]">
                <p className="u-eyebrow text-ink-400">Para onde vai</p>
                <h2
                  id="t-destino"
                  className="u-display mt-2.5 text-[clamp(1.7rem,6.4vw,3.2rem)] text-navy-800 md:mt-4"
                >
                  O apoio vira o quê
                </h2>
              </Reveal>

              <Reveal stagger className="mt-6 grid gap-x-10 md:mt-10 md:grid-cols-2">
                {destino.map((d, i) => (
                  <div
                    key={d.item}
                    className="js-reveal flex items-baseline gap-3.5 border-t border-navy-800/12 py-4
                               md:gap-5 md:py-6"
                  >
                    <span className="u-tabular shrink-0 text-[0.75rem] font-bold text-navy-600/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="u-titulo text-[1.0625rem] text-navy-800 md:text-[1.25rem]">
                        {d.item}
                      </h3>
                      <p className="mt-1 text-[0.875rem] leading-snug text-ink-500 md:text-[0.9375rem]">
                        {d.nota}
                      </p>
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </section>

          <section className="on-navy relative isolate overflow-hidden bg-navy-800">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-16 top-1/2 h-[260px] w-[260px]
                         -translate-y-1/2 bg-white/[0.05] md:-right-20 md:h-[400px] md:w-[400px]"
              style={{
                maskImage: "url(/escudo-sm.png)",
                WebkitMaskImage: "url(/escudo-sm.png)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
            />
            <div className="relative mx-auto max-w-[1320px] px-5 py-14 md:px-10 md:py-24">
              <Reveal className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
                <div>
                  <h2 className="u-display max-w-[16ch] text-[clamp(1.7rem,6.4vw,3.4rem)] text-white">
                    Vamos conversar
                  </h2>
                  <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-relaxed text-white/70 md:mt-6 md:text-[1.0625rem]">
                    Conte o que você tem em mente. A gente responde com o que dá para fazer.
                  </p>
                </div>
                <BotaoLink href="/contato" tom="ouro" className="shrink-0">
                  Falar com o projeto
                </BotaoLink>
              </Reveal>
            </div>
          </section>
        </>
      )}
    </>
  );
}
