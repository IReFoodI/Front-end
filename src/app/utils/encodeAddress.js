export function getEncodedAddress(address) {
  return encodeURIComponent(
    `${address?.street}, ${address?.number || ""} - ${address?.district || ""}, ${address?.city || ""} - ${address?.state || ""}, ${address?.cep || ""}`
  )
}
