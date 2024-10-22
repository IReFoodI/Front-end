import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
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
import { Switch } from "@/ui/components/ui/switch"

import { productSchema } from "../../model/ProductTypes"

export function ProductModal({
  selectedProduct,
  setSelectedProduct,
  setIsModalOpen,
}) {
  const [image, setImage] = useState(selectedProduct?.image || "")
  const [dragActive, setDragActive] = useState(false)
  const [status, setStatus] = useState(selectedProduct?.status ?? false)

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: selectedProduct?.name || "",
      description: selectedProduct?.description || "",
      expirationDate: selectedProduct?.expirationDate
        ? new Date(selectedProduct.expirationDate)
        : null,
      quantity: selectedProduct?.quantity
        ? String(selectedProduct.quantity)
        : "0",
      originalPrice: selectedProduct?.originalPrice
        ? String(selectedProduct.originalPrice)
        : "0",
      sellPrice: selectedProduct?.sellPrice
        ? String(selectedProduct.sellPrice)
        : "0",
    },
  })

  function handleCloseModal() {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const onSubmit = (data) => {
    console.log({ ...data, status, image })
    handleCloseModal()
  }

  const handleStatusChange = (checked) => {
    setStatus(checked)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => setDragActive(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImage(reader.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 mx-auto rounded-lg bg-white p-6 shadow-lg">
        <div className="gap-4">
          <h1 className="mb-2 flex w-full justify-center text-center text-xl font-semibold">
            {selectedProduct === null ? "Adicionar Produto" : "Editar Produto"}
          </h1>
          <div className="flex w-full flex-col items-center">
            <div
              className={`my-2 aspect-square w-1/3 border-2 ${
                dragActive ? "border-blue-500" : "border-dashed"
              } flex items-center justify-center rounded-md`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <p className="text-center">
                  Arraste uma imagem ou clique para selecionar
                </p>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <Button
              type="button"
              onClick={() =>
                document.querySelector('input[type="file"]')?.click()
              }
            >
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
                        <Input {...field} maxLength={200} />
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
                        <Input {...field} maxLength={200} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="my-2 grid grid-cols-2 gap-4 md:grid-cols-4">
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
                          {...field}
                          min={0}
                          onFocus={(e) =>
                            e.target.value === "0" && (e.target.value = "")
                          }
                          onBlur={(e) =>
                            e.target.value === "" && (e.target.value = "0")
                          }
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
                          step="0.01"
                          {...field}
                          min={0}
                          onFocus={(e) =>
                            e.target.value === "0" && (e.target.value = "")
                          }
                          onBlur={(e) =>
                            e.target.value === "" && (e.target.value = "0")
                          }
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
                          step="0.01"
                          {...field}
                          min={0}
                          onFocus={(e) =>
                            e.target.value === "0" && (e.target.value = "")
                          }
                          onBlur={(e) =>
                            e.target.value === "" && (e.target.value = "0")
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between">
                <FormItem className="flex items-center">
                  <FormLabel className="mr-2">Status</FormLabel>{" "}
                  <FormControl>
                    <Switch
                      className="!mt-0"
                      checked={status}
                      onCheckedChange={handleStatusChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                <AlertDialogFooter className="flex flex-row items-center justify-center gap-4">
                  <AlertDialogCancel
                    className="mt-0"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </AlertDialogCancel>
                  <Button type="submit" className="!ml-0 !mr-0 md:px-6">
                    Confirmar
                  </Button>
                </AlertDialogFooter>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}