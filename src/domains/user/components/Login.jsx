import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

import { Button } from "@/ui/components/ui/button/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/components/ui/form/form"
import { Input } from "@/ui/components/ui/input"

import { SocialAuthButtons } from "./SocialAuthButtons"
import { TextWithLink } from "./TextWithLink"

const formSchema = z.object({
  email: z
    .string({
      required_error: "Campo obrigatório",
    })
    .email({ message: "Formato de e-mail inválido" }),
  password: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
})

export function Login() {
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    navigate("/home")
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
        Login
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 text-left"
        >
          <FormField
            id="email"
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email"
                    className={"!mt-1"}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={"text-xs"} />
              </FormItem>
            )}
          />

          <FormField
            id="password"
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Senha"
                    className={"!mt-1"}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={"text-xs"} />
              </FormItem>
            )}
          />
          <Button type="submit">Entrar</Button>
        </form>
      </Form>

      <TextWithLink
        text="Esqueceu sua senha?"
        buttonContent="Recuperar senha"
        navigateTo="/recover-password" //TODO: fazer rota
      />
      <SocialAuthButtons />
      <TextWithLink
        text="Ainda não tem conta?"
        buttonContent="Criar conta"
        navigateTo="/create-account" //TODO: fazer rota
      />
    </>
  )
}
