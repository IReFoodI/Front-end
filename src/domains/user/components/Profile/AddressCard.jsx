import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { cn } from "@/app/utils/cn"
import { Card, CardContent, CardTitle } from "@/ui/components/ui/card"
import { ROUTES } from "@/app/router/routes"

export function AddressCard({ className, enderecoData = {}, ...props }) {
  const {
    id = "",
    cep = "CEP não disponível",
    logradouro = "",
    numero = "",
    apto = "",
    complemento = "",
    cidade = "Cidade não disponível",
    uf = "UF não disponível",
  } = enderecoData

  return (
    <Card
      className={cn(
        "relative my-4 grid h-auto w-auto grid-cols-[65%_35%] rounded-2xl bg-[hsl(var(--card))] p-4 shadow-lg",
        className
      )}
      {...props}
    >
      <CardContent className="flex flex-col justify-center">
        <CardTitle className="font-inter font-semibold text-[hsl(var(--foreground))] sm:text-2xl lg:text-xl">
          Endereço
        </CardTitle>

        <div className="mt-2">
          <span className="font-inter font-medium text-[hsl(var(--foreground))] sm:text-2xl lg:text-sm">
            CEP: {cep}
          </span>
        </div>

        <div className="mt-2">
          <span className="font-inter font-medium text-[hsl(var(--foreground))] sm:text-2xl lg:text-sm">
            Endereço: {logradouro}, {numero}
          </span>
        </div>

        {apto && (
          <div className="mt-2">
            <span className="font-inter font-medium text-[hsl(var(--foreground))] sm:text-2xl lg:text-sm">
              Apto: {apto}
            </span>
          </div>
        )}

        {complemento && (
          <div className="mt-2">
            <span className="font-inter font-medium text-[hsl(var(--foreground))] sm:text-2xl lg:text-sm">
              Complemento: {complemento}
            </span>
          </div>
        )}

        <div className="mt-2">
          <span className="font-inter font-medium text-[hsl(var(--foreground))] sm:text-2xl lg:text-sm">
            Cidade: {cidade}, {uf}
          </span>
        </div>
      </CardContent>
      <CardContent className="flex justify-end">
        <Link to={ROUTES.getEnderecosEditById(id)} className="flex items-center gap-2">
          <IconEdit className="h-[16px] w-[16px] text-[hsl(var(--Accent))]" />
        </Link>
        <IconTrash className="h-[16px] w-[16px] text-[hsl(var(--Accent))]" />
      </CardContent>
    </Card>
  )
}
