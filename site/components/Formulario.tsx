"use client";

import { useRef, useState } from "react";
import { Botao } from "./Botao";
import { enviarContato } from "@/lib/enviar-contato";

type Estado = "parado" | "enviando" | "ok" | "erro";
type Erros = Partial<Record<"nome" | "email" | "mensagem", string>>;

const assuntos = [
  "Quero inscrever alguém",
  "Quero patrocinar",
  "Quero ser parceiro",
  "Quero ser voluntário",
  "Imprensa",
  "Outro assunto",
];

const campo =
  "w-full rounded-[12px] border border-ink-300 bg-white px-4 py-3.5 text-[1rem] text-navy-800 " +
  "transition-colors duration-150 placeholder:text-ink-400 hover:border-ink-400 " +
  "focus:border-navy-600 focus-visible:shadow-[0_0_0_3px_rgb(0_61_149/0.22)]";

const rotulo = "block text-[0.875rem] font-semibold text-navy-800";

/** Formata dígitos como (00) 00000-0000 conforme digita; limita a 11 dígitos. */
function mascaraTelefone(valor: string) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);
  const ddd = digitos.slice(0, 2);
  const meio = digitos.slice(2, digitos.length > 10 ? 7 : 6);
  const fim = digitos.slice(digitos.length > 10 ? 7 : 6, 11);
  if (!ddd) return "";
  if (!meio) return `(${ddd}`;
  if (!fim) return `(${ddd}) ${meio}`;
  return `(${ddd}) ${meio}-${fim}`;
}

export function Formulario() {
  const [estado, setEstado] = useState<Estado>("parado");
  const [erros, setErros] = useState<Erros>({});
  const form = useRef<HTMLFormElement>(null);

  function validar(dados: FormData): Erros {
    const e: Erros = {};
    const nome = String(dados.get("nome") ?? "").trim();
    const email = String(dados.get("email") ?? "").trim();
    const mensagem = String(dados.get("mensagem") ?? "").trim();

    if (nome.length < 2) e.nome = "Escreva seu nome para sabermos com quem falamos.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
      e.email = "Confira o e-mail: parece faltar algo, como o @ ou o final.";
    if (mensagem.length < 10) e.mensagem = "Conte um pouco mais, com pelo menos 10 caracteres.";
    return e;
  }

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);
    const achados = validar(dados);
    setErros(achados);

    if (Object.keys(achados).length > 0) {
      const primeiro = Object.keys(achados)[0];
      form.current?.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
      return;
    }

    setEstado("enviando");
    const resultado = await enviarContato(dados);
    if (resultado.ok) {
      setEstado("ok");
      form.current?.reset();
    } else {
      setEstado("erro");
    }
  }

  if (estado === "ok") {
    return (
      <div
        role="status"
        className="rounded-[24px] border border-success/30 bg-success/8 p-9 md:p-11"
      >
        <span
          aria-hidden
          className="grid h-14 w-14 place-items-center rounded-full border-[2px] border-success text-success"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12.5 4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h3 className="u-display mt-6 text-[1.6rem] text-navy-800">Mensagem enviada</h3>
        <p className="mt-3 max-w-[46ch] text-[1rem] leading-relaxed text-ink-500">
          Recebemos seu contato. A resposta costuma sair em até dois dias úteis.
        </p>
        <div className="mt-7">
          <Botao tom="contorno" onClick={() => setEstado("parado")}>
            Enviar outra mensagem
          </Botao>
        </div>
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={enviar} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="nome" className={rotulo}>
            Nome <span className="text-danger">*</span>
          </label>
          <input
            id="nome"
            name="nome"
            autoComplete="name"
            aria-invalid={!!erros.nome}
            aria-describedby={erros.nome ? "erro-nome" : undefined}
            className={`${campo} mt-2 ${erros.nome ? "border-danger" : ""}`}
            placeholder="Como podemos te chamar"
          />
          {erros.nome && (
            <p id="erro-nome" role="alert" className="mt-2 text-[0.8125rem] text-danger">
              {erros.nome}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={rotulo}>
            E-mail <span className="text-danger">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={!!erros.email}
            aria-describedby={erros.email ? "erro-email" : undefined}
            className={`${campo} mt-2 ${erros.email ? "border-danger" : ""}`}
            placeholder="seunome@email.com"
          />
          {erros.email && (
            <p id="erro-email" role="alert" className="mt-2 text-[0.8125rem] text-danger">
              {erros.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="telefone" className={rotulo}>
            Telefone ou WhatsApp
          </label>
          <input
            id="telefone"
            name="telefone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={`${campo} mt-2`}
            placeholder="(31) 90000-0000"
            maxLength={16}
            onChange={(e) => {
              e.currentTarget.value = mascaraTelefone(e.currentTarget.value);
            }}
          />
        </div>

        <div>
          <label htmlFor="assunto" className={rotulo}>
            Assunto
          </label>
          {/* o assunto é o que roteia todos os contatos do site */}
          <select id="assunto" name="assunto" defaultValue={assuntos[0]} className={`${campo} mt-2`}>
            {assuntos.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="mensagem" className={rotulo}>
          Mensagem <span className="text-danger">*</span>
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={6}
          aria-invalid={!!erros.mensagem}
          aria-describedby={erros.mensagem ? "erro-mensagem" : "ajuda-mensagem"}
          className={`${campo} mt-2 resize-y ${erros.mensagem ? "border-danger" : ""}`}
          placeholder="Conte o que você precisa"
        />
        {erros.mensagem ? (
          <p id="erro-mensagem" role="alert" className="mt-2 text-[0.8125rem] text-danger">
            {erros.mensagem}
          </p>
        ) : (
          <p id="ajuda-mensagem" className="mt-2 text-[0.8125rem] text-ink-400">
            Se for sobre inscrição, diga a idade e a modalidade de interesse.
          </p>
        )}
      </div>

      {estado === "erro" && (
        <p role="alert" className="rounded-[12px] bg-danger/8 px-4 py-3 text-[0.875rem] text-danger">
          Não conseguimos enviar agora. Tente de novo em instantes ou fale pelo Instagram.
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5">
        <Botao type="submit" disabled={estado === "enviando"} className="disabled:opacity-45">
          {estado === "enviando" ? "Enviando" : "Enviar mensagem"}
        </Botao>
        <p className="text-[0.8125rem] text-ink-400">
          Campos com <span className="text-danger">*</span> são obrigatórios.
        </p>
      </div>
    </form>
  );
}
