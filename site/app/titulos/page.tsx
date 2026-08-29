import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Curva } from "@/components/Curva";
import { Icone } from "@/components/Icone";
import { Escudo, QuadroTitulos } from "@/components/QuadroTitulos";
import { Reveal } from "@/components/Motion";
import { BotaoLink } from "@/components/Botao";
import {
  competicoes,
  titulosPorEquipe,
} from "@/lib/dados";

export const metadata: Metadata = {
  title: "Competições",
  description:
    "As conquistas das equipes do Projeto Esportivo Cláudio Brandão no intercolegial metropolitano, nos Jogos Escolares de Belo Horizonte e nos Jogos Escolares de Minas Gerais.",
};

const lista = Object.values(competicoes);

export default function Titulos() {
  return (
    <>
      {/* A abertura é o elenco do vôlei, a maior frente do projeto. A foto de
          uma equipe campeã específica dizia que a página era daquela equipe. */}
      <CabecalhoPagina
        sobretitulo="Competições"
        titulo="Competindo para aprender"
        texto="Os principais eventos que incentivam o Esporte Escolar."
        foto={{
          src: "/fotos/elenco-volei-feminino.webp",
          movel: "/fotos/elenco-volei-feminino-movel.webp",
          alt: "Elenco do Vôlei feminino reunido no ginásio do Vale do Jatobá",
          posicao: "50% 62%",
          posicaoMobile: "50% 52%",
        }}
      />

      {/* ---------- nossas competições ----------
           Abre a página: o título só quer dizer alguma coisa depois que se
           sabe onde ele foi disputado.

           O escudo vive num ladrilho de proporção fixa com `object-contain`.
           Antes ele era dimensionado pela altura e a marca mais quadrada
           estourava a caixa e aparecia cortada pela metade. */}
      <section className="on-navy relative u-sec bg-navy-950" aria-labelledby="t-competicoes">
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal>
            <p className="u-eyebrow text-white/50">Eventos</p>
            <h2
              id="t-competicoes"
              className="u-display mt-2.5 text-[clamp(1.7rem,6.4vw,3.2rem)] text-white md:mt-4"
            >
              Nossas competições
            </h2>
          </Reveal>

          {/* mesma linha única da home: quatro calendários, quatro colunas */}
          <Reveal stagger className="mt-7 grid gap-3 md:mt-12 md:grid-cols-4 md:gap-4 lg:gap-5">
            {lista.map((c) => (
              <article
                key={c.sigla}
                className="js-reveal flex h-full items-center gap-3.5 rounded-[16px] border border-white/12
                           bg-white/[0.045] p-3 md:flex-col md:items-stretch md:gap-5 md:p-6"
              >
                {/* no celular a marca vira selo ao lado do texto: em cima, em
                    16:9, cada competição sozinha ocupava meia tela de altura */}
                <span
                  className={`relative block h-[52px] w-[72px] shrink-0 overflow-hidden rounded-[10px] ring-1
                              md:aspect-16/9 md:h-auto md:w-full
                              ${c.fundo === "escuro" ? "bg-navy-900 ring-white/12" : "bg-white ring-white/10"}`}
                >
                  <Image
                    src={c.logo}
                    alt={`Escudo do ${c.nome}`}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 72px, 22vw"
                    className="object-contain p-1.5 md:p-3.5 lg:p-5"
                  />
                </span>

                <div className="min-w-0">
                  <p className="u-eyebrow text-gold-300">{c.sigla}</p>
                  <h3 className="u-titulo mt-1 text-[0.9375rem] leading-tight text-white md:mt-1.5 md:text-[1.25rem]">
                    {c.nome}
                  </h3>
                  <p className="mt-1 text-[0.75rem] leading-snug text-white/55 md:mt-1.5 md:text-[0.8125rem]">
                    {c.ambito}
                  </p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- equipe por equipe ----------
           Foto da equipe de um lado, conquistas do outro, em linhas separadas
           por régua. Card dentro de card era o problema anterior: a caixa da
           conquista repetia a borda do bloco da equipe e nada dizia quem
           mandava em quem. Régua não tem borda para competir. */}
      <section className="relative u-sec bg-white" aria-labelledby="t-equipes">
        <Curva de="var(--color-navy-950)" forma="onda" />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal className="max-w-[46ch]">
            <p className="u-eyebrow text-ink-400">Nós somos</p>
            <h2
              id="t-equipes"
              className="u-display mt-2.5 text-[clamp(1.7rem,6.4vw,3.2rem)] text-navy-800 md:mt-4"
            >
              Equipe por equipe
            </h2>
          </Reveal>

          <div className="mt-8 flex flex-col gap-9 md:mt-12 md:gap-14">
            {titulosPorEquipe.map(({ modalidade, lista }) => {
              const conquistas = lista.reduce((n, t) => n + t.anos.length, 0);
              return (
                <Reveal key={modalidade.slug}>
                  <article className="grid gap-5 lg:grid-cols-[0.5fr_1fr] lg:items-start lg:gap-12">
                    <Link
                      href={`/modalidades/${modalidade.slug}`}
                      className="group block overflow-hidden rounded-[16px] bg-navy-900
                                 transition-[transform,box-shadow] duration-300
                                 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1
                                 hover:shadow-[0_22px_44px_-24px_rgb(0_21_47/0.5)]"
                    >
                      <span className="relative block aspect-16/9">
                        {modalidade.capa && (
                          <Image
                            src={modalidade.capa.src}
                            alt=""
                            fill
                            loading="lazy"
                            sizes="(max-width: 1024px) 100vw, 34vw"
                            style={{ objectPosition: modalidade.capa.posicao ?? "50% 50%" }}
                            className="object-cover transition-transform duration-[700ms]
                                       ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
                          />
                        )}
                        <span
                          aria-hidden
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(0,14,34,0) 45%, rgba(0,14,34,.88) 100%)",
                          }}
                        />
                        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5 md:p-4">
                          <span className="u-titulo text-[1.0625rem] text-white md:text-[1.25rem]">
                            {modalidade.nome}
                          </span>
                          <span className="u-tabular shrink-0 pb-0.5 text-[0.6875rem] font-semibold text-white/60">
                            {conquistas === 1 ? "1 título" : `${conquistas} títulos`}
                          </span>
                        </span>
                      </span>
                    </Link>

                    {/* Uma linha por conquista, régua no lugar de card: card
                        dentro de card repetia a borda do bloco da equipe e
                        empilhava altura sem dizer quem mandava em quem. */}
                    <ul role="list" className="flex list-none flex-col border-b border-navy-800/12 p-0">
                      {lista.map((t) => {
                        const c = competicoes[t.competicao];
                        return (
                          <li key={t.competicao}>
                            <Link
                              href={`/modalidades/${t.slug}`}
                              className="group flex items-center gap-3.5 border-t border-navy-800/12 py-3.5
                                         transition-colors duration-[160ms] hover:border-navy-800/25 md:gap-5 md:py-5"
                            >
                              <Escudo competicao={t.competicao} className="h-10 w-[52px] md:h-11 md:w-[58px]" />

                              <span className="min-w-0 flex-1">
                                <span className="u-titulo block text-[1rem] text-navy-800 md:text-[1.25rem]">
                                  {t.conquista}
                                  <span className="ml-1.5 text-[0.75rem] font-bold uppercase tracking-[0.1em] text-navy-600">
                                    {c.sigla}
                                  </span>
                                </span>
                                <span className="mt-0.5 block text-[0.75rem] leading-snug text-ink-500 md:text-[0.8125rem]">
                                  {c.nome}
                                </span>
                              </span>

                              {/* anos em linha única: em coluna, o bloco crescia
                                  três vezes para dizer três números */}
                              <span className="u-tabular shrink-0 text-[0.8125rem] font-semibold text-navy-700 md:text-[0.875rem]">
                                {t.anos.length > 0 ? (
                                  t.anos.join(" · ")
                                ) : (
                                  <span className="font-medium text-ink-400">ano a confirmar</span>
                                )}
                              </span>

                              <Icone
                                nome="CaretRight"
                                className="hidden h-3.5 w-3.5 shrink-0 text-ink-400 transition-transform
                                           duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                                           group-hover:translate-x-0.5 sm:block"
                              />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- a estante, por temporada ----------
           Fecha a página, depois das equipes: quem conquistou vem antes do
           quadro que soma as temporadas. A faixa de números soltos que estava
           aqui contava o mesmo três vezes pior: agora o total está na linha de
           apoio do cabeçalho e o quadro mostra de onde ele sai. */}
      <section className="relative u-sec bg-ink-50" aria-labelledby="t-quadro">
        <Curva de="var(--color-ink-0)" forma="arco" />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal className="max-w-[46ch]">
            <p className="u-eyebrow flex items-center gap-2 text-ink-400">
              <Icone nome="Trophy" className="h-4 w-4" />
              Temporada a temporada
            </p>
            <h2
              id="t-quadro"
              className="u-display mt-2.5 text-[clamp(1.7rem,6.4vw,3.2rem)] text-navy-800 md:mt-4"
            >
              A estante
            </h2>
          </Reveal>

          <Reveal className="mt-8 md:mt-14">
            <QuadroTitulos tom="claro" />
          </Reveal>
        </div>
      </section>

      <section className="u-sec-tight bg-white">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal className="flex flex-col items-start gap-5 rounded-[18px] bg-ink-25 p-5 ring-1 ring-ink-200 md:flex-row md:items-center md:justify-between md:p-9">
            <div>
              <h2 className="u-titulo text-[1.25rem] text-navy-800 md:text-[1.5rem]">
                Quer conhecer quem está por trás disso?
              </h2>
              <p className="mt-1.5 max-w-[46ch] text-[0.875rem] leading-relaxed text-ink-500">
                Veja a gestão, os responsáveis e os documentos do projeto.
              </p>
            </div>
            <BotaoLink href="/transparencia" className="shrink-0">
              Conhecer a gestão
            </BotaoLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
