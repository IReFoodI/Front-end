import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { setLocalStorageToken } from "@/app/utils/storage-token"
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
import { Loading } from "@/ui/components/ui/loading"
import { PasswordInput } from "@/ui/components/ui/passwordInput"
import { TextWithLink } from "@/ui/components/ui/TextWithLink"

import { SocialAuthButtons } from "../../../../ui/components/SocialAuthButtons"
import { formSchema } from "../../models/LoginTypes"
import { signInWithEmailAndPassword } from "../../services/authService"

export function SignIn() {
  const location = useLocation()
  const navigate = useNavigate()
  const { executeFetch, isLoading, response } = useFetch(
    signInWithEmailAndPassword
  )
  const [searchParams] = useSearchParams()
  const redirectPath = searchParams.get("redirect")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    function redirect() {
      if (redirectPath) {
        navigate(redirectPath)
      } else {
        navigate(
          location.pathname == "/autenticar/negocios" ? "/dashboard" : "/"
        )
      }
    }

    executeFetch(
      data,
      redirect(),
      true,
      "Login realizado com sucesso! Bem-vindo(a)!"
    )
    setLocalStorageToken(response?.data?.jwt)
    console.log(response)
  }
  if (isLoading) {
    return <Loading />
  }

  // if (isError) {
  //   return <div>Ocorreu um erro</div>
  // }

  return (
    <div className="mx-auto grid max-w-sm gap-2">
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
          <Button type="submit">Entrar</Button>
        </form>
      </Form>

      <TextWithLink
        text="Esqueceu sua senha?"
        buttonContent="Recuperar senha"
        navigateTo="/autenticar/recuperar-senha"
      />
      <SocialAuthButtons
        locationPathname={location?.pathname}
        redirectPath={redirectPath}
      />
      <TextWithLink
        text="Ainda não tem conta?"
        buttonContent="Criar conta"
        navigateTo={
          location?.pathname === "/autenticar/negocios"
            ? "/autenticar/negocios/criar-conta"
            : "/autenticar/criar-conta"
        }
      />
    </div>
  )
}
