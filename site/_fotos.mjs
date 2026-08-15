/**
 * Pipeline do acervo fotográfico.
 *
 * Lê `fotos/`, descarta duplicatas, renomeia com nome semântico e grava WebP
 * em `public/fotos/`. Uma única versão por foto: o next/image deriva os
 * tamanhos responsivos a partir do master, então gerar hero/card/thumb à mão
 * só multiplicaria arquivo sem ganho.
 *
 * Cards de atleta são normalizados em 3:4 com recorte central (nunca
 * distorção). O corte máximo é ~3% por borda, dentro da margem da arte.
 */
import sharp from "sharp";
import { readdirSync, statSync, mkdirSync, rmSync } from "node:fs";
import { join, relative } from "node:path";

const SRC = "C:\\Users\\Cliente\\Downloads\\projeto brandão\\fotos";
const OUT = "C:\\Users\\Cliente\\Downloads\\projeto brandão\\site\\public\\fotos";

const walk = (d) =>
  readdirSync(d).flatMap((n) => {
    const p = join(d, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
const files = walk(SRC).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();
const at = (i) => files[i - 1]; // ids de 1..68, mesma ordem da análise

/** [id de origem, nome de saída, modo] */
const manifesto = [
  // ---- elencos completos, heros das páginas de modalidade ----
  [3, "elenco-futsal-feminino", "largo"],
  [2, "elenco-volei-feminino", "largo"],
  [1, "elenco-futsal-masculino", "largo"],

  // ---- futsal feminino, cards individuais ----
  [4, "futsal-feminino-atleta-raiane-fernandes", "card"],
  [5, "futsal-feminino-atleta-gabriela-silva", "card"],
  [6, "futsal-feminino-atleta-laryssa-sousa", "card"],
  [7, "futsal-feminino-atleta-emanuelle-silva", "card"],
  [9, "futsal-feminino-atleta-anna-goncalves", "card"],
  [10, "futsal-feminino-atleta-isabelle-siqueira", "card"],
  [11, "futsal-feminino-atleta-alice-catalanio", "card"],
  [12, "futsal-feminino-atleta-fernanda-campos", "card"],
  [13, "futsal-feminino-atleta-samara-schuina", "card"],
  [14, "futsal-feminino-atleta-thais-ferreira", "card"],
  [15, "futsal-feminino-atleta-taina-carvalho", "card"],

  // ---- vôlei feminino, cards individuais ----
  [36, "volei-feminino-atleta-leticia-campelo", "card"],
  [37, "volei-feminino-atleta-laura-carvalho", "card"],
  [38, "volei-feminino-atleta-ana-cassiano", "card"],
  [39, "volei-feminino-atleta-sibele-santos", "card"],
  [40, "volei-feminino-atleta-eduarda-carvalho", "card"],
  [41, "volei-feminino-atleta-julia-vilela", "card"],
  [42, "volei-feminino-atleta-giovanna-monteiro", "card"],
  [43, "volei-feminino-atleta-maria-souza", "card"],
  [44, "volei-feminino-atleta-nicolle-souza", "card"],
  [45, "volei-feminino-atleta-kelly-silva", "card"],
  [58, "volei-feminino-atleta-marcelle-aguilar", "card"],
  [47, "volei-feminino-atleta-alana-silva", "card"],
  [48, "volei-feminino-atleta-gabriele-ferreira", "card"],
  [49, "volei-feminino-atleta-lara-karolyne", "card"],
  [50, "volei-feminino-atleta-isabella-borges", "card"],
  [51, "volei-feminino-atleta-mirella-melo", "card"],
  [52, "volei-feminino-atleta-yasmin-batista", "card"],
  [53, "volei-feminino-atleta-flavia-silva", "card"],
  [54, "volei-feminino-atleta-maria-eduarda", "card"],
  [55, "volei-feminino-atleta-sophia-gomes", "card"],
  [56, "volei-feminino-atleta-maria-clara", "card"],
  [57, "volei-feminino-atleta-nathaly-izidorio", "card"],
  [59, "volei-feminino-atleta-vitoria-caitano", "card"],
  [60, "volei-feminino-atleta-iza-alves", "card"],
  [61, "volei-feminino-atleta-bruna-gomes", "card"],
  [62, "volei-feminino-atleta-yasmim-santos", "card"],
  [67, "volei-feminino-atleta-gabriela-victoria", "card"],

  // ---- comissão técnica ----
  [63, "comissao-tecnica-pedro-marques", "card"],
  [64, "comissao-tecnica-raissa-lima", "card"],
  [65, "comissao-tecnica-gabriela-ferreira", "card"],
  [66, "comissao-tecnica-richard-violi", "card"],

  // ---- registros gerais ----
  [16, "competicao-jebh-bandeira-escola", "largo"],
  [17, "futsal-feminino-equipe-ginasio", "largo"],
  [18, "competicao-volei-premiacao", "largo"],
  [19, "treinamento-volei-dupla", "largo"],
  [24, "treinamento-volei-ginasio", "largo"],
  [22, "competicao-jebh-atletas-bandeira", "largo"],
  [25, "competicao-futsal-feminino-campeas-jebh", "largo"],

  // ---- locais de treinamento ----
  [35, "local-poliesportivo-vale-do-jatoba", "largo"],
];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

let total = 0;
const linhas = [];
for (const [id, nome, modo] of manifesto) {
  const origem = at(id);
  let img = sharp(origem);
  const meta = await img.metadata();

  if (modo === "card") {
    // 3:4 uniforme, recorte central, sem distorção
    img = img.resize(900, 1200, { fit: "cover", position: "centre" });
  } else if (Math.max(meta.width, meta.height) > 2000) {
    img = img.resize(2000, 2000, { fit: "inside" });
  }

  const destino = join(OUT, `${nome}.webp`);
  const info = await img.webp({ quality: 88, effort: 6 }).toFile(destino);
  total += info.size;
  linhas.push(
    `${nome}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB   <- ${relative(SRC, origem)}`,
  );
}

console.log(linhas.join("\n"));
console.log(`\n${manifesto.length} arquivos, ${(total / 1024 / 1024).toFixed(2)} MB no total`);
