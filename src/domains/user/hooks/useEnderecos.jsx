import { useEffect, useState } from "react"

import { enderecosData as initialEnderecosData } from "../models/enderecosData"

export function useEnderecos() {
  const [enderecos, setEnderecos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedEnderecos = localStorage.getItem("enderecosData")

    if (storedEnderecos) {
      setEnderecos(JSON.parse(storedEnderecos))
      setLoading(false)
    } else {
      setTimeout(() => {
        setEnderecos(initialEnderecosData)
        localStorage.setItem(
          "enderecosData",
          JSON.stringify(initialEnderecosData)
        )
        setLoading(false)
      }, 100)
    }
  }, [])

  const toggleFavorite = (id) => {
    const updatedEnderecos = enderecos.map((endereco) =>
      endereco.id === id
        ? { ...endereco, isFavorited: !endereco.isFavorited }
        : endereco
    )
    setEnderecos(updatedEnderecos)
    localStorage.setItem("enderecosData", JSON.stringify(updatedEnderecos))
  }

  return { enderecos, loading, toggleFavorite }
}
