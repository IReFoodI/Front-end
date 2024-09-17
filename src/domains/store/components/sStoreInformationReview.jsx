import { IconCaretDownFilled, IconStarFilled } from "@tabler/icons-react"
import { useState } from "react"

import { CardReview } from "./cCardReview"

const reviewsData = [
  {
    avatar: "https://avatar.iran.liara.run/public/72",
    name: "Julianinha da Silva",
    rating: 4,
    date: "13/08/2024",
    reviewText:
      "Produto muito bom! A qualidade é excelente e a entrega foi rápida. No entanto, o atendimento ao cliente poderia ser melhor. Tive algumas dificuldades para entrar em contato, mas no final deu tudo certo. Recomendo para quem procura um bom custo-benefício e não se importa com um atendimento um pouco lento.",
  },
  {
    avatar: "https://avatar.iran.liara.run/public/73",
    name: "Sayonara de Melo",
    rating: 5,
    date: "13/08/2024",
    reviewText: "Achei muito bom, vale a pena e veio muita coisa na sacola!",
  },
  {
    avatar: "https://avatar.iran.liara.run/public/45",
    name: "Carlos Alberto",
    rating: 3,
    date: "14/08/2024",
    reviewText:
      "O produto em si é bom e funciona como prometido, mas tive uma experiência misturada com o serviço. A entrega foi bem demorada, o que foi um inconveniente, e o atendimento ao cliente deixou a desejar quando tive problemas para rastrear meu pedido. Espero que melhorem esses aspectos, pois o produto é realmente bom.",
  },
  {
    avatar: "https://avatar.iran.liara.run/public/65",
    name: "Maria Eduarda",
    rating: 5,
    date: "15/08/2024",
    reviewText:
      "Estou extremamente satisfeita com minha compra. O produto chegou antes do esperado e em perfeito estado. A qualidade é superior e o atendimento ao cliente foi impecável. Foi uma experiência de compra muito positiva e sem complicações. Com certeza, recomendo para quem busca qualidade e eficiência.",
  },
  {
    avatar: "https://avatar.iran.liara.run/public/33",
    name: "Ricardo Gomes",
    rating: 2,
    date: "16/08/2024",
    reviewText: "Não gostei.",
  },
  {
    avatar: "https://avatar.iran.liara.run/public/57",
    name: "Ana Paula",
    rating: 4,
    date: "17/08/2024",
    reviewText:
      "O produto é muito bom e chegou no prazo estipulado. No entanto, o site poderia ser mais intuitivo e fácil de navegar. Tive um pouco de dificuldade para encontrar todas as informações necessárias. Apesar disso, estou bastante satisfeita com a compra e recomendo para quem busca um bom produto.",
  },
  {
    avatar: "https://avatar.iran.liara.run/public/20",
    name: "Lucas Pereira",
    rating: 5,
    date: "18/08/2024",
    reviewText: "Simplesmente perfeito!",
  },
  {
    avatar: "https://avatar.iran.liara.run/public/95",
    name: "Fernanda Lima",
    rating: 4,
    date: "19/08/2024",
    reviewText:
      "Estou bastante satisfeita com a compra. O produto é de boa qualidade e chegou no prazo previsto. No entanto, notei uma pequena falha no acabamento, que não compromete o uso, mas poderia ser melhorado. O atendimento foi bom e a experiência geral foi positiva. Vou continuar comprando e recomendando.",
  },
  {
    avatar: "https://avatar.iran.liara.run/public/22",
    name: "Gabriel Santos",
    rating: 3,
    date: "20/08/2024",
    reviewText:
      "O produto é decente, mas achei o preço um pouco alto em relação ao que é oferecido. A qualidade é boa, mas não é excepcional. A entrega foi dentro do prazo, e o atendimento foi adequado, mas não há nada que realmente se destaque. Para quem procura algo mais acessível e não se importa em pagar um pouco mais, pode valer a pena.",
  },
]

export function StoreInformationReview() {
  const [visibleReviews, setVisibleReviews] = useState(3)
  const [hasReviews] = useState(reviewsData.length > 0)

  const loadMoreReviews = () => {
    setVisibleReviews(visibleReviews + 3)
  }

  return (
    <div
      id="review-content"
      className="flex flex-col items-center text-gray-500 antialiased"
    >
      <div
        id="review-content-top"
        className="mb-6 mt-3 flex flex-col items-center text-center"
      >
        <h1 className="text-2xl font-bold">5,0</h1>
        <span className="my-3 flex items-center gap-2">
          <IconStarFilled size={24} className="text-primary" />
          <IconStarFilled size={24} className="text-primary" />
          <IconStarFilled size={24} className="text-primary" />
          <IconStarFilled size={24} className="text-primary" />
          <IconStarFilled size={24} className="text-primary" />
        </span>
        <p className="font-semibold">9 avaliações • últimos 90 dias</p>
        <p>10 avaliações no total</p>
      </div>

      {hasReviews ? (
        <>
          {reviewsData.slice(0, visibleReviews).map((review, index) => (
            <CardReview
              key={index}
              avatar={review.avatar}
              name={review.name}
              rating={review.rating}
              date={review.date}
              reviewText={review.reviewText}
            />
          ))}

          {reviewsData.length > visibleReviews && (
            <button
              className="my-6 flex items-center gap-3 text-sm transition duration-300 hover:text-primary"
              onClick={loadMoreReviews}
            >
              <span>Mostrar mais comentários</span>
              <span>
                <IconCaretDownFilled size={15} />
              </span>
            </button>
          )}
        </>
      ) : (
        <div className="m-8 text-center">
          <p>Ainda não tem nenhuma avaliação. Deseja ser o primeiro?</p>
          <a
            href="/perfil-da-loja"
            className="text-blue-500 underline transition duration-300 hover:text-primary"
          >
            Escolher produto
          </a>
        </div>
      )}
    </div>
  )
}
