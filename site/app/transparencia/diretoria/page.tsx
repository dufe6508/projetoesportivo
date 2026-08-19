import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Icone } from "@/components/Icone";
import { Reveal } from "@/components/Motion";
import { BotaoLink, Acoes } from "@/components/Botao";
import { contato, diretoria, mandatoDiretoria } from "@/lib/dados";

export const metadata: Metadata = {
  title: "Diretoria",
  description: `Composição da diretoria da ${contato.razaoSocial}, responsável pelo Projeto Esportivo Cláudio Brandão.`,
};

export default function Diretoria() {
  const vazia = diretoria.length === 0;

  return (
    <>
      <CabecalhoPagina
        sobretitulo="Transparência"
        titulo="Diretoria"
        texto={`${mandatoDiretoria}. Quem assume cada responsabilidade na ${contato.razaoSocial}.`}
      />

      <section className="u-sec bg-white" aria-labelledby="t-membros">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <h2 id="t-membros" className="sr-only">
            Composição da diretoria
          </h2>

          {vazia ? (
            /* Estado de espera desenhado: enquanto a ata não é registrada, a
               página diz o que falta e para onde ir, em vez de mostrar uma
               grade vazia ou nomes provisórios. */
            <Reveal>
              <div className="relative overflow-hidden rounded-[22px] bg-navy-950 px-5 py-10 text-center md:px-10 md:py-16">
                <Image
                  src="/escudo.png"
                  alt=""
                  width={340}
                  height={340}
                  className="pointer-events-none absolute -right-12 -top-10 w-[200px] opacity-[0.05]
                             md:-right-6 md:w-[300px]"
                />
                <div className="on-navy relative mx-auto max-w-[46ch]">
                  <span
                    aria-hidden
                    className="mx-auto grid h-12 w-12 place-items-center rounded-[14px] bg-white/10 text-white"
                  >
                    <Icone nome="UsersThree" className="h-5 w-5" />
                  </span>
                  <p className="u-eyebrow mt-5 text-white/50">{mandatoDiretoria}</p>
                  <h3 className="u-titulo mt-2 text-[1.35rem] text-white md:text-[1.75rem]">
                    A composição ainda não foi publicada
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/65">
                    A associação foi criada em julho de 2026 e os nomes entram aqui assim que a ata
                    de eleição estiver registrada, com cargo e responsabilidade de cada pessoa. Até
                    lá, quem quiser falar com quem responde pelo projeto pode escrever para a
                    coordenação.
                  </p>
                  <Acoes className="mt-7 justify-center">
                    <BotaoLink href="/contato" tom="claro">
                      Falar com a coordenação
                    </BotaoLink>
                    <BotaoLink href="/transparencia" tom="contornoClaro">
                      Voltar à transparência
                    </BotaoLink>
                  </Acoes>
                </div>
              </div>
            </Reveal>
          ) : (
            <ul
              role="list"
              className="grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-3 md:gap-5 lg:grid-cols-4"
            >
              {diretoria.map((d, i) => (
                <li key={d.nome} className="h-full">
                  <Reveal delay={i * 0.05} className="h-full">
                    <figure
                      className="group m-0 flex h-full flex-col overflow-hidden rounded-[18px]
                                 border border-ink-200 bg-white transition-[transform,box-shadow,border-color]
                                 duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1
                                 hover:border-ink-300 hover:shadow-[0_18px_36px_-20px_rgb(0_21_47/0.45)]"
                    >
                      <div className="relative aspect-3/4 overflow-hidden bg-navy-800">
                        {d.foto ? (
                          <Image
                            src={d.foto}
                            alt={`${d.nome}, ${d.cargo}`}
                            fill
                            loading={i < 4 ? "eager" : "lazy"}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 24vw"
                            className="object-cover transition-transform duration-[700ms]
                                       ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
                          />
                        ) : (
                          /* sem retrato ainda: bloco da marca, nunca um cinza vazio */
                          <span aria-hidden className="absolute inset-0 grid place-items-center">
                            <Image
                              src="/escudo.png"
                              alt=""
                              width={150}
                              height={150}
                              className="h-[42%] w-auto opacity-[0.22]"
                            />
                          </span>
                        )}
                      </div>

                      <figcaption className="flex flex-1 flex-col px-3 py-3 md:px-3.5 md:py-3.5">
                        <span className="u-eyebrow text-ink-400">{d.cargo}</span>
                        <span className="u-titulo mt-1.5 block text-[0.9375rem] leading-tight text-navy-800">
                          {d.nome}
                        </span>
                        {d.atribuicao && (
                          <span className="mt-1.5 block text-[0.75rem] leading-snug text-ink-500">
                            {d.atribuicao}
                          </span>
                        )}
                      </figcaption>
                    </figure>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ---------- volta ao índice de transparência ---------- */}
      {!vazia && (
        <section className="u-sec-tight bg-ink-25">
          <div className="mx-auto max-w-[1320px] px-5 md:px-10">
            <Reveal className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-8">
              <p className="u-measure text-[0.9375rem] leading-relaxed text-ink-500">
                Estatuto, CNPJ, documentos e destino dos recursos ficam na página de
                transparência.
              </p>
              <Link
                href="/transparencia"
                className="group inline-flex min-h-[44px] shrink-0 items-center gap-2
                           text-[0.9375rem] font-semibold text-navy-800"
              >
                Ver a transparência
                <Icone
                  nome="ArrowRight"
                  className="h-4 w-4 transition-transform duration-300
                             ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}
