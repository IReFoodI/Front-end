import { useEnderecos } from "../../hooks/useEnderecos"
import { EnderecosGrid } from "./AdressGrid"

export function ProfileAddress() {
  const { enderecos, loading } = useEnderecos()

  return (
    <div className="my-10">
      <h1 className="mb-6·text-2xl·font-bold">Meus Endereços</h1>
      {loading ? (
        <p>Loading endereços...</p>
      ) : (
        <EnderecosGrid enderecos={enderecos} />
      )}
    </div>
  )
}
