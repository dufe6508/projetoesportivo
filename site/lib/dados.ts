/**
 * Conteúdo do site em um só lugar.
 * Trocar texto e foto aqui, sem tocar em componente.
 *
 * As fotos vivem em /public/fotos, nomeadas por assunto. O pipeline que as
 * gerou está em _fotos.mjs: lê o acervo bruto, descarta duplicata e grava WebP.
 */

/** Um registro fotográfico com o mínimo para ser exibido e descrito. */
export type Foto = {
  src: string;
  alt: string;
  /** object-position, evita que o recorte corte cabeças */
  posicao?: string;
  /** recorte no celular: contêiner vira retrato e o corte muda de eixo */
  posicaoMobile?: string;
  /** arquivo 3:4 alternativo, servido abaixo de 768px por <picture> */
  movel?: string;
  /** só quando acrescenta contexto que a foto não dá sozinha */
  legenda?: string;
};

export type Pessoa = {
  nome: string;
  /** número da camisa; "CT" identifica comissão técnica */
  numero: string;
  foto: string;
  /** cargo, usado nos cards de comissão técnica */
  funcao?: string;
};

export type Modalidade = {
  slug: string;
  nome: string;
  naipe: string;
  esporte: "Futsal" | "Voleibol";
  resumo: string;
  descricao: string[];
  /** foto do elenco completo; abre a página. null = ainda não fotografado */
  elenco: Foto | null;
  /** foto 4:3 usada nos cards de navegação */
  capa: Foto | null;
  atletas: Pessoa[];
  comissao: Pessoa[];
  /** imagem que abre a página logo abaixo do header, antes de qualquer texto */
  destaque?: Foto;
  /** legenda curta do destaque; é o único texto sobre foto que sobrou */
  destaqueTitulo?: string;
  /** registros de competição, treino e bastidor daquela equipe */
  registros: Foto[];
  /**
   * Equipe fora de atividade no momento. Continua descrita aqui, com elenco e
   * fotos, mas sai da navegação, das grades e do mapa do site. Voltar ao ar é
   * apagar esta linha, não reconstruir o registro.
   */
  suspensa?: boolean;
};

export const modalidades: Modalidade[] = [
  {
    slug: "volei-feminino",
    nome: "Vôlei Feminino",
    naipe: "Feminino",
    esporte: "Voleibol",
    resumo: "Do primeiro toque ao jogo de seis.",
    descricao: [
      "A maior frente do projeto em número de atletas, com elenco dividido por categoria e comissão técnica própria.",
      "Saque, passe, levantamento e ataque na ordem, sem pular etapa. A entrada passa por seleção.",
    ],
    elenco: {
      src: "/fotos/elenco-volei-feminino.webp",
      movel: "/fotos/elenco-volei-feminino-movel.webp",
      alt: "Elenco completo do vôlei feminino e a comissão técnica diante da rede, no ginásio do Vale do Jatobá",
      posicao: "50% 58%",
      posicaoMobile: "50% 50%",
    },
    capa: {
      src: "/fotos/elenco-volei-feminino.webp",
      alt: "",
      posicao: "50% 60%",
    },
    atletas: [],
    comissao: [
      {
        nome: "Pedro Marques",
        numero: "CT",
        funcao: "Comissão técnica",
        foto: "/fotos/comissao-tecnica-pedro-marques.webp",
      },
      {
        nome: "Raissa Lima",
        numero: "CT",
        funcao: "Comissão técnica",
        foto: "/fotos/comissao-tecnica-raissa-lima.webp",
      },
      {
        nome: "Gabriela Ferreira",
        numero: "CT",
        funcao: "Comissão técnica",
        foto: "/fotos/comissao-tecnica-gabriela-ferreira.webp",
      },
      {
        nome: "Richard Violi",
        numero: "CT",
        funcao: "Comissão técnica",
        foto: "/fotos/comissao-tecnica-richard-violi.webp",
      },
    ],
    destaque: {
      src: "/fotos/competicao-jebh-atletas-bandeira.webp",
      alt: "Atletas com a bandeira da escola diante do painel dos Jogos Escolares de Belo Horizonte",
      posicao: "50% 32%",
      posicaoMobile: "50% 30%",
    },
    destaqueTitulo: "Nos Jogos Escolares de Belo Horizonte",
    registros: [
      {
        src: "/fotos/competicao-volei-premiacao.webp",
        alt: "Duas atletas do vôlei feminino com troféu e medalhas depois da partida",
        // origem em retrato dentro de recorte largo: o eixo Y é o que decide
        // se os rostos entram, e eles estão no primeiro quinto da foto
        posicao: "50% 20%",
      },
      {
        src: "/fotos/treinamento-volei-dupla.webp",
        alt: "Duas atletas conversando durante o treino de vôlei",
        posicao: "50% 34%",
      },
      {
        src: "/fotos/treinamento-volei-ginasio.webp",
        alt: "Ginásio poliesportivo durante o treino de vôlei feminino",
        posicao: "50% 50%",
      },
    ],
  },
  {
    slug: "futsal-feminino",
    nome: "Futsal Feminino",
    naipe: "Feminino",
    esporte: "Futsal",
    resumo: "Fundamento, coletivo e leitura de jogo.",
    descricao: [
      "Treina em quadra coberta, com material próprio e comissão técnica acompanhando de perto.",
      "A entrada passa por seleção. Quem não fica em uma temporada continua treinando e tenta na próxima.",
    ],
    elenco: {
      src: "/fotos/elenco-futsal-feminino.webp",
      movel: "/fotos/elenco-futsal-feminino-movel.webp",
      alt: "Elenco completo do futsal feminino na quadra externa da escola",
      posicao: "50% 50%",
      posicaoMobile: "50% 62%",
    },
    capa: {
      src: "/fotos/elenco-futsal-feminino.webp",
      alt: "",
      posicao: "50% 55%",
    },
    atletas: [],
    comissao: [
      {
        nome: "Daiane Keren",
        numero: "CT",
        funcao: "Comissão técnica",
        foto: "/fotos/comissao-tecnica-daiane-keren.webp",
      },
      {
        nome: "Isaque Moura",
        numero: "CT",
        funcao: "Comissão técnica",
        foto: "/fotos/comissao-tecnica-isaque-moura.webp",
      },
      {
        nome: "Yasmin Oliveira",
        numero: "CT",
        funcao: "Comissão técnica",
        foto: "/fotos/comissao-tecnica-yasmin-oliveira.webp",
      },
    ],
    destaque: {
      src: "/fotos/competicao-futsal-feminino-campeas-jebh.webp",
      alt: "Equipe de futsal feminino campeã dos Jogos Escolares de Belo Horizonte de 2026",
      posicao: "50% 42%",
      posicaoMobile: "50% 40%",
    },
    destaqueTitulo: "Campeãs do JEBH 2026",
    registros: [
      {
        src: "/fotos/futsal-feminino-equipe-ginasio.webp",
        alt: "Equipe de futsal feminino reunida em quadra de ginásio antes da partida",
        posicao: "50% 38%",
      },
      {
        src: "/fotos/competicao-jebh-bandeira-escola.webp",
        alt: "Atletas e professor com a bandeira da escola na arena dos Jogos Escolares",
        posicao: "50% 28%",
      },
    ],
  },
  {
    slug: "futsal-masculino",
    nome: "Futsal Masculino",
    naipe: "Masculino",
    esporte: "Futsal",
    resumo: "Posicionamento e disciplina ao longo da temporada.",
    descricao: [
      "Fundamento individual e organização coletiva, com treino fixo durante o ano letivo inteiro.",
      "A frequência conta tanto quanto o desempenho. É o combinado que sustenta o grupo.",
    ],
    elenco: {
      src: "/fotos/elenco-futsal-masculino.webp",
      movel: "/fotos/elenco-futsal-masculino-movel.webp",
      alt: "Elenco completo do futsal masculino diante de parede azul, com uniforme preto e dourado",
      posicao: "50% 74%",
      posicaoMobile: "50% 78%",
    },
    capa: {
      src: "/fotos/elenco-futsal-masculino.webp",
      alt: "",
      posicao: "50% 78%",
    },
    atletas: [],
    comissao: [],
    registros: [],
    suspensa: true,
  },
  {
    slug: "volei-masculino",
    nome: "Vôlei Masculino",
    naipe: "Masculino",
    esporte: "Voleibol",
    resumo: "Fundamento, sistema de jogo e festivais.",
    descricao: [
      "Fundamento e sistema de jogo, com participação nos festivais organizados pelo próprio projeto.",
      "As fotos desta equipe ainda estão sendo produzidas.",
    ],
    elenco: null,
    capa: null,
    atletas: [],
    comissao: [],
    registros: [],
    suspensa: true,
  },
];

/**
 * As equipes que o site apresenta hoje. Toda grade, menu e rota de modalidade
 * lê desta lista; `modalidades` continua sendo o registro completo, usado por
 * quem precisa também das suspensas.
 */
export const modalidadesAtivas = modalidades.filter((m) => !m.suspensa);

/* ------------------------------------------------------------------
   Elencos.
   Ficam fora do objeto de modalidade só para o arquivo continuar legível:
   são listas longas e mudam a cada temporada.
   ------------------------------------------------------------------ */

/**
 * Elencos, na ordem em que as equipes foram apresentadas no Instagram.
 *
 * Não é ordem de número de camisa: é a sequência dos cards publicados no
 * perfil, lida como a grade é lida, da apresentação da equipe até a comissão
 * técnica. Quem ainda não fez a foto tem card de silhueta e número "00", que
 * o site trata como "sem número definido" em vez de imprimir dois zeros.
 */
const futsalFeminino: Pessoa[] = [
  { nome: "Anna Gonçalves", numero: "12", foto: "/fotos/futsal-feminino-atleta-anna-goncalves.webp" },
  { nome: "Isabelle Siqueira", numero: "7", foto: "/fotos/futsal-feminino-atleta-isabelle-siqueira.webp" },
  { nome: "Alice Catalanio", numero: "8", foto: "/fotos/futsal-feminino-atleta-alice-catalanio.webp" },
  { nome: "Fernanda Campos", numero: "9", foto: "/fotos/futsal-feminino-atleta-fernanda-campos.webp" },
  { nome: "Samara Schuina", numero: "15", foto: "/fotos/futsal-feminino-atleta-samara-schuina.webp" },
  { nome: "Tainá Carvalho", numero: "5", foto: "/fotos/futsal-feminino-atleta-taina-carvalho.webp" },
  { nome: "Laryssa Sousa", numero: "8", foto: "/fotos/futsal-feminino-atleta-laryssa-sousa.webp" },
  { nome: "Thaís Ferreira", numero: "20", foto: "/fotos/futsal-feminino-atleta-thais-ferreira.webp" },
  { nome: "Gabriela Silva", numero: "18", foto: "/fotos/futsal-feminino-atleta-gabriela-silva.webp" },
  { nome: "Raiane Fernandes", numero: "3", foto: "/fotos/futsal-feminino-atleta-raiane-fernandes.webp" },
  { nome: "Emanuelle Silva", numero: "11", foto: "/fotos/futsal-feminino-atleta-emanuelle-silva.webp" },
  { nome: "Ana Cassiano", numero: "1", foto: "/fotos/futsal-feminino-atleta-ana-cassiano.webp" },
  { nome: "Marcely Mello", numero: "00", foto: "/fotos/futsal-feminino-atleta-marcely-mello.webp" },
  { nome: "Mariany Mello", numero: "00", foto: "/fotos/futsal-feminino-atleta-mariany-mello.webp" },
  { nome: "Ester Gonçalves", numero: "61", foto: "/fotos/futsal-feminino-atleta-ester-goncalves.webp" },
  { nome: "Vitória Gonçalves", numero: "00", foto: "/fotos/futsal-feminino-atleta-vitoria-goncalves.webp" },
  { nome: "Laura Suriani", numero: "00", foto: "/fotos/futsal-feminino-atleta-laura-suriani.webp" },
  { nome: "Ana Beatriz", numero: "00", foto: "/fotos/futsal-feminino-atleta-ana-beatriz.webp" },
  { nome: "Nicolly Santos", numero: "00", foto: "/fotos/futsal-feminino-atleta-nicolly-santos.webp" },
];

const voleiFeminino: Pessoa[] = [
  { nome: "Giovanna Monteiro", numero: "12", foto: "/fotos/volei-feminino-atleta-giovanna-monteiro.webp" },
  { nome: "Sibele Santos", numero: "26", foto: "/fotos/volei-feminino-atleta-sibele-santos.webp" },
  { nome: "Ana Cassiano", numero: "10", foto: "/fotos/volei-feminino-atleta-ana-cassiano.webp" },
  { nome: "Letícia Campêlo", numero: "11", foto: "/fotos/volei-feminino-atleta-leticia-campelo.webp" },
  { nome: "Gabriela Victória", numero: "14", foto: "/fotos/volei-feminino-atleta-gabriela-victoria.webp" },
  { nome: "Eduarda Carvalho", numero: "9", foto: "/fotos/volei-feminino-atleta-eduarda-carvalho.webp" },
  { nome: "Laura Carvalho", numero: "23", foto: "/fotos/volei-feminino-atleta-laura-carvalho.webp" },
  { nome: "Julia Vilela", numero: "6", foto: "/fotos/volei-feminino-atleta-julia-vilela.webp" },
  { nome: "Yasmin Batista", numero: "17", foto: "/fotos/volei-feminino-atleta-yasmin-batista.webp" },
  { nome: "Lara Karolyne", numero: "20", foto: "/fotos/volei-feminino-atleta-lara-karolyne.webp" },
  { nome: "Isabella Borges", numero: "15", foto: "/fotos/volei-feminino-atleta-isabella-borges.webp" },
  { nome: "Mirella Melo", numero: "22", foto: "/fotos/volei-feminino-atleta-mirella-melo.webp" },
  { nome: "Flávia Silva", numero: "27", foto: "/fotos/volei-feminino-atleta-flavia-silva.webp" },
  { nome: "Maria Eduarda", numero: "4", foto: "/fotos/volei-feminino-atleta-maria-eduarda.webp" },
  { nome: "Sophia Gomes", numero: "25", foto: "/fotos/volei-feminino-atleta-sophia-gomes.webp" },
  { nome: "Kelly Silva", numero: "19", foto: "/fotos/volei-feminino-atleta-kelly-silva.webp" },
  { nome: "Marcelle Aguilar", numero: "1", foto: "/fotos/volei-feminino-atleta-marcelle-aguilar.webp" },
  { nome: "Alana Silva", numero: "16", foto: "/fotos/volei-feminino-atleta-alana-silva.webp" },
  { nome: "Maria Souza", numero: "13", foto: "/fotos/volei-feminino-atleta-maria-souza.webp" },
  { nome: "Vitória Caitano", numero: "21", foto: "/fotos/volei-feminino-atleta-vitoria-caitano.webp" },
  { nome: "Bruna Gomes", numero: "22", foto: "/fotos/volei-feminino-atleta-bruna-gomes.webp" },
  { nome: "Yasmim Santos", numero: "16", foto: "/fotos/volei-feminino-atleta-yasmim-santos.webp" },
  { nome: "Iza Alves", numero: "8", foto: "/fotos/volei-feminino-atleta-iza-alves.webp" },
  { nome: "Maria Clara", numero: "28", foto: "/fotos/volei-feminino-atleta-maria-clara.webp" },
  { nome: "Nathaly Izidório", numero: "18", foto: "/fotos/volei-feminino-atleta-nathaly-izidorio.webp" },
  { nome: "Gabriele Ferreira", numero: "43", foto: "/fotos/volei-feminino-atleta-gabriele-ferreira.webp" },
  { nome: "Nicolle Souza", numero: "3", foto: "/fotos/volei-feminino-atleta-nicolle-souza.webp" },
  { nome: "Ana Prates", numero: "00", foto: "/fotos/volei-feminino-atleta-ana-prates.webp" },
  { nome: "Maria Sophia", numero: "00", foto: "/fotos/volei-feminino-atleta-maria-sophia.webp" },
  { nome: "Lara Souza", numero: "00", foto: "/fotos/volei-feminino-atleta-lara-souza.webp" },
];

modalidades.find((m) => m.slug === "futsal-feminino")!.atletas = futsalFeminino;
modalidades.find((m) => m.slug === "volei-feminino")!.atletas = voleiFeminino;

/* ------------------------------------------------------------------
   Locais de treinamento.
   `foto: null` renderiza o bloco-marca do design system em vez de um vazio.
   Para acrescentar um espaço novo, basta um item a mais nesta lista.
   ------------------------------------------------------------------ */

export type Local = {
  nome: string;
  endereco: string;
  bairro: string;
  modalidades: string[];
  descricao: string;
  foto: Foto | null;
};

export const locais: Local[] = [
  {
    nome: "Poliesportivo Vale do Jatobá",
    endereco: "Vale do Jatobá",
    bairro: "Belo Horizonte, MG",
    modalidades: ["Vôlei Feminino"],
    descricao: "Ginásio coberto, quadra oficial e arquibancada.",
    foto: {
      src: "/fotos/local-poliesportivo-vale-do-jatoba.webp",
      alt: "Interior do ginásio poliesportivo do Vale do Jatobá",
      posicao: "50% 52%",
    },
  },
  {
    nome: "Escola Estadual Professor Cláudio Brandão",
    endereco: "Av. Senador Levindo Coelho, 250",
    bairro: "Vale do Jatobá, Belo Horizonte, MG",
    modalidades: ["Futsal Feminino"],
    descricao: "A quadra da escola, onde o projeto começou.",
    foto: {
      src: "/fotos/local-escola-claudio-brandao.webp",
      alt: "Quadra coberta da Escola Estadual Professor Cláudio Brandão, com o nome da escola grafitado na parede do fundo",
      posicao: "50% 46%",
    },
  },
];

/** Princípios. Ícones do pack Phosphor, ver components/Icone.tsx */
export const principios = [
  {
    icone: "Alarm",
    titulo: "Disciplina",
    texto: "O treino começa na hora marcada, chova ou faça sol.",
  },
  {
    icone: "Handshake",
    titulo: "Respeito",
    texto: "Quem não respeita fora da quadra não joga dentro dela.",
  },
  {
    icone: "SneakerMove",
    titulo: "Superação",
    texto: "A comparação é com o próprio ontem, não com o colega.",
  },
  {
    icone: "GraduationCap",
    titulo: "Escola primeiro",
    texto: "Quadra não substitui sala de aula.",
  },
  {
    icone: "UsersThree",
    titulo: "Coletivo",
    texto: "O grupo puxa quem está atrás e segura quem quer atropelar.",
  },
  {
    icone: "SealCheck",
    titulo: "Gratuidade",
    texto: "Sem mensalidade, taxa ou cobrança de uniforme.",
  },
];

/**
 * Galeria geral: só o que não encontrou lugar melhor dentro de uma seção.
 * Antes de acrescentar uma foto aqui, vale perguntar se ela não conta mais
 * em alguma página de modalidade.
 */
export const galeria: Foto[] = [
  {
    src: "/fotos/competicao-futsal-feminino-campeas-jebh.webp",
    alt: "Equipe de futsal feminino campeã dos Jogos Escolares de Belo Horizonte de 2026",
    posicao: "50% 45%",
  },
  {
    src: "/fotos/competicao-volei-premiacao.webp",
    alt: "Atletas do vôlei feminino com troféu e medalhas depois da partida",
    posicao: "50% 20%",
  },
  {
    src: "/fotos/treinamento-volei-ginasio.webp",
    alt: "Ginásio poliesportivo durante o treino de vôlei feminino",
    posicao: "50% 52%",
  },
  {
    src: "/fotos/competicao-jebh-atletas-bandeira.webp",
    alt: "Atletas com a bandeira da escola diante do painel dos Jogos Escolares de Belo Horizonte",
    posicao: "50% 32%",
  },
];

/* ------------------------------------------------------------------
   Títulos.

   Uma competição é uma marca de terceiro: entra pelo escudo oficial, nunca
   redesenhada. Cada uma tem PNG (a versão em cor, que a interface usa) e SVG
   (o traço, para impresso e para quem pedir o arquivo aberto).

   O escudo é decorativo aqui: quem lê por leitor de tela recebe a linha de
   texto completa do card, não o nome da competição duas vezes.
   ------------------------------------------------------------------ */

export type Competicao = {
  sigla: string;
  nome: string;
  ambito: string;
  logo: string;
  vetor: string;
  /**
   * Fundo que o escudo exige. O do JEBH é branco sobre transparente e some
   * em ladrilho claro; os demais são coloridos sobre transparente e somem em
   * ladrilho escuro. É informação da marca, não preferência de layout.
   */
  fundo: "claro" | "escuro";
};

export const competicoes = {
  jime: {
    sigla: "JIME",
    nome: "Jogos Intercolegiais Metropolitanos",
    ambito: "Região metropolitana de Belo Horizonte",
    logo: "/competicoes/jime.png",
    vetor: "/competicoes/jime.svg",
    fundo: "claro",
  },
  jebh: {
    sigla: "JEBH",
    nome: "Jogos Escolares de Belo Horizonte",
    ambito: "Municipal",
    logo: "/competicoes/jebh.png",
    vetor: "/competicoes/jebh.svg",
    fundo: "escuro",
  },
  jemg: {
    sigla: "JEMG",
    nome: "Jogos Escolares de Minas Gerais",
    ambito: "Estadual",
    logo: "/competicoes/jemg.png",
    vetor: "/competicoes/jemg.svg",
    fundo: "claro",
  },
} satisfies Record<string, Competicao>;

export type Titulo = {
  /** equipe que conquistou, na mesma grafia das modalidades */
  equipe: string;
  /** rota da modalidade, para o card levar a algum lugar */
  slug: string;
  competicao: keyof typeof competicoes;
  /** o resultado em uma expressão: "Tricampeãs", "7º lugar" */
  conquista: string;
  /** anos em que veio; vazio quando a data ainda não foi confirmada */
  anos: string[];
  /** conquista de título, o que distingue um campeonato de uma colocação */
  campeao: boolean;
};

/** Vôlei primeiro, como em toda listagem do site. */
export const titulos: Titulo[] = [
  {
    equipe: "Vôlei Feminino",
    slug: "volei-feminino",
    competicao: "jime",
    conquista: "Bicampeãs",
    anos: ["2023", "2025"],
    campeao: true,
  },
  {
    equipe: "Futsal Feminino",
    slug: "futsal-feminino",
    competicao: "jime",
    conquista: "Tricampeãs",
    anos: ["2023", "2024", "2025"],
    campeao: true,
  },
  {
    equipe: "Futsal Feminino",
    slug: "futsal-feminino",
    competicao: "jebh",
    conquista: "Campeãs",
    anos: ["2026"],
    campeao: true,
  },
  {
    equipe: "Futsal Feminino",
    slug: "futsal-feminino",
    competicao: "jemg",
    conquista: "7º lugar",
    anos: [],
    campeao: false,
  },
];

/** Equipes na ordem do site, cada uma com os títulos que já tem. */
export const titulosPorEquipe = modalidadesAtivas
  .map((m) => ({ modalidade: m, lista: titulos.filter((t) => t.slug === m.slug) }))
  .filter((g) => g.lista.length > 0);

export const contato = {
  endereco: "Av. Senador Levindo Coelho, 250",
  bairro: "Vale do Jatobá, Belo Horizonte, MG",
  cep: "CEP 30662-290",
  local: "Escola Estadual Professor Cláudio Brandão",
  /** consulta usada no mapa, endereço exato */
  mapa: "Av. Senador Levindo Coelho, 250 - Vale do Jatobá, Belo Horizonte - MG, 30662-290",
  instagram: "https://www.instagram.com/claudiobrandaoprojetoesportivo/",
  instagramHandle: "@claudiobrandaoprojetoesportivo",
  razaoSocial: "Associação Esportiva Escola da Bola",
  cnpj: "68.369.689/0001-60",
};

/* ------------------------------------------------------------------
   Como o apoio chega.

   O payload PIX é o BR Code da associação, copiado do aplicativo do banco.
   Não é montado em código: qualquer caractere fora do lugar quebra o CRC no
   fim da linha e o pagamento é recusado na leitura. O QR correspondente vive
   em /pix-qr.svg, gerado desta mesma string por site/_extras.mjs.
   ------------------------------------------------------------------ */

export const pix = {
  chave: contato.cnpj,
  tipoChave: "CNPJ",
  favorecido: "ASSOCIACAO ESPORTIVA ESCOLA DA BOLA",
  cidade: "Belo Horizonte, MG",
  qr: "/pix-qr.svg",
  /** BR Code, valor em aberto: quem paga escolhe quanto */
  payload:
    "00020126360014br.gov.bcb.pix0114683696890001605204000053039865802BR5925ASSOCIACAO ESPORTIVA ESCO6014BELO HORIZONTE6226052261lmzvo2Ei7GGf7iefYJKv63046885",
};

export const conta = {
  banco: "Cora SCD",
  codigoBanco: "403",
  titular: contato.razaoSocial,
  agencia: "0001",
  conta: "7567099-4",
  cnpj: contato.cnpj,
};

/* ------------------------------------------------------------------
   Transparência.
   A associação é nova e ainda não fechou exercício. O que existe entra aqui
   com data; o que não existe aparece como pendência declarada, nunca como
   número inventado ou linha vazia.
   ------------------------------------------------------------------ */

export type MembroDiretoria = {
  nome: string;
  cargo: string;
  /** o que a pessoa responde na prática, em uma linha */
  atribuicao?: string;
  /** retrato 3:4; sem foto o card usa o bloco-marca */
  foto?: string;
};

/**
 * Diretoria eleita da associação.
 * Lista vazia rende o estado de espera desenhado em /transparencia/diretoria.
 */
export const diretoria: MembroDiretoria[] = [];

/** Vigência do mandato desta diretoria. */
export const mandatoDiretoria = "Gestão 2026 a 2028";

export const institucional = {
  natureza: "Associação civil sem fins lucrativos",
  fundacao: "Julho de 2026",
  /** primeiro exercício ainda em curso; nada de balanço antes da hora */
  exercicio: "2026",
};

export type Documento = {
  nome: string;
  descricao: string;
  /** caminho em /public quando o arquivo já pode ser publicado */
  arquivo?: string;
};

export const documentos: Documento[] = [
  {
    nome: "Estatuto social",
    descricao: "Finalidade, estrutura de governança e regras de funcionamento da associação.",
  },
  {
    nome: "Ata de fundação",
    descricao: "Assembleia que criou a associação e elegeu a primeira diretoria.",
  },
  {
    nome: "Cartão CNPJ",
    descricao: "Inscrição na Receita Federal, com natureza jurídica e atividade registrada.",
  },
  {
    nome: "Prestação de contas",
    descricao: "Entradas, saídas e destino dos recursos do exercício, publicada ao fim de cada ano.",
  },
];

/**
 * Para onde vai o apoio recebido.
 * Lido pela página de apoio e pela de transparência: a mesma promessa não
 * pode existir em duas versões que divergem com o tempo.
 */
export const destinoRecursos = [
  { item: "Material esportivo", nota: "Bolas, redes, cones e reposição de desgaste" },
  { item: "Uniforme", nota: "Jogo e treino, para as equipes em atividade" },
  { item: "Transporte", nota: "Deslocamento das equipes para festivais e amistosos" },
  { item: "Estrutura de treino", nota: "Manutenção do que é usado toda semana" },
];

export const navegacao = [
  { href: "/", rotulo: "Home" },
  { href: "/sobre", rotulo: "O projeto" },
  { href: "/modalidades", rotulo: "Modalidades", submenu: true },
  { href: "/titulos", rotulo: "Títulos" },
  {
    href: "/transparencia",
    rotulo: "Transparência",
    filhos: [{ href: "/transparencia/diretoria", rotulo: "Diretoria" }],
  },
  { href: "/apoie", rotulo: "Apoie" },
  { href: "/contato", rotulo: "Contato" },
] as {
  href: string;
  rotulo: string;
  /** abre o painel com as fotos das equipes */
  submenu?: boolean;
  /** submenu simples, de links */
  filhos?: { href: string; rotulo: string }[];
}[];
