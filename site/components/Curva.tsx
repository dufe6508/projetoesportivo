/**
 * Junta curva entre duas seções.
 *
 * O corte reto entre blocos de cor diferente era o que dava a leitura de
 * "retângulos empilhados". Aqui a cor da seção anterior escorre para dentro
 * da seguinte, e o gesto muda a cada junta: uma repetida cinco vezes deixa de
 * ser forma e vira moldura.
 *
 * Todas são assimétricas de propósito. Curva simétrica lê como enfeite de
 * gerador de site; assimétrica lê como decisão.
 *
 * Uso: dentro de uma seção `relative`, passando a cor do bloco de cima.
 *   <Curva de="var(--color-ink-25)" forma="rampa" />
 */

const formas = {
  /** rebaixo longo e raso, mais fundo à esquerda do centro */
  arco: "M0 0h1440v14c-286 62-604 84-949 52C336 55 152 30 0 6Z",
  /** o oposto do arco: as pontas descem e o meio sobe, como um domo */
  domo: "M0 0h1440v78C1214 26 902 6 690 8 434 10 214 34 0 80Z",
  /** S longo e raso: desce à direita, sobe à esquerda, sem quina em lugar
      nenhum. Substituiu a rampa, que era quase uma diagonal e lia como corte
      em vez de curva */
  onda: "M0 0H1440V20C1200 58 960 62 720 44 480 26 240 14 0 34Z",
  /** dois lobos desiguais, de amplitude baixa: dá movimento sem virar zigue-zague */
  dupla: "M0 0H1440V34C1272 55 1130 41 962 35 792 29 640 47 470 53 312 58 152 49 0 31Z",
  /** rebaixo único e largo, o mais discreto do conjunto */
  aba: "M0 0H1440V24C1152 51 782 61 432 51 282 47 132 39 0 28Z",
} as const;

export type FormaCurva = keyof typeof formas;

export function Curva({
  de,
  forma = "arco",
  virada = false,
  className = "",
}: {
  /** cor da seção anterior, que é a que escorre para baixo */
  de: string;
  forma?: FormaCurva;
  /** espelha na horizontal, dobrando o repertório sem novo caminho */
  virada?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      // -mt-px: sem isso, arredondamento de subpixel do navegador ao escalar
      // o viewBox para a altura em px deixava um fio da cor de fundo errada
      // entre o topo do SVG e a borda da seção anterior.
      className={`pointer-events-none absolute inset-x-0 -top-px leading-[0] ${className}`}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-[35px] w-full md:h-[63px]"
        style={virada ? { transform: "scaleX(-1)" } : undefined}
      >
        <path d={formas[forma]} fill={de} />
      </svg>
    </div>
  );
}
