import { IconCaretDownFilled } from "@tabler/icons-react"
import { useState } from "react"
import { Link } from "react-router-dom"

import { Button } from "../../ui/button/button"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"

export function AddressModal() {
  const [isActive, setIsActive] = useState(false)

  function handleClick() {
    setIsActive(true)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`order-1 m-2 flex w-full cursor-pointer items-center justify-center rounded-xl p-2 hover:bg-[#ffeae4] md:order-2 md:w-fit ${isActive ? "active:bg-[#ffeae4]" : ""}`}
          onClick={handleClick}
        >
          <p className="text-sm md:text-[16px]">Endereço da pessoa, XX</p>
          <span>
            <IconCaretDownFilled className="text-primary" size={20} />
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="relative top-14 font-inter text-gray-500 md:absolute md:left-0 md:top-5 md:w-96"
        align="start"
      >
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <h1 className="text-[15px] font-bold text-gray-600 md:text-base">
            Seu pedido irá para esse endereço
          </h1>
          <p className="text-center text-sm md:text-[15px]">
            As opções e velocidade de entrega podem variar de acordo com a
            região
          </p>
        </div>
        <div className="my-6 flex w-full flex-col items-start justify-center gap-2 rounded-lg bg-white p-2">
          <h1 className="text-[15px] font-bold text-gray-600 md:text-base">
            Casa
          </h1>
          <div className="text-sm md:text-[15px]">
            <p>Av Vamo pra Cima, 10 - Apto 02</p>
            <p>Bloco A - Bairro Cruzes</p>
            <p>Não-me-Toque - RS - CEP XX.XXX-XX</p>
          </div>
        </div>
        <Button className="w-full md:text-base">
          <Link to="/endereco" className="w-full">
            Meus Endereços
          </Link>
        </Button>
      </PopoverContent>
    </Popover>
  )
}
