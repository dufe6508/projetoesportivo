import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

/**
 * Família única. Oswald, Newsreader e Martian Mono saíram por lerem duras
 * e mecânicas. Figtree é humanista e macia, e cobre da legenda ao display
 * só variando peso e espaçamento.
 */
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pecb.org.br"),
  title: {
    default: "Projeto Esportivo Cláudio Brandão",
    template: "%s | Projeto Esportivo Cláudio Brandão",
  },
  description:
    "Esporte educacional gratuito para os alunos da escola, no Vale do Jatobá, em Belo Horizonte. Futsal e Voleibol, treino toda semana.",
  icons: { icon: "/escudo-sm.png", apple: "/escudo.png" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Projeto Esportivo Cláudio Brandão",
  },
};

export const viewport: Viewport = {
  themeColor: "#002154",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={figtree.variable}>
      <body>
        <Header />
        <main id="conteudo" className="w-full max-w-full overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
