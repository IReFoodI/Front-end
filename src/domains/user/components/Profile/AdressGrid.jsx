import React from "react"

import { AddressCard } from "./AddressCard"

export function EnderecosGrid({ enderecos }) {
  if (!enderecos || enderecos.length === 0) {
    return <p>Nenhum endereço disponível.</p>
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {enderecos.map((endereco) => (
        <React.Fragment key={endereco.id}>
          <AddressCard enderecoData={endereco} />
        </React.Fragment>
      ))}
    </div>
  )
}
