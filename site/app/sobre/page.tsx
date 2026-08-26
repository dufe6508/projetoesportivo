import type { Metadata } from "next";
import Image from "next/image";
import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Curva } from "@/components/Curva";
import { Galeria } from "@/components/Galeria";
import { Reveal } from "@/components/Motion";
import { BotaoLink, Acoes } from "@/components/Botao";
import { Icone } from "@/components/Icone";
import { principios } from "@/lib/dados";

export const metadata: Metadata = {
  title: "O projeto",
  description:
    "Como o Projeto Esportivo Cláudio Brandão começou, o que ele defende e como se organiza.",
};

/**
 * Registros da rotina. Sem legenda: a foto já diz o que é.
 *
 * São nove: fecham três colunas exatas no monitor, e no celular a última entra
 * em largura cheia, porque duas colunas com número ímpar deixariam meia célula
 * vazia no fim (ver Galeria).
 *
 * `posicao` é o enquadramento do ladrilho 4:3, calculado por foto: a origem é
 * retrato ou panorâmica, então o centro geométrico quase nunca é o centro do
 * assunto. O modal continua abrindo a foto inteira.
 */
const rotina = [
  {
    src: "/fotos/treinamento-volei-ginasio.webp",
    alt: "Ginásio poliesportivo do Vale do Jatobá durante o treino de Vôlei feminino",
    posicao: "50% 52%",
  },
  {
    src: "/fotos/futsal-feminino-equipe-ginasio.webp",
    alt: "Equipe de Futsal feminino reunida em quadra antes da partida",
    posicao: "50% 38%",
  },
  {
    src: "/fotos/competicao-jebh-atletas-bandeira.webp",
    alt: "Atletas com a bandeira da escola no painel dos Jogos Escolares de Belo Horizonte",
    posicao: "50% 32%",
  },
  {
    // panorâmica: o recorte 4:3 é lateral, e o grupo está deslocado à esquerda
    src: "/fotos/competicao-futsal-feminino-times-juntos.webp",
    alt: "Atletas do Futsal feminino e da equipe adversária reunidas na quadra depois da partida",
    posicao: "45% 50%",
  },
  {
    src: "/fotos/competicao-volei-premiacao.webp",
    alt: "Atletas do Vôlei feminino com troféu e medalhas depois da partida",
    posicao: "50% 20%",
  },
  {
    // retrato alto: o recorte guarda dos braços erguidos até os joelhos
    src: "/fotos/competicao-futsal-feminino-comemoracao-medalhas.webp",
    alt: "Atletas do Futsal feminino comemorando com as medalhas e o troféu erguido",
    posicao: "50% 72%",
  },
  {
    // já nasce 4:3, entra inteira
    src: "/fotos/competicao-futsal-feminino-perfilados-arbitragem.webp",
    alt: "As duas equipes e a arbitragem perfiladas no centro da quadra antes do jogo",
    posicao: "50% 50%",
  },
  {
    src: "/fotos/futsal-feminino-equipe-quadra-coberta.webp",
    alt: "Equipe de Futsal feminino posada com o técnico na quadra coberta",
    posicao: "50% 44%",
  },
  {
    src: "/fotos/futsal-feminino-equipes-quadra-coberta.webp",
    alt: "Atletas do Futsal feminino e da equipe adversária posadas na quadra coberta",
    posicao: "50% 39%",
  },
];

export default function Sobre() {
  return (
    <>
      <CabecalhoPagina
        sobretitulo="O projeto"
        titulo="Ideia dos alunos"
        texto="Voleibol e Futsal para adolescentes e jovens."
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
            <p className="text-[1.0625rem] leading-[1.6] text-navy-800 md:text-[1.25rem]">
              Um grupo de alunos queria aprender Voleibol e competir.
            </p>
            <div className="flex flex-col gap-3.5 text-[0.9375rem] leading-[1.7] text-ink-500 md:gap-4 md:text-[1rem] md:leading-[1.75]">
              <p>
                Os professores viram a necessidade de organização e começaram a auxiliar o projeto
                em seu desenvolvimento.
              </p>
              <p>
                Hoje são duas equipes em atividade, com comissão técnica, calendário próprio e um
                ginásio adequado para praticas esportivas.
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
