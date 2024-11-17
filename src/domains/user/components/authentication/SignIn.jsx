import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { localStorageUtil } from "@/app/utils/localStorageUtil"
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
import { authService } from "../../services/authService"
import userStore from "../../stores/userStore"

export function SignIn() {
  const { setUser } = userStore()
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location?.pathname
  const [searchParams] = useSearchParams()
  const redirectPath = searchParams.get("redirect")

  const { loading: loadingLogin, onRequest: onRequestLogin } = useFetch()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function redirect() {
    if (redirectPath) {
      navigate(redirectPath)
    } else {
      navigate(pathname == "/autenticar/negocios" ? "/dashboard" : "/")
    }
  }

  function handleSuccess(data) {
    if (
      pathname == "/autenticar/negocios" ||
      pathname == "/autenticar/negocios"
    ) {
      setUser({ ...data, restaurantId: data?.id })
    } else {
      setUser({ ...data, userId: data?.id })
    }
    localStorageUtil?.setLocalStorageToken(data?.jwt)
    redirect()
  }

  const onSubmit = async (data) => {
    await onRequestLogin({
      request: () => {
        if (
          pathname == "/autenticar/negocios" ||
          pathname == "/autenticar/negocios"
        ) {
          return authService.signInWithEmailAndPasswordRestaurant(data)
        } else {
          return authService.signInWithEmailAndPassword(data)
        }
      },
      onSuccess: handleSuccess,
      successMessage: "Login realizado com sucesso! Bem-vindo(a)!",
      errorMessage: "Credenciais incorretas",
    })
  }

  if (loadingLogin) {
    return <Loading />
  }

  return (
    <div className="mx-auto grid max-w-sm gap-2">
      <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
        Login
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 text-left"
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
                    autoComplete="username"
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
          <Button disabled={loadingLogin} type="submit">
            Entrar
          </Button>
        </form>
      </Form>

      <TextWithLink
        text="Esqueceu sua senha?"
        buttonContent="Recuperar senha"
        navigateTo={
          location?.pathname === "/autenticar/negocios"
            ? "/autenticar/negocios/recuperar-senha"
            : "/autenticar/recuperar-senha"
        }
      />
      {location?.pathname !== "/autenticar/negocios" &&
        location?.pathname == "/autenticar/entrar" && (
          <SocialAuthButtons
            locationPathname={location?.pathname}
            // redirectPath={redirectPath}
          />
        )}

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
