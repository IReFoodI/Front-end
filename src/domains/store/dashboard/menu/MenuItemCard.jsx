/* eslint-disable react-hooks/exhaustive-deps */
import { IconDots, IconPhotoOff } from "@tabler/icons-react"
import { memo, useEffect, useState } from "react"
import { toast } from "sonner"

import { currencyFormatter } from "@/app/utils/currencyFormatter"
import { DatePickerSingle } from "@/domains/store/dashboard/DatePicker"
import imageBroke from "@/ui/assets/image-broke.png"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/components/ui/dropdown-menu"
import { Input } from "@/ui/components/ui/input"
import { Switch } from "@/ui/components/ui/switch"
import { TableCell, TableRow } from "@/ui/components/ui/table"

export const MenuItemCard = memo(function MenuItemCard({
  product,
  setIsModalOpen,
  setIsDeleteModalOpen,
  setSelectedProduct,
  onStatusChange,
}) {
  const {
    nameProd = "",
    urlImgProd = "",
    descriptionProd: initialDescription,
    active: initialStatus,
    expirationDate: initialExpirationDate,
    quantity: initialQuantity,
    originalPrice: initialOriginalPrice,
    sellPrice: initialSellPrice,
    categoryProduct: categoryProduct,
  } = product
  const [expirationDate, setExpirationDate] = useState(
    initialExpirationDate ? new Date(initialExpirationDate) : null
  )
  const [description, setDescription] = useState(initialDescription || "")
  const [originalPrice, setOriginalPrice] = useState(
    currencyFormatter(initialOriginalPrice || 0)
  )
  const [sellPrice, setSellPrice] = useState(
    currencyFormatter(initialSellPrice || 0)
  )
  const [active, setActive] = useState(!!initialStatus)

  const handleChange = (setter) => (e) => {
    setter(e.target.value)
  }

  const handleStatusChange = (checked) => {
    if (checked && verifyExperationDate()) {
      toast.error(`${nameProd} está vencido!`)
      return
    }
    setActive(checked)
    onStatusChange(product.productId, checked)
  }

  const openEditModal = () => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const openDeleteModal = () => {
    setSelectedProduct(product)
    setIsDeleteModalOpen(true)
  }

  useEffect(() => {
    if (verifyExperationDate()) {
      if (initialStatus) {
        setActive(false)
        onStatusChange(product.productId, false)
      }
    }
  }, [expirationDate, nameProd, onStatusChange, product.productId])

  function verifyExperationDate() {
    const currentDate = new Date()
    const expirationDateObj = new Date(expirationDate)
    expirationDateObj.setHours(0, 0, 0, 0)
    return (
      expirationDateObj && expirationDateObj < currentDate.setHours(0, 0, 0, 0)
    )
  }

  const disabledClass = active ? "" : "opacity-50"

  return (
    <TableRow className={disabledClass}>
      <TableCell className="hidden h-16 w-16 sm:table-cell">
        {urlImgProd ? (
          <img
            alt={nameProd || "Product image"}
            className="aspect-square rounded-md object-cover"
            height="64"
            src={urlImgProd}
            width="64"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = imageBroke
            }}
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded bg-primary/20">
            <IconPhotoOff size={34} className="object-cover text-primary" />
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">{nameProd}</TableCell>
      <TableCell className={`pointer-events-none hidden w-32 lg:table-cell`}>
        <Input
          type="text"
          disabled={!active}
          defaultValue={categoryProduct}
          readOnly
          placeholder="Categoria"
          className="text-center"
        />
      </TableCell>
      <TableCell className={`pointer-events-none hidden w-72 lg:table-cell`}>
        <Input
          type="text"
          disabled={!active}
          defaultValue={description}
          onChange={setDescription}
          placeholder="Descrição do produto"
        />
      </TableCell>
      <TableCell className={`pointer-events-none hidden md:table-cell`}>
        <DatePickerSingle
          classCustom={`${verifyExperationDate() && "border-red-500 border-2"}`}
          value={expirationDate}
          onChange={setExpirationDate}
        />
      </TableCell>
      <TableCell className="pointer-events-none w-28">
        <Input
          type="text"
          value={initialQuantity}
          readOnly
          placeholder="Quantidade"
          className="text-center"
        />
      </TableCell>
      <TableCell className={`pointer-events-none hidden w-28 md:table-cell`}>
        <Input
          type="text"
          value={originalPrice}
          readOnly
          onChange={handleChange(setOriginalPrice)}
          placeholder="Preço Original"
        />
      </TableCell>
      <TableCell className="pointer-events-none w-28">
        <Input
          type="text"
          value={sellPrice}
          onChange={handleChange(setSellPrice)}
          placeholder="Preço de Venda"
          className="w-20"
        />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Switch checked={active} onCheckedChange={handleStatusChange} />
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <IconDots size={25} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-16">
            <DropdownMenuItem onClick={openEditModal}>Editar</DropdownMenuItem>
            <DropdownMenuItem onClick={openDeleteModal}>
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  )
})
