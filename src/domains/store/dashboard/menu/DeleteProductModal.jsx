import { useFetch } from "@/app/hooks/useFetch"
import { imageService } from "@/app/service/imageService"
import { productService } from "@/domains/store/services/productListService"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/ui/components/ui/alert-dialog"
import { Button } from "@/ui/components/ui/button/button"

export function DeleteProductModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedProduct,
  setSelectedProduct,
  fetchProducts,
}) {
  const { onRequest, loading } = useFetch()

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
    setSelectedProduct(null)
  }

  async function handleDeleteProduct() {
    const id = selectedProduct.productId
    const urlImgProd = selectedProduct.urlImgProd
    await onRequest({
      request: () => productService.deleteProduct(id),
      onSuccess: () => {
        setIsDeleteModalOpen(false)
        fetchProducts()
        onRequest({
          request: () => imageService.deleteImage(urlImgProd),
        })
      },
      onError: setIsDeleteModalOpen(false),
      successMessage: "Produto excluído com sucesso!",
    })
  }
  return (
    <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <AlertDialogHeader>
        <AlertDialogTitle />
        <AlertDialogDescription />
      </AlertDialogHeader>
      <AlertDialogContent>
        <h2 className="font-medi text-lg">
          Deseja deletar o produto{" "}
          <span className="font-medium">{selectedProduct?.nameProd}</span>?
        </h2>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel className="!mt-0" onClick={handleCloseDeleteModal}>
            Cancelar
          </AlertDialogCancel>
          <Button
            disabled={loading}
            type="submit"
            onClick={handleDeleteProduct}
            className="!ml-0 !mr-0"
          >
            Deletar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
