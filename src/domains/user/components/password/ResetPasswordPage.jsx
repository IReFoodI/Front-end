import { zodResolver } from "@hookform/resolvers/zod"
import { IconLoader2 } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

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

import { resetPasswordTypes } from "../../models/ResetPasswordTypes"

export function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { token } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    //fazer uma requisição com o token para ver se é valido ou não
    setIsLoading(true)

    async function verifyToken(token) {
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          // Simulação de verificação do token
          if (token === "valido") {
            resolve(true) // Token válido
          } else {
            resolve(false) // Token inválido
          }
        }, 3000) // Simula 3 segundos de espera
      })
      setIsLoading(false)
      if (response !== true) {
        toast.error("Token de recuperação inválido")
        navigate("/recuperar-senha")
      }
    }

    verifyToken(token)
  }, [token, navigate])

  const form = useForm({
    resolver: zodResolver(resetPasswordTypes),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (data) => {
    toast.success("Senha redefinida com sucesso!")
    navigate("/entrar")
    console.log(data)
    return
  }

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center">
          <IconLoader2 className="animate-spin text-primary" size={32} />
        </div>
      ) : (
        <div className="mx-auto grid max-w-sm gap-4">
          <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
            Redefinir senha
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full gap-2 text-left"
            >
              <FormField
                id="password"
                name="password"
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
                    <FormLabel>Confirmar nova senha</FormLabel>
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

              <Button type="submit">Salvar</Button>
            </form>
          </Form>
        </div>
      )}
    </>
  )
}
