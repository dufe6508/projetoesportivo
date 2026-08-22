"use client";

import { useEffect, useRef, useState } from "react";
import { Botao } from "./Botao";
import { Icone } from "./Icone";
import { conta, pix } from "@/lib/dados";

/**
 * Bloco de doação por PIX.
 *
 * O QR é um arquivo estático em /pix-qr.svg, gerado do mesmo payload que o
 * botão copia (site/_extras.mjs). Nada é montado em tempo de execução: BR
 * Code carrega CRC no fim da linha, e um código gerado errado só aparece
 * como recusa no aplicativo de quem tentou doar.
 *
 * O QR fica em ladrilho branco de propósito, mesmo dentro do card claro: o
 * padrão precisa de quiet zone e do contraste máximo para a câmera ler.
 */
export function Pix() {
  const [copiado, setCopiado] = useState(false);
  const relogio = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(relogio.current), []);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(pix.payload);
    } catch {
      // navegador sem permissão de área de transferência: o campo abaixo
      // continua selecionável, então ninguém fica sem caminho
      return;
    }
    setCopiado(true);
    window.clearTimeout(relogio.current);
    relogio.current = window.setTimeout(() => setCopiado(false), 2600);
  };

  return (
    <div className="grid gap-3 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:gap-5">
      {/* ---- QR ---- */}
      <article className="flex flex-col items-center gap-4 rounded-[14px] bg-white p-4 text-center ring-1 ring-ink-200 md:p-7">
        <div>
          <h3 className="u-titulo text-[1.125rem] text-navy-800 md:text-[1.375rem]">
            Doe por PIX
          </h3>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-500">
            Aponte a câmera do seu banco ou copie o código. O valor é você quem escolhe.
          </p>
        </div>

        <div className="rounded-[12px] bg-white p-2.5 ring-1 ring-ink-200">
          {/* eslint-disable-next-line @next/next/no-img-element -- SVG estático,
              sem ganho em passar pelo otimizador de imagem */}
          <img
            src={pix.qr}
            alt={`QR Code para doação por PIX à ${pix.favorecido}`}
            width={188}
            height={188}
            className="h-[168px] w-[168px] md:h-[188px] md:w-[188px]"
          />
        </div>

        <Botao
          onClick={copiar}
          tom={copiado ? "solido" : "ouro"}
          icone={copiado ? "Check" : "Copiar"}
          className="w-full"
        >
          {copiado ? "Código copiado" : "Copiar código PIX"}
        </Botao>

        <p aria-live="polite" className="sr-only">
          {copiado ? "Código PIX copiado para a área de transferência." : ""}
        </p>

        <p className="text-[0.75rem] leading-snug text-ink-400">
          Chave {pix.tipoChave} {pix.chave}
        </p>
      </article>

      {/* ---- conta bancária ---- */}
      <DadosBancarios />
    </div>
  );
}

/**
 * Transferência e depósito, para quem prefere não usar o QR. Mesmo card das
 * demais formas de apoio: é a mesma natureza de informação, e um card de
 * modelo diferente aqui leria como aviso de terceiro dentro da página.
 */
function DadosBancarios() {
  const linhas = [
    ["Banco", `${conta.banco} · ${conta.codigoBanco}`],
    ["Titular", conta.titular],
    ["CNPJ", conta.cnpj],
    ["Agência", conta.agencia],
    ["Conta", conta.conta],
  ];

  return (
    <article className="flex h-full flex-col justify-between gap-4 rounded-[14px] bg-white p-4 ring-1 ring-ink-200 md:p-7">
      <div>
        <span className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-navy-600">
          <Icone nome="Banco" className="h-4 w-4" />
          Transferência
        </span>
        <h3 className="u-titulo mt-2 text-[1.125rem] text-navy-800 md:text-[1.375rem]">
          Dados bancários
        </h3>

        <dl className="mt-4 flex flex-col">
          {linhas.map(([rotulo, valor]) => (
            <div
              key={rotulo}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5
                         border-t border-ink-100 py-2.5"
            >
              <dt className="text-[0.8125rem] text-ink-500">{rotulo}</dt>
              <dd className="u-tabular text-right text-[0.9375rem] font-semibold text-navy-800">
                {valor}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="text-[0.6875rem] leading-snug text-ink-400">
        Conta da associação. Todo recurso recebido entra na prestação de contas do exercício.
      </p>
    </article>
  );
}
