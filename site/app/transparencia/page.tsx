import type { Metadata } from "next";
import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Curva } from "@/components/Curva";
import { Icone } from "@/components/Icone";
import { Reveal } from "@/components/Motion";
import { Responsaveis } from "@/components/Responsaveis";
import { BotaoLink } from "@/components/Botao";
import {
  contato,
  destinoRecursos,
  documentos,
  institucional,
  mandatoDiretoria,
  responsaveis,
} from "@/lib/dados";

export const metadata: Metadata = {
  title: "Gestão",
  description:
    "Quem responde pelo projeto, documentos e destino dos recursos do Projeto Esportivo Cláudio Brandão.",
};

/** Ficha da associação. Só o que já existe registrado, com a fonte declarada. */
const ficha = [
  { rotulo: "CNPJ", valor: contato.cnpj },
  { rotulo: "Natureza", valor: institucional.natureza },
  { rotulo: "Fundação", valor: institucional.fundacao },
  { rotulo: "Sede", valor: `${contato.endereco}, ${contato.bairro}` },
];

export default function Transparencia() {
  return (
    <>
      <CabecalhoPagina
        sobretitulo="Gestão"
        titulo="Transparência"
        texto="Quem responde pelo projeto, documentos e destino dos recursos."
      />

      {/* ---------- responsáveis ----------
           Abre a página: antes de estatuto e documento vem o rosto de quem
           assina. Retrato em 4:5 e num tamanho de coluna, não de capa: é
           credencial, não galeria. */}
      <section className="u-sec bg-white" aria-labelledby="t-responsaveis">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal>
            <p className="u-eyebrow flex items-center gap-2 text-ink-400">
              <Icone nome="UsersThree" className="h-4 w-4" />
              {mandatoDiretoria}
            </p>
            <h2
              id="t-responsaveis"
              className="u-display mt-2.5 max-w-[16ch] text-[clamp(1.8rem,7vw,3.2rem)] text-navy-800 md:mt-4"
            >
              Responsáveis
            </h2>
          </Reveal>

          <Responsaveis lista={responsaveis} />
        </div>
      </section>

      {/* ---------- ficha da associação ----------
           Abre pelo que é verificável: quem assina, sob qual CNPJ e desde
           quando. Numa associação nova, esse bloco é a credencial. */}
      <section className="relative u-sec bg-navy-50" aria-labelledby="t-ficha">
        <Curva de="var(--color-ink-0)" forma="arco" />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal>
            <p className="u-eyebrow flex items-center gap-2 text-ink-400">
              <Icone nome="SealCheck" className="h-4 w-4" />
              O projeto
            </p>
            <h2
              id="t-ficha"
              className="u-display mt-2.5 max-w-[20ch] text-[clamp(1.6rem,6vw,2.9rem)] text-navy-800 md:mt-4"
            >
              {contato.razaoSocial}
            </h2>
          </Reveal>

          <Reveal className="mt-7 grid gap-x-12 gap-y-6 md:mt-11 md:grid-cols-2 lg:grid-cols-3">
            {ficha.map((f) => (
              <div key={f.rotulo} className="u-courtrule pt-5">
                <h3 className="u-eyebrow text-ink-400">{f.rotulo}</h3>
                <p className="mt-2 text-[1rem] leading-snug text-navy-800 md:text-[1.0625rem]">
                  {f.valor}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- documentos ----------
           Cada linha declara o próprio estado. Documento que ainda não existe
           aparece como pendência com nome e prazo, nunca como link morto. */}
      <section className="u-sec bg-white" aria-labelledby="t-documentos">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal>
            <p className="u-eyebrow flex items-center gap-2 text-ink-400">
              <Icone nome="FileText" className="h-4 w-4" />
              Documentos
            </p>
            <h2
              id="t-documentos"
              className="u-display mt-2.5 max-w-[18ch] text-[clamp(1.8rem,7vw,3.2rem)] text-navy-800 md:mt-4"
            >
              O que está publicado
            </h2>
          </Reveal>

          <ul role="list" className="mt-7 grid list-none gap-3 p-0 md:mt-10 md:grid-cols-2 md:gap-4">
            {documentos.map((d, i) => {
              const publicado = Boolean(d.arquivo);
              const Bloco = (
                <>
                  <span
                    aria-hidden
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-[11px]
                                transition-colors duration-[220ms]
                                ${publicado ? "bg-navy-800 text-white" : "bg-ink-50 text-ink-400"}`}
                  >
                    <Icone nome={publicado ? "FileText" : "Relogio"} className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="u-titulo block text-[0.9375rem] text-navy-800 md:text-[1rem]">
                      {d.nome}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-relaxed text-ink-500">
                      {d.descricao}
                    </span>
                    <span
                      className={`mt-2.5 inline-flex items-center gap-1.5 text-[0.75rem] font-semibold
                                  ${publicado ? "text-navy-700" : "text-ink-400"}`}
                    >
                      <span
                        aria-hidden
                        className={`h-1.5 w-1.5 rounded-full ${publicado ? "bg-success" : "bg-ink-300"}`}
                      />
                      {publicado ? "Disponível para visualização" : "Em preparação"}
                    </span>
                  </span>
                </>
              );

              const classe =
                "flex h-full items-start gap-3.5 rounded-[16px] bg-white p-4 ring-1 ring-ink-200 md:p-5";

              return (
                <li key={d.nome}>
                  <Reveal delay={i * 0.04} className="h-full">
                    {publicado ? (
                      <a
                        href={d.arquivo}
                        target="_blank"
                        rel="noreferrer"
                        className={`${classe} group transition-[transform,box-shadow] duration-[220ms]
                                    ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1
                                    hover:shadow-[0_18px_36px_-22px_rgb(0_21_47/0.45)]`}
                      >
                        {Bloco}
                      </a>
                    ) : (
                      <div className={classe}>{Bloco}</div>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ul>

        </div>
      </section>

      {/* ---------- destino dos recursos ---------- */}
      <section className="relative u-sec bg-ink-50" aria-labelledby="t-destino">
        <Curva de="var(--color-ink-0)" forma="onda" />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal>
            <p className="u-eyebrow flex items-center gap-2 text-ink-400">
              <Icone nome="Scales" className="h-4 w-4" />
              Destino dos recursos
            </p>
            <h2
              id="t-destino"
              className="u-display mt-2.5 max-w-[16ch] text-[clamp(1.8rem,7vw,3.2rem)] text-navy-800 md:mt-4"
            >
              Para onde vai o apoio
            </h2>
          </Reveal>

          <ul role="list" className="mt-7 grid list-none gap-3 p-0 md:mt-10 md:grid-cols-2 md:gap-4">
            {destinoRecursos.map((d, i) => (
              <li key={d.item}>
                <Reveal delay={i * 0.04}>
                  <div className="h-full rounded-[16px] bg-white p-4 ring-1 ring-ink-200 md:p-5">
                    <h3 className="u-titulo text-[0.9375rem] text-navy-800 md:text-[1rem]">
                      {d.item}
                    </h3>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-500">{d.nota}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="mt-8 md:mt-10">
            <BotaoLink href="/apoie">Apoiar</BotaoLink>
          </Reveal>
        </div>
      </section>

    </>
  );
}
