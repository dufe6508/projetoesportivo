/**
 * Segundo lote do acervo, recebido em 20/08/2026.
 *
 * Fica separado de _fotos.mjs de propósito: aquele script varre `fotos/` e
 * numera por índice, então qualquer arquivo novo naquela pasta deslocaria o
 * manifesto inteiro. Este lê caminhos explícitos e grava só o que muda.
 *
 * Produz:
 *   - a capa real do vôlei feminino, que substitui a foto antiga de elenco
 *   - os escudos das competições em PNG (cor) e SVG (traço), lado a lado
 *   - o QR do PIX da associação, gerado do payload EMV, sem serviço externo
 */
import sharp from "sharp";
import QR from "qrcode";
import { copyFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const RAIZ = "C:\\Users\\Cliente\\Downloads\\projeto brandão";
const LOTE = join(RAIZ, "originais", "logos-e-caps");
const ACERVO = join(RAIZ, "fotos");
const FOTOS = join(RAIZ, "site", "public", "fotos");
const LOGOS = join(RAIZ, "site", "public", "competicoes");

mkdirSync(LOGOS, { recursive: true });

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;

/* ---------- 1. capa do vôlei feminino ---------- */

const capa = join(LOTE, "Capa 1.jpg.jpeg");

// master 16:9, mesmo teto de 2000px do resto do acervo
let r = await sharp(capa)
  .resize(2000, 2000, { fit: "inside" })
  .webp({ quality: 88, effort: 6 })
  .toFile(join(FOTOS, "elenco-volei-feminino.webp"));
console.log(`elenco-volei-feminino.webp        ${r.width}x${r.height}  ${kb(r.size)}`);

// recorte 3:4 para o celular: o grupo ocupa a largura inteira, então o corte
// fecha no miolo e sobe um pouco para não perder a linha de trás
const { width: cw, height: ch } = await sharp(capa).metadata();
const larguraMovel = Math.round(ch * 0.75);
r = await sharp(capa)
  .extract({
    left: Math.round((cw - larguraMovel) / 2),
    top: 0,
    width: larguraMovel,
    height: ch,
  })
  .resize(1080, 1440, { fit: "cover" })
  .webp({ quality: 88, effort: 6 })
  .toFile(join(FOTOS, "elenco-volei-feminino-movel.webp"));
console.log(`elenco-volei-feminino-movel.webp  ${r.width}x${r.height}  ${kb(r.size)}`);

/* ---------- 2. o que sobrou do acervo antigo ----------
   Nada. As três fotos de `fotos/geral` que ainda não estavam publicadas eram
   segundo clique da mesma cena que já está no site: outro enquadramento da
   dupla antes do jogo, da premiação do festival e da quadra em treino. Lado a
   lado na galeria liam como imagem repetida, então ficaram de fora. Para a
   galeria crescer de verdade é preciso foto nova, não recorte novo. */

/* ---------- 3. escudos das competições ----------
   PNG é o que a interface usa: os quatro são coloridos e o traçado vetorial
   que veio junto é monocromático. O SVG fica publicado ao lado assim mesmo,
   para impresso e para quem pedir o arquivo aberto. */

const competicoes = [
  ["66a62aa2-611b-4f30-bb24-7c314315d3c2", "jime", true],
  ["48dc4381-3b63-4d70-8750-25045eb376a1", "jebh", false], // fundo preto, sem alfa: cortar borda comeria o brilho
  ["4bf1d73f-8544-4e85-b147-fd9622e50177", "jemg", true],
  ["262b76b9-00e4-492a-97e1-f493cc00fe31", "metropolitano", true],
];

for (const [id, nome, aparar] of competicoes) {
  let img = sharp(join(LOTE, `${id}.png`));
  if (aparar) img = img.trim({ threshold: 1 });
  const info = await img
    .resize(720, 720, { fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toFile(join(LOGOS, `${nome}.png`));
  copyFileSync(join(LOTE, `${id}.svg`), join(LOGOS, `${nome}.svg`));
  console.log(`competicoes/${nome}.png  ${info.width}x${info.height}  ${kb(info.size)}  (+ .svg)`);
}

/* ---------- 4. cartões de silhueta ----------
   Quem ainda não fez a foto tem card com silhueta, publicado no Instagram do
   projeto do mesmo jeito que os demais. Entram no elenco como os outros: o
   card existe, o número é que não. Ordenados pelo índice do post (imgi_NN),
   que é a posição na grade do perfil. */

const SILHUETAS = join(RAIZ, "originais", "instagram-silhuetas");

const cartoes = [
  ["futsal", 21, "futsal-feminino-atleta-ana-cassiano"],
  ["futsal", 22, "futsal-feminino-atleta-marcely-mello"],
  ["futsal", 23, "futsal-feminino-atleta-mariany-mello"],
  ["futsal", 24, "futsal-feminino-atleta-ester-goncalves"],
  ["futsal", 25, "futsal-feminino-atleta-vitoria-goncalves"],
  ["futsal", 26, "futsal-feminino-atleta-laura-suriani"],
  ["futsal", 27, "futsal-feminino-atleta-ana-beatriz"],
  ["futsal", 28, "futsal-feminino-atleta-nicolly-santos"],
  ["futsal", 29, "comissao-tecnica-daiane-keren"],
  ["futsal", 30, "comissao-tecnica-isaque-moura"],
  ["futsal", 31, "comissao-tecnica-yasmin-oliveira"],
  ["volei", 62, "volei-feminino-atleta-ana-prates"],
  ["volei", 63, "volei-feminino-atleta-maria-sophia"],
  ["volei", 64, "volei-feminino-atleta-lara-souza"],
];

const { readdirSync } = await import("node:fs");

for (const [pasta, indice, nome] of cartoes) {
  const dir = join(SILHUETAS, pasta);
  const arquivo = readdirSync(dir).find((f) => f.startsWith(`imgi_${indice}_`));
  if (!arquivo) throw new Error(`silhueta imgi_${indice} não encontrada em ${pasta}`);
  // mesmo 3:4 de recorte central dos demais cards de elenco
  const info = await sharp(join(dir, arquivo))
    .resize(900, 1200, { fit: "cover", position: "centre" })
    .webp({ quality: 88, effort: 6 })
    .toFile(join(FOTOS, `${nome}.webp`));
  console.log(`${nome}.webp  ${info.width}x${info.height}  ${kb(info.size)}`);
}

/* ---------- 5. QR do PIX ----------
   Gerado aqui e versionado como arquivo: o payload é fixo, então não há
   motivo para carregar um gerador no navegador nem chamar serviço de fora. */

const PIX =
  "00020126360014br.gov.bcb.pix0114683696890001605204000053039865802BR5925ASSOCIACAO ESPORTIVA ESCO6014BELO HORIZONTE6226052261lmzvo2Ei7GGf7iefYJKv63046885";

const opcoes = {
  errorCorrectionLevel: "M",
  margin: 1,
  color: { dark: "#000E22FF", light: "#FFFFFFFF" },
};

await QR.toFile(join(RAIZ, "site", "public", "pix-qr.svg"), PIX, { ...opcoes, type: "svg" });
await QR.toFile(join(RAIZ, "site", "public", "pix-qr.png"), PIX, { ...opcoes, width: 1024 });
console.log("pix-qr.svg + pix-qr.png");
