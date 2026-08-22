"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icone } from "./Icone";
import type { Foto } from "@/lib/dados";

/**
 * Grade de fotos do mesmo tamanho, com ampliação no toque.
 *
 * A versão anterior dava o dobro de largura aos primeiros itens para fechar a
 * linha. Fechava, mas criava uma hierarquia que a galeria não tem: nenhuma
 * foto ali vale mais que a vizinha, e a diferença de tamanho lia como erro de
 * montagem. Agora todo ladrilho tem a mesma proporção e a mesma área; quem se
 * ajusta é o número de colunas, escolhido para a última linha não ficar coxa.
 *
 * O modal é <dialog> nativo: foco preso, Esc e backdrop vêm do navegador.
 */

/** Colunas no monitor: a primeira divisão exata entre 4, 3 e 2. */
function colunas(total: number) {
  for (const n of [4, 3, 2]) if (total % n === 0) return n;
  return total > 4 ? 4 : total;
}

const grades: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

export function Galeria({ fotos, rotulo }: { fotos: Foto[]; rotulo: string }) {
  const [aberta, setAberta] = useState<number | null>(null);
  const dialogo = useRef<HTMLDialogElement>(null);
  const gatilhos = useRef<(HTMLButtonElement | null)[]>([]);

  const abrir = (i: number) => {
    setAberta(i);
    dialogo.current?.showModal();
  };

  const andar = useCallback(
    (d: 1 | -1) => setAberta((i) => (i === null ? i : (i + d + fotos.length) % fotos.length)),
    [fotos.length],
  );

  // devolve o foco ao card que abriu, exigência de modal acessível
  useEffect(() => {
    const el = dialogo.current;
    if (!el) return;
    const aoFechar = () => {
      const i = aberta;
      setAberta(null);
      if (i !== null) gatilhos.current[i]?.focus();
    };
    el.addEventListener("close", aoFechar);
    return () => el.removeEventListener("close", aoFechar);
  }, [aberta]);

  useEffect(() => {
    if (aberta === null) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") andar(1);
      if (e.key === "ArrowLeft") andar(-1);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberta, andar]);

  const atual = aberta === null ? null : fotos[aberta];
  const cols = colunas(fotos.length);

  const botao =
    "group relative block w-full overflow-hidden rounded-[14px] bg-navy-900 " +
    "transition-[transform,box-shadow] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] " +
    "hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgb(0_0_0/0.8)] active:scale-[0.99]";

  const refBotao = (i: number) => (el: HTMLButtonElement | null) => {
    gatilhos.current[i] = el;
  };

  return (
    <>
      <ul
        role="list"
        aria-label={rotulo}
        className={`grid list-none grid-cols-2 gap-3 p-0 md:gap-4 ${grades[cols] ?? "md:grid-cols-4"}`}
      >
        {fotos.map((f, i) => (
          <li key={f.src}>
            <button
              type="button"
              ref={refBotao(i)}
              onClick={() => abrir(i)}
              aria-label={`Ampliar: ${f.alt}`}
              className={botao}
            >
              {/* proporção, não altura fixa: a faixa de altura fixa cortava a
                  cabeça de todo mundo, porque as fotos de origem são retrato */}
              <span className="block aspect-4/3">
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  style={{ objectPosition: f.posicao ?? "50% 50%" }}
                  className="object-cover transition-transform duration-[700ms]
                             ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogo}
        aria-label={`${rotulo}, visualização ampliada`}
        className="m-auto max-h-[92svh] w-[min(96vw,1100px)] rounded-[18px] bg-navy-950 p-0
                   text-white backdrop:bg-navy-950/85 backdrop:backdrop-blur-sm"
      >
        {atual && (
          <div className="on-navy relative">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-[18px] bg-navy-900 sm:aspect-16/10">
              <Image
                src={atual.src}
                alt={atual.alt}
                fill
                sizes="(max-width: 1100px) 96vw, 1100px"
                className="object-contain"
              />
            </div>

            {fotos.length > 1 && (
              <div className="pointer-events-none absolute inset-y-0 inset-x-0 flex items-center justify-between px-2">
                <BotaoModal rotulo="Foto anterior" icone="CaretLeft" aoClicar={() => andar(-1)} />
                <BotaoModal rotulo="Próxima foto" icone="CaretRight" aoClicar={() => andar(1)} />
              </div>
            )}

            <button
              type="button"
              onClick={() => dialogo.current?.close()}
              aria-label="Fechar visualização"
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full
                         border border-white/25 bg-navy-950/70 text-white backdrop-blur-sm
                         transition-colors duration-[160ms] hover:border-white/60 hover:bg-navy-900"
            >
              <Icone nome="Fechar" className="h-4 w-4" />
            </button>

            <p className="sr-only" aria-live="polite">
              Foto {(aberta ?? 0) + 1} de {fotos.length}. {atual.alt}
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}

function BotaoModal({
  rotulo,
  icone,
  aoClicar,
}: {
  rotulo: string;
  icone: string;
  aoClicar: () => void;
}) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      aria-label={rotulo}
      className="pointer-events-auto grid h-11 w-11 place-items-center rounded-full
                 bg-navy-950/55 text-white/85 backdrop-blur-sm transition-colors duration-[160ms]
                 hover:bg-navy-900 hover:text-white active:scale-[0.94]"
    >
      <Icone nome={icone} className="h-4 w-4" />
    </button>
  );
}
