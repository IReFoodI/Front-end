import { useNavigate } from "react-router-dom"

import { Button } from "@/ui/components/ui/button/button"

import { Decorative } from "./Decorative"

export function PresentationContent() {
  const navigate = useNavigate()
  return (
    <div className="mx-auto grid max-w-sm gap-2">
      <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
        Economize e ajude a reduzir o desperdício!
      </h1>
      <p className="text-muted-foreground">
        Conectamos você a restaurantes e mercados que vendem alimentos próximos
        do vencimento a preços reduzidos.
      </p>
      <Decorative className={"!relative sm:hidden"} />
      <p className="mt-5 text-muted-foreground">Como deseja continuar?</p>
      <nav aria-label="Navegação de login e registro" className="grid gap-2">
        <Button onClick={() => navigate("/autenticar/criar-conta")}>
          Cadastre-se
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("/autenticar/entrar")}
        >
          Acesse sua conta
        </Button>
        <Button
          onClick={() => navigate("/autenticar/negocios")}
          variant="link"
          className={"underline"}
        >
          Quero vender no ReFood
        </Button>
      </nav>
    </div>
  )
}
