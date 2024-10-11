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
}) {
  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
    setSelectedProduct(null)
  }

  function handleDeleteProduct() {
    //todo fazer função de deletar produto
    console.log("deletando")
    handleCloseDeleteModal()
  }
  return (
    <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
      <AlertDialogHeader>
        <AlertDialogTitle />
        <AlertDialogDescription />
      </AlertDialogHeader>
      <AlertDialogContent>
        <h2 className="font-medi text-lg">
          Deseja deletar o produto {selectedProduct?.name}?
        </h2>
        <AlertDialogFooter className="flex flex-col items-center justify-center gap-1 md:flex-row md:gap-4">
          <AlertDialogCancel onClick={handleCloseDeleteModal}>
            Cancelar
          </AlertDialogCancel>
          <Button
            type="submit"
            onClick={handleDeleteProduct}
            className="!ml-0 !mr-0 md:px-6"
          >
            Deletar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
