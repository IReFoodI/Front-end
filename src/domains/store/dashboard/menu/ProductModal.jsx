import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { DatePickerSingle } from "@/domains/store/dashboard/DatePicker"
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

import { productSchema } from "../../model/ProductTypes"
export function ProductModal({ onClose, product }) {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ? product.name : "",
      description: product?.description ? product.description : "",
      expirationDate: product?.expirationDate
        ? new Date(product.expirationDate)
        : null,
      quantity: product?.quantity ? product.quantity : 0,
      originalPrice: product?.originalPrice ? product.originalPrice : 0,
      sellPrice: product?.sellPrice ? product.sellPrice : 0,
    },
  })

  if (!product) return null
  const onSubmit = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative z-10 mx-auto rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
        >
          <span className="sr-only">Fechar</span>
          &times;
        </button>

        <div className="gap-4">
          <h1 className="mb-2 flex w-full justify-center text-center text-xl font-semibold">
            Adicionar Produto
          </h1>
          <img
            src={product.photo}
            alt={product.name}
            className="my-2 h-auto w-full"
          />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="my-2 grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Nome do Produto"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Descrição"
                          {...field}
                          maxLength={200}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-2 grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="expirationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Validade</FormLabel>
                      <DatePickerSingle {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Quantidade"
                          {...field}
                          min={0}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="originalPrice"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preço Original</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Preço Original *"
                          {...field}
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sellPrice"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Preço de Venda</FormLabel>

                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Preço de Venda *"
                          {...field}
                          min={0}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  onClick={onClose}
                  variant="secondary"
                  className="md:px-6"
                >
                  Cancelar
                </Button>
                <Button onClick={onSubmit} className="!ml-0 !mr-0 md:px-6">
                  Confirmar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
