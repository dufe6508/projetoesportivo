"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Icone } from "./Icone";
import type { Local } from "@/lib/dados";

/**
 * Espaço onde o projeto treina.
 *
 * Só um dos locais está fotografado. O outro entra com o bloco-marca em vez
 * de sumir da lista: o endereço e as modalidades já são informação útil, e a
 * estrutura fica pronta para receber a foto sem mexer no layout. Para somar
 * um espaço novo, basta um item a mais em `locais`.
 *
 * A foto abre ampliada; sem foto, não há o que abrir e o bloco não vira botão
 * morto.
 */
export function CardLocal({ l }: { l: Local }) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [ampliada, setAmpliada] = useState(false);

  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-[16px] bg-white ring-1
                 ring-ink-200 transition-[transform,box-shadow] duration-[220ms]
                 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1
                 hover:shadow-[0_20px_40px_-24px_rgb(0_21_47/0.45)]"
    >
      {l.foto ? (
        <button
          type="button"
          onClick={() => {
            setAmpliada(true);
            dialogo.current?.showModal();
          }}
          aria-label={`Ampliar foto: ${l.nome}`}
          className="relative block aspect-16/9 w-full overflow-hidden bg-navy-800"
        >
          <Image
            src={l.foto.src}
            alt={l.foto.alt}
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectPosition: l.foto.posicao ?? "50% 50%" }}
            className="object-cover transition-transform duration-[700ms]
                       ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
          />
        </button>
      ) : (
        <div aria-hidden className="relative aspect-16/9 grid place-items-center bg-navy-800">
          <Image
            src="/escudo.png"
            alt=""
            width={160}
            height={160}
            className="h-[42%] w-auto opacity-[0.2]"
          />
        </div>
      )}

      {/* Sem a linha de descrição: "ginásio coberto, quadra oficial" ao lado
          da foto do ginásio não acrescentava nada. Sobrou nome, endereço e
          quais equipes treinam ali. */}
      <div className="flex flex-1 flex-col p-3.5 md:p-4">
        <h3 className="u-titulo text-[0.9375rem] text-navy-800 md:text-[1rem]">{l.nome}</h3>

        <p className="mt-1 flex items-start gap-1.5 text-[0.75rem] leading-snug text-ink-500">
          <Icone nome="MapPin" className="mt-px h-3.5 w-3.5 shrink-0 text-ink-400" />
          <span>
            {l.endereco} · {l.bairro}
          </span>
        </p>

        <p className="mt-auto pt-3 text-[0.75rem] text-ink-400">
          {l.modalidades.join(" · ")}
          {!l.foto && " · foto em breve"}
        </p>
      </div>

      {l.foto && (
        <dialog
          ref={dialogo}
          onClose={() => setAmpliada(false)}
          aria-label={l.nome}
          className="m-auto w-[min(96vw,900px)] rounded-[18px] bg-navy-950 p-0
                     backdrop:bg-navy-950/85 backdrop:backdrop-blur-sm"
        >
          {ampliada && (
            <div className="on-navy relative">
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-[18px]">
                <Image
                  src={l.foto.src}
                  alt={l.foto.alt}
                  fill
                  sizes="(max-width: 900px) 96vw, 900px"
                  className="object-contain"
                />
              </div>
              <button
                type="button"
                onClick={() => dialogo.current?.close()}
                aria-label="Fechar"
                className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full
                           border border-white/25 bg-navy-950/70 text-white backdrop-blur-sm
                           transition-colors duration-[160ms] hover:bg-navy-900"
              >
                <Icone nome="Fechar" className="h-4 w-4" />
              </button>
            </div>
          )}
        </dialog>
      )}
    </article>
  );
}
