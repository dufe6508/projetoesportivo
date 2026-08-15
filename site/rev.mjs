import { chromium } from "playwright";

const B = "http://localhost:3000";
const b = await chromium.launch();
const erros = [];

async function tira(nome, rota, y, viewport = { width: 1440, height: 900 }) {
  const p = await b.newPage({ viewport });
  p.on("console", (m) => m.type() === "error" && erros.push(`${rota} ${m.text()}`));
  p.on("pageerror", (e) => erros.push(`${rota} ${e.message}`));
  await p.goto(B + rota, { waitUntil: "networkidle", timeout: 60000 });
  await p.waitForTimeout(1200);
  if (y) {
    await p.evaluate((v) => window.scrollTo({ top: v, behavior: "instant" }), y);
    await p.waitForTimeout(1600);
  }
  await p.screenshot({ path: `shot/${nome}.png` });
  // largura do documento acima da viewport = scroll horizontal indesejado
  const over = await p.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  if (over) erros.push(`${rota} overflow horizontal em ${viewport.width}px`);
  await p.close();
}

await tira("01-hero", "/", 0);
await tira("02-modalidades", "/", 900);
await tira("03-origem", "/", 1750);
await tira("04-principios", "/", 2650);
await tira("05-galeria", "/", 3700);
await tira("06-rodape", "/", 99999);
await tira("07-sobre", "/sobre", 700);
await tira("08-modalidades-idx", "/modalidades", 300);
await tira("09-contato", "/contato", 300);
await tira("10-apoie", "/apoie", 300);
await tira("11-mob-hero", "/", 0, { width: 390, height: 844 });
await tira("12-mob-cards", "/", 900, { width: 390, height: 844 });
await tira("13-mob-princ", "/", 2600, { width: 390, height: 844 });

await b.close();
console.log(erros.length ? erros.join("\n") : "sem erros");
