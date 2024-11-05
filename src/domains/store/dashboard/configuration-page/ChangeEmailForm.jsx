import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { useFetch } from "@/app/hooks/useFetch"
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

import { changeEmailTypes } from "../../models/dashboard/ChangeEmailTypes"
import { restaurantService } from "../../services/restaurantService"

export function ChangeEmailForm() {
  const { loading, onRequest } = useFetch()

  function handleSuccess(data) {
    form.setValue("oldEmail", data)
  }

  function handleError(error) {
    toast.error("Ocorreu um erro ao tentar buscar o e-mail atual.")
    console.log(error)
  }
  function handleSubmitError(error) {
    toast.error("Ocorreu um erro ao tentar atualizar o e-mail.")
    console.log(error)
  }
  function handleSubmitSuccess(data) {
    toast.success("Troca de e-mail efetuada com sucesso!")
    form.setValue("oldEmail", data)
    form.resetField("email")
    form.resetField("confirmEmail")
  }

  useEffect(() => {
    //fazer requisição para pegar email atual
    async function request() {
      await onRequest({
        request: restaurantService.getRestaurantEmail,
        onSuccess: handleSuccess,
        onError: handleError,
      })
    }
    request()
    //eslint-disable-next-line
  }, [])

  const form = useForm({
    resolver: zodResolver(changeEmailTypes),
    defaultValues: {
      oldEmail: "",
      email: "",
      confirmEmail: "",
    },
  })

  const onSubmit = async (data) => {
    await onRequest({
      request: () => restaurantService.updateRestaurantEmail(data),
      onSuccess: handleSubmitSuccess,
      onError: handleSubmitError,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col gap-2 text-left"
      >
        <FormField
          id="oldEmail"
          name="oldEmail"
          control={form.control}
          className="flex w-full justify-start"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full justify-start gap-2">
                <p className="items-start text-sm text-zinc-800">
                  E-mail atual:{" "}
                </p>
                {loading ? (
                  <Loading
                    iconClassname={"size-5 lg:size-5"}
                    classname={"flex justify-start"}
                  />
                ) : (
                  <FormControl>
                    <input
                      type="email"
                      placeholder="E-mail Atual"
                      className={
                        "flex flex-1 bg-transparent text-sm text-primary"
                      }
                      disabled
                      {...field}
                    />
                  </FormControl>
                )}
              </div>
              <FormMessage className={"text-xs"} />
            </FormItem>
          )}
        />
        <div className="flex w-full flex-1 flex-col justify-end gap-2">
          <FormField
            id="email"
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="E-mail"
                    className={"!mt-1"}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={"text-xs"} />
              </FormItem>
            )}
          />

          <FormField
            id="confirmEmail"
            name="confirmEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="E-mail"
                    className={"!mt-1"}
                    {...field}
                  />
                </FormControl>
                <FormMessage className={"text-xs"} />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Trocar email
        </Button>
      </form>
    </Form>
  )
}
