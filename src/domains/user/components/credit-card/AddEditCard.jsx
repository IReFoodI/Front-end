import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PatternFormat } from "react-number-format"

import { AlertDialogFooter } from "@/ui/components/ui/alert-dialog"
import { Button } from "@/ui/components/ui/button/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/ui/components/ui/form/form"
import { Input } from "@/ui/components/ui/input"

import { creditCardSchema } from "../../models/CreditCardTypes"
import { CardExpiryFormat } from "./CardExpiryFormat"

export function AddEditCard({ type = "add", card, closeModal }) {
  const form = useForm({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      number: card?.number ? card.number : "",
      name: card?.name ? card.name : "",
      cpf: card?.cpf ? card.cpf : "",
      validity: card?.validity ? card.validity : "",
      cvv: card?.cvv ? card.cvv : "",
    },
  })

  const { watch } = form
  const [number, name, validity] = watch(["number", "name", "validity"])

  const onSubmit = (data) => {
    try {
      console.log(data)
      {
        type === "edit" && closeModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center justify-center">
      <h1 className="mb-2 flex w-full justify-center text-center text-xl font-semibold md:hidden">
        {type === "add" ? "Adicionar" : "Editar"} Cartão
      </h1>
      <div className="flex w-full min-w-[19rem] flex-col items-center justify-center gap-3 md:flex-row md:gap-10">
        <section
          id="credit-card"
          className="flex max-h-52 min-h-44 w-full min-w-80 flex-col items-start justify-end gap-3 rounded-xl bg-gray-600 p-4 font-semibold text-zinc-50 md:order-2"
        >
          <p className="text-lg">
            {number === "" ? "Número do cartão" : number}
          </p>
          <div className="flex w-full items-center justify-between gap-2 text-sm">
            <p className="max-w-64 truncate">
              {name === "" ? "Nome do Titular" : name}
            </p>
            <p className="min-w-14 items-center justify-center">
              {validity === "" ? "Validade" : validity}
            </p>
          </div>
        </section>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 md:min-w-[35rem]"
          >
            <h1 className="hidden w-full justify-center text-center text-xl font-semibold md:flex">
              {type === "add" ? "Adicionar" : "Editar"} Cartão
            </h1>
            <FormField
              control={form.control}
              name="number"
              render={({ field: { onChange, name, value, ref, onBlur } }) => (
                <FormItem>
                  <FormControl>
                    <PatternFormat
                      onChange={onChange}
                      name={name}
                      value={value}
                      getInputRef={ref}
                      onBlur={onBlur}
                      autoFocus
                      format="#### #### #### ####"
                      customInput={Input}
                      placeholder="Número do Cartão *"
                      mask="_"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Nome do Titular *"
                      {...field}
                      maxLength={200}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field: { onChange, name, value, ref, onBlur } }) => (
                <FormItem>
                  <FormControl>
                    <PatternFormat
                      onChange={onChange}
                      name={name}
                      value={value}
                      getInputRef={ref}
                      onBlur={onBlur}
                      format="###.###.###-##"
                      customInput={Input}
                      placeholder="CPF do Titular *"
                      mask="_"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid w-full grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="validity"
                render={({ field: { onChange, name, value, ref, onBlur } }) => (
                  <FormItem>
                    <FormControl>
                      <CardExpiryFormat
                        onChange={onChange}
                        name={name}
                        value={value}
                        getInputRef={ref}
                        onBlur={onBlur}
                        customInput={Input}
                        placeholder="Validade *"
                        mask="_"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field: { onChange, name, value, ref, onBlur } }) => (
                  <FormItem>
                    <FormControl>
                      <PatternFormat
                        onChange={onChange}
                        name={name}
                        value={value}
                        getInputRef={ref}
                        onBlur={onBlur}
                        format="###"
                        customInput={Input}
                        placeholder="CVV *"
                        mask="_"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {type === "edit" ? (
              <AlertDialogFooter className="flex flex-col items-center justify-center gap-1 md:flex-row md:gap-4">
                <Button
                  onClick={closeModal}
                  variant="secondary"
                  className="w-full md:px-6"
                >
                  Cancelar
                </Button>
                <Button className="!ml-0 !mr-0 w-full md:px-6">
                  Editar cartão
                </Button>
              </AlertDialogFooter>
            ) : (
              <Button>Adicionar novo cartão</Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}
