import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:3000";
const OUT = "C:\\Users\\Cliente\\AppData\\Local\\Temp\\claude\\c--Users-Cliente-Downloads-projeto-brand-o\\f3fc5b6f-57c8-41c6-99af-342c95133fd9\\scratchpad\\shots";
mkdirSync(OUT, { recursive: true });

const rotas = [
  ["home", "/"],
  ["modalidades", "/modalidades"],
  ["futsal-fem", "/modalidades/futsal-feminino"],
  ["volei-fem", "/modalidades/volei-feminino"],
  ["volei-masc", "/modalidades/volei-masculino"],
  ["sobre", "/sobre"],
  ["apoie", "/apoie"],
  ["contato", "/contato"],
];

const larguras = [320, 360, 375, 390, 412, 430];
const capturar = Number(process.env.SHOT ?? 390);

const navegador = await chromium.launch();
const problemas = [];
const alturas = [];

for (const w of larguras) {
  const ctx = await navegador.newContext({
    viewport: { width: w, height: 900 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    // sem isto o print de página inteira pega os blocos em opacity 0: o
    // ScrollTrigger recalcula quando o Playwright estica a viewport
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();

  for (const [nome, rota] of rotas) {
    await page.goto(BASE + rota, { waitUntil: "networkidle" });
    await page.waitForTimeout(350);

    // rola até o fim para disparar todo reveal e lazy-load
    await page.evaluate(async () => {
      const passo = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += passo) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(250);

    // 1. scroll horizontal
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 1) problemas.push(`${w}px ${nome}: overflow horizontal de ${overflow}px`);

    // 2. quem exatamente estoura a largura
    if (overflow > 1) {
      const culpados = await page.evaluate(() => {
        const limite = document.documentElement.clientWidth;
        return [...document.querySelectorAll("*")]
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && (r.right > limite + 1 || r.left < -1);
          })
          .slice(0, 6)
          .map((el) => {
            const r = el.getBoundingClientRect();
            return `${el.tagName.toLowerCase()}.${String(el.className).split(" ").slice(0, 3).join(".")} [${Math.round(r.left)}..${Math.round(r.right)}]`;
          });
      });
      culpados.forEach((c) => problemas.push(`   ↳ ${c}`));
    }

    // 3. texto que vaza do próprio contêiner
    const vazamentos = await page.evaluate(() => {
      const fora = [];
      for (const el of document.querySelectorAll("h1,h2,h3,p,span,a,button,li")) {
        if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflowX === "visible") {
          const t = (el.textContent ?? "").trim().slice(0, 34);
          if (t) fora.push(`${el.tagName.toLowerCase()} "${t}"`);
        }
      }
      return [...new Set(fora)].slice(0, 4);
    });
    vazamentos.forEach((v) => problemas.push(`${w}px ${nome}: texto excede o contêiner, ${v}`));

    // 4. alvos de toque abaixo de 44px
    const alvos = await page.evaluate(() => {
      const p = [];
      for (const el of document.querySelectorAll("a[href],button")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        // o skip link é sr-only até receber foco: 1px é o comportamento certo
        if (el.classList.contains("sr-only")) continue;
        if (r.height < 40) {
          const t = (el.getAttribute("aria-label") ?? el.textContent ?? "").trim().slice(0, 28);
          p.push(`${Math.round(r.height)}px "${t}"`);
        }
      }
      return [...new Set(p)].slice(0, 5);
    });
    alvos.forEach((a) => problemas.push(`${w}px ${nome}: alvo de toque baixo, ${a}`));

    if (w === capturar) {
      await page.screenshot({ path: `${OUT}\\${nome}-${w}.png`, fullPage: true });
      const altura = await page.evaluate(() => document.body.scrollHeight);
      alturas.push(`${nome}: ${altura}px (${(altura / 900).toFixed(1)} telas)`);
    }
  }
  await ctx.close();
}

// desktop: garante que nada regrediu
const ctxD = await navegador.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const pd = await ctxD.newPage();
for (const [nome, rota] of rotas) {
  await pd.goto(BASE + rota, { waitUntil: "networkidle" });
  await pd.evaluate(async () => {
    const passo = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += passo) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await pd.waitForTimeout(300);
  const overflow = await pd.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  if (overflow > 1) problemas.push(`1440px ${nome}: overflow horizontal de ${overflow}px`);
  if (process.env.SHOT_DESKTOP) {
    await pd.screenshot({ path: `${OUT}\\desk-${nome}.png`, fullPage: true });
  }
}
await ctxD.close();
await navegador.close();

console.log(problemas.length ? problemas.join("\n") : "sem problemas detectados");
console.log(`\n${problemas.length} ocorrencias`);
console.log(`\n--- altura em ${capturar}px ---\n${alturas.join("\n")}`);
