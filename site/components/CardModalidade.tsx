import Image from "next/image";
import Link from "next/link";
import { Icone } from "./Icone";
import type { Modalidade } from "@/lib/dados";

/**
 * Card de modalidade.
 *
 * Enxugado: foto, nome e a ação. Saíram o resumo e a etiqueta de naipe — o
 * título "Futsal Feminino" já dizia o que a pílula repetia logo acima, e a
 * frase de apoio empurrava o card para duas telas no celular.
 */
export function CardModalidade({
  m,
  prioridade,
  nivel: Titulo = "h3",
}: {
  m: Modalidade;
  prioridade?: boolean;
  /** na home o card vem depois de um h2, no índice ele É o h2 */
  nivel?: "h2" | "h3";
}) {
  return (
    <Link
      href={`/modalidades/${m.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[16px] bg-navy-950
                 ring-1 ring-ink-200 transition-[transform,box-shadow] duration-300
                 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1
                 hover:shadow-[0_18px_36px_-20px_rgb(0_21_47/0.45)]"
    >
      <div className="relative aspect-4/5 overflow-hidden sm:aspect-4/3">
        {m.capa ? (
          <Image
            src={m.capa.src}
            alt=""
            fill
            priority={prioridade}
            sizes="(max-width: 640px) 50vw, (max-width: 1100px) 50vw, 25vw"
            style={{ objectPosition: m.capa.posicao ?? "50% 50%" }}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                       group-hover:scale-[1.05]"
          />
        ) : (
          /* sem foto ainda: bloco da marca, nunca um cinza vazio */
          <span aria-hidden className="absolute inset-0 grid place-items-center bg-navy-800">
            <Image
              src="/escudo.png"
              alt=""
              width={150}
              height={150}
              className="h-[42%] w-auto opacity-[0.22]"
            />
          </span>
        )}

        {/* o texto vive sobre a foto: economiza a faixa branca que o card tinha */}
        <span
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,14,34,0) 38%, rgba(0,14,34,.55) 68%, rgba(0,14,34,.92) 100%)",
          }}
        />

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 md:p-4">
          <Titulo className="u-titulo text-[0.9375rem] leading-tight text-white md:text-[1.0625rem]">
            {m.nome}
          </Titulo>
          <span
            aria-hidden
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/12 text-white
                       transition-[background-color,transform] duration-300
                       ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-white group-hover:text-navy-800"
          >
            <Icone nome="CaretRight" className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
      <span className="sr-only">Ver a equipe</span>
    </Link>
  );
}
