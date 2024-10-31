import { useState } from "react"

import { useFetch } from "@/app/hooks/useFetch"
import { Button } from "@/ui/components/ui/button/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/ui/components/ui/dialog"

import { restaurantImageService } from "../../services/restaurantImageService"
import { restaurantService } from "../../services/restaurantService"

export function ModalCoverphoto({
  toggleOpenModal,
  isModalOpen,
  storeInformation,
  fetchStoreProfileSettings,
}) {
  const [imageData, setImageData] = useState({
    imageFile: null,
    previewUrl: "",
  })
  const [dragActive, setDragActive] = useState(false)
  const { loading, onRequest } = useFetch()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageData({
        imageFile: file,
        previewUrl: URL.createObjectURL(file),
      })
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = () => setDragActive(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      setImageData({
        imageFile: file,
        previewUrl: URL.createObjectURL(file),
      })
    }
  }

  function handleCancel() {
    toggleOpenModal()
    setImageData({})
  }
  async function teste(response) {
    console.log("o que vem ", response)
    await onRequest({
      request: () =>
        restaurantService.updateRestaurant({
          ...storeInformation,
          urlBanner: response,
        }),
      onSuccess: fetchStoreProfileSettings,
    })
  }

  async function handleUploadImage() {
    if (!imageData.imageFile) return

    console.log("merda", storeInformation)
    await onRequest({
      request: () =>
        restaurantImageService.createRestaurantImage({
          imageFile: imageData.imageFile,
        }),
      onSuccess: (response) => teste(response),
      successMessage: "Imagem atualizada",
    })
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={toggleOpenModal}>
      <DialogContent>
        <DialogTitle>Selecione uma imagem de capa</DialogTitle>
        <DialogDescription>
          Arraste uma imagem ou clique na área para selecionar um arquivo.
        </DialogDescription>

        <div
          className={`my-2 aspect-square w-full max-w-xs cursor-pointer border-2 ${
            dragActive ? "border-blue-500" : "border-dashed"
          } mx-auto flex items-center justify-center rounded-md`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          {imageData?.previewUrl ? (
            <img
              src={imageData.previewUrl}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <p className="text-center">
              Arraste uma imagem ou clique para selecionar
            </p>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <DialogFooter>
          <Button
            className="rounded-full"
            variant="secondary"
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            className="rounded-full"
            disabled={loading}
            onClick={() => {
              console.log("Imagem selecionada:", imageData?.imageFile)
              handleUploadImage()
              toggleOpenModal() // Fecha o modal após a seleção
            }}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}