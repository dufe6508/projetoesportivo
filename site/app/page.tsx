import Image from "next/image";
import { Hero } from "@/components/Hero";
import { CardModalidade } from "@/components/CardModalidade";
import { CardLocal } from "@/components/CardLocal";
import { Galeria } from "@/components/Galeria";
import { Icone } from "@/components/Icone";
import { BotaoLink, Acoes } from "@/components/Botao";
import { Curva } from "@/components/Curva";
import { QuadroTitulos } from "@/components/QuadroTitulos";
import { Reveal, TextoScrub } from "@/components/Motion";
import {
  modalidadesAtivas,
  principios,
  galeria,
  locais,
  competicoes,
} from "@/lib/dados";

/** Os calendários que as equipes disputam, na ordem de dados.ts. */
const competicoesHome = Object.values(competicoes);

/**
 * A sequência de origem. Fica aqui, e não em dados.ts, porque é a composição
 * de uma seção específica: trocar uma foto é decisão de layout desta página,
 * não do acervo. A ordem é cronológica e a legenda diz a etapa, não o que
 * aparece na imagem, que é o que o alt já faz.
 */
const origem = [
  {
    src: "/fotos/origem-primeiro-time-volei.webp",
    alt: "O primeiro time do projeto reunido na quadra da escola, com a comissão técnica",
    posicao: "50% 46%",
    etapa: "O primeiro time",
  },
  {
    src: "/fotos/local-escola-claudio-brandao.webp",
    alt: "Quadra coberta da Escola Estadual Professor Cláudio Brandão, com o nome da escola grafitado ao fundo",
    posicao: "50% 48%",
    etapa: "A quadra da escola",
  },
  {
    src: "/fotos/treinamento-volei-dupla.webp",
    alt: "Duas atletas conversando durante o treino de Vôlei",
    posicao: "50% 40%",
    etapa: "A rotina de treino",
  },
  {
    src: "/fotos/local-poliesportivo-vale-do-jatoba.webp",
    alt: "Ginásio poliesportivo do Vale do Jatobá, onde as equipes treinam hoje",
    posicao: "50% 52%",
    etapa: "O ginásio de hoje",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* ---------- muito além do esporte ----------
           Abre a página: antes de contar de onde o projeto veio, o site diz
           para que ele serve. Sem Curva no topo, a passagem do herói para a
           primeira banda clara é uma linha reta, decisão do cliente. A seção
           trocou de banda com a de origem, que assumiu a âncora escura. */}
      <section className="relative u-sec bg-navy-50" aria-labelledby="t-alem">
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:gap-20">
            <Reveal>
              <p className="u-eyebrow text-ink-400">Muito além do esporte</p>
              <h2
                id="t-alem"
                className="u-display mt-2.5 max-w-[20ch] text-[clamp(1.7rem,6.4vw,3.4rem)] text-navy-800 md:mt-4"
              >
                Esporte contribuindo para a formação integral
              </h2>
              <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-relaxed text-ink-600 md:mt-6 md:text-[1.0625rem]">
                As equipes treinam, fazem amistosos, competem, fazem amigos e aprendem os valores do
                esporte escolar.
              </p>
            </Reveal>

            {/* mesma altura nas duas: o desalinhamento anterior não tinha função */}
            <Reveal className="grid grid-cols-2 gap-3 md:gap-5">
              {[
                {
                  src: "/fotos/competicao-jebh-bandeira-escola.webp",
                  alt: "Atletas e professor com a bandeira da Escola Estadual Professor Cláudio Brandão na arena dos Jogos Escolares",
                  pos: "50% 38%",
                },
                {
                  src: "/fotos/treinamento-volei-conversa.webp",
                  alt: "Duas atletas do Vôlei conversando na quadra, ao lado da rede, durante o treino",
                  pos: "50% 42%",
                },
              ].map((f) => (
                <div
                  key={f.src}
                  className="relative aspect-3/4 overflow-hidden rounded-[16px] bg-navy-900"
                >
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 1024px) 45vw, 24vw"
                    style={{ objectPosition: f.pos }}
                    className="object-cover"
                  />
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- modalidades ---------- */}
      <section className="u-sec bg-white" aria-labelledby="t-modalidades">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
            <div>
              <h2
                id="t-modalidades"
                className="u-display max-w-[16ch] text-[clamp(1.8rem,7vw,3.8rem)] text-navy-800"
              >
                As modalidades
              </h2>
            </div>
            <p className="max-w-[38ch] text-[0.9375rem] leading-relaxed text-ink-500 md:text-[1.0625rem]">
              Voleibol e Futsal para os alunos da escola e região, durante todo o ano letivo.
            </p>
          </Reveal>

          {/* Com duas equipes no ar, a grade não ocupa a faixa inteira: dois
              cards de 650px viravam pôster e engoliam a dobra. A largura fica
              contida e o card volta ao recorte 4:3 do resto do site. */}
          <div className="mt-7 grid grid-cols-2 gap-3 md:mt-12 md:max-w-[820px] md:gap-5">
            {modalidadesAtivas.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.05} className="h-full">
                <CardModalidade m={m} prioridade />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- nossas competições ----------
           Vem logo depois das equipes: é a resposta à pergunta que a grade de
           modalidades levanta, onde essas equipes jogam. Fica em banda clara
           de propósito, para a estante logo abaixo continuar sendo a única
           faixa escura da sequência.

           O escudo vive num ladrilho de proporção fixa com `object-contain`:
           são marcas de terceiro, com proporções diferentes, e dimensionar
           pela altura fazia a mais quadrada estourar a caixa. */}
      <section className="relative u-sec bg-ink-50" aria-labelledby="t-competicoes">
        <Curva de="var(--color-ink-0)" forma="aba" />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <div>
              <h2
                id="t-competicoes"
                className="u-display max-w-[14ch] text-[clamp(1.7rem,6.4vw,3.2rem)] text-navy-800"
              >
                Nossas competições
              </h2>
            </div>
            <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-500 md:text-[1.0625rem]">
              Os principais eventos que incentivam o Esporte Escolar.
            </p>
          </Reveal>

          {/* os quatro calendários cabem numa linha só a partir do tablet: são
              quatro e formam um conjunto, quebrar em duas linhas sugeria
              hierarquia que não existe entre eles */}
          <Reveal stagger className="mt-8 grid gap-3 md:mt-12 md:grid-cols-4 md:gap-4 lg:gap-5">
            {competicoesHome.map((c) => (
              <article
                key={c.sigla}
                className="js-reveal flex h-full items-center gap-3.5 rounded-[16px] bg-ink-25 p-3
                           ring-1 ring-ink-200 md:flex-col md:items-stretch md:gap-5 md:p-6"
              >
                {/* no celular a marca vira selo ao lado do texto: em cima, em
                    16:9, cada competição sozinha ocupava meia tela de altura */}
                <span
                  className={`relative block h-[52px] w-[72px] shrink-0 overflow-hidden rounded-[10px] ring-1
                              md:aspect-16/9 md:h-auto md:w-full
                              ${c.fundo === "escuro" ? "bg-navy-900 ring-black/10" : "bg-white ring-ink-200"}`}
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
                  <p className="u-eyebrow text-navy-600">{c.sigla}</p>
                  <h3 className="u-titulo mt-1 text-[0.9375rem] leading-tight text-navy-800 md:mt-1.5 md:text-[1.25rem]">
                    {c.nome}
                  </h3>
                  <p className="mt-1 text-[0.75rem] leading-snug text-ink-500 md:mt-1.5 md:text-[0.8125rem]">
                    {c.ambito}
                  </p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- títulos ----------
           Fecha o par que a seção acima abre: primeiro onde se joga, depois o
           que veio de lá. Banda escura porque a conquista é o momento de mais
           peso da página, e o ouro só aparece aqui e no botão de doação. */}
      <section className="on-navy relative u-sec bg-navy-950" aria-labelledby="t-titulos">
        <Curva de="var(--color-ink-50)" forma="dupla" />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
            <div>
              <p className="u-eyebrow flex items-center gap-2 text-gold-300">
                <Icone nome="Trophy" className="h-4 w-4" />
                Nós somos
              </p>
              <h2
                id="t-titulos"
                className="u-display mt-2.5 max-w-[14ch] text-[clamp(1.8rem,7vw,3.8rem)] text-white md:mt-4"
              >
                Campeãs em quadra
              </h2>
            </div>
          </Reveal>

          <Reveal className="mt-9 md:mt-14">
            <QuadroTitulos tom="escuro" />
          </Reveal>

          <Reveal className="mt-9 md:mt-14">
            <BotaoLink href="/titulos" tom="contornoClaro">
              Ver a estante completa
            </BotaoLink>
          </Reveal>
        </div>
      </section>

      {/* ---------- origem, âncora escura ----------
           Texto em cima, fotos em faixa larga embaixo.

           Antes as quatro fotos dividiam a linha com o texto, em ladrilho
           retrato. Duas coisas quebravam ali: a foto da quadra da escola é
           larga na origem e virava metade dela para caber em pé, ampliada,
           mole; e a coluna de fotos ficava o dobro da altura do parágrafo ao
           lado. Na faixa cada foto aparece menor, recortada de leve, e a
           sequência passa a contar a história na ordem: o primeiro time, a
           quadra onde começou, a rotina, onde se treina hoje. */}
      <section className="on-navy relative u-sec bg-navy-800" aria-labelledby="t-origem">
        <Curva de="var(--color-navy-950)" forma="onda" />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <div className="grid gap-5 lg:grid-cols-[0.92fr_1fr] lg:items-end lg:gap-16">
            <Reveal>
              <p className="u-eyebrow text-white/50">Como começou</p>
              <h2
                id="t-origem"
                className="u-titulo mt-2.5 max-w-[20ch] text-[clamp(1.55rem,5.4vw,2.85rem)] text-white md:mt-4"
              >
                Partindo dos alunos, muita dedicação e trabalho coletivo.
              </h2>
              <p className="mt-3 max-w-[34ch] text-[0.875rem] font-semibold leading-snug text-white/55 md:text-[0.9375rem]">
                Aqui o trabalho em equipe importa
              </p>
            </Reveal>

            <div>
              <TextoScrub
                className="u-measure text-[1rem] leading-[1.75] text-white/75 md:text-[1.0625rem] md:leading-[1.8]"
                texto="Um grupo de alunos queria aprender Voleibol e competir. Os professores viram a necessidade de organização e começaram a auxiliar o projeto em seu desenvolvimento."
              />
              <Reveal className="mt-5">
                <BotaoLink href="/sobre" tom="contornoClaro">
                  Conheça o projeto
                </BotaoLink>
              </Reveal>
            </div>
          </div>

          {/* A legenda não descreve a foto, situa a etapa. É ela que faz as
              quatro imagens virarem uma sequência em vez de uma grade. */}
          <Reveal stagger className="mt-9 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-5">
            {origem.map((f, i) => (
              <figure key={f.src} className="js-reveal m-0">
                <div className="relative aspect-4/3 overflow-hidden rounded-[14px] bg-navy-900">
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 46vw, 23vw"
                    style={{ objectPosition: f.posicao }}
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 flex items-baseline gap-2">
                  <span className="u-tabular text-[0.6875rem] font-bold text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.8125rem] font-semibold leading-snug text-white">
                    {f.etapa}
                  </span>
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- princípios ---------- */}
      <section className="relative u-sec bg-ink-50" aria-labelledby="t-principios">
        <Curva de="var(--color-navy-800)" forma="dupla" />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal className="max-w-[52ch]">
            <p className="u-eyebrow text-ink-400">Valores e princípios</p>
            <h2
              id="t-principios"
              className="u-display mt-2.5 text-[clamp(1.7rem,6.4vw,3.2rem)] text-navy-800 md:mt-4"
            >
              Seis combinados que valem mais que o placar
            </h2>
          </Reveal>

          {/* Sem card: ícone, título e frase numa linha, separados por régua.
              Seis caixas com borda e sombra viravam uma pilha no celular e o
              contorno não carregava informação nenhuma. */}
          <Reveal stagger className="mt-6 grid gap-x-8 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
            {principios.map((p) => (
              <article
                key={p.titulo}
                className="js-reveal group flex items-start gap-3 border-t border-ink-200 py-3.5
                           md:gap-4 md:py-5"
              >
                <span
                  aria-hidden
                  className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full
                             bg-white text-navy-700 ring-1 ring-ink-200 transition-colors
                             duration-300 group-hover:bg-navy-800 group-hover:text-white
                             group-hover:ring-navy-800 md:h-9 md:w-9"
                >
                  <Icone nome={p.icone} className="h-[17px] w-[17px] md:h-[19px] md:w-[19px]" />
                </span>
                <div className="min-w-0">
                  <h3 className="u-titulo text-[0.9375rem] text-navy-800 md:text-[1.0625rem]">
                    {p.titulo}
                  </h3>
                  <p className="mt-0.5 text-[0.8125rem] leading-snug text-ink-500 md:text-[0.875rem]">
                    {p.texto}
                  </p>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- locais de treinamento ---------- */}
      <section className="relative u-sec bg-white" aria-labelledby="t-locais">
        <Curva de="var(--color-ink-50)" forma="domo" virada />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal>
            <p className="u-eyebrow flex items-center gap-2 text-ink-400">
              <Icone nome="Buildings" className="h-4 w-4" />
              Locais de treinamento
            </p>
            <h2
              id="t-locais"
              className="u-display mt-2.5 max-w-[13ch] text-[clamp(1.8rem,7vw,3.8rem)] text-navy-800 md:mt-4 md:max-w-none"
            >
              Onde a semana acontece
            </h2>
          </Reveal>

          <div className="mt-7 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
            {locais.map((l, i) => (
              <Reveal key={l.nome} delay={i * 0.05} className="h-full">
                <CardLocal l={l} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- âncora escura: galeria ---------- */}
      <section className="on-navy relative u-sec bg-navy-950" aria-labelledby="t-galeria">
        <Curva de="var(--color-ink-0)" forma="aba" />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
            <h2
              id="t-galeria"
              className="u-display max-w-[15ch] text-[clamp(1.7rem,6.4vw,3.2rem)] text-white"
            >
              Nossa rotina
            </h2>
          </Reveal>

          <Reveal className="mt-7 md:mt-12">
            <Galeria fotos={galeria} rotulo="Galeria do projeto" />
          </Reveal>
        </div>
      </section>

      {/* ---------- fechamento ----------
           O escudo entra como bloco de fundo com recorte próprio: antes era
           um <Image> esticado que deformava a marca em telas estreitas. */}
      <section className="on-navy relative isolate overflow-hidden bg-navy-800" aria-labelledby="t-apoie">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-16 top-1/2 h-[280px] w-[280px]
                     -translate-y-1/2 bg-white/[0.05] md:-left-20 md:h-[420px] md:w-[420px]"
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
          <Reveal className="flex flex-col items-start gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div>
              <p className="u-eyebrow text-white/55">Apoie</p>
              <h2
                id="t-apoie"
                className="u-display mt-2.5 max-w-[13ch] text-[clamp(1.9rem,7.4vw,4.4rem)] text-white md:mt-4"
              >
                Mude uma história
              </h2>
              <p className="mt-4 max-w-[42ch] text-[0.9375rem] leading-relaxed text-white/70 md:mt-6 md:text-[1.0625rem]">
                Materiais, uniformes e transporte. É disso que nosso projeto precisa para continuar
                mudando a vida dos nossos atletas.
              </p>
            </div>
            <Acoes className="w-full lg:w-auto lg:shrink-0">
              <BotaoLink href="/apoie" tom="ouro">
                Apoiar
              </BotaoLink>
              <BotaoLink href="/contato" tom="contornoClaro">
                Fale com a gente
              </BotaoLink>
            </Acoes>
          </Reveal>
        </div>
      </section>
    </>
  );
}
