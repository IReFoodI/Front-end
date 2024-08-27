import { IconStarFilled } from "@tabler/icons-react"

import { cn } from "@/app/utils/cn"
import { Card, CardContent, CardTitle } from "@/ui/components/ui/card"

import { FavoriteButton } from "./FavoriteButton"

export function CardLoja({
  className,
  lojaData = {},
  onFavoriteToggle,
  ...props
}) {
  const {
    nome = "Nome não disponível",
    desconto = "Sem desconto",
    avaliacao = "0.0",
    categoria = "Categoria não disponível",
    horario = "Horário não disponível",
    distancia = "Distância não disponível",
    isFavorited = false,
    imagePath = "", // Caminho da imagem da loja
    logoPath = "", // Caminho do logotipo da loja
  } = lojaData

  return (
    <Card
      className={cn(
        "relative my-4 grid h-auto w-auto grid-cols-[25%_55%_10%] gap-4 rounded-2xl bg-[hsl(var(--secondary))] shadow-lg sm:p-4 lg:pl-2",
        className
      )}
      {...props}
    >
      <CardContent className="relative flex aspect-square h-[100%] w-[100%] items-center justify-center p-0 pb-12">
        <div className="relative">
          <img
            src={imagePath}
            alt={`${nome} Image`}
            className="rounded-[23px] border-[3px]"
          />
          <div className="absolute left-1/2 top-1/2 aspect-square h-[50%] w-[50%] -translate-x-1/2 translate-y-1/3 transform">
            <img
              src={logoPath}
              alt={`${nome} Logo`}
              className="h-full w-full rounded-full border-[3px] object-cover"
            />
          </div>
        </div>
      </CardContent>

      {/* Textos */}
      <CardContent className="flex flex-col justify-center p-0 pl-4">
        <CardTitle className="font-inter truncate font-semibold text-[hsl(var(--foreground))] sm:text-2xl lg:text-xl">
          {nome}
        </CardTitle>
        <div className="mt-2 inline-block rounded-[10px] bg-[hsl(var(--primary))] px-2 py-1 sm:w-2/3 lg:w-full">
          <span className="font-inter font-semibold text-[hsl(var(--primary-foreground))] sm:text-2xl lg:text-sm">
            {desconto}
          </span>
        </div>

        <div className="mt-4 flex items-center">
          <IconStarFilled className="h-[16px] w-[16px] text-[hsl(var(--primary))] sm:h-[20px] sm:w-[20px] lg:h-[24px] lg:w-[24px]" />
          <span className="font-inter ml-4 font-semibold text-[hsl(var(--foreground))] sm:text-2xl lg:text-sm">
            {avaliacao}
          </span>
          <span className="font-inter ml-4 font-semibold text-[hsl(var(--muted-foreground))] sm:text-2xl lg:text-sm">
            {categoria}
          </span>
        </div>

        <div className="mt-4 flex items-center">
          <span className="font-inter font-medium text-[hsl(var(--muted-foreground))] sm:text-2xl lg:text-sm">
            {horario}
          </span>
          <span className="font-inter ml-1 font-medium text-[hsl(var(--muted-foreground))] sm:text-2xl lg:text-sm">
            {distancia}
          </span>
        </div>
      </CardContent>

      {/* Botão de favorito */}
      <CardContent className="flex items-start justify-start p-0">
        <FavoriteButton isFavorited={isFavorited} onClick={onFavoriteToggle} />
      </CardContent>
    </Card>
  )
}
