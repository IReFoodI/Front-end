import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { DatePickerSingle } from "@/domains/store/dashboard/DatePicker"
import { Button } from "@/ui/components/ui/button/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/ui/components/ui/form/form"
import { Input } from "@/ui/components/ui/input"

import { productSchema } from "../../model/ProductTypes"
import { QuantityInput } from "./QuantityInput"
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
      {/* Overlay background */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative z-10 mx-auto w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-800"
        >
          <span className="sr-only">Fechar</span>
          &times;
        </button>

        <div className="grid grid-rows-[auto,1fr,auto] gap-4">
          <img
            src={product.photo}
            alt={product.name}
            className="h-auto w-full"
          />

          <Form {...form}>
            <div className="grid grid-cols-2 gap-4">
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

            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="expirationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DatePickerSingle
                        type="date"
                        {...field}
                        className="w-1/2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <QuantityInput items={form.watch("quantity")} />
              </FormItem>

              <FormField
                control={form.control}
                name="originalPrice"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
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

            <Button type="submit" onClick={onSubmit}>
              Confirmar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
