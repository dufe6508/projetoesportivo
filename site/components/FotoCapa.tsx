/**
 * Foto que preenche um header.
 *
 * Usa <picture> em vez de next/image de propósito. O problema aqui não é
 * tamanho de arquivo, é **enquadramento**: a foto de elenco é larga e tirada
 * de longe, então no celular ela precisa de um recorte 3:4 fechado no grupo,
 * não da mesma imagem reduzida. Isso é direção de arte, e next/image não
 * troca de recorte por breakpoint, só de resolução.
 *
 * Os arquivos `-movel` saem de _hero-mobile.mjs. Abaixo de 768px o navegador
 * baixa só o recorte; acima, só o original.
 */
export function FotoCapa({
  src,
  movel,
  alt,
  posicao = "50% 50%",
  posicaoMobile,
  prioridade = false,
  className = "",
}: {
  src: string;
  /** recorte 3:4 servido abaixo de 768px */
  movel?: string;
  alt: string;
  posicao?: string;
  posicaoMobile?: string;
  prioridade?: boolean;
  className?: string;
}) {
  return (
    <picture>
      {movel && <source media="(max-width: 767px)" srcSet={movel} />}
      <img
        src={src}
        alt={alt}
        decoding={prioridade ? "sync" : "async"}
        loading={prioridade ? "eager" : "lazy"}
        fetchPriority={prioridade ? "high" : undefined}
        style={
          {
            objectPosition: posicao,
            "--pos-mobile": posicaoMobile ?? posicao,
          } as React.CSSProperties
        }
        className={`hero-foto absolute inset-0 h-full w-full object-cover ${className}`}
      />
    </picture>
  );
}
