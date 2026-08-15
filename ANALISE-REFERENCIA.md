# Análise de Referência, institutomaisacao.com.br

Documento base para construção do novo site do projeto esportivo.
Data da análise: 13/08/2026 · Fonte: institutomaisacao.com.br (WordPress)

---

## 1. Leitura geral do site de referência

**Stack:** WordPress com tema comercial genérico (Elementor-like), plugin GDPR Cookie Compliance, formulários e doação delegados a terceiros (`gepweb.infsystem.com.br` para o app, página interna `/doacao-online/`).

**Natureza:** site institucional de ONG esportiva, não é e-commerce, não é blog primário. Objetivo real do site é **credibilidade + captação** (patrocinador, doador, parceiro) e, secundariamente, **informar famílias/beneficiários**.

**Modelo de conteúdo (importante para copiar a lógica):**
- 1 instituição
- N projetos (cada um com público, faixa etária, modalidade, núcleos/cidades)
- N notícias
- N patrocinadores/parceiros (logos)
- documentos de transparência

Esse modelo, instituto → projetos → núcleos → patrocinadores, é o esqueleto de dados que o nosso site deve reaproveitar, mesmo mudando tudo visualmente.

**Diagnóstico honesto:** a estrutura de informação é boa e faz sentido. A execução é fraca, hierarquia visual rasa, páginas com 3 linhas de texto e duas imagens (`/incentivo/`), CTA repetido genérico em todas as páginas, muros de logos sem tratamento, listas de 30 cidades em texto corrido. **Reaproveitar a estrutura, refazer a execução.**

---

## 2. Arquitetura de informação atual

| Menu | Sub-itens | Status no nosso projeto |
|---|---|---|
| Início | - | ✅ manter |
| Sobre | O Instituto, Projetos | ✅ manter |
| Juntos pelo Esporte | Incentivo, Parcerias, Patrocínios | ✅ manter |
| Notícias | - | ❌ ignorar |
| Contribua | - | ✅ manter |
| Transparência | Diretoria, FAQ, Editais, ESG, Estatutos, Informativos, Publicações contábeis | ⚠️ opcional / reduzido |
| Ouvidoria | - | ❌ ignorar |
| Aplicativo Mais Ação | (link externo) | ❌ ignorar |
| - | Contato | ➕ **ADICIONAR (pedido explícito)** |

**Header:** logo à esquerda, menu horizontal com dropdowns, sem CTA fixo destacado.
→ **Falha clara.** Um site cujo objetivo é captação não tem botão de doar/contato fixo no header. Nosso header terá CTA persistente.

**Footer:** endereço (Ginásio Teixeira Dias, Rua Antonio Teixeira Dias, 1736, Belo Horizonte/MG), e-mail, telefone (31) 99115-7660, horário (seg–sex 8h–17h, almoço 12h–13h), redes (Facebook, Instagram), links de doação/FAQ/publicações, política de privacidade.

---

## 3. Análise seção a seção (as que vamos usar)

### 3.1 INÍCIO

**Como está hoje (ordem real):**
1. Slider/hero
2. Dois blocos-CTA lado a lado: "Seja um patrocinador" e "Fique por dentro das notícias"
3. **Conheça nossos projetos**: 4 cards (Voleibol, Olímpico, Semear, Sementinhas), mostra só 4 dos 6 projetos existentes
4. **Sobre o instituto**, missão resumida + valores (Caráter, Empatia, Honestidade, Coletividade, Resiliência)
5. Notícias recentes
6. Footer

**O que funciona (manter a lógica):**
- Ordem `hero → projetos → sobre → prova social → CTA` é correta para ONG. Mostra **o que fazemos** antes de **quem somos**.
- Projetos em card grid é a decisão certa, é o conteúdo mais concreto e emocional que a instituição tem.

**O que quebra:**
- Hero sem proposta de valor escrita. Não responde "o que é isso e para quem" em 3 segundos.
- Zero números. Uma ONG com **~32 núcleos Semear + ~30 núcleos Sementinhas espalhados por 12+ estados** não mostra isso em lugar nenhum na home. É o ativo de credibilidade mais forte do site e está escondido.
- Cards de projeto sem informação útil: só imagem + nome. Falta faixa etária, modalidade, cidade.
- Home mostra 4 de 6 projetos, sem link "ver todos".
- Bloco "Sobre" é texto corrido de missão/visão, leitura institucional chata, sem rosto humano.
- Nenhuma prova social na home (patrocinadores, depoimentos), logos só aparecem enterrados em `/patrocinios/`.

**Nossa home (estrutura proposta):**
1. **Hero**, headline com proposta de valor real + subtítulo de 1 frase + 2 CTAs (primário: "Seja parceiro/Contribua", secundário: "Conheça os projetos"). Imagem/vídeo real de atleta, não stock.
2. **Barra de impacto**: 4 números grandes: nº de atendidos, nº de núcleos, nº de cidades/estados, ano de fundação. Animação de contagem ao entrar em viewport.
3. **Conheça nossos projetos**, grid de cards ricos: foto, nome, badge de modalidade, faixa etária, nº de núcleos, link. Card inteiro clicável, hover com elevação. Se >6, carrossel ou "ver todos".
4. **Sobre o instituto (resumo)**, bloco split (imagem + texto), 2–3 frases da missão, valores como chips/ícones, link "conheça o instituto".
5. **Onde estamos**, mapa do Brasil / lista agrupada por estado com contagem. Transforma a lista morta de 60+ cidades em prova visual de alcance.
6. **Patrocinadores e parceiros**, faixa de logos em grayscale, colorindo no hover, altura normalizada.
7. **Depoimento** (se o professor tiver): 1 frase de atleta/família/técnico com foto e nome.
8. **CTA final "Mude uma história"**, bloco de contraste forte, botão para Contato/Contribua.
9. **Footer.**

### 3.2 SOBRE O INSTITUTO

**Como está:** Sobre → Missão → Visão → Valores → CTA → Notícias. Texto puro, sem imagem, sem timeline, sem equipe. Tem uma citação boa do diretor ("Faz bem para o coração promover o desenvolvimento de pessoas por meio do esporte") jogada sem destaque.

**Conteúdo aproveitável:**
- Fundação: 2018, Belo Horizonte/MG, sem fins lucrativos
- Missão: "promover o desenvolvimento humano e social por meio de práticas esportivas, integrando esporte, educação e bem-estar"
- Visão: ser referência em transformação social pelo esporte
- Valores: Caráter · Empatia · Honestidade · Coletividade · Resiliência

**Nossa versão:**
1. Hero de página (título + linha de contexto, sem slider)
2. História, texto + foto real, quebrado em 2 colunas, não parágrafo único
3. Missão / Visão em bloco destacado (2 cards ou split assimétrico)
4. Valores: 5 cards com ícone (pack único, ex. Phosphor), não bullet list
5. Citação do diretor em bloco de destaque com foto e nome/cargo
6. Linha do tempo (2018 → hoje), opcional, se houver marcos
7. Equipe/diretoria, opcional (cai bem, substitui a página "Diretoria" da transparência)
8. CTA final

### 3.3 PROJETOS

**Como está:** não existe página índice de projetos (`/projetos/` dá 404), cada projeto é uma página solta no menu dropdown. Cada página tem: título, 1–2 frases, núcleos, 2 fotos, CTA. É o ponto mais fraco do site em relação ao valor do conteúdo.

**Dados reais mapeados (usar como template de ficha):**

| Projeto | Público | Idade | Modalidade | Núcleos |
|---|---|---|---|---|
| Mais Ação Voleibol | meninas | 10–18 (pré-equipe, sub-13/14/15/17/18) | Vôlei | BH/MG, Contagem/MG |
| Mais Ação Olímpico | meninos | 9–14 | Futebol | Salinas/MG |
| Semear Esportes | ambos | 8–16 | Futsal, Vôlei | ~32 (12+ estados) |
| Sementinhas do Esporte | ambos | 6–14 | Futsal | ~30 |
| Cultivar Esportes | - | - | - | - |
| Mais Ação Cidadão | - | - | - | - |

Todos gratuitos. **Esse conjunto de atributos (público · idade · modalidade · núcleos · gratuito) é o schema do nosso card e da nossa ficha de projeto.**

**Nossa versão:**

*Página índice `/projetos`:*
- Título + intro curta
- Grid de cards com os atributos acima visíveis
- Filtro por modalidade e/ou faixa etária (só se houver ≥6 projetos; senão, YAGNI, grid simples)

*Página de projeto (template único, reutilizado):*
1. Hero com foto do projeto + nome + badge "Gratuito"
2. **Ficha rápida**, linha de dados: público / idade / modalidade / nº de núcleos
3. Descrição do projeto (2–4 parágrafos, precisa ser escrita, hoje é 1 frase)
4. Núcleos, agrupados por estado, em grid/accordion, não texto corrido
5. Galeria de fotos (grid com lightbox)
6. Patrocinadores específicos do projeto (se houver)
7. CTA "Quero apoiar este projeto" → Contato com projeto pré-selecionado

### 3.4 JUNTOS PELO ESPORTE

Guarda-chuva com 3 filhos. É a seção **B2B** do site, quem lê aqui é empresa, não família. Tom e densidade diferentes do resto.

**Incentivo**, hoje: página quase vazia, título + 2 imagens + link para gov.br. Desperdício total, é o argumento mais forte para uma empresa.
→ **Nossa versão:** explicar a Lei de Incentivo ao Esporte de verdade: o que é, quem pode usar (IRPJ lucro real / pessoa física), limites de dedução, e um **passo a passo visual em 3–4 etapas** (empresa escolhe projeto → destina parte do imposto → instituto executa → presta contas). Fechar com CTA "fale com a gente".

**Parcerias**, hoje: muro de logos + frase de efeito. Sem dizer o que é uma parceria nem o que se espera.
→ **Nossa versão:** tipos de parceria (institucional, técnica, cessão de espaço, voluntariado), o que o parceiro oferece × o que recebe, grid de parceiros atuais tratado, CTA.

**Patrocínios**, hoje: ~30 logos (Vale, Cemig, ArcelorMittal, MRS, Unipar, Anglo, Crown, NTS, Magnesita…) e nenhuma informação sobre cotas ou contrapartidas.
→ **Nossa versão:** por que patrocinar (impacto + visibilidade + incentivo fiscal), **cotas em cards comparativos** com contrapartidas por nível, wall of logos tratado (grayscale → cor no hover), CTA para contato comercial.

> Nota: a lista de patrocinadores reais é o maior ativo de credibilidade do site de referência. No nosso, ela precisa aparecer na home, não só numa página interna.

### 3.5 CONTRIBUA

**Como está:** headline "VOCÊ PODE FAZER A DIFERENÇA" / "MUDE UMA HISTÓRIA", dados bancários Itaú (ag. 3039, c/c 39781-9, CNPJ 30.926.461/0001-50), botão "Doação online", e-mail e telefone.

**Falhas:** só transferência bancária + link externo. Sem PIX (imperdoável no Brasil), sem valores sugeridos, sem dizer o que cada valor compra, sem recibo/dedução explicada.

**Nossa versão:**
1. Hero emocional curto
2. **Escolha de valor**: 3–4 cartões (R$ 25 / 50 / 100 / outro) com equivalência concreta ("R$ 50 = 1 kit de uniforme")
3. **Formas de doar**: PIX com QR Code e copia-e-cola, transferência bancária, doação online, doação recorrente
4. **Pessoa jurídica**, bloco curto redirecionando para Incentivo/Patrocínios
5. Transparência: "para onde vai sua doação", link para prestação de contas
6. FAQ curto (é dedutível? recebo recibo? posso cancelar recorrência?)
7. CTA de contato

### 3.6 CONTATO *(nova, não existe como página no site de referência)*

Hoje o contato é só um bloco de rodapé repetido. Vira página própria:
1. Formulário, nome, e-mail, telefone, **assunto (select: Quero patrocinar / Quero ser parceiro / Quero inscrever meu filho / Imprensa / Outro)**, mensagem. O select roteia a intenção e é o que conecta todos os CTAs "Entre em contato" do site.
2. Dados diretos, e-mail, telefone/WhatsApp, endereço, horário
3. Mapa embedado
4. Redes sociais
5. Estados do formulário obrigatórios: validação inline, loading no submit, sucesso e erro desenhados.

---

## 4. Padrões transversais do site de referência

| Padrão | Como está | O que fazer |
|---|---|---|
| CTA "Mude uma história" | repetido idêntico em toda página, sempre com o mesmo texto | manter o conceito (é uma boa linha), variar o CTA conforme o contexto da página |
| Header | sem CTA, dropdown padrão | header sticky, CTA persistente, menu mobile desenhado (não hambúrguer default) |
| Footer | denso, funciona | manter estrutura, redesenhar |
| Logos | colados em tamanhos diferentes | container de altura fixa, grayscale → cor no hover |
| Fotos | fotos reais do projeto (bom!) | manter e valorizar, é a maior força de conteúdo; tratar com ratio consistente e lazy loading |
| Listas de cidades | texto corrido de 30 itens | agrupar por estado, grid ou mapa |
| Números de impacto | inexistentes | criar, pedir os dados ao professor |

---

## 5. O que precisamos do professor (conteúdo)

Bloqueia partes do site, pedir cedo:

1. **Números de impacto**: nº de crianças/jovens atendidos, nº de núcleos, nº de cidades/estados, anos de atuação.
2. **Lista final de projetos** e, para cada: descrição (2–4 parágrafos), público, faixa etária, modalidade, núcleos/cidades, fotos.
3. **Logo em vetor** (SVG/AI) + cores oficiais, se existirem.
4. **Fotos em alta** dos projetos, atletas e equipe.
5. **Missão, visão, valores** finais + texto de história/fundação.
6. **Dados de contato reais** e dados de doação (chave PIX, banco, CNPJ).
7. **Patrocinadores/parceiros** que podem ser exibidos + logos.
8. **Depoimentos** (atleta, família, técnico), opcional mas alto impacto.
9. Decisão: haverá **cotas de patrocínio** publicadas ou só "entre em contato"?

---

## 6. Direção técnica e de design (proposta)

**Stack sugerida:** Next.js (App Router) + Tailwind v4 + TypeScript. Conteúdo estático em arquivos de dados (`projetos.ts`, `nucleos.ts`), sem CMS por enquanto; adicionar CMS só se o professor precisar editar sozinho.

**Design system mínimo antes de qualquer tela** (`globals.css` com `@theme` + `DESIGN_SYSTEM.md`):
- Tokens semânticos: `brand`, `background`, `surface`, `text-primary/secondary/muted`, `border`, `success/warning/danger`
- Escala tipográfica (display / h1 / h2 / body / caption), fonte importada com intenção
- Escala de espaçamento base 4, raio padrão + derivações, 3 níveis de elevação
- Motion: duração e curva únicas (ex. 200ms ease-out), respeitando `prefers-reduced-motion`
- Pack único de ícones (Phosphor ou Tabler, já disponíveis localmente)

**Identidade: 3 direções para escolher com o professor:**
- **A · Esportivo contemporâneo**, cor de marca saturada, tipografia condensada de peso alto nos títulos, fotos em alto contraste, cantos médios. Energia e movimento.
- **B · Institucional caloroso**, paleta terrosa/quente, tipografia com serifa nos títulos, muito respiro, fotos grandes e humanas. Transmite confiança e afeto, boa para captação com empresa.
- **C · Editorial/documental**, quase monocromático com um acento forte, tipografia grande, grid assimétrico, foto como protagonista. Mais autoral e moderno, maior risco.

**Não negociável:** estados de loading/empty/error em formulário e listas, foco visível por teclado, contraste AA, responsivo mobile-first, alt text nas fotos.

---

## 7. Sitemap final proposto

```
/                     Home
/sobre                Sobre o instituto
/projetos             Índice de projetos
/projetos/[slug]      Página de projeto (template único)
/juntos-pelo-esporte  Índice da seção B2B
  /incentivo          Lei de Incentivo ao Esporte
  /parcerias          Parcerias
  /patrocinios        Patrocínios + cotas
/contribua            Doação (PIX, transferência, recorrente)
/contato              Formulário + dados + mapa
```

Fora do escopo: notícias, ouvidoria, aplicativo, transparência completa.
(Transparência pode virar, se necessário, uma página única simples com links de documentos, decidir depois.)

---

## 8. Ordem de execução sugerida

1. Definir identidade visual (escolher direção A/B/C) e montar o design system
2. Layout base: header + footer + tokens
3. Home
4. Template de projeto + índice
5. Sobre
6. Juntos pelo Esporte (3 páginas)
7. Contribua
8. Contato (+ backend do formulário)
9. Passe de acessibilidade, responsivo e performance
10. Deploy

---

### Pendências da análise
Páginas `/cultivar-esportes/` e `/mais-acao-cidadao/` não foram detalhadas (existem no menu, dados de público/idade/núcleos não coletados). Confirmar com o professor se entram no escopo.
