"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Icone } from "./Icone";
import { Reveal } from "./Motion";
import type { Responsavel } from "@/lib/dados";

/**
 * Fichas dos responsáveis, uma de cada vez.
 *
 * São duas pessoas com a mesma estrutura de ficha: retrato 4:5, nome, resumo e
 * formação. Empilhar as duas alongava a seção e fazia a segunda parecer nota de
 * rodapé da primeira. Aqui elas dividem o mesmo lugar na página e se revezam: a
 * página abre no primeiro nome e troca sozinha depois do tempo de leitura.
 *
 * O revezamento é semântica de abas, não carrossel decorativo: cada nome é um
 * `tab` clicável e alcançável por teclado, então quem não quer esperar (ou não
 * vê a animação) chega na outra ficha do mesmo jeito. O primeiro comando de
 * quem lê desliga a troca automática, porque dali em diante quem manda é ele.
 *
 * As duas fichas ficam sempre no DOM, sobrepostas na mesma célula de grade: a
 * inativa sai só por `opacity` e `transform`, nunca por altura. A caixa mede
 * pela ficha mais longa e não muda na troca, que é o que evita a página pular
 * sob o dedo no meio da transição.
 */

/** tempo de leitura de cada ficha antes da troca automática */
const CICLO = 9000;
/** saída da ficha que estava em cena, antes de a próxima entrar (ver duration-[200ms] abaixo) */
const SAIDA = 200;

export function Responsaveis({ lista }: { lista: Responsavel[] }) {
  /** ficha em cena */
  const [ativo, setAtivo] = useState(0);
  /** ficha pedida: adianta o sublinhado do nome enquanto a atual sai */
  const [alvo, setAlvo] = useState(0);
  /** troca automática, desligada no primeiro comando de quem lê */
  const [auto, setAuto] = useState(true);
  const [pausado, setPausado] = useState(false);
  /** fase de saída: a ficha em cena já apagou, a próxima ainda não entrou */
  const [saindo, setSaindo] = useState(false);
  const [reduzido, setReduzido] = useState(false);
  const abas = useRef<(HTMLButtonElement | null)[]>([]);
  const relogio = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setReduzido(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    return () => {
      if (relogio.current) clearTimeout(relogio.current);
    };
  }, []);

  /**
   * Troca em duas fases: a ficha atual apaga, e só depois a próxima entra.
   *
   * A caixa mede pela ficha em cena, e as duas têm alturas bem diferentes.
   * Trocar as duas ao mesmo tempo faria a altura mudar com conteúdo visível,
   * puxando o resto da página no meio da leitura. Com a pausa no escuro, o
   * ajuste de altura acontece quando não há o que ver ali.
   */
  const trocar = (i: number) => {
    if (i === alvo || relogio.current) return;
    // o nome sublinhado responde na hora; a ficha é que espera a saída
    setAlvo(i);
    if (reduzido) {
      setAtivo(i);
      return;
    }
    setSaindo(true);
    relogio.current = setTimeout(() => {
      setAtivo(i);
      setSaindo(false);
      relogio.current = null;
    }, SAIDA);
  };

  useEffect(() => {
    if (!auto || pausado || saindo || lista.length < 2) return;
    const t = setTimeout(() => trocar((alvo + 1) % lista.length), CICLO);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, pausado, saindo, alvo, lista.length]);

  const selecionar = (i: number) => {
    trocar(i);
    setAuto(false);
  };

  /** setas andam entre as abas e levam o foco junto, como pede o padrão de tabs */
  const teclado = (e: KeyboardEvent) => {
    const ultimo = lista.length - 1;
    const destino =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (alvo + 1) % lista.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (alvo + ultimo) % lista.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? ultimo
              : -1;
    if (destino < 0) return;
    e.preventDefault();
    selecionar(destino);
    abas.current[destino]?.focus();
  };

  const pausa = {
    onMouseEnter: () => setPausado(true),
    onMouseLeave: () => setPausado(false),
    onFocus: () => setPausado(true),
    onBlur: () => setPausado(false),
  };

  return (
    <Reveal>
      {/* ---------- nomes ----------
           Ficam entre o título e a ficha: lidos de cima para baixo, dizem quem
           são os dois antes de a primeira ficha começar. O fio embaixo do nome
           ativo é a régua da quadra, e ele preenche no ritmo da troca. É o que
           avisa que a página vira sozinha, em vez de a troca pegar de surpresa. */}
      <div
        role="tablist"
        aria-label="Responsáveis pelo projeto"
        className="mt-6 flex flex-wrap gap-x-8 md:mt-8"
        {...pausa}
      >
        {lista.map((r, i) => {
          const on = i === alvo;
          return (
            <button
              key={r.nome}
              ref={(el) => {
                abas.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`resp-aba-${i}`}
              aria-selected={on}
              aria-controls={`resp-painel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => selecionar(i)}
              onKeyDown={teclado}
              className={`relative min-h-[48px] rounded-sm pb-3 pt-2 text-[0.9375rem]
                          font-semibold tracking-[0.004em] transition-colors
                          duration-[160ms] ease-[var(--ease-out)]
                          focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]
                          ${on ? "text-navy-800" : "text-ink-400 hover:text-navy-700"}`}
            >
              {r.nome}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[2px] overflow-hidden bg-ink-200"
              >
                {on && (
                  // remonta a cada troca para a contagem recomeçar do zero
                  <span
                    key={`${alvo}-${auto}-${pausado}`}
                    className="block h-full origin-left bg-navy-800"
                    style={
                      auto && !pausado
                        ? { animation: `pecb-regua ${CICLO}ms linear forwards` }
                        : { transform: "scaleX(1)" }
                    }
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------- fichas sobrepostas ----------
           A ficha em cena fica no fluxo e dá a altura da caixa; as outras saem
           para fora do fluxo, empilhadas no mesmo topo. Assim a seção mede pela
           ficha que está sendo lida, sem sobra da mais longa embaixo. */}
      <div className="relative mt-7 md:mt-11">
        {lista.map((r, i) => {
          const on = i === ativo;
          const visivel = on && !saindo;
          return (
            <div
              key={r.nome}
              id={`resp-painel-${i}`}
              role="tabpanel"
              aria-labelledby={`resp-aba-${i}`}
              tabIndex={visivel ? 0 : -1}
              inert={!visivel}
              {...pausa}
              className={`rounded-[18px] transition-[opacity,transform] ease-[var(--ease-out)]
                          focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)]
                          ${on ? "relative" : "pointer-events-none absolute inset-x-0 top-0"}
                          ${
                            visivel
                              ? "translate-y-0 opacity-100 duration-[320ms]"
                              : // saída mais curta que a entrada: fechar é resposta, abrir é apresentação
                                "pointer-events-none opacity-0 duration-[200ms] " +
                                (on ? "-translate-y-2" : "translate-y-[14px]") +
                                " motion-reduce:translate-y-0"
                          }`}
            >
              {/* Retrato em coluna estreita e fixa: ao lado do texto ele
                  credencia sem virar capa.

                  No celular a foto divide a primeira linha com o nome, e o
                  resumo e a formação correm embaixo em largura cheia. Com
                  tudo empilhado sob a foto, a seção abria com meia tela de
                  retrato antes de dizer de quem era. O `contents` no
                  figcaption é o que deixa os três blocos serem células da
                  mesma grade sem duplicar o nome na marcação. */}
              <figure
                className="m-0 grid grid-cols-[6.75rem_minmax(0,1fr)] items-center gap-x-4 gap-y-6
                           md:grid-cols-[minmax(0,15rem)_1fr] md:items-start md:gap-x-10 md:gap-y-0"
              >
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-[16px] bg-navy-800 ring-1 ring-ink-200">
                  <Image
                    src={r.foto}
                    alt={r.nome}
                    fill
                    sizes="(max-width: 768px) 108px, 240px"
                    className="object-cover"
                  />
                </div>

                <figcaption className="contents md:block md:min-w-0">
                  <p className="u-titulo text-[1.125rem] leading-tight text-balance text-navy-800 md:text-[1.375rem]">
                    {r.nome}
                  </p>

                  {r.resumo && (
                    <p className="col-span-2 max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-500 md:col-span-1 md:mt-6 md:text-[1rem]">
                      {r.resumo}
                    </p>
                  )}

                  {r.formacao && (
                    <div className="col-span-2 md:col-span-1 md:mt-11">
                      <h3 className="u-eyebrow flex items-center gap-2 text-ink-400">
                        <Icone nome="GraduationCap" className="h-4 w-4" />
                        Formação
                      </h3>
                      {/* duas colunas a partir do tablet: em uma coluna a
                          lista de seis linhas alongava demais a seção. O
                          fio no topo de cada linha é o mesmo da ficha
                          institucional, em vez de mais um ícone repetido */}
                      <ul
                        role="list"
                        className="mt-4 grid list-none gap-x-10 p-0 md:mt-5 md:grid-cols-2"
                      >
                        {r.formacao.map((f) => (
                          <li
                            key={f}
                            className="border-t border-ink-200 py-2 text-[0.8125rem] leading-snug
                                       text-navy-800 md:py-2.5 md:text-[0.875rem]"
                          >
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </figcaption>
              </figure>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
