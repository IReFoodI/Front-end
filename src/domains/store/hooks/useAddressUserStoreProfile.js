/* eslint-disable */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useFetch } from "@/app/hooks/useFetch"

import {
  fetchAllAddress,
  fetchRestaurantAddressById,
} from "../services/addressService"

export function useAddressUserStoreProfile() {
  const [address, setAddress] = useState([])
  const [addressById, setAddresById] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { storeId } = useParams()

  const { onRequest, error } = useFetch()

  useEffect(() => {
    const fetchAddressUserStoreProfileData = async () => {
      await onRequest({
        request: fetchAllAddress,
        onSuccess: async (addressRes) => {
          setAddress(addressRes)
          setIsLoading(false)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    const fetchResAddressById = async () => {
      await onRequest({
        request: () => fetchRestaurantAddressById(storeId),
        onSuccess: async (addressByIdRes) => {
          setAddresById(addressByIdRes)
          setIsLoading(false)
        },
        onError: () => console.error("Erro ao buscar dados:", error),
      })
    }

    fetchAddressUserStoreProfileData()
    fetchResAddressById()
  }, [onRequest, error])

  return { address, addressById, isLoading }
}
