import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { TextWithLink } from "@/ui/components/TextWithLink"
import { Button } from "@/ui/components/ui/button/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/components/ui/form/form"
import { PasswordInput } from "@/ui/components/ui/passwordInput"

import { formSchema } from "../../models/ChangePasswordTypes"

export function ChangePassword() {
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data) {
    console.log(data) // enviar para o back
    toast.success("Informações alteradas com sucesso")
    navigate("/myProfile") //todo: ajustar rota
  }

  return (
    <>
      <h1 className="col-span-full w-full pb-6 text-center text-2xl font-semibold">
        Alterar senha
      </h1>
      <div className="w-full justify-between lg:px-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-2 text-left"
          >
            <FormField
              id="oldPassword"
              name="oldPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha antiga</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      className={"!mt-1"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className={"text-xs"} />
                </FormItem>
              )}
            />
            <TextWithLink
              text="Esqueceu sua senha?"
              buttonContent="Recuperar senha"
              navigateTo="/recoverPassword"
              style={"!justify-start"}
            />

            <FormField
              id="newPassword"
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      className={"!mt-1"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className={"text-xs"} />
                </FormItem>
              )}
            />
            <FormField
              id="confirmPassword"
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="********"
                      className={"!mt-1"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className={"text-xs"} />
                </FormItem>
              )}
            />
            <div className="mt-4 grid gap-3 sm:gap-5">
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  )
}
