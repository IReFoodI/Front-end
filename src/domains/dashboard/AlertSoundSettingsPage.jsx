import { Switch } from "@/ui/components/ui/switch"

export function AlertSoundSettingsPage() {
  return (
    <div className="flex-grow p-4">
      <main className="mx-auto flex w-full max-w-[1216px] flex-col items-center text-gray-600 antialiased lg:h-auto">
        <div className="mb-5 mt-4 flex w-full flex-col">
          <h1 className="mb-4 text-3xl font-semibold sm:mb-0">
            Alertas sonoros
          </h1>
          <p>Ajuste os sons do seu gestor de pedidos</p>
        </div>

        <div>
          <h2>RECEBIMENTO DE PEDIDOS</h2>
          <div className="flex border-b border-t">
            <div>
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

        <div>
          <h2>OCORRÊNCIAS</h2>
          <div className="flex border-b border-t">
            <div>
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
