"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icone } from "./Icone";
import type { Foto } from "@/lib/dados";

/**
 * Uma foto de abertura em largura cheia e o resto numa fita elástica.
 *
 * O mosaico anterior era um grid fixo com o primeiro item ocupando 2x2. Com
 * qualquer contagem ímpar sobrava uma célula vazia, e era o buraco que se via
 * na página. Aqui as miniaturas são itens flex que crescem para preencher a
 * linha, então nenhuma contagem deixa vão: três viram três, duas viram duas
 * mais largas, cinco quebram sozinhas.
 *
 * O modal é <dialog> nativo: foco preso, Esc e backdrop vêm do navegador.
 */
/**
 * Quantas colunas o item ocupa para a linha fechar sem célula vazia.
 *
 * A grade tem 2 colunas no celular e 4 no monitor. Em vez de deixar buraco
 * quando a contagem não é múltipla, os primeiros itens ganham o dobro de
 * largura, o que fecha a linha e ainda cria hierarquia.
 */
function vao(total: number, i: number) {
  const movel = total % 2 === 1 && i === 0 ? 2 : 1;
  const resto = total % 4;
  let mesa = 1;
  if (resto === 2) mesa = i < 2 ? 2 : 1;
  else if (resto !== 0) mesa = i === 0 ? 2 : 1;
  return { movel, mesa };
}

export function Galeria({
  fotos,
  rotulo,
  /** primeira foto em largura cheia acima da grade */
  abertura = false,
}: {
  fotos: Foto[];
  rotulo: string;
  abertura?: boolean;
}) {
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
  const destaque = abertura ? fotos[0] : null;
  const grade = abertura ? fotos.slice(1) : fotos;
  const deslocamento = abertura ? 1 : 0;

  const botao =
    "group relative block w-full overflow-hidden rounded-[14px] bg-navy-900 " +
    "transition-[transform,box-shadow] duration-[220ms] ease-[cubic-bezier(0.23,1,0.32,1)] " +
    "hover:-translate-y-1 hover:shadow-[0_20px_44px_-24px_rgb(0_0_0/0.8)] active:scale-[0.99]";

  const refBotao = (i: number) => (el: HTMLButtonElement | null) => {
    gatilhos.current[i] = el;
  };

  return (
    <>
      <div className="flex flex-col gap-3 md:gap-4">
        {abertura && destaque && (
          <button
            type="button"
            ref={refBotao(0)}
            onClick={() => abrir(0)}
            aria-label={`Ampliar: ${destaque.alt}`}
            className={botao}
          >
            {/* no monitor a proporção fecha: 16:9 em 1320px de largura dava
                740px de altura, mais que a dobra inteira para uma foto só */}
            <span className="block aspect-4/3 sm:aspect-16/9 lg:aspect-[2.6/1]">
              <Image
                src={destaque.src}
                alt={destaque.alt}
                fill
                loading="lazy"
                sizes="(max-width: 1320px) 100vw, 1320px"
                style={{ objectPosition: destaque.posicao ?? "50% 50%" }}
                className="object-cover transition-transform duration-[700ms]
                           ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.04]"
              />
            </span>
          </button>
        )}

        {grade.length > 0 && (
          <ul
            role="list"
            aria-label={rotulo}
            className="grid list-none grid-cols-2 gap-3 p-0 md:grid-cols-4 md:gap-4"
          >
            {grade.map((f, i) => {
              const v = vao(grade.length, i);
              const largo = v.movel === 2;
              return (
                <li
                  key={f.src}
                  className={`${largo ? "col-span-2" : ""} ${
                    v.mesa === 2 ? "md:col-span-2" : "md:col-span-1"
                  }`}
                >
                  <button
                    type="button"
                    ref={refBotao(i + deslocamento)}
                    onClick={() => abrir(i + deslocamento)}
                    aria-label={`Ampliar: ${f.alt}`}
                    className={botao}
                  >
                    {/* proporção, não altura fixa: a faixa de 136px de altura
                        em largura cheia cortava a cabeça de todo mundo, porque
                        as fotos de origem são retrato */}
                    <span
                      className={`block ${largo ? "aspect-16/10" : "aspect-4/3"} ${
                        v.mesa === 2 ? "md:aspect-16/10" : "md:aspect-4/3"
                      }`}
                    >
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
              );
            })}
          </ul>
        )}
      </div>

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
