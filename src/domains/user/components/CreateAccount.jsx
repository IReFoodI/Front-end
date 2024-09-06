import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

import { Button } from "@/ui/components/ui/button"
import { Checkbox } from "@/ui/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/components/ui/form/form"
import { Input } from "@/ui/components/ui/input"
import { Label } from "@/ui/components/ui/label"

import { SocialAuthButtons } from "./SocialAuthButtons"
import { TextWithLink } from "./TextWithLink"

const phoneRegex = /^\+?[1-9]\d{1,14}$/

const formSchema = z.object({
  name: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(2, { message: "Tamanho mínimo de 2 caracter" }),
  email: z
    .string({
      required_error: "Campo obrigatório",
    })
    .email({ message: "Formato de e-mail inválido" }),
  phone: z
    .string({
      required_error: "Campo obrigatório",
    })
    .regex(phoneRegex, { message: "Número de telefone inválido" }),
  password: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .max(40, { message: "A senha deve ter até 40 caracteres" }),
})

export function CreateAccount() {
  const navigate = useNavigate()
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: undefined,
      phone: undefined,
      email: undefined,
      password: undefined,
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    if (acceptedTerms) navigate("/home")
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
        Criar conta
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 text-left"
        >
          <FormField
            id="name"
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nome completo"
                    className={"!mt-1"}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={"text-xs"} />
              </FormItem>
            )}
          />
          <FormField
            id="phone"
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contato</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="(DDD) + Celular"
                    className={"!mt-1"}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={"text-xs"} />
              </FormItem>
            )}
          />
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
          <Button type="submit">Cadastrar</Button>
          <div className="mt-4 flex items-center">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={() => setAcceptedTerms(!acceptedTerms)}
            />
            <Label htmlFor="terms" className="ml-2 text-sm">
              Eu aceito os termos e condições
            </Label>
          </div>
        </form>
      </Form>
      <SocialAuthButtons />
      <TextWithLink
        text={"Já tem conta?"}
        buttonContent={"Faça Login"}
        navigateTo={"/login"}
      />
    </>
  )
}
