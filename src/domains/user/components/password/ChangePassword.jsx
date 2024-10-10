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

import ilustra from "../../../../ui/assets/ilustra.png"
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
      <div
        id="page"
        className="mx-auto flex h-screen max-h-full w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto"
      >
        <h1 className="w-full pb-6 pt-7 text-center text-2xl font-semibold lg:py-10">
          Alterar senha
        </h1>
        <div className="flex w-full">
          <div className="flex w-full flex-col justify-between px-5 sm:w-1/2">
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
                <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-5">
                  <Button className="col-start-2" type="submit">
                    Salvar
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <div className="hidden max-h-[80vh] sm:flex">
            <img
              className="max-h-full"
              src={ilustra}
              alt="imagem decorativa padrão"
            />
          </div>
        </div>
      </div>
    </>
  )
}
