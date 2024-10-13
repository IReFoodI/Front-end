import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
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
import { Input } from "@/ui/components/ui/input"

import { recoverPasswordTypes } from "../../models/RecoverPasswordTypes"

export function RecoverPasswordPage() {
  const form = useForm({
    resolver: zodResolver(recoverPasswordTypes),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(data) {
    console.log(data) // enviar para o back
    toast.success("O e-mail com o link foi enviado")
  }

  return (
    <div className="mx-auto grid max-w-sm gap-4">
      <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
        Esqueceu sua senha?
      </h1>

      <h3>Digite seu e-mail abaixo para receber um link de redefinição.</h3>
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
          <Button type="submit">Enviar</Button>
        </form>
      </Form>
      <div>
        <p>
          Ainda não tem conta?{" "}
          <Link to="/criar-conta" className="text-primary underline">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}
