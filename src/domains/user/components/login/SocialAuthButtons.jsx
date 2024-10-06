import { FaFacebookF, FaGoogle } from "react-icons/fa"

import { Button } from "@/ui/components/ui/button/button"

export function SocialAuthButtons() {
  return (
    <>
      <span className="text-xs text-muted-foreground">ou</span>
      <nav aria-label="Opções de login e registro" className="grid gap-2">
        <Button variant="outline">
          <FaGoogle className="mr-2 size-4" />
          Continuar com Google
        </Button>
        <Button variant="outline">
          <FaFacebookF className="mr-2 size-4" /> Continuar com Facebook
        </Button>
      </nav>
    </>
  )
}
