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

import { productList as initialProductList } from "../../models/productList"
import { DeleteProductModal } from "./DeleteProductModal"
import { MenuItemCard } from "./MenuItemCard"
import { ProductModal } from "./ProductModal"

export function StoreMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState({})
  const [productList, setProductList] = useState(initialProductList)

  const handleStatusChange = (id, newStatus) => {
    setProductList((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, status: newStatus } : product
      )
    )
  }

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
    <div className="w-full">
      <Card className="border-none shadow-none">
        <CardHeader className="flex-row items-center justify-between text-2xl">
          <CardTitle>Cardápio</CardTitle>

          <AlertDialog open={isModalOpen}>
            <AlertDialogTrigger onClick={handleOpenModal} asChild>
              <Button
                size="sm"
                className="m-0 !mt-0 items-center gap-1 text-lg"
              >
                <span className="m-0 text-base">+ Adicionar produto</span>
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
                <TableHead className="hidden text-center md:table-cell">
                  Foto
                </TableHead>
                <TableHead className="text-left md:text-center">Nome</TableHead>
                <TableHead className="hidden text-center md:table-cell">
                  Descrição
                </TableHead>
                <TableHead className="hidden text-center md:table-cell">
                  Validade
                </TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead className="hidden text-center md:table-cell">
                  Valor Original
                </TableHead>
                <TableHead className="text-center md:table-cell">
                  Valor Venda
                </TableHead>
                <TableHead className="hidden text-center">Status</TableHead>
                <TableHead className="text-center">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productList.map((product) => (
                <MenuItemCard
                  key={product.id}
                  product={product}
                  setIsDeleteModalOpen={setIsDeleteModalOpen}
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  setIsModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
                  onStatusChange={handleStatusChange}
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
