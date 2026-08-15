import Link from "next/link";
import Image from "next/image";
import { Icone } from "./Icone";
import { contato, navegacao, modalidades } from "@/lib/dados";

/**
 * Rodapé.
 *
 * Antes eram quatro colunas que, empilhadas no celular, viravam quase uma
 * tela inteira de links repetidos. As modalidades saíram daqui: já estão no
 * menu e na página de índice, e listá-las de novo só alongava o bloco. Sobrou
 * o que o rodapé precisa de fato ter: identidade, navegação, endereço,
 * contato e os dados institucionais.
 */
export function Footer() {
  return (
    <footer className="on-navy bg-navy-950 text-white/60">
      <div className="mx-auto max-w-[1320px] px-5 pb-6 pt-10 md:px-10 md:pb-8 md:pt-14">
        {/* No monitor vira grade de três: marca, navegação e modalidades. Em
            linha única, a faixa de 1320px deixava dois terços vazios. No
            celular nada muda, continua empilhado. */}
        <div className="flex flex-col gap-8 md:grid md:grid-cols-[1.4fr_0.8fr_1fr] md:items-start md:gap-12">
          <div className="max-w-[30ch]">
            <Link href="/" className="inline-flex min-h-[44px] items-center gap-2.5">
              <Image
                src="/escudo.png"
                alt="Projeto Esportivo Cláudio Brandão"
                width={56}
                height={56}
                className="h-9 w-9"
              />
              <span className="leading-[1.2]">
                <span className="block text-[0.875rem] font-extrabold tracking-[-0.01em] text-white">
                  Cláudio Brandão
                </span>
                <span className="block text-[0.5625rem] font-semibold uppercase tracking-[0.18em] text-white/40">
                  Projeto Esportivo
                </span>
              </span>
            </Link>
            <address className="mt-4 text-[0.8125rem] not-italic leading-relaxed">
              {contato.endereco} · {contato.bairro}
            </address>
            <a
              href={contato.instagram}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex min-h-[40px] items-center gap-2 text-[0.8125rem]
                         text-white/80 transition-colors duration-150 hover:text-white"
            >
              <Icone nome="InstagramLogo" className="h-4 w-4" />
              {contato.instagramHandle}
            </a>
          </div>

          {/* linha única no celular, com quebra: mais curto que uma coluna */}
          <nav aria-label="Rodapé">
            <h2 className="hidden text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-white/35 md:block">
              Navegar
            </h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 md:mt-3 md:flex-col md:gap-1">
              {navegacao.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="inline-flex min-h-[44px] items-center text-[0.8125rem]
                               transition-colors duration-150 hover:text-white md:min-h-[32px]"
                  >
                    {i.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* só no monitor: no celular esta lista já existe no menu e
              alongava o rodapé sem acrescentar caminho novo */}
          <nav aria-label="Rodapé, modalidades" className="hidden md:block">
            <h2 className="text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-white/35">
              Modalidades
            </h2>
            <ul className="mt-3 flex flex-col gap-1">
              {modalidades.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/modalidades/${m.slug}`}
                    className="inline-flex min-h-[32px] items-center text-[0.8125rem]
                               transition-colors duration-150 hover:text-white"
                  >
                    {m.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div
          className="mt-7 flex flex-col gap-1.5 border-t border-white/10 pt-4 text-[0.6875rem]
                     text-white/35 md:flex-row md:items-center md:justify-between"
        >
          {/* CNPJ visível: numa associação nova, isso é sinal de seriedade */}
          <p>
            {contato.razaoSocial} <span className="mx-1 opacity-45">·</span> CNPJ {contato.cnpj}
          </p>
          <p>{new Date().getFullYear()} Projeto Esportivo Cláudio Brandão</p>
        </div>
      </div>
    </footer>
  );
}
