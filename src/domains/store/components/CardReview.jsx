import { IconStarFilled } from "@tabler/icons-react"
import { useState } from "react"

export function CardReview({ avatar, name, rating, date, reviewText }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const charLimit = 100

  const renderStars = () => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <IconStarFilled
          key={i}
          size={15}
          className={i < rating ? "text-primary" : "text-gray-300"}
        />
      )
    }
    return stars
  }

  const truncatedReviewText =
    reviewText.length > charLimit
      ? reviewText.slice(0, charLimit) + "..."
      : reviewText

  return (
    <div
      id="card-review"
      className="mx-auto flex w-full max-w-[550px] gap-3 border-b border-gray-200 bg-white p-4 antialiased"
    >
      <div id="profile-img" className="flex w-1/5 items-start">
        <img
          className="h-20 w-20 rounded-full object-cover"
          src={avatar}
          alt={`${name} avatar`}
        />
      </div>

      <div
        id="text"
        className="flex w-52 flex-1 flex-col items-start justify-start"
      >
        <h2 className="font-semibold">{name}</h2>
        <span className="flex items-center gap-2">
          <span className="font-semibold text-gray-500">
            {rating.toFixed(1)}
          </span>
          {renderStars()}
          <span className="text-sm text-gray-600">{date}</span>
        </span>
        <p className="mt-2 text-start text-sm text-gray-600">
          {isExpanded ? reviewText : truncatedReviewText}
        </p>
        {reviewText.length > charLimit && (
          <button
            className="mt-2 text-sm text-blue-500 transition duration-300 hover:text-primary"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Mostrar menos" : "Expandir"}
          </button>
        )}
      </div>
    </div>
  )
}
