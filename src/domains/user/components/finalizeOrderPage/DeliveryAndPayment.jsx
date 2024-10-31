import { Dialog } from "@radix-ui/react-dialog"
import { RadiobuttonIcon } from "@radix-ui/react-icons"
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { SheetHeader, SheetTitle } from "@/ui/components/ui/sheet"
const DeliveryAndPayment = () => {
  return (
    <div className="flex flex-col gap-8">
      <Dialog>
        {/* ENTREGA */}
        <SheetHeader className="flex flex-col">
          <SheetTitle className="w-full text-left font-semibold text-primary lg:text-xl">
            Forma de Entrega
          </SheetTitle>
          <div className="flex items-center justify-between rounded-md bg-secondary py-2 pl-2 text-sm font-bold lg:text-lg">
            <p className="font-semibold">Retirada na Loja</p>
            <RadiobuttonIcon className="m-auto mx-5 text-primary" />
          </div>
        </SheetHeader>

        {/* PAGAMENTO */}
        <SheetHeader className="flex flex-col">
          <SheetTitle className="w-full text-left font-semibold text-primary lg:text-xl">
            Forma de Pagamento
          </SheetTitle>
          <div className="items-left flex flex-col justify-between gap-4 rounded-md bg-primary p-2 text-sm text-white lg:text-xl">
            <div className="flex items-center justify-between">
              <p>xxxx xxxx xxxx 0000</p>
              <div className="flex gap-2">
                <IconEdit stroke={2} className="cursor-pointer" />
                <IconTrash stroke={2} className="cursor-pointer" />
              </div>
            </div>
            <p className="text-left text-xs lg:text-lg">Nome do Titular</p>
          </div>
          <Link
            to="/"
            className="mt-2 flex items-center justify-start gap-2 rounded-md bg-secondary p-2 text-sm font-semibold lg:text-base"
          >
            <IconPlus stroke={2} />
            <p>Adicionar novo cartão</p>
          </Link>
        </SheetHeader>
      </Dialog>
    </div>
  )
}

export default DeliveryAndPayment
