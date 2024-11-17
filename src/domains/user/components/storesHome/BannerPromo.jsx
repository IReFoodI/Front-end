export function BannerPromo({ url }) {
  return (
    <div className="flex min-h-52 items-center justify-center">
      <picture>
        <source srcSet={url.desktop} media="(min-width: 790px)" />
        <source srcSet={url.mobile} media="(max-width: 789px)" />
        <img
          src={url.mobile} // Fallback para navegadores que não suportam <picture>
          alt="Banner promocional"
          className="w-full rounded-2xl object-cover"
        />
      </picture>
    </div>
  )
}
