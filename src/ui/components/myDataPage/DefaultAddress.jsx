import { RadiobuttonIcon } from "@radix-ui/react-icons"
import { IconEdit } from "@tabler/icons-react"
import { Link } from "react-router-dom"

import { AddressData } from "./AddressData"

const address = {
  name: "Casa",
  street: "Av Vamo pra cima",
  number: 10,
  additionalInfo01: "Apto 02",
  additionalInfo02: "Bloco A",
  neighborhood: "Bairro Cruzes",
  city: "Não-me-toque",
  state: "RS",
  zipCode: "XX.XXX-XX",
}

export function DefaultAddress() {
  return (
    <div className="flex items-center justify-around">
      <RadiobuttonIcon className="m-auto mx-5 text-primary" />
      <AddressData address={address} />
      <Link to="/" className="m-auto mx-5">
        <IconEdit stroke={2} size={35} />
      </Link>
    </div>
  )
}
