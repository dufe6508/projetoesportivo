"use server";

import { Resend } from "resend";

const EMAIL_DESTINO = "mateusfsanto123@gmail.com";
const ESCUDO_URL = "https://claudiobrandaoesportes.com.br/escudo.png";

function escapeHtml(valor: string) {
  return valor
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function montarHtml(campos: {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}) {
  const linha = (rotulo: string, valor: string) =>
    valor
      ? `<tr>
          <td style="padding:4px 0;font-size:13px;color:#667089;width:110px;vertical-align:top;">${rotulo}</td>
          <td style="padding:4px 0;font-size:14px;color:#002154;">${escapeHtml(valor)}</td>
        </tr>`
      : "";

  return `
    <div style="background:#F4F6FA;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E9EDF3;">
        <tr>
          <td style="background:#002154;padding:24px 28px;">
            <table role="presentation">
              <tr>
                <td style="vertical-align:middle;padding-right:12px;">
                  <img src="${ESCUDO_URL}" alt="Escudo do Cláudio Brandão" width="40" height="40" style="display:block;" />
                </td>
                <td style="vertical-align:middle;">
                  <span style="font-size:15px;font-weight:bold;color:#FBE47A;">Projeto Cláudio Brandão</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px;">
            <p style="margin:0 0 16px;font-size:13px;font-weight:bold;color:#8A94A8;text-transform:uppercase;letter-spacing:0.04em;">
              Nova mensagem de contato
            </p>
            <table role="presentation" width="100%" style="border-collapse:collapse;margin-bottom:20px;">
              ${linha("Nome", campos.nome)}
              ${linha("E-mail", campos.email)}
              ${linha("Telefone", campos.telefone)}
              ${linha("Assunto", campos.assunto)}
            </table>
            <div style="border-top:1px solid #E9EDF3;padding-top:16px;">
              <p style="margin:0;font-size:14px;line-height:1.6;color:#002154;white-space:pre-wrap;">${escapeHtml(campos.mensagem)}</p>
            </div>
          </td>
        </tr>
      </table>
    </div>
  `;
}

export type EnvioContato =
  | { ok: true }
  | { ok: false; erro: string };

export async function enviarContato(dados: FormData): Promise<EnvioContato> {
  const nome = String(dados.get("nome") ?? "").trim();
  const email = String(dados.get("email") ?? "").trim();
  const telefone = String(dados.get("telefone") ?? "").trim();
  const assunto = String(dados.get("assunto") ?? "").trim();
  const mensagem = String(dados.get("mensagem") ?? "").trim();

  if (nome.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || mensagem.length < 10) {
    return { ok: false, erro: "Dados inválidos." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY não configurada");
    return { ok: false, erro: "Envio indisponível no momento." };
  }

  const resend = new Resend(apiKey);

  // Resend recusa reply_to com caractere fora de ASCII; o regex acima aceita
  // (ex: "joão@dominio.com"), então revalida aqui e omite o campo se não servir.
  const replyToValido = /^[\x21-\x7E]+@[\x21-\x7E]+$/.test(email) ? email : undefined;

  const { error } = await resend.emails.send({
    from: "Contato do site <onboarding@resend.dev>",
    to: EMAIL_DESTINO,
    ...(replyToValido && { replyTo: replyToValido }),
    subject: `[Cláudio Brandão] ${assunto || "Contato"} — ${nome}`,
    text: [
      `Nome: ${nome}`,
      `E-mail: ${email}`,
      telefone && `Telefone: ${telefone}`,
      `Assunto: ${assunto}`,
      "",
      mensagem,
    ]
      .filter(Boolean)
      .join("\n"),
    html: montarHtml({ nome, email, telefone, assunto, mensagem }),
  });

  if (error) {
    console.error("Falha ao enviar contato:", error);
    return { ok: false, erro: "Não foi possível enviar agora." };
  }

  return { ok: true };
}
