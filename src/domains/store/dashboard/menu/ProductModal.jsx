import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { DatePickerSingle } from "@/domains/store/dashboard/DatePicker"
import {
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/ui/components/ui/alert-dialog"
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

import { editProductSchema, productSchema } from "../../model/ProductTypes"
export function ProductModal({
  selectedProduct,
  setSelectedProduct,
  setIsModalOpen,
}) {
  const form = useForm({
    resolver: zodResolver(selectedProduct ? editProductSchema : productSchema),
    defaultValues: {
      name: selectedProduct?.name ? selectedProduct.name : "",
      description: selectedProduct?.description
        ? selectedProduct.description
        : "",
      expirationDate: selectedProduct?.expirationDate
        ? new Date(selectedProduct.expirationDate)
        : null,
      quantity: selectedProduct?.quantity ? selectedProduct.quantity : 0,
      originalPrice: selectedProduct?.originalPrice
        ? selectedProduct.originalPrice
        : 0,
      sellPrice: selectedProduct?.sellPrice ? selectedProduct.sellPrice : 0,
    },
  })

  function handleCloseModal() {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const onSubmit = (data) => {
    console.log(data)
    handleCloseModal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 mx-auto rounded-lg bg-white p-6 shadow-lg">
        <div className="gap-4">
          <h1 className="mb-2 flex w-full justify-center text-center text-xl font-semibold">
            Adicionar Produto
          </h1>
          <div className="flex w-full flex-col items-center">
            <img
              src={selectedProduct?.image}
              alt={name}
              className="my-2 aspect-square w-1/3"
            />
            <Button type="button" className="!ml-0 !mr-0 md:px-6">
              Adicionar imagem
            </Button>
          </div>
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
                      <FormLabel>Nome do produto</FormLabel>
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
                      <FormLabel>Descrição</FormLabel>
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
                      <DatePickerSingle {...field} ref={null} />
                      <FormMessage />
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
                      <FormMessage />
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
                <AlertDialogFooter className="flex flex-col items-center justify-center gap-1 md:flex-row md:gap-4">
                  <AlertDialogCancel onClick={handleCloseModal}>
                    Cancelar
                  </AlertDialogCancel>
                  <Button type="submit" className="!ml-0 !mr-0 md:px-6">
                    Confirmar
                  </Button>
                  {/* <Button
                    type="button"
                    variant="secondary"
                    className="w-full md:px-6"
                  >
                    Cancelar
                  </Button>
                  <Button className="!ml-0 !mr-0 w-full md:px-6">
                    Confirmar
                  </Button> */}
                </AlertDialogFooter>
                {/* <Button variant="secondary" className="md:px-6">
                  Cancelar
                </Button>
                <Button onClick={onSubmit} className="!ml-0 !mr-0 md:px-6">
                  Confirmar
                </Button> */}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
