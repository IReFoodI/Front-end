import facebook from "@/ui/assets/facebook-icon.svg"
import gmail from "@/ui/assets/gmail-icon.svg"
import { Button } from "@/ui/components/ui/button/button"

export function SocialAuthButtons() {
  return (
    <>
      <span className="text-xs text-muted-foreground">ou</span>
      <nav aria-label="Opções de login e registro" className="grid gap-2">
        <Button variant="outline">
          <img src={gmail} alt="icone do gmail" className="mr-2 size-4" />
          Continuar com Google
        </Button>
        <Button variant="outline">
          <img src={facebook} alt="icone do facebook" className="mr-2 size-4" />
          Continuar com Facebook
        </Button>
      </nav>
    </>
  )
}
