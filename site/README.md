# Site, Projeto Esportivo Cláudio Brandão

Next.js 16 (App Router) + Tailwind v4 + TypeScript + GSAP. Tudo estático, sem banco e sem CMS.

## Rodar

```bash
npm run dev     # desenvolvimento em http://localhost:3000
npm run build   # build de produção
npm start       # servir o build
```

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| Texto, modalidades, princípios, contato, galeria | `lib/dados.ts` |
| Lâminas do carrossel do topo | `components/Hero.tsx`, constante `laminas` |
| Cor, fonte, raio, sombra, movimento | `app/globals.css`, bloco `@theme` |
| Fotos | `public/img/`, e o caminho em `lib/dados.ts` |
| Logo | `public/escudo.png` |
| Ícones | `components/Icone.tsx`, traçados do pack Phosphor |

Quase todo conteúdo está em `lib/dados.ts`. Trocar texto e foto não exige tocar em componente.

## Fotos

São as fotos reais do projeto, baixadas do Instagram oficial com autorização do responsável pela
conta. Detalhe de cada arquivo, recorte aplicado e a ressalva sobre direito de imagem de menores
estão em `public/img/CREDITOS.txt`. **Leia esse arquivo antes de publicar.**

Os originais sem recorte ficam fora do site, em `../fotos-instagram-originais/`.

Proporções em uso, para trocar sem quebrar layout:

- cards de modalidade: 4:3
- retrato dos blocos editoriais: 5:4
- lâminas do hero: panorâmica, o recorte fino se ajusta por `objectPosition` em `Hero.tsx`
- galeria: bento de 3 colunas, `span: "grande"` ocupa 2x2 e `span: "largo"` ocupa a linha

## Tipografia

Uma família só, **Figtree**, carregada por `next/font`. Três vozes, definidas por peso e
espaçamento em `globals.css`, não por famílias diferentes:

- `.u-display` para títulos de impacto, peso 800
- `.u-titulo` para títulos de leitura, peso 700, mais macio
- `.u-eyebrow` para rótulo de seção, caixa alta com espaçamento largo

Oswald, Newsreader e Martian Mono saíram: liam duras e mecânicas.

## Botões

`components/Botao.tsx`. Pílula sóbria, sem brilho colorido e sem seta por padrão. Tons:

| Tom | Onde |
|---|---|
| `solido` | ação principal em fundo claro |
| `claro` | ação principal em fundo escuro |
| `ouro` | só doação, o único lugar onde o ouro carrega significado |
| `contorno`, `contornoClaro` | ação secundária |
| `texto` | link com sublinhado que acende no hover |

Ícone só quando ele diz algo, via a prop `icone`.

## O que ainda não existe

- **Envio do formulário.** `components/Formulario.tsx` valida, mostra carregando, sucesso e erro,
  mas não envia. Falta plugar uma Server Action ou serviço de e-mail. Está marcado com
  `ponytail:` no arquivo.
- **Dados de doação.** A página `/apoie` descreve as formas de apoiar, mas ainda não tem chave PIX
  nem dados bancários.

## Decisões que valem saber

- **O SVG dos ícones precisa de `fill="currentColor"`.** Os traçados do Phosphor não trazem `fill`
  próprio, então sem esse atributo o navegador pinta tudo de preto e ignora a cor do texto.
- **O estado inicial das entradas é escrito pelo GSAP, nunca por CSS.** Se o script falhar, o
  conteúdo continua visível. Esconder por CSS e revelar por JS faz a página sumir inteira quando
  algo dá errado.
- **A barra de navegação é navy fosco de propósito.** A versão saturada, com brilho e realce de
  saturação, lia como plástico por cima da foto do hero.
- **O menu suspenso de modalidades é claro.** Sobre uma barra escura, um menu escuro desaparecia.
- **O hero tem três camadas de escurecimento**: base uniforme, gradiente lateral para o texto e
  faixa no topo para a barra de navegação. Sem a faixa do topo a nav sumia sobre céu claro.
- **Amarelo nunca é texto em fundo claro.** `#FBE47A` sobre branco dá 1,3:1. Ver `DESIGN_SYSTEM.md`.

## Scripts de conferência

`rev.mjs` tira as capturas de tela em `shot/`, `check.mjs` roda a checagem automática de alvo de
toque, `alt`, salto de nível de título e scroll horizontal. Ambos precisam do `npm run dev` no ar.

## Verificado

Build limpo, 12 rotas estáticas. Sem scroll horizontal de 390 a 1920. Um `h1` por página, sem pulo
de nível de título, toda imagem com `alt`, alvos de toque com no mínimo 44px em telas de toque,
foco de teclado visível, `prefers-reduced-motion` respeitado, nenhum erro de console.
