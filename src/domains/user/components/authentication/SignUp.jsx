import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { SocialAuthButtons } from "@/ui/components/SocialAuthButtons"
import { Button } from "@/ui/components/ui/button/button"
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
import { PasswordInput } from "@/ui/components/ui/passwordInput"
import { PhonePatternFormat } from "@/ui/components/ui/phone-pattern-format"
import { TextWithLink } from "@/ui/components/ui/TextWithLink"

import { useTokenValidation } from "../../../../app/hooks/useTokenValidation"
import { formSchema } from "../../models/CreateAccountTypes"
import { TermsOfUse } from "./TermsOfUse"

export function SignUp() {
  const location = useLocation()
  const navigate = useNavigate()
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  useTokenValidation()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data) => {
    if (acceptedTerms) {
      toast.success("Conta criada com sucesso! Bem-vindo(a)!")
      navigate("/")
      console.log(data)
      return
    }

    toast.warning("Necessário aceitar os termos")
  }

  const isSignUpPage = location.pathname === "/autenticar/criar-conta"

  return (
    <div className="mx-auto grid max-w-sm gap-2">
      <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
        Criar conta
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full gap-2 text-left"
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
                  <PhonePatternFormat {...field} />
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
          <div className="mt-4 flex items-center">
            <Checkbox
              id="terms"
              checked={acceptedTerms}
              onCheckedChange={() => setAcceptedTerms(!acceptedTerms)}
            />
            <Label htmlFor="terms" className="ml-2 text-sm">
              Eu aceito os <TermsOfUse>termos e condições</TermsOfUse>
            </Label>
          </div>
          <Button type="submit">Cadastrar</Button>
        </form>
      </Form>
      <SocialAuthButtons />
      <TextWithLink
        text={"Já tem conta?"}
        buttonContent={"Faça Login"}
        navigateTo={
          isSignUpPage ? "/autenticar/entrar" : "/autenticar/negocios"
        }
      />

      <TextWithLink
        text={isSignUpPage ? "É uma empresa?" : "É um cliente?"}
        buttonContent={isSignUpPage ? "Criar conta empresarial" : "Criar conta"}
        navigateTo={
          isSignUpPage
            ? "/autenticar/negocios/criar-conta"
            : "/autenticar/criar-conta"
        }
      />
    </div>
  )
}
