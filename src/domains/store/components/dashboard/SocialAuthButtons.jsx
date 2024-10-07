import { IconBrandFacebook, IconBrandGoogle } from "@tabler/icons-react"

import { Button } from "@/ui/components/ui/button/button"

export function SocialAuthButtons() {
  return (
    <>
      <nav aria-label="Opções de login e registro" className="grid gap-2">
        <Button variant="outline" className="rounded-full">
          <IconBrandGoogle stroke={1} className="mr-2" /> Continuar com Google
          {/* icone sem cor, sem vida */}
        </Button>
        <Button variant="outline" className="rounded-full">
          <IconBrandFacebook stroke={1} className="mr-2" /> Continuar com
          Facebook
          {/* icone sem cor, sem vida */}
        </Button>
      </nav>
    </>
  )
}
