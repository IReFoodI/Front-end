import { useState } from "react"
import { PedidoCard } from "./PedidoCard"
import fundo from "@/ui/assets/fundo.png"
import { Link } from "react-router-dom"

export function PedidoAndamento() {
  const [pedido, setPedido] = useState({
    retiradaHorario: "Hoje, 19:52 - 20:02",
    statusPedido: "A Loja está separando seu pedido",
    restaurante: {
      nome: "Dragão Verde",
      tipo: "Restaurante",
      imgUrl: "https://via.placeholder.com/40",
    },
    numeroPedido: 3399,
    itensPedido: [
      {
        nome: "Item a venda",
        descricao: "Descrição do item a venda...",
        preco: "R$ 20,99",
      },
    ],
    subtotal: "R$ 20,99",
    entrega: "Retirada na loja",
    pagamento: {
      tipo: "PIX",
      status: "aprovado",
    },
  })

  const address =
    "Rua Visconde de Duprat, 258 - Petrópolis, Porto Alegre - RS, 90690-430"
  const encodedAddress = encodeURIComponent(address)

  return (
    <div
      id="page"
      className="mx-auto flex h-screen w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto"
    >
      <div className="flex h-full flex-col md:flex-row">
        <div className="flex flex-col justify-between px-10 lg:w-1/2 lg:ps-5">
          <div className="flex-1">
            {/* Passando as propriedades corretamente para o PedidoCard */}
            <PedidoCard
              retiradaHorario={pedido.retiradaHorario}
              statusPedido={pedido.statusPedido}
              nomeRestaurante={pedido.restaurante.nome}
              numeroPedido={`#${pedido.numeroPedido}`}
              imagemRestaurante={pedido.restaurante.imgUrl}
              itensPedido={pedido.itensPedido}
              subtotal={pedido.subtotal}
              formaEntrega={pedido.entrega}
              metodoPagamento={pedido.pagamento.tipo}
              statusPagamento={pedido.pagamento.status}
            />
          </div>
        </div>
        <div className="relative flex justify-end">
          {/* Imagem de fundo (ocultada no mobile) */}
          <img
            className="z-10 hidden max-h-[700px] w-[80%] md:relative md:block"
            src={fundo}
            alt=""
          />

          {/* Mapa (sempre visível) */}
          <div
            id="map"
            className="top-12 z-20 mx-auto flex w-[80%] items-center justify-center md:absolute md:left-0 md:h-[80%]"
          >
            <iframe
              title="Google Maps"
              width="100%"
              height="100%"
              className="rounded-xl border-0"
              src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <Link
        to="/user/pedidos"
        className="font-inter mx-auto mt-8 block w-[321px] text-center text-[24px] font-semibold leading-[44px] text-[#FB3D01] underline md:mt-4"
      >
        Preciso de ajuda
      </Link>
    </div>
  )
}
