import type { Metadata } from "next";
import { CardModalidade } from "@/components/CardModalidade";
import { FotoCapa } from "@/components/FotoCapa";
import { Reveal } from "@/components/Motion";
import { BotaoLink } from "@/components/Botao";
import { modalidades } from "@/lib/dados";

export const metadata: Metadata = {
  title: "Modalidades",
  description: "Futsal e voleibol, masculino e feminino. Quatro equipes, todas gratuitas.",
};

export default function Modalidades() {
  return (
    <>
      {/* Header com foto em vez do bloco navy chapado: é a página que
          apresenta as equipes, começar por tipografia sozinha era o bloco
          mais vazio do site. */}
      <header className="on-navy relative isolate flex h-[42svh] min-h-[280px] flex-col justify-end overflow-hidden rounded-b-[26px] bg-navy-950 md:h-[52svh] md:min-h-[400px] md:rounded-b-[44px]">
        <FotoCapa
          src="/fotos/elenco-volei-feminino.webp"
          movel="/fotos/elenco-volei-feminino-movel.webp"
          alt=""
          prioridade
          posicao="50% 42%"
          posicaoMobile="50% 50%"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,14,34,.66) 0%, rgba(0,14,34,.24) 34%, rgba(0,14,34,.92) 100%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1320px] px-5 pb-8 md:px-10 md:pb-14">
          <Reveal>
            <p className="u-eyebrow text-white/55">Quatro equipes</p>
            <h1 className="u-display mt-2 max-w-[20ch] text-[clamp(1.75rem,6.6vw,4rem)] text-white md:mt-3">
              Escolha a sua
            </h1>
          </Reveal>
        </div>
      </header>

      <section className="u-sec bg-white">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
            {modalidades.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.05} className="h-full">
                <CardModalidade m={m} nivel="h2" prioridade={i < 2} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10 flex flex-col items-start gap-5 rounded-[18px] bg-ink-25 p-5 ring-1 ring-ink-200 md:mt-16 md:flex-row md:items-center md:justify-between md:p-9">
            <div>
              <h2 className="u-titulo text-[1.25rem] text-navy-800 md:text-[1.5rem]">
                Quer participar?
              </h2>
              <p className="mt-1.5 max-w-[44ch] text-[0.875rem] leading-relaxed text-ink-500">
                Fale com a gente para saber horários, faixa etária e como funciona a seleção.
              </p>
            </div>
            <BotaoLink href="/contato" className="shrink-0">
              Falar com a coordenação
            </BotaoLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
