import type { Metadata } from "next";
import Image from "next/image";
import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Curva } from "@/components/Curva";
import { Galeria } from "@/components/Galeria";
import { Reveal, Contador } from "@/components/Motion";
import { BotaoLink, Acoes } from "@/components/Botao";
import { Icone } from "@/components/Icone";
import { contato } from "@/lib/dados";

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

/** Números da atuação do projeto. Cards com o número em destaque. */
const atuacao = [
  { numero: 500, sufixo: "+", rotulo: "Alunos atendidos" },
  { numero: 100, sufixo: "+", rotulo: "Alunos atendidos anualmente" },
  { numero: 400, sufixo: "+", rotulo: "Horas de atividades anuais" },
  { numero: 7, sufixo: "+", rotulo: "Modalidades oferecidas" },
  { numero: 10, sufixo: "+", rotulo: "Professores e estagiários em formação" },
];

/** A semana do projeto, em etapas. Cada uma apoiada numa foto da rotina. */
const etapasRotina = [
  {
    titulo: "Os treinos",
    texto:
      "Cada equipe tem calendário próprio, com dias e horários fixos ao longo do ano letivo, sempre com a comissão técnica presente.",
    foto: {
      src: "/fotos/treinamento-volei-dupla.webp",
      alt: "Duas atletas conversando durante o treino de Vôlei",
      posicao: "50% 34%",
    },
  },
  {
    titulo: "O fundamento primeiro",
    texto:
      "Antes do jogo vem a técnica. As metodologias são lúdicas e adaptadas à idade e ao nível de cada turma, sem pular etapa.",
    foto: {
      src: "/fotos/futsal-feminino-equipe-ginasio.webp",
      alt: "Equipe de Futsal feminino reunida em quadra antes da partida",
      posicao: "50% 38%",
    },
  },
  {
    titulo: "As competições",
    texto:
      "O que se treina durante a semana vira jogo de verdade nos calendários escolares, do municipal ao estadual.",
    foto: {
      src: "/fotos/competicao-jebh-atletas-bandeira.webp",
      alt: "Atletas com a bandeira da escola diante do painel dos Jogos Escolares de Belo Horizonte",
      posicao: "50% 32%",
    },
  },
];

/** Os combinados: o que se espera de quem está dentro do projeto. */
const combinados = [
  {
    icone: "Alarm",
    titulo: "Pontualidade",
    texto: "O treino começa na hora marcada, e a equipe conta com quem chega no horário.",
  },
  {
    icone: "Handshake",
    titulo: "Respeito",
    texto: "Com colegas, comissão técnica, adversárias e arbitragem, dentro e fora de quadra.",
  },
  {
    icone: "GraduationCap",
    titulo: "Escola em primeiro lugar",
    texto: "O treino não substitui a sala de aula. Frequência escolar é condição para jogar.",
  },
  {
    icone: "SneakerMove",
    titulo: "Disciplina",
    texto: "Comparecimento, uniforme e material completos, e dedicação em cada treino.",
  },
  {
    icone: "UsersThree",
    titulo: "Espírito de equipe",
    texto: "A conquista é sempre coletiva, e o esforço individual serve ao grupo.",
  },
  {
    icone: "Medal",
    titulo: "Superação",
    texto: "A comparação que importa é com o próprio desempenho de ontem.",
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

      {/* ---------- sobre a associação ----------
           Duas colunas no monitor: a coluna de leitura sozinha num contêiner de
           1320px deixava dois terços em branco. */}
      <section className="u-sec bg-white" aria-labelledby="t-associacao">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal className="max-w-[70ch]">
            <p className="u-eyebrow text-ink-400">Sobre nossa associação</p>
            <h2
              id="t-associacao"
              className="u-display mt-2.5 max-w-[26ch] text-[clamp(1.7rem,6.4vw,3rem)] text-navy-800 md:mt-4"
            >
              Projeto Esportivo Cláudio Brandão
            </h2>
          </Reveal>

          <Reveal className="mt-6 grid gap-x-14 gap-y-4 md:mt-10 md:grid-cols-2">
            <div className="flex flex-col gap-3.5 text-[0.9375rem] leading-[1.7] text-ink-500 md:gap-4 md:text-[1rem] md:leading-[1.75]">
              <p>
                Nossas atividades tiveram início em 2016, quando um grupo de alunos demonstrou
                interesse em aprender Voleibol e participar de competições. A partir dessa
                demanda, alguns professores uniram forças para estruturar e organizar os treinos,
                dando os primeiros passos do projeto.
              </p>
              <p>
                Dez anos depois, a Associação Escola da Bola, organização sem fins lucrativos,
                consolida-se como um verdadeiro agente de transformação social. Nosso propósito é
                utilizar o esporte escolar como ferramenta educacional, oferecendo um ambiente
                seguro e estruturado para o desenvolvimento integral de adolescentes e jovens.
              </p>
            </div>
            <div className="flex flex-col gap-3.5 text-[0.9375rem] leading-[1.7] text-ink-500 md:gap-4 md:text-[1rem] md:leading-[1.75]">
              <p>
                Trabalhamos com metodologias lúdicas e adaptadas às reais necessidades dos alunos.
                Nossas ações são guiadas por valores fundamentais: respeito e honestidade,
                disciplina e solidariedade, trabalho em equipe e superação.
              </p>
              <p>
                Atualmente, oferecemos duas modalidades esportivas distribuídas em cinco equipes
                ativas. Cada equipe conta com comissão técnica própria, calendário específico de
                treinos e competições, além de infraestrutura adequada em ginásio para a prática
                esportiva.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- nossa atuação ---------- */}
      <section className="relative u-sec bg-navy-50" aria-labelledby="t-atuacao">
        <Curva de="var(--color-ink-0)" forma="onda" />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal>
            <p className="u-eyebrow text-navy-600">Nossa atuação</p>
            <h2
              id="t-atuacao"
              className="u-display mt-2.5 max-w-[20ch] text-[clamp(1.7rem,6.4vw,3.2rem)] text-navy-800 md:mt-4"
            >
              O projeto em números
            </h2>
          </Reveal>

          {/* Cinco cards, número ímpar: no celular os quatro primeiros fecham
              duas fileiras de duas colunas e o último vira largura cheia, em
              vez de sobrar uma célula vazia. No monitor os cinco cabem numa
              linha só, então a grade nem entra em jogo lá. */}
          <Reveal
            stagger
            className="mt-7 grid grid-cols-2 gap-3 md:mt-12 md:flex md:gap-5"
          >
            {atuacao.map((a, i) => (
              <article
                key={a.rotulo}
                className={`js-reveal flex flex-col justify-between gap-4 rounded-[16px] bg-white p-4
                           text-center ring-1 ring-ink-200 md:flex-1 md:p-6
                           ${i === atuacao.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <p className="u-display u-tabular text-[clamp(1.9rem,6vw,2.75rem)] text-navy-800">
                  <Contador para={a.numero} sufixo={a.sufixo} />
                </p>
                <p className="text-[0.75rem] leading-snug text-ink-500 md:text-[0.8125rem]">
                  {a.rotulo}
                </p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- nossa rotina ----------
           Etapa a etapa, com foto ao lado de cada texto: evita virar um só
           bloco corrido, e aproveita os registros que já existem da rotina. */}
      <section className="relative u-sec bg-white" aria-labelledby="t-rotina-texto">
        <Curva de="var(--color-navy-50)" forma="domo" virada />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal className="max-w-[52ch]">
            <p className="u-eyebrow text-ink-400">Nossa rotina</p>
            <h2
              id="t-rotina-texto"
              className="u-display mt-2.5 text-[clamp(1.7rem,6.4vw,3.2rem)] text-navy-800 md:mt-4"
            >
              Como funciona a semana
            </h2>
          </Reveal>

          <div className="mt-8 flex flex-col gap-8 md:mt-14 md:gap-16">
            {etapasRotina.map((e, i) => (
              <Reveal key={e.titulo}>
                <div
                  className={`grid items-center gap-5 md:grid-cols-2 md:gap-12 ${
                    i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-[18px] bg-navy-900">
                    <Image
                      src={e.foto.src}
                      alt={e.foto.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectPosition: e.foto.posicao }}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="u-tabular text-[0.75rem] font-bold text-ink-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="u-titulo mt-2 text-[1.375rem] text-navy-800 md:text-[1.75rem]">
                      {e.titulo}
                    </h3>
                    <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-ink-500 md:text-[1rem]">
                      {e.texto}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ---------- a rotina, em imagem ---------- */}
          <div className="mt-14 md:mt-20">
            <Reveal>
              <h3 className="u-eyebrow text-ink-400">Registros da rotina</h3>
            </Reveal>
            <Reveal className="mt-4 md:mt-6">
              <Galeria fotos={rotina} rotulo="Rotina do projeto" />
            </Reveal>
          </div>
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
              Aqui o esporte transforma vidas.
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ---------- nossos combinados ---------- */}
      <section className="relative u-sec bg-ink-50" aria-labelledby="t-combinados">
        <Curva de="var(--color-navy-50)" forma="dupla" />
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal>
            <p className="u-eyebrow text-ink-400">O que se cobra</p>
            <h2
              id="t-combinados"
              className="u-display mt-2.5 max-w-[16ch] text-[clamp(1.7rem,6.4vw,3.2rem)] text-navy-800 md:mt-4"
            >
              Nossos combinados
            </h2>
          </Reveal>

          <Reveal stagger className="mt-6 grid gap-x-8 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
            {combinados.map((v) => (
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
        </div>
      </section>

      {/* ---------- como contribuir ---------- */}
      <section className="on-navy relative isolate overflow-hidden u-sec bg-navy-800" aria-labelledby="t-contribuir">
        <Curva de="var(--color-ink-50)" forma="aba" />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 top-1/3 h-[280px] w-[280px]
                     -translate-y-1/2 bg-white/[0.05] md:-right-20 md:h-[420px] md:w-[420px]"
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
        <div className="relative mx-auto max-w-[1320px] px-5 md:px-10">
          <Reveal className="max-w-[54ch]">
            <p className="u-eyebrow text-white/55">Como contribuir</p>
            <h2
              id="t-contribuir"
              className="u-display mt-2.5 text-[clamp(1.7rem,6.4vw,3.2rem)] text-white md:mt-4"
            >
              Como você pode contribuir
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-white/70 md:mt-6 md:text-[1.0625rem]">
              A sociedade civil também pode contribuir e fazer muita diferença, por meio de
              doações espontâneas diretas ou de leis de incentivo fiscal.
            </p>
          </Reveal>

          <Reveal stagger className="mt-9 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
            <article
              className="js-reveal group flex h-full flex-col gap-6 overflow-hidden rounded-[20px]
                         bg-white/[0.06] p-6 ring-1 ring-white/12 transition-[transform,box-shadow]
                         duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1
                         hover:bg-white/[0.09] md:p-9"
            >
              <span
                aria-hidden
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10
                           text-white ring-1 ring-white/15 transition-colors duration-300
                           group-hover:bg-gold-300 group-hover:text-navy-900"
              >
                <Icone nome="Heartbeat" className="h-5 w-5" />
              </span>

              <div className="flex-1">
                <p className="u-eyebrow text-white/50">Pessoa física</p>
                <h3 className="u-titulo mt-2 text-[1.375rem] text-white md:text-[1.625rem]">
                  Contribua com uma doação
                </h3>
                <p className="mt-3 max-w-[42ch] text-[0.875rem] leading-relaxed text-white/70 md:text-[0.9375rem]">
                  Qualquer pessoa pode contribuir por meio de doações espontâneas, em qualquer
                  valor, ou destinando até 6% do Imposto de Renda pela Lei de Incentivo Federal ao
                  Esporte. O apoio vira material, uniforme e transporte das equipes.
                </p>
              </div>

              <BotaoLink href="/apoie" tom="ouro" icone="ArrowRight" className="w-full md:w-fit">
                Quero doar
              </BotaoLink>
            </article>

            <article
              className="js-reveal group flex h-full flex-col gap-6 overflow-hidden rounded-[20px]
                         bg-white/[0.06] p-6 ring-1 ring-white/12 transition-[transform,box-shadow]
                         duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1
                         hover:bg-white/[0.09] md:p-9"
            >
              <span
                aria-hidden
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10
                           text-white ring-1 ring-white/15 transition-colors duration-300
                           group-hover:bg-gold-300 group-hover:text-navy-900"
              >
                <Icone nome="Buildings" className="h-5 w-5" />
              </span>

              <div className="flex-1">
                <p className="u-eyebrow text-white/50">Pessoa jurídica</p>
                <h3 className="u-titulo mt-2 text-[1.375rem] text-white md:text-[1.625rem]">
                  Patrocine o projeto
                </h3>
                <p className="mt-3 max-w-[42ch] text-[0.875rem] leading-relaxed text-white/70 md:text-[0.9375rem]">
                  Empresas podem contribuir diretamente com doações ou por meio das leis federais
                  e estaduais de incentivo ao esporte, associando a marca a um projeto de impacto
                  social real, com prestação de contas.
                </p>
              </div>

              <BotaoLink
                href="/contato"
                tom="contornoClaro"
                icone="ArrowRight"
                className="w-full md:w-fit"
              >
                Quero patrocinar
              </BotaoLink>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ---------- sobre o instituto ---------- */}
      <section className="relative u-sec bg-white" aria-labelledby="t-instituto">
        <Curva de="var(--color-navy-800)" forma="onda" virada />
        <div className="relative mx-auto max-w-[900px] px-5 text-center md:px-10">
          <Reveal>
            <p className="u-eyebrow text-ink-400">Sobre o instituto</p>
            <h2
              id="t-instituto"
              className="u-display mx-auto mt-2.5 max-w-[18ch] text-[clamp(1.7rem,6.4vw,3.2rem)] text-navy-800 md:mt-4"
            >
              Quem somos e por que existimos
            </h2>
            <div className="u-measure mx-auto mt-5 flex flex-col gap-3.5 text-[0.9375rem] leading-[1.7] text-ink-500 md:mt-8 md:gap-4 md:text-[1.0625rem] md:leading-[1.8]">
              <p>
                A Associação Esportiva Escola da Bola nasceu de uma demanda simples: um grupo de
                alunos que queria aprender Voleibol e competir. Dez anos depois, viramos uma
                organização sem fins lucrativos dedicada a transformar o esporte escolar em
                ferramenta de formação.
              </p>
              <p>
                Nosso propósito é oferecer, de forma gratuita, um ambiente seguro e estruturado
                para o desenvolvimento integral de adolescentes e jovens, unindo disciplina,
                respeito e trabalho em equipe à rotina de treino e competição.
              </p>
              <p>
                O impacto vai além do placar: é presença constante na vida de quem participa, é
                frequência escolar sustentada, é pertencimento a um grupo. Acreditamos que o
                esporte, bem estruturado, é uma das ferramentas mais eficazes de transformação
                social que uma comunidade pode oferecer aos seus jovens.
              </p>
            </div>
            <Acoes className="mt-7 justify-center md:mt-10">
              <BotaoLink href="/transparencia">Conhecer a gestão</BotaoLink>
              <BotaoLink href="/contato" tom="contorno">
                Falar com a gente
              </BotaoLink>
            </Acoes>
          </Reveal>
        </div>
      </section>

      {/* ---------- fechamento ---------- */}
      <section className="on-navy relative isolate overflow-hidden bg-navy-950" aria-labelledby="t-fechamento">
        <div className="relative mx-auto max-w-[1320px] px-5 py-14 md:px-10 md:py-24">
          <Reveal className="flex flex-col items-start gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div>
              <p className="u-eyebrow text-white/55">Fale com a gente</p>
              <h2
                id="t-fechamento"
                className="u-display mt-2.5 max-w-[15ch] text-[clamp(1.9rem,7.4vw,3.6rem)] text-white md:mt-4"
              >
                Vamos juntos por mais histórias
              </h2>
            </div>
            <Acoes className="w-full lg:w-auto lg:shrink-0">
              <BotaoLink href="/apoie" tom="ouro">
                Apoiar
              </BotaoLink>
              <BotaoLink href={`mailto:${contato.email}`} tom="contornoClaro" icone="EnvelopeSimple">
                Enviar e-mail
              </BotaoLink>
            </Acoes>
          </Reveal>
        </div>
      </section>
    </>
  );
}
