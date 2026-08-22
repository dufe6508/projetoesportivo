import type { Metadata } from "next";
import Image from "next/image";
import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Curva } from "@/components/Curva";
import { Galeria } from "@/components/Galeria";
import { Reveal } from "@/components/Motion";
import { BotaoLink, Acoes } from "@/components/Botao";
import { Icone } from "@/components/Icone";
import { principios, contato } from "@/lib/dados";

export const metadata: Metadata = {
  title: "O projeto",
  description:
    "Como o Projeto Esportivo Cláudio Brandão começou, o que ele defende e como se organiza.",
};

/**
 * Registros da rotina. Sem legenda: a foto já diz o que é.
 * São seis para a grade fechar em três colunas no monitor e duas no celular,
 * sem sobra de célula na última linha.
 */
const rotina = [
  {
    src: "/fotos/treinamento-volei-ginasio.webp",
    alt: "Ginásio poliesportivo do Vale do Jatobá durante o treino de vôlei feminino",
    posicao: "50% 52%",
  },
  {
    src: "/fotos/futsal-feminino-equipe-ginasio.webp",
    alt: "Equipe de futsal feminino reunida em quadra antes da partida",
    posicao: "50% 38%",
  },
  {
    src: "/fotos/competicao-jebh-atletas-bandeira.webp",
    alt: "Atletas com a bandeira da escola no painel dos Jogos Escolares de Belo Horizonte",
    posicao: "50% 32%",
  },
  {
    src: "/fotos/elenco-volei-feminino.webp",
    alt: "Elenco completo do vôlei feminino e a comissão técnica no ginásio",
    posicao: "50% 58%",
  },
  {
    src: "/fotos/competicao-volei-premiacao.webp",
    alt: "Atletas do vôlei feminino com troféu e medalhas depois da partida",
    posicao: "50% 20%",
  },
  {
    src: "/fotos/competicao-jebh-bandeira-escola.webp",
    alt: "Atletas e professor com a bandeira da escola na arena dos Jogos Escolares",
    posicao: "50% 28%",
  },
];

export default function Sobre() {
  return (
    <>
      <CabecalhoPagina
        sobretitulo="O projeto"
        titulo="Ideia dos alunos"
        texto="Esporte educacional no Vale do Jatobá."
        foto={{
          src: "/fotos/local-poliesportivo-vale-do-jatoba.webp",
          movel: "/fotos/local-poliesportivo-vale-do-jatoba-movel.webp",
          alt: "Ginásio poliesportivo do Vale do Jatobá, onde o projeto treina",
          posicao: "50% 62%",
          posicaoMobile: "50% 56%",
        }}
      />

      {/* Duas colunas no monitor: a coluna de leitura sozinha num contêiner de
          1320px deixava dois terços em branco. */}
      <section className="u-sec bg-white">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal className="grid gap-x-14 gap-y-4 md:grid-cols-2">
            <p className="text-[1.0625rem] leading-[1.7] text-navy-800 md:text-[1.25rem] md:leading-[1.6]">
              A ideia não desceu de uma diretoria. Partiu de um grupo de alunos que queria treinar
              de verdade e não tinha onde.
            </p>
            <div className="flex flex-col gap-4 text-[0.9375rem] leading-[1.75] text-ink-500 md:text-[1rem]">
              <p>
                Um professor abriu o ginásio e assumiu o compromisso de estar lá toda semana. Hoje
                são duas equipes em atividade, com comissão técnica e calendário próprio.
              </p>
              <p>
                Em julho de 2026 a iniciativa ganhou personalidade jurídica com a criação da{" "}
                {contato.razaoSocial}, o que abriu a possibilidade de firmar parcerias e receber
                apoio com clareza.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- a rotina, em imagem ----------
           Antes eram três fotos lado a lado com legenda embaixo de cada uma.
           Virou galeria: ladrilhos do mesmo tamanho, com ampliação no toque. */}
      <section className="bg-white pb-14 md:pb-24" aria-labelledby="t-rotina">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal>
            <h2 id="t-rotina" className="u-eyebrow text-ink-400">
              A rotina
            </h2>
          </Reveal>
          <Reveal className="mt-4 md:mt-6">
            <Galeria fotos={rotina} rotulo="Rotina do projeto" />
          </Reveal>
        </div>
      </section>

      {/* citação */}
      <section className="relative bg-navy-50 py-14 md:py-24">
        <Curva de="var(--color-ink-0)" forma="onda" virada />
        <div className="relative mx-auto max-w-[900px] px-5 text-center md:px-10">
          <Reveal>
            <Image
              src="/escudo.png"
              alt=""
              width={72}
              height={72}
              className="mx-auto h-12 w-12 opacity-90 md:h-16 md:w-16"
            />
            <blockquote className="u-titulo mt-5 text-[clamp(1.35rem,5.4vw,2.5rem)] text-navy-800 md:mt-8">
              Aqui, esporte transforma vidas.
            </blockquote>
            <p className="u-eyebrow mt-4 text-ink-400 md:mt-7">Lema do projeto</p>
          </Reveal>
        </div>
      </section>

      <section className="relative u-sec bg-ink-50" aria-labelledby="t-valores">
        <Curva de="var(--color-navy-50)" forma="domo" />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal>
            <p className="u-eyebrow text-ink-400">O que se cobra</p>
            <h2
              id="t-valores"
              className="u-display mt-2.5 max-w-[16ch] text-[clamp(1.7rem,6.4vw,3.2rem)] text-navy-800 md:mt-4"
            >
              Seis combinados
            </h2>
          </Reveal>

          <Reveal stagger className="mt-6 grid gap-x-8 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
            {principios.map((v) => (
              <article
                key={v.titulo}
                className="js-reveal group flex items-start gap-3 border-t border-ink-200 py-3.5
                           md:gap-4 md:py-5"
              >
                <span
                  aria-hidden
                  className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white
                             text-navy-700 ring-1 ring-ink-200 transition-colors duration-300
                             group-hover:bg-navy-800 group-hover:text-white
                             group-hover:ring-navy-800 md:h-9 md:w-9"
                >
                  <Icone nome={v.icone} className="h-[17px] w-[17px] md:h-[19px] md:w-[19px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="u-titulo text-[0.9375rem] text-navy-800 md:text-[1.0625rem]">
                    {v.titulo}
                  </h3>
                  <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-500 md:text-[0.875rem]">
                    {v.texto}
                  </p>
                </div>
              </article>
            ))}
          </Reveal>

          <Acoes className="mt-9 md:mt-14">
            <BotaoLink href="/modalidades">Ver as modalidades</BotaoLink>
            <BotaoLink href="/apoie" tom="contorno">
              Apoiar
            </BotaoLink>
          </Acoes>
        </div>
      </section>
    </>
  );
}
