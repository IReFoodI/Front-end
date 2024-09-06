import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react"

import { Button } from "@/ui/components/ui/button"

export function SocialAuthButtons() {
  return (
    <>
      <span className="text-xs text-muted-foreground">ou</span>
      <nav aria-label="Opções de login e registro" className="grid gap-2">
        <Button variant="outline">
          <IconBrandGoogle stroke={1} className="mr-2" /> Continuar com Google
          {/* nao gostei desse icone */}
        </Button>
        <Button variant="outline">
          <IconBrandFacebook stroke={1} className="mr-2" /> Continuar com
          Facebook
          {/* nao gostei desse icone */}
        </Button>
      </nav>
    </>
  )
}
