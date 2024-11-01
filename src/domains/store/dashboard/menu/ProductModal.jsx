import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { useFetch } from "@/app/hooks/useFetch"
import { DatePickerSingle } from "@/domains/store/dashboard/DatePicker"
import { productService } from "@/domains/store/hooks/useProdutcList"
import { productSchema } from "@/domains/store/models/ProductTypes"
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

import { CategorySelect } from "./CategorySelect"

export function ProductModal({
  selectedProduct,
  setSelectedProduct,
  setIsModalOpen,
  fetchProducts,
}) {
  const [urlImgProd, seturlImgProd] = useState(
    selectedProduct?.urlImgProd || ""
  )
  const [dragActive, setDragActive] = useState(false)
  const [active, setActive] = useState(selectedProduct?.active ?? false)
  const { data, loading, onRequest, error } = useFetch()
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nameProd: selectedProduct?.nameProd || "",
      categoryProduct: selectedProduct?.categoryProduct || "",
      descriptionProd: selectedProduct?.descriptionProd || "",
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

  const handleStatusChange = (checked) => setActive(checked)

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const formData = new FormData()
      formData.append("file", file)
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        toast.error("A imagem deve ter no máximo 1MB")
        return
      }
      try {
        const uploadResponse = await axios.post(
          "http://localhost:8080/api/firebase/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        seturlImgProd(uploadResponse.data)
      } catch (error) {
        console.error("Erro ao fazer upload da imagem:", error)
      }
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
      reader.onload = () => seturlImgProd(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    try {
      const productData = {
        ...data,
        active,
        urlImgProd,
        additionDate: new Date().toISOString(),
        restaurantId: 0,
      }
      await onRequest({
        request: () => productService.postRestaurantProducts(productData),
        onSuccess: () => {
          toast.success("Produto criado com sucesso!")
          fetchProducts()
        },
        onError: (error) => console.error(error),
      })
      handleCloseModal()
    } catch (error) {
      console.error("Erro ao criar o produto:", error)
      if (error.response) {
        console.error("Response data:", error.response.data)
        console.error("Response status:", error.response.status)
      }
    }
    handleCloseModal()
  }

  const handleChange = async (productId, data) => {
    console.log(data)
    const produtctUpdate = {
      ...data,
      active,
      urlImgProd,
      additionDate: new Date().toISOString(),
    }
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/product/${productId}`,
        produtctUpdate,
        { headers: { "Content-Type": "application/json" } }
      )

      if (response.status !== 200) {
        throw new Error("Erro ao atualizar o status do produto.")
      }
      toast.success("Produto editado com sucesso!")

      fetchProducts()
    } catch (error) {
      console.error("Erro ao atualizar o status:", error)
      if (error.response) {
        console.error("Response data:", error.response.data)
        console.error("Response status:", error.response.status)
      }
    }
    handleCloseModal()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 mx-auto rounded-lg bg-white p-6 shadow-lg">
        <div>
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
              {urlImgProd ? (
                <img
                  src={urlImgProd}
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
                accept="urlImgProd/*"
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
              onSubmit={form.handleSubmit((data) =>
                selectedProduct
                  ? handleChange(selectedProduct.productId, data)
                  : onSubmit(data)
              )}
              className="flex flex-col gap-4 gap-y-2"
            >
              <div className="my-2 grid grid-cols-2 gap-4 gap-y-2">
                <FormField
                  control={form.control}
                  name="nameProd"
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
                  name="categoryProduct"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <CategorySelect {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="descriptionProd"
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
                      className="!mt-0 mr-4"
                      checked={active}
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
