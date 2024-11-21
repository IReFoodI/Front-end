import { zodResolver } from "@hookform/resolvers/zod"
import { IconArrowLeft } from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import { PatternFormat } from "react-number-format"
import { Link, useNavigate } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { cn } from "@/app/utils/cn"
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
import { Loading } from "@/ui/components/ui/loading"

import { creditCardSchema } from "../../models/CreditCardTypes"
import {
  createCreditCard,
  updateCreditCard,
} from "../../services/credit-card-service"
import cardStore from "../../stores/cardStore"
import { CardExpiryFormat } from "./CardExpiryFormat"

export function AddEditCard({ type = "add", card, closeModal }) {
  const navigate = useNavigate()
  const { addCard, updateCard } = cardStore()
  const form = useForm({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      number: card?.number ? card.number : "",
      holderName: card?.holderName ? card.holderName : "",
      cpf: card?.cpf ? card.cpf : "",
      validity: card?.validity ? card.validity : "",
      cvv: card?.cvv ? card.cvv : "",
    },
  })
  const { loading, onRequest } = useFetch()

  const { watch } = form
  const [number, holderName, validity] = watch([
    "number",
    "holderName",
    "validity",
  ])

  function redirect() {
    navigate("/cartoes")
  }

  function handleEditSuccess(data) {
    closeModal()
    updateCard(data)
  }

  function handleAddSuccess(data) {
    redirect()
    addCard(data)
  }

  const onSubmit = async (formData) => {
    if (type === "edit") {
      await onRequest({
        request: () => updateCreditCard({ ...formData, cardId: card?.cardId }),
        onSuccess: handleEditSuccess,
        successMessage: "Cartão editado com sucesso!",
        errorMessage: "Ocorreu um erro ao tentar editar o cartão.",
      })
    } else if (type === "add") {
      await onRequest({
        request: () => createCreditCard(formData),
        onSuccess: handleAddSuccess,
        successMessage: "Cartão cadastrado com sucesso!",
        errorMessage: "Ocorreu um erro ao tentar cadastrar o cartão.",
      })
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center justify-center p-3 md:p-4 lg:p-5">
      <div className="relative flex h-full w-full max-w-[35rem] items-center justify-center pb-2">
        <Link
          to="/cartoes"
          className={cn(
            "absolute left-5 hidden text-primary md:flex lg:hidden",
            type !== "add" && "!hidden"
          )}
          title="Voltar para cartões"
        >
          <IconArrowLeft className="text-primary" />
        </Link>
        <h1 className="flex w-full justify-center text-center text-xl font-semibold lg:hidden">
          {type === "add" ? "Adicionar" : "Editar"} Cartão
        </h1>
      </div>
      <div className="flex w-full min-w-[19rem] flex-col items-center justify-center gap-3 lg:flex-row lg:gap-10">
        <section
          id="credit-card"
          className="flex max-h-52 min-h-44 w-full min-w-80 max-w-[26.5rem] flex-col items-start justify-end gap-3 rounded-xl bg-gray-600 p-4 font-semibold text-zinc-50 lg:order-2"
        >
          <p className="text-lg">
            {number === "" ? "Número do cartão" : number}
          </p>
          <div className="flex w-full items-center justify-between gap-2 text-sm">
            <p className="max-w-64 truncate">
              {holderName === "" ? "Nome do Titular" : holderName}
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
            <div className="relative hidden w-full justify-center text-center text-xl font-semibold lg:flex">
              <Link
                to="/cartoes"
                className={cn(
                  "absolute left-5 hidden text-primary lg:flex",
                  type !== "add" && "!hidden"
                )}
                title="Voltar para cartões"
              >
                <IconArrowLeft className="text-primary" />
              </Link>
              <h1 className="hidden w-full justify-center text-center text-xl font-semibold lg:flex">
                {type === "add" ? "Adicionar" : "Editar"} Cartão
              </h1>
            </div>
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
              name="holderName"
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
                  type="button"
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
