import { zodResolver } from "@hookform/resolvers/zod"
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
import { PasswordInput } from "@/ui/components/ui/passwordInput"

import { changePasswordTypes } from "../../models/dashboard/ChangePasswordTypes"
import { restaurantService } from "../../services/restaurantService"

export function ChangePasswordForm() {
  const { loading, onRequest } = useFetch()
  const form = useForm({
    resolver: zodResolver(changePasswordTypes),
    defaultValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
  })
  function handleSubmitError(error) {
    console.log(error)
  }
  function handleSubmitSuccess() {
    toast.success("Troca de senha efetuada com sucesso!")
    form.reset()
  }

  const onSubmit = async (data) => {
    await onRequest({
      request: () => restaurantService.updateRestaurantPassword(data),
      onSuccess: handleSubmitSuccess,
      onError: handleSubmitError,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-1 flex-col justify-end gap-2 text-left"
      >
        <FormField
          id="oldPassword"
          name="oldPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha atual</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Senha atual"
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
                  placeholder="Senha nova"
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
                  placeholder="Senha nova"
                  className={"!mt-1"}
                  {...field}
                />
              </FormControl>
              <FormMessage className={"text-xs"} />
            </FormItem>
          )}
        />

        <Button type="submit">Trocar senha</Button>
      </form>
    </Form>
  )
}
