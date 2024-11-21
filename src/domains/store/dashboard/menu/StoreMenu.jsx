import { IconChefHat } from "@tabler/icons-react"
import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"
import { productService } from "@/domains/store/services/productListService"
import { NotFound } from "@/ui/components/NotFound"
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

import { DeleteProductModal } from "./DeleteProductModal"
import { MenuItemCard } from "./MenuItemCard"
import { ProductModal } from "./ProductModal"

export function StoreMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [localProducts, setLocalProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(0)

  const { data, onRequest } = useFetch()
  const navigate = useNavigate()
  const location = useLocation()
  const currentPageFromUrl =
    parseInt(new URLSearchParams(location.search).get("page")) || 0

  const fetchProducts = useCallback(async () => {
    await onRequest({
      request: () => productService.getRestaurantProducts(currentPage),
      onError: (erro) => {
        if (erro.response.data.status === 400) navigate(`?page=${0}`)
      },
    })
  }, [onRequest, currentPage, navigate])

  useEffect(() => {
    if (data?._embedded?.productDTOList) {
      setLocalProducts(data._embedded.productDTOList)
    }
  }, [data])

  const updateProduct = useCallback(
    (id, data) => {
      onRequest({
        request: () => productService.updateProduct(id, data),
        onSuccess: fetchProducts,
        errorMessage: "Erro ao atualizar o produto.",
      })
    },
    [onRequest, fetchProducts]
  )

  const handleStatusChange = useCallback(
    (productId, newStatus) => {
      updateProduct(productId, { active: newStatus })
      setLocalProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === productId
            ? { ...product, active: newStatus }
            : product
        )
      )
    },
    [updateProduct]
  )

  useEffect(() => {
    setCurrentPage(currentPageFromUrl)
    fetchProducts()
  }, [fetchProducts, currentPageFromUrl])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    navigate(`?page=${newPage}`)
  }

  return (
    <div className="w-full">
      <Card className="border-none shadow-none">
        <CardHeader className="flex-row items-center justify-between text-2xl">
          <CardTitle>Cardápio</CardTitle>
          <ProductModal
            setIsModalOpen={setIsModalOpen}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
            fetchProducts={fetchProducts}
            isModalOpen={isModalOpen}
          />
        </CardHeader>

        <CardContent>
          {localProducts.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden md:table-cell">Foto</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="hidden w-20 lg:table-cell">
                      Categoria
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Descrição
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Validade
                    </TableHead>
                    <TableHead>Quantidade</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Valor Original
                    </TableHead>
                    <TableHead>Valor Venda</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Status
                    </TableHead>
                    <TableHead>Ação</TableHead>
                  </TableRow>
                </TableHeader>
                {localProducts && (
                  <TableBody>
                    {localProducts.map((product) => (
                      <MenuItemCard
                        key={product.productId}
                        product={product}
                        setIsModalOpen={setIsModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        setSelectedProduct={setSelectedProduct}
                        onStatusChange={handleStatusChange}
                      />
                    ))}
                  </TableBody>
                )}
              </Table>

              <div className="mt-4 flex justify-between">
                <Button
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 0}
                >
                  Página Anterior
                </Button>
                <Button
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === data?.page?.totalPages - 1}
                >
                  Próxima Página
                </Button>
              </div>
              <CardFooter>
                <div className="text-xs">
                  Exibindo <strong>{currentPage + 1}</strong> de{" "}
                  <strong>{data?.page?.totalPages}</strong> páginas
                </div>
              </CardFooter>
            </>
          ) : (
            <NotFound
              Icon={IconChefHat}
              title={"Você ainda não cadastrou nenhuma produto!"}
              description={"Cadastre produtos para exibir a listagem!"}
              linkTo={"/"}
              textButton={""}
            />
          )}
        </CardContent>
      </Card>

      <DeleteProductModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        fetchProducts={fetchProducts}
      />
    </div>
  )
}
