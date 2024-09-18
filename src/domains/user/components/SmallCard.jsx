import { IconEdit, IconTrash } from "@tabler/icons-react"
export function SmallCard({ toggleOpenModal, data }) {
  const { nameHolder, number, validity } = data
  return (
    <div className="flex h-[90px] w-[310px] flex-col justify-between rounded-lg bg-gray-500 p-4 text-white hover:bg-gray-600">
      <div className="flex justify-between font-bold">
        <span>{number}</span>
        <span className="flex items-center justify-between gap-3">
          <button>
            <IconEdit
              size={25}
              className="transition duration-300 hover:text-orange-500"
            />
          </button>
          <button onClick={toggleOpenModal}>
            <IconTrash
              size={25}
              className="transition duration-300 hover:text-orange-500"
            />
          </button>
        </span>
      </div>

      <div className="flex justify-between">
        <span>{nameHolder}</span>
        <span>Validade: {validity}</span>
      </div>
    </div>
  )
}
