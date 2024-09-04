import { Button } from "@/ui/components/ui/button"

import { Decorative } from "./Decorative"

export function PresentationContent() {
  return (
    <div className="grid max-w-lg content-center gap-5 bg-background text-center sm:px-16 sm:py-12">
      <h1 className="text-3xl font-semibold text-foreground">
        texto de abertura apresentando o app
      </h1>
      <p className="text-primary">texto complementar sobre o app</p>
      <Decorative className={"sm:hidden"} />
      <p className="text-muted-foreground">Como deseja continuar?</p>
      <nav aria-label="Navegação de login e registro" className="grid gap-2">
        <Button>Cadastre-se</Button>
        <Button variant="outline">Acesse sua conta</Button>
      </nav>
    </div>
  )
}
