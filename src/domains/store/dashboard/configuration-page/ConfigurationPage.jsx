import { Separator } from "@/ui/components/ui/separator"

import { ChangeEmailForm } from "./ChangeEmailForm"
import { ChangePasswordForm } from "./ChangePasswordForm"

export function ConfigurationPage() {
  return (
    <div className="flex w-full max-w-screen-2xl flex-col items-center justify-start gap-6 p-4">
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
          Configurações
        </h1>
        <h3 className="text-lg font-medium text-zinc-500">
          Ajuste as informações de senha e e-mail
        </h3>
      </div>
      <div className="flex h-fit w-full flex-col items-center justify-start gap-6 lg:flex-row lg:gap-12">
        <section className="flex w-full flex-col gap-2 lg:h-full lg:justify-between">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">E-mail</p>
            <Separator />
          </div>

          <ChangeEmailForm />
        </section>

        <section className="flex w-full flex-col gap-2">
          <div className="flex flex-col">
            <p className="text-lg font-semibold">Senha</p>
            <Separator />
          </div>

          <ChangePasswordForm />
        </section>
      </div>
    </div>
  )
}
