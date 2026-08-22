import { chromium } from "playwright";

const B = "http://localhost:3000";
const rotas = ["/", "/sobre", "/modalidades", "/modalidades/volei-feminino", "/titulos", "/apoie", "/contato"];
const b = await chromium.launch();
const achados = [];

for (const r of rotas) {
  for (const vp of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    const p = await b.newPage({ viewport: vp });
    p.on("pageerror", (e) => achados.push(`${r} ${vp.width} erro: ${e.message}`));
    await p.goto(B + r, { waitUntil: "networkidle", timeout: 60000 });
    await p.waitForTimeout(700);

    const res = await p.evaluate(() => {
      const out = { alvos: [], img: [], h: [], vazio: [] };

      // alvos de toque abaixo de 44px
      for (const el of document.querySelectorAll("a, button, input, select, textarea")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (getComputedStyle(el).display === "none") continue;
        if (r.height < 44 && !el.closest("footer")) {
          out.alvos.push(`${el.tagName} "${(el.textContent || "").trim().slice(0, 28)}" ${Math.round(r.height)}px`);
        }
        if (!(el.textContent || "").trim() && !el.getAttribute("aria-label") && !el.querySelector("[aria-label]")) {
          out.vazio.push(`${el.tagName} sem nome acessível`);
        }
      }

      // imagens sem alt declarado
      for (const im of document.querySelectorAll("img")) {
        if (im.getAttribute("alt") === null) out.img.push(im.currentSrc || im.src);
      }

      // salto de nível de título
      const niveis = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => +h.tagName[1]);
      for (let i = 1; i < niveis.length; i++) {
        if (niveis[i] - niveis[i - 1] > 1) out.h.push(`h${niveis[i - 1]} para h${niveis[i]}`);
      }

      return out;
    });

    const marca = (t, arr) =>
      arr.length && achados.push(`${r} @${vp.width}  ${t}: ${[...new Set(arr)].join(" | ")}`);
    marca("alvo < 44px", res.alvos);
    marca("img sem alt", res.img);
    marca("salto de título", res.h);
    marca("sem nome acessível", res.vazio);

    await p.close();
  }
}

await b.close();
console.log(achados.length ? achados.join("\n") : "nada a corrigir");
