import { useState } from "react"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/components/ui/alert-dialog"
import { Button } from "@/ui/components/ui/button/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/components/ui/card"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/components/ui/table"

import { productList as initialProductList } from "../../model/productList"
import { DeleteProductModal } from "./DeleteProductModal"
import { MenuItemCard } from "./MenuItemCard"
import { ProductModal } from "./ProductModal"

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions."

export function StoreMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState({})
  const [productList /* setProductList */] = useState(initialProductList) // State para armazenar a lista de produtos

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }
  //todo fazer a parte de atualizar o produto
  // Função para atualizar o produto na lista
  // const handleUpdateProduct = (updatedProduct) => {
  //   setProductList((prevList) =>
  //     prevList.map((product) =>
  //       product.id === updatedProduct.id ? updatedProduct : product
  //     )
  //   )
  // }

  return (
    <div>
      <Card className="border-none shadow-none">
        <CardHeader className="flex-row items-center justify-between text-2xl">
          <CardTitle>Cardápio</CardTitle>

          <AlertDialog open={isModalOpen}>
            <AlertDialogTrigger onClick={handleOpenModal} asChild>
              <Button size="sm" className="m-0 items-center gap-1 text-lg">
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  + Adicionar produto
                </span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="min-w-fit">
              <AlertDialogHeader>
                <AlertDialogTitle />
                <AlertDialogDescription />
              </AlertDialogHeader>
              <ProductModal
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                setIsModalOpen={setIsModalOpen}
                isModalOpen={isModalOpen}
              />
            </AlertDialogContent>
          </AlertDialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="border-b-2 border-t-2 border-secondary-foreground">
              <TableRow>
                <TableHead className="text-center">Foto</TableHead>
                <TableHead className="text-center">Nome</TableHead>
                <TableHead className="text-center">Descrição</TableHead>
                <TableHead className="hidden text-center md:table-cell">
                  Validade
                </TableHead>
                <TableHead className="hidden text-center md:table-cell">
                  Quantidade
                </TableHead>
                <TableHead className="hidden text-center md:table-cell">
                  Valor Original
                </TableHead>
                <TableHead className="hidden text-center md:table-cell">
                  Valor Venda
                </TableHead>
                <TableHead className="hidden text-center md:table-cell">
                  Status
                </TableHead>
                <TableHead className="text-center">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Renderizando um MenuItemCard para cada produto */}
              {productList.map((product) => (
                <MenuItemCard
                  key={product.id}
                  product={product}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  setIsModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Exibindo{" "}
            <strong>
              1-
              {initialProductList.length < 10 ? initialProductList.length : 10}
            </strong>{" "}
            de <strong>{initialProductList.length}</strong> produtos
          </div>
        </CardFooter>
      </Card>
      <DeleteProductModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </div>
  )
}
