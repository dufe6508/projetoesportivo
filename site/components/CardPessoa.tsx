import Image from "next/image";
import type { Pessoa } from "@/lib/dados";

/**
 * Card de atleta ou de comissão técnica.
 *
 * A arte entregue já traz nome e número dentro da imagem, em tipografia
 * vertical. A linha de baixo não é repetição decorativa: é a camada legível,
 * que leitor de tela e busca alcançam, e que mantém o alinhamento da grade
 * quando o card vira item de trilho.
 */
export function CardPessoa({ p, prioridade }: { p: Pessoa; prioridade?: boolean }) {
  const ct = p.numero === "CT";
  // "00" é o que a arte imprime em quem ainda não tem camisa numerada. Repetir
  // dois zeros na legenda daria a entender que o número é esse.
  const semNumero = p.numero === "00";

  return (
    <figure
      className="group m-0 h-full overflow-hidden rounded-[18px] border border-ink-200
                 bg-white transition-[transform,box-shadow,border-color] duration-[220ms]
                 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:border-ink-300
                 hover:shadow-[0_18px_36px_-20px_rgb(0_21_47/0.45)]"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-navy-50">
        <Image
          src={p.foto}
          alt={
            ct
              ? `${p.nome}, ${p.funcao ?? "comissão técnica"}`
              : semNumero
                ? `${p.nome}, atleta do elenco`
                : `${p.nome}, camisa ${p.numero}`
          }
          fill
          loading={prioridade ? "eager" : "lazy"}
          priority={prioridade}
          sizes="(max-width: 480px) 58vw, (max-width: 640px) 50vw, (max-width: 768px) 36vw, (max-width: 1024px) 26vw, 19vw"
          className="object-cover transition-transform duration-[700ms]
                     ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
        />
      </div>

      {/* Comissão mostra cargo embaixo do nome; atleta mostra o número ao lado.
          O nome quebra em duas linhas em vez de truncar: cortar sobrenome de
          alguém com reticências é pior que a linha extra. */}
      <figcaption className="px-3 py-2.5 md:px-3.5 md:py-3">
        {ct ? (
          <>
            <span className="u-titulo block text-[0.875rem] leading-tight text-navy-800">
              {p.nome}
            </span>
            <span className="mt-0.5 block text-[0.75rem] leading-tight text-ink-500">
              {p.funcao ?? "Comissão técnica"}
            </span>
          </>
        ) : (
          <span className="flex items-baseline justify-between gap-2">
            <span className="u-titulo min-w-0 text-[0.875rem] leading-tight text-navy-800">
              {p.nome}
            </span>
            {!semNumero && (
              <span className="u-tabular shrink-0 text-[0.75rem] font-bold text-navy-600">
                {p.numero}
              </span>
            )}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
