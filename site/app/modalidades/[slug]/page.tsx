import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardPessoa } from "@/components/CardPessoa";
import { Carrossel, CarrosselItem } from "@/components/Carrossel";
import { Galeria } from "@/components/Galeria";
import { HeroModalidade } from "@/components/HeroModalidade";
import { Icone } from "@/components/Icone";
import { Reveal } from "@/components/Motion";
import { BotaoLink, Acoes } from "@/components/Botao";
import { modalidades } from "@/lib/dados";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return modalidades.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const m = modalidades.find((x) => x.slug === slug);
  return m ? { title: m.nome, description: m.resumo } : {};
}

export default async function Pagina({ params }: Params) {
  const { slug } = await params;
  const m = modalidades.find((x) => x.slug === slug);
  if (!m) notFound();

  const outras = modalidades.filter((x) => x.slug !== slug);

  return (
    <>
      <HeroModalidade m={m} />

      {/* ---------- destaque + texto ----------
           No celular a foto abre a página inteira e o texto vem embaixo. No
           monitor os dois dividem a linha: a mesma foto em largura cheia
           passava de 500px de altura e engolia a dobra. */}
      <section className="u-sec bg-white" aria-labelledby="t-sobre">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <div
            className={
              m.destaque
                ? "grid items-center gap-7 lg:grid-cols-[1.05fr_1fr] lg:gap-14"
                : "max-w-[58ch]"
            }
          >
            {m.destaque && (
              <Reveal>
                <figure className="relative m-0 overflow-hidden rounded-[18px] bg-navy-900">
                  <div className="relative aspect-4/3 sm:aspect-16/9 lg:aspect-4/3">
                    <Image
                      src={m.destaque.src}
                      alt={m.destaque.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 52vw"
                      style={
                        {
                          objectPosition: m.destaque.posicao ?? "50% 50%",
                          "--pos-mobile":
                            m.destaque.posicaoMobile ?? m.destaque.posicao ?? "50% 50%",
                        } as React.CSSProperties
                      }
                      className="hero-foto object-cover"
                    />
                  </div>
                  {m.destaqueTitulo && (
                    <>
                      <span
                        aria-hidden
                        className="absolute inset-x-0 bottom-0 h-20"
                        style={{
                          background: "linear-gradient(180deg, transparent, rgba(0,14,34,.88))",
                        }}
                      />
                      <figcaption
                        className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-3.5
                                   text-[0.8125rem] font-semibold text-white md:p-5"
                      >
                        <Icone nome="Medal" className="h-4 w-4 shrink-0 text-gold-300" />
                        {m.destaqueTitulo}
                      </figcaption>
                    </>
                  )}
                </figure>
              </Reveal>
            )}

            <Reveal>
              <h2 id="t-sobre" className="sr-only">
                Sobre o {m.nome}
              </h2>
              <div className="flex max-w-[52ch] flex-col gap-3.5 text-[1rem] leading-[1.7] text-ink-700 md:text-[1.0625rem] md:leading-[1.8]">
                {m.descricao.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <Acoes className="mt-7">
                <BotaoLink href="/contato">Quero participar</BotaoLink>
                <BotaoLink href="/apoie" tom="contorno">
                  Apoiar
                </BotaoLink>
              </Acoes>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- elenco ---------- */}
      {m.atletas.length > 0 && (
        <section className="u-sec bg-ink-100" aria-labelledby="t-elenco">
          <div className="mx-auto max-w-[1320px] px-5 md:px-10">
            <Reveal className="flex items-end justify-between gap-5">
              <h2
                id="t-elenco"
                className="u-display text-[clamp(1.6rem,6vw,3rem)] text-navy-800"
              >
                Elenco
              </h2>
              <p className="u-tabular shrink-0 pb-1 text-[0.8125rem] text-ink-400">
                {m.atletas.length} atletas
              </p>
            </Reveal>
          </div>

          {/* fora do contêiner: o trilho sangra até a borda da tela */}
          <div className="mx-auto max-w-[1400px]">
            <Carrossel rotulo={`Elenco do ${m.nome}`} className="mt-6 md:mt-9">
              {m.atletas.map((p, i) => (
                <CarrosselItem key={p.foto}>
                  <CardPessoa p={p} prioridade={i < 3} />
                </CarrosselItem>
              ))}
            </Carrossel>
          </div>
        </section>
      )}

      {/* ---------- comissão técnica ---------- */}
      {m.comissao.length > 0 && (
        <section className="u-sec bg-white" aria-labelledby="t-comissao">
          <div className="mx-auto max-w-[1320px] px-5 md:px-10">
            <Reveal>
              <h2
                id="t-comissao"
                className="u-display text-[clamp(1.6rem,6vw,3rem)] text-navy-800"
              >
                Comissão técnica
              </h2>
            </Reveal>

            <div className="mt-6 grid grid-cols-2 gap-3 md:mt-9 md:gap-5 lg:grid-cols-4">
              {m.comissao.map((p) => (
                <Reveal key={p.foto}>
                  <CardPessoa p={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- competição e rotina ---------- */}
      {m.registros.length > 0 && (
        <section className="on-navy u-sec bg-navy-950" aria-labelledby="t-registros">
          <div className="mx-auto max-w-[1320px] px-5 md:px-10">
            <Reveal>
              <h2
                id="t-registros"
                className="u-display text-[clamp(1.6rem,6vw,3rem)] text-white"
              >
                Competição e rotina
              </h2>
            </Reveal>

            <Reveal className="mt-6 md:mt-9">
              <Galeria fotos={m.registros} rotulo={`Registros do ${m.nome}`} />
            </Reveal>
          </div>
        </section>
      )}

      {/* ---------- navegação entre equipes ----------
           Cards horizontais: miniatura à esquerda, nome à direita. Cabem três
           numa linha no monitor e empilham no celular sem deixar célula vazia,
           que é o que uma grade de 2 colunas com 3 itens sempre deixa. */}
      <section className="u-sec-tight bg-ink-25" aria-labelledby="t-outras">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <h2 id="t-outras" className="u-eyebrow text-ink-400">
            Outras equipes
          </h2>
          <ul role="list" className="mt-4 grid list-none gap-3 p-0 md:mt-6 md:grid-cols-3 md:gap-4">
            {outras.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/modalidades/${o.slug}`}
                  className="group flex items-center gap-3.5 overflow-hidden rounded-[14px] bg-white
                             p-2 pr-3.5 ring-1 ring-ink-200 transition-[transform,box-shadow]
                             duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1
                             hover:shadow-[0_16px_32px_-22px_rgb(0_21_47/0.5)]"
                >
                  <span className="relative aspect-4/3 w-20 shrink-0 overflow-hidden rounded-[9px] bg-navy-800 md:w-24">
                    {o.capa ? (
                      <Image
                        src={o.capa.src}
                        alt=""
                        fill
                        loading="lazy"
                        sizes="96px"
                        style={{ objectPosition: o.capa.posicao ?? "50% 50%" }}
                        className="object-cover transition-transform duration-[700ms]
                                   ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
                      />
                    ) : (
                      <Image
                        src="/escudo.png"
                        alt=""
                        width={80}
                        height={80}
                        className="absolute left-1/2 top-1/2 h-[54%] w-auto -translate-x-1/2
                                   -translate-y-1/2 opacity-25"
                      />
                    )}
                  </span>

                  <span className="u-titulo min-w-0 flex-1 text-[0.9375rem] text-navy-800">
                    {o.nome}
                  </span>

                  <Icone
                    nome="CaretRight"
                    className="h-3.5 w-3.5 shrink-0 text-ink-400 transition-transform duration-300
                               ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
