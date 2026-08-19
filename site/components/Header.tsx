"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icone } from "./Icone";
import { BotaoLink } from "./Botao";
import { navegacao, contato, modalidadesAtivas as modalidades } from "@/lib/dados";

/**
 * Barra de navegação.
 *
 * Botões e ícones seguem o raio do design system. O que virou reto foi a foto
 * de capa embaixo da barra, não os controles.
 *
 * Dois tipos de submenu convivem: Modalidades abre o painel com a foto de
 * cada equipe, e os demais abrem uma lista curta de links. Por isso o estado
 * guarda qual item está aberto, não um booleano.
 */
export function Header() {
  const [rolou, setRolou] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [submenu, setSubmenu] = useState<string | null>(null);
  const gatilho = useRef<HTMLButtonElement>(null);
  const fechaSubmenu = useRef<number | undefined>(undefined);
  const rota = usePathname();

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    setAberto(false);
    setSubmenu(null);
  }, [rota]);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        gatilho.current?.focus();
      }
    };
    document.addEventListener("keydown", aoTeclar);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = "";
    };
  }, [aberto]);

  // atraso ao sair: sem isso o submenu some no caminho do mouse até ele
  const abrirSub = (href: string) => {
    window.clearTimeout(fechaSubmenu.current);
    setSubmenu(href);
  };
  const fecharSub = () => {
    fechaSubmenu.current = window.setTimeout(() => setSubmenu(null), 200);
  };

  const Marca = (
    <Link href="/" className="flex min-h-[44px] items-center gap-3" aria-label="Início">
      <Image
        src="/escudo.png"
        alt=""
        width={112}
        height={112}
        priority
        className={`w-auto transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${rolou ? "h-9 md:h-10" : "h-10 md:h-12"}`}
      />
      <span className="hidden flex-col gap-[3px] sm:flex">
        <span className="text-[0.95rem] font-extrabold leading-none tracking-[-0.01em] text-white">
          Cláudio Brandão
        </span>
        <span className="text-[0.625rem] font-semibold uppercase leading-none tracking-[0.19em] text-white/55">
          Projeto Esportivo
        </span>
      </span>
    </Link>
  );

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200]
                   focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-navy-900"
      >
        Ir para o conteúdo
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-[background-color,height,border-color]
                    duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                    ${rolou ? "border-b border-white/8" : "border-b border-transparent"}`}
        style={
          rolou
            ? {
                // navy sólido e fosco de propósito: a versão saturada com brilho
                // lia como plástico por cima da foto
                backgroundColor: "rgba(0, 21, 47, 0.92)",
                backdropFilter: "blur(14px)",
              }
            : undefined
        }
      >
        <div
          className={`mx-auto flex max-w-[1320px] items-center justify-between gap-5 px-5 transition-all
                      duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] md:px-10
                      ${rolou ? "h-[58px] md:h-[70px]" : "h-[66px] md:h-[88px]"}`}
        >
          {Marca}

          {/* seis itens agora: o vão encolhe em 1024px e volta a respirar no
              monitor largo, em vez de espremer a marca contra o menu */}
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Principal">
            {navegacao.map((item) => {
              const ativo = item.href === "/" ? rota === "/" : rota.startsWith(item.href);
              const temPainel = Boolean(item.submenu || item.filhos);
              const expandido = submenu === item.href;

              if (!temPainel) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={ativo ? "page" : undefined}
                    className={`group relative py-1.5 text-[0.875rem] font-medium transition-colors
                                duration-150 ${ativo ? "text-white" : "text-white/72 hover:text-white"}`}
                  >
                    {item.rotulo}
                    <span
                      aria-hidden
                      className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-white
                                  transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]
                                  ${ativo ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </Link>
                );
              }

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => abrirSub(item.href)}
                  onMouseLeave={fecharSub}
                >
                  <Link
                    href={item.href}
                    aria-current={ativo ? "page" : undefined}
                    aria-expanded={expandido}
                    onFocus={() => abrirSub(item.href)}
                    className={`group relative flex items-center gap-1.5 py-1.5 text-[0.875rem]
                                font-medium transition-colors duration-150
                                ${ativo ? "text-white" : "text-white/72 hover:text-white"}`}
                  >
                    {item.rotulo}
                    <Icone
                      nome="CaretDown"
                      className={`h-3 w-3 opacity-70 transition-transform duration-200 ${expandido ? "rotate-180" : ""}`}
                    />
                    <span
                      aria-hidden
                      className={`absolute -bottom-1 left-0 h-px w-[calc(100%-16px)] origin-left bg-white
                                  transition-transform duration-200
                                  ${ativo ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </Link>

                  {/* superfície clara: sobre a barra escura, o menu escuro sumia */}
                  <div
                    className={`absolute left-1/2 top-full -translate-x-1/2 pt-4
                                transition-[opacity,transform,visibility] duration-200
                                ease-[cubic-bezier(0.23,1,0.32,1)]
                                ${item.submenu ? "w-[286px]" : "w-[212px]"}
                                ${expandido ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"}`}
                    onMouseEnter={() => abrirSub(item.href)}
                    onMouseLeave={fecharSub}
                  >
                    <ul
                      className="overflow-hidden rounded-[16px] border border-ink-200 bg-white p-1.5
                                 shadow-[0_20px_44px_-18px_rgb(0_14_34/0.45)]"
                    >
                      {item.submenu &&
                        modalidades.map((m) => (
                          <li key={m.slug}>
                            <Link
                              href={`/modalidades/${m.slug}`}
                              className="flex items-center gap-3 rounded-[11px] px-3 py-2.5 text-[0.875rem]
                                         font-medium text-navy-800 transition-colors duration-150
                                         hover:bg-navy-50"
                            >
                              {/* miniatura do elenco no lugar do ícone de bola:
                                  o círculo com a bola era o mesmo desenho para
                                  duas equipes diferentes e não distinguia nada */}
                              <span className="relative h-9 w-12 shrink-0 overflow-hidden rounded-[7px] bg-navy-800">
                                {m.capa ? (
                                  <Image
                                    src={m.capa.src}
                                    alt=""
                                    fill
                                    sizes="48px"
                                    style={{ objectPosition: m.capa.posicao ?? "50% 50%" }}
                                    className="object-cover"
                                  />
                                ) : (
                                  <Image
                                    src="/escudo.png"
                                    alt=""
                                    width={40}
                                    height={40}
                                    className="absolute left-1/2 top-1/2 h-[60%] w-auto
                                               -translate-x-1/2 -translate-y-1/2 opacity-30"
                                  />
                                )}
                              </span>
                              {m.nome}
                            </Link>
                          </li>
                        ))}

                      {item.filhos?.map((f) => (
                        <li key={f.href}>
                          <Link
                            href={f.href}
                            className="flex items-center justify-between gap-3 rounded-[11px] px-3 py-2.5
                                       text-[0.875rem] font-medium text-navy-800 transition-colors
                                       duration-150 hover:bg-navy-50"
                          >
                            {f.rotulo}
                            <Icone nome="CaretRight" className="h-3.5 w-3.5 opacity-45" />
                          </Link>
                        </li>
                      ))}

                      {/* só o painel das equipes precisa desta linha: nos
                          submenus de links o próprio rótulo já é o caminho
                          para a página, e repeti-lo era uma opção a mais sem
                          destino novo */}
                      {item.submenu && (
                        <li className="mt-1 border-t border-ink-100 pt-1">
                          <Link
                            href={item.href}
                            className="flex items-center justify-between rounded-[11px] px-3 py-2.5
                                       text-[0.8125rem] font-semibold text-navy-700 transition-colors
                                       duration-150 hover:bg-navy-50"
                          >
                            Ver as equipes
                            <Icone nome="CaretRight" className="h-3.5 w-3.5 opacity-55" />
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            {/* o Instagram é onde o dia a dia é publicado: no monitor ele fica
                na barra como ícone, sem roubar a linha dos rótulos */}
            <a
              href={contato.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label={`Instagram do projeto, ${contato.instagramHandle}`}
              className="hidden h-11 w-11 place-items-center text-white/70 transition-colors
                         duration-150 hover:text-white lg:grid"
            >
              <Icone nome="InstagramLogo" className="h-[20px] w-[20px]" />
            </a>

            <span className="hidden sm:block">
              <BotaoLink
                href="/apoie"
                tom="claro"
                className="px-5 py-3 text-[0.875rem]"
              >
                Apoie
              </BotaoLink>
            </span>

            <button
              ref={gatilho}
              onClick={() => setAberto((v) => !v)}
              aria-expanded={aberto}
              aria-controls="menu-movel"
              className="flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-full
                         border border-white/22 transition-colors duration-150 hover:bg-white/10 lg:hidden"
            >
              <span className="sr-only">{aberto ? "Fechar menu" : "Abrir menu"}</span>
              <span className={`block h-[1.5px] w-5 rounded-full bg-white transition-transform duration-200 ease-out ${aberto ? "translate-y-[6.5px] rotate-45" : ""}`} />
              <span className={`block h-[1.5px] w-5 rounded-full bg-white transition-opacity duration-150 ${aberto ? "opacity-0" : ""}`} />
              <span className={`block h-[1.5px] w-5 rounded-full bg-white transition-transform duration-200 ease-out ${aberto ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-movel"
        hidden={!aberto}
        className="fixed inset-0 z-[99] overflow-y-auto bg-navy-950 lg:hidden"
      >
        <Image
          src="/escudo.png"
          alt=""
          width={420}
          height={420}
          className="pointer-events-none absolute -right-24 -top-10 w-[240px] opacity-[0.025]"
        />
        {/* As modalidades viraram ladrilhos com a foto do elenco. Como lista de
            texto elas competiam com a navegação e não diziam nada; como
            imagem, dizem exatamente o que são e viram a parte mais rápida de
            escanear do menu. */}
        <div className="flex min-h-full flex-col px-5 pb-7 pt-20">
          <nav aria-label="Principal, móvel" className="flex flex-col gap-7">
            <ul className="flex flex-col gap-0.5">
              {navegacao
                .filter((item) => !item.submenu)
                .map((item, i) => {
                  const ativo = item.href === "/" ? rota === "/" : rota.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={ativo ? "page" : undefined}
                        className={`flex min-h-[44px] items-center text-[1.0625rem] font-semibold
                                    tracking-[-0.01em] transition-colors duration-150
                                    ${ativo ? "text-white" : "text-white/55 hover:text-white"}`}
                        style={{
                          transition: `opacity .26s ${i * 30}ms, transform .26s ${i * 30}ms`,
                          opacity: aberto ? 1 : 0,
                          transform: aberto ? "none" : "translateY(8px)",
                        }}
                      >
                        {item.rotulo}
                        {ativo && <span aria-hidden className="ml-2.5 h-1 w-1 rounded-full bg-gold-300" />}
                      </Link>

                      {/* subitem recuado com fio à esquerda: no celular ele
                          precisa parecer filho da linha de cima, e não mais
                          um destino de mesmo peso */}
                      {item.filhos && (
                        <ul className="mb-1 ml-1 flex flex-col border-l border-white/12 pl-4">
                          {item.filhos.map((f) => {
                            const filhoAtivo = rota === f.href;
                            return (
                              <li key={f.href}>
                                <Link
                                  href={f.href}
                                  aria-current={filhoAtivo ? "page" : undefined}
                                  className={`flex min-h-[40px] items-center text-[0.9375rem]
                                              font-medium transition-colors duration-150
                                              ${filhoAtivo ? "text-white" : "text-white/45 hover:text-white"}`}
                                >
                                  {f.rotulo}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
            </ul>

            <div>
              <Link
                href="/modalidades"
                className="flex min-h-[36px] items-center justify-between gap-3 px-0.5"
              >
                <span className="u-eyebrow text-white/35">Modalidades</span>
                <span className="flex items-center gap-1 text-[0.75rem] font-semibold text-white/50">
                  Ver todas
                  <Icone nome="CaretRight" className="h-3 w-3" />
                </span>
              </Link>
              <ul className="mt-3 grid grid-cols-2 gap-2.5">
                {modalidades.map((m) => (
                  <li key={m.slug}>
                    <Link
                      href={`/modalidades/${m.slug}`}
                      className="group relative flex aspect-16/10 items-end overflow-hidden
                                 rounded-[11px] bg-navy-800 ring-1 ring-white/10
                                 transition-transform duration-200 active:scale-[0.98]"
                    >
                      {m.capa ? (
                        <Image
                          src={m.capa.src}
                          alt=""
                          fill
                          sizes="46vw"
                          style={{ objectPosition: m.capa.posicao ?? "50% 50%" }}
                          className="object-cover opacity-80 transition-opacity duration-200
                                     group-hover:opacity-100"
                        />
                      ) : (
                        <Image
                          src="/escudo.png"
                          alt=""
                          width={120}
                          height={120}
                          className="absolute left-1/2 top-1/2 h-[52%] w-auto -translate-x-1/2
                                     -translate-y-1/2 opacity-25"
                        />
                      )}
                      <span
                        aria-hidden
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(0,14,34,0) 34%, rgba(0,14,34,.9) 100%)",
                        }}
                      />
                      <span className="relative p-2 text-[0.75rem] font-semibold leading-tight text-white">
                        {m.nome}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="mt-auto flex items-center justify-between gap-4 pt-8">
            {/* só o rótulo: o handle inteiro tem 31 caracteres e, em 360px,
                empurrava o botão para fora da linha */}
            <a
              href={contato.instagram}
              className="inline-flex min-h-[44px] items-center gap-2 text-[0.875rem] font-medium
                         text-white/55 transition-colors duration-150 hover:text-white"
              target="_blank"
              rel="noreferrer"
            >
              <Icone nome="InstagramLogo" className="h-[18px] w-[18px]" />
              Instagram
            </a>
            <BotaoLink href="/apoie" tom="ouro" className="shrink-0">
              Apoie
            </BotaoLink>
          </div>
        </div>
      </div>
    </>
  );
}
