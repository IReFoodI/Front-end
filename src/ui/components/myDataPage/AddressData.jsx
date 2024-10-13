export function AddressData({ address }) {
  return (
    <div className="my-2 flex w-[80%] flex-col justify-start">
      <h2 className="text-xl font-bold text-black">{address.name}</h2>
      <div className="text-sm">
        <p>
          {address?.street}, {address?.number} - {address?.additionalInfo01}
        </p>
        <p>
          {address?.additionalInfo02} - {address?.neighborhood}
        </p>
        <p>
          {address?.city} - {address?.state} - CEP {address?.zipCode}
        </p>
      </div>
    </div>
  )
}
