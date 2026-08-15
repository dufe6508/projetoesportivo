import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // trava a raiz no projeto: sem isso o Turbopack sobe até o diretório do usuário
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
