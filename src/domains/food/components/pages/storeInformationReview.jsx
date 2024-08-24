import { IconArrowBadgeDownFilled, IconStarFilled } from "@tabler/icons-react"

import { CardReview } from "./cardReview"
export const StoreInformationReview = () => {
  return (
    <div
      id="review-content"
      className="flex flex-col items-center text-gray-500"
    >
      <div
        id="review-content-top"
        className="mb-6 mt-3 flex flex-col items-center text-center"
      >
        <h1 className="text-2xl font-bold text-gray-500">5,0</h1>
        <span className="my-3 flex items-center gap-2">
          <IconStarFilled size={24} className="text-orange-500" />
          <IconStarFilled size={24} className="text-orange-500" />
          <IconStarFilled size={24} className="text-orange-500" />
          <IconStarFilled size={24} className="text-orange-500" />
          <IconStarFilled size={24} className="text-orange-500" />
        </span>
        <p className="font-semibold">2 avaliações • últimos 90 dias</p>
        <p>10 avaliações no total</p>
      </div>

      <CardReview
        avatar="https://via.placeholder.com/150"
        name="Julianinha da Silva"
        rating={4}
        date="13/08/2024"
        reviewText="Muito bom!"
      />

      <CardReview
        avatar="https://via.placeholder.com/150"
        name="Sayonara de Melo"
        rating={5}
        date="13/08/2024"
        reviewText="Achei muito bom, vale a pena e veio muita coisa na sacola!"
      />

      <div className="my-6 flex items-center gap-3 text-sm">
        <span>Exibir mais informações</span>
        <span>
          <IconArrowBadgeDownFilled size={15} />
        </span>
      </div>
    </div>
  )
}
