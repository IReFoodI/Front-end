import { IconCamera } from "@tabler/icons-react"
import { useState } from "react"

import { Button } from "@/ui/components/ui/button/button"

import { StyledInput } from "./components/StyledInput"
import { StyledLabel } from "./components/StyledLabel"
import { StyledSelect } from "./components/StyledSelect"

export function StoreProfileSettings() {
  const [storeInformation, setStoreInformation] = useState({
    storeCoverImage:
      "https://www.estadao.com.br/resizer/v2/L3LYN5Y4MRG6BB47MNHEEXDRGA.jpeg?quality=80&auth=c4f56563b2c83e506971bce35dbc505a5ecdf7d89a70d2f2c5fbb8b0c7071e5f&width=720&height=503&smart=true",
    storeProfileImage:
      "https://i.pinimg.com/1200x/00/7d/85/007d85591e9ea14e737977be9345dfe3.jpg",
    storeID: "",
    storeName: "",
    storeCNPJ: "",
    storePhone: "",
    storeCategory: "Lanches",
    storeDescription: "",
  })

  const categories = [
    {
      id: 1,
      category: "Lanches",
    },
    {
      id: 2,
      category: "Teste 1",
    },
    {
      id: 3,
      category: "Teste 2",
    },
    {
      id: 4,
      category: "Teste 3",
    },
    {
      id: 5,
      category: "Teste 4",
    },
  ]

  function onStoreInformationFieldChange(event) {
    const { name, value } = event.target
    setStoreInformation((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }

  return (
    <div className="m-4 lg:m-8">
      <div className="flex flex-col gap-0">
        <h1 className="text-3xl font-semibold lg:mb-0 lg:text-4xl">Perfil</h1>
        <p className="text-base font-semibold text-zinc-500 lg:text-lg">
          Ajuste as informações da sua loja
        </p>
      </div>

      <div className="relative mb-14 mt-4 flex flex-col items-center">
        <div className="relative h-64 w-full">
          <img
            src={storeInformation.storeCoverImage}
            alt={`Imagem de fundo da loja ${storeInformation.storeName}`}
            className="h-full w-full rounded-xl border-2 border-zinc-400 object-cover"
          />

          <button className="absolute right-0 top-0 m-2 rounded-md bg-black p-1 transition hover:bg-orange-500 hover:ease-in">
            <IconCamera className="text-white" size={32} />
          </button>
        </div>

        <div className="absolute bottom-0 flex h-24 w-24 pt-12">
          <img
            src={storeInformation.storeProfileImage}
            alt={`Imagem de perfil da loja ${storeInformation.storeName}`}
            className="h-24 w-24 rounded-full border-2 border-white object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-x-14">
        <div className="order-1 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <StyledLabel fieldName="ID da loja" />
            <StyledInput
              isDisabled={true}
              onInputChange={onStoreInformationFieldChange}
              inputName="storeID"
              inputValue={storeInformation.storeID}
              inputPlaceholder="ID da Loja"
            />
          </div>

          <div className="flex flex-col gap-1">
            <StyledLabel fieldName="Nome da loja" />
            <StyledInput
              isDisabled={false}
              isTextArea={false}
              onInputChange={onStoreInformationFieldChange}
              inputName="storeName"
              inputValue={storeInformation.storeName}
              inputPlaceholder="Nome da Loja"
            />
          </div>
        </div>

        <div className="order-2 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <StyledLabel fieldName="CNPJ" />
            <StyledInput
              isDisabled={false}
              isTextArea={false}
              onInputChange={onStoreInformationFieldChange}
              inputName="storeCNPJ"
              inputValue={storeInformation.storeCNPJ}
              inputPlaceholder="00.000.000/0000-00"
            />
          </div>

          <div className="flex flex-col gap-1">
            <StyledLabel fieldName="Telefone de contato" />
            <StyledInput
              isDisabled={false}
              isTextArea={false}
              onInputChange={onStoreInformationFieldChange}
              inputName="storePhone"
              inputValue={storeInformation.storePhone}
              inputPlaceholder="(99) 99999-9999"
            />
          </div>
        </div>

        <div className="order-3 flex w-full flex-col gap-6 lg:order-4 lg:col-span-3 lg:mt-2 lg:items-end">
          <div className="flex w-full flex-col gap-1 lg:order-2">
            <StyledLabel fieldName="Descrição da loja" />
            <StyledInput
              isDisabled={false}
              isTextArea={true}
              onInputChange={onStoreInformationFieldChange}
              inputName="storeDescription"
              inputValue={storeInformation.storeDescription}
              inputPlaceholder="A descrição da loja vai vir aqui..."
            />
          </div>
        </div>

        <div className="order-4 flex w-full flex-col items-center gap-6 lg:order-3 lg:mt-10 lg:items-end">
          <div className="flex w-full flex-col gap-1 lg:order-2">
            <StyledLabel fieldName="Categorias" />
            <StyledSelect
              categories={categories}
              selectedCategory={storeInformation.storeCategory}
            />
          </div>

          <div className="order-1">
            <Button className="bg-orange-600">Salvar alterações</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
