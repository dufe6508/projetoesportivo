import type { Metadata } from "next";
import { CabecalhoPagina } from "@/components/CabecalhoPagina";
import { Formulario } from "@/components/Formulario";
import { Reveal } from "@/components/Motion";
import { contato, locais } from "@/lib/dados";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o Projeto Esportivo Cláudio Brandão sobre inscrição, patrocínio, parceria ou voluntariado.",
};

export default function Contato() {
  return (
    <>
      <CabecalhoPagina
        sobretitulo="Contato"
        titulo="Fale com a gente"
        texto="Inscrição, patrocínio, parceria ou voluntariado. Escolha o assunto e a mensagem chega em quem cuida dele."
      />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1320px] px-5 md:px-10">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.62fr] lg:gap-20">
            <Reveal>
              <Formulario />
            </Reveal>

            <Reveal>
              <div className="flex flex-col gap-10">
                {/* dois endereços: a quadra da escola e o ginásio. Vinham da
                    lista de locais para não haver dois registros do mesmo
                    endereço no site. Nome em corpo menor que antes: em
                    "Escola Estadual Professor Cláudio Brandão" o 1.0625rem
                    quebrava o nome em três linhas na coluna estreita. */}
                <div className="u-courtrule pt-7 text-navy-800">
                  <h2 className="u-eyebrow whitespace-nowrap text-ink-400">Onde treinamos</h2>
                  <div className="mt-4 flex flex-col gap-5">
                    {locais.map((l) => (
                      <address key={l.nome} className="not-italic">
                        <p className="u-titulo text-[0.9375rem] leading-snug text-navy-800">
                          {l.nome}
                        </p>
                        <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-500">
                          {l.endereco}
                          <br />
                          {l.bairro}
                          {l.cep && (
                            <>
                              <br />
                              {l.cep}
                            </>
                          )}
                        </p>
                      </address>
                    ))}
                  </div>
                </div>

                <div className="u-courtrule pt-7 text-navy-800">
                  <h2 className="u-eyebrow text-ink-400">Instagram</h2>
                  <a
                    href={contato.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-3 inline-flex min-h-[44px] items-center gap-2 text-[1.0625rem] text-navy-800"
                  >
                    <span className="border-b border-navy-800/25 transition-colors duration-150 group-hover:border-navy-800">
                      {contato.instagramHandle}
                    </span>
                  </a>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-500">
                    É onde o dia a dia das equipes é publicado, com escalações e resultados.
                  </p>
                </div>

                <div className="u-courtrule pt-7 text-navy-800">
                  <h2 className="u-eyebrow text-ink-400">E-mail</h2>
                  <a
                    href={`mailto:${contato.email}`}
                    className="group mt-3 inline-flex min-h-[44px] items-center gap-2 text-[1.0625rem] text-navy-800"
                  >
                    <span className="border-b border-navy-800/25 transition-colors duration-150 group-hover:border-navy-800">
                      {contato.email}
                    </span>
                  </a>
                </div>

                <div className="u-courtrule pt-7 text-navy-800">
                  <h2 className="u-eyebrow text-ink-400">Dados da associação</h2>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-500">
                    {contato.razaoSocial}
                    <br />
                    <span className="text-navy-800">CNPJ {contato.cnpj}</span>
                  </p>
                </div>

                <div className="overflow-hidden rounded-[22px] border border-ink-200">
                  {/* endereço exato, não mais a região */}
                  <iframe
                    title="Mapa da Av. Senador Levindo Coelho, 250, Vale do Jatobá, Belo Horizonte"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(contato.mapa)}&z=17&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-[300px] w-full border-0"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
