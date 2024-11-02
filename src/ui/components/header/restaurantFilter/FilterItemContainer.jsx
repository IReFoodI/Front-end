import { useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { v4 as uuid } from "uuid"
export function FilterItemContainer({ title, items, param }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location?.pathname
  const [activeItems, setActiveItems] = useState(() => {
    const params = searchParams.get(param)?.split(" ") || []
    return params.filter(Boolean)
  })

  function handleClick(title) {
    let currentParams = new URLSearchParams(searchParams) // Mantém os parâmetros atuais
    setSearchParams((prev) => {
      currentParams = new URLSearchParams(prev)
      const existingValues = currentParams.get(param)?.split(" ") || []

      if (existingValues.includes(title)) {
        // Se o título já estiver ativo, remove
        const updatedValues = existingValues.filter((val) => val !== title)
        if (updatedValues.length > 0) {
          currentParams.set(param, updatedValues.join(" ")) // Atualiza o parâmetro se ainda houver valores
        } else {
          currentParams.delete(param) // Remove o parâmetro se não houver valores
        }
      } else {
        // Caso contrário, adiciona
        existingValues.push(title)
        currentParams.set(param, existingValues.join(" "))
      }

      return currentParams // Retorna os parâmetros atualizados
    })

    setActiveItems((prev) => {
      if (prev.includes(title)) {
        return prev.filter((val) => val !== title)
      } else {
        return [...prev, title]
      }
    })

    if (
      pathname !== "/produtos/pesquisar" &&
      pathname !== "/produtos/pesquisar/"
    ) {
      navigate(`/produtos/pesquisar?${currentParams.toString()}`)
    }
  }

  return (
    <div className="flex flex-col gap-1 py-2 text-gray-600">
      <h2 className="text-sm font-semibold">{title}</h2>

      <div className="flex flex-wrap items-center justify-start gap-2">
        {items.map((item) => {
          return (
            <button
              key={uuid()}
              className={`flex items-center rounded-full p-1 text-xs font-semibold ${
                activeItems?.some((i) => i === item.buttonTitle)
                  ? "bg-orange-100 text-primary"
                  : "bg-gray-200 text-gray-600"
              }`}
              onClick={() => handleClick(item.buttonTitle)}
            >
              <span>{item.imageSource}</span>
              <span className="px-1">{item.buttonTitle}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
