import { useState } from "react"

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
import { MenuItemCard } from "./MenuItemCard"
import { ProductModal } from "./ProductModal"

export const description =
  "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions."

export function StoreMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [productList, setProductList] = useState(initialProductList) // State para armazenar a lista de produtos

  const handleOpenModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  // Função para atualizar o produto na lista
  const handleUpdateProduct = (updatedProduct) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    )
  }

  return (
    <div>
      <Card className="border-none shadow-none">
        <CardHeader className="flex-row items-center justify-between text-2xl">
          <CardTitle>Cardápio</CardTitle>

          <Button size="sm" className="m-0 items-center gap-1 text-lg">
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              + Adicionar produto
            </span>
          </Button>
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
                  {...product}
                  onClick={() => handleOpenModal(product)} // Passa a função para abrir o modal
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        onSubmitForm={handleUpdateProduct} // Certifique-se de que a função correta está sendo passada
      />
    </div>
  )
}
