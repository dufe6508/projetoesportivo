# Design System: Projeto Esportivo Cláudio Brandão

**Versão 1.0 · 14/08/2026**
Documento normativo. Em caso de conflito, este arquivo vence sobre diretrizes globais.

Referências: [PROJETO-CLAUDIO-BRANDAO.md](PROJETO-CLAUDIO-BRANDAO.md) (dossiê) · [ANALISE-REFERENCIA.md](ANALISE-REFERENCIA.md) (estrutura base)
Tokens implementáveis: [tokens.css](tokens.css)

---

## Revisão 1.1 · 15/08/2026

**Esta seção vence sobre o restante do documento no que ela toca.** O que não aparece
aqui continua valendo como escrito. A fonte de verdade da implementação é
`site/app/globals.css`.

O que mudou, e por quê:

| Item | Versão 1.0 | Agora | Motivo |
|---|---|---|---|
| Tipografia | Oswald display, Newsreader editorial, Archivo corpo, Martian Mono dados | **Figtree, família única.** Três vozes por peso e espaçamento: `.u-display` 800, `.u-titulo` 700, `.u-eyebrow` 700 caixa alta | As três primeiras liam duras e mecânicas em tela. Contraste tipográfico se faz por peso, não por número de famílias |
| Botão | Bloco com sombra colorida e seta permanente | **Pílula sóbria**, sem brilho, sem seta por padrão, `min-h` de 44px, `active:scale(0.97)` | O brilho lia como plástico e a seta virava ruído em toda tela |
| Ouro | Cor de ação em vários lugares | **Só doação.** Nas demais superfícies o ouro vira acento de fundo ou some | O ouro perde significado quando aparece em tudo |
| Acento em fundo claro | `--gold-700` como eyebrow | **`--ink-400`.** O bronze envelhecia o bloco | Pedido direto do cliente |
| Barra de navegação | Gradiente azul saturado com realce | **Navy fosco**, `rgba(0,21,47,.92)` com desfoque simples, texto branco | A versão saturada lia como plástico sobre a foto |
| Menu suspenso | Superfície escura translúcida | **Superfície branca**, texto navy | Menu escuro sobre barra escura desaparecia |
| Faixa marquee de valores | Junta entre miolo claro e âncora escura | **Removida** | Movimento sem função, distraía |
| Princípios | Lista com régua fina | **Cards brancos** sobre `--ink-50`, ícone em círculo que inverte no hover | O bloco não se lia como seção própria |
| Fotografia | Imagens Creative Commons de quadra e bola, sem pessoas | **Fotos reais do projeto**, do Instagram oficial | Ver `site/public/img/CREDITOS.txt`, inclusive a ressalva de direito de imagem |

**Regra nova, e que já custou um bug:** SVG de ícone precisa de `fill="currentColor"` no
elemento `<svg>`. Os traçados do Phosphor não trazem `fill` próprio, então sem o atributo
o navegador pinta tudo de preto e ignora a cor do texto.

---

## 0. Ponto de partida e conflitos resolvidos

A marca já existe: escudo circular navy `#002154` com traço amarelo `#FBE47A`, monograma PECB, bolas de vôlei e futsal. **O design system é derivado da marca, não inventado ao lado dela.**

Dois conflitos de método, resolvidos aqui de uma vez:

| Conflito | Decisão |
|---|---|
| Estética minimalista pede monocromia quente e proíbe fundos de cor primária | **Rejeitado no que toca à paleta.** A marca é navy-dominante e é isso que dá identidade. Aproveitado o *método*: contraste tipográfico, bordas de 1px, sombra quase inexistente, macro-whitespace, nada de sombra genérica de template. |
| Fonte neutra segura (Inter/Roboto) | **Proibida.** É a assinatura visual de site feito às pressas. Ver seção 2. |

**Restrição herdada do dossiê:** o site não fala de títulos, competições nem da escola. Sem esses blocos, **a identidade visual e a fotografia carregam a credibilidade sozinhas.** Isso eleva a régua: o sistema precisa parecer sério por si só.

---

## 1. Identidade visual digital

### 1.1 Conceito

> **Escudo aberto.**

Um escudo é a forma mais antiga de pertencimento: diz de onde você é e a quem você pertence. Escudo *fechado* é excludente, clube, sócio, portaria. **Escudo aberto** mantém o orgulho e tira a porta.

Traduzindo em interface: **estrutura rígida, conteúdo acolhedor.** Grid firme, tipografia com peso, geometria disciplinada, e dentro dela, fotografia humana, respiro e linguagem direta. A tensão entre os dois é a identidade.

### 1.2 Personalidade

O site deve transmitir, nesta ordem:

1. **Orgulho**, de território, de camisa, de pertencer. Nunca vitimização. Não é um projeto que pede pena.
2. **Seriedade**, a associação é nova; o site tem que parecer instituição, não panfleto.
3. **Energia contida**, é esporte. Mas competência antes de barulho.
4. **Proximidade**, quem lê pode ser mãe de atleta ou diretor de empresa. Nenhum dos dois pode se sentir fora do lugar.

### 1.3 O que deve ser evitado, e por quê

| Evitar | Motivo |
|---|---|
| Estética de ONG genérica (azul-claro, tipografia arredondada, gente sorrindo em stock photo) | Apaga o escudo. O projeto tem brasão e território, dilui exatamente o que ele tem de próprio. |
| Comunicação por carência ("crianças carentes", "ajude quem precisa") | Trata o público como objeto. O projeto tem times, treinos e rotina, mostra-se pelo que faz. |
| Gradiente roxo/azul, glassmorphism, cartão com barra colorida à esquerda | Vocabulário de template. Nenhum deles pertence ao mundo do esporte. |
| Emoji como ícone | Quebra a consistência do pack e não escala. |
| Sombra genérica em tudo | Elevação vira ruído e o site fica com cara de painel SaaS. |

### 1.4 Princípios que regem todas as telas

1. **Navy é o chão, não o detalhe.** Fundos escuros são o estado natural das seções de identidade. Branco é onde se lê texto longo.
2. **Amarelo é assinatura, nunca área.** Ver seção 2.3, restrição de contraste, não de gosto.
3. **A foto manda no bloco.** Onde há foto, a tipografia se subordina. Onde não há, a tipografia é o assunto.
4. **Uma decisão por seção.** Cada seção tem um único elemento dominante. Duas ênfases = nenhuma.
5. **Ritmo alternado.** Nenhuma seção repete a composição da anterior. Ver seção 6.
6. **A geometria vem do escudo.** Círculo, arco e anel são o vocabulário gráfico proprietário. Ver 1.5.
7. **Movimento confirma, não enfeita.** Ver seção 8.

### 1.5 Elementos que tornam o projeto reconhecível

Quatro dispositivos proprietários, derivados do escudo. **São a diferença entre "site com o logo aplicado" e "site da marca".**

**a) O arco (`.pecb-arc`)**, o escudo tem texto correndo em arco. Repetimos: eyebrows de seção e selos em `textPath` sobre arco de círculo. Uso raro e pontual (1–2 por página).

**b) O anel duplo (`.pecb-ring`)**, a borda dupla concêntrica vira dispositivo de destaque: número de impacto, avatar e ícone de valor ganham anel externo de 1px separado por 4px de vão.

**c) A régua da quadra (`.pecb-court`)**, linhas de 1–2px atravessando seções, sempre em ângulo reto, ecoando marcação de quadra. Substitui a barra decorativa genérica.

**d) O par de bolas**, vôlei e futsal são os únicos ícones que podem ser preenchidos. Todos os demais são de traço. Isso os promove a símbolo.

### 1.6 Equilíbrio das quatro naturezas

| Natureza | Peso | Onde vive |
|---|---|---|
| Esportivo | 35% | Tipografia display, geometria do escudo, tratamento da foto, motion |
| Institucional | 30% | Grid, densidade, rodapé com CNPJ, sobriedade do navy |
| Social/humano | 25% | Fotografia, linguagem, respiro, depoimentos |
| Contemporâneo | 10% | Fluid type, detalhes de interação, restrição de sombra |

Se o site pende para institucional, fica frio; para social, fica genérico. **Esportivo é o fiel da balança.**

---

## 2. Paleta

### 2.1 Cores da marca

Amostradas dos pixels do arquivo do escudo. Não são estimativa.

| Token | HEX | Papel |
|---|---|---|
| `--brand` | **`#002154`** | Cor-mãe. Fundo de identidade, texto forte, botão primário. |
| `--accent` | **`#FBE47A`** | Assinatura. Detalhe, ícone e texto **exclusivamente sobre navy**. |

### 2.2 Rampa navy

| Token | HEX | Uso |
|---|---|---|
| `--navy-950` | `#000E22` | Fundo mais profundo, rodapé, overlay de foto |
| `--navy-900` | `#00152F` | Fundo de hero e seções escuras |
| `--navy-800` | `#002154` | **Marca.** Botão primário, texto de título |
| `--navy-700` | `#002E72` | Hover do primário, superfície escura elevada |
| `--navy-600` | `#003D95` | Link em fundo claro, foco, estado ativo |
| `--navy-500` | `#0A50B5` | Hover de link |
| `--navy-400` | `#2A6FD4` | Ilustração, gráfico |
| `--navy-300` | `#6098E4` | Link e ícone **sobre fundo escuro** |
| `--navy-200` | `#A3C3F1` | Texto secundário sobre navy |
| `--navy-100` | `#D2E2F8` | Borda sobre navy |
| `--navy-50` | `#EDF3FC` | Superfície azulada clara, faixa de seção |

### 2.3 Rampa amarela, leia antes de usar

| Token | HEX | Uso |
|---|---|---|
| `--gold-300` | `#FBE47A` | **Marca.** Só sobre navy-700 ou mais escuro |
| `--gold-400` | `#F5D23F` | Hover do amarelo sobre navy |
| `--gold-500` | `#E5B814` | Preenchimento de ícone sobre navy |
| `--gold-700` | `#7A5C0B` | **`--accent-ink`**, a única forma legítima do amarelo como texto em fundo claro |
| `--gold-100` | `#FDF6D2` | Fundo de tag/badge, com texto em `--gold-700` |

> ⚠️ **Regra dura.** `#FBE47A` sobre branco tem contraste **1,3:1**. Está três vezes abaixo do mínimo AA. Nunca use o amarelo da marca como texto, link, ícone informativo ou borda funcional em fundo claro. Sobre navy-800 ele entrega **12:1** e brilha. **O amarelo não é uma cor de texto, é uma cor de fundo escuro.**

### 2.4 Neutros

Enviesados para o azul da marca. Cinza puro leria como não-decidido.

| Token | HEX | Uso |
|---|---|---|
| `--ink-0` | `#FFFFFF` | Fundo de leitura |
| `--ink-25` | `#FAFBFD` | Fundo alternado |
| `--ink-50` | `#F4F6FA` | Superfície, card em fundo branco |
| `--ink-100` | `#E9EDF3` | Superfície pressionada |
| `--ink-200` | `#D8DEE8` | **Borda padrão** |
| `--ink-300` | `#BAC3D2` | Borda de input, divisor forte |
| `--ink-400` | `#8A94A8` | Texto desabilitado, placeholder |
| `--ink-500` | `#667089` | **Texto secundário** (4,6:1 sobre branco) |
| `--ink-700` | `#363E4D` | Texto corrido alternativo |
| `--ink-900` | `#141922` | Preto da marca, nunca `#000000` |

### 2.5 Papéis semânticos

| Papel | Claro | Escuro (sobre navy) |
|---|---|---|
| `--bg` | `#FFFFFF` | `#00152F` |
| `--surface` | `#F4F6FA` | `#002E72` |
| `--border` | `#D8DEE8` | `rgba(210,226,248,.18)` |
| `--text-primary` | `#002154` | `#FFFFFF` |
| `--text-secondary` | `#667089` | `#A3C3F1` |
| `--text-muted` | `#8A94A8` | `rgba(163,195,241,.7)` |
| `--link` | `#003D95` | `#FBE47A` |

### 2.6 Estados

| Estado | Regra |
|---|---|
| Hover (primário) | `#002154` → `#002E72` + `translateY(-1px)` |
| Hover (superfície) | `--ink-50` → `--ink-100`; card em navy clareia 4% |
| Active/press | `scale(0.97)` em 100ms. Vale para todo elemento pressionável. |
| Focus | Anel de 3px: `rgba(0,61,149,.4)` no claro, `rgba(251,228,122,.55)` no escuro. **Nunca remover.** |
| Disabled | `opacity: .45` + `cursor: not-allowed` + `aria-disabled` |
| Selected | Fundo `--navy-50`, borda `--navy-600`, texto `--navy-800` |

### 2.7 Feedback

| Papel | Texto/ícone | Fundo |
|---|---|---|
| Sucesso | `#127A55` | `#E6F4EE` |
| Atenção | `#7A5C0B` | `#FDF6D2` |
| Erro | `#B0342A` | `#FBEAE8` |
| Informação | `#003D95` | `#EDF3FC` |

Sempre acompanhados de ícone e texto. **Cor nunca é o único portador de significado.**

### 2.8 Institucional

CNPJ, razão social, endereço e políticas usam `--text-muted` sobre `--navy-950` no rodapé, em `caption` com `Martian Mono`. Discreto e legível, é sinal de seriedade, não letra miúda escondida.

---

## 3. Tipografia

### 3.1 Famílias

| Papel | Fonte | Por quê |
|---|---|---|
| **Corpo / UI** | **Archivo** (Google, variável 100–900) | Grotesca desenhada para alto desempenho em impressão e tela. Numerais excelentes, largura levemente estreita, economiza espaço em card sem parecer comprimida. Não é Inter. |
| **Dados / labels** | **Martian Mono** (Google, variável) | Monoespaçada com caractere. Usada só em eyebrow, número de impacto e dado institucional. Dá ar técnico-esportivo, tipo súmula. |
| **Display** | **Varia por direção**, ver seção 9 | É a variável que mais muda a personalidade. Fixá-la agora anularia a comparação das três direções. |

Base fixa: **Archivo + Martian Mono**. Só a display muda.

Carregamento: `next/font/google`, `display: swap`, subset `latin`, preload só da display e da Archivo 400/600.

### 3.2 Escala

Fluida via `clamp()`. Mobile 390 → desktop 1440. Sem breakpoint de tipografia.

| Papel | Tamanho | Peso | Line-height | Tracking |
|---|---|---|---|---|
| **Hero** | `clamp(2.75rem, 1.2rem + 7vw, 6rem)` (44→96) | 800 | 0.95 | −0.03em |
| **H1** | `clamp(2.25rem, 1.25rem + 4.4vw, 4rem)` (36→64) | 800 | 1.02 | −0.03em |
| **H2** | `clamp(1.75rem, 1.15rem + 2.6vw, 2.75rem)` (28→44) | 700 | 1.1 | −0.02em |
| **H3** | `clamp(1.375rem, 1.1rem + 1.2vw, 1.75rem)` (22→28) | 700 | 1.25 | −0.015em |
| **Subtítulo** | `clamp(1.125rem, 1rem + 0.5vw, 1.375rem)` (18→22) | 400 | 1.5 | −0.01em |
| **Corpo grande** | `1.125rem` (18) | 400 | 1.65 | 0 |
| **Corpo** | `1rem` (16) | 400 | 1.7 | 0 |
| **Corpo pequeno** | `0.9375rem` (15) | 400 | 1.6 | 0 |
| **Legenda** | `0.8125rem` (13) | 400 | 1.5 | 0 |
| **Label / eyebrow** | `0.75rem` (12) · Martian Mono | 500 | 1.3 | **+0.16em**, maiúsculas |
| **Botão** | `0.9375rem` (15) | 600 | 1 | +0.01em |
| **Navegação** | `0.875rem` (14) | 600 | 1 | +0.02em |
| **Número de impacto** | `clamp(3rem, 1.8rem + 5.5vw, 5.5rem)` (48→88) | 800 | 0.9 | −0.04em · `tabular-nums` |

### 3.3 Regras

- **Corpo nunca abaixo de 16px.** Em mobile, menos que isso dispara zoom automático no iOS.
- **Medida de 62–72 caracteres** em texto corrido. `max-width: 68ch`.
- **`text-wrap: balance`** em todo título; **`text-wrap: pretty`** em parágrafo.
- **Hierarquia por peso e tamanho, não por cor.** Título cinza-claro é falha, não estilo.
- **Máximo 3 níveis por tela.** Mais que isso, ninguém lê nada.
- **Números sempre `tabular-nums`.** Contadores não podem tremer.
- Máximo **duas famílias visíveis** por tela (display + Archivo). Martian Mono é tempero, conta como meia.

### 3.4 Comportamento responsivo

`clamp()` resolve o dimensionamento. O que muda por breakpoint é **composição, não tamanho**:

- ≤768px: hero cai para no máximo 3 linhas, se não couber, o texto encurta, a fonte não.
- ≤768px: tracking negativo do hero relaxa de −0.03em para −0.02em (em corpo pequeno, tracking apertado prejudica leitura).
- ≤480px: labels sobem de 12 para 13px: 12px maiúsculo com +0.16em fica ilegível em tela pequena.

---

## 4. Grid e espaçamento

### 4.1 Escala

Base 4. **Todo valor de espaçamento vem daqui. Sem exceção.**

```
2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128 · 160
```

Nomes: `space-0.5` (2) até `space-40` (160), sempre `n × 4px`.

### 4.2 Contêiner

| Token | Valor | Uso |
|---|---|---|
| `--container` | `1200px` | Padrão de todas as seções |
| `--container-wide` | `1440px` | Faixa de mídia, galeria full-bleed |
| `--container-prose` | `680px` | Texto corrido, formulário |
| `--gutter` | `20 / 32 / 40px` | Margem lateral em mobile / tablet / desktop |

### 4.3 Grid por breakpoint

| Breakpoint | Largura | Colunas | Gutter | Margem |
|---|---|---|---|---|
| Mobile | 390 | **4** | 16 | 20 |
| Tablet | 768 | **8** | 24 | 32 |
| Notebook | 1280 | **12** | 28 | 40 |
| Desktop | 1440 | **12** | 32 | 40 (contêiner 1200 centrado) |

Composições canônicas em 12 colunas: `12` (full), `8+4` (conteúdo + apoio), `6+6` (split), `7+5` (split assimétrico: **preferido**, cria tensão), `4+4+4` (trio), `3+3+3+3` (quarteto).

### 4.4 Ritmo vertical

| Token | Desktop | Mobile | Uso |
|---|---|---|---|
| `--space-section` | `128px` | `64px` | Entre seções principais |
| `--space-section-tight` | `80px` | `48px` | Entre seções da mesma família |
| `--space-block` | `48px` | `32px` | Entre blocos internos |
| `--space-stack` | `24px` | `20px` | Entre título e texto |
| `--space-inline` | `12px` | `12px` | Entre elementos irmãos |

**Regra de agrupamento:** distância entre elementos relacionados sempre menor que a distância ao grupo vizinho. Título grudado no parágrafo dele, longe do próximo bloco.

### 4.5 Espaçamento interno

| Componente | Desktop | Mobile |
|---|---|---|
| Card padrão | `32px` | `24px` |
| Card de mídia | `24px` (0 na área da foto) | `20px` |
| Botão grande | `18px 32px` | `16px 28px` |
| Botão padrão | `14px 24px` | `14px 24px` |
| Botão pequeno | `10px 16px` | `10px 16px` |
| Input | `14px 16px` | `14px 16px` |
| Header | `0 40px`, altura fixa | `0 20px` |

---

## 5. Forma, elevação e mídia

### 5.1 Raio

| Token | Valor | Uso |
|---|---|---|
| `--radius-none` | `0` | Faixa full-bleed, divisor, mídia de banner |
| `--radius-xs` | `2px` | Tag, badge |
| `--radius-sm` | `4px` | Input, select, botão pequeno |
| `--radius-md` | `8px` | **Botão padrão** |
| `--radius-lg` | `12px` | **Card padrão** |
| `--radius-xl` | `20px` | Painel grande, mídia em card |
| `--radius-full` | `9999px` | **Apenas** avatar, ícone circular e o escudo |

Regra: raio interno = raio externo − padding. Foto dentro de card com padding 24 e raio 20 recebe raio 8. Cantos concêntricos errados são o detalhe que denuncia trabalho apressado.

### 5.2 Sombra

Tingidas de navy. Sombra preta sobre paleta azul suja a cor.

| Token | Valor | Quando |
|---|---|---|
| `--shadow-none` | - | **Padrão.** Estado de repouso de quase tudo. |
| `--shadow-hairline` | `inset 0 0 0 1px var(--border)` | Separação em repouso, preferir a sombra |
| `--shadow-sm` | `0 1px 2px rgba(0,33,84,.06), 0 1px 1px rgba(0,33,84,.04)` | Elemento flutuante discreto |
| `--shadow-md` | `0 4px 12px rgba(0,33,84,.08)` | **Hover de card** |
| `--shadow-lg` | `0 12px 32px rgba(0,33,84,.12)` | Dropdown, header em scroll, modal |

**Doutrina:** repouso não tem sombra, tem borda. Sombra é **feedback de interação**, não decoração. Card que já nasce com `shadow-lg` não tem para onde subir no hover.

### 5.3 Imagens

Definido agora para que substituir placeholder por foto real seja troca de `src`, sem retrabalho de layout.

**Proporções canônicas, só estas quatro:**

| Proporção | Uso |
|---|---|
| `16:9` | Hero, banner, vídeo |
| `4:3` | Card de modalidade, card de projeto |
| `1:1` | Avatar, depoimento, item de galeria |
| `3:4` | Retrato vertical, destaque editorial |

**Regras de implementação:**
- `aspect-ratio` sempre declarado no contêiner, `object-fit: cover`, `object-position` ajustável por foto. Reserva espaço e zera layout shift.
- `next/image` obrigatório: AVIF/WebP, `sizes` por breakpoint, `priority` só na foto do hero, `placeholder="blur"` nas demais.
- Raio: `--radius-none` em full-bleed, `--radius-xl` em card grande, `--radius-lg` em card padrão, `--radius-full` em avatar.
- `alt` descritivo e específico. Foto decorativa: `alt=""` + `aria-hidden`.

**Tratamento, unifica material tirado de celulares diferentes ao longo de 3 anos:**
1. Sobre navy: gradiente `linear-gradient(180deg, rgba(0,21,47,0) 35%, rgba(0,21,47,.92) 100%)` para texto sobreposto.
2. Véu de marca: `rgba(0,33,84,.12)` em `multiply`, puxa todas as fotos para a mesma temperatura.
3. Grão: `opacity: .04`, disfarça compressão de WhatsApp.
4. Hover em card: `scale(1.03)` na foto dentro de contêiner com `overflow: hidden`, 320ms. O card não cresce; a foto respira dentro dele.

**Máscara proprietária:** o **anel** (1.5b) aplicado a foto quadrada gera o retrato-selo do projeto, foto circular com anel duplo navy/amarelo. Uso restrito a depoimento e equipe.

**Placeholder até as fotos chegarem:** bloco `--navy-800` com o monograma PECB em `--navy-700` a 40% de opacidade, centralizado, com a proporção correta. Nunca cinza vazio, nunca `picsum`. Comunica "foto vem aqui" sem parecer quebrado.

**Mobile:** hero passa de `16:9` para `4:3` (foto horizontal em tela vertical vira faixa inútil). Galeria vira carrossel com scroll-snap. Fotos com sobreposição de texto ganham véu 15% mais forte.

---

## 6. Estrutura das seções

Cada seção declara **objetivo, dominante e composição**. A regra que atravessa tudo: **nenhuma seção repete a composição da anterior.**

| # | Seção | Objetivo | Dominante | Composição | Fundo |
|---|---|---|---|---|---|
| 1 | **Hero** | Dizer o que é e para quem em 3s | Foto | Full-bleed, texto ancorado em baixo-esquerda, 7 col | **Navy 900** |
| 2 | **Modalidades** | Mostrar o que se faz | Grid | 2×2 cards de mídia, `4:3` | Branco |
| 3 | **Origem** | Diferenciar | Texto | **Assimétrico 5+7**, foto vertical `3:4` à esquerda | Branco |
| 4 | **Valores** | Dar caráter | Ícone | Trio `4+4+4`, ícone de traço + anel | Navy 50 |
| 5 | **Galeria** | Provar por imagem | Foto | **Mosaico irregular**, full-bleed sem contêiner | **Navy 950** |
| 6 | **Depoimento** | Humanizar | Citação | Coluna central 6 col, retrato-selo, aspas em display | Branco |
| 7 | **Apoiadores** | Credibilidade | Logos | Faixa, grayscale → cor no hover, altura normalizada | Ink 25 |
| 8 | **CTA final** | Converter | Cor | Bloco de contraste total, 2 botões | **Navy 800** + amarelo |
| 9 | **Rodapé** | Institucional | Estrutura | 4 col → 2 → 1, CNPJ em mono | **Navy 950** |

> **Decisão do cliente, 14/08/2026.** Duas mudanças em relação à versão anterior desta tabela:
> **(a) O navy fica restrito às âncoras.** Hero, galeria, CTA final e rodapé. Todo o miolo é claro.
> Resulta em cerca de 40% escuro e 60% claro, contra os 70% escuros da direção A original.
> **(b) A faixa de números de impacto saiu.** Não há mais barra de "04 modalidades / 120 atletas".
>
> ⚠️ **Consequência a encarar.** Somada à exclusão de títulos, competições e escola, a home fica
> **sem nenhum elemento quantitativo**. Não sobra um único número na página. Toda a credibilidade
> passa a depender de fotografia e narrativa. Isso não é impeditivo, mas eleva de vez a régua do
> acervo: **sem 30 a 50 fotos boas, esta home não fecha.** É agora o item mais bloqueante do projeto.

### 6.1 Ritmo

O padrão de fundo cria o batimento da página:

```
escuro → claro → claro → azul-claro → escuro → claro → claro → escuro → escuro
```

Nunca mais de dois claros seguidos sem quebra. A seção 4 (`navy-50`) existe como respiro entre dois
blocos brancos longos. As duas âncoras escuras do miolo, hero e galeria, ficam bem separadas: o
escuro volta como pontuação, não como chão.

### 6.2 Alternância de composição

```
full-bleed → grade 2×2 → assimétrico 5+7 → trio → mosaico → coluna central → faixa → bloco
```

Nenhuma composição se repete em sequência. **É isto que impede o site de virar "título + parágrafo + 3 cards" nove vezes.**

### 6.3 CTA por seção

Um CTA primário por tela. Os demais são secundários ou de texto.

| Seção | CTA |
|---|---|
| Hero | Primário "Conheça as modalidades" + secundário "Apoie o projeto" |
| Modalidades | Card inteiro clicável (sem botão) |
| Origem | Texto "Conheça o projeto →" |
| Galeria | Nenhum |
| CTA final | **Primário amarelo** "Apoie o projeto" + secundário em contorno "Fale com a gente" |

O amarelo como fundo de botão aparece **uma vez na página**, na seção 9. É a única cor totalmente saturada em toda a experiência, por isso funciona.

---

## 7. Componentes

### 7.1 Header

Não é uma barra de links. É o primeiro contato com a marca.

| Propriedade | Desktop | Mobile |
|---|---|---|
| Altura em repouso | `88px` | `64px` |
| Altura em scroll | `64px` (transição 220ms) | `56px` |
| Posição | `sticky top-0`, `z-index: 100` | idem |
| Fundo (topo) | Transparente sobre o hero | Transparente |
| Fundo (scroll) | `rgba(0,21,47,.92)` + `backdrop-filter: blur(12px)` + borda inferior 1px | idem |
| Logo | Escudo mono em branco, 44px → 32px em scroll | 36px, fixo |
| Navegação | Centro-direita, 14px/600, `--navy-200`; ativo em branco com sublinhado amarelo 2px | Oculta |
| CTA | Botão primário amarelo "Apoie", sempre visível | Botão pequeno |
| Menu mobile | - | Ícone de 3 traços → overlay **full-screen navy 950** |

**Comportamento em scroll:** apenas duas mudanças, encolher e ganhar fundo. **Não** esconde ao descer nem reaparece ao subir: em site institucional curto, header que some é hostil.

**Menu mobile:** overlay de tela cheia, itens em H2, entrada com stagger de 40ms, escudo grande em marca d'água a 6% no fundo, dados de contato no rodapé do overlay. Fecha com Esc e devolve o foco ao botão. É uma tela desenhada, não uma gaveta.

**Hover na navegação:** sublinhado amarelo cresce da esquerda em 160ms `ease-out`. **Sem mudança de cor**, evita o piscar de texto.

### 7.2 Botões

Altura mínima **48px** em qualquer variante (alvo de toque).

| Variante | Fundo | Texto | Borda | Uso |
|---|---|---|---|---|
| **Primário** | `--navy-800` | Branco | - | Ação principal em fundo claro |
| **Primário escuro** | `--gold-300` | `--navy-900` | - | Ação principal **sobre navy** |
| **Secundário** | Transparente | `--navy-800` | 1.5px `--navy-800` | Ação alternativa |
| **Secundário escuro** | Transparente | Branco | 1.5px `rgba(255,255,255,.35)` | Alternativa sobre navy |
| **Texto** | - | `--navy-600` | - | Terciária, navegação in-line |
| **Com ícone** | herda | herda | herda | Ícone 20px, gap 8px, `stroke-width: 1.75` |
| **CTA institucional** | `--gold-300` | `--navy-900` | - | Grande (56px), tracking +0.02em, só na seção 9 |

**Estados (todas as variantes):**

```
hover    → fundo escurece um degrau + translateY(-1px), 160ms ease-out
active   → scale(0.97), 100ms  ← obrigatório, é o que faz o botão parecer vivo
focus    → outline 3px do anel de foco, offset 2px  ← nunca remover
disabled → opacity .45, cursor not-allowed, aria-disabled
loading  → spinner 16px substitui o label, largura travada, aria-busy
```

Raio `--radius-md` (8px). Sem sombra em repouso. Sem gradiente. Nunca `border-radius: full` em botão retangular.

### 7.3 Cards

Sete variantes. Cada uma com regra de uso, evita o card genérico aplicado a tudo.

| Variante | Estrutura | Quando |
|---|---|---|
| **Modalidade** | Foto `4:3` no topo → nome → linha de metadados (naipe · idade) → seta | As 4 modalidades. **Card inteiro é o link.** |
| **Impacto** | Número gigante → label mono → linha fina | Faixa de números. Sem borda, separado por divisor vertical. |
| **Depoimento** | Retrato-selo 72px → citação → nome/papel | Sempre em coluna central, nunca em grade de 3. |
| **Parceiro** | Logo centrado em caixa de altura fixa 56px | Grayscale, `opacity .6` → cor + 1 no hover. |
| **Institucional** | Ícone de traço com anel → título → texto | Valores, informação. Sem foto. |
| **CTA** | Fundo navy → título → botão | Encerramento de seção. Máximo um por página. |
| **Editorial** | Foto `3:4` + texto ao lado | Origem, história. Assimétrico, nunca em grade. |

**Regras comuns:** borda 1px `--border` + `--shadow-none` em repouso. Hover: `--shadow-md` + `translateY(-2px)` + foto interna `scale(1.03)`, 220ms `ease-out`. Card clicável usa `<a>` envolvendo tudo, com `:focus-visible` no elemento inteiro. Título de card é `<h3>`.

### 7.4 Formulário

- Label **sempre visível** acima do campo. Placeholder não é label.
- Altura 48px, raio `--radius-sm`, borda `--ink-300`, foco com anel de 3px.
- Erro **abaixo do campo**, com ícone, em `--danger`, `role="alert"`.
- Validação no `blur`, não a cada tecla.
- Select de assunto (Patrocínio / Parceria / Inscrição / Imprensa / Outro), é o que roteia todos os "Entre em contato" do site.
- Envio: botão em loading → sucesso com confirmação visível. Estados de loading, sucesso e erro são **entregáveis obrigatórios**, não refinamento.

---

## 8. Movimento

### 8.1 Tokens

| Token | Valor | Uso |
|---|---|---|
| `--dur-press` | `100ms` | Press/scale |
| `--dur-fast` | `160ms` | Hover, cor, sublinhado |
| `--dur-base` | `220ms` | Card, header, dropdown |
| `--dur-slow` | `320ms` | Overlay, entrada de seção |
| `--ease-out` | `cubic-bezier(.23,1,.32,1)` | **Padrão.** Entrada e resposta. |
| `--ease-in-out` | `cubic-bezier(.77,0,.175,1)` | Movimento em tela |

**`ease-in` é proibido em UI.** Começa devagar exatamente no instante em que o usuário está olhando, faz o site parecer lento com a mesma duração.

### 8.2 Padrões

| Elemento | Animação |
|---|---|
| Botão hover | `translateY(-1px)`, 160ms |
| Botão press | `scale(0.97)`, 100ms |
| Card hover | `translateY(-2px)` + sombra + foto `scale(1.03)`, 220ms |
| Link de navegação | Sublinhado cresce da esquerda, 160ms |
| Entrada de seção | `opacity 0→1` + `translateY(16px→0)`, 320ms, `IntersectionObserver` com `once: true` |
| Stagger de lista | 50ms entre itens, **máximo 6**, depois disso vira espera |
| Header em scroll | Altura + fundo, 220ms |
| Menu mobile | Overlay 320ms; itens com stagger 40ms |
| Contador | 1200ms `ease-out`, dispara ao entrar em viewport, **uma vez** |

**Saída sempre mais rápida que entrada** (60–70% da duração). Fechar é resposta do sistema; abrir é apresentação.

### 8.3 Restrições

- Animar **apenas `transform` e `opacity`**. Nunca `width`, `height`, `top`, `left`.
- Nunca de `scale(0)`. Mínimo `scale(0.95)` + opacidade.
- Hover atrás de `@media (hover: hover) and (pointer: fine)`, em toque, hover dispara no tap e gera falso positivo.
- `@media (prefers-reduced-motion: reduce)`: mantém opacidade e cor, **remove todo deslocamento**. Reduzido significa menos, não zero.
- Máximo **2 elementos animados por viewport**.

---

## 9. Acessibilidade e UX

**Não negociável. Item de entrega, não refinamento.**

| Item | Regra |
|---|---|
| Contraste | AA mínimo: 4,5:1 texto normal, 3:1 texto grande e ícone funcional. Verificar **cada tema separadamente**. |
| Amarelo | Ver 2.3. Regra dura, verificada em revisão. |
| Corpo | Nunca abaixo de 16px |
| Alvo de toque | Mínimo 48×48px, espaçamento mínimo 8px |
| Teclado | Tudo alcançável na ordem visual. Foco sempre visível. Skip link para o conteúdo. |
| Semântica | `<button>` é botão, `<a>` é link, `<nav>`, `<main>`, `<footer>`. `<div>` clicável só em último caso, com `role` e `tabindex`. |
| Títulos | `h1` → `h6` sem pular nível. Um `h1` por página. |
| Imagem | `alt` descritivo; decorativa com `alt=""` + `aria-hidden` |
| Ícone só | `aria-label` obrigatório |
| Cor | Nunca única portadora de informação, sempre com ícone ou texto |
| Formulário | Label visível, erro junto ao campo, `role="alert"`, foco no primeiro campo inválido |
| Modal/overlay | Foco preso dentro, Esc fecha, foco devolvido ao gatilho |
| Movimento | `prefers-reduced-motion` respeitado |
| Zoom | Nunca desabilitar. `user-scalable=no` é proibido. |
| Medida | 62–72 caracteres; nenhum parágrafo com mais de 5 linhas em mobile |

**UX de leitura:** conteúdo escaneável, subtítulo a cada 2–3 parágrafos, listas onde couber, negrito em conceito e nunca em frase inteira. CTA sempre com verbo de ação e resultado explícito ("Apoie o projeto", não "Saiba mais").

---

## 10. Responsividade

Mobile-first. **390px é a referência principal**, é onde o público real acessa.

| Breakpoint | Largura | Nome |
|---|---|---|
| Mobile | 390 | `base` |
| Mobile grande | 480 | `xs` |
| Tablet | 768 | `md` |
| Notebook | 1280 | `lg` |
| Desktop | 1440 | `xl` |

### 10.1 Reorganização

| Componente | Desktop 1440 | Notebook 1280 | Tablet 768 | Mobile 390 |
|---|---|---|---|---|
| Contêiner | 1200 centrado | Fluido, margem 40 | Fluido, margem 32 | Fluido, margem 20 |
| Header | Logo + nav + CTA | idem | Logo + CTA + menu | Logo + menu |
| Hero | Texto 7 col, foto full-bleed `16:9` | idem | Texto 8/8, `16:9` | Texto full, foto **`4:3`**, empilhado |
| Modalidades | 2×2 | 2×2 | 2×2 | **1 col empilhada** |
| Origem (5+7) | Assimétrico | Assimétrico | **Empilha**, foto primeiro | Empilha |
| Valores | 3 em linha | 3 em linha | 3 em linha, compacto | **1 col** |
| Galeria | Mosaico irregular | Mosaico | Grade 2 col | **Carrossel scroll-snap** |
| Rodapé | 4 col | 4 col | 2 col | 1 col, accordion |

### 10.2 Ajustes por faixa

**≤768px**, ritmo vertical cai ~50% (`128 → 64`, `48 → 32`); padding de card `32 → 24`; tracking do hero relaxa; toda composição assimétrica empilha com **a foto primeiro** (imagem prende; texto sem contexto não).

**≤480px**, labels sobem para 13px; botões de largura total quando forem ação principal; número de impacto cai um degrau; galeria vira carrossel.

**≥1440px**, o contêiner **para de crescer** em 1200. O que ganha largura é a mídia full-bleed. Texto esticado em monitor grande é falha de leitura.

### 10.3 Regras duras

- **Sem scroll horizontal em nenhuma largura.** Conteúdo largo (tabela, faixa de logos) rola dentro do próprio contêiner com `overflow-x: auto`.
- **Testar com conteúdo real:** nome de modalidade curto e longo, 2 apoiadores e 20, depoimento de 1 linha e de 6.
- `min-h-dvh`, nunca `100vh`.
- Testar em **landscape** de celular.

---

## 11. As três direções, resumo

Detalhamento visual no artefato. As três compartilham marca, paleta e escala de espaçamento. **O que muda é real:** fonte display, densidade, raio, composição, tratamento de foto e vocabulário gráfico.

| | **A · ESCUDO** | **B · QUADRA** | **C · PLACAR** |
|---|---|---|---|
| Tese | Clube com padrão de clube grande | Editorial humano | Esporte contemporâneo |
| Display | **Oswald** 600, maiúsculas condensadas | **Newsreader** 600, serifada editorial | **Archivo Black**, grotesca larga |
| Fundo dominante | Navy escuro | Branco quente | Blocos chapados alternados |
| Raio | 12 / 20 | 4 / 8 | **0 / 2** |
| Densidade | Alta | Baixa (muito respiro) | Muito alta, modular |
| Composição | Blocos justapostos, cheios | Assimétrica, coluna estreita | Bento sem vão |
| Foto | Alto contraste, véu navy forte | Grande, natural, com legenda | Recortada, sangrando, duotone |
| Gráfico | Arco e anel do escudo | Régua de quadra (linhas finas) | Numeração e listra |
| Risco | Pode ficar pesado | Pode ficar tímido | Pode ficar agressivo |

---

## 12. Checklist de entrega

**Fundamentos**
- [ ] Toda cor vem de token semântico, zero hex solto no componente
- [ ] Amarelo nunca como texto/ícone em fundo claro (regra 2.3)
- [ ] Fontes via `next/font`, `display: swap`, sem layout shift
- [ ] Todo espaçamento vem da escala base 4
- [ ] Raio e sombra conforme seção 5; repouso sem sombra

**Robustez**
- [ ] Loading, empty, error e success desenhados
- [ ] Hover, focus, active, disabled visíveis em todo interativo
- [ ] Testado com texto curto e longo, muitos e poucos itens
- [ ] Fotos com `aspect-ratio` declarado: CLS zero

**Qualidade**
- [ ] Transições com token; press `scale(0.97)`; nenhum `ease-in`
- [ ] `prefers-reduced-motion` respeitado
- [ ] Contraste AA verificado em fundo claro e escuro
- [ ] Navegação por teclado completa, foco sempre visível
- [ ] Sem scroll horizontal de 390 a 1920
- [ ] Ícones de um único pack, traço consistente
- [ ] Nenhuma seção repete a composição da anterior
- [ ] O site não parece template
