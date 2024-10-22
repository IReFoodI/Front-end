import { useState } from "react"

import {
  AlertDialog,
  AlertDialogContent,
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

import { useProducts } from "../../hooks/useProdutcList"
import { DeleteProductModal } from "./DeleteProductModal"
import { MenuItemCard } from "./MenuItemCard"
import { ProductModal } from "./ProductModal"

export function StoreMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { products, loading, restaurantId, handleStatusChange } = useProducts() // Adicione handleStatusChange aqui

  return (
    <div className="w-full">
      <Card className="border-none shadow-none">
        <CardHeader className="flex-row items-center justify-between text-2xl">
          <CardTitle>Cardápio</CardTitle>

          <AlertDialog open={isModalOpen}>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                className="m-0 !mt-0 items-center gap-1 text-lg"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="m-0 text-base">+ Adicionar produto</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Produto</AlertDialogTitle>
              </AlertDialogHeader>
              <ProductModal
                setIsModalOpen={setIsModalOpen}
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct}
                restaurantId={restaurantId}
              />
            </AlertDialogContent>
          </AlertDialog>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden md:table-cell">Foto</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden md:table-cell">
                  Descrição
                </TableHead>
                <TableHead className="hidden md:table-cell">Validade</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead className="hidden md:table-cell">
                  Valor Original
                </TableHead>
                <TableHead>Valor Venda</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead>Ação</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                <TableRow>
                  <td colSpan="8" className="text-center">
                    Carregando produtos...
                  </td>
                </TableRow>
              ) : (
                products.map((product) => (
                  <MenuItemCard
                    key={product.productId}
                    product={product}
                    setIsModalOpen={setIsModalOpen}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    setSelectedProduct={setSelectedProduct}
                    onStatusChange={handleStatusChange}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter>
          <div className="text-xs">
            Exibindo <strong>1-{Math.min(products.length, 10)}</strong> de{" "}
            <strong>{products.length}</strong> produtos
          </div>
        </CardFooter>
      </Card>

      <DeleteProductModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedProduct={selectedProduct}
      />
    </div>
  )
}
