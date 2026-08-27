import type { MetadataRoute } from "next";
import { modalidadesAtivas } from "@/lib/dados";

const BASE = "https://claudiobrandaoesportes.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotasFixas = [
    "",
    "/sobre",
    "/modalidades",
    "/titulos",
    "/transparencia",
    "/apoie",
    "/contato",
  ].map((rota) => ({
    url: `${BASE}${rota}`,
    lastModified: new Date(),
  }));

  const rotasModalidade = modalidadesAtivas.map((m) => ({
    url: `${BASE}/modalidades/${m.slug}`,
    lastModified: new Date(),
  }));

  return [...rotasFixas, ...rotasModalidade];
}
