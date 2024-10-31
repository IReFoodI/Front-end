import { useCallback, useEffect } from "react"

import { openBagService } from "@/domains/user/services/openBagService"
import { userOpenBagStore } from "@/domains/user/stores/userOpenBagStore"
import background from "@/ui/assets/background.png"
import { Loading } from "@/ui/components/ui/loading"

import { OrderDetails } from "./OrderDetails"

export function OpenBag() {
  const address =
    "Rua Visconde de Duprat, 258 - Petrópolis, Porto Alegre - RS, 90690-430"
  const encodedAddress = encodeURIComponent(address)

  const { items, loading, setItems, setLoading } = userOpenBagStore()

  const { openBagItems, totalAmount, setOpenBagItems } = userOpenBagStore()

  // const fetchOpenBagItems = useCallback(async () => {
  //   setLoading(true)
  //   const data = await openBagService.listOpenBagItems()
  //   setItems(data)
  //   setLoading(false)
  // }, [setItems, setLoading])

  // useEffect(() => {
  //   fetchOpenBagItems()

  //   const fetchOpenBagItems = async () => {
  //     const response = await openBagService.fetchOpenBagItems()
  //     setOpenBagItems(response.data)
  //   }

  //   fetchOpenBagItems()
  // }, [fetchOpenBagItems, setOpenBagItems])

  // if (loading) {
  //   return <Loading />
  // }

  return (
    <div
      id="page"
      className="mx-auto flex h-full w-full max-w-[1216px] flex-col items-center justify-between text-gray-600 antialiased lg:mt-11 lg:h-auto lg:flex-row lg:items-start"
    >
      {/* LEFT - ORDER DETAILS */}
      <OrderDetails items={items} items2={openBagItems} />
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
          <p className="text-lg font-semibold">
            Total: R$ {totalAmount.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}
