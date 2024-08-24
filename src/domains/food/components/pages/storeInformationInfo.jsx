import { IconMapPin } from "@tabler/icons-react"
export const StoreInformationInfo = () => {
  return (
    <div id="info" className="flex flex-col gap-8 text-gray-500">
      <div id="description">
        <h2 className="font-bold">Descrição da Loja</h2>
        <p className="py-2 text-sm">
          Aqui vai a descrição da loja, criada no ano de 1998 no bairro tal.
        </p>
      </div>
      <div id="status">
        <h2 className="font-bold">Aberto agora</h2>
        <div className="flex gap-8 py-2 text-sm">
          <span>Quinta-feira</span>
          <span>11:00 ás 23:59</span>
        </div>
      </div>
      <div id="address">
        <h2 className="font-bold">Endereço</h2>
        <div className="flex items-center gap-2 py-2">
          <span>
            <IconMapPin size={35} />
          </span>
          <p className="py-2 text-sm">
            Rua Visconde de Duprat, 258 - Petrópolis Porto Alegre - RS - CEP:
            90690-430
          </p>
        </div>
        <div className="flex h-[200px] items-center justify-center bg-gray-100">
          <p>mapa para retirada</p>
        </div>
      </div>

      <div id="other-info">
        <h2 className="font-bold">Outras Informações</h2>
        <p className="py-2 text-sm">CNPJ: XX.XXX.XXX/0001-XX</p>
      </div>
    </div>
  )
}
