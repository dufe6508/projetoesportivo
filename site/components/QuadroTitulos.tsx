import Image from "next/image";
import Link from "next/link";
import { competicoes, titulos, type Competicao, type Titulo } from "@/lib/dados";

/**
 * Quadro de conquistas, uma linha por temporada.
 *
 * O eixo é o ano porque no esporte escolar o ano É a unidade: cada temporada
 * tem um elenco, um calendário e um fim. Um tricampeonato são três temporadas,
 * e 2023 teve título nas duas equipes, coisas que um card por título esconde.
 *
 * A versão anterior dava a cada temporada um bloco com numeral gigante e
 * escudos grandes: no celular virava rolagem sem fim para ler seis linhas de
 * informação. Aqui a temporada é uma linha de tabela, o ano fica numa coluna
 * estreita à esquerda e as conquistas correm ao lado. Mesma informação, um
 * quinto da altura.
 */

type Entrada = {
  equipe: string;
  slug: string;
  competicao: Titulo["competicao"];
  conquista: string;
  campeao: boolean;
};

/** Explode cada título em uma entrada por ano e agrupa por temporada. */
function porTemporada(lista: Titulo[]) {
  const mapa = new Map<string, Entrada[]>();
  for (const t of lista) {
    for (const ano of t.anos) {
      mapa.set(ano, [
        ...(mapa.get(ano) ?? []),
        { equipe: t.equipe, slug: t.slug, competicao: t.competicao, conquista: t.conquista, campeao: t.campeao },
      ]);
    }
  }
  return [...mapa.entries()].sort(([a], [b]) => a.localeCompare(b));
}

/**
 * Campeonato e colocação dividem a mesma linha da temporada, mas não a mesma
 * frase: chamar de "campeãs" um 7º lugar seria mentira, e deixá-lo fora da
 * linha do tempo esconderia a única estadual que a escola já jogou.
 */
const dizer = (e: Entrada) => {
  // `satisfies` preserva o literal de cada competição, e nele `plural` só
  // existe onde foi escrito; a anotação devolve o tipo comum
  const c: Competicao = competicoes[e.competicao];
  return e.campeao
    ? `campeãs ${c.plural ? "dos" : "do"} ${c.sigla}`
    : `${e.conquista} ${c.plural ? "nos" : "no"} ${c.sigla}`;
};

/** Conquistas sem ano confirmado. Não entram na linha do tempo, mas existem. */
const semAno = titulos.filter((t) => t.anos.length === 0);

/**
 * Escudo da competição em ladrilho de proporção fixa.
 *
 * `fill` com `object-contain` em vez de largura automática: são marcas de
 * terceiro com proporções diferentes, e dimensionar por altura fazia a mais
 * quadrada delas estourar a caixa e aparecer cortada.
 */
export function Escudo({
  competicao,
  className = "h-8 w-10",
  descricao,
}: {
  competicao: Titulo["competicao"];
  className?: string;
  /** texto alternativo; sem ele o escudo é tratado como decoração */
  descricao?: string;
}) {
  const c = competicoes[competicao];
  return (
    <span
      className={`relative shrink-0 overflow-hidden rounded-[8px] ring-1 ${className}
                  ${c.fundo === "escuro" ? "bg-navy-900 ring-white/12" : "bg-white ring-black/8"}`}
    >
      <Image
        src={c.logo}
        alt={descricao ?? ""}
        aria-hidden={descricao ? undefined : true}
        fill
        loading="lazy"
        sizes="80px"
        className="object-contain p-0.5"
      />
    </span>
  );
}

/** "no JEBH", "nos Metropolitanos": mesma concordância, sem a conquista junto. */
const dizerLugar = (t: Titulo) => {
  const c: Competicao = competicoes[t.competicao];
  return `${c.plural ? "nos" : "no"} ${c.sigla}`;
};

export function QuadroTitulos({ tom = "escuro" }: { tom?: "claro" | "escuro" }) {
  const temporadas = porTemporada(titulos);
  const escuro = tom === "escuro";

  const regua = escuro ? "border-white/14" : "border-navy-800/14";
  const forte = escuro ? "text-white" : "text-navy-800";
  const apoio = escuro ? "text-white/55" : "text-ink-500";
  const realce = escuro ? "hover:bg-white/[0.06]" : "hover:bg-navy-800/[0.04]";

  const linha = "grid grid-cols-[2.75rem_1fr] gap-4 md:grid-cols-[6rem_1fr] md:gap-8";

  return (
    <div>
      <ol role="list" className={`list-none border-b p-0 ${regua}`}>
        {temporadas.map(([temporada, entradas]) => (
          <li key={temporada} className={`${linha} border-t ${regua} py-3.5 md:py-5`}>
            <p className={`u-display u-tabular text-[1.375rem] leading-none ${forte} md:text-[1.875rem]`}>
              {temporada}
            </p>

            <ul role="list" className="flex list-none flex-col gap-1.5 p-0 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-2.5">
              {entradas.map((e) => (
                <li key={`${e.slug}-${e.competicao}`}>
                  <Link
                    href={`/modalidades/${e.slug}`}
                    className={`group -mx-1.5 flex items-center gap-2.5 rounded-[9px] px-1.5 py-1
                                transition-colors duration-[160ms] ${realce}`}
                  >
                    <Escudo competicao={e.competicao} className="h-7 w-9 md:h-8 md:w-10" />
                    {/* no celular equipe e conquista empilham: lado a lado, as
                        duas frases dividiam 250px e cada uma quebrava no meio */}
                    <span className="flex min-w-0 flex-col md:flex-row md:items-baseline md:gap-2.5">
                      <span className={`text-[0.875rem] font-semibold leading-tight ${forte} md:text-[0.9375rem]`}>
                        {e.equipe}
                      </span>
                      <span className={`text-[0.75rem] leading-tight ${apoio}`}>
                        {dizer(e)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}

        {/* Colocação não é título e não tem ano confirmado, mas some se não for
            dita: é a única vez que uma equipe da escola jogou a estadual. */}
        {semAno.map((t) => (
          <li key={t.competicao} className={`${linha} border-t ${regua} py-3.5 md:py-5`}>
            <p className={`u-tabular whitespace-nowrap text-[0.6875rem] font-bold uppercase ${apoio}`}>
              s/ ano
            </p>
            <span className="flex items-center gap-2.5">
              <Escudo competicao={t.competicao} />
              {/* sigla no lugar do nome por extenso: "no Jogos Escolares" não
                  concorda em gênero */}
              <span className={`text-[0.8125rem] leading-tight ${apoio} md:text-[0.875rem]`}>
                <span className={`font-semibold ${forte}`}>{t.conquista}</span>{" "}
                {dizerLugar(t)}, com o {t.equipe}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
