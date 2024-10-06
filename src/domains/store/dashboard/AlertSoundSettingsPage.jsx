import { Switch } from "@/ui/components/ui/switch"

export function AlertSoundSettingsPage() {
  return (
    <div className="flex flex-1 p-4">
      <main className="flex w-fit max-w-[1216px] flex-col items-center justify-start gap-6 text-gray-600 antialiased lg:h-auto">
        <div className="mb-5 mt-4 flex w-full flex-col">
          <h1 className="mb-4 text-3xl font-semibold sm:mb-0">
            Alertas sonoros
          </h1>
          <p>Ajuste os sons do seu gestor de pedidos</p>
        </div>

        <div className="flex w-full flex-col justify-center gap-2">
          <h2 className="border-b font-semibold">RECEBIMENTO DE PEDIDOS</h2>
          <div className="flex w-full justify-between gap-3 border-b">
            <div className="flex flex-col gap-2">
              <h3>Alerta de pedido recebido</h3>
              <p>
                Você vai ouvir um alerta sonoro sempre que receber um novo
                pedido
              </p>
            </div>
            <div className="flex items-center">
              <Switch />
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-start justify-center">
          <h2 className="border-b font-semibold">OCORRÊNCIAS</h2>
          <div className="flex w-full justify-between gap-3 border-b">
            <div className="flex flex-col gap-2">
              <h3>Alerta de ocorrências no pedido</h3>
              <p>
                Você vai ouvir um alerta sonoro sempre que houver um problema
                com o pedido
              </p>
            </div>
            <div className="flex items-center">
              <Switch />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
