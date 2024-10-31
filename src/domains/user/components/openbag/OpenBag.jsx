import background from "@/ui/assets/background.png"

import { OrderDetails } from "./OrderDetails"

export function OpenBag() {
  const address =
    "Rua Visconde de Duprat, 258 - Petrópolis, Porto Alegre - RS, 90690-430"
  const encodedAddress = encodeURIComponent(address)

  return (
    <div
      id="page"
      className="mx-auto flex h-full w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto"
    >
      {/* LEFT - ORDER DETAILS */}
      <OrderDetails></OrderDetails>
      {/* RIGHT - MAPA */}
      <div>
        <div className="relative hidden justify-end text-center lg:flex">
          <img
            className="z-2 hidden max-h-[700px] w-[80%] md:relative md:block"
            src={background}
            alt=""
          />
          <div
            id="map"
            className="z-2 top-12 mx-auto hidden max-h-[600px] w-[80%] items-center justify-center md:absolute md:left-0 md:flex md:h-[80%]"
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
        {/* TOTAL */}
        <div className="p-4 text-center lg:text-right">
          <p className="text-lg font-semibold">Total: R$ 160,00</p>
        </div>
      </div>
    </div>
  )
}
