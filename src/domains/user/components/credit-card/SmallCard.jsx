import { IconEdit, IconTrash } from "@tabler/icons-react"
import { useState } from "react"

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/ui/components/ui/alert-dialog"

import { AddEditCard } from "./AddEditCard"

export function SmallCard({ toggleOpenModal, data }) {
  const { name, number, validity } = data
  const [isModalVisible, setIsModalVisible] = useState(false)
  const replacedNumber = number
    .slice()
    .replace(/\D/g, "") // Remove espaços, deixando só números
    .replace(/\d(?=\d{4})/g, "X") // Substitui todos menos os últimos 4
    .replace(/(.{4})(?=.)/g, "$1 ") // Adiciona espaços a cada 4 dígitos

  function closeModal() {
    setIsModalVisible(false)
  }

  function openModal() {
    setIsModalVisible(true)
  }

  return (
    <div className="flex h-[90px] w-[310px] flex-col justify-between rounded-lg bg-gray-500 p-4 text-white hover:bg-gray-600">
      <div className="flex justify-between font-bold">
        <span>{replacedNumber}</span>
        <span className="flex items-center justify-between gap-3">
          {/* <button> */}
          <AlertDialog open={isModalVisible}>
            <AlertDialogTrigger onClick={openModal}>
              <IconEdit
                size={25}
                className="transition duration-300 hover:text-orange-500"
              />
            </AlertDialogTrigger>
            <AlertDialogContent className="min-w-fit">
              <AlertDialogHeader>
                <AlertDialogTitle />
                <AlertDialogDescription />
              </AlertDialogHeader>
              <AddEditCard type="edit" card={data} closeModal={closeModal} />
            </AlertDialogContent>
          </AlertDialog>
          {/* </button> */}
          <button onClick={toggleOpenModal}>
            <IconTrash
              size={25}
              className="transition duration-300 hover:text-orange-500"
            />
          </button>
        </span>
      </div>

      <div className="flex justify-between">
        <span>{name}</span>
        <span>Validade: {validity}</span>
      </div>
    </div>
  )
}
